/* Formulaire « Être informé » + panneau d'administration.

   Où partent les réponses ?
   - Dans l'aperçu Claude : dans la base de données de la page (collection « contacts »).
     Le panneau d'administration (adresse #admin) les affiche et les exporte en CSV.
   - Sur le site publié (Netlify) : dans Netlify Forms. Le « backoffice » est alors
     le tableau de bord Netlify → Forms → inscription (liste, export CSV, alertes e-mail).
   Le formulaire essaie d'abord la base de la page, puis Netlify. */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

async function capacite(nom) {
  try {
    return window.claude?.use ? await window.claude.use(nom) : null;
  } catch {
    return null;
  }
}

const CHAMPS = ["prenom", "nom", "ville", "telephone", "email"];

async function enregistrer(fiche) {
  // 1. base de données de la page (aperçu) : une fiche par personne, qui s'allonge à chaque envoi
  const db = await capacite("db");
  const user = await capacite("user");
  const uid = db && user ? await user.id?.() : null;
  if (db && uid) {
    try {
      const ref = db.doc(`contacts/${uid}`);
      const snap = await ref.get();
      const avant = snap.exists ? snap.data()?.entries || [] : [];
      await ref.set({ entries: [...avant.slice(-99), fiche] });
      return "base";
    } catch (e) {
      console.warn("base de données :", e?.code || e);
    }
  }
  // 2. Netlify Forms (site publié)
  const corps = new URLSearchParams({ "form-name": "inscription", ...Object.fromEntries(CHAMPS.map((k) => [k, fiche[k]])), consentement: "oui" });
  const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: corps.toString() });
  if (!r.ok) throw new Error(`http ${r.status}`);
  return "netlify";
}

function csv(lignes) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const tete = ["Date", "Prénom", "Nom", "Ville", "Téléphone", "E-mail"];
  return "﻿" + [tete, ...lignes.map((l) => [l.date, l.prenom, l.nom, l.ville, l.telephone, l.email])].map((r) => r.map(esc).join(";")).join("\r\n");
}

export function initInscription(lenis) {
  const modale = $("#inscription");
  const admin = $("#admin");
  if (!modale) return null;

  let dernierFocus = null;
  const ouvrir = (el) => {
    dernierFocus = document.activeElement;
    el.hidden = false;
    document.body.classList.add("modal-open");
    lenis?.stop();
    requestAnimationFrame(() => el.classList.add("is-open"));
    setTimeout(() => $("input:not([type=hidden]):not([tabindex])", el)?.focus({ preventScroll: true }), 120);
  };
  const fermer = (el) => {
    el.classList.remove("is-open");
    setTimeout(() => {
      el.hidden = true;
      if (!$$(".modal.is-open").length) {
        document.body.classList.remove("modal-open");
        lenis?.start();
      }
    }, 250);
    if (el === admin && location.hash === "#admin") {
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch {}
    }
    dernierFocus?.focus?.({ preventScroll: true });
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-inscription]")) {
      e.preventDefault();
      // formulaire vierge à chaque ouverture
      $("form", modale).hidden = false;
      $(".form-ok", modale).hidden = true;
      ouvrir(modale);
      return;
    }
    const x = e.target.closest("[data-close]");
    if (x) fermer(x.closest(".modal"));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".modal.is-open").forEach(fermer);
  });

  /* ---------- envoi du formulaire ---------- */
  const form = $("#form-inscription");
  const msg = $(".form-msg", form);
  const bouton = $("button[type=submit]", form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    msg.classList.remove("is-error");
    const d = Object.fromEntries(new FormData(form));
    const erreur = (t, champ) => {
      msg.textContent = t;
      msg.classList.add("is-error");
      champ?.focus();
    };
    if (d["bot-field"]) return; // piège à robots
    const vide = CHAMPS.find((k) => !String(d[k] || "").trim());
    if (vide) return erreur("Merci de remplir tous les champs.", form.elements[vide]);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) return erreur("L'adresse e-mail ne semble pas valide.", form.elements.email);
    if (d.telephone.replace(/\D/g, "").length < 8) return erreur("Le numéro de téléphone ne semble pas valide.", form.elements.telephone);
    if (!form.elements.consentement.checked) return erreur("Merci de cocher la case d'accord pour continuer.", form.elements.consentement);

    const fiche = { date: new Date().toISOString(), ...Object.fromEntries(CHAMPS.map((k) => [k, String(d[k]).trim()])) };
    bouton.disabled = true;
    msg.textContent = "Envoi en cours…";
    try {
      await enregistrer(fiche);
      form.reset();
      form.hidden = true;
      $(".form-ok", modale).hidden = false;
    } catch {
      erreur("L'enregistrement n'a pas abouti. Merci de réessayer dans un instant.");
    } finally {
      bouton.disabled = false;
    }
  });

  /* ---------- administration ---------- */
  if (!admin) return null;
  const etat = $(".admin-state", admin);
  const outils = $(".admin-tools", admin);
  const tableau = $(".admin-table-wrap", admin);
  let lignes = [];

  async function chargerAdmin() {
    etat.hidden = false;
    outils.hidden = true;
    tableau.hidden = true;
    etat.textContent = "Chargement…";
    const db = await capacite("db");
    if (!db) {
      etat.textContent =
        "Sur le site publié, les inscriptions se consultent dans votre tableau de bord Netlify (Forms → inscription), avec export CSV. Cette vue ne fonctionne que dans l'aperçu Claude.";
      return;
    }
    const user = await capacite("user");
    if (!(user?.canEdit?.() ?? false)) {
      etat.textContent = "Accès réservé à l'administrateur du site.";
      return;
    }
    try {
      const snap = await db.collection("contacts").get();
      lignes = snap.docs.flatMap((d) => d.data()?.entries || []).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    } catch {
      etat.textContent = "Impossible de lire la liste pour le moment.";
      return;
    }
    if (!lignes.length) {
      etat.textContent = "Aucune inscription pour le moment.";
      return;
    }
    etat.hidden = true;
    outils.hidden = false;
    tableau.hidden = false;
    $(".admin-count", admin).textContent = `${lignes.length} personne${lignes.length > 1 ? "s" : ""}`;
    const tb = $("tbody", admin);
    tb.replaceChildren(
      ...lignes.map((l) => {
        const tr = document.createElement("tr");
        const dt = new Date(l.date);
        [Number.isNaN(+dt) ? "" : dt.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }), l.prenom, l.nom, l.ville, l.telephone, l.email].forEach((v) => {
          const td = document.createElement("td");
          td.textContent = v ?? "";
          tr.appendChild(td);
        });
        return tr;
      })
    );
  }

  $("[data-export]", admin).addEventListener("click", async () => {
    const contenu = csv(lignes);
    const dl = await capacite("downloads");
    try {
      if (dl) await dl.save({ filename: "inscriptions.csv", data: contenu });
      else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([contenu], { type: "text/csv;charset=utf-8" }));
        a.download = "inscriptions.csv";
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      }
    } catch {}
  });

  const verifierHash = () => {
    if (location.hash === "#admin") {
      ouvrir(admin);
      chargerAdmin();
    }
  };
  window.addEventListener("hashchange", verifierHash);
  return { verifierHash }; // appelé après l'intro quand l'adresse se termine par #admin
}

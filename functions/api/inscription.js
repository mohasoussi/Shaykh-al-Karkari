/* Cloudflare Pages Function — reçoit le formulaire « Être informé » (POST /api/inscription).
   Les fiches sont rangées dans l'espace de stockage KV lié sous le nom INSCRIPTIONS. */

const entetes = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const reponse = (corps, statut = 200) => new Response(JSON.stringify(corps), { status: statut, headers: entetes });
const propre = (v, max = 200) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

const echapper = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* Envoie un e-mail à l'administrateur via Resend (https://resend.com). Une panne d'envoi ne bloque jamais l'inscription. */
async function prevenir(env, f) {
  if (!env.RESEND_API_KEY) return "pas de clé RESEND_API_KEY";
  const vers = env.NOTIF_VERS || "contact@shaykh-alkarkari.com";
  const de = env.NOTIF_DE || "Site Shaykh Al Karkari <inscription@shaykh-alkarkari.com>";
  const lignes = [["Prénom", f.prenom], ["Nom", f.nom], ["Ville", f.ville], ["Pays", f.pays], ["Téléphone", f.telephone || "—"], ["E-mail", f.email]];
  const html = `<h2>Nouvelle inscription</h2><table cellpadding="6">${lignes.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${echapper(v)}</td></tr>`).join("")}</table><p style="color:#888">${f.date}</p>`;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: de, to: [vers], reply_to: f.email, subject: `Nouvelle inscription : ${f.prenom} ${f.nom} (${f.pays})`, html }),
    });
    const texte = (await r.text()).slice(0, 300);
    if (!r.ok) console.error("Resend", r.status, texte);
    return r.ok ? "envoyée" : `échec ${r.status} : ${texte}`;
  } catch (e) {
    console.error("Resend", e);
    return `erreur : ${String(e).slice(0, 200)}`;
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.INSCRIPTIONS) return reponse({ erreur: "Stockage non configuré." }, 503);
  let d;
  try {
    d = await request.json();
  } catch {
    return reponse({ erreur: "Requête invalide." }, 400);
  }
  if (d["bot-field"]) return reponse({ ok: true }); // piège à robots : on fait semblant d'accepter
  const fiche = {
    date: new Date().toISOString(),
    prenom: propre(d.prenom, 80),
    nom: propre(d.nom, 80),
    ville: propre(d.ville, 80),
    pays: propre(d.pays, 80),
    telephone: propre(d.telephone, 40),
    email: propre(d.email, 120),
  };
  if (["prenom", "nom", "ville", "pays", "email"].some((k) => !fiche[k])) return reponse({ erreur: "Champs manquants." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fiche.email)) return reponse({ erreur: "Adresse e-mail invalide." }, 400);
  if (fiche.telephone && fiche.telephone.replace(/\D/g, "").length < 8) return reponse({ erreur: "Numéro invalide." }, 400);

  const cle = `i:${Date.now().toString().padStart(14, "0")}-${crypto.randomUUID().slice(0, 8)}`;
  await env.INSCRIPTIONS.put(cle, JSON.stringify(fiche));
  // alerte par e-mail (facultative : sans clé RESEND_API_KEY, rien n'est envoyé) ; le résultat est noté sur la fiche pour le diagnostic
  fiche.alerte = await prevenir(env, fiche);
  await env.INSCRIPTIONS.put(cle, JSON.stringify(fiche));
  return reponse({ ok: true });
}

export const onRequest = () => reponse({ erreur: "Méthode non autorisée." }, 405);

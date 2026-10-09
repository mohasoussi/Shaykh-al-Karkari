/* Cloudflare Pages Function — reçoit le formulaire « Être informé » (POST /api/inscription).
   Les fiches sont rangées dans l'espace de stockage KV lié sous le nom INSCRIPTIONS. */

const entetes = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const reponse = (corps, statut = 200) => new Response(JSON.stringify(corps), { status: statut, headers: entetes });
const propre = (v, max = 200) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

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
  return reponse({ ok: true });
}

export const onRequest = () => reponse({ erreur: "Méthode non autorisée." }, 405);

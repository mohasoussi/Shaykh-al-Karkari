/* Cloudflare Pages Function — liste des inscriptions (GET /api/inscriptions), réservée à l'administrateur.
   Il faut envoyer le mot de passe d'administration (variable ADMIN_TOKEN) dans l'en-tête Authorization: Bearer … */

const entetes = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const reponse = (corps, statut = 200) => new Response(JSON.stringify(corps), { status: statut, headers: entetes });

function identique(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function onRequestGet({ request, env }) {
  if (!env.INSCRIPTIONS || !env.ADMIN_TOKEN) return reponse({ erreur: "Administration non configurée." }, 503);
  const donne = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!identique(donne, env.ADMIN_TOKEN)) return reponse({ erreur: "Mot de passe incorrect." }, 401);

  const cles = [];
  let curseur;
  do {
    const lot = await env.INSCRIPTIONS.list({ prefix: "i:", cursor: curseur, limit: 1000 });
    cles.push(...lot.keys.map((k) => k.name));
    curseur = lot.list_complete ? undefined : lot.cursor;
  } while (curseur && cles.length < 5000);

  const fiches = [];
  for (let i = 0; i < cles.length; i += 50) {
    const lot = await Promise.all(cles.slice(i, i + 50).map((c) => env.INSCRIPTIONS.get(c, "json")));
    fiches.push(...lot.filter(Boolean));
  }
  fiches.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return reponse({ inscriptions: fiches });
}

export const onRequest = () => reponse({ erreur: "Méthode non autorisée." }, 405);

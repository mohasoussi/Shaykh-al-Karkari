/* Worker Cloudflare : sert le site (dossier dist) et gère les deux adresses du formulaire.
   POST /api/inscription   → range une fiche dans l'espace KV INSCRIPTIONS
   GET  /api/inscriptions  → liste réservée à l'administrateur (secret ADMIN_TOKEN) */
import { onRequestPost as enregistrer } from "../functions/api/inscription.js";
import { onRequestGet as lister } from "../functions/api/inscriptions.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/inscription" && request.method === "POST") return enregistrer({ request, env });
    if (pathname === "/api/inscriptions" && request.method === "GET") return lister({ request, env });
    if (pathname.startsWith("/api/")) return new Response(JSON.stringify({ erreur: "Introuvable." }), { status: 404, headers: { "Content-Type": "application/json" } });
    return env.ASSETS.fetch(request);
  },
};

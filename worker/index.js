/* Worker Cloudflare : sert le site (dossier dist), redirige shaykh-alkarkari.com vers www
   et gère les deux adresses du formulaire.
   POST /api/inscription   → range une fiche dans l'espace KV INSCRIPTIONS
   GET  /api/inscriptions  → liste réservée à l'administrateur (secret ADMIN_TOKEN) */
import { onRequestPost as enregistrer } from "../functions/api/inscription.js";
import { onRequestGet as lister } from "../functions/api/inscriptions.js";
import conf from "../site.config.json";

export default {
  async fetch(request, env) {
    const u = new URL(request.url);
    try {
      const officiel = new URL(conf.domaine);
      const nu = officiel.hostname.replace(/^www\./, "");
      if (u.hostname === nu && officiel.hostname !== nu) {
        u.hostname = officiel.hostname;
        return Response.redirect(u.toString(), 301);
      }
    } catch {}
    const { pathname } = u;
    if (pathname === "/api/inscription" && request.method === "POST") return enregistrer({ request, env });
    if (pathname === "/api/inscriptions" && request.method === "GET") return lister({ request, env });
    if (pathname.startsWith("/api/")) return new Response(JSON.stringify({ erreur: "Introuvable." }), { status: 404, headers: { "Content-Type": "application/json" } });
    return env.ASSETS.fetch(request);
  },
};

/* Redirige l'adresse sans « www » (shaykh-alkarkari.com) vers l'adresse officielle (www.shaykh-alkarkari.com),
   définie dans site.config.json. Ne fait rien sur les autres adresses (pages.dev, essais…). */
import conf from "../site.config.json";

export async function onRequest({ request, next }) {
  try {
    const u = new URL(request.url);
    const officiel = new URL(conf.domaine);
    const nu = officiel.hostname.replace(/^www\./, "");
    if (u.hostname === nu && officiel.hostname !== nu) {
      u.hostname = officiel.hostname;
      return Response.redirect(u.toString(), 301);
    }
  } catch {}
  return next();
}

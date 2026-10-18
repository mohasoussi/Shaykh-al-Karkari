/* Actualités rédigées sur ce site (non importées de karkariya.fr).
   - métadonnées : src/data/actualites-maison.json  (slug, titre, date, extrait, couverture, vignette, imageAlt)
   - texte (HTML) : scripts/actualites-maison/<slug>.html ; images : public/actualites/<slug>/
   Leurs pages (actualite-<slug>.html) sont générées ici et conservées à chaque import. Pour ajouter une actualité : voir ces trois emplacements. */
import fs from "node:fs/promises";
import path from "node:path";
import { pageArticle, TYPES } from "./gabarits-actualites.mjs";

export async function lireActualitesMaison(site) {
  try { return JSON.parse(await fs.readFile(path.join(site, "src", "data", "actualites-maison.json"), "utf8")); } catch { return []; }
}

export async function ecrirePagesMaison(site, maison) {
  for (const a of maison) {
    const html = await fs.readFile(path.join(site, "scripts", "actualites-maison", `${a.slug}.html`), "utf8");
    await fs.writeFile(path.join(site, `actualite-${a.slug}.html`), pageArticle({ ...a, html: html.trim() }, null, null, TYPES.actualite));
  }
}

#!/usr/bin/env node
/* Albums photo par événement (scripts/albums.json + public/media/evenements/<id>/).
   - ajoute la galerie sous l'article d'actualité correspondant (repères <!--album:debut/fin-->)
   - la page Média (scripts/media.mjs) affiche tous les albums
   Pour un nouvel événement : déposer les photos dans public/media/evenements/<id>/ (+ miniatures dans t/), les déclarer dans albums.json, puis relancer. */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function lireAlbums() {
  try { return JSON.parse(await fs.readFile(path.join(SITE, "scripts", "albums.json"), "utf8")); } catch { return []; }
}

export function htmlAlbum(a, code, pre = "") {
  return a.photos.map((p) => `        <a class="galerie-item" href="${pre}media/evenements/${a.id}/${p.f}.webp" data-reveal><img src="${pre}media/evenements/${a.id}/t/${p.f}.webp" alt="${esc(p.alt[code] || p.alt.fr)}" loading="lazy" decoding="async" /></a>`).join("\n");
}

/** Page d'article d'un événement (albums avec « corps ») : evenement-<id>.html */
async function pageEvenement(a) {
  const html = `<!doctype html>
<html lang="fr">
<head>
  <!--@include head-->
  <title>${esc(a.titre.fr)} — Shaykh Mohamed Faouzi Al Karkari</title>
  <meta name="description" content="${esc(a.texte?.fr || a.titre.fr)}" />
  <meta property="og:title" content="${esc(a.titre.fr)}" />
  <meta property="og:description" content="${esc(a.texte?.fr || a.titre.fr)}" />
  <meta property="og:image" content="/media/evenements/${a.id}/${a.photos[0].f}.webp" />
</head>
<body data-page="actualite">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <article class="actu-article">
      <a class="actu-retour" href="galerie.html#${a.id}">← La galerie</a>
      <header class="actu-entete">
        <p class="kicker">Événement</p>
        <h1>${esc(a.titre.fr)}</h1>
      </header>
      <div class="actu-corps">
${a.corps.map((c) => (c.startsWith("<") ? c : `<p>${c}</p>`)).join("\n")}
      </div>
      <section class="album-article"><h2 class="album-titre">Photos</h2>
      <div class="galerie" data-close="Fermer" data-prev="Photo précédente" data-next="Photo suivante">
${htmlAlbum(a, "fr")}
      </div>${a.credit ? `<p class="galerie-credit">Photos : ${esc(a.credit)}</p>` : ""}</section>
    </article>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  await fs.writeFile(path.join(SITE, `evenement-${a.id}.html`), html);
}

export async function genererAlbums() {
  let n = 0;
  for (const a of await lireAlbums()) if (a.corps) await pageEvenement(a);
  for (const a of await lireAlbums()) {
    if (!a.article) continue;
    const f = path.join(SITE, `actualite-${a.article}.html`);
    let h;
    try { h = await fs.readFile(f, "utf8"); } catch { continue; }
    const bloc = `<!--album:debut-->
      <section class="album-article"><h2 class="album-titre">Photos</h2>
      <div class="galerie" data-close="Fermer" data-prev="Photo précédente" data-next="Photo suivante">
${htmlAlbum(a, "fr")}
      </div></section>
      <!--album:fin-->`;
    h = h.replace(/<!--album:debut-->[\s\S]*?<!--album:fin-->\s*/, "");
    h = h.replace('<nav class="actu-voisins"', `${bloc}\n      <nav class="actu-voisins"`);
    await fs.writeFile(f, h);
    n++;
  }
  console.log(`[albums] ${n} article(s) illustré(s)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await genererAlbums();

#!/usr/bin/env node
/* Albums photo par événement (scripts/albums.json + public/media/evenements/<id>/).
   - ajoute la galerie sous l'article d'actualité correspondant (repères <!--album:debut/fin-->)
   - la page Média (scripts/media.mjs) affiche tous les albums
   Pour un nouvel événement : déposer les photos dans public/media/evenements/<id>/ (+ miniatures dans t/), les déclarer dans albums.json, puis relancer. */
import fs from "node:fs/promises";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const RATIOS = JSON.parse(readFileSync(path.join(SITE, "scripts", "ratios.json"), "utf8"));

export async function lireAlbums() {
  try { return JSON.parse(await fs.readFile(path.join(SITE, "scripts", "albums.json"), "utf8")); } catch { return []; }
}

export function htmlAlbum(a, code, pre = "") {
  return a.photos.map((p) => `        <a class="galerie-item" style="--r:${RATIOS[a.id + "/" + p.f] || 1.5}" href="${pre}media/evenements/${a.id}/${p.f}.webp" data-reveal><img src="${pre}media/evenements/${a.id}/t/${p.f}.webp" alt="${esc(p.alt[code] || p.alt.fr)}" loading="lazy" decoding="async" /></a>`).join("\n");
}

/** Page d'article d'un événement (albums avec « corps ») : evenement-<id>.html */
async function pageEvenement(a) {
  const html = `<!doctype html>
<html lang="fr">
<head>
  <!--@include head-->
  <title>${esc(a.titre_article || a.titre.fr)} — Shaykh Mohamed Faouzi Al Karkari</title>
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
      <a class="actu-retour" href="${a.rubrique === "media" ? "media.html" : "galerie.html"}#${a.id}">← ${a.rubrique === "media" ? "Média" : "La galerie"}</a>
      <header class="actu-entete">
        <p class="kicker">Événement</p>
        <h1>${esc(a.titre_article || a.titre.fr)}</h1>
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

const LANGUES = {
  en: { dir: "en", lang: "en", rtl: false, site: "Shaykh Mohamed Faouzi Al Karkari", kicker: "Event", galerie: "← The gallery", media: "← Media", photos: "Photos", credit: "Photos", fermer: "Close", prec: "Previous photo", suiv: "Next photo" },
  ar: { dir: "ar", lang: "ar", rtl: true, site: "الشيخ محمد فوزي الكركري", kicker: "فعالية", galerie: "المعرض →", media: "الإعلام →", photos: "الصور", credit: "الصور", fermer: "إغلاق", prec: "الصورة السابقة", suiv: "الصورة التالية" },
};

/** Version anglaise ou arabe d'une page d'événement (textes : scripts/albums-i18n.mjs). */
async function pageEvenementLangue(a, code, textes) {
  const T = LANGUES[code];
  const t = textes[a.id];
  if (!t) return;
  const titre = t.titre_article || a.titre[code];
  const desc = (a.texte?.[code] || titre).replace(/<[^>]+>/g, "");
  const html = `<!doctype html>
<html lang="${T.lang}"${T.rtl ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(titre)} — ${T.site}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:title" content="${esc(titre)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="/media/evenements/${a.id}/${a.photos[0].f}.webp" />
</head>
<body data-page="actualite">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <article class="actu-article">
      <a class="actu-retour" href="${a.rubrique === "media" ? "media.html" : "galerie.html"}#${a.id}">${a.rubrique === "media" ? T.media : T.galerie}</a>
      <header class="actu-entete">
        <p class="kicker">${T.kicker}</p>
        <h1>${esc(titre)}</h1>
      </header>
      <div class="actu-corps">
${t.corps.map((c) => (c.startsWith("<") ? c : `<p>${c}</p>`)).join("\n")}
      </div>
      <section class="album-article"><h2 class="album-titre">${T.photos}</h2>
      <div class="galerie" data-close="${T.fermer}" data-prev="${T.prec}" data-next="${T.suiv}">
${htmlAlbum(a, code, "../")}
      </div>${a.credit ? `<p class="galerie-credit">${T.credit} : ${esc(a.credit)}</p>` : ""}</section>
    </article>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  await fs.mkdir(path.join(SITE, T.dir), { recursive: true });
  await fs.writeFile(path.join(SITE, T.dir, `evenement-${a.id}.html`), html);
}

export async function genererAlbums() {
  const I18N = await import("./albums-i18n.mjs");
  for (const a of await lireAlbums()) if (a.corps) { await pageEvenementLangue(a, "en", I18N.EN); await pageEvenementLangue(a, "ar", I18N.AR); }
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

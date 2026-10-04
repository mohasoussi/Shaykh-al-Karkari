#!/usr/bin/env node
/* Génère une page de biographie par maître de la chaîne de transmission : maitre-<nom>.html
   (données : scripts/maitres-data.mjs). Utilisation : node scripts/maitres.mjs */
import fs from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";
import { MAITRES } from "./maitres-data.mjs";
import { esc } from "./gabarits-actualites.mjs";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();

/** Clé de comparaison : sans accents, apostrophes ni ponctuation. */
export const cle = (t = "") =>
  String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/gi, "").toLowerCase();

const PAR_CLE = new Map(MAITRES.map((m) => [cle(m.cle), m]));
/** Adresse de la biographie d'un maître de la chaîne, ou null. */
export function lienMaitre(nom) {
  const m = PAR_CLE.get(cle(nom));
  return m ? `maitre-${m.slug}.html` : null;
}

// retire les formules de politesse entre parenthèses, harmonise l'orthographe
const epure = (t) =>
  t
    .replace(/\s*\(\s*sall[^)]*\)/gi, " ﷺ")
    .replace(/\s*\((?=[^()]*(?:radi|rahim|qaddas|karram))[^()]*\)/gi, "")
    .replace(/\bSheykh/g, "Shaykh").replace(/\bsheykh/g, "shaykh")
    .replace(/(^|[\s(«>])(?:s[îi]d[îi]|sayid[îi])(?=[\s,.;:)])/gi, "$1Sidi")
    .replace(/\s{2,}/g, " ");

async function corpsKarkariya(slug) {
  const brut = JSON.parse(await fs.readFile(path.join(SITE, "scripts", "maitres-sources", `${slug}.json`), "utf8"))[0].content.rendered;
  let h = sanitizeHtml(brut, {
    allowedTags: ["p", "h3", "em", "ul", "li", "blockquote"],
    allowedAttributes: {},
    transformTags: { h1: "h3", h2: "h3", h4: "h3", strong: "span", b: "span" },
    exclusiveFilter: (f) => !f.text.trim() || /^بسم الله|و الصلاة/.test(f.text.trim()) || /^Le S[hk]?[eh]?y?kh sidi/i.test(f.text.trim()) && f.tag === "h3",
  });
  h = h.replace(/<\/?span>/g, "").replace(/<h3>\s*(?:Le Sheykh[^<]*)<\/h3>/gi, "");
  h = epure(h).replace(/<h3>\s*([^<]*?)\s*[:：]?\s*<\/h3>/g, "<h3>$1</h3>").replace(/<br\s*\/?>/g, " ");
  return h.replace(/<p>\s*(Source|Sources)\s*:[^<]*<\/p>/gi, "");
}

function page(m, corps) {
  const titre = `${m.nom} — Shaykh Mohamed Faouzi Al Karkari`;
  const desc = (m.intro || m.sous).replace(/\s+/g, " ").slice(0, 200);
  return `<!doctype html>
<html lang="fr">
<head>
  <!--@include head-->
  <title>${esc(titre)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:title" content="${esc(titre)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="/media/transmission-zaouia.webp" />
</head>
<body data-page="shaykh">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="shaykh-texte maitre">
      <div class="section-head">
        <p class="kicker">Chaîne de transmission</p>
        <h1 class="h2" data-split>${esc(m.nom)}</h1>
        <p class="maitre-sous" data-reveal>${esc(m.sous)}</p>
      </div>
      <div class="actu-corps">
${m.intro ? `        <p class="maitre-intro">${esc(m.intro)}</p>\n` : ""}${corps}
      </div>
      <div class="center shaykh-suite"><a class="btn-glass btn-glass--dark" href="chaine-de-transmission.html"><span>← La chaîne de transmission</span></a></div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
}

export async function genererMaitres() {
  for (const m of MAITRES) {
    let corps;
    if (m.karkariya) {
      m.sous = m.sous;
      corps = await corpsKarkariya(m.karkariya);
    } else {
      corps = m.sections.map(([h, ps]) => `        <h3>${esc(h)}</h3>\n${ps.map((p) => `        <p>${p}</p>`).join("\n")}`).join("\n");
    }
    await fs.writeFile(path.join(SITE, `maitre-${m.slug}.html`), page(m, corps));
  }
  console.log(`[maîtres] ${MAITRES.length} biographies`);
}

import { fileURLToPath } from "node:url";
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await genererMaitres();

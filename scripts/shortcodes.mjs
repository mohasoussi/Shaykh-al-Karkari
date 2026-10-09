#!/usr/bin/env node
/* Retire les « shortcodes » WordPress (Visual Composer…) qui apparaissent en clair dans le texte des articles importés :
   [vc_masonry_media_grid …], [vc_tta_section title="…"], [vc_btn title="…" link="url:…"], [/vc_column_text]…
   - un titre d'onglet devient un intertitre, un bouton devient un lien, le reste est supprimé.
   Utilisation manuelle sur les pages déjà générées : node scripts/shortcodes.mjs */
import fs from "node:fs";

const Q = "[«»\"”″“]";
const attr = (s, nom) => (s.match(new RegExp(`${nom}\\s*=\\s*${Q}\\s*([^«»\"”″“]*?)\\s*${Q}`)) || [])[1] || "";

export function nettoyerShortcodes(html = "") {
  let t = html.replace(/\[vc_tta_section\b([^\]]*)\]/g, (m, a) => (attr(a, "title") ? `<h3>${attr(a, "title")}</h3>` : ""));
  t = t.replace(/\[vc_btn\b([^\]]*)\]/g, (m, a) => {
    const titre = attr(a, "title");
    const lien = decodeURIComponent((attr(a, "link").match(/url:([^|]*)/) || [])[1] || "");
    return titre && lien ? `<p><a href="${lien}">${titre}</a></p>` : "";
  });
  t = t.replace(/\[\/?(?:vc_[a-z_]*|gallery|caption)\b[^\]]*\]/g, "");
  return t.replace(/<p>\s*<\/p>/g, "");
}

if (process.argv[1]?.endsWith("shortcodes.mjs")) {
  let n = 0;
  for (const f of fs.readdirSync(".")) {
    if (!/^(actualite|enseignement)-.*\.html$/.test(f)) continue;
    const a = fs.readFileSync(f, "utf8");
    if (!/\[\/?vc_|\[gallery/.test(a)) continue;
    fs.writeFileSync(f, nettoyerShortcodes(a));
    n++;
  }
  console.log(`[shortcodes] ${n} page(s) nettoyée(s)`);
}

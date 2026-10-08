#!/usr/bin/env node
/* Uniformise la transcription des noms propres sur tout le site : « Bouzidiy » → « Bouzidi », « Wakiliy » → « Wakili », etc.
   Ne touche ni aux adresses (href, src), ni aux mots arabes courants (waliy, nabiy…), ni à « Karkariya ».
   Appelé par l'importer ; utilisation manuelle : node scripts/normaliser-noms.mjs */
import fs from "node:fs/promises";
import path from "node:path";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();

// radicaux des noms propres dont la finale « -iy » devient « -i » (Karkar-iy → Karkar-i)
const NOMS = ["karkar", "wakil", "fass", "fawz", "alaw", "mustaghanem", "bouzid", "shadhil", "sakandar", "iskandar", "murs", "mahaj", "hadram", "fard", "darqaw", "sanhaj", "qadir", "khassass", "jilan", "tlemcen", "hassan", "idriss", "boukil", "ghazwan", "marwan", "qazwan", "basr", "ansar", "tirmidh", "mundhir", "quchayr", "wartajab", "fardan"];
const RE_IY = new RegExp(`\\b(${NOMS.join("|")})iy\\b`, "gi");
const RE_AUTRES = [
  [/([ʿ‘’'`]?A)liy\b/g, "$1li"], // ‘Aliy → ‘Ali
  [/([ʿ‘’'`]A)rbiy\b/g, "$1rbi"], // ‘Arbiy → ‘Arbi
  [/dhiliy\b/g, "dhili"], // Shâdhiliy → Shâdhili
  [/([Kk])arkariy\b/g, "$1arkari"], // ElKarkariy → ElKarkari
  [/\b(al-)?Mahassin\b/g, "$1Mahasin"],
  [/\bYoussouf al-Fas/g, "Yusuf al-Fas"],
  [/\bal-Fassi\b/g, "al-Fasi"],
  [/\bMachich\b/g, "Mashish"],
  // « Tariqa Karkariya » n'a pas de sens pour un public francophone : « Ordre soufi Karkariya » (titres de livres étrangers exclus)
  [/(?<!Fundamentos )\bde la Tariqa Kar(?:kariya|kaira|karia|akiya|akriya)\b/g, "de l'Ordre soufi Karkariya"],
  [/(?<!Fundamentos de )\bla Tariqa Kar(?:kariya|kaira|karia|akiya|akriya)\b/g, "l'Ordre soufi Karkariya"],
  [/\bLa Tariqa Kar(?:kariya|kaira|karia|akiya|akriya)\b/g, "L'Ordre soufi Karkariya"],
  [/(?<!van )\bde Tariqa Kar(?:kariya|kaira|karia|akiya|akriya)\b/g, "de l'Ordre soufi Karkariya"],
  [/(?<!van de )(?<!Fundamentos de la )\bTariqa Kar(?:kariya|kaira|karia|akiya|akriya)\b/g, "Ordre soufi Karkariya"],
  [/Karkariya Tariqa/g, "Karkariya Sufi Order"],
  [/\bMuhammad Fawzi al-Karkari\b/g, "Mohamed Faouzi Al Karkari"],
];

export function normaliser(texte) {
  let t = texte.replace(RE_IY, (m, nom) => m.slice(0, -1));
  t = t.replace(/\bFassi\b/g, "Fasi").replace(/\bal-Fassi\b/g, "al-Fasi");
  for (const [re, par] of RE_AUTRES) t = t.replace(re, par);
  return t;
}

// dans une balise, seuls ces attributs sont de vrais textes (jamais href/src/data-*)
const ATTR_TEXTE = /\b(alt|title|aria-label|content)="([^"]*)"/g;

export function normaliserHtml(html) {
  return html
    .split(/(<[^>]+>)/)
    .map((seg) => {
      if (seg.startsWith("<!--")) return seg;
      if (seg.startsWith("<")) return seg.replace(ATTR_TEXTE, (m, a, v) => `${a}="${normaliser(v)}"`);
      return normaliser(seg);
    })
    .join("");
}

export async function normaliserNoms() {
  const dossiers = ["", "en", "ar"];
  let n = 0;
  for (const d of dossiers) {
    const dir = path.join(SITE, d);
    for (const f of await fs.readdir(dir)) {
      if (!f.endsWith(".html")) continue;
      const p = path.join(dir, f);
      const h = await fs.readFile(p, "utf8");
      const out = normaliserHtml(h);
      if (out !== h) { await fs.writeFile(p, out); n++; }
    }
  }
  console.log(`[noms] ${n} pages uniformisées`);
}

import { fileURLToPath } from "node:url";
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await normaliserNoms();

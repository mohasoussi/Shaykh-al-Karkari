#!/usr/bin/env node
/* Allège le vocabulaire des enseignements pour un public francophone :
   - supprime les formules de révérence (ta'ala, mawlana, sallAllâhu ʿalayhi wa sallam, qadassa Allahu sirrahu, radiyAllahu ʿanhu…)
   - « Tariqa » → « voie », « mourid » → « aspirant », « tafsir » → « exégèse »
   Appelé par l'importer sur chaque enseignement ; manuel : node scripts/epurer-enseignements.mjs */
import fs from "node:fs";
import path from "node:path";

const HONORIFIQUE = /^\s*(?:قدس|قدّس|رضي|صلى|سبحانه|salla|sall\s?allah|qadass?a|qudiss?a|quddiss?a|qaddas?a|radi[a-z]*\s?allah|rahima?hu|subhana?hu|[ʿ‘’'`]?azza\s+wa|[ʿ‘’'`]?alayhi\s+(?:a?s-?)?salam|ta[ʿ‘’'`]?[aâ]l[aâ])/i;
const sansBalises = (t) => t.replace(/<[^>]*>/g, "");

const mots = (t) => {
  t = t.replace(/\b([Ll])e tafsir\b/g, (m, l) => `${l}'exégèse`).replace(/\bdu tafsir\b/g, "de l'exégèse").replace(/\bau tafsir\b/g, "à l'exégèse").replace(/\b([Cc])e tafsir\b/g, "$1et exégèse").replace(/\bTafsir\b/g, "Exégèse").replace(/\btafsir\b/g, "exégèse");
  t = t.replace(/\b[Tt]afs[iîī]r\s+(?:de la |de |du )?(?=sourate)/g, "Exégèse de la ").replace(/\b[Tt]afs[iîī]r\b(?![-\w])/g, (m) => (m[0] === "T" ? "Exégèse" : "exégèse"));
  t = t.replace(/\b([Ll])e (<[^>]+>)?mourid\b/g, (m, l, b = "") => `${l}'${b}aspirant`).replace(/\bdu (<[^>]+>)?mourid\b/g, (m, b = "") => `de l'${b}aspirant`).replace(/\bau (<[^>]+>)?mourid\b/g, (m, b = "") => `à l'${b}aspirant`).replace(/\b([Cc])e mourid\b/g, "$1et aspirant");
  t = t.replace(/\bMourid(e?s)?\b/g, (m, s) => (s ? "Aspirants" : "Aspirant")).replace(/\bmourid(e?s)?\b/g, (m, s) => (s ? "aspirants" : "aspirant"));
  t = t.replace(/(?<![\w\/-])Tariqa(?![\w-])/g, "Voie").replace(/(?<![\w\/-])tariqa(?![\w-])/g, "voie");
  t = t.replace(/(?<=[a-zé’'] )Voie\b/g, "voie");
  return t;
};

const BASMALA_FR = "<h3><strong>Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.<br>Que la prière et la paix soient sur le plus noble des Envoyés, sur sa famille et sur tous ses compagnons.</strong></h3>";

export function epurer(html = "") {
  let t = html;
  // en-tête arabe (basmala + prière sur le Prophète) → français
  t = t.replace(/<h3>(?:(?!<\/h3>)[\s\S])*?<\/h3>/g, (m) => (/بسم الله/.test(m) && sansBalises(m).length < 220 ? BASMALA_FR : m));
  // parenthèses de révérence : (sallAllâhu ‘alayhi wa sallam), (qadassa Allahu sirahu)…
  t = t.replace(/\s*\(((?:[^()<]|<[^>]*>)*)\)/g, (m, inner) => (HONORIFIQUE.test(sansBalises(inner)) ? "" : m));
  // formules isolées
  t = t.replace(/\s*,?\s*(?:subhanahu\s+wa\s+)?[Tt]a[ʿ‘’'`]?[aâ]l[aâ]\b/g, "");
  t = t.replace(/\b[Mm]awl[aâ]n[aâ]\s+/g, "");
  // vocabulaire : seulement dans le texte et dans les attributs lisibles (jamais dans les adresses href/src)
  t = t.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, txt) => (tag ? tag.replace(/\b(alt|title|content|data-titre)="([^"]*)"/g, (mm, k, v) => `${k}="${mots(v)}"`) : mots(txt)));
  return t;
}

if (process.argv[1]?.endsWith("epurer-enseignements.mjs")) {
  const racine = process.cwd();
  let n = 0;
  const traiter = (f) => {
    const a = fs.readFileSync(f, "utf8"), b = epurer(a);
    if (a !== b) { fs.writeFileSync(f, b); n++; }
  };
  for (const f of fs.readdirSync(racine)) if (/^enseignement-.*\.html$/.test(f) && !f.includes("siyaha")) traiter(f);
  traiter("enseignements.html");
  const jf = path.join(racine, "src/data/enseignements.json");
  const data = JSON.parse(fs.readFileSync(jf, "utf8"));
  for (const e of data) for (const k of ["titre", "extrait", "html", "imageAlt"]) if (typeof e[k] === "string") e[k] = epurer(e[k]);
  fs.writeFileSync(jf, JSON.stringify(data, null, 2));
  console.log(`[epurer-enseignements] ${n} fichier(s) modifié(s)`);
}

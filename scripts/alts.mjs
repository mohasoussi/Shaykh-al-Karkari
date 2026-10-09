/* Textes alternatifs (alt) des images en anglais et en arabe.
   Dictionnaire scripts/alts-i18n.json : { "texte français (ou anglais) tel qu'il apparaît": ["anglais", "arabe"] }.
   Les titres d'articles sont déduits des traductions d'articles ; le reste est saisi à la main dans le dictionnaire.
   Utilisation : node scripts/alts.mjs        (appliqué à en/ et ar/, appelé par langues.mjs)
               node scripts/alts.mjs --manquants   (liste ce qui reste à traduire) */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dec = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const lire = async (p) => { try { return JSON.parse(await fs.readFile(p, "utf8")); } catch { return null; } };
const arabe = (s) => /[؀-ۿ]/.test(s);
const aTraduire = (s, code) => code === "ar" ? !arabe(s) : /[éèàùçêôîï’]|\b(Le|La|Les|du|des|avec|dans|devant|lors|sur|de|et)\b/.test(s);

export async function appliquerAlts({ manquants = false } = {}) {
  const dico = Object.fromEntries(Object.entries((await lire(path.join(SITE, "scripts/alts-i18n.json"))) || {}).map(([k, v]) => [k.normalize("NFC"), v]));
  const titres = {}; // titre français -> [en, ar]
  const dir = path.join(SITE, "scripts/traductions");
  for (const f of await fs.readdir(path.join(dir, "fr")).catch(() => [])) {
    const fr = await lire(path.join(dir, "fr", f));
    const en = await lire(path.join(dir, "en", f)), ar = await lire(path.join(dir, "ar", f));
    const tt = (await lire(path.join(SITE, "scripts/titres-traduits.json"))) || {};
    const t = tt[fr.slug];
    titres[dec(fr.titre).trim().normalize("NFC")] = [t?.[0] || en?.titre, t?.[1] || ar?.titre];
  }
  const manque = new Map();
  for (const [code, i] of [["en", 0], ["ar", 1]]) {
    for (const f of (await fs.readdir(path.join(SITE, code))).filter((x) => x.endsWith(".html"))) {
      const p = path.join(SITE, code, f);
      const h = await fs.readFile(p, "utf8");
      const n = h.replace(/\balt="([^"]*)"/g, (m, a) => {
        const cle = dec(a).trim().normalize("NFC");
        if (!cle || !aTraduire(cle, code)) return m;
        const tr = (dico[cle] || titres[cle])?.[i];
        if (tr) return `alt="${esc(tr)}"`;
        manque.set(cle, (manque.get(cle) || 0) + 1);
        return m;
      });
      if (n !== h) await fs.writeFile(p, n);
    }
  }
  return manque;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const m = await appliquerAlts();
  console.log(`[alts] ${m.size} texte(s) sans traduction`);
  if (process.argv.includes("--manquants")) await fs.writeFile(path.join(SITE, "scripts/alts-manquants.json"), JSON.stringify(Object.fromEntries([...m.keys()].map((k) => [k, ["", ""]])), null, 1));
}

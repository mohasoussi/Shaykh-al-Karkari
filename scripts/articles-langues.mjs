/* Pages d'articles (actualités + enseignements) en anglais et en arabe.
   Entrée  : scripts/traductions/<fr|en|ar>/<actualite|enseignement>-<slug>.json  (fr = scripts/articles-sources.mjs)
   Sortie  : en/ et ar/ <page>.html pour chaque article traduit ; les listes et l'accueil pointent alors vers la version traduite.
   Un article sans traduction reste en français (lien vers la page française, marquée « en français »). */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CODES = ["en", "ar"];
const esc = (t = "") => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lireJson = async (p) => { try { return JSON.parse(await fs.readFile(p, "utf8")); } catch { return null; } };
const NOM_SITE = { en: "Shaykh Mohamed Faouzi Al Karkari", ar: "الشيخ محمد فوزي الكركري" };
const LIBELLES = {
  en: { actualite: { kicker: "News", retour: "← All news" }, humanitaire: { kicker: "Humanitarian actions", retour: "← All humanitarian actions" }, enseignement: { kicker: "Teachings", retour: "← All teachings" }, marche: "A 10-year walk across Morocco", photos: "Photos", fermer: "Close", avant: "Previous photo", apres: "Next photo", prec: "← Previous article", suiv: "Next article →", autres: "Other articles" },
  ar: { actualite: { kicker: "الأخبار", retour: "→ كل الأخبار" }, humanitaire: { kicker: "الأعمال الإنسانية", retour: "→ كل الأعمال الإنسانية" }, enseignement: { kicker: "الدروس", retour: "→ كل الدروس" }, marche: "مسيرة عشر سنوات عبر المغرب", photos: "صور", fermer: "إغلاق", avant: "الصورة السابقة", apres: "الصورة التالية", prec: "→ المقال السابق", suiv: "المقال التالي ←", autres: "مقالات أخرى" },
};
const resume = (corps) => esc(corps.replace(/<!--M\d+-->/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 170));

export async function genererArticles(localiser) {
  if (!localiser) ({ localiser } = await import("./langues.mjs"));
  const titresTr = (await lireJson(path.join(SITE, "scripts/titres-traduits.json"))) || {};
  const dossierFr = path.join(SITE, "scripts/traductions/fr");
  const noms = (await fs.readdir(dossierFr).catch(() => [])).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));
  const faits = { en: new Map(), ar: new Map() }; // nom -> {titre}
  for (const code of CODES) for (const nom of noms) {
    const t = await lireJson(path.join(SITE, "scripts/traductions", code, `${nom}.json`));
    if (t?.corps) faits[code].set(nom, t);
  }
  const titreDe = (code, nom, fr, t) => titresTr[fr.slug]?.[code === "en" ? 0 : 1] || t?.titre || fr.titre;

  for (const code of CODES) {
    for (const [nom, t] of faits[code]) {
      const fr = await lireJson(path.join(dossierFr, `${nom}.json`));
      const L = LIBELLES[code], lib = L[fr.type];
      let h = await fs.readFile(path.join(SITE, `${nom}.html`), "utf8");
      const maitre = /^<p class="maitre-sous">/.test(fr.corps);
      if (maitre) h = h.replace(/(<div class="actu-corps">)[\s\S]*?(<\/div>\s*<div class="center shaykh-suite">)/, "$1@@CORPS@@$2");
      else h = h.replace(/(<div class="actu-corps">)[\s\S]*?(<\/div>\s*(?:<!--album:debut-->[\s\S]*?<!--album:fin-->\s*)?<nav class="actu-voisins")/, "$1@@CORPS@@$2");
      // album photo : chemins relatifs, intitulé et libellés de la visionneuse
      h = h.replace(/<!--album:debut-->[\s\S]*?<!--album:fin-->/, (a) => a
        .replace(/(href|src)="media\//g, '$1="../media/')
        .replace('<h2 class="album-titre">Photos</h2>', `<h2 class="album-titre">${L.photos}</h2>`)
        .replace(/data-close="[^"]*" data-prev="[^"]*" data-next="[^"]*"/, `data-close="${L.fermer}" data-prev="${L.avant}" data-next="${L.apres}"`));
      h = localiser(h, code).replace('<html lang="fr">', `<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>`);
      const titre = titreDe(code, nom, fr, t);
      let corps = t.corps.replace(/<!--M(\d+)-->/g, (_, i) => fr.figures[+i] ?? "");
      corps = corps.replace(/(href|src)="(actualite-|enseignement-|actualites\/|enseignements\/|shaykh\/|media\/)/g, '$1="../$2');
      let sous = "";
      if (maitre) {
        const m = corps.match(/^<p class="maitre-sous">([\s\S]*?)<\/p>\s*/);
        if (m) { sous = m[1]; corps = corps.slice(m[0].length); }
      }
      const desc = resume(corps);
      h = h
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(titre)} — ${NOM_SITE[code]}</title>`)
        .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
        .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(titre)}`)
        .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
        .replace(/<p class="kicker">[^<]*<\/p>/, `<p class="kicker">${lib.kicker}</p>`)
        .replace(/<h1>[^<]*<\/h1>/, `<h1>${esc(titre)}</h1>`)
        .replace(/(<figure class="actu-couverture"><img [^>]*alt=")[^"]*/, `$1${esc(titre)}`)
        .replace(/(<a class="actu-retour" href="[^"]*">)[^<]*/, `$1${lib.retour}`)
        .replace(/(<nav class="actu-voisins" aria-label=")[^"]*/, `$1${L.autres}`)
        .replace("@@CORPS@@", () => corps);
      if (maitre) {
        h = h.replace(/<h1 ([^>]*)>[^<]*<\/h1>/, `<h1 $1>${esc(titre)}</h1>`)
          .replace(/(<p class="maitre-sous"[^>]*>)[^<]*/, `$1${esc(sous)}`)
          .replace(/(<figure class="marche-photo"[^>]*><img [^>]*alt=")[^"]*/, `$1${esc(titre)}`)
          .replace(/<div class="center shaykh-suite">[\s\S]*?<\/div>/, (bloc) => bloc
            .replace(/(href="enseignements\.html"><span>)[^<]*/, `$1${lib.retour}`)
            .replace(/(href="marche-de-dix-ans\.html"><span>)[^<]*/, `$1${L.marche}`));
      }
      // voisins : version traduite si elle existe, sinon page française marquée comme telle
      h = h.replace(/<a class="actu-voisin ([^"]*)" href="\.\.\/((?:actualite|enseignement)-[^"]+)\.html"><span>[^<]*<\/span><strong>[^<]*<\/strong><\/a>/g, (m, cls, vnom) => {
        const sens = cls.includes("--prec") ? L.prec : L.suiv;
        const vfr = vnom;
        const vslug = vfr.replace(/^(actualite|enseignement)-/, "");
        const tr = titresTr[vslug]?.[code === "en" ? 0 : 1];
        if (faits[code].has(vfr)) return `<a class="actu-voisin ${cls}" href="${vfr}.html"><span>${sens}</span><strong>${esc(tr || faits[code].get(vfr).titre)}</strong></a>`;
        const m2 = m.match(/<strong>([^<]*)<\/strong>/)[1];
        return `<a class="actu-voisin ${cls}" href="../${vfr}.html"><span>${sens}</span><strong lang="fr" dir="ltr">${m2}</strong></a>`;
      });
      await fs.mkdir(path.join(SITE, code), { recursive: true });
      await fs.writeFile(path.join(SITE, code, `${nom}.html`), h);
    }
  }

  // listes, accueil et autres pages : les liens vers un article traduit pointent vers sa version traduite, sans la mention « en français »
  for (const code of CODES) {
    const fichiers = (await fs.readdir(path.join(SITE, code))).filter((f) => f.endsWith(".html") && !/^(actualite|enseignement)-/.test(f));
    for (const f of fichiers) {
      const p = path.join(SITE, code, f);
      let h = await fs.readFile(p, "utf8"), o = h;
      h = h.replace(/<a ([^>]*?)href="\.\.\/((?:actualite|enseignement)-[^"]+)\.html"([^>]*)>([\s\S]*?)<\/a>/g, (m, a, nom, b, inner) => {
        if (!faits[code].has(nom)) return m;
        inner = inner.replace(/\s*\((?:in French|بالفرنسية)\)/g, "").replace(/ lang="fr" dir="ltr"/g, "");
        return `<a ${a}href="${nom}.html"${b}>${inner}</a>`;
      });
      if (h !== o) await fs.writeFile(p, h);
    }
  }
  const total = (await Promise.all(CODES.map(async (c) => `${c}: ${faits[c].size}`))).join(", ");
  console.log(`[articles] pages traduites — ${total} sur ${noms.length}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await genererArticles();

#!/usr/bin/env node
/* Importe automatiquement les articles d'un autre site pour alimenter la page « Actualités ».

   Utilisation :
     npm run actualites                 importe tous les articles (aucune saisie, aucun copier-coller)
     npm run actualites -- --force      retélécharge aussi toutes les images
     npm run actualites -- --vide       remet la page à zéro (« bientôt publiés »)

   Variables facultatives :
     ACTUALITES_SOURCE   site d'origine (par défaut https://karkariya.fr)
     ACTUALITES_CHEMIN   page qui liste les articles (par défaut /actualites/)

   Comment ça marche :
     1. Si le site d'origine est un WordPress, on lit son API officielle (titre, date, texte, image, catégories).
     2. Sinon, on lit la page de liste et on ouvre chaque article.
     3. Le texte est nettoyé, les images sont téléchargées, allégées (WebP) et rangées dans public/actualites/.
     4. On produit : actualites.html (liste), actualite-<nom>.html (un par article), src/data/actualites.json,
        et les 3 derniers articles de l'accueil.
   À chaque mise en ligne (npm run build), l'import est relancé : les nouveaux articles apparaissent seuls. */

import fs from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";
import sharp from "sharp";
import { genererLangues } from "./langues.mjs";
import { genererMaitres, lienMaitre } from "./maitres.mjs";
import { genererAlbums } from "./albums.mjs";
import { esc, pageListe, pageArticle, cartesAccueil, cartesEnseignements, TYPES, LISTES } from "./gabarits-actualites.mjs";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const SOURCE = (process.env.ACTUALITES_SOURCE || "https://karkariya.fr").replace(/\/+$/, "");
const CHEMIN = process.env.ACTUALITES_CHEMIN || "/actualites/";
const MAX = Number(process.env.ACTUALITES_MAX || 500);
const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const VIDE = args.has("--vide");
const TOLERANT = args.has("--tolerant");
const HOTE = new URL(SOURCE).host;
const UA = "Mozilla/5.0 (compatible; ImportActualites/1.0)";

const log = (...m) => console.log("[actualités]", ...m);

/* ---------- utilitaires ---------- */
async function get(url, { json = false, binary = false } = {}) {
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: json ? "application/json" : "*/*" }, signal: AbortSignal.timeout(30000), redirect: "follow" });
  if (!r.ok) {
    const e = new Error(`HTTP ${r.status} sur ${url}`);
    e.status = r.status;
    throw e;
  }
  return json ? r.json() : binary ? Buffer.from(await r.arrayBuffer()) : r.text();
}
const texte = (html = "") => parse(`<div>${html}</div>`).text.replace(/\s+/g, " ").trim();
const absolue = (href, base) => {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
};
const slugifier = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
const slugDepuisURL = (u) => {
  try {
    const segs = new URL(u).pathname.split("/").filter(Boolean);
    return slugifier(decodeURIComponent(segs[segs.length - 1] || ""));
  } catch {
    return "";
  }
};
const extrait = (s, n = 200) => {
  if (s.length <= n) return s;
  const coupe = s.slice(0, n).replace(/\s+\S*$/, "");
  return coupe.replace(/[,;:.\s]+$/, "") + "…";
};
const existe = (p) => fs.access(p).then(() => true, () => false);

/* ---------- filtre éditorial ----------
   La page Actualités ne garde que : événements, conférences et visites du Shaykh, actions humanitaires,
   vie de la tariqa Karkariya. Les cours, enseignements, tafsir, témoignages, réfutations… sont écartés. */
const CATEGORIES_OK = /^(actualit[ée]s|l'actu|le shaykh en europe)/i;
const CATEGORIES_NON = /r[ée]futation|moudhakara|enseignement|tafs[iî]r|cours|basmala|fondements|poème|sorcellerie|biographie|t[ée]moignage|engagement|subha|danse|retraite|p[ée]r[ée]grination|lumi[èe]re/i;
const TITRES_NON = /^\(?cours\)?|r[ée]ponse [àa] l.amour|accompagnement des convertis|^chap\.|pourquoi cheminer|qu.est-ce que la voie/i;
const TOUJOURS = ["zawiya-karkariya-de-lyon-condrieu"]; // classé « sans catégorie » sur l'ancien site mais c'est un événement
export function retenu(a) {
  if (!a.categories?.length) return !a.slug || TOUJOURS.some((t) => a.slug.includes(t)) || !a.estWordPress;
  if (TOUJOURS.some((t) => a.slug?.includes(t))) return true;
  if (TITRES_NON.test(a.titre)) return false;
  if (a.categories.some((c) => CATEGORIES_NON.test(c))) return false;
  return a.categories.some((c) => CATEGORIES_OK.test(c));
}

/* ---------- 1. récupération des articles ---------- */
async function depuisWordPress(filtre = "") {
  let base = "/wp-json/wp/v2/posts";
  const lire = async (chemin) => {
    const out = [];
    for (let p = 1; p <= 30; p++) {
      let lot;
      try {
        lot = await get(`${SOURCE}${chemin}?per_page=100&page=${p}&_embed=1&orderby=date&order=desc${filtre}`, { json: true });
      } catch (e) {
        if (p > 1 && e.status === 400) break; // page au-delà de la dernière
        throw e;
      }
      if (!Array.isArray(lot) || !lot.length) break;
      for (const post of lot) {
        const media = post._embedded?.["wp:featuredmedia"]?.[0];
        const cats = (post._embedded?.["wp:term"] || []).flat().filter((t) => t?.taxonomy === "category").map((t) => texte(t.name));
        out.push({
          url: post.link,
          slug: post.slug,
          titre: texte(post.title?.rendered),
          date: post.date_gmt ? `${post.date_gmt}Z` : post.date,
          extrait: texte(post.excerpt?.rendered),
          html: post.content?.rendered || "",
          image: media?.source_url,
          imageAlt: texte(media?.alt_text),
          categories: cats,
          estWordPress: true,
        });
      }
      if (lot.length < 100) break;
    }
    return out;
  };
  let articles = await lire(base);
  if (!articles.length && !filtre) {
    // le site range peut-être ses actualités dans un type de contenu à part
    const types = await get(`${SOURCE}/wp-json/wp/v2/types`, { json: true });
    const t = Object.values(types).find((x) => /actualit|news|article/i.test(`${x.slug} ${x.name}`) && x.slug !== "post" && x.rest_base);
    if (t) {
      log(`type de contenu « ${t.name} » détecté`);
      articles = await lire(`/wp-json/wp/v2/${t.rest_base}`);
    }
  }
  return articles;
}

async function depuisHTML() {
  const liens = [];
  const vus = new Set();
  let url = SOURCE + CHEMIN;
  for (let n = 0; url && n < 40; n++) {
    if (vus.has(`page:${url}`)) break;
    vus.add(`page:${url}`);
    const racine = parse(await get(url));
    for (const a of racine.querySelectorAll("article a[href], .post a[href], h1 a[href], h2 a[href], h3 a[href]")) {
      const href = absolue(a.getAttribute("href"), url)?.split("#")[0];
      if (!href || new URL(href).host !== HOTE) continue;
      const chemin = new URL(href).pathname;
      if (!chemin.startsWith(CHEMIN) || chemin === CHEMIN || /\/page\/\d+\/?$/.test(chemin) || /\.\w{2,4}$/.test(chemin)) continue;
      if (!vus.has(href)) {
        vus.add(href);
        liens.push(href);
      }
    }
    const suivant = racine.querySelector('a.next, a[rel="next"], link[rel="next"], .pagination a.next');
    url = suivant ? absolue(suivant.getAttribute("href"), url) : null;
  }
  log(`${liens.length} article(s) repéré(s) dans la liste`);
  const out = [];
  for (const lien of liens.slice(0, MAX)) {
    try {
      const r = parse(await get(lien));
      const zone = r.querySelector(".entry-content, .post-content, .article-content, [itemprop='articleBody']") || r.querySelector("article") || r.querySelector("main");
      if (!zone) continue;
      zone.querySelectorAll("script, style, nav, form, header, footer, .share, .sharedaddy, .related, .comments, .post-navigation").forEach((x) => x.remove());
      const meta = (n) => r.querySelector(`meta[property='${n}']`)?.getAttribute("content");
      out.push({
        url: lien,
        slug: slugDepuisURL(lien),
        titre: texte(meta("og:title") || r.querySelector("h1")?.innerHTML || "").replace(/\s*[|–-]\s*[^|–-]*$/, ""),
        date: meta("article:published_time") || r.querySelector("time[datetime]")?.getAttribute("datetime") || "",
        extrait: texte(meta("og:description") || ""),
        html: zone.innerHTML,
        image: meta("og:image"),
        imageAlt: "",
        categories: [],
      });
    } catch (e) {
      log(`ignoré (${e.message})`);
    }
  }
  return out;
}

/* ---------- 2. nettoyage du texte + images ---------- */
const AUTORISE = {
  allowedTags: ["p", "br", "hr", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "strong", "b", "em", "i", "u", "a", "img", "figure", "figcaption", "sup", "sub", "table", "thead", "tbody", "tr", "th", "td", "iframe"],
  allowedAttributes: { a: ["href", "title"], img: ["src", "alt", "title"], iframe: ["src", "title"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
  transformTags: {
    h1: "h2",
    h5: "h4",
    h6: "h4",
    p: (tag, attribs) => ({ tagName: "p", attribs: { ...attribs, dir: "auto" } }),
    li: (tag, attribs) => ({ tagName: "li", attribs: { ...attribs, dir: "auto" } }),
    blockquote: (tag, attribs) => ({ tagName: "blockquote", attribs: { ...attribs, dir: "auto" } }),
  },
};

async function enregistrerImage(src, base, dossier, nom, largeur, racineImg = "actualites") {
  const url = absolue(src, base);
  if (!url || url.startsWith("data:")) return null;
  const dest = path.join(SITE, "public", racineImg, dossier, `${nom}.webp`);
  if (FORCE || !(await existe(dest))) {
    const brut = await get(url, { binary: true });
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await sharp(brut, { animated: true }).rotate().resize({ width: largeur, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  }
  return `${racineImg}/${dossier}/${nom}.webp`;
}

/** « Sheykh » s'écrit « Shaykh » partout (texte seulement, jamais dans les adresses). */
const shaykhify = (html = "") => html.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, txt) => (tag ? tag : txt.replace(/Sheykh/g, "Shaykh").replace(/sheykh/g, "shaykh").replace(/SHEYKH/g, "SHAYKH")));

async function traiter(a, slugsConnus, cfg = { prefixe: "actualite", racineImg: "actualites" }) {
  // images « paresseuses » (WordPress) : la vraie adresse est dans data-src
  const brut = parse(`<div>${a.html}</div>`);
  for (const img of brut.querySelectorAll("img")) {
    const vrai = img.getAttribute("data-src") || img.getAttribute("data-lazy-src") || img.getAttribute("data-original");
    if (vrai) img.setAttribute("src", vrai);
  }
  let propre = sanitizeHtml(brut.innerHTML, AUTORISE);
  const doc = parse(`<div id="r">${propre}</div>`);
  const racine = doc.querySelector("#r");

  // images du texte : téléchargées et allégées
  const images = racine.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    let local = null;
    try {
      local = await enregistrerImage(img.getAttribute("src"), a.url || SOURCE, a.slug, `img-${i + 1}`, 1400, cfg.racineImg);
    } catch (e) {
      log(`image ignorée dans « ${a.slug} » (${e.message})`);
    }
    if (local) {
      img.setAttribute("src", local);
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    } else img.remove();
  }

  // liens : vers un autre article importé → page locale ; vers l'ancien site → texte simple
  for (const lien of racine.querySelectorAll("a")) {
    const href = absolue(lien.getAttribute("href") || "", a.url || SOURCE);
    if (!href) continue;
    if (new URL(href).host === HOTE) {
      const s = slugDepuisURL(href);
      if (slugsConnus.has(s) && s !== a.slug) lien.setAttribute("href", `${cfg.prefixe}-${s}.html`);
      else lien.replaceWith(lien.innerHTML);
    } else {
      lien.setAttribute("target", "_blank");
      lien.setAttribute("rel", "noopener");
    }
  }
  // paragraphes vides (mais on garde ceux qui contiennent une image ou une vidéo, même dans un lien)
  for (const el of racine.querySelectorAll("p, li")) if (!el.text.trim() && !el.querySelector("img, iframe")) el.remove();
  propre = racine.innerHTML.trim();

  // image de couverture + vignette
  let couverture = null;
  let vignette = null;
  const srcCouv = a.image || images[0]?.getAttribute("src");
  if (a.image) {
    try {
      couverture = await enregistrerImage(a.image, a.url || SOURCE, a.slug, "couverture", 1600, cfg.racineImg);
      vignette = await enregistrerImage(a.image, a.url || SOURCE, a.slug, "vignette", 700, cfg.racineImg);
    } catch (e) {
      log(`couverture ignorée pour « ${a.slug} » (${e.message})`);
    }
  } else if (srcCouv) {
    couverture = vignette = null;
  }
  const resume = a.extrait || extrait(texte(propre));
  return { ...a, titre: shaykhify(a.titre), imageAlt: shaykhify(a.imageAlt), html: shaykhify(propre), couverture, vignette, extrait: shaykhify(extrait(resume)) };
}

/* ---------- 3. écriture des pages ---------- */
async function ecrire(articles) {
  const racine = SITE;
  await fs.mkdir(path.join(racine, "src", "data"), { recursive: true });

  // pages d'articles : on supprime d'abord celles qui n'existent plus
  const gardes = new Set(articles.map((a) => `actualite-${a.slug}.html`));
  for (const f of await fs.readdir(racine)) if (/^actualite-.+\.html$/.test(f) && !gardes.has(f)) await fs.rm(path.join(racine, f));
  const dossiers = path.join(racine, "public", "actualites");
  if (await existe(dossiers)) for (const d of await fs.readdir(dossiers)) if (!articles.some((a) => a.slug === d)) await fs.rm(path.join(dossiers, d), { recursive: true, force: true });

  articles.forEach(async () => {});
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    await fs.writeFile(path.join(racine, `actualite-${a.slug}.html`), pageArticle(a, articles[i + 1], articles[i - 1], TYPES.actualite));
  }
  await fs.writeFile(path.join(racine, "actualites.html"), pageListe(articles));
  await fs.writeFile(
    path.join(racine, "src", "data", "actualites.json"),
    JSON.stringify(articles.map(({ html, ...meta }) => meta), null, 2) + "\n"
  );

  // accueil : les trois derniers articles
  const accueil = path.join(racine, "index.html");
  let h = await fs.readFile(accueil, "utf8");
  if (h.includes("<!--actualites:debut-->")) {
    const cartes = articles.length ? cartesAccueil(articles) : null;
    if (cartes) {
      h = h.replace(/<!--actualites:debut-->[\s\S]*?<!--actualites:fin-->/, `<!--actualites:debut-->\n${cartes}        <!--actualites:fin-->`);
      await fs.writeFile(accueil, h);
    }
  } else log("repères <!--actualites:debut--> absents de index.html : l'accueil n'est pas mis à jour");
}

/* ---------- enseignements (rubrique « Moudhakara » du site d'origine) ---------- */
const ENS_CATEGORIE = process.env.ENSEIGNEMENTS_CATEGORIE || "26"; // https://karkariya.fr/le-shaykh/moudhakara/
const ENS_EXCLUS = /message de la tariqa karkariya|la fornication|r[ée]ponse du shaykh [àa] ceux qui nous critiquent/i;
// les trois enseignements mis en avant sous la bannière de l'accueil (nom d'origine de l'article)
const ENS_ACCUEIL = ["vision-yeux-vision-coeur", "le-coeur-spirituel-dans-le-coeur-physique", "la-feconnaissance-pour-les-bienfaits-dallah"];
const COULEURS = ["#3f5578", "#4f7260", "#a2694a"];

async function enseignements() {
  let brut;
  try {
    brut = await depuisWordPress(`&categories=${ENS_CATEGORIE}`);
  } catch (e) {
    return log(`enseignements : lecture impossible (${e.message}), section conservée`);
  }
  brut = brut.filter((a) => a.titre && !ENS_EXCLUS.test(a.titre)).sort((x, y) => String(y.date).localeCompare(String(x.date)));
  if (!brut.length) return log("enseignements : aucun article, section conservée");
  const pris = new Set();
  for (const a of brut) {
    let s = slugifier(a.slug || a.titre) || "enseignement";
    let n = 2;
    while (pris.has(s)) s = `${slugifier(a.slug || a.titre)}-${n++}`;
    pris.add(s);
    a.slug = s;
  }
  const cfg = TYPES.enseignement;
  const articles = [];
  for (const a of brut) articles.push(await traiter(a, pris, cfg));

  const gardes = new Set(articles.map((a) => `enseignement-${a.slug}.html`));
  for (const f of await fs.readdir(SITE)) if (/^enseignement-.+\.html$/.test(f) && !gardes.has(f)) await fs.rm(path.join(SITE, f));
  const dossiers = path.join(SITE, "public", "enseignements");
  if (await existe(dossiers)) for (const d of await fs.readdir(dossiers)) if (!pris.has(d)) await fs.rm(path.join(dossiers, d), { recursive: true, force: true });
  for (let i = 0; i < articles.length; i++) await fs.writeFile(path.join(SITE, `enseignement-${articles[i].slug}.html`), pageArticle(articles[i], articles[i + 1], articles[i - 1], cfg));
  await fs.writeFile(path.join(SITE, "src", "data", "enseignements.json"), JSON.stringify(articles.map(({ html, ...m }) => m), null, 2) + "\n");

  await fs.writeFile(path.join(SITE, "enseignements.html"), pageListe(articles, LISTES.enseignements));
  const vedettes = ENS_ACCUEIL.map((k) => articles.find((a) => a.slug.startsWith(k) || a.slugOrigine?.startsWith(k))).filter(Boolean);
  const accueil = path.join(SITE, "index.html");
  let h = await fs.readFile(accueil, "utf8");
  if (!h.includes("<!--enseignements:debut-->")) return log("repères <!--enseignements:debut--> absents de index.html");
  h = h.replace(/<!--enseignements:debut-->[\s\S]*?<!--enseignements:fin-->/, `<!--enseignements:debut-->\n${cartesEnseignements(vedettes, COULEURS)}        <!--enseignements:fin-->`);
  await fs.writeFile(accueil, h);
  log(`enseignements : ${articles.length} article(s)`);
}

/* ---------- pages du Shaykh : biographie et chaîne de transmission (articles du site d'origine) ---------- */
const PAGES_SHAYKH = [
];

/** Noms de la chaîne : sans accent circonflexe, « Abou » écrit « Abu ». */
const net = (t = "") => shaykhify(t).normalize("NFD").replace(/\u0302/g, "").normalize("NFC").replace(/\bAbou\b/g, "Abu").replace(/\s+/g, " ").trim();

const SILSILA_SLUG = "chaine-initiatique-silsila-de-la-tariqa-karkariya";

/** Chaîne initiatique : liste ordonnée de maillons (nom, invocation, portrait), du Shaykh jusqu'au Prophète. */
async function silsila() {
  const chemin = path.join(SITE, "chaine-de-transmission.html");
  if (!(await existe(chemin))) return;
  let h = await fs.readFile(chemin, "utf8");
  if (!h.includes("<!--shaykh:silsila:debut-->")) return;
  let a;
  try {
    a = (await depuisWordPress(`&slug=${SILSILA_SLUG}`)).find((x) => x.slug === SILSILA_SLUG);
  } catch (e) {
    return log(`silsila : lecture impossible (${e.message}), page conservée`);
  }
  if (!a) return log("silsila : article introuvable, page conservée");

  const racine = parse(`<div>${a.html}</div>`);
  const maillons = [];
  let image = null;
  let officiel = null;
  let priere = "";
  for (const p of racine.querySelectorAll("p")) {
    const img = p.querySelector("img");
    const t = p.text.replace(/\s+/g, " ").trim();
    const btn = p.querySelector("a.vc_btn, a[href$='.jpg']:not(:has(img))");
    if (img) {
      image = img.getAttribute("src");
      continue;
    }
    if (btn && /document officiel/i.test(t)) {
      officiel = btn.getAttribute("href");
      continue;
    }
    if (!t || /^qui a pris de\s*:?$/i.test(t)) continue;
    if (p.querySelector("em") && /agr[ée]e/i.test(t)) {
      priere = t;
      continue;
    }
    const m = t.match(/^(.*?)\s*\((radi[^)]*)\)\s*$/i);
    maillons.push({ nom: net((m ? m[1] : t).replace(/^Notre\s+/i, "")), invoc: "", image });
    image = null;
  }
  if (!maillons.length) return log("silsila : aucun maillon lu, page conservée");

  maillons[0].src = "media/logo-shaykh.webp"; // même portrait que dans le header
  maillons[0].image = null;
  for (let i = 0; i < maillons.length; i++) {
    const m = maillons[i];
    if (!m.image) continue;
    try {
      m.src = await enregistrerImage(m.image, a.url || SOURCE, "silsila", `maillon-${i + 1}`, 520, "shaykh");
    } catch (e) {
      log(`silsila : portrait ignoré (${e.message})`);
    }
  }
  let doc = "";
  if (officiel) {
    try {
      const src = await enregistrerImage(officiel, a.url || SOURCE, "silsila", "document-officiel", 2000, "shaykh");
      doc = `<a class="btn-glass btn-glass--dark silsila-doc" href="${src}" target="_blank" rel="noopener"><span>Voir le document officiel</span><i>↗</i></a>`;
    } catch (e) {
      log(`silsila : document officiel ignoré (${e.message})`);
    }
  }

  // maîtres entre le dernier maillon de l'article et le Prophète ﷺ : liste tenue à la main dans scripts/silsila-suite.json
  let suite = [];
  try {
    suite = JSON.parse(await fs.readFile(path.join(SITE, "scripts", "silsila-suite.json"), "utf8")).filter((m) => m?.nom);
  } catch {}
  for (const m of suite) maillons.push({ nom: net(m.nom), invoc: net(m.invoc ?? ""), image: null, suite: true });
  const total = maillons.length + 1; // + le Prophète
  const li = maillons
    .map(
      (m, i) => {
        // biographie du maître : une page par maître (scripts/maitres-data.mjs) ; le Shaykh renvoie à sa propre page
        const lien = i === 0 ? "qui-est-le-shaykh.html#biographie" : lienMaitre(m.nom);
        return `        <li class="maillon${i === 0 ? " maillon--shaykh" : ""}${lien ? " maillon--lien" : ""}" data-n="${i + 1}">
          <span class="maillon-point" aria-hidden="true"></span>
          <div class="maillon-carte">
            ${m.src ? `<figure class="maillon-photo"><img src="${m.src}" alt="${esc(m.nom)}" loading="lazy" decoding="async" /></figure>` : ""}
            <span class="maillon-rang">${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(m.nom)}</h3>
            ${m.invoc ? `<p class="maillon-invoc">${esc(m.invoc)}</p>` : ""}
            ${lien ? `<a class="maillon-bio" href="${lien}" aria-label="Biographie : ${esc(m.nom)}"><span>Biographie</span><i>→</i></a>` : ""}
          </div>
        </li>
`;
      }
    )
    .join("");
  const liste = `<ol class="silsila" data-total="${total}">
${li}${suite.length ? "" : `        <li class="maillon maillon--pont" data-n="${maillons.length}" aria-hidden="true"><span class="maillon-point"></span><p>De maître en maître, la chaîne remonte jusqu'au Prophète</p></li>\n`}
        <li class="maillon maillon--prophete" data-n="${total}">
          <span class="maillon-point" aria-hidden="true"></span>
          <div class="maillon-carte">
            <span class="prophete-halo" aria-hidden="true"></span>
            <span class="prophete-ar" lang="ar" dir="rtl">محمد ﷺ</span>
            <h3>Le Prophète Muhammad</h3>
          </div>
        </li>
      </ol>${priere ? `\n      <p class="silsila-priere">${esc(priere)}</p>` : ""}`;
  h = h.replace(/<!--shaykh:silsila:debut-->[\s\S]*?<!--shaykh:silsila:fin-->/, () => `<!--shaykh:silsila:debut-->\n      ${liste}\n      <!--shaykh:silsila:fin-->`);
  h = h.replace(/<!--shaykh:silsila-officiel:debut-->[\s\S]*?<!--shaykh:silsila-officiel:fin-->/, () => `<!--shaykh:silsila-officiel:debut-->${doc}<!--shaykh:silsila-officiel:fin-->`);
  h = h.replace(/(<p class="silsila-compteur"[^>]*><b>)\d+(<\/b> \/ <span>)\d+/, (_, a1, a2) => `${a1}1${a2}${total}`);
  await fs.writeFile(chemin, h);
  log(`silsila : ${maillons.length} maillons + le Prophète`);
}

async function pagesShaykh() {
  await silsila();
  const cfg = { prefixe: "actualite", racineImg: "shaykh" };
  for (const page of PAGES_SHAYKH) {
    const chemin = path.join(SITE, page.fichier);
    if (!(await existe(chemin))) continue;
    let blocs = [];
    try {
      const reçus = await depuisWordPress(`&slug=${page.slugs.join(",")}`);
      for (const slug of page.slugs) {
        const a = reçus.find((x) => x.slug === slug);
        if (!a) continue;
        const t = await traiter({ ...a, image: null }, new Set(), cfg);
        blocs.push(`        <article class="shaykh-bloc">\n${t.html}\n        </article>\n`);
      }
    } catch (e) {
      log(`${page.fichier} : lecture impossible (${e.message}), page conservée`);
      continue;
    }
    if (!blocs.length) continue;
    const re = new RegExp(`<!--shaykh:${page.marque}:debut-->[\\s\\S]*?<!--shaykh:${page.marque}:fin-->`);
    let h = await fs.readFile(chemin, "utf8");
    if (!re.test(h)) continue;
    const rempl = `<!--shaykh:${page.marque}:debut-->\n${blocs.join("")}        <!--shaykh:${page.marque}:fin-->`;
    h = h.replace(re, () => rempl);
    await fs.writeFile(chemin, h);
    log(`${page.fichier} : ${blocs.length} texte(s)`);
  }
}

/* ---------- principal ---------- */
async function main() {
  if (VIDE) {
    await ecrire([]);
    log("page remise à zéro");
    return;
  }
  log(`lecture de ${SOURCE}`);
  let brut = [];
  try {
    brut = await depuisWordPress();
    if (brut.length) log(`${brut.length} article(s) lus via l'API WordPress`);
  } catch (e) {
    log(`API WordPress indisponible (${e.message})`);
  }
  if (!brut.length) {
    try {
      brut = await depuisHTML();
    } catch (e) {
      log(`lecture de la page impossible (${e.message})`);
    }
  }
  if (!brut.length) {
    const msg = "aucun article récupéré : les pages existantes sont conservées";
    if (TOLERANT) return log(msg);
    log(msg);
    process.exitCode = 1;
    return;
  }

  // ordre, noms uniques
  brut = brut.filter((a) => a.titre && retenu(a)).sort((x, y) => String(y.date).localeCompare(String(x.date))).slice(0, MAX);
  const pris = new Set();
  for (const a of brut) {
    let s = slugifier(a.slug || a.titre) || "article";
    let n = 2;
    while (pris.has(s)) s = `${slugifier(a.slug || a.titre)}-${n++}`;
    pris.add(s);
    a.slug = s;
  }
  const connus = new Set(pris);
  // les liens entre articles se repèrent avec le nom d'origine ; on garde aussi le nom d'origine
  const articles = [];
  for (const a of brut) {
    articles.push(await traiter({ ...a, slugOrigine: slugDepuisURL(a.url) }, new Set([...connus, ...brut.map((b) => slugDepuisURL(b.url))])));
  }
  await ecrire(articles);
  await enseignements();
  await pagesShaykh();
  await genererMaitres();
  await genererAlbums();
  log(`terminé : ${articles.length} article(s) publiés`);
}

main().catch((e) => {
  console.error("[actualités] erreur :", e);
  process.exitCode = TOLERANT ? 0 : 1;
}).finally(async () => {
  // versions anglaise et arabe, déduites des pages françaises (même en cas d'échec de l'import)
  try {
    await genererLangues();
  } catch (e) {
    console.error("[langues] erreur :", e);
  }
});

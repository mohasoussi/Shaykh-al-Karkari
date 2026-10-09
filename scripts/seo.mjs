#!/usr/bin/env node
/* Préparation à la mise en ligne, exécutée après chaque « npm run build » (script postbuild).
   - choisit l'adresse officielle : le nom de domaine de site.config.json dès qu'il sert ce site, sinon l'adresse provisoire pages.dev
     (variable d'environnement SITE_URL pour forcer une adresse) ;
   - ajoute dans chaque page de dist/ : adresse canonique, liens entre les langues (hreflang), adresse et image de partage absolues, carte Twitter ;
   - écrit dist/sitemap.xml et dist/robots.txt.
   Aucune action n'est nécessaire de votre part : après l'achat du domaine et son rattachement dans Cloudflare, le build suivant bascule tout seul. */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const conf = JSON.parse(fs.readFileSync("site.config.json", "utf8"));
const MARQUE = "# Shaykh Al Karkari — robots";

async function choisirDomaine() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  try {
    const r = await fetch(`${conf.domaine}/robots.txt`, { signal: AbortSignal.timeout(8000) });
    if (r.ok && (await r.text()).includes(MARQUE)) return conf.domaine;
  } catch {}
  return conf.domaine_provisoire;
}

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const BASE = await choisirDomaine();
const pages = walk(DIST).filter((f) => f.endsWith(".html")).map((f) => path.relative(DIST, f).split(path.sep).join("/")).sort();
const existe = new Set(pages);
const SANS_INDEX = (p) => /projet-merkez\.html$/.test(p);

const url = (p) => {
  if (p === "index.html") return `${BASE}/`;
  if (/(^|\/)index\.html$/.test(p)) return `${BASE}/${p.replace(/index\.html$/, "")}`;
  return `${BASE}/${p.replace(/\.html$/, "")}`;
};
const langue = (p) => (p.startsWith("en/") ? "en" : p.startsWith("ar/") ? "ar" : "fr");
const nu = (p) => p.replace(/^(en|ar)\//, "");
const version = (p, l) => (l === "fr" ? nu(p) : `${l}/${nu(p)}`);

let n = 0;
for (const p of pages) {
  const f = path.join(DIST, p);
  let h = fs.readFileSync(f, "utf8");
  if (h.includes('rel="canonical"')) continue;
  const lg = langue(p);
  const dossier = path.posix.dirname(p) === "." ? "" : path.posix.dirname(p) + "/";
  const absolu = (u) => (/^https?:/.test(u) ? u : u.startsWith("/") ? BASE + u : `${BASE}/${path.posix.normalize(dossier + u)}`);
  let ajout = "";
  if (SANS_INDEX(p)) {
    ajout += '\n  <meta name="robots" content="noindex" />';
  } else {
    ajout += `\n  <link rel="canonical" href="${url(p)}" />`;
    for (const l of ["fr", "en", "ar"]) if (existe.has(version(p, l))) ajout += `\n  <link rel="alternate" hreflang="${l}" href="${url(version(p, l))}" />`;
    ajout += `\n  <link rel="alternate" hreflang="x-default" href="${url(version(p, "fr"))}" />`;
    ajout += `\n  <meta property="og:url" content="${url(p)}" />`;
  }
  ajout += `\n  <meta property="og:site_name" content="${conf.nom}" />\n  <meta property="og:type" content="${/\/?(actualite|enseignement|evenement)-/.test(p) ? "article" : "website"}" />\n  <meta property="og:locale" content="${lg === "fr" ? "fr_FR" : lg === "en" ? "en_GB" : "ar_MA"}" />\n  <meta name="twitter:card" content="summary_large_image" />`;
  if (/(^|\/)index\.html$/.test(p) && !/\/(?=.+\/)/.test(p)) {
    ajout += `\n  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: conf.nom, url: url(p), sameAs: [conf.facebook].filter(Boolean), jobTitle: lg === "fr" ? "Guide spirituel, auteur et conférencier" : lg === "en" ? "Spiritual guide, author and lecturer" : "مرشد روحي ومؤلف ومحاضر" })}</script>`;
  }
  h = h.replace(/(<meta property="og:image" content=")([^"]+)(")/, (m, a, u, b) => `${a}${absolu(u)}${b}`);
  h = h.replace("</head>", `${ajout}\n</head>`);
  fs.writeFileSync(f, h);
  n++;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.filter((p) => !SANS_INDEX(p)).map((p) => `  <url><loc>${url(p)}</loc>${["fr", "en", "ar"].filter((l) => existe.has(version(p, l))).map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${url(version(p, l))}"/>`).join("")}</url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(DIST, "robots.txt"), `${MARQUE}\nUser-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${BASE}/sitemap.xml\n`);
console.log(`[seo] adresse officielle : ${BASE} · ${n} pages balisées · sitemap de ${pages.filter((p) => !SANS_INDEX(p)).length} adresses`);

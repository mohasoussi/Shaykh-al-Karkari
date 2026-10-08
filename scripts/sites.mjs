#!/usr/bin/env node
/* Génère la page « Sites & projets » (sites-projets.html, en/, ar/) : les sites externes liés à la Tariqa Karkariya.
   Pour ajouter un lien : l'ajouter dans scripts/liens-externes.json puis lancer node scripts/sites.mjs
   Format d'une entrée : { "titre": {"fr","en","ar"}, "url": "https://…", "texte": {"fr","en","ar"} } (texte facultatif) */
import fs from "node:fs";
import { esc } from "./videos-data.mjs";

const LIENS = JSON.parse(fs.readFileSync("scripts/liens-externes.json", "utf8"));
const L = {
  fr: { dir: "", kicker: "Univers Karkariya", h1: "Sites & projets", lede: "Les sites et projets liés à la Tariqa Karkariya.", vide: "Les liens vers les sites et projets seront présentés prochainement sur cette page.", visiter: "Visiter le site", title: "Sites & projets", desc: "Les sites et projets liés à la Tariqa Karkariya." },
  en: { dir: "en/", kicker: "The Karkariya world", h1: "Sites & projects", lede: "The websites and projects linked to the Karkariya Tariqa.", vide: "Links to the sites and projects will be presented here soon.", visiter: "Visit the website", title: "Sites & projects", desc: "The websites and projects linked to the Karkariya Tariqa." },
  ar: { dir: "ar/", kicker: "عالم الكركرية", h1: "مواقع ومشاريع", lede: "المواقع والمشاريع المرتبطة بالطريقة الكركرية.", vide: "ستُعرض هنا قريبًا روابط المواقع والمشاريع.", visiter: "زيارة الموقع", title: "مواقع ومشاريع", desc: "المواقع والمشاريع المرتبطة بالطريقة الكركرية." },
};
const domaine = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

for (const [code, T] of Object.entries(L)) {
  const items = LIENS.map((l) => `        <li><a href="${esc(l.url)}" target="_blank" rel="noopener"><strong>${esc(domaine(l.url))}</strong><span>${esc(l.titre[code] || l.titre.fr)}</span>${l.texte ? `<small>${esc(l.texte[code] || l.texte.fr)}</small>` : ""}<em>${T.visiter} ↗</em></a></li>`).join("\n");
  const corps = LIENS.length ? `      <ul class="presse-liste" data-reveal>\n${items}\n      </ul>` : `      <p class="section-lede" data-reveal style="margin:0 auto;max-width:44rem">${T.vide}</p>`;
  const html = `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(T.title)} — ${code === "ar" ? "الشيخ محمد فوزي الكركري" : "Shaykh Mohamed Faouzi Al Karkari"}</title>
  <meta name="description" content="${esc(T.desc)}" />
  <meta property="og:title" content="${esc(T.title)}" />
  <meta property="og:description" content="${esc(T.desc)}" />
  <meta property="og:image" content="/media/portrait-fes.webp" />
</head>
<body data-page="sites">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="hub media-page media-presse">
      <div class="section-head">
        <p class="kicker">${T.kicker}</p>
        <h1 class="h2" data-split>${T.h1}</h1>
        <p class="section-lede" data-reveal>${T.lede}</p>
      </div>
${corps}
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  if (T.dir) fs.mkdirSync(T.dir, { recursive: true });
  fs.writeFileSync(`${T.dir}sites-projets.html`, html);
}
console.log(`sites-projets.html ×3 (${LIENS.length} lien(s))`);

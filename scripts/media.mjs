#!/usr/bin/env node
/* Génère la page « Média » (fr, en, ar) : accès aux vidéos et reportages, galerie de photos avec visionneuse.
   Pour ajouter une photo : la déposer dans public/media/photos/ (+ miniature dans public/media/photos/t/) et l'ajouter à PHOTOS.
   Utilisation : node scripts/media.mjs */
import fs from "node:fs";
import { readFileSync } from "node:fs";
const ALBUMS = JSON.parse(readFileSync("scripts/albums.json", "utf8"));
const htmlAlbum = (a, code, pre) => a.photos.map((p) => `        <a class="galerie-item" href="${pre}media/evenements/${a.id}/${p.f}.webp" data-reveal><img src="${pre}media/evenements/${a.id}/t/${p.f}.webp" alt="${esc(p.alt[code] || p.alt.fr)}" loading="lazy" decoding="async" /></a>`).join("\n");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const PHOTOS = [
  ["portrait-rose", { fr: "Le Shaykh, portrait en djellaba rose", en: "The Shaykh, portrait in a pink djellaba", ar: "الشيخ، صورة بجلبابٍ وردي" }],
  ["priere-neige", { fr: "Le Shaykh en invocation dans la neige", en: "The Shaykh in supplication in the snow", ar: "الشيخ في دعاءٍ وسط الثلج" }],
  ["arbre", { fr: "Le Shaykh adossé à un arbre", en: "The Shaykh leaning against a tree", ar: "الشيخ مستندًا إلى شجرة" }],
  ["turban-bleu", { fr: "Le Shaykh, turban bleu et bâton", en: "The Shaykh, blue turban and staff", ar: "الشيخ بعمامةٍ زرقاء وعصا" }],
  ["chemin", { fr: "Sur le chemin, vers un mausolée", en: "On the road, towards a shrine", ar: "على الطريق نحو ضريح" }],
  ["turban-blanc-chapelet", { fr: "Le Shaykh et son chapelet", en: "The Shaykh and his prayer beads", ar: "الشيخ ومسبحته" }],
  ["foret", { fr: "Le Shaykh dans la forêt", en: "The Shaykh in the forest", ar: "الشيخ في الغابة" }],
];

const T = {
  fr: { dir: "", kicker: "Média", h1: "Photos et vidéos", lede: "Les conférences en vidéo, les reportages des rencontres et une galerie de photos du Shaykh.",
    c1: ["Vidéos", "Conférences et entretiens en vidéo : Sorbonne, Chicago, Yale, Stanford, Berkeley…", "Voir les vidéos", "conferences.html", "conf-sorbonne"],
    c2: ["Reportages", "Photos et vidéos des visites, des rencontres et du Mawlid, racontées dans les actualités.", "Lire les reportages", "actualites.html", "conf-paix"],
    g: "Galerie", gl: "Touchez une photo pour l'agrandir. Les albums par événement suivent.", close: "Fermer", prev: "Photo précédente", next: "Photo suivante", title: "Média — Shaykh Mohamed Faouzi Al Karkari", desc: "Photos et vidéos du Shaykh Mohamed Faouzi Al Karkari.", a: "→" },
  en: { dir: "en/", kicker: "Media", h1: "Photos and videos", lede: "Lectures on video, reports from gatherings and a gallery of photographs of the Shaykh.",
    c1: ["Videos", "Lectures and interviews on video: Sorbonne, Chicago, Yale, Stanford, Berkeley…", "Watch the videos", "conferences.html", "conf-sorbonne"],
    c2: ["Reports", "Photos and videos of visits, gatherings and the Mawlid, told in the news section (articles in French).", "Read the reports", "actualites.html", "conf-paix"],
    g: "Gallery", gl: "Tap a photo to enlarge it.", close: "Close", prev: "Previous photo", next: "Next photo", title: "Media — Shaykh Mohamed Faouzi Al Karkari", desc: "Photos and videos of Shaykh Mohamed Faouzi Al Karkari.", a: "→" },
  ar: { dir: "ar/", kicker: "الوسائط", h1: "صور وفيديوهات", lede: "المحاضرات بالفيديو، وتقارير اللقاءات، ومعرض صور للشيخ.",
    c1: ["فيديوهات", "محاضرات وحوارات بالفيديو: السوربون، شيكاغو، ييل، ستانفورد، بيركلي…", "شاهد الفيديوهات", "conferences.html", "conf-sorbonne"],
    c2: ["تقارير", "صور وفيديوهات للزيارات واللقاءات والمولد، مروية في قسم الأخبار (المقالات بالفرنسية).", "اقرأ التقارير", "actualites.html", "conf-paix"],
    g: "المعرض", gl: "المس صورة لتكبيرها.", close: "إغلاق", prev: "الصورة السابقة", next: "الصورة التالية", title: "الوسائط — الشيخ محمد فوزي الكركري", desc: "صور وفيديوهات للشيخ محمد فوزي الكركري.", a: "←" },
};

for (const [code, t] of Object.entries(T)) {
  const pre = t.dir ? "../" : "";
  const carte = ([titre, texte, cta, href, img], n) => `        <a class="hub-card media-card" href="${href}" data-reveal>
          <img src="${pre}media/${img}.webp" alt="" loading="lazy" />
          <span class="hub-num">0${n}</span>
          <div class="hub-txt"><h2>${esc(titre)}</h2><p>${esc(texte)}</p><span class="hub-go">${esc(cta)} <i>${t.a}</i></span></div>
        </a>`;
  const galerie = PHOTOS.map(([f, alt]) => `        <a class="galerie-item" href="${pre}media/photos/${f}.webp" data-reveal><img src="${pre}media/photos/t/${f}.webp" alt="${esc(alt[code])}" loading="lazy" decoding="async" /></a>`).join("\n");
  const albums = ALBUMS.filter((a) => a.rubrique === "media").map((a) => `      <div class="section-head media-gal-head">
        <h2 class="h2" data-split>${esc(a.titre[code])}</h2>${a.texte ? `\n        <p class="section-lede" data-reveal>${esc(a.texte[code] || a.texte.fr)}</p>` : ""}
      </div>
      <div class="galerie" data-close="${esc(t.close)}" data-prev="${esc(t.prev)}" data-next="${esc(t.next)}">
${htmlAlbum(a, code, pre)}
      </div>${a.credit ? `\n      <p class="galerie-credit">${code === "fr" ? "Photos" : code === "en" ? "Photos" : "الصور"} : ${esc(a.credit)}</p>` : ""}`).join("\n");
  const html = `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.desc)}" />
  <meta property="og:title" content="${esc(t.title)}" />
  <meta property="og:description" content="${esc(t.desc)}" />
  <meta property="og:image" content="/media/photos/portrait-rose.webp" />
</head>
<body data-page="media">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="hub media-page">
      <div class="section-head">
        <p class="kicker">${t.kicker}</p>
        <h1 class="h2" data-split>${t.h1}</h1>
        <p class="section-lede" data-reveal>${t.lede}</p>
      </div>
      <div class="hub-cards media-cards">
${carte(t.c1, 1)}
${carte(t.c2, 2)}
      </div>
      <div class="section-head media-gal-head">
        <h2 class="h2" data-split>${t.g}</h2>
        <p class="section-lede" data-reveal>${t.gl}</p>
      </div>
      <div class="galerie" data-close="${esc(t.close)}" data-prev="${esc(t.prev)}" data-next="${esc(t.next)}">
${galerie}
      </div>
${albums}
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  if (t.dir) fs.mkdirSync(t.dir, { recursive: true });
  fs.writeFileSync(`${t.dir}media.html`, html);
}

/* ---------- page Galerie : un album par événement ---------- */
const G = {
  fr: { kicker: "Galerie", h1: "Les événements en photos", lede: "Un album par événement : conférences, symposiums, rencontres. Touchez une photo pour l'agrandir.", title: "Galerie — Shaykh Mohamed Faouzi Al Karkari", desc: "Galerie photo des événements du Shaykh Mohamed Faouzi Al Karkari.", n: (k) => `${k} photo${k > 1 ? "s" : ""}`, art: "Lire l'article" },
  en: { kicker: "Gallery", h1: "Events in pictures", lede: "One album per event: lectures, symposiums, meetings. Tap a photo to enlarge it.", title: "Gallery — Shaykh Mohamed Faouzi Al Karkari", desc: "Photo gallery of the events of Shaykh Mohamed Faouzi Al Karkari.", n: (k) => `${k} photo${k > 1 ? "s" : ""}`, art: "Read the article (in French)" },
  ar: { kicker: "المعرض", h1: "الفعاليات بالصور", lede: "ألبوم لكل فعالية: محاضرات وندوات ولقاءات. المس صورة لتكبيرها.", title: "المعرض — الشيخ محمد فوزي الكركري", desc: "معرض صور لفعاليات الشيخ محمد فوزي الكركري.", n: (k) => `${k} صورة`, art: "اقرأ المقال (بالفرنسية)" },
};
const GAL = ALBUMS.filter((a) => a.rubrique === "galerie");
for (const [code, g] of Object.entries(G)) {
  const t = T[code];
  const pre = t.dir ? "../" : "";
  const sommaire = GAL.map((a) => `<a class="chip" href="#${a.id}">${esc(a.titre[code])}</a>`).join("");
  const blocs = GAL.map((a) => `      <section class="album" id="${a.id}">
        <div class="section-head media-gal-head">
          <h2 class="h2" data-split>${esc(a.titre[code])}</h2>
          <p class="album-n">${g.n(a.photos.length)}</p>${a.texte ? `\n          <p class="section-lede" data-reveal>${esc(a.texte[code] || a.texte.fr)}</p>` : ""}${a.article ? `\n          <p class="album-art"><a href="${pre}actualite-${a.article}.html">${esc(g.art)} →</a></p>` : ""}
        </div>
        <div class="galerie" data-close="${esc(t.close)}" data-prev="${esc(t.prev)}" data-next="${esc(t.next)}">
${htmlAlbum(a, code, pre)}
        </div>${a.credit ? `\n        <p class="galerie-credit">${code === "ar" ? "الصور" : "Photos"} : ${esc(a.credit)}</p>` : ""}
      </section>`).join("\n");
  const html = `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(g.title)}</title>
  <meta name="description" content="${esc(g.desc)}" />
  <meta property="og:title" content="${esc(g.title)}" />
  <meta property="og:description" content="${esc(g.desc)}" />
  <meta property="og:image" content="/media/photos/portrait-rose.webp" />
</head>
<body data-page="galerie">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="hub media-page">
      <div class="section-head">
        <p class="kicker">${g.kicker}</p>
        <h1 class="h2" data-split>${g.h1}</h1>
        <p class="section-lede" data-reveal>${g.lede}</p>
        <nav class="chips" aria-label="${esc(g.kicker)}">${sommaire}</nav>
      </div>
${blocs}
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  fs.writeFileSync(`${t.dir}galerie.html`, html);
}
console.log("media.html + galerie.html ×3");

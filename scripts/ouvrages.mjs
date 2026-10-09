#!/usr/bin/env node
/* Génère la page « Ouvrages » (fr, en, ar) à partir de scripts/ouvrages.json (titres classés par langue de traduction).
   Utilisation : node scripts/ouvrages.mjs */
import fs from "node:fs";
const data = JSON.parse(fs.readFileSync("scripts/ouvrages.json", "utf8"));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const NOMS = {
  fr: { fr: "Français", en: "Anglais", es: "Espagnol", it: "Italien", nl: "Néerlandais" },
  en: { fr: "French", en: "English", es: "Spanish", it: "Italian", nl: "Dutch" },
  ar: { fr: "الفرنسية", en: "الإنجليزية", es: "الإسبانية", it: "الإيطالية", nl: "الهولندية" },
};
const T = {
  fr: { dir: "", kicker: "Les ouvrages", h1: "Les ouvrages du Shaykh", lede: "Six livres écrits en arabe, traduits en français, anglais, espagnol, italien et néerlandais, et d'autres ouvrages sur l'enseignement du Shaykh : voici les 49 titres disponibles, classés par langue.", title: "Les ouvrages — Shaykh Mohamed Faouzi Al Karkari", desc: "Les ouvrages du Shaykh Mohamed Faouzi Al Karkari, par langue de traduction.", voir: "Voir le livre", n: (k) => `${k} titre${k > 1 ? "s" : ""}` },
  en: { dir: "en/", kicker: "Books", h1: "The Shaykh's books", lede: "Six books written in Arabic, translated into French, English, Spanish, Italian and Dutch, and other works on the Shaykh's teaching: here are the 49 titles available, by language.", title: "Books — Shaykh Mohamed Faouzi Al Karkari", desc: "Books by Shaykh Mohamed Faouzi Al Karkari, by language of translation.", voir: "View the book", n: (k) => `${k} title${k > 1 ? "s" : ""}` },
  ar: { dir: "ar/", kicker: "المؤلفات", h1: "مؤلفات الشيخ", lede: "ستة كتب كُتبت بالعربية، ومترجمة إلى الفرنسية والإنجليزية والإسبانية والإيطالية والهولندية، ومؤلفات أخرى حول تعاليم الشيخ: هذه هي العناوين التسعة والأربعون المتوفرة، مصنّفة حسب اللغة.", title: "المؤلفات — الشيخ محمد فوزي الكركري", desc: "مؤلفات الشيخ محمد فوزي الكركري حسب لغة الترجمة.", voir: "عرض الكتاب", n: (k) => `${k} عنوانًا` },
};
for (const [code, t] of Object.entries(T)) {
  const pre = t.dir ? "../" : "";
  const blocs = Object.entries(data).map(([l, titres]) => `      <section class="livres-langue" id="livres-${l}">
        <h2 class="livres-titre" data-reveal><span>${NOMS[code][l]}</span><em>${t.n(titres.length)}</em></h2>
        <ul class="livres">
${titres.map((x, i) => {
  const titre = esc(x.t).replace(/ ([?!:])/g, "\u00a0$1");
  const cover = x.img ? `<img src="${pre}${x.img}" alt="" loading="lazy" decoding="async" />` : `<span class="livre-n">${String(i + 1).padStart(2, "0")}</span>`;
  const lien = x.url ? `<a class="livre-lien" href="${esc(x.url)}" target="_blank" rel="noopener" aria-label="${esc(x.t)}">` : "";
  return `          <li class="livre${x.img ? " livre--couv" : ""}" data-reveal>${lien}<span class="livre-c">${cover}</span><span class="livre-t" lang="${l}"${l === "ar" ? "" : ' dir="ltr"'}>${titre}</span>${lien ? `<span class="livre-go">${t.voir} <i>${code === "ar" ? "↖" : "↗"}</i></span></a>` : ""}</li>`;
}).join("\n")}
        </ul>
      </section>`).join("\n");
  const html = `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${t.title}</title>
  <meta name="description" content="${esc(t.desc)}" />
  <meta property="og:title" content="${esc(t.title)}" />
  <meta property="og:description" content="${esc(t.desc)}" />
  <meta property="og:image" content="/media/partage-shaykh.jpg" />
</head>
<body data-page="ouvrages">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="actu-page ouvrages">
      <div class="section-head">
        <p class="kicker">${t.kicker}</p>
        <h1 class="h2" data-split>${t.h1}</h1>
        <p class="section-lede" data-reveal>${t.lede}</p>
      </div>
${blocs}
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  if (t.dir) fs.mkdirSync(t.dir, { recursive: true });
  fs.writeFileSync(`${t.dir}ouvrages.html`, html);
}
console.log("ouvrages.html ×3");

#!/usr/bin/env node
/* Génère la page « Sa biographie en vidéo » (biographie-en-video.html, en/, ar/) : les vidéos biographiques du Shaykh, dans l'ordre.
   La liste des vidéos est BIO_VIDEOS dans scripts/videos-data.mjs. Utilisation : node scripts/bio-video.mjs */
import fs from "node:fs";
import { esc, vcard, BIO_VIDEOS } from "./videos-data.mjs";

const L = {
  fr: { dir: "", kicker: "Le Shaykh", h1: "Sa biographie en vidéo", lede: "Portraits et témoignages vidéo sur la vie et l'œuvre du Shaykh, à regarder dans l'ordre.", title: "Sa biographie en vidéo", desc: "Les vidéos biographiques du Shaykh Mohamed Faouzi Al Karkari : sa vie, son parcours et son œuvre, à regarder dans l'ordre." },
  en: { dir: "en/", kicker: "The Shaykh", h1: "His biography on video", lede: "Video portraits and testimonies on the life and work of the Shaykh, to be watched in order.", title: "His biography on video", desc: "The biographical videos of Shaykh Mohamed Faouzi Al Karkari: his life, his journey and his work, to be watched in order." },
  ar: { dir: "ar/", kicker: "الشيخ", h1: "سيرته بالفيديو", lede: "صور وشهادات مرئية عن حياة الشيخ وعمله، تُشاهَد بالترتيب.", title: "سيرته بالفيديو", desc: "السيرة المرئية للشيخ محمد فوزي الكركري: حياته ومسيرته وعمله، تُشاهَد بالترتيب." },
};
for (const [code, T] of Object.entries(L)) {
  const html = `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(T.title)} — ${code === "ar" ? "الشيخ محمد فوزي الكركري" : "Shaykh Mohamed Faouzi Al Karkari"}</title>
  <meta name="description" content="${esc(T.desc)}" />
  <meta property="og:title" content="${esc(T.title)}" />
  <meta property="og:description" content="${esc(T.desc)}" />
  <meta property="og:image" content="/media/partage-shaykh.jpg" />
</head>
<body data-page="shaykh">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="hub media-page media-tete">
      <div class="section-head">
        <p class="kicker">${T.kicker}</p>
        <h1 class="h2" data-split>${T.h1}</h1>
        <p class="section-lede" data-reveal>${T.lede}</p>
      </div>
    </section>
    <section class="vpage vband">
      <div class="vgrid">
${BIO_VIDEOS.map((v) => vcard(v, code)).join("\n")}
      </div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  if (T.dir) fs.mkdirSync(T.dir, { recursive: true });
  fs.writeFileSync(`${T.dir}biographie-en-video.html`, html);
}
console.log(`biographie-en-video.html ×3 (${BIO_VIDEOS.length} vidéos)`);

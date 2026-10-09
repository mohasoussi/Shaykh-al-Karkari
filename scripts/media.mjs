#!/usr/bin/env node
/* Génère la page « Média » (fr, en, ar) : accès aux vidéos et reportages, galerie de photos avec visionneuse.
   Pour ajouter une photo : la déposer dans public/media/photos/ (+ miniature dans public/media/photos/t/) et l'ajouter à PHOTOS.
   Utilisation : node scripts/media.mjs */
import { bandeVideos, INTERVIEWS } from "./videos-data.mjs";
import fs from "node:fs";
import { readFileSync } from "node:fs";
const ALBUMS = JSON.parse(readFileSync("scripts/albums.json", "utf8"));
const RATIOS = JSON.parse(readFileSync("scripts/ratios.json", "utf8"));
const htmlAlbum = (a, code, pre) => a.photos.map((p) => `        <a class="galerie-item" style="--r:${RATIOS[a.id + "/" + p.f] || 1.5}" href="${pre}media/evenements/${a.id}/${p.f}.webp" data-reveal><img src="${pre}media/evenements/${a.id}/t/${p.f}.webp" alt="${esc(p.alt[code] || p.alt.fr)}" loading="lazy" decoding="async" /></a>`).join("\n");
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


const PRESSE = [
  ["Febrayer", "https://febrayer.com/1092812.html", "Article de presse", "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley."],
  ["Associated Press", "https://apnews.com/df7a55acc890d39c516060e876024a2d", "Article de presse", "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley."],
  ["Voice of Alexandria", "https://www.voiceofalexandria.com/sufism-meets-academia-shaykh-al-karkari-s-talk-at-yale/article_4d0c52a0-4b4c-5703-9c3d-fd766b813626.html", "Sufism Meets Academia: Shaykh Al-Karkari's Talk at Yale", "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley."],
  ["Galveston County Daily News", "https://www.galvnews.com/sufism-meets-academia-shaykh-al-karkari-s-talk-at-yale/article_49f77d3c-f9c4-51b9-9cbd-a2227c16bdbd.html", "Sufism Meets Academia: Shaykh Al-Karkari's Talk at Yale", "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley."],
  ["The Facts", "https://thefacts.com/ap_news/sufism-meets-academia-shaykh-al-karkari-s-talk-at-yale/article_f7d9ac80-1aad-5f18-8b7a-644d9289b6c3.html", "Sufism Meets Academia: Shaykh Al-Karkari's Talk at Yale", "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley."],
  ["NewsBreak", "https://www.newsbreak.com/news/3827409931020-sufism-meets-academia-shaykh-al-karkari-s-talk-at-yale", "Sufism Meets Academia: Shaykh Al-Karkari's Talk at Yale", "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley."],
  ["Méditerranée Plurielle", "https://mediterranee-plurielle.com/index.php/2023/07/10/science-et-conscience-invitees-au-pays-de-loncle-sam", "Science et conscience invitées au pays de l'Oncle Sam", "Le voyage du Shaykh aux États-Unis, son intervention à l'Université de Chicago sur l'intelligence artificielle et sa rencontre avec le professeur rabbinique Yehiel E. Poupko et les professeurs Jeremy Brown et Tzvi Novick, de l'Université Notre-Dame (juillet 2023)."],
  ["Maghreb Observateur", "https://maghreb-observateur.com/?p=20606", "Intelligence Artificielle et Soufisme : quand le Maroc et les États-Unis explorent les liens entre technologie et spiritualité", "À l'Université de Chicago, une conférence réunit le maître soufi Sidi Mohamed Faouzi Al Karkari et Saad Ansari, expert en IA, sous la houlette du professeur Yusef Casewit."],
  ["Atlantica", "https://atlantica.africa/2025/09/22/le-sheikh-soufi-mohammed-fouzi-al-karkari-eleve-au-rang-prestigieux-de-paul-harris-fellow-a-paris/", "Le sheikh soufi Mohammed Fouzi Al Karkari élevé au rang prestigieux de Paul Harris Fellow à Paris"],
  ["OpenPR", "https://www.openpr.com/news/4194798/spiritual-leader-al-karkari-honored-at-paris-peace-summit-al"],
  ["FinancialContent", "https://www.financialcontent.com/article/getnews-2025-9-23-spiritual-leader-al-karkari-honored-at-paris-peace-summit-al-karkari-institutes-vision-for-global-harmony"],
  ["MENAFN", "https://menafn.com/1110102141/Spiritual-Leader-Al-Karkari-Honored-At-Paris-Peace-Summit-Al-Karkari-Institutes-Vision-For-Global-Harmony"],
  ["California News Reporter", "https://news.californianewsreporter.com/story/569289/spiritual-leader-al-karkari-honored-at-paris-peace-summit-al-karkari-institutes-vision-for-global-harmony.html"],
  ["Boston News Desk", "https://news.bostonnewsdesk.com/story/537277/spiritual-leader-al-karkari-honored-at-paris-peace-summit-al-karkari-institutes-vision-for-global-harmony.html"],
];
const TP = {
  fr: ["Dans la presse", "Articles de presse (septembre 2025) sur la distinction reçue au Symposium pour la Paix.", "« Spiritual Leader Al-Karkari Honored at Paris Peace Summit — Al-Karkari Institute's Vision for Global Harmony »", "Lire l'article"],
  en: ["In the press", "Press coverage (September 2025) of the honour received at the Peace Symposium.", "“Spiritual Leader Al-Karkari Honored at Paris Peace Summit — Al-Karkari Institute's Vision for Global Harmony”", "Read the article"],
  ar: ["في الصحافة", "مقالات صحفية (سبتمبر 2025) حول التكريم الذي نالـه الشيخ في ندوة السلام.", "“Spiritual Leader Al-Karkari Honored at Paris Peace Summit — Al-Karkari Institute's Vision for Global Harmony”", "اقرأ المقال"],
};
const TRP = {
  "Article de presse": ["Press article", "مقال صحفي"],
  "Revue de presse USA : après un mois aux États-Unis et des conférences à Chicago, Yale, Stanford, Harvard, Indianapolis et Berkeley.": ["US press review: after a month in the United States and lectures in Chicago, Yale, Stanford, Harvard, Indianapolis and Berkeley.", "قراءة في الصحافة الأمريكية: بعد شهر في الولايات المتحدة ومحاضرات في شيكاغو وييل وستانفورد وهارفارد وإنديانابوليس وبيركلي."],
  "Science et conscience invitées au pays de l'Oncle Sam": ["Science and conscience invited to Uncle Sam's country (in French)", "العلم والوعي ضيفان في بلاد العمّ سام (بالفرنسية)"],
  "Le voyage du Shaykh aux États-Unis, son intervention à l'Université de Chicago sur l'intelligence artificielle et sa rencontre avec le professeur rabbinique Yehiel E. Poupko et les professeurs Jeremy Brown et Tzvi Novick, de l'Université Notre-Dame (juillet 2023).": ["The Shaykh's journey to the United States, his talk at the University of Chicago on artificial intelligence and his meeting with Rabbi Professor Yehiel E. Poupko and Professors Jeremy Brown and Tzvi Novick of the University of Notre Dame (July 2023).", "رحلة الشيخ إلى الولايات المتحدة، ومحاضرته في جامعة شيكاغو حول الذكاء الاصطناعي، ولقاؤه بالأستاذ الحاخامي يحيئيل بوبكو والأستاذين جيريمي براون وتسفي نوفيك من جامعة نوتردام (يوليو 2023)."],
  "Intelligence Artificielle et Soufisme : quand le Maroc et les États-Unis explorent les liens entre technologie et spiritualité": ["Artificial Intelligence and Sufism: when Morocco and the United States explore the links between technology and spirituality (in French)", "الذكاء الاصطناعي والتصوف: حين يستكشف المغرب والولايات المتحدة الصلة بين التقنية والروحانية (بالفرنسية)"],
  "À l'Université de Chicago, une conférence réunit le maître soufi Sidi Mohamed Faouzi Al Karkari et Saad Ansari, expert en IA, sous la houlette du professeur Yusef Casewit.": ["At the University of Chicago, a lecture brings together the Sufi master Sidi Mohamed Faouzi Al Karkari and Saad Ansari, an AI expert, under the guidance of Professor Yusef Casewit.", "في جامعة شيكاغو، محاضرة تجمع المعلّم الصوفي سيدي محمد فوزي الكركري وسعد أنصاري، الخبير في الذكاء الاصطناعي، بإشراف الأستاذ يوسف كاسويت."],
  "Le sheikh soufi Mohammed Fouzi Al Karkari élevé au rang prestigieux de Paul Harris Fellow à Paris": ["The Sufi sheikh Mohammed Fouzi Al Karkari raised to the prestigious rank of Paul Harris Fellow in Paris (in French)", "الشيخ الصوفي محمد فوزي الكركري يُرفع إلى رتبة «بول هاريس فيلو» المرموقة في باريس (بالفرنسية)"],
};
const trp = (txt, code) => (code === "fr" || !txt ? txt : (TRP[txt] || [])[code === "en" ? 0 : 1] || txt);
function blocPresse(code) {
  const [h, l, titre, cta] = TP[code];
  return `      <div class="section-head media-gal-head">
        <h2 class="h2" data-split>${h}</h2>
        <p class="section-lede" data-reveal>${l}</p>
      </div>
      <ul class="presse-liste" data-reveal>
${PRESSE.map(([n, u, ti, ex]) => `        <li><a href="${u}" target="_blank" rel="noopener"><strong>${n}</strong><span dir="ltr">${ti ? trp(ti, code) : titre}</span>${ex ? `<small>${trp(ex, code)}</small>` : ""}<em>${cta} ↗</em></a></li>`).join("\n")}
      </ul>
`;
}
const T = {
  fr: { dir: "", kicker: "Média", h1: "Interviews et presse", lede: "Les entretiens du Shaykh dans les médias, la revue de presse et les coupures de journaux.", iv: "Interviews en vidéo", ivl: "Entretiens accordés aux chaînes et journaux marocains.",
    c1: ["Vidéos", "Conférences et entretiens en vidéo : Sorbonne, Chicago, Yale, Stanford, Berkeley…", "Voir les vidéos", "conferences.html", "conf-sorbonne"],
    c2: ["Reportages", "Photos et vidéos des visites, des rencontres et du Mawlid, racontées dans les actualités.", "Lire les reportages", "actualites.html", "conf-paix"],
    g: "Galerie", gl: "Touchez une photo pour l'agrandir. Les albums par événement suivent.", close: "Fermer", prev: "Photo précédente", next: "Photo suivante", title: "Média — Shaykh Mohamed Faouzi Al Karkari", desc: "Interviews, revue de presse et coupures de journaux sur le Shaykh Mohamed Faouzi Al Karkari.", a: "→" },
  en: { dir: "en/", kicker: "Media", h1: "Interviews and press", lede: "The Shaykh's interviews in the media, the press review and newspaper clippings.", iv: "Video interviews", ivl: "Interviews given to Moroccan channels and newspapers.",
    c1: ["Videos", "Lectures and interviews on video: Sorbonne, Chicago, Yale, Stanford, Berkeley…", "Watch the videos", "conferences.html", "conf-sorbonne"],
    c2: ["Reports", "Photos and videos of visits, gatherings and the Mawlid, told in the news section (articles in French).", "Read the reports", "actualites.html", "conf-paix"],
    g: "Gallery", gl: "Tap a photo to enlarge it.", close: "Close", prev: "Previous photo", next: "Next photo", title: "Media — Shaykh Mohamed Faouzi Al Karkari", desc: "Photos and videos of Shaykh Mohamed Faouzi Al Karkari.", a: "→" },
  ar: { dir: "ar/", kicker: "الوسائط", h1: "حوارات وصحافة", lede: "حوارات الشيخ في وسائل الإعلام، وعرض صحفي، وقصاصات من الجرائد.", iv: "حوارات بالفيديو", ivl: "حوارات مع قنوات وصحف مغربية.",
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
  const albums = ALBUMS.filter((a) => a.rubrique === "media").map((a) => `      <div class="section-head media-gal-head" id="${a.id}">
        <h2 class="h2" data-split>${esc(a.titre[code])}</h2>${a.texte ? `\n        <p class="section-lede" data-reveal>${esc(a.texte[code] || a.texte.fr)}</p>` : ""}${a.corps ? `\n        <p class="album-art"><a href="${pre}evenement-${a.id}.html">${code === "fr" ? "Lire l'article" : code === "en" ? "Read the article (French)" : "اقرأ المقال (بالفرنسية)"} →</a></p>` : ""}
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
    <section class="hub media-page media-tete">
      <div class="section-head">
        <p class="kicker">${t.kicker}</p>
        <h1 class="h2" data-split>${t.h1}</h1>
        <p class="section-lede" data-reveal>${t.lede}</p>
      </div>
    </section>
${bandeVideos(INTERVIEWS, code, t.iv, t.ivl)}    <section class="hub media-page media-presse">
${blocPresse(code)}${albums}

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
          <p class="album-n">${g.n(a.photos.length)}</p>${a.texte ? `\n          <p class="section-lede" data-reveal>${esc(a.texte[code] || a.texte.fr)}</p>` : ""}${a.corps ? `\n          <p class="album-art"><a href="${pre}evenement-${a.id}.html">${esc(g.art)} →</a></p>` : a.article ? `\n          <p class="album-art"><a href="${pre}actualite-${a.article}.html">${esc(g.art)} →</a></p>` : ""}
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
    <section class="hub media-page galerie-page">
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

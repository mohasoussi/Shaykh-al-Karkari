// Génère la page « Conférences en vidéo » dans les trois langues à partir d'une seule liste.
// Usage : node scripts/conferences.mjs
import fs from "node:fs";

const L = {
  fr: { dir: "", lang: "fr", kicker: "Les conférences", h1: "Conférences en vidéo", lede: "Amphithéâtres, universités et scènes pour la paix : les rencontres du Shaykh, à regarder.", open: "Ouvrir sur YouTube ↗", play: "Lire la vidéo : ", title: "Conférences en vidéo — Shaykh Mohamed Faouzi Al Karkari", desc: "Les conférences et entretiens du Shaykh Mohamed Faouzi Al Karkari en vidéo." },
  en: { dir: "en/", lang: "en", kicker: "Lectures", h1: "Lectures on video", lede: "Lecture halls, universities and stages for peace: the Shaykh's encounters, to watch.", open: "Open on YouTube ↗", play: "Play the video: ", title: "Lectures on video — Shaykh Mohamed Faouzi Al Karkari", desc: "Lectures and interviews of Shaykh Mohamed Faouzi Al Karkari on video." },
  ar: { dir: "ar/", lang: "ar", kicker: "المحاضرات", h1: "المحاضرات بالفيديو", lede: "قاعات الجامعات ومنصّات السلام: لقاءات الشيخ، للمشاهدة.", open: "فتح على يوتيوب ↗", play: "تشغيل الفيديو: ", title: "المحاضرات بالفيديو — الشيخ محمد فوزي الكركري", desc: "محاضرات الشيخ محمد فوزي الكركري ولقاءاته بالفيديو." },
};

const V = [
  { id: "sorbonne", yt: "https://www.youtube.com/watch?v=pRxp9eQIPy8", img: "conf-sorbonne",
    place: { fr: "Paris · France — 27 février 2025", en: "Paris · France — 27 February 2025", ar: "باريس · فرنسا — 27 فبراير 2025" },
    t: { fr: "IA et paix : quel futur voulons-nous ?", en: "AI and Peace: what future do we want?", ar: "الذكاء الاصطناعي والسلام: أيّ مستقبل نريد؟" },
    d: { fr: "Conférence à la Sorbonne avec Cédric Fiducia (prompt manager et expert en IA), Hassan al-Bakkali (diplômé du MIT, CEO de Ceres Advisory) et le Shaykh Mohamed Faouzi al-Karkari, fondateur de l'Institut al-Karkari.", en: "A lecture at the Sorbonne with Cédric Fiducia (prompt manager and AI expert), Hassan al-Bakkali (MIT graduate, CEO of Ceres Advisory) and Shaykh Mohamed Faouzi al-Karkari, founder of the Al-Karkari Institute.", ar: "محاضرة في جامعة السوربون مع سيدريك فيدوسيا (خبير في الذكاء الاصطناعي)، وحسن البكالي (خريج MIT والرئيس التنفيذي لشركة Ceres Advisory)، والشيخ محمد فوزي الكركري مؤسس معهد الكركري." } },
  { id: "chicago-vetements", yt: "https://www.youtube.com/watch?v=7GQh2UX0VEI", img: "",
    place: { fr: "Université de Chicago · États-Unis", en: "University of Chicago · United States", ar: "جامعة شيكاغو · الولايات المتحدة" },
    t: { fr: "Spiritual Attire : les dimensions intérieures du vêtement", en: "Spiritual Attire: The Inner Dimensions of Clothing", ar: "اللباس الروحي: الأبعاد الباطنة للّباس" },
    d: { fr: "Une conversation avec le Shaykh, le Dr Yousef Casewit et la Dr Maria Hamilton Abegunde sur le vêtement dans les traditions religieuses d'Afrique du Nord et de l'Ouest. La Dr Heather Akou interroge ensuite le Shaykh sur le sens spirituel du patchwork et la production du savoir.", en: "A conversation with the Shaykh, Dr. Yousef Casewit and Dr. Maria Hamilton Abegunde on clothing in North and West African religious traditions. Dr. Heather Akou later interviewed the Shaykh on the spiritual meaning of patching and knowledge production.", ar: "حوار مع الشيخ والدكتور يوسف كاسويت والدكتورة ماريا هاملتون أبيغوندي حول اللباس في التقاليد الدينية بشمال إفريقيا وغربها. ثم حاورت الدكتورة هيذر أكو الشيخَ حول المعنى الروحي للرقعة وإنتاج المعرفة." } },
  { id: "chicago-marche", yt: "https://www.youtube.com/watch?v=J4I9HiyCC1I", img: "",
    place: { fr: "Université de Chicago · États-Unis — 23 juillet 2023", en: "University of Chicago · United States — 23 July 2023", ar: "جامعة شيكاغو · الولايات المتحدة — 23 يوليو 2023" },
    t: { fr: "La marche comme pratique spirituelle", en: "Walking as a Spiritual Practice", ar: "المشي ممارسةً روحية" },
    d: { fr: "Entretien du Pr Yousef Casewit avec le Shaykh, dans le cadre d'un projet vidéo du Marty Center : la « siyaha » soufie, l'errance pieuse fondée sur l'ordre coranique de « parcourir la terre », et la dizaine d'années que le Shaykh a passées à marcher à travers le Maroc.", en: "In this video project sponsored by the Marty Center, Professor Yousef Casewit interviews the Shaykh on Sufi wandering (siyaha): a practice rooted in the Qur'anic command to “journey in the land”, and shaped by his decade of walking across Morocco.", ar: "حوار للأستاذ يوسف كاسويت مع الشيخ ضمن مشروع مرئي لمركز مارتي: السياحة الصوفية المستندة إلى الأمر القرآني بالسير في الأرض، وعشر سنوات قضاها الشيخ في المشي عبر المغرب." } },
  { id: "lvdv", yt: "https://www.youtube.com/watch?v=JLwzFxn0PeI", img: "",
    place: { fr: "Paris · France — 29 avril 2024", en: "Paris · France — 29 April 2024", ar: "باريس · فرنسا — 29 أبريل 2024" },
    t: { fr: "L'amour d'Allah — podcast LVDV", en: "The Love of Allah — LVDV podcast", ar: "محبّة الله — بودكاست LVDV" },
    d: { fr: "Entretien à Paris pour le podcast LVDV, consacré à l'amour d'Allah.", en: "An interview in Paris for the LVDV podcast, on the love of Allah.", ar: "حوار في باريس لبودكاست LVDV حول محبّة الله." } },
  { id: "chicago-kripal", yt: "https://www.youtube.com/watch?v=D9YjI5vYrNg", img: "",
    place: { fr: "Université de Chicago · États-Unis — 26 mars 2025", en: "University of Chicago · United States — 26 March 2025", ar: "جامعة شيكاغو · الولايات المتحدة — 26 مارس 2025" },
    t: { fr: "Phénomènes extraordinaires, dévoilement et monde imaginal", en: "Extraordinary Experiences, Unveiling and the Imaginal", ar: "التجارب الخارقة والكشف وعالم المثال" },
    d: { fr: "Le Martin Marty Center reçoit le Pr Jeffrey Kripal, spécialiste des religions comparées, et le Shaykh : la nature des expériences extraordinaires, du dévoilement visionnaire, du monde intermédiaire de l'Imaginal et de la Lumière, centrale dans la pensée soufie.", en: "The Martin Marty Center hosted Professor Jeffrey Kripal, a scholar of comparative religion, in conversation with the Shaykh about extraordinary experiences, visionary unveiling, the in-between realm of the Imaginal, and the Light central to Sufi thought.", ar: "استضاف مركز مارتن مارتي الأستاذ جيفري كريبال، المتخصص في الأديان المقارنة، في حوار مع الشيخ حول التجارب الخارقة والكشف الرؤيوي وعالم المثال والنور في الفكر الصوفي." } },
  { id: "yale-1", yt: "https://www.youtube.com/playlist?list=PLnRed8_Im6qRnuymvPprVz5zrOrHbQvRi", thumb: "mXIJ7_x326k", img: "",
    place: { fr: "Université Yale · États-Unis — 19 mai 2025", en: "Yale University · United States — 19 May 2025", ar: "جامعة ييل · الولايات المتحدة — 19 مايو 2025" },
    t: { fr: "Conférence à l'Université Yale", en: "Lecture at Yale University", ar: "محاضرة في جامعة ييل" },
    d: { fr: "Conférence donnée à l'Université Yale, répartie en sept parties : le lecteur enchaîne automatiquement toute la série.", en: "A lecture given at Yale University, in seven parts: the player plays the whole series in sequence.", ar: "محاضرة ألقاها الشيخ في جامعة ييل، مقسّمة إلى سبعة أجزاء يتابعها المشغّل تلقائيًا." } },
  { id: "yale-2", yt: "https://www.youtube.com/watch?v=momk8eZDRvg", img: "",
    place: { fr: "Université Yale · États-Unis", en: "Yale University · United States", ar: "جامعة ييل · الولايات المتحدة" },
    t: { fr: "Questions-réponses à Yale : la place du soi dans la quête du savoir", en: "Q&A at Yale: the place of the self in the pursuit of knowledge", ar: "أسئلة وأجوبة في ييل: موضع النفس في طلب العلم" },
    d: { fr: "Quelle place pour le soi dans la quête du savoir ? Comment l'étude académique de l'islam peut-elle rester éthique et spirituellement vivante ? Échange avec étudiants et enseignants, en arabe avec traduction anglaise en direct.", en: "What is the place of the self in the pursuit of knowledge? How can academic study of Islam remain ethically grounded and spiritually alive? A Q&A with students and faculty, delivered in Arabic with live English translation.", ar: "ما موضع النفس في طلب العلم؟ وكيف تبقى الدراسة الأكاديمية للإسلام أخلاقية وحيّة روحيًا؟ حوار مع الطلبة والأساتذة باللغة العربية مع ترجمة إنجليزية مباشرة." } },
  { id: "berkeley", yt: "https://www.youtube.com/watch?v=Edn4iMY2xo4", img: "",
    place: { fr: "UC Berkeley · États-Unis — 4 avril 2025", en: "UC Berkeley · United States — 4 April 2025", ar: "جامعة بيركلي · الولايات المتحدة — 4 أبريل 2025" },
    t: { fr: "Commentaire du poème d'Abu Madyan al-Ghawth", en: "Commentary on Abu Madyan al-Ghawth's poem", ar: "شرح قصيدة أبي مدين الغوث" },
    d: { fr: "Commentaire du Shaykh sur le poème d'Abu Madyan al-Ghawth « Chaque fois que je me souviens de mon Seigneur », présenté lors de l'atelier de l'Institut al-Karkari à UC Berkeley : une exploration traditionnelle de ses sens spirituels et philosophiques.", en: "The Shaykh's commentary on Abu Madyan al-Ghawth's poem “Whenever I Remember My Lord”, presented at the Al-Karkari Institute workshop at UC Berkeley: a traditional exploration of its spiritual and philosophical meanings.", ar: "شرح الشيخ لقصيدة أبي مدين الغوث «كلّما ذكرتُ ربّي»، ضمن ورشة معهد الكركري في جامعة بيركلي: قراءة تقليدية في معانيها الروحية والفلسفية." } },
  { id: "institut-usa", yt: "https://www.youtube.com/watch?v=yCHaLAw4nmw", img: "",
    place: { fr: "États-Unis — 10 août 2024", en: "United States — 10 August 2024", ar: "الولايات المتحدة — 10 أغسطس 2024" },
    t: { fr: "Inauguration de l'Institut al-Karkari aux États-Unis", en: "Inauguration of the Al-Karkari Institute in the USA", ar: "افتتاح معهد الكركري في الولايات المتحدة" },
    d: { fr: "Inauguration de l'Institut al-Karkari pour les études soufies aux États-Unis.", en: "The inauguration of the Al-Karkari Institute for Sufi Studies in the United States.", ar: "افتتاح معهد الكركري للدراسات الصوفية في الولايات المتحدة." } },
  { id: "stanford", yt: "https://www.youtube.com/watch?v=3aZPIs6TbFc&list=PLnRed8_Im6qRt3ApNqblnI-Cw4BOz1q3S", img: "",
    place: { fr: "Université Stanford · États-Unis — 17 janvier 2025", en: "Stanford University · United States — 17 January 2025", ar: "جامعة ستانفورد · الولايات المتحدة — 17 يناير 2025" },
    t: { fr: "Atelier de Stanford sur la poésie de Hallaj", en: "Stanford workshop on Hallaj's poetry", ar: "ورشة ستانفورد حول شعر الحلّاج" },
    d: { fr: "Atelier sur la poésie de Hallaj par le Shaykh à l'Université Stanford. L'atelier comprend quinze parties : le lecteur enchaîne automatiquement toute la série.", en: "A workshop on Hallaj's poetry by the Shaykh at Stanford University. The workshop has fifteen parts: the player plays the whole series in sequence.", ar: "ورشة الشيخ حول شعر الحلّاج في جامعة ستانفورد، وتتألف من خمسة عشر جزءًا يتابعها المشغّل تلقائيًا." } },
  { id: "paix", yt: "https://www.youtube.com/watch?v=uxFF23Gf8vg", img: "conf-paix",
    place: { fr: "Paris · France — 2025", en: "Paris · France — 2025", ar: "باريس · فرنسا — 2025" },
    t: { fr: "Une Voix pour la Paix", en: "A Voice for Peace", ar: "صوتٌ من أجل السلام" },
    d: { fr: "« L'accent mis par les docteurs de la loi exotérique est souvent porté uniquement sur la relation verticale entre le serviteur et son Seigneur, négligeant la relation horizontale, c'est-à-dire dans la société. »", en: "“The emphasis of the exoteric jurists is often placed solely on the vertical relationship between the servant and his Lord, neglecting the horizontal relationship, that is, within society.”", ar: "«كثيرًا ما يقتصر تركيز فقهاء الظاهر على العلاقة العمودية بين العبد وربّه، مع إغفال العلاقة الأفقية، أي في المجتمع.»" } },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ytId = (u, v) => v.thumb || (u.match(/v=([\w-]{11})/) || [])[1];
const PLAY = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';

for (const [code, T] of Object.entries(L)) {
  const dir = T.dir;
  const pre = dir ? "../" : "";
  const cards = V.map((v) => {
    const id = ytId(v.yt, v);
    const img = v.img ? `${pre}media/${v.img}.webp` : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    return `      <article class="vcard" id="${v.id}" data-youtube="${esc(v.yt)}" data-reveal>
        <div class="vframe">
          <img src="${img}" alt="" loading="lazy" />
          <button class="vplay" type="button" aria-label="${esc(T.play + v.t[code])}">${PLAY}</button>
        </div>
        <div class="vcopy">
          <span class="talk-place">${esc(v.place[code])}</span>
          <h2>${esc(v.t[code])}</h2>
          <p>${esc(v.d[code])}</p>
          <a class="vlink" href="${esc(v.yt)}" target="_blank" rel="noopener" hidden>${T.open}</a>
        </div>
      </article>`;
  }).join("\n");
  const html = `<!doctype html>
<html lang="${T.lang}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${T.title}</title>
  <meta name="description" content="${esc(T.desc)}" />
  <meta property="og:title" content="${esc(T.title)}" />
  <meta property="og:description" content="${esc(T.desc)}" />
  <meta property="og:image" content="/media/portrait-fes.webp" />
</head>
<body data-page="conferences">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="vpage">
      <div class="section-head">
        <p class="kicker">${T.kicker}</p>
        <h1 class="h2" data-split>${T.h1}</h1>
        <p class="section-lede" data-reveal>${T.lede}</p>
      </div>
      <div class="vgrid">
${cards}
      </div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  if (dir) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}conferences.html`, html);
}
console.log("conferences.html ×3");

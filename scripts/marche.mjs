#!/usr/bin/env node
/* Génère la page « Une marche de 10 ans à travers le Maroc » (marche-de-dix-ans.html, en/, ar/).
   Pour la compléter : ajouter des sections dans SECTIONS (une entrée par intertitre), puis node scripts/marche.mjs */
import fs from "node:fs";
import { bandeVideos, esc } from "./videos-data.mjs";

const LANG = {
  fr: { dir: "", kicker: "Le Shaykh", titre: "Une marche de 10 ans à travers le Maroc",
    sous: "1994 – 2004 · du Rif au Sahara, seul, en quête de son Seigneur",
    desc: "De 1994 à 2004, le Shaykh Mohamed Faouzi Al Karkari a parcouru le Maroc seul, en quête de son Seigneur, sans objectif ni destination.",
    intro: "De 1994 à 2004, le Shaykh Mohamed Faouzi Al Karkari a parcouru le Maroc seul, en quête de son Seigneur, vivant de ce qu'Allah lui donnait, sans aucun objectif ni destination. Cette page raconte cette marche de dix ans.",
    alt: "Le désert marocain", video: "La marche comme pratique spirituelle",
    videoLede: "Le Shaykh en parle lui-même, en 2023, à l'Université de Chicago.",
    videoPlace: "Université de Chicago · États-Unis — 23 juillet 2023",
    videoDesc: "Entretien du professeur Yousef Casewit avec le Shaykh, dans le cadre d'un projet vidéo du Marty Center : la « siyaha » soufie, l'errance pieuse fondée sur l'ordre coranique de « parcourir la terre », et la dizaine d'années que le Shaykh a passées à marcher à travers le Maroc.",
    bio: "Sa biographie", chaine: "Sa chaîne de transmission", maitre: "Son maître, Mawlay al-Hassan", fleche: "→" },
  en: { dir: "en/", kicker: "The Shaykh", titre: "A 10-year walk across Morocco",
    sous: "1994 – 2004 · from the Rif to the Sahara, alone, in search of his Lord",
    desc: "From 1994 to 2004, Shaykh Mohamed Faouzi Al Karkari crossed Morocco alone, in search of his Lord, with no goal or destination.",
    intro: "From 1994 to 2004, Shaykh Mohamed Faouzi Al Karkari crossed Morocco alone, in search of his Lord, living on what God gave him, with no goal or destination whatsoever. This page tells the story of that ten-year walk.",
    alt: "The Moroccan desert", video: "Walking as a Spiritual Practice",
    videoLede: "The Shaykh speaks about it himself, in 2023, at the University of Chicago.",
    videoPlace: "University of Chicago · United States — 23 July 2023",
    videoDesc: "In this video project sponsored by the Marty Center, Professor Yousef Casewit interviews the Shaykh on Sufi wandering (siyaha): a practice rooted in the Qur'anic command to “journey in the land”, and shaped by his decade of walking across Morocco.",
    bio: "His biography", chaine: "His chain of transmission", maitre: "His master, Mawlay al-Hassan", fleche: "→" },
  ar: { dir: "ar/", kicker: "الشيخ", titre: "مسيرة عشر سنوات عبر المغرب",
    sous: "1994 – 2004 · من الريف إلى الصحراء، وحيدًا، في طلب ربّه",
    desc: "من 1994 إلى 2004، قطع الشيخ محمد فوزي الكركري المغرب وحيدًا، في طلب ربّه، من غير هدفٍ ولا وجهة.",
    intro: "من سنة 1994 إلى 2004، قطع الشيخ محمد فوزي الكركري المغرب وحيدًا، في طلب ربّه، يعيش مما يرزقه الله، من غير أيّ هدفٍ ولا وجهة. تروي هذه الصفحة قصة هذه المسيرة التي دامت عشر سنوات.",
    alt: "الصحراء المغربية", video: "المشي ممارسةً روحية",
    videoLede: "يتحدث الشيخ عنها بنفسه سنة 2023 في جامعة شيكاغو.",
    videoPlace: "جامعة شيكاغو · الولايات المتحدة — 23 يوليو 2023",
    videoDesc: "حوار للأستاذ يوسف كاسويت مع الشيخ ضمن مشروع مرئي لمركز مارتي: السياحة الصوفية المستندة إلى الأمر القرآني بالسير في الأرض، وعشر سنوات قضاها الشيخ في المشي عبر المغرب.",
    bio: "سيرته", chaine: "سلسلة إسناده", maitre: "شيخه مولاي الحسن", fleche: "←" },
};

// intertitre + paragraphes, par langue (le texte reste volontairement factuel : à compléter au fil des récits)
const SECTIONS = [
  { fr: ["Le départ", [
      "En 1994, à vingt ans, Mohamed Faouzi Al Karkari quitte sa famille et sa région d'origine, dans le Rif. Il n'a ni projet, ni itinéraire, ni destination : il part sur les routes du Maroc, en quête de son Seigneur.",
    ]],
    en: ["The departure", [
      "In 1994, at the age of twenty, Mohamed Faouzi Al Karkari left his family and his home region, in the Rif. He had no plan, no itinerary and no destination: he set out on the roads of Morocco, in search of his Lord.",
    ]],
    ar: ["الانطلاق", [
      "في سنة 1994م، وهو في العشرين من عمره، غادر محمد فوزي الكركري أسرته وإقليمه الأصلي في الريف. لم تكن له خطة ولا مسار ولا وجهة: انطلق في دروب المغرب طلبًا لربّه.",
    ]] },
  { fr: ["Dix ans sur les routes", [
      "Pendant dix ans, jusqu'en 2004, il traverse le pays seul, en marchant. Son chemin le mène d'Oujda à Al Mahbes, dans le désert marocain, de Tanger à Guelmim, de région en région, sans plan ni attache.",
      "Il vit de ce qu'Allah lui donne au fil du chemin, s'en remettant chaque jour à ce que Dieu met sur sa route.",
    ]],
    en: ["Ten years on the road", [
      "For ten years, until 2004, he crossed the country alone, on foot. His path took him from Oujda to Al Mahbes in the Moroccan desert, from Tangier to Guelmim, from region to region, with no plan and no ties.",
      "He lived on whatever God gave him along the way, relying each day on whatever God placed on his path.",
    ]],
    ar: ["عشر سنوات على الطرقات", [
      "طوال عشر سنوات، حتى سنة 2004م، قطع البلاد وحيدًا ماشيًا. قادته خطاه من وجدة إلى المحبس في الصحراء المغربية، ومن طنجة إلى كلميم، ومن إقليم إلى آخر، بلا خطةٍ ولا قيد.",
      "كان يعيش مما يرزقه الله على الطريق، متوكّلًا كل يوم على ما يضعه الله في سبيله.",
    ]] },
  { fr: ["Sans objectif ni destination", [
      "Cette marche n'a pas de but fixé : ce n'est ni un voyage d'étude, ni un pèlerinage vers un lieu précis. Chaque jour, il avance là où le chemin le conduit, en s'en remettant à Dieu pour sa subsistance.",
    ]],
    en: ["No goal, no destination", [
      "This walk had no fixed purpose: it was neither a study trip nor a pilgrimage to a particular place. Each day he went where the road led him, entrusting his subsistence to God.",
    ]],
    ar: ["بلا هدفٍ ولا وجهة", [
      "لم تكن لهذه المسيرة غاية محدَّدة: لا هي رحلة دراسة، ولا حجٌّ إلى مكانٍ بعينه. كان يمضي كل يوم حيث يقوده الطريق، متوكّلًا على الله في رزقه.",
    ]] },
  { fr: ["La siyaha, une tradition soufie", [
      "Cette forme d'errance pieuse porte, dans la tradition soufie, le nom de siyaha. Elle s'appuie sur plusieurs versets du Coran qui invitent à « parcourir la terre » (par exemple la sourate 29, verset 20) et a été pratiquée par de nombreux maîtres au cours des siècles : marcher, renoncer aux sécurités matérielles et apprendre à dépendre de Dieu seul.",
      { lien: "Lire l'article : la siyaha chez les maîtres soufis" },
    ]],
    en: ["Siyaha, a Sufi tradition", [
      "In the Sufi tradition, this form of pious wandering is called siyaha. It rests on several verses of the Qur'an that invite believers to “journey in the land” (for example surah 29, verse 20) and has been practised by many masters over the centuries: walking, giving up material security and learning to depend on God alone.",
      { lien: "Read the article: siyaha among the Sufi masters (in French)" },
    ]],
    ar: ["السياحة، تقليدٌ صوفي", [
      "تُعرف هذه الصورة من الارتحال التعبّدي في التقليد الصوفي باسم «السياحة». وهي تستند إلى آيات عدّة من القرآن تدعو إلى «السير في الأرض» (مثل سورة العنكبوت، الآية 20)، وقد مارسها كثير من المشايخ عبر القرون: مشيٌ، وتخلٍّ عن الأسباب المادية، وتعلّمٌ للاعتماد على الله وحده.",
      { lien: "اقرأ المقال: السياحة عند المشايخ الصوفية (بالفرنسية)" },
    ]] },
  { fr: ["Le retour et la rencontre avec son maître", [
      "En 2004, de retour à Nador, un feu intérieur, un besoin de repentir et une quête profonde du divin le conduisent chez son Shaykh. Il rend visite à son oncle, Mawlay al-Hassan Al Karkari, et lui demande de s'engager sur la voie. Il entre en retraite spirituelle (khalwa) en novembre 2004, puis demeure environ deux ans à ses côtés.",
      "À la mort de son Shaykh, en 2007, il devient son héritier spirituel. Il est aujourd'hui le guide spirituel de la Tariqa Karkariya.",
    ]],
    en: ["The return and the meeting with his master", [
      "In 2004, back in Nador, an inner fire, a need for repentance and a deep quest for the divine led him to his Shaykh. He visited his uncle, Mawlay al-Hassan Al Karkari, and asked to commit himself to the path. He entered spiritual retreat (khalwa) in November 2004 and then remained about two years at his side.",
      "When his Shaykh died, in 2007, he became his spiritual heir. He is today the spiritual guide of the Karkariya Tariqa.",
    ]],
    ar: ["العودة واللقاء بشيخه", [
      "في سنة 2004م، وعند عودته إلى الناظور، قادته نارٌ باطنة وحاجةٌ إلى التوبة وطلبٌ عميق للحقّ إلى شيخه. زار عمّه مولاي الحسن الكركري وطلب منه أن يدخل الطريق. دخل الخلوة في نوفمبر 2004م، ثم لازمه نحو سنتين.",
      "وعند وفاة شيخه سنة 2007م، صار وارثه الروحي، وهو اليوم المرشد الروحي للطريقة الكركرية.",
    ]] },
];

const GABARIT = (L, code, corps, video, lien) => `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(L.titre)} — ${code === "ar" ? "الشيخ محمد فوزي الكركري" : "Shaykh Mohamed Faouzi Al Karkari"}</title>
  <meta name="description" content="${esc(L.desc)}" />
  <meta property="og:title" content="${esc(L.titre)}" />
  <meta property="og:description" content="${esc(L.desc)}" />
  <meta property="og:image" content="/media/peregrination-desert.webp" />
</head>
<body data-page="shaykh">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="shaykh-texte maitre marche">
      <div class="section-head">
        <p class="kicker">${L.kicker}</p>
        <h1 class="h2" data-split>${esc(L.titre)}</h1>
        <p class="maitre-sous" data-reveal>${esc(L.sous)}</p>
      </div>
      <figure class="marche-photo" data-reveal><img src="/media/peregrination-desert.webp" alt="${esc(L.alt)}" loading="eager" /></figure>
      <div class="actu-corps">
        <p class="maitre-intro">${esc(L.intro)}</p>
${corps}
      </div>
    </section>
${video}    <section class="shaykh-texte maitre">
      <div class="center shaykh-suite">${lien}</div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;

for (const [code, L] of Object.entries(LANG)) {
  const corps = SECTIONS.map((s) => `        <h3>${esc(s[code][0])}</h3>\n${s[code][1].map((p) => (typeof p === "string" ? `        <p>${esc(p)}</p>` : `        <p><a class="btn-glass btn-glass--dark" href="${L.dir ? "../" : ""}siyaha-maitres-soufis.html"><span>${esc(p.lien)}</span><i>${L.fleche}</i></a></p>`)).join("\n")}`).join("\n");
  const video = bandeVideos(
    [{ id: "marche-video", yt: "https://www.youtube.com/watch?v=J4I9HiyCC1I",
      place: { [code]: L.videoPlace }, t: { [code]: L.video }, d: { [code]: L.videoDesc } }],
    code, L.video, L.videoLede,
  );
  const prefixe = L.dir ? "../" : "";
  const lien = `<a class="btn-glass btn-glass--dark" href="qui-est-le-shaykh.html#biographie"><span>${esc(L.bio)}</span><i>${L.fleche}</i></a> <a class="btn-glass btn-glass--dark" href="${prefixe}maitre-mawlay-al-hassan.html"><span>${esc(L.maitre)}</span><i>${L.fleche}</i></a> <a class="btn-glass btn-glass--dark" href="${L.dir ? "" : ""}chaine-de-transmission.html"><span>${esc(L.chaine)}</span><i>${L.fleche}</i></a>`;
  fs.mkdirSync(L.dir || ".", { recursive: true });
  fs.writeFileSync(`${L.dir}marche-de-dix-ans.html`, GABARIT(L, code, corps, video, lien));
}
console.log("marche-de-dix-ans.html ×3");

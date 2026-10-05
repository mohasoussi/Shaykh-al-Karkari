#!/usr/bin/env node
/* Versions anglaise (en/) et arabe (ar/) du site, déduites des pages françaises.
   - accueil : traduit à partir de index.html (table ci-dessous)
   - actualités / enseignements : listes régénérées dans chaque langue (les articles restent en français)
   - cartes de l'accueil et chaîne de transmission : blocs repris du français, libellés traduits
   Les autres pages (Qui est le Shaykh ?, Le Shaykh, Merkez) : python3 scripts/langues-pages.py
   Appelé automatiquement par l'importer ; utilisable seul : node scripts/langues.mjs */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageListe, LISTES } from "./gabarits-actualites.mjs";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const CODES = ["en", "ar"];
const lire = (f) => fs.readFile(path.join(SITE, f), "utf8");
const existe = (f) => fs.access(path.join(SITE, f)).then(() => true, () => false);

/* ---------- libellés des blocs générés (cartes, listes, chaîne) ---------- */
const MOTS = {
  en: {
    "Lire l'article": "Read the article (in French)",
    "Lire l'enseignement": "Read the teaching (in French)",
    "Voir le document officiel": "View the official document",
    "Qu’Allâh les agrée et sanctifie leur Secret.": "May Allah be pleased with them and sanctify their Secret.",
    "Le Prophète Muhammad": "The Prophet Muhammad",
    "la porte de la cité de la science": "the gate of the city of knowledge",
    "le pur et purifié": "the pure and purified",
    "Rechercher": "Search",
    ">Biographie<": ">Biography (in French)<",
    "Un mot du titre": "A word from the title",
    "Aucun article ne correspond à votre recherche.": "No article matches your search.",
    "Voir plus d'articles": "Show more articles",
    "← Article précédent": "← Previous article",
    "Article suivant →": "Next article →",
  },
  ar: {
    "Lire l'article": "اقرأ المقال (بالفرنسية)",
    "Lire l'enseignement": "اقرأ الدرس (بالفرنسية)",
    "Voir le document officiel": "عرض الوثيقة الرسمية",
    "Qu’Allâh les agrée et sanctifie leur Secret.": "رضي الله عنهم وقدّس أسرارهم.",
    "Le Prophète Muhammad": "النبي محمد",
    "la porte de la cité de la science": "باب مدينة العلم",
    "le pur et purifié": "الطاهر المطهَّر",
    "Rechercher": "بحث",
    ">Biographie<": ">السيرة (بالفرنسية)<",
    "Un mot du titre": "كلمة من العنوان",
    "Aucun article ne correspond à votre recherche.": "لا يوجد مقال يطابق بحثك.",
    "Voir plus d'articles": "عرض مزيد من المقالات",
    "← Article précédent": "→ المقال السابق",
    "Article suivant →": "المقال التالي ←",
  },
};
/* ---------- titres traduits des actualités et enseignements ---------- */
let TITRES = null;
async function chargerTitres() {
  if (TITRES) return TITRES;
  TITRES = { fr: new Map(), tr: {} };
  try {
    TITRES.tr = JSON.parse(await lire("scripts/titres-traduits.json"));
    for (const f of ["actualites", "enseignements"]) {
      if (!(await existe(`src/data/${f}.json`))) continue;
      for (const a of JSON.parse(await lire(`src/data/${f}.json`))) TITRES.fr.set(a.slug, a.titre);
    }
  } catch {}
  return TITRES;
}
const escH = (t = "") => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Remplace les titres français par leur traduction ; ceux sans traduction restent en français, marqués lang="fr" dir="ltr". */
async function traduireTitres(html, code, { sansExtrait = false } = {}) {
  const T = await chargerTitres();
  const i = code === "en" ? 0 : 1;
  let h = html;
  for (const [slug, fr] of T.fr) {
    const tr = T.tr[slug]?.[i];
    const frE = escH(fr);
    if (tr) {
      h = h.split(`>${frE}<`).join(`>${escH(tr)}<`).split(`data-titre="${escH(fr.toLowerCase())}"`).join(`data-titre="${escH(tr.toLowerCase())}"`);
    } else {
      h = h.split(`<h2>${frE}</h2>`).join(`<h2 lang="fr" dir="ltr">${frE}</h2>`).split(`<h3>${frE}</h3>`).join(`<h3 lang="fr" dir="ltr">${frE}</h3>`);
    }
  }
  if (sansExtrait) h = h.replace(/(<div class="actu-txt">[\s\S]*?<\/time>\s*<h2[^>]*>[^<]*<\/h2>)\s*<p>[^<]*<\/p>/g, "$1");
  return h;
}

const LOCALES = { en: "en-GB", ar: "ar-u-ca-gregory-nu-latn" };

/** Adapte un morceau de HTML français généré : chemins (les pages sont dans un sous-dossier), dates, libellés, flèches. */
export function localiser(html, code) {
  let h = html
    .replace(/(href|src)="(actualite-|enseignement-|maitre-|actualites\/|enseignements\/|shaykh\/|media\/)/g, '$1="../$2')
    .replace(/<time datetime="([^"]+)">[^<]*<\/time>/g, (_, iso) => {
      const d = new Date(iso);
      const t = Number.isNaN(+d) ? "" : d.toLocaleDateString(LOCALES[code], { day: "numeric", month: "long", year: "numeric" });
      return `<time datetime="${iso}">${t}</time>`;
    });
  for (const [fr, tr] of Object.entries(MOTS[code])) h = h.split(fr).join(tr);
  // « 12 articles » -> « 12 articles » dans la langue
  h = h.replace(/<p class="actu-total">(\d+) articles?<\/p>/, (_, n) =>
    `<p class="actu-total">${code === "en" ? `${n} article${n > 1 ? "s" : ""}` : `${n} مقالًا`}</p>`);
  if (code === "ar") h = h.replace(/<i>→<\/i>/g, "<i>←</i>");
  return h;
}

/* ---------- cadre d'une page traduite ---------- */
function enTete(html, code) {
  return html.replace('<html lang="fr">', `<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>`);
}

/* ---------- accueil ---------- */
const FORM_EN = [
  ["Prénom", "First name"], ["Nom", "Last name"], ["Ville", "City"], ["Téléphone", "Phone"], ["Adresse e-mail", "E-mail address"],
];
const ACCUEIL = [
  // [français, anglais, arabe]
  ["Shaykh Mohamed Faouzi Al Karkari — guide de la Confrérie Soufie Karkariya, auteur et conférencier. Enseignements, conférences et rencontres.", "Shaykh Mohamed Faouzi Al Karkari — guide of the Karkariya Sufi Order, author and lecturer. Teachings, lectures and gatherings.", "الشيخ محمد فوزي الكركري — مرشد الطريقة الصوفية الكركرية، مؤلِّف ومحاضِر. دروس ومحاضرات ولقاءات."],
  ["Guide de la Confrérie Soufie Karkariya, auteur et conférencier. Enseignements, conférences et rencontres.", "Guide of the Karkariya Sufi Order, author and lecturer. Teachings, lectures and gatherings.", "مرشد الطريقة الصوفية الكركرية، مؤلِّف ومحاضِر. دروس ومحاضرات ولقاءات."],
  ["<title>Shaykh Mohamed Faouzi Al Karkari</title>", "<title>Shaykh Mohamed Faouzi Al Karkari</title>", "<title>الشيخ محمد فوزي الكركري</title>"],
  ['content="Shaykh Mohamed Faouzi Al Karkari" />', 'content="Shaykh Mohamed Faouzi Al Karkari" />', 'content="الشيخ محمد فوزي الكركري" />'],
  ["« Allah est la Lumière des cieux et de la terre »", "“Allah is the Light of the heavens and the earth”", "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ"],
  ['<p class="loader-ref">Coran 24:35</p>', '<p class="loader-ref">Qur’an 24:35</p>', '<p class="loader-ref">سورة النور 24:35</p>'],
  ['alt="Le Shaykh en prière au crépuscule, vêtu de sa muraqqa\'a"', 'alt="The Shaykh in prayer at dusk, wearing his muraqqaʿa"', 'alt="الشيخ في صلاةٍ عند الغروب، لابسًا مرقّعته"'],
  ['<span class="hero-row hero-row--prefix">Shaykh</span>', '<span class="hero-row hero-row--prefix">Shaykh</span>', '<span class="hero-row hero-row--prefix">الشيخ</span>'],
  ['<span class="hero-row">Mohamed Faouzi</span>', '<span class="hero-row">Mohamed Faouzi</span>', '<span class="hero-row">محمد فوزي</span>'],
  ['<span class="hero-row hero-row--gold">AL KARKARI</span>', '<span class="hero-row hero-row--gold">AL KARKARI</span>', '<span class="hero-row hero-row--gold">الكركري</span>'],
  ["Guide spirituel de la Confrérie Soufie Karkariya, Auteur, Conférencier", "Spiritual guide of the Karkariya Sufi Order, Author, Lecturer", "المرشد الروحي للطريقة الصوفية الكركرية، مؤلِّف، محاضِر"],
  ["Découvrir le parcours <span", "Discover the journey <span", "اكتشف المسيرة <span"],
  ['aria-label="Défiler">\n          <span>Défiler</span>', 'aria-label="Scroll">\n          <span>Scroll</span>', 'aria-label="مرّر">\n          <span>مرّر</span>'],
  ['aria-label="Introduction"', 'aria-label="Introduction"', 'aria-label="مقدّمة"'],
  ['<p class="kicker">Une voie de lumière</p>', '<p class="kicker">A path of light</p>', '<p class="kicker">طريقٌ من نور</p>'],
  ["Relier la recherche académique à l'expérience spirituelle vécue. Transmettre une tradition sans la figer. Marcher, rencontrer, enseigner — et faire de chaque rencontre un passage vers la Lumière.", "Linking academic research with lived spiritual experience. Handing on a tradition without freezing it. Walking, meeting, teaching — and making every encounter a passage towards the Light.", "الربط بين البحث الأكاديمي والتجربة الروحية المعيشة. نقل التراث دون تحنيطه. السير واللقاء والتعليم — وجعل كل لقاءٍ عبورًا نحو النور."],
  ['<p class="kicker">Les événements</p>', '<p class="kicker">Events</p>', '<p class="kicker">الفعاليات</p>'],
  ["Rencontres et rendez-vous", "Gatherings and appointments", "لقاءات ومواعيد"],
  ['<p class="events-label">À venir</p>', '<p class="events-label">Upcoming</p>', '<p class="events-label">قريبًا</p>'],
  ["Les prochaines rencontres seront annoncées ici.", "Upcoming gatherings will be announced here.", "ستُعلَن اللقاءات القادمة هنا."],
  ["<span>Être informé</span>", "<span>Stay informed</span>", "<span>ابقَ على اطلاع</span>"],
  ['<p class="kicker">Les enseignements</p>', '<p class="kicker">Teachings</p>', '<p class="kicker">الدروس</p>'],
  ["Ce qui se transmet", "What is handed down", "ما يُتوارَث"],
  ["Des enseignements thématiques sur la pratique, le savoir et le cheminement.", "Thematic teachings on practice, knowledge and the path. (Texts in French.)", "دروس موضوعية في الممارسة والعلم والسلوك. (النصوص بالفرنسية.)"],
  ["<span>Tous les enseignements</span>", "<span>All teachings</span>", "<span>جميع الدروس</span>"],
  ['<p class="kicker">Interventions</p>', '<p class="kicker">Talks</p>', '<p class="kicker">مداخلات</p>'],
  ["Conférences, workshops, rencontres, assises spirituelles", "Lectures, workshops, gatherings, spiritual assemblies", "محاضرات، وورشات عمل، ولقاءات، ومجالس روحية"],
  ['alt="Conférence à la Sorbonne"', 'alt="Lecture at the Sorbonne"', 'alt="محاضرة في السوربون"'],
  ["<span class=\"talk-place\">Paris · France — février 2025</span><h3>IA et paix : quel futur voulons-nous ?</h3><p>Conférence à la Sorbonne, au cœur de l'université parisienne.</p>", "<span class=\"talk-place\">Paris · France — February 2025</span><h3>AI and Peace: what future do we want?</h3><p>A lecture at the Sorbonne, in the heart of the Parisian university.</p>", "<span class=\"talk-place\">باريس · فرنسا — فبراير 2025</span><h3>الذكاء الاصطناعي والسلام: أيّ مستقبل نريد؟</h3><p>محاضرة في السوربون، في قلب الجامعة الباريسية.</p>"],
  ['alt="Assise &amp; conférence à Genève"', 'alt="Gathering &amp; lecture in Geneva"', 'alt="مجلس ومحاضرة في جنيف"'],
  ["<span class=\"talk-place\">Genève · Suisse — mai 2026</span><h3>Assise &amp; conférence à Genève</h3><p>Une journée de transmission : cercle de dhikr, échanges et enseignement.</p>", "<span class=\"talk-place\">Geneva · Switzerland — May 2026</span><h3>Gathering &amp; lecture in Geneva</h3><p>A day of transmission: dhikr circle, exchanges and teaching.</p>", "<span class=\"talk-place\">جنيف · سويسرا — أبريل 2025</span><h3>مجلس ومحاضرة في جنيف</h3><p>يومٌ من التبليغ: حلقة ذكر وحوار وتعليم.</p>"],
  ['alt="Une Voix pour la Paix"', 'alt="A Voice for Peace"', 'alt="صوتٌ من أجل السلام"'],
  ["<span class=\"talk-place\">Paris · France — juin 2025</span><h3>Une Voix pour la Paix</h3><p>Participation à l'édition parisienne de l'événement consacré au dialogue et à la paix.</p>", "<span class=\"talk-place\">Paris · France — June 2025</span><h3>A Voice for Peace</h3><p>Taking part in the Paris edition of the event devoted to dialogue and peace.</p>", "<span class=\"talk-place\">باريس · فرنسا — أبريل 2025</span><h3>صوتٌ من أجل السلام</h3><p>مشاركة في النسخة الباريسية من الحدث المكرَّس للحوار والسلام.</p>"],
  ["<span class=\"talk-place\">États-Unis · Brésil</span><h3>Stanford, Berkeley, Blumenau, Joinville</h3><p>Ateliers et conférences sur la lumière, le langage, l'intelligence et la spiritualité ; rencontres universitaires au Brésil en 2025.</p>", "<span class=\"talk-place\">United States · Brazil</span><h3>Stanford, Berkeley, Blumenau, Joinville</h3><p>Workshops and lectures on light, language, intelligence and spirituality; university meetings in Brazil in 2025.</p>", "<span class=\"talk-place\">الولايات المتحدة · البرازيل</span><h3>ستانفورد، بيركلي، بلومينو، جوانفيلي</h3><p>ورشات ومحاضرات حول النور واللغة والذكاء والروحانية؛ ولقاءات جامعية في البرازيل سنة 2025.</p>"],
  ['<span class="talk-cta">Voir la vidéo <i>→</i></span>', '<span class="talk-cta">Watch the video <i>→</i></span>', '<span class="talk-cta">شاهد الفيديو <i>←</i></span>'],
  ["<span>Toutes les vidéos</span>", "<span>All videos</span>", "<span>جميع المقاطع</span>"],
  ['<p class="kicker">Actualités</p>', '<p class="kicker">News</p>', '<p class="kicker">الأخبار</p>'],
  ["Articles &amp; textes récents", "Recent articles &amp; texts", "أحدث المقالات والنصوص"],
  ["<span>Toutes les actualités</span>", "<span>All news</span>", "<span>جميع الأخبار</span>"],
  ["<span>Lire les publications sur Facebook</span>", "<span>Read the posts on Facebook</span>", "<span>اقرأ المنشورات على فيسبوك</span>"],
  ['<p class="outro-fr" data-split>« Allâh est la Lumière des cieux et de la terre. »</p>', '<p class="outro-fr" data-split>“Allah is the Light of the heavens and the earth.”</p>', '<p class="outro-fr" data-split>«الله نور السماوات والأرض.»</p>'],
  ["Coran, sourate an-Nûr, 24:35", "Qur’an, Sūrat an-Nūr, 24:35", "القرآن الكريم، سورة النور، الآية 35"],
  ['<p class="eco-k">Suivre le Shaykh</p>', '<p class="eco-k">Follow the Shaykh</p>', '<p class="eco-k">تابِع الشيخ</p>'],
  ["<span>Page Facebook du Shaykh</span>", "<span>The Shaykh's Facebook page</span>", "<span>صفحة الشيخ على فيسبوك</span>"],
  // formulaire
  ['aria-label="Fermer">×', 'aria-label="Close">×', 'aria-label="إغلاق">×'],
  ['<p class="kicker">Être informé</p>\n      <h2 class="modal-title" id="ins-title">Prochaines rencontres</h2>', '<p class="kicker">Stay informed</p>\n      <h2 class="modal-title" id="ins-title">Upcoming gatherings</h2>', '<p class="kicker">ابقَ على اطلاع</p>\n      <h2 class="modal-title" id="ins-title">اللقاءات القادمة</h2>'],
  ["Laissez vos coordonnées : vous serez prévenu(e) des prochaines rencontres du Shaykh.", "Leave your details and you will be notified of the Shaykh's upcoming gatherings.", "اترك بياناتك وسنُعلمك بلقاءات الشيخ القادمة."],
  ["Ne pas remplir", "Leave empty", "اتركه فارغًا"],
  ["<span>Prénom</span>", "<span>First name</span>", "<span>الاسم الشخصي</span>"],
  ["<span>Nom</span>", "<span>Last name</span>", "<span>الاسم العائلي</span>"],
  ["<span>Ville</span>", "<span>City</span>", "<span>المدينة</span>"],
  ["<span>Téléphone</span>", "<span>Phone</span>", "<span>الهاتف</span>"],
  ["<span>Adresse e-mail</span>", "<span>E-mail address</span>", "<span>البريد الإلكتروني</span>"],
  ["J'accepte que ces informations soient utilisées pour m'informer des rencontres du Shaykh. Je peux demander leur suppression à tout moment.", "I agree to these details being used to inform me of the Shaykh's gatherings. I can ask for them to be deleted at any time.", "أوافق على استعمال هذه المعلومات لإعلامي بلقاءات الشيخ، ويمكنني طلب حذفها في أي وقت."],
  ["<span>Envoyer</span>", "<span>Send</span>", "<span>إرسال</span>"],
  ['<p class="kicker">Merci</p>', '<p class="kicker">Thank you</p>', '<p class="kicker">شكرًا</p>'],
  ["Vos coordonnées sont bien enregistrées. Vous serez informé(e) des prochaines rencontres.", "Your details have been saved. You will be informed of upcoming gatherings.", "تم حفظ بياناتك، وستصلك أخبار اللقاءات القادمة."],
  ["<span>Fermer</span>", "<span>Close</span>", "<span>إغلاق</span>"],
];

async function accueil() {
  let fr = await lire("index.html");
  for (const code of CODES) {
    const i = code === "en" ? 1 : 2;
    let h = fr;
    for (const l of ACCUEIL) {
      if (!h.includes(l[0])) {
        console.warn(`[langues] accueil ${code} : segment introuvable « ${l[0].slice(0, 50)} »`);
        continue;
      }
      h = h.split(l[0]).join(l[i]);
    }
    h = enTete(h, code);
    if (code === "ar") h = h.replace(/<i>→<\/i>/g, "<i>←</i>").replace(/>→</g, ">←<");
    // liens vers les articles (français) et images : un dossier plus haut
    h = h.replace(/(<!--(actualites|enseignements):debut-->)([\s\S]*?)(<!--\2:fin-->)/g, (_, a, _n, bloc, z) => a + localiser(bloc, code) + z);
    h = await traduireTitres(h, code);
    h = h.replace(/\b(href|src)="(?!https?:|\/|#|mailto:|\.\.\/)(?=[\w-]+\/)/g, (m) => m); // chemins relatifs à un dossier : traités par localiser()
    await fs.mkdir(path.join(SITE, code), { recursive: true });
    await fs.writeFile(path.join(SITE, code, "index.html"), h);
  }
}

/* ---------- listes d'articles ---------- */
const LISTES_TR = {
  actualites: {
    en: { kicker: "News", titre: "News", lede: "Gatherings, lectures, publications: the news of the Shaykh and his work. (Articles are published in French.)", description: "News of Shaykh Mohamed Faouzi Al Karkari: gatherings, lectures, publications.", vide: "Articles will soon be published here." },
    ar: { kicker: "الأخبار", titre: "الأخبار", lede: "لقاءات ومحاضرات ومنشورات: أخبار الشيخ وعمله. (المقالات منشورة بالفرنسية.)", description: "أخبار الشيخ محمد فوزي الكركري: لقاءات ومحاضرات ومنشورات.", vide: "ستُنشر المقالات هنا قريبًا." },
  },
  enseignements: {
    en: { kicker: "Teachings", titre: "Teachings", lede: "The moudhakara: the Shaykh's teachings on practice, knowledge and the path. (Texts in French.)", description: "The teachings of Shaykh Mohamed Faouzi Al Karkari.", vide: "Teachings will soon be published here." },
    ar: { kicker: "الدروس", titre: "الدروس", lede: "المذاكرات: دروس الشيخ في الممارسة والعلم والسلوك. (النصوص بالفرنسية.)", description: "دروس الشيخ محمد فوزي الكركري.", vide: "ستُنشر الدروس هنا قريبًا." },
  },
};

async function listes() {
  const defs = [
    ["actualites", "src/data/actualites.json"],
    ["enseignements", "src/data/enseignements.json"],
  ];
  for (const [cle, json] of defs) {
    if (!(await existe(json))) continue;
    const articles = JSON.parse(await lire(json));
    for (const code of CODES) {
      const fr = LISTES[cle];
      const tr = LISTES_TR[cle][code];
      let h = pageListe(articles, { ...fr, ...tr, code });
      h = localiser(h, code);
      h = await traduireTitres(h, code, { sansExtrait: true });
      h = enTete(h, code).replace(/<title>[^<]*<\/title>/, `<title>${tr.titre} — ${code === "ar" ? "الشيخ محمد فوزي الكركري" : "Shaykh Mohamed Faouzi Al Karkari"}</title>`);
      await fs.mkdir(path.join(SITE, code), { recursive: true });
      await fs.writeFile(path.join(SITE, code, `${cle}.html`), h);
    }
  }
}

/* ---------- chaîne de transmission : blocs repris du français ---------- */
const CHAINE_TR = {
  en: {
    title: "His chain of transmission — Shaykh Mohamed Faouzi Al Karkari",
    desc: "The initiatic chain (silsila) of the Karkariya Tariqa and the masters who came before the Shaykh.",
    kicker: "The Shaykh", h1: "His chain of transmission",
    lede: "The initiatic chain (silsila) of the Karkariya Tariqa: from master to master, all the way to the Prophet Muhammad ﷺ.",
    suite: "His noble lineage", arrow: "→",
  },
  ar: {
    title: "سلسلة إسناده — الشيخ محمد فوزي الكركري",
    desc: "السلسلة الصوفية للطريقة الكركرية والمشايخ الذين سبقوا الشيخ.",
    kicker: "الشيخ", h1: "سلسلة إسناده",
    lede: "السلسلة الصوفية للطريقة الكركرية: من شيخٍ إلى شيخ، حتى النبي محمد ﷺ.",
    suite: "نسبه الشريف", arrow: "←",
  },
};

async function chaine() {
  const fr = await lire("chaine-de-transmission.html");
  const marque = (nom) => new RegExp(`<!--shaykh:${nom}:debut-->[\\s\\S]*?<!--shaykh:${nom}:fin-->`);
  const tete = fr.slice(0, fr.indexOf('    <section class="silsila-page"'));
  for (const code of CODES) {
    const T = CHAINE_TR[code];
    let h = fr;
    for (const nom of ["silsila-officiel", "silsila"]) {
      const bloc = fr.match(marque(nom));
      if (bloc) h = h.replace(marque(nom), () => localiser(bloc[0], code));
    }
    h = enTete(h, code)
      .replace(/<title>[^<]*<\/title>/, `<title>${T.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${T.desc}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${T.title}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${T.desc}`)
      .replace(/<p class="kicker">Le Shaykh<\/p>/, `<p class="kicker">${T.kicker}</p>`)
      .replace(/(<h1 class="h2" data-split>)[^<]*/, `$1${T.h1}`)
      .replace(/(<p class="section-lede" data-reveal>)[^<]*/, `$1${T.lede}`)
      .replace(/<span>Sa lignée chérifienne<\/span><i>→<\/i>/, `<span>${T.suite}</span><i>${T.arrow}</i>`);
    void tete;
    await fs.mkdir(path.join(SITE, code), { recursive: true });
    await fs.writeFile(path.join(SITE, code, "chaine-de-transmission.html"), h);
  }
}

export async function genererLangues() {
  await accueil();
  await listes();
  await chaine();
  console.log("[langues] en/ et ar/ mis à jour");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await genererLangues();

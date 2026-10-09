#!/usr/bin/env node
/* Génère lignee-cherifienne.html à partir de scripts/lignee-cherifienne.json
   (liste ordonnée : du Shaykh jusqu'à ʿAlî et Fâtima, puis le Prophète ﷺ est ajouté).
   Utilisation : npm run lignee */
import fs from "node:fs/promises";
import path from "node:path";
import { esc as echapper } from "./gabarits-actualites.mjs";
import { nomMaillon } from "./noms-i18n.mjs";
const esc = (t = "") => echapper(String(t).normalize("NFD").replace(/\u0302/g, "").normalize("NFC").replace(/\bAbou\b/g, "Abu"));

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const liste = JSON.parse(await fs.readFile(path.join(SITE, "scripts", "lignee-cherifienne.json"), "utf8"));
const total = liste.length + 1;

// textes par langue (les noms restent en translittération latine)
const TEXTES = {
  fr: { dir: "", titre: "Sa lignée chérifienne", desc: "La noble lignée chérifienne du Shaykh Mohamed Faouzi Al Karkari, jusqu'au Prophète Muhammad ﷺ.", kicker: "Le Shaykh",
    lede: "Fils du noble chérifien Sidi Moulay Tayeb al-Karkari al-Idrissi al-Hassani, le Shaykh descend de la lignée idrisside : par l'imam ʿAli et Fatima az-Zahra’, elle remonte au Prophète Muhammad ﷺ.",
    prophete: "Le Prophète Muhammad", bio: "Biographie", suite: "Sa chaîne de transmission", fleche: "→", traduire: (x) => x },
  en: { dir: "en/", titre: "His noble lineage", desc: "The noble sharifian lineage of Shaykh Mohamed Faouzi Al Karkari, all the way back to the Prophet Muhammad ﷺ.", kicker: "The Shaykh",
    lede: "Son of the noble sharif Sidi Moulay Tayeb al-Karkari al-Idrissi al-Hassani, the Shaykh descends from the Idrisid line: through Imam ʿAli and Fatima az-Zahra’, it goes back to the Prophet Muhammad ﷺ.",
    prophete: "The Prophet Muhammad", bio: "Biography (in French)", bioLocale: "Biography", suite: "His chain of transmission", fleche: "→",
    traduire: (x) => ({
      "né en 1974 à Temsamane, dans le Rif": "born in 1974 in Temsamane, in the Rif",
      "maître spirituel, fondateur de la zawiya de Tamsaman": "spiritual master, founder of the Tamsaman zawiya",
      "maître spirituel de la montagne de Karkar, rattaché à la voie darqawie": "spiritual master of the Karkar mountain, attached to the Darqawi way",
      "ʿAlî, que Dieu anoblisse son visage · Fâtima-Zahra, fille du Prophète Muhammad ﷺ": "ʿAli, may God honour his face · Fatima az-Zahra’, daughter of the Prophet Muhammad ﷺ",
      "De la famille du Prophète, la lignée remonte à l'imam ʿAlî et à Fâtima": "From the family of the Prophet, the lineage goes back to Imam ʿAli and Fatima",
    })[x] || x },
  ar: { dir: "ar/", titre: "نسبه الشريف", desc: "النسب الشريف للشيخ محمد فوزي الكركري، وصولًا إلى النبي محمد ﷺ.", kicker: "الشيخ",
    lede: "الشيخ ابن الشريف سيدي مولاي الطيب الكركري الإدريسي الحسني، وينحدر من السلالة الإدريسية التي يتصل نسبها، عبر الإمام علي وفاطمة الزهراء، بالنبي محمد ﷺ.",
    prophete: "النبي محمد ﷺ", bio: "السيرة (بالفرنسية)", bioLocale: "السيرة", suite: "سلسلة إسناده", fleche: "←",
    traduire: (x) => ({
      "né en 1974 à Temsamane, dans le Rif": "وُلد سنة 1974م في تمسمان بالريف",
      "maître spirituel, fondateur de la zawiya de Tamsaman": "معلّم روحي، مؤسس زاوية تمسمان",
      "maître spirituel de la montagne de Karkar, rattaché à la voie darqawie": "معلّم روحي من جبل كركر، منتسب إلى الطريقة الدرقاوية",
      "ʿAlî, que Dieu anoblisse son visage · Fâtima-Zahra, fille du Prophète Muhammad ﷺ": "علي، كرّم الله وجهه · فاطمة الزهراء، بنت النبي محمد ﷺ",
      "De la famille du Prophète, la lignée remonte à l'imam ʿAlî et à Fâtima": "من آل بيت النبي، يمتدّ النسب إلى الإمام علي وفاطمة",
    })[x] || x },
};

for (const [code, T] of Object.entries(TEXTES)) {
  const items = liste
    .map((m, i) => {
      const pont = m.pont ? `        <li class="maillon maillon--pont" data-n="${i}" aria-hidden="true"><span class="maillon-point"></span><p>${esc(T.traduire(m.pont))}</p></li>\n` : "";
      return `${pont}        <li class="maillon${i === 0 ? " maillon--shaykh" : ""}${m.bio ? " maillon--lien" : ""}" data-n="${i + 1}">
          <span class="maillon-point" aria-hidden="true"></span>
          <div class="maillon-carte">
            <span class="maillon-rang">${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(nomMaillon(m.nom, code))}</h3>
            ${m.detail ? `<p class="maillon-invoc">${esc(T.traduire(m.detail))}</p>` : ""}
            ${m.bio ? `<a class="maillon-bio" href="${T.dir && !m.bio.startsWith("qui-est-le-shaykh") ? "../" : ""}${m.bio}" aria-label="${esc(m.bio.startsWith("qui-est-le-shaykh") ? T.bioLocale || T.bio : T.bio)} : ${esc(nomMaillon(m.nom, code))}"><span>${esc(m.bio.startsWith("qui-est-le-shaykh") ? T.bioLocale || T.bio : T.bio)}</span><i>${T.fleche}</i></a>` : ""}
          </div>
        </li>
`;
    })
    .join("");

  // l'en-tête (méta, menus) vient de la page « chaîne de transmission » de la même langue
  const modele = await fs.readFile(path.join(SITE, T.dir, "chaine-de-transmission.html"), "utf8");
  const tete = modele
    .slice(0, modele.indexOf('    <section class="silsila-page"'))
    .replace(/<title>[^<]*<\/title>/, `<title>${T.titre} — ${code === "ar" ? "الشيخ محمد فوزي الكركري" : "Shaykh Mohamed Faouzi Al Karkari"}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(T.desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${T.titre}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(T.desc)}`);

  const page = `${tete}    <section class="silsila-page silsila-page--lignee" id="silsila-page">
      <header class="silsila-tete">
        <p class="kicker">${T.kicker}</p>
        <h1 class="h2" data-split>${T.titre}</h1>
        <p class="section-lede" data-reveal>${T.lede}</p>
      </header>
      <div class="silsila-fil" aria-hidden="true"><i></i></div>
      <ol class="silsila" data-total="${total}">
${items}        <li class="maillon maillon--prophete" data-n="${total}">
          <span class="maillon-point" aria-hidden="true"></span>
          <div class="maillon-carte">
            <span class="prophete-halo" aria-hidden="true"></span>
            <span class="prophete-ar" lang="ar" dir="rtl">محمد ﷺ</span>
            <h3>${T.prophete}</h3>
          </div>
        </li>
      </ol>
      <p class="silsila-compteur" aria-live="polite"><b>1</b> / <span>${total}</span></p>
      <div class="center shaykh-suite"><a class="btn-glass btn-glass--dark" href="chaine-de-transmission.html"><span>${T.suite}</span><i>${T.fleche}</i></a></div>
    </section>

  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
  await fs.mkdir(path.join(SITE, T.dir || "."), { recursive: true });
  await fs.writeFile(path.join(SITE, T.dir, "lignee-cherifienne.html"), page);
}
console.log(`[lignée] ${liste.length} générations + le Prophète (fr, en, ar)`);

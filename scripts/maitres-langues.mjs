/* Pages de biographie des maîtres en anglais et en arabe : en/maitre-<slug>.html et ar/maitre-<slug>.html.
   Textes : scripts/maitres-i18n/en.mjs et ar.mjs (même structure que les données françaises).
   Utilisation : node scripts/maitres-langues.mjs (appelé aussi par maitres.mjs). */
import fs from "node:fs/promises";
import path from "node:path";
import { MAITRES } from "./maitres-data.mjs";
import { EN } from "./maitres-i18n/en.mjs";
import { AR } from "./maitres-i18n/ar.mjs";
import { esc } from "./gabarits-actualites.mjs";
import { nomMaillon } from "./noms-i18n.mjs";
import { livrePromo } from "./livre-promo.mjs";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const amp = (t = "") => String(t).replace(/&(?!amp;|lt;|gt;|quot;)/g, "&amp;");

const L = {
  en: { dir: "en", lang: "en", rtl: false, site: "Shaykh Mohamed Faouzi Al Karkari", data: EN,
    kicker: { lignee: "Sharifian lineage", chaine: "Chain of transmission" },
    retour: { lignee: ["lignee-cherifienne.html", "← His sharifian lineage"], chaine: ["chaine-de-transmission.html", "← His chain of transmission"] }, fleche: "→" },
  ar: { dir: "ar", lang: "ar", rtl: true, site: "الشيخ محمد فوزي الكركري", data: AR,
    kicker: { lignee: "النسب الشريف", chaine: "سلسلة الإسناد" },
    retour: { lignee: ["lignee-cherifienne.html", "نسبه الشريف →"], chaine: ["chaine-de-transmission.html", "سلسلة إسناده →"] }, fleche: "←" },
};

function page(code, m, T) {
  const t = T.data[m.slug];
  const rub = m.rubrique === "lignee" ? "lignee" : "chaine";
  const nom = code === "ar" ? nomMaillon(m.cle || m.nom, "ar") : m.nom;
  const titre = `${nom} — ${T.site}`;
  const desc = amp(t.intro).replace(/<[^>]+>/g, "").slice(0, 200);
  const corps = t.sections.map(([h, ps]) => `        <h3>${esc(h)}</h3>\n${ps.map((p) => (p.startsWith("<figure") ? `        ${p}` : `        <p>${amp(p)}</p>`)).join("\n")}`).join("\n");
  const [href, lib] = T.retour[rub];
  const voir = t.voir && m.voir ? `<a class="btn-glass btn-glass--dark" href="maitre-${m.voir[0]}.html"><span>${esc(t.voir)}</span><i>${T.fleche}</i></a> ` : "";
  return `<!doctype html>
<html lang="${T.lang}"${T.rtl ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(titre)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:title" content="${esc(titre)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="/media/transmission-zaouia.webp" />
</head>
<body data-page="shaykh">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="shaykh-texte maitre">
      <div class="section-head">
        <p class="kicker">${T.kicker[rub]}</p>
        <h1 class="h2" data-split>${esc(nom)}</h1>
        <p class="maitre-sous" data-reveal>${esc(t.sous)}</p>
      </div>
      <div class="actu-corps">
        <p class="maitre-intro">${amp(t.intro)}</p>
${corps}
${m.livre ? livrePromo(m.livre, code) + "\n" : ""}      </div>
      <div class="center shaykh-suite">${voir}<a class="btn-glass btn-glass--dark" href="${href}"><span>${lib}</span></a></div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
}

export async function genererMaitresLangues() {
  let n = 0;
  for (const T of Object.values(L)) {
    await fs.mkdir(path.join(SITE, T.dir), { recursive: true });
    for (const m of MAITRES) {
      if (!T.data[m.slug]) continue;
      await fs.writeFile(path.join(SITE, T.dir, `maitre-${m.slug}.html`), page(T.lang, m, T));
      n++;
    }
  }
  console.log(`[maîtres] ${n} biographies en anglais et en arabe`);
}

import { fileURLToPath } from "node:url";
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await genererMaitresLangues();

#!/usr/bin/env node
/* Rubrique « Actualités » : une page d'accueil à deux cartes (fr, en/, ar/)
     - actualites.html            : la porte d'entrée (cartes « Prochainement » et « Actualités passées »)
     - actualites-a-venir.html    : les événements à venir, lus dans scripts/a-venir.json
     - actualites-passees.html    : tous les articles (générée par scripts/humanitaire.mjs et scripts/langues.mjs)
   Pour annoncer un événement : ajouter une entrée dans scripts/a-venir.json (modèle : l'entrée existante), puis  node scripts/actualites-hub.mjs
   Un événement dont la date de fin est passée n'est plus affiché (il n'est pas supprimé du fichier). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc } from "./gabarits-actualites.mjs";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const T = {
  fr: { dir: "", nom: "Shaykh Mohamed Faouzi Al Karkari", kicker: "Actualités", h1: "Actualités", lede: "Ce qui vient, et ce qui s'est passé : les prochaines rencontres du Shaykh et de la Karkariya, puis toutes les actualités passées.", titre: "Actualités", desc: "Les actualités du Shaykh Mohamed Faouzi Al Karkari : événements à venir et actualités passées.", go: "Découvrir", fleche: "→",
    c1: { h: "Prochainement", p: "Les retraites, rencontres et événements à venir." }, c2: { h: "Actualités passées", p: "Conférences, visites, rencontres : toutes les actualités déjà publiées." },
    av: { kicker: "Actualités", h1: "Prochainement", lede: "Les retraites spirituelles, rencontres et événements à venir.", titre: "Prochainement", desc: "Les événements à venir autour du Shaykh Mohamed Faouzi Al Karkari : retraites spirituelles et rencontres.", aucun: "De nouveaux événements seront annoncés ici très prochainement. Inscrivez-vous pour être informé.", informer: "Être informé", passees: "Voir les actualités passées", retour: "← Toutes les actualités", organise: "Organisé par", lieu: "Lieu", dates: "Dates", tag: "À venir" } },
  en: { dir: "en/", nom: "Shaykh Mohamed Faouzi Al Karkari", kicker: "News", h1: "News", lede: "What is coming, and what has happened: the upcoming gatherings of the Shaykh and the Karkariya, then all past news.", titre: "News", desc: "News of Shaykh Mohamed Faouzi Al Karkari: upcoming events and past news.", go: "Discover", fleche: "→",
    c1: { h: "Coming soon", p: "Upcoming retreats, gatherings and events." }, c2: { h: "Past news", p: "Lectures, visits, gatherings: all the news already published." },
    av: { kicker: "News", h1: "Coming soon", lede: "Upcoming spiritual retreats, gatherings and events.", titre: "Coming soon", desc: "Upcoming events around Shaykh Mohamed Faouzi Al Karkari: spiritual retreats and gatherings.", aucun: "New events will be announced here very soon. Sign up to be informed.", informer: "Stay informed", passees: "See past news", retour: "← All news", organise: "Organised by", lieu: "Place", dates: "Dates", tag: "Upcoming" } },
  ar: { dir: "ar/", nom: "الشيخ محمد فوزي الكركري", kicker: "الأخبار", h1: "الأخبار", lede: "ما هو آتٍ وما مضى: اللقاءات القادمة للشيخ وللكركرية، ثم جميع الأخبار السابقة.", titre: "الأخبار", desc: "أخبار الشيخ محمد فوزي الكركري: الفعاليات القادمة والأخبار السابقة.", go: "اكتشف", fleche: "←",
    c1: { h: "قريبًا", p: "الخلوات واللقاءات والفعاليات القادمة." }, c2: { h: "الأخبار السابقة", p: "محاضرات وزيارات ولقاءات: جميع الأخبار المنشورة." },
    av: { kicker: "الأخبار", h1: "قريبًا", lede: "الخلوات الروحية واللقاءات والفعاليات القادمة.", titre: "قريبًا", desc: "الفعاليات القادمة حول الشيخ محمد فوزي الكركري: خلوات روحية ولقاءات.", aucun: "سيُعلَن عن فعاليات جديدة هنا قريبًا جدًّا. سجّلوا لتبقوا على اطلاع.", informer: "ابقَ على اطلاع", passees: "عرض الأخبار السابقة", retour: "→ كل الأخبار", organise: "تنظيم", lieu: "المكان", dates: "التواريخ", tag: "قريبًا" } },
};
const enveloppe = (code, { titre, desc, page, main, image, extra = "" }) => `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(titre)} — ${esc(T[code].nom)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:title" content="${esc(titre)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${esc(image || "/media/partage-shaykh.jpg")}" />${extra}
</head>
<body data-page="${page}">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
${main}  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;

const aujourdhui = () => new Date().toISOString().slice(0, 10);
const evenements = () => JSON.parse(fs.readFileSync(path.join(SITE, "scripts/a-venir.json"), "utf8")).filter((e) => e.fin >= aujourdhui()).sort((a, b) => a.debut.localeCompare(b.debut));

function carteEvenement(e, code) {
  const t = T[code].av, L = (o) => o[code] || o.fr;
  const boutons = (e.boutons || []).map((b, i) => `<a class="${i === 0 ? "btn-or" : "btn-glass btn-glass--dark"}" href="${esc(b.url)}" ${/^https?:/.test(b.url) ? 'target="_blank" rel="noopener"' : ""}><span>${esc(L(b.label))}</span><i>${T[code].fleche === "←" ? "↗" : "↗"}</i></a>`).join("\n            ");
  return `      <article class="avenir-carte" id="${esc(e.id)}" data-reveal>
        <figure class="avenir-affiche"><img src="${esc(e.image)}" alt="${esc(L(e.imageAlt))}" loading="lazy" decoding="async" /></figure>
        <div class="avenir-txt">
          <p class="avenir-tag">${esc(t.tag)} · ${esc(L(e.type))}</p>
          <h2>${esc(L(e.titre))}</h2>
          <dl class="avenir-infos">
            <div><dt>${esc(t.dates)}</dt><dd>${esc(L(e.dates))}</dd></div>
            <div><dt>${esc(t.lieu)}</dt><dd>${esc(L(e.lieu))}</dd></div>
            <div><dt>${esc(t.organise)}</dt><dd>${esc(L(e.organisateur))}${e.devise ? ` — <em>${esc(L(e.devise))}</em>` : ""}</dd></div>
          </dl>
          <p>${esc(L(e.intro))}</p>
          <ul class="avenir-liste">${L(e.programme).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          ${e.inclus ? `<h3>${esc(L(e.inclusTitre))}</h3>\n          <ul class="avenir-liste avenir-liste--inclus">${L(e.inclus).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
          ${e.places ? `<p class="avenir-alerte"><strong>${esc(L(e.places))}</strong></p>` : ""}
          ${e.echeance ? `<p class="avenir-note">${esc(L(e.echeance))}</p>` : ""}
          ${e.questions ? `<p>${esc(L(e.questions))}</p>` : ""}
          ${e.conclusion ? `<p class="avenir-fin">${esc(L(e.conclusion))}</p>` : ""}
          <div class="avenir-actions">
            ${boutons}
          </div>
          ${e.galerie?.length ? `<ul class="avenir-galerie">${e.galerie.map((g) => `<li><img src="${esc(g.src)}" alt="${esc(L(g.alt))}" loading="lazy" decoding="async" /></li>`).join("")}</ul>` : ""}
        </div>
      </article>
`;
}

function jsonLd(e) {
  return `\n  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Event", name: `${e.titre.en} — ${e.lieu.en}`, startDate: e.debut, endDate: e.fin, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", location: { "@type": "Place", name: e.lieu.en }, image: e.image, description: e.intro.en, organizer: { "@type": "Organization", name: e.organisateur.en } }).replace(/</g, "\\u003c")}</script>`;
}

export function genererHub() {
  const evs = evenements();
  for (const code of ["fr", "en", "ar"]) {
    const t = T[code], dir = path.join(SITE, t.dir);
    if (t.dir) fs.mkdirSync(dir, { recursive: true });
    const imgAvenir = "/media/hub-prochainement.webp";
    const hub = `    <section class="hub">
      <div class="section-head">
        <p class="kicker">${t.kicker}</p>
        <h1 class="h2" data-split>${t.h1}</h1>
        <p class="section-lede" data-reveal>${t.lede}</p>
      </div>
      <div class="hub-cards hub-cards--2">
        <a class="hub-card" href="actualites-a-venir.html" data-reveal>
          <img src="${imgAvenir}" alt="" loading="lazy" style="object-position:35% 50%" />
          <span class="hub-num">01</span>
          <div class="hub-txt">
            <h2>${t.c1.h}</h2>
            <p>${t.c1.p}</p>
            <span class="hub-go">${t.go} <i>${t.fleche}</i></span>
          </div>
        </a>
        <a class="hub-card" href="actualites-passees.html" data-reveal>
          <img src="/media/hero-shaykh.webp" alt="" loading="lazy" style="object-position:60% 30%" />
          <span class="hub-num">02</span>
          <div class="hub-txt">
            <h2>${t.c2.h}</h2>
            <p>${t.c2.p}</p>
            <span class="hub-go">${t.go} <i>${t.fleche}</i></span>
          </div>
        </a>
      </div>
    </section>
`;
    fs.writeFileSync(path.join(dir, "actualites.html"), enveloppe(code, { titre: t.titre, desc: t.desc, page: "actualites", main: hub }));
    const a = t.av;
    const corps = evs.length
      ? `    <section class="avenir">\n${evs.map((e) => carteEvenement(e, code)).join("")}    </section>\n`
      : `    <section class="avenir"><p class="actu-vide">${a.aucun}</p></section>\n`;
    const main = `    <section class="hub avenir-tete">
      <div class="section-head">
        <p class="kicker">${a.kicker}</p>
        <h1 class="h2" data-split>${a.h1}</h1>
        <p class="section-lede" data-reveal>${a.lede}</p>
      </div>
    </section>
${corps}    <div class="center avenir-suite"><a class="btn-glass btn-glass--dark" href="actualites-passees.html"><span>${a.passees}</span><i>${t.fleche}</i></a></div>
`;
    fs.writeFileSync(path.join(dir, "actualites-a-venir.html"), enveloppe(code, { titre: a.titre, desc: a.desc, page: "actualites-a-venir", main, image: evs[0]?.image, extra: evs.map(jsonLd).join("") }));
  }
  return evs.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`[actualites-hub] ${genererHub()} événement(s) à venir ; actualites.html + actualites-a-venir.html ×3`);

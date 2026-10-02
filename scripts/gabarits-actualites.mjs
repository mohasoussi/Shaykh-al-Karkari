/* Gabarits HTML des pages d'actualités (liste, article, cartes de l'accueil).
   Utilisés par scripts/importer-actualites.mjs — rien à modifier ici pour ajouter des articles. */

export const esc = (t = "") =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dateLongue = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(+d) ? "" : d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

function enveloppe({ titre, description, page, main, image }) {
  return `<!doctype html>
<html lang="fr">
<head>
  <!--@include head-->
  <title>${esc(titre)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta property="og:title" content="${esc(titre)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(image || "/media/portrait-fes.webp")}" />
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
}

function carte(a, prefixe = "actualite") {
  const img = a.vignette
    ? `<figure class="actu-fig"><img src="${esc(a.vignette)}" alt="${esc(a.imageAlt || "")}" loading="lazy" decoding="async" /></figure>`
    : `<figure class="actu-fig actu-fig--vide" aria-hidden="true"></figure>`;
  return `        <a class="actu-card" href="${prefixe}-${esc(a.slug)}.html" data-titre="${esc(a.titre.toLowerCase())}">
          ${img}
          <div class="actu-txt">
            <time datetime="${esc(a.date)}">${esc(dateLongue(a.date))}</time>
            <h2>${esc(a.titre)}</h2>
            ${a.extrait ? `<p>${esc(a.extrait)}</p>` : ""}
            <span class="actu-lire">Lire l'article <i>→</i></span>
          </div>
        </a>
`;
}

export const LISTES = {
  actualites: { page: "actualites", prefixe: "actualite", kicker: "Actualités", titre: "Actualités", lede: "Rencontres, conférences, publications : l'actualité du Shaykh et de son action.", description: "L'actualité du Shaykh Mohamed Faouzi Al Karkari : rencontres, conférences, publications.", vide: "Les articles seront bientôt publiés ici." },
  enseignements: { page: "enseignements", prefixe: "enseignement", kicker: "Les enseignements", titre: "Les enseignements", lede: "Les moudhakara : enseignements du Shaykh sur la pratique, le savoir et le cheminement.", description: "Les enseignements du Shaykh Mohamed Faouzi Al Karkari.", vide: "Les enseignements seront bientôt publiés ici." },
};

export function pageListe(articles, l = LISTES.actualites) {
  const contenu = articles.length
    ? `      <div class="actu-outils">
        <label class="field actu-recherche"><span>Rechercher</span><input type="search" id="actu-q" placeholder="Un mot du titre" autocomplete="off" /></label>
        <p class="actu-total">${articles.length} article${articles.length > 1 ? "s" : ""}</p>
      </div>
      <div class="actu-grid" id="actu-grid">
${articles.map((a) => carte(a, l.prefixe)).join("")}      </div>
      <p class="actu-aucun" hidden>Aucun article ne correspond à votre recherche.</p>
      <div class="center actu-suite"><button class="btn-glass btn-glass--dark" type="button" id="actu-more" hidden><span>Voir plus d'articles</span><i>↓</i></button></div>
`
    : `      <p class="actu-vide">${l.vide}</p>
`;
  const main = `    <section class="actu-page">
      <div class="section-head">
        <p class="kicker">${l.kicker}</p>
        <h1 class="h2" data-split>${l.titre}</h1>
        <p class="section-lede" data-reveal>${l.lede}</p>
      </div>
${contenu}    </section>
`;
  return enveloppe({
    titre: `${l.titre} — Shaykh Mohamed Faouzi Al Karkari`,
    description: l.description,
    page: l.page,
    main,
  });
}

export const TYPES = {
  actualite: { prefixe: "actualite", racineImg: "actualites", kicker: "Actualités", retour: "actualites.html", retourTexte: "← Toutes les actualités", page: "actualite", titreNav: "Autres articles" },
  enseignement: { prefixe: "enseignement", racineImg: "enseignements", kicker: "Enseignements", retour: "enseignements.html", retourTexte: "← Tous les enseignements", page: "enseignement", titreNav: "Autres enseignements" },
};

export function pageArticle(a, precedent, suivant, t = TYPES.actualite) {
  const nav = (x, sens) =>
    x
      ? `<a class="actu-voisin actu-voisin--${sens}" href="${t.prefixe}-${esc(x.slug)}.html"><span>${sens === "prec" ? "← Article précédent" : "Article suivant →"}</span><strong>${esc(x.titre)}</strong></a>`
      : "<span></span>";
  const main = `    <article class="actu-article">
      <a class="actu-retour" href="${t.retour}">${t.retourTexte}</a>
      <header class="actu-entete">
        <p class="kicker">${t.kicker}</p>
        <time datetime="${esc(a.date)}">${esc(dateLongue(a.date))}</time>
        <h1>${esc(a.titre)}</h1>
      </header>
      ${a.couverture ? `<figure class="actu-couverture"><img src="${esc(a.couverture)}" alt="${esc(a.imageAlt || "")}" decoding="async" /></figure>` : ""}
      <div class="actu-corps">
${a.html}
      </div>
      <nav class="actu-voisins" aria-label="${t.titreNav}">
        ${nav(precedent, "prec")}
        ${nav(suivant, "suiv")}
      </nav>
    </article>
`;
  return enveloppe({ titre: `${a.titre} — Shaykh Mohamed Faouzi Al Karkari`, description: a.extrait || a.titre, page: t.page, main, image: a.couverture });
}

/** Les trois derniers articles, pour la section « Actualités » de l'accueil. */
export function cartesAccueil(articles) {
  return articles
    .slice(0, 3)
    .map(
      (a) => `        <a class="article" href="actualite-${esc(a.slug)}.html" data-reveal>
          <time datetime="${esc(a.date)}">${esc(dateLongue(a.date))}</time>
          <h3>${esc(a.titre)}</h3>
          <span class="article-cta">Lire l'article <i>→</i></span>
        </a>
`
    )
    .join("");
}

/** Trois cartes colorées de la section « Enseignements » de l'accueil. */
export function cartesEnseignements(articles, couleurs) {
  return articles
    .map((a, i) => `        <a class="ens-card" style="--hv:${couleurs[i % couleurs.length]}" href="enseignement-${esc(a.slug)}.html" data-reveal>
          <span class="ens-num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(a.titre)}</h3>
          <span class="ens-lire">Lire l'enseignement <i>→</i></span>
        </a>
`)
    .join("");
}

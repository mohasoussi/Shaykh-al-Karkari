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

function carte(a) {
  const img = a.vignette
    ? `<figure class="actu-fig"><img src="${esc(a.vignette)}" alt="${esc(a.imageAlt || "")}" loading="lazy" decoding="async" /></figure>`
    : `<figure class="actu-fig actu-fig--vide" aria-hidden="true"></figure>`;
  return `        <a class="actu-card" href="actualite-${esc(a.slug)}.html" data-titre="${esc(a.titre.toLowerCase())}">
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

export function pageListe(articles) {
  const contenu = articles.length
    ? `      <div class="actu-outils">
        <label class="field actu-recherche"><span>Rechercher</span><input type="search" id="actu-q" placeholder="Un mot du titre" autocomplete="off" /></label>
        <p class="actu-total">${articles.length} article${articles.length > 1 ? "s" : ""}</p>
      </div>
      <div class="actu-grid" id="actu-grid">
${articles.map(carte).join("")}      </div>
      <p class="actu-aucun" hidden>Aucun article ne correspond à votre recherche.</p>
      <div class="center actu-suite"><button class="btn-glass btn-glass--dark" type="button" id="actu-more" hidden><span>Voir plus d'articles</span><i>↓</i></button></div>
`
    : `      <p class="actu-vide">Les articles seront bientôt publiés ici.</p>
`;
  const main = `    <section class="actu-page">
      <div class="section-head">
        <p class="kicker">Actualités</p>
        <h1 class="h2" data-split>Actualités</h1>
        <p class="section-lede" data-reveal>Rencontres, conférences, publications : l'actualité du Shaykh et de son action.</p>
      </div>
${contenu}    </section>
`;
  return enveloppe({
    titre: "Actualités — Shaykh Mohamed Faouzi Al Karkari",
    description: "L'actualité du Shaykh Mohamed Faouzi Al Karkari : rencontres, conférences, publications.",
    page: "actualites",
    main,
  });
}

export function pageArticle(a, precedent, suivant) {
  const nav = (x, sens) =>
    x
      ? `<a class="actu-voisin actu-voisin--${sens}" href="actualite-${esc(x.slug)}.html"><span>${sens === "prec" ? "← Article précédent" : "Article suivant →"}</span><strong>${esc(x.titre)}</strong></a>`
      : "<span></span>";
  const main = `    <article class="actu-article">
      <a class="actu-retour" href="actualites.html">← Toutes les actualités</a>
      <header class="actu-entete">
        <p class="kicker">Actualités</p>
        <time datetime="${esc(a.date)}">${esc(dateLongue(a.date))}</time>
        <h1>${esc(a.titre)}</h1>
      </header>
      ${a.couverture ? `<figure class="actu-couverture"><img src="${esc(a.couverture)}" alt="${esc(a.imageAlt || "")}" decoding="async" /></figure>` : ""}
      <div class="actu-corps">
${a.html}
      </div>
      <nav class="actu-voisins" aria-label="Autres articles">
        ${nav(precedent, "prec")}
        ${nav(suivant, "suiv")}
      </nav>
    </article>
`;
  return enveloppe({ titre: `${a.titre} — Shaykh Mohamed Faouzi Al Karkari`, description: a.extrait || a.titre, page: "actualite", main, image: a.couverture });
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

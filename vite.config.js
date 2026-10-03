import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";

const racine = process.cwd();

// Insère les morceaux communs (en-tête, menu, pied de page…) : <!--@include nom--> → partials/nom.html
function inclusions() {
  return {
    name: "inclusions-html",
    transformIndexHtml: {
      order: "pre",
      // les pages des dossiers en/ et ar/ utilisent les morceaux de partials/en/ et partials/ar/
      handler: (html, ctx) => {
        const langue = (ctx.path.match(/^\/(en|ar)\//) || [])[1];
        const dossier = langue ? path.join("partials", langue) : "partials";
        const nom = path.basename(ctx.path);
        const page = html.replace(/<!--@include (\w+)-->/g, (_, n) => fs.readFileSync(path.join(racine, dossier, `${n}.html`), "utf8"));
        // sélecteur de langue : la même page dans chaque langue, sinon la page d'accueil de la liste correspondante
        const existe = (l) => fs.existsSync(path.join(racine, l === "fr" ? "" : l, nom));
        const repli = nom.startsWith("actualite-") ? "actualites.html" : nom.startsWith("enseignement-") ? "enseignements.html" : "index.html";
        const lien = (l) => {
          const cible = existe(l) ? nom : repli;
          const depuisLangue = langue ? "../" : "";
          return l === "fr" ? `${depuisLangue}${cible}` : `${langue === l ? "" : depuisLangue ? `${depuisLangue}${l}/` : `${l}/`}${cible}`;
        };
        return page.replace(/\{\{lang-(fr|en|ar)\}\}/g, (_, l) => lien(l));
      },
    },
  };
}

// Toutes les pages .html à la racine sont construites
const pages = ["", "en", "ar"].flatMap((d) => (fs.existsSync(path.join(racine, d)) ? fs.readdirSync(path.join(racine, d)).filter((f) => f.endsWith(".html")).map((f) => path.join(d, f)) : []));

export default defineConfig({
  plugins: [inclusions()],
  build: {
    rollupOptions: { input: Object.fromEntries(pages.map((f) => [f.replace(/\.html$/, "").replace(/[\\/]/g, "-"), path.join(racine, f)])) },
  },
});

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
      handler: (html) => html.replace(/<!--@include (\w+)-->/g, (_, nom) => fs.readFileSync(path.join(racine, "partials", `${nom}.html`), "utf8")),
    },
  };
}

// Toutes les pages .html à la racine sont construites
const pages = fs.readdirSync(racine).filter((f) => f.endsWith(".html"));

export default defineConfig({
  plugins: [inclusions()],
  build: {
    rollupOptions: { input: Object.fromEntries(pages.map((f) => [f.replace(/\.html$/, ""), path.join(racine, f)])) },
  },
});

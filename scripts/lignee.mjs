#!/usr/bin/env node
/* Génère lignee-cherifienne.html à partir de scripts/lignee-cherifienne.json
   (liste ordonnée : du Shaykh jusqu'à ʿAlî et Fâtima, puis le Prophète ﷺ est ajouté).
   Utilisation : npm run lignee */
import fs from "node:fs/promises";
import path from "node:path";
import { esc } from "./gabarits-actualites.mjs";

const SITE = process.env.SITE_DIR ? path.resolve(process.env.SITE_DIR) : process.cwd();
const liste = JSON.parse(await fs.readFile(path.join(SITE, "scripts", "lignee-cherifienne.json"), "utf8"));
const total = liste.length + 1;

const items = liste
  .map((m, i) => {
    const pont = m.pont ? `        <li class="maillon maillon--pont" data-n="${i}" aria-hidden="true"><span class="maillon-point"></span><p>${esc(m.pont)}</p></li>\n` : "";
    return `${pont}        <li class="maillon${i === 0 ? " maillon--shaykh" : ""}" data-n="${i + 1}">
          <span class="maillon-point" aria-hidden="true"></span>
          <div class="maillon-carte">
            <span class="maillon-rang">${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(m.nom)}</h3>
            ${m.detail ? `<p class="maillon-invoc">${esc(m.detail)}</p>` : ""}
          </div>
        </li>
`;
  })
  .join("");

const modele = await fs.readFile(path.join(SITE, "chaine-de-transmission.html"), "utf8");
const tete = modele
  .slice(0, modele.indexOf('    <section class="silsila-page"'))
  .replaceAll("Sa chaîne de transmission", "Sa lignée chérifienne")
  .replace(/La chaîne initiatique \(silsila\)[^"]*/, "La noble lignée chérifienne du Shaykh Mohamed Faouzi Al Karkari, jusqu'au Prophète Muhammad ﷺ.");

const page = `${tete}    <section class="silsila-page silsila-page--lignee" id="silsila-page">
      <header class="silsila-tete">
        <p class="kicker">Le Shaykh</p>
        <h1 class="h2" data-split>Sa lignée chérifienne</h1>
        <p class="section-lede" data-reveal>Fils du noble chérifien Sidi Moulay Tayeb al-Karkari al-Idrissi al-Hassani, le Shaykh descend de la lignée idrisside : par l'imam ʿAlî et Fâtima az-Zahrâ’, elle remonte au Prophète Muhammad ﷺ.</p>
      </header>
      <div class="silsila-fil" aria-hidden="true"><i></i></div>
      <ol class="silsila" data-total="${total}">
${items}        <li class="maillon maillon--prophete" data-n="${total}">
          <span class="maillon-point" aria-hidden="true"></span>
          <div class="maillon-carte">
            <span class="prophete-halo" aria-hidden="true"></span>
            <span class="prophete-ar" lang="ar" dir="rtl">محمد ﷺ</span>
            <h3>Le Prophète Muhammad</h3>
            <p class="maillon-invoc">paix et bénédiction d'Allâh sur lui</p>
          </div>
        </li>
      </ol>
      <p class="silsila-compteur" aria-live="polite"><b>1</b> / <span>${total}</span></p>
      <div class="center shaykh-suite"><a class="btn-glass btn-glass--dark" href="chaine-de-transmission.html"><span>Sa chaîne de transmission</span><i>→</i></a></div>
    </section>

  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
await fs.writeFile(path.join(SITE, "lignee-cherifienne.html"), page);
console.log(`[lignée] ${liste.length} générations + le Prophète`);

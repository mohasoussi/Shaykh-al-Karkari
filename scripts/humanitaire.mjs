#!/usr/bin/env node
/* Rubrique « Actions humanitaires » : sort des actualités les articles qui racontent une action humanitaire
   (puits, kits scolaires, dons alimentaires, aide aux orphelins, etc.) et les range dans actions-humanitaires.html.
   Appelé automatiquement par scripts/importer-actualites.mjs après chaque import ; peut aussi se lancer seul :  node scripts/humanitaire.mjs
   Le tri se fait sur le titre (règle ci-dessous). Pour forcer un article, l'ajouter à INCLURE ou EXCLURE (par son nom d'adresse, sans « actualite- »). */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, pageListe, cartesAccueil, LISTES } from "./gabarits-actualites.mjs";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGLE = /humanitaire|puits|kits? scolaires?|orphelin|eau potable|rohingya|sinistr|cataracte|tricycle|camionnette|[ée]cole primaire|sans-papiers|(apportent?|apporte) (de )?(la )?joie|villageois|apport des soufis/i;
const INCLURE = new Set([]);
const EXCLURE = new Set([]);

export const estHumanitaire = (a) => !EXCLURE.has(a.slug) && (INCLURE.has(a.slug) || REGLE.test(a.titre));

const dateLongue = (iso) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const nav = (x, sens) => (x ? `<a class="actu-voisin actu-voisin--${sens}" href="actualite-${esc(x.slug)}.html"><span>${sens === "prec" ? "← Article précédent" : "Article suivant →"}</span><strong>${esc(x.titre)}</strong></a>` : "<span></span>");

export async function separerHumanitaire(racine = SITE) {
  const jsonActu = path.join(racine, "src", "data", "actualites.json");
  const tous = JSON.parse(await fs.readFile(jsonActu, "utf8"));
  // le fichier peut déjà avoir été trié : on reconstitue la liste complète
  let deja = [];
  try { deja = JSON.parse(await fs.readFile(path.join(racine, "src", "data", "humanitaire.json"), "utf8")); } catch {}
  const connus = new Set(tous.map((a) => a.slug));
  const complet = [...tous, ...deja.filter((a) => !connus.has(a.slug))].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const hum = complet.filter(estHumanitaire);
  const reste = complet.filter((a) => !estHumanitaire(a));

  // pages d'articles : rubrique, lien de retour et voisins selon la liste d'appartenance
  const regler = async (liste, kicker, retour, retourTexte) => {
    for (let i = 0; i < liste.length; i++) {
      const f = path.join(racine, `actualite-${liste[i].slug}.html`);
      let h;
      try { h = await fs.readFile(f, "utf8"); } catch { continue; }
      h = h
        .replace(/(<header class="actu-entete">\s*<p class="kicker">)[^<]*/, `$1${kicker}`)
        .replace(/<a class="actu-retour" href="[^"]*">[^<]*<\/a>/, `<a class="actu-retour" href="${retour}">${retourTexte}</a>`)
        .replace(/(<nav class="actu-voisins" aria-label="[^"]*">)[\s\S]*?(<\/nav>)/, `$1\n        ${nav(liste[i + 1], "prec")}\n        ${nav(liste[i - 1], "suiv")}\n      $2`);
      await fs.writeFile(f, h);
    }
  };
  await regler(reste, "Actualités", "actualites.html", "← Toutes les actualités");
  await regler(hum, "Actions humanitaires", "actions-humanitaires.html", "← Toutes les actions humanitaires");

  await fs.writeFile(path.join(racine, "actualites.html"), pageListe(reste));
  await fs.writeFile(path.join(racine, "actions-humanitaires.html"), pageListe(hum, LISTES.humanitaire));
  await fs.writeFile(jsonActu, JSON.stringify(reste, null, 2) + "\n");
  await fs.writeFile(path.join(racine, "src", "data", "humanitaire.json"), JSON.stringify(hum, null, 2) + "\n");

  // accueil : les trois derniers articles d'actualité (hors actions humanitaires)
  const accueil = path.join(racine, "index.html");
  let h = await fs.readFile(accueil, "utf8");
  if (reste.length && h.includes("<!--actualites:debut-->"))
    await fs.writeFile(accueil, h.replace(/<!--actualites:debut-->[\s\S]*?<!--actualites:fin-->/, `<!--actualites:debut-->\n${cartesAccueil(reste)}        <!--actualites:fin-->`));
  return { actualites: reste.length, humanitaire: hum.length, hum };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const r = await separerHumanitaire();
  console.log(`[humanitaire] ${r.humanitaire} action(s) humanitaire(s), ${r.actualites} actualité(s)`);
  if (process.argv.includes("--liste")) r.hum.forEach((a) => console.log(" -", a.date.slice(0, 10), a.titre));
}

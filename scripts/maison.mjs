// Enseignements rédigés sur ce site (non importés de karkariya.fr) : src/data/enseignements-maison.json.
// Leurs pages (enseignement-<slug>.html) sont générées par leur propre script (ex. scripts/siyaha.mjs).
import fs from "node:fs/promises";
import path from "node:path";

export async function lireMaison(site = process.cwd()) {
  try {
    return JSON.parse(await fs.readFile(path.join(site, "src", "data", "enseignements-maison.json"), "utf8"));
  } catch {
    return [];
  }
}

/** Fusionne articles importés et articles maison, du plus récent au plus ancien. */
export const fusionner = (articles, maison) => [...articles, ...maison].sort((x, y) => String(y.date).localeCompare(String(x.date)));

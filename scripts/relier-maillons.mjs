// Ajoute aux maillons de chaîne-de-transmission.html le lien vers leur biographie (si elle existe), sans relancer l'import.
import fs from "node:fs";
import { lienMaitre } from "./maitres.mjs";
const f = "chaine-de-transmission.html";
let h = fs.readFileSync(f, "utf8"); let n = 0;
h = h.replace(/<li class="maillon([^"]*)" data-n="(\d+)">([\s\S]*?)<\/li>/g, (tout, cl, num, corps) => {
  if (corps.includes("maillon-bio") || cl.includes("prophete") || cl.includes("pont")) return tout;
  const nom = (corps.match(/<h3>([\s\S]*?)<\/h3>/) || [])[1]?.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&#x27;/g, "'").trim();
  const lien = nom && lienMaitre(nom);
  if (!lien) return tout;
  n++;
  const a = `            <a class="maillon-bio" href="${lien}" aria-label="Biographie : ${nom}"><span>Biographie</span><i>→</i></a>\n          </div>`;
  return `<li class="maillon${cl}${cl.includes("maillon--lien") ? "" : " maillon--lien"}" data-n="${num}">${corps.replace(/\s*<\/div>\s*$/, "\n" + a + "\n")}</li>`;
});
fs.writeFileSync(f, h);
console.log(`[relier-maillons] ${n} maillons reliés`);

/* Extrait des pages françaises d'articles (actualités + enseignements) les textes à traduire.
   Sortie : scripts/traductions/fr/<page>.json = { type, slug, date, titre, kicker, corps, figures[] }
   Les médias (figures, iframes, scripts) sont remplacés par des marqueurs <!--M0-->… que les traducteurs laissent tels quels. */
import fs from "node:fs/promises";
import path from "node:path";
const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(SITE, "scripts/traductions/fr");
await fs.mkdir(out, { recursive: true });
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
let n = 0, mots = 0;
for (const f of (await fs.readdir(SITE)).filter((x) => /^(actualite|enseignement)-.+\.html$/.test(x))) {
  const h = await fs.readFile(path.join(SITE, f), "utf8");
  const corps = h.match(/<div class="actu-corps">([\s\S]*?)<\/div>\s*(?:<!--album:debut-->[\s\S]*?<!--album:fin-->\s*)?<nav class="actu-voisins"/);
  if (!corps) { console.warn("sans corps :", f); continue; }
  const titre = decode(h.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] || "");
  const date = h.match(/<time datetime="([^"]+)"/)?.[1] || "";
  const kicker = h.match(/<p class="kicker">([\s\S]*?)<\/p>/)?.[1] || "";
  const figures = [];
  let c = corps[1];
  // figures (éventuellement imbriquées) : on prend la plus externe
  c = c.replace(/<figure[\s\S]*?<\/figure>\s*(?:<figure[\s\S]*?<\/figure>\s*)*(?:<\/figure>)?/g, (m) => { figures.push(m); return `<!--M${figures.length - 1}-->`; });
  c = c.replace(/<(iframe|script|video|audio)[\s\S]*?<\/\1>/g, (m) => { figures.push(m); return `<!--M${figures.length - 1}-->`; });
  c = c.replace(/<img[^>]*>/g, (m) => { figures.push(m); return `<!--M${figures.length - 1}-->`; });
  c = c.replace(/\n{3,}/g, "\n\n").trim();
  const slug = f.replace(/^(actualite|enseignement)-/, "").replace(/\.html$/, "");
  await fs.writeFile(path.join(out, f.replace(".html", ".json")), JSON.stringify({ type: f.startsWith("actualite") ? "actualite" : "enseignement", slug, date, titre, kicker, corps: c, figures }, null, 1) + "\n");
  mots += c.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length; n++;
}
console.log(n, "articles,", mots, "mots à traduire");

import fs from "node:fs";
import path from "node:path";
import { parse } from "node-html-parser";
const DIST = "/home/user/karkari-site/dist";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const pages = walk(DIST).filter((f) => f.endsWith(".html"));
const idsCache = {};
const ids = (f) => (idsCache[f] ??= new Set([...fs.readFileSync(f, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
const rapports = { cassés: [], ancres: [], images: [], fuite: [] };
for (const f of pages) {
  const rel = path.relative(DIST, f);
  const langue = rel.startsWith("en/") ? "en" : rel.startsWith("ar/") ? "ar" : "fr";
  const root = parse(fs.readFileSync(f, "utf8"));
  const resolve = (u) => {
    if (!u || /^(https?:|mailto:|tel:|data:|javascript:|#$)/.test(u)) return null;
    const [chemin, ancre] = u.split("#");
    const base = chemin.startsWith("/") ? path.join(DIST, chemin) : path.resolve(path.dirname(f), chemin || path.basename(f));
    return { cible: chemin ? base : f, ancre };
  };
  for (const a of root.querySelectorAll("a[href]")) {
    const r = resolve(a.getAttribute("href"));
    if (!r) continue;
    let c = decodeURIComponent(r.cible);
    if (!fs.existsSync(c)) { rapports.cassés.push(`${rel} → ${a.getAttribute("href")}`); continue; }
    if (fs.statSync(c).isDirectory()) c = path.join(c, "index.html");
    if (r.ancre && c.endsWith(".html") && !ids(c).has(r.ancre)) rapports.ancres.push(`${rel} → ${a.getAttribute("href")}`);
    // fuite de langue : une page en/ar qui mène vers une page française
    if (langue !== "fr" && c.endsWith(".html")) {
      const rc = path.relative(DIST, c);
      const lc = rc.startsWith("en/") ? "en" : rc.startsWith("ar/") ? "ar" : "fr";
      if (lc !== langue) rapports.fuite.push(`${rel} → ${a.getAttribute("href")}`);
    }
  }
  for (const i of root.querySelectorAll("img[src], source[src], source[srcset], video[poster]")) {
    const u = i.getAttribute("src") || i.getAttribute("poster");
    const r = resolve(u);
    if (r && !fs.existsSync(decodeURIComponent(r.cible))) rapports.images.push(`${rel} → ${u}`);
  }
}
const uniq = (a) => [...new Set(a)];
for (const [k, v] of Object.entries(rapports)) {
  const u = uniq(v);
  console.log(`\n== ${k}: ${u.length} (${v.length} occurrences)`);
  console.log(u.slice(0, 5000).join("\n"));
}

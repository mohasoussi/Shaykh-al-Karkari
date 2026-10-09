import fs from "node:fs"; import path from "node:path";
import { parse } from "node-html-parser";
const DIST = "dist";
const FRW = new Set("le la les des une est dans pour avec sur qui que du au aux ses son sa cette ce et ou nous vous par plus été être il elle de en un sont ont comme mais ainsi lors après avant entre depuis cet leur leurs sans sous chez dont où à".split(" "));
const ENW = new Set("the of and to in is was were with for that this his her their from by on as at an are be been which who has have had not but or it its".split(" "));
const out = {};
for (const code of ["en", "ar"]) {
  for (const f of fs.readdirSync(path.join(DIST, code)).filter((x) => x.endsWith(".html"))) {
    const root = parse(fs.readFileSync(path.join(DIST, code, f), "utf8"));
    root.querySelectorAll("script, style, noscript, .menu").forEach((n) => n.remove());
    const lignes = new Set();
    for (const n of root.querySelectorAll("h1,h2,h3,h4,p,li,a,span,button,figcaption,dd,dt,label,em,strong,td,th,blockquote")) {
      if (n.querySelector("p,li,h1,h2,h3,div")) continue;
      const t = n.text.replace(/\s+/g, " ").trim();
      if (t.length < 12) continue;
      const w = t.toLowerCase().match(/[a-zà-ÿ’']+/g) || [];
      const fr = w.filter((x) => FRW.has(x)).length;
      const en = w.filter((x) => ENW.has(x)).length;
      if (fr >= 3 && fr > en) lignes.add(t.slice(0, 110));
    }
    if (lignes.size) (out[`${code}/${f}`] = [...lignes]);
  }
}
for (const [k, v] of Object.entries(out)) { console.log(`\n## ${k} (${v.length})`); console.log(v.slice(0, 6).join("\n")); }

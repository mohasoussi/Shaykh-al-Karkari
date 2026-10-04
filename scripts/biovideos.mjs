// Génère le partial « biovideos » (fr/en/ar) : vidéos biographiques sous le livre, page « Qui est le Shaykh ».
import fs from "node:fs";
import { bandeVideos, BIO_VIDEOS, BIO_LABEL } from "./videos-data.mjs";
for (const [code, dir] of [["fr", "partials"], ["en", "partials/en"], ["ar", "partials/ar"]]) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/biovideos.html`, bandeVideos(BIO_VIDEOS, code, ...BIO_LABEL[code]));
}
console.log("partials/biovideos ×3");

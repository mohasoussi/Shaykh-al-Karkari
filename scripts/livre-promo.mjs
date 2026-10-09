/* Bloc « livre à commander » (couverture animée + lien vers l'éditeur), en français.
   Utilisé par maitres.mjs (champ livre) et scripts/ascendance.py (même balisage). */
export const LIVRES = {
  "moulay-al-hassan": { url: "https://les7lectures.com/moulay-al-hassan-al-karkari/", cover: "/media/livre-moulay-al-hassan.webp", titre: "Moulay al-Hassan al-Karkari", sous: "Biographie d'un maître soufi", auteur: "Mohamed Ouhraich" },
  "al-karkari": { url: "https://les7lectures.com/al-karkari/", cover: "/media/livre-al-karkari.webp", titre: "Al-Karkari", sous: "Origines et histoire d'une lignée chérifienne", auteur: "Mohamed Ouhraich" },
};
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function livrePromo(cle) {
  const l = LIVRES[cle];
  return `        <aside class="livre-promo" data-reveal>
          <a class="livre-promo-cover" href="${l.url}" target="_blank" rel="noopener" aria-label="Commander le livre « ${esc(l.titre)} »"><span class="livre-promo-3d"><img src="${l.cover}" alt="Couverture du livre « ${esc(l.titre)} — ${esc(l.sous)} »" loading="lazy" decoding="async" /></span></a>
          <div class="livre-promo-txt">
            <p class="kicker">Éditions Les 7 Lectures</p>
            <h3>${esc(l.titre)}</h3>
            <p class="livre-promo-sous">${esc(l.sous)}</p>
            <p class="livre-promo-auteur">${esc(l.auteur)}</p>
            <a class="btn-glass btn-glass--dark" href="${l.url}" target="_blank" rel="noopener"><span>Commander le livre</span><i>↗</i></a>
          </div>
        </aside>`;
}

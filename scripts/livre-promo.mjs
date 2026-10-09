/* Bloc « livre à commander » (couverture animée + lien vers l'éditeur), en français.
   Utilisé par maitres.mjs (champ livre) et scripts/ascendance.py (même balisage). */
export const LIVRES = {
  "moulay-al-hassan": { url: "https://les7lectures.com/moulay-al-hassan-al-karkari/", cover: "/media/livre-moulay-al-hassan.webp", titre: "Moulay al-Hassan al-Karkari", sous: "Biographie d'un maître soufi", auteur: "Mohamed Ouhraich" },
  "al-karkari": { url: "https://les7lectures.com/al-karkari/", cover: "/media/livre-al-karkari.webp", titre: "Al-Karkari", sous: "Origines et histoire d'une lignée chérifienne", auteur: "Mohamed Ouhraich" },
};
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const LANGUE = {
  en: { kicker: "Éditions Les 7 Lectures", bouton: "Order the book", aria: (t) => `Order the book “${t}”`, alt: (t, s) => `Cover of the book “${t} — ${s}”`,
    sous: { "moulay-al-hassan": "Biography of a Sufi master", "al-karkari": "Origins and history of a sharifian lineage" } },
  ar: { kicker: "Éditions Les 7 Lectures", bouton: "اطلب الكتاب", aria: (t) => `اطلب كتاب «${t}»`, alt: (t, s) => `غلاف كتاب «${t} — ${s}»`,
    sous: { "moulay-al-hassan": "سيرة شيخ صوفي", "al-karkari": "أصول وتاريخ سلالة شريفة" } },
};

export function livrePromo(cle, code = "fr") {
  const l = { ...LIVRES[cle] };
  const T = LANGUE[code];
  if (T) l.sous = T.sous[cle];
  if (!T) return livrePromoFr(cle, l);
  return `        <aside class="livre-promo" data-reveal>
          <a class="livre-promo-cover" href="${l.url}" target="_blank" rel="noopener" aria-label="${esc(T.aria(l.titre))}"><span class="livre-promo-3d"><img src="${l.cover}" alt="${esc(T.alt(l.titre, l.sous))}" loading="lazy" decoding="async" /></span></a>
          <div class="livre-promo-txt">
            <p class="kicker">${T.kicker}</p>
            <h3>${esc(l.titre)}</h3>
            <p class="livre-promo-sous">${esc(l.sous)}</p>
            <p class="livre-promo-auteur">${esc(l.auteur)}</p>
            <a class="btn-glass btn-glass--dark" href="${l.url}" target="_blank" rel="noopener"><span>${T.bouton}</span><i>↗</i></a>
          </div>
        </aside>`;
}

function livrePromoFr(cle, l) {
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

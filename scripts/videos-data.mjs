// Listes de vidéos supplémentaires (interviews, enseignements, conférences, biographie) + rendu commun des cartes vidéo.
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const ytId = (u) => (u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/) || [])[1];
const PLAY = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';

export const LIB = {
  fr: { open: "Ouvrir sur YouTube ↗", play: "Lire la vidéo : " },
  en: { open: "Open on YouTube ↗", play: "Play the video: " },
  ar: { open: "فتح على يوتيوب ↗", play: "تشغيل الفيديو: " },
};

const itv = (id, yt, nom) => ({ id, yt,
  place: { fr: "Presse marocaine", en: "Moroccan media", ar: "الإعلام المغربي" },
  t: { fr: `Entretien — ${nom}`, en: `Interview — ${nom}`, ar: `حوار — ${nom}` } });

export const INTERVIEWS = [
  { id: "itv-nouveau", yt: "https://youtu.be/PGJgaHGDcS8",
    place: { fr: "Interview", en: "Interview", ar: "حوار" },
    t: { fr: "Entretien avec le Shaykh", en: "Interview with the Shaykh", ar: "حوار مع الشيخ" } },
  itv("itv-essentiel", "https://youtu.be/p5n299xzBhM", "L'Essentiel Maroc"),
  itv("itv-telemaroc", "https://youtu.be/L4uFqCjVxwY", "Télé Maroc"),
  itv("itv-journal24", "https://youtu.be/0riR5wCkK0A", "Journal24 TV"),
  itv("itv-akhbarona", "https://youtu.be/GPJ62j2BFzg", "Akhbarona TV"),
  itv("itv-hespress", "https://youtu.be/mPRp1RAQOa0", "Hespress"),
  itv("itv-akhbar55", "https://youtu.be/cqHbrR71dYM", "Al Akhbar55"),
  itv("itv-omq", "https://youtu.be/l95AUdEU8mU", "العمق المغربي"),
];

export const ENSEIGNEMENTS_VIDEOS = [
  { id: "ens-video", yt: "https://youtu.be/6H-FB4LBpeg",
    place: { fr: "Enseignement", en: "Teaching", ar: "درس" },
    t: { fr: "Enseignement du Shaykh en vidéo", en: "The Shaykh's teaching on video", ar: "درس الشيخ بالفيديو" } },
];

export const CONF_NOUVELLES = [
  { id: "washington", yt: "https://youtu.be/bDH9CMDcnp8",
    place: { fr: "Washington · États-Unis", en: "Washington · United States", ar: "واشنطن · الولايات المتحدة" },
    t: { fr: "Conférence à Washington", en: "Lecture in Washington", ar: "محاضرة في واشنطن" } },
  { id: "stanford-conf", yt: "https://youtu.be/8xmK-CGuUNQ",
    place: { fr: "Université Stanford · États-Unis", en: "Stanford University · United States", ar: "جامعة ستانفورد · الولايات المتحدة" },
    t: { fr: "Conférence à l'Université Stanford", en: "Lecture at Stanford University", ar: "محاضرة في جامعة ستانفورد" } },
  { id: "chicago-live", yt: "https://www.youtube.com/live/ACKwj_R4X_g",
    place: { fr: "Université de Chicago · États-Unis", en: "University of Chicago · United States", ar: "جامعة شيكاغو · الولايات المتحدة" },
    t: { fr: "Conférence à l'Université de Chicago (en direct)", en: "Lecture at the University of Chicago (live)", ar: "محاضرة في جامعة شيكاغو (بث مباشر)" } },
];

const bio = (n, id) => ({ id: `bio-${n}`, yt: `https://youtu.be/${id}`,
  place: { fr: "Biographie", en: "Biography", ar: "السيرة" },
  t: { fr: `Portrait du Shaykh — vidéo ${n}`, en: `Portrait of the Shaykh — video ${n}`, ar: `صورة عن الشيخ — فيديو ${n}` } });
export const BIO_VIDEOS = ["0rKlkuQA-H0", "tZtiVYWN32s", "c5doEB8UwgY", "GnV5dnRfI-0", "RRoe0kS2Wuo", "FcrRhqBRZT8", "dI_9i9J33bA"].map((id, i) => bio(i + 1, id));

export function vcard(v, code, T = LIB[code]) {
  const id = ytId(v.yt);
  const img = v.img || `https://i.ytimg.com/vi/${v.thumb || id}/hqdefault.jpg`;
  return `      <article class="vcard" id="${v.id}" data-youtube="${esc(v.yt)}" data-reveal>
        <div class="vframe">
          <img src="${img}" alt="" loading="lazy" />
          <button class="vplay" type="button" aria-label="${esc(T.play + v.t[code])}">${PLAY}</button>
        </div>
        <div class="vcopy">
          <span class="talk-place">${esc(v.place[code])}</span>
          <h2>${esc(v.t[code])}</h2>${v.d ? `\n          <p>${esc(v.d[code])}</p>` : ""}
          <a class="vlink" href="${esc(v.yt)}" target="_blank" rel="noopener" hidden>${T.open}</a>
        </div>
      </article>`;
}

/** Bande sombre de cartes vidéo, à insérer dans une page. */
export function bandeVideos(liste, code, titre, lede) {
  return `    <section class="vpage vband">
      <div class="section-head">
        <h2 class="h2" data-split>${esc(titre)}</h2>${lede ? `\n        <p class="section-lede" data-reveal>${esc(lede)}</p>` : ""}
      </div>
      <div class="vgrid">
${liste.map((v) => vcard(v, code)).join("\n")}
      </div>
    </section>
`;
}

export const ENS_LABEL = {
  fr: ["Enseignement en vidéo", "Un enseignement du Shaykh à regarder."],
  en: ["Teaching on video", "A teaching of the Shaykh to watch."],
  ar: ["درس بالفيديو", "درس للشيخ للمشاهدة."],
};
export const BIO_LABEL = {
  fr: ["Le Shaykh en vidéo", "Portraits et témoignages vidéo sur la vie et l'œuvre du Shaykh."],
  en: ["The Shaykh on video", "Video portraits and testimonies on the life and work of the Shaykh."],
  ar: ["الشيخ بالفيديو", "صور وشهادات مرئية عن حياة الشيخ وعمله."],
};

import "@fontsource/cormorant-garamond/latin-300.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/cormorant-garamond/latin-300-italic.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/manrope/latin-300.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/latin-600.css";
import "./style.css";
import { initInscription } from "./inscription.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const PATCH = ["#b8322a", "#2f6f4e", "#d9a527", "#2c4f8c", "#7b3b7e", "#d96b2b", "#c9a46a"];

/* ---------------------------------------------------------
   Défilement fluide (Lenis) synchronisé avec GSAP
   --------------------------------------------------------- */
// Les liens « index.html#… » deviennent de simples ancres sur l'accueil ; depuis une autre page, ils sautent l'intro au retour.
const isHome = document.body.dataset.page === "home";
$$('a[href^="index.html"]').forEach((a) => {
  if (isHome) a.setAttribute("href", a.getAttribute("href").replace(/^index\.html/, "") || "#top");
  else a.addEventListener("click", () => { try { sessionStorage.setItem("skipIntro", "1"); } catch {} });
});

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
  else document.querySelector(target)?.scrollIntoView();
}

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2 && id !== "#") return;
    if (id === "#admin") return; // ouvre le panneau d'administration (voir inscription.js)
    e.preventDefault();
    if (document.body.classList.contains("menu-open")) closeMenu();
    scrollToTarget(id === "#" ? "#top" : id);
  });
});

/* ---------------------------------------------------------
   Loader : la muraqqa'a qui se dévoile
   --------------------------------------------------------- */
function buildTiles(container, cols, rows) {
  container.style.setProperty("--cols", cols);
  container.style.setProperty("--rows", rows);
  const frag = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) frag.appendChild(document.createElement("span"));
  container.appendChild(frag);
  return $$("span", container);
}

/** Point de la photo du Shaykh (son cœur, sous les mains) où le cercle d'ouverture vient se refermer. */
function pointShaykh() {
  const frame = $(".hero-frame");
  const photo = $(".hero-photo");
  const w = frame.offsetWidth;
  const h = frame.offsetHeight;
  const [px, py] = getComputedStyle(photo).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
  const ratio = (photo.naturalWidth || 1536) / (photo.naturalHeight || 1024);
  const s = Math.max(w / ratio, h) ; // hauteur d'image affichée
  const dh = s;
  const dw = s * ratio;
  const x = (w - dw) * px + 0.742 * dw;
  const y = (h - dh) * py + 0.5 * dh;
  return { x: Math.min(Math.max(x, 0), innerWidth), y: Math.min(Math.max(y, 0), innerHeight) };
}

function runLoader(onReveal) {
  const loader = $(".loader");
  const ring = $(".loader-ring");
  const fin = () => {
    loader?.remove();
    ring?.remove();
    document.body.classList.remove("is-loading");
  };
  if (!loader || document.documentElement.dataset.skip) {
    fin();
    onReveal && onReveal();
    return Promise.resolve();
  }
  if (reduced) {
    fin();
    return Promise.resolve();
  }
  // intro de 3 secondes : le damier du menu se dresse sur la page, reste visible derrière un filtre opaque pendant le verset,
  // puis les carreaux se replient pour révéler l'accueil
  const mobile = window.innerWidth < 760;
  const tiles = buildTiles($(".loader-grid"), mobile ? 3 : 6, mobile ? 5 : 4);
  const veil = $(".loader-veil");
  const couleur = () => PATCH[Math.floor(Math.random() * PATCH.length)];
  gsap.set(tiles, { scaleY: 0, transformOrigin: "top" });
  // les carreaux changent de couleur en continu derrière le filtre
  const rythme = setInterval(
    () => tiles.forEach((t) => Math.random() < 0.5 && gsap.to(t, { backgroundColor: couleur(), duration: 0.4, ease: "power1.inOut", overwrite: "auto" })),
    300
  );

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { clearInterval(rythme); fin(); resolve(); } });
    tl.fromTo(tiles, { scaleY: 0, backgroundColor: couleur }, {
      scaleY: 1,
      duration: 0.45,
      ease: "power3.inOut",
      stagger: { each: 0.012, from: "random" },
    }, 0)
      // à 2 s : le verset et le filtre s'effacent, les carreaux se replient
      .to(".loader-center", { opacity: 0, scale: 0.96, duration: 0.35, ease: "power2.in" }, 2)
      .to(veil, { opacity: 0, duration: 0.5, ease: "power1.out" }, 2.05)
      .add(() => { clearInterval(rythme); onReveal && onReveal(); }, 2.1)
      .set(tiles, { transformOrigin: "bottom" }, 2.1)
      .to(tiles, { scaleY: 0, duration: 0.6, ease: "power3.inOut", stagger: { each: 0.012, from: "random" } }, 2.1);
  });
}

/* ---------------------------------------------------------
   Intro du hero
   --------------------------------------------------------- */
function heroIntro() {
  const rows = $$(".hero-row");
  // en arabe, on anime mot par mot : découper en lettres casserait la liaison des caractères
  const ar = document.documentElement.lang === "ar";
  const splits = rows.map((r) => new SplitText(r, ar ? { type: "words", wordsClass: "char" } : { type: "chars", charsClass: "char" }));
  const chars = splits.flatMap((s) => (ar ? s.words : s.chars));
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.fromTo(".hero-photo", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "expo.out" }, 0)
    .from(chars, { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.035 }, 0.15)
    .from(".hero-sub", { opacity: 0, y: 24, duration: 1.2 }, 0.8)
    .from(".hero-cta", { opacity: 0, y: 20, duration: 1.1 }, 1)
    .from(".hero-scroll", { opacity: 0, y: 20, duration: 1 }, 1)
    .from(".hero-pattern", { opacity: 0, xPercent: -6, duration: 2.6 }, 0.2)
    .from(".hero-layer--basmala", { opacity: 0, duration: 2.6, ease: "power2.out" }, 0.6)
    .from(".header", { y: -40, opacity: 0, duration: 1.2 }, 0.6);
  return tl;
}

/* ---------------------------------------------------------
   Hero au scroll : la fenêtre vidéo se referme en arche
   --------------------------------------------------------- */
function heroScroll() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  tl.to(".hero-frame", { clipPath: "inset(8% 6% 0% 6% round 400px 400px 0px 0px)", ease: "none" }, 0)
    .to(".hero-photo", { scale: 1.15, yPercent: 6, ease: "none" }, 0)
    .to(".hero-text", { yPercent: -25, opacity: 0, ease: "none" }, 0)
        .to(".hero-pattern", { yPercent: -12, opacity: 0, ease: "none" }, 0);
}

/* ---------------------------------------------------------
   Manifeste : les mots s'illuminent un à un
   --------------------------------------------------------- */
function manifesto() {
  const el = $("[data-words]");
  const split = new SplitText(el, { type: "words", wordsClass: "w" });
  gsap.to(split.words, {
    opacity: 1,
    color: (i) => (i % 9 === 4 ? "#e8d3a8" : "#f4efe6"),
    textShadow: "0 0 26px rgba(240, 214, 160, 0.45)",
    stagger: 0.1,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
  });
  gsap.from(".manifesto-sign", {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
    duration: 1.4,
    scrollTrigger: { trigger: ".manifesto-sign", start: "top 90%" },
  });
}

/* ---------------------------------------------------------
   Lumière : rayons dans la bannière, aube derrière le manifeste, halo autour du verset, fil de lumière en haut de page
   --------------------------------------------------------- */
function lumiere() {
  const aube = $(".manifesto-glow");
  if (aube)
    gsap.fromTo(aube, { opacity: 0, scale: 0.5, yPercent: 20 }, {
      opacity: 1, scale: 1.25, yPercent: -10, ease: "none",
      scrollTrigger: { trigger: ".manifesto", start: "top 85%", end: "bottom 30%", scrub: 0.8 },
    });

  const verset = $(".outro-light");
  if (verset)
    ScrollTrigger.create({ trigger: ".outro", start: "top 65%", end: "bottom top", onToggle: (self) => verset.classList.toggle("is-lit", self.isActive) });

  const fil = $(".light-progress i");
  if (fil)
    gsap.to(fil, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 } });
}

/* ---------------------------------------------------------
   Titres et paragraphes qui apparaissent
   --------------------------------------------------------- */
function reveals() {
  $$("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line-inner",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
    });
  });

  $$("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: end > 10 ? 1.1 : 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => (el.textContent = Math.round(o.v)),
      onComplete: () => gsap.fromTo(el, { scale: 1.18 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }),
    });
  });

  // images : rideau + zoom arrière
  $$("[data-clip]").forEach((fig) => {
    const img = $("img", fig);
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 85%" } });
    tl.from(fig, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }).from(
      img,
      { scale: 1.4, duration: 2, ease: "expo.out" },
      0.3
    );
  });

  // parallaxe interne
  $$("[data-parallax]").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });
}

/* ---------------------------------------------------------
   Parcours : scroll horizontal épinglé (desktop)
   --------------------------------------------------------- */
function journey(mm) {
  mm.add("(min-width: 761px)", () => {
    const track = $(".journey-track");
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".journey",
        pin: ".journey-pin",
        start: "top top",
        end: () => "+=" + distance(),
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    gsap.to(".journey-progress i", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: ".journey", start: "top top", end: () => "+=" + distance(), scrub: true },
    });
    // chaque étape se redresse en entrant dans l'écran
    $$(".step").forEach((step) => {
      gsap.from(step, {
        y: 80,
        rotate: 3,
        opacity: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: step,
          containerAnimation: tween,
          start: "left 100%",
          end: "left 65%",
          scrub: true,
        },
      });
      const img = $("img", step);
      if (img)
        gsap.fromTo(img, { scale: 1.3, xPercent: -10 }, {
          scale: 1.05,
          xPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: step, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
    });
  });

  mm.add("(max-width: 760px)", () => {
    $$(".step").forEach((step) =>
      gsap.from(step, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 90%" } })
    );
  });
}

/* ---------------------------------------------------------
   Enseignements : image flottante qui suit la souris
   --------------------------------------------------------- */
function teachings() {
  $$(".topic").forEach((t) =>
    gsap.from(t, { opacity: 0, y: 40, duration: 1, ease: "power3.out", scrollTrigger: { trigger: t, start: "top 92%" } })
  );
}

/* ---------------------------------------------------------
   Marquees (institutions + footer), accélérés par le scroll
   --------------------------------------------------------- */
function marquees() {
  const rows = [...$$(".marquee-row")];
  rows.forEach((row) => {
    row.innerHTML += row.innerHTML; // duplique pour la boucle
    const dir = +(row.dataset.dir || 1);
    const tween = gsap.fromTo(
      row,
      { xPercent: dir > 0 ? 0 : -50 },
      { xPercent: dir > 0 ? -50 : 0, duration: 40, ease: "none", repeat: -1 }
    );
    ScrollTrigger.create({
      trigger: row,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.abs(self.getVelocity()) / 400;
        gsap.to(tween, { timeScale: 1 + Math.min(v, 6), duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2, overwrite: false });
      },
    });
  });
}

/* ---------------------------------------------------------
   Conférences : cartes empilées qui reculent
   --------------------------------------------------------- */
function talks() {
  const cards = $$(".talk");
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    gsap.to(card, {
      scale: 0.92,
      "--dim": 0.6, // voile sombre (plus fiable qu'un filtre CSS sur mobile)
      ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 12%", scrub: true },
    });
  });
  cards.forEach((card) => {
    const img = $("img", card);
    if (img)
      gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 12%", scrub: true } });
  });
  // lancer la vidéo de fond seulement quand la section est visible
  const vid = $(".talks-bg video");
  ScrollTrigger.create({
    trigger: ".talks",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? vid.play().catch(() => {}) : vid.pause()),
  });
}

/* ---------------------------------------------------------
   Articles : le cercle d'encre part de la souris
   --------------------------------------------------------- */
function articles() {
  $$(".article").forEach((a) =>
    a.addEventListener("mouseenter", (e) => {
      const r = a.getBoundingClientRect();
      a.style.setProperty("--mx", `${e.clientX - r.left}px`);
      a.style.setProperty("--my", `${e.clientY - r.top}px`);
    })
  );
}

/* ---------------------------------------------------------
   Header : se cache en descendant, revient en remontant
   --------------------------------------------------------- */
function header() {
  const h = $(".header");
  let hidden = false;
  ScrollTrigger.create({
    start: 120,
    end: "max",
    onUpdate: (self) => {
      const hide = self.direction === 1 && !document.body.classList.contains("menu-open");
      if (hide === hidden) return;
      hidden = hide;
      h.classList.toggle("is-hidden", hide);
      gsap.to(h, { yPercent: hide ? -110 : 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    },
    onLeaveBack: () => {
      hidden = false;
      h.classList.remove("is-hidden");
      gsap.to(h, { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    },
  });
}

/* ---------------------------------------------------------
   Lien de la section en cours
   --------------------------------------------------------- */
function navigation() {
  const page = document.body.dataset.page;
  const liens = {};
  $$("[data-nav]").forEach((a) => (liens[a.dataset.nav] = a));
  const actif = (id) => {
    $$(".header-nav .is-current").forEach((el) => el.classList.remove("is-current"));
    liens[id]?.classList.add("is-current");
  };
  if (page === "shaykh" || page === "conferences") actif(page);
  if (page === "actualites" || page === "actualite" || page === "actions-humanitaires") actif("ecrits");
  if (page === "home" && $("#ecrits"))
    ScrollTrigger.create({
      trigger: "#ecrits",
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => (self.isActive ? actif("ecrits") : liens.ecrits?.classList.remove("is-current")),
    });
}

/* ---------------------------------------------------------
   Page Actualités : recherche + « Voir plus »
   --------------------------------------------------------- */
function actualites() {
  const grille = $("#actu-grid");
  if (!grille) return;
  const cartes = $$(".actu-card", grille);
  const plus = $("#actu-more");
  const aucun = $(".actu-aucun");
  const champ = $("#actu-q");
  const PAS = 12;
  let visibles = PAS;
  const rendre = () => {
    const sans = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const q = sans((champ?.value || "").trim());
    const ok = cartes.filter((c) => !q || sans(c.dataset.titre).includes(q));
    cartes.forEach((c) => (c.hidden = true));
    ok.slice(0, visibles).forEach((c) => (c.hidden = false));
    if (plus) plus.hidden = ok.length <= visibles;
    if (aucun) aucun.hidden = ok.length > 0;
    ScrollTrigger.refresh();
  };
  champ?.addEventListener("input", () => ((visibles = PAS), rendre()));
  plus?.addEventListener("click", () => ((visibles += PAS), rendre()));
  rendre();
}

/* ---------------------------------------------------------
   Chaîne de transmission : un fil de lumière qui se tend de maillon en maillon, jusqu'au Prophète ﷺ
   --------------------------------------------------------- */
function silsila() {
  const liste = $(".silsila");
  if (!liste) return;
  const page = $(".silsila-page");
  const fil = $(".silsila-fil");
  const barre = $("i", fil);
  const items = $$(".maillon", liste).filter((li) => !li.classList.contains("maillon--pont"));
  const compteur = $(".silsila-compteur");
  const num = $("b", compteur);
  const point = (li) => $(".maillon-point", li).getBoundingClientRect();

  const placer = () => {
    const pr = page.getBoundingClientRect();
    const a = point(items[0]);
    const z = point(items[items.length - 1]);
    fil.style.top = `${a.top + a.height / 2 - pr.top}px`;
    fil.style.height = `${z.top - a.top}px`;
    fil.style.bottom = "auto";
  };
  placer();
  ScrollTrigger.addEventListener("refresh", placer);

  // le fil se tend avec le défilement
  gsap.fromTo(barre, { scaleY: 0 }, {
    scaleY: 1, ease: "none",
    scrollTrigger: { trigger: items[0], start: "center 60%", endTrigger: items[items.length - 1], end: "center 60%", scrub: 0.4 },
  });

  const large = innerWidth > 760;
  items.forEach((li, i) => {
    const carte = $(".maillon-carte", li);
    const dir = large ? (li.matches(":nth-child(odd)") ? -1 : 1) : 1;
    if (!li.classList.contains("maillon--prophete"))
      gsap.from(carte, { opacity: 0, x: dir * (large ? 70 : 30), duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 88%" } });
    else
      gsap.from(carte, { opacity: 0, y: 40, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 80%" } });
    ScrollTrigger.create({
      trigger: li, start: "top 58%", end: li.classList.contains("maillon--prophete") ? "bottom top" : "bottom 58%",
      onToggle: (self) => {
        li.classList.toggle("is-active", self.isActive);
        if (self.isActive) num.textContent = li.dataset.n;
      },
    });
  });

  // le Prophète ﷺ : la lumière se déploie
  const proph = $(".maillon--prophete", liste);
  const halo = $(".prophete-halo", proph);
  gsap.to(halo, { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out", scrollTrigger: { trigger: proph, start: "top 62%", toggleActions: "play none none reverse" } });

  // compteur « n / total » pendant la traversée
  ScrollTrigger.create({
    trigger: liste, start: "top 70%", end: "bottom 62%",
    onToggle: (self) => compteur.classList.toggle("is-on", self.isActive),
  });
}

/* ---------------------------------------------------------
   Page vidéo : un lecteur par conférence, activé dès qu'un lien YouTube est renseigné
   (attribut data-youtube de chaque carte : adresse complète ou identifiant)
   --------------------------------------------------------- */
function videos() {
  $$(".vcard").forEach((card) => {
    const raw = (card.dataset.youtube || "").trim();
    if (!raw) return;
    const liste = (raw.match(/[?&]list=([\w-]+)/) || [])[1];
    const id = (raw.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/) || [])[1] || (liste ? "videoseries" : raw);
    const btn = $(".vplay", card);
    const lien = $(".vlink", card);
    btn.disabled = false;
    $(".vstatus", card)?.remove();
    lien.hidden = false;
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${liste ? `&list=${liste}` : ""}`;
      f.title = $("h2", card)?.textContent || "Vidéo";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      f.referrerPolicy = "strict-origin-when-cross-origin";
      $(".vframe", card).replaceChildren(f);
    });
  });
}


/* ---------------------------------------------------------
   Galerie photos : visionneuse plein écran (flèches, Échap, balayage)
   --------------------------------------------------------- */
function galerie() {
  const galeries = $$(".galerie");
  if (!galeries.length) return;
  const g0 = galeries[0];
  let liens = [];
  let i = 0;
  const vue = document.createElement("div");
  vue.className = "lightbox";
  vue.hidden = true;
  vue.innerHTML = `<button class="lb-close" type="button" aria-label="${g0.dataset.close}">×</button><button class="lb-nav lb-prev" type="button" aria-label="${g0.dataset.prev}">‹</button><img alt="" /><button class="lb-nav lb-next" type="button" aria-label="${g0.dataset.next}">›</button>`;
  document.body.appendChild(vue);
  const img = $("img", vue);
  const montrer = (n) => {
    i = (n + liens.length) % liens.length;
    img.src = liens[i].href;
    img.alt = $("img", liens[i])?.alt || "";
  };
  const ouvrir = (ens, n) => { liens = ens; montrer(n); vue.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => vue.classList.add("is-open")); };
  const fermer = () => { vue.classList.remove("is-open"); document.body.classList.remove("modal-open"); setTimeout(() => (vue.hidden = true), 250); };
  galeries.forEach((g) => {
    const ens = $$("a", g);
    ens.forEach((a, n) => a.addEventListener("click", (e) => { e.preventDefault(); ouvrir(ens, n); }));
  });
  $(".lb-close", vue).addEventListener("click", fermer);
  $(".lb-prev", vue).addEventListener("click", () => montrer(i - 1));
  $(".lb-next", vue).addEventListener("click", () => montrer(i + 1));
  vue.addEventListener("click", (e) => { if (e.target === vue) fermer(); });
  addEventListener("keydown", (e) => {
    if (vue.hidden) return;
    if (e.key === "Escape") fermer();
    if (e.key === "ArrowLeft") montrer(i - (document.documentElement.dir === "rtl" ? -1 : 1));
    if (e.key === "ArrowRight") montrer(i + (document.documentElement.dir === "rtl" ? -1 : 1));
  });
  let x0 = null;
  vue.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  vue.addEventListener("touchend", (e) => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) montrer(i + (d < 0 ? 1 : -1)); x0 = null; });
}

/* ---------------------------------------------------------
   Menu plein écran (carreaux de la muraqqa'a)
   --------------------------------------------------------- */
const LABELS = { fr: { fermer: "Fermer", menu: "Menu" }, en: { fermer: "Close", menu: "Menu" }, ar: { fermer: "إغلاق", menu: "القائمة" } }[document.documentElement.lang] || { fermer: "Fermer", menu: "Menu" };
const menu = $(".menu");
const menuBtn = $(".menu-btn");
let menuTl;

function buildMenu() {
  const mobile = window.innerWidth < 760;
  const tiles = buildTiles($(".menu-tiles"), mobile ? 3 : 6, mobile ? 5 : 4);
  menuTl = gsap
    .timeline({ paused: true })
    .set(menu, { visibility: "visible" })
    .fromTo(tiles, { scaleY: 0, backgroundColor: () => PATCH[Math.floor(Math.random() * PATCH.length)] }, {
      scaleY: 1,
      duration: 0.5,
      ease: "power3.inOut",
      transformOrigin: "top",
      stagger: { each: 0.02, from: "random" },
    })
    .to(tiles, { backgroundColor: "#0b0f14", duration: 0.4, stagger: { each: 0.01, from: "random" } }, "-=0.25")
    .from(".menu-links a", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.05 }, "-=0.3")
    .from(".menu-aside > *", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.06 }, "<0.2");
}

function openMenu() {
  document.body.classList.add("menu-open");
  menuBtn.setAttribute("aria-expanded", "true");
  menu.setAttribute("aria-hidden", "false");
  $(".menu-btn-label").textContent = LABELS.fermer;
  lenis?.stop();
  menuTl.timeScale(1).play();
}
function closeMenu() {
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");
  $(".menu-btn-label").textContent = LABELS.menu;
  lenis?.start();
  menuTl.timeScale(1.8).reverse();
}
menuBtn.addEventListener("click", () => (document.body.classList.contains("menu-open") ? closeMenu() : openMenu()));
document.addEventListener("keydown", (e) => e.key === "Escape" && document.body.classList.contains("menu-open") && closeMenu());

/* ---------------------------------------------------------
   Curseur personnalisé + boutons magnétiques
   --------------------------------------------------------- */
function cursor() {
  if (!finePointer) return;
  const c = $(".cursor");
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  const label = $("em", ring);
  const dx = gsap.quickTo(dot, "x", { duration: 0.1 });
  const dy = gsap.quickTo(dot, "y", { duration: 0.1 });
  const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
  const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
  window.addEventListener("mousemove", (e) => {
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
  });
  document.addEventListener("mouseover", (e) => {
    const view = e.target.closest("[data-cursor]");
    const link = e.target.closest("a, button");
    c.classList.toggle("is-view", !!view);
    c.classList.toggle("is-link", !view && !!link);
    if (view) label.textContent = view.dataset.cursor;
  });

  $$("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ---------------------------------------------------------
   Poussière de lumière (canvas) sur les sections sombres
   --------------------------------------------------------- */
/* Livre mis en avant : il reste ancré et oscille doucement de la gauche vers la droite */
function livre() {
  const a = $(".book-feature-cover a");
  if (!a || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const sg = document.documentElement.lang === "ar" ? -1 : 1; // miroir en arabe
  gsap.set(a, { rotateY: -16 * sg, rotateX: 2, transformOrigin: "50% 50%" });
  const balancier = gsap.to(a, { rotateY: -4 * sg, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
  a.addEventListener("pointerenter", () => {
    balancier.pause();
    gsap.to(a, { rotateY: 0, rotateX: 0, y: -8, duration: 0.6, ease: "power3.out", overwrite: "auto" });
  });
  a.addEventListener("pointerleave", () => {
    gsap.to(a, { rotateX: 2, y: 0, duration: 0.6, ease: "power3.out", overwrite: "auto", onComplete: () => balancier.play() });
  });
}

function dust() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const N = window.innerWidth < 760 ? 40 : 90;
  let scrollV = 0;
  lenis?.on("scroll", (l) => (scrollV = Math.max(-3, Math.min(3, l.velocity))));
  // un nuage de particules par canvas : plein écran (sections sombres) ou calque du hero (derrière le Shaykh)
  const nuage = (canvas, actif) => {
    const ctx = canvas.getContext("2d");
    let w, h, parts;
    const resize = () => {
      const fixe = getComputedStyle(canvas).position === "fixed";
      w = canvas.width = (fixe ? window.innerWidth : canvas.offsetWidth || window.innerWidth) * dpr;
      h = canvas.height = (fixe ? window.innerHeight : canvas.offsetHeight || window.innerHeight) * dpr;
      parts = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.6 + 0.4) * dpr,
        vy: -(Math.random() * 0.25 + 0.05) * dpr,
        vx: (Math.random() - 0.5) * 0.15 * dpr,
        a: Math.random() * 0.6 + 0.2,
        t: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    gsap.ticker.add(() => {
      if (!actif()) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += 0.02;
        p.y += p.vy - scrollV * 0.05 * dpr;
        p.x += p.vx + Math.sin(p.t) * 0.12;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(240, 214, 160, ${p.a * (0.6 + 0.4 * Math.sin(p.t))})`);
        g.addColorStop(1, "rgba(240, 214, 160, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };
  const canvas = null; // plus de fond étoilé hors du hero
  $(".dust")?.remove();
  if (canvas) nuage(canvas, () => +canvas.style.opacity > 0);
  const etoiles = $(".hero-stars");
  if (etoiles) {
    let visible = true;
    nuage(etoiles, () => visible);
    ScrollTrigger.create({ trigger: ".hero", start: "top bottom", end: "bottom top", onToggle: (self) => (visible = self.isActive) });
  }
  // visible seulement au-dessus des sections sombres
  if (canvas)
    [".manifesto", ".talks", ".merkez", ".vpage"].filter((sel) => $(sel)).forEach((sel) =>
      ScrollTrigger.create({
        trigger: sel,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: (self) => gsap.to(canvas, { opacity: self.isActive ? 1 : 0, duration: 0.8, overwrite: true }),
      })
    );
}

/* ---------------------------------------------------------
   Démarrage
   --------------------------------------------------------- */
$(".year").textContent = new Date().getFullYear();

// Rechargement ou première visite : on repart du haut (l'ouverture se referme sur la photo).
// Retour arrière : pas d'intro, et on retrouve l'endroit de la page que l'on avait quitté.
const retour = performance.getEntriesByType?.("navigation")?.[0]?.type === "back_forward";
const cleScroll = `y:${location.pathname}`;
const memoriserScroll = () => {
  try {
    sessionStorage.setItem(cleScroll, String(Math.round(window.scrollY)));
  } catch {}
};
addEventListener("pagehide", memoriserScroll);
document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && memoriserScroll());
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!retour) {
  scrollTo(0, 0);
  // une page qui s'ouvre repart toujours du haut, même si des images se chargent ensuite
  addEventListener("load", () => !location.hash && scrollY < 400 && scrollTo(0, 0), { once: true });
}

const ready = document.fonts ? document.fonts.ready : Promise.resolve();

ready.then(async () => {
  buildMenu();
  const inscription = initInscription(lenis);
  if (reduced) {
    await runLoader();
    gsap.set(".menu", { visibility: "hidden" });
    return;
  }
  const mm = gsap.matchMedia();
  header();
  navigation();
  if ($(".hero")) heroScroll();
  if ($("[data-words]")) manifesto();
  reveals();
  if ($(".journey-track")) journey(mm);
  teachings();
  marquees();
  if ($(".talks")) talks();
  articles();
  lumiere();
  videos();
  galerie();
  actualites();
  silsila();
  cursor();
  livre();
  dust();
  ScrollTrigger.refresh();
  // la hauteur de la page peut changer après coup (images, polices) : on recalcule pour ne pas dépasser le pied de page
  // garde-fou : si la page est plus haute que son pied de page (vide sous le footer), on rogne la hauteur du document
  const rogner = () => {
    const f = $(".footer");
    if (!f) return;
    const bas = Math.round(f.getBoundingClientRect().bottom + window.scrollY);
    const doc = document.documentElement.scrollHeight;
    if (doc - bas > 4) {
      document.body.style.height = bas + "px";
      document.body.style.overflow = "clip";
    } else if (document.body.style.overflow === "clip" && doc - bas <= 4) {
      document.body.style.height = document.body.style.overflow = "";
    }
  };
  addEventListener("load", () => { rogner(); setTimeout(rogner, 1500); setTimeout(rogner, 4000); });
  addEventListener("resize", () => setTimeout(rogner, 400));
  addEventListener("orientationchange", () => setTimeout(rogner, 600));
  if (window.ResizeObserver) { let t; new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => { lenis?.resize?.(); ScrollTrigger.refresh(); rogner(); }, 250); }).observe(document.body); }

  const intro = $(".hero") ? heroIntro().pause() : null;
  if (!intro) gsap.from(".header", { y: -40, opacity: 0, duration: 1.1, ease: "expo.out" });
  await runLoader(() => intro?.play());
  lenis?.start();
  if (!retour && !location.hash && scrollY > 0) lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : scrollTo(0, 0);
  if (retour) {
    let y = 0;
    try {
      y = Number(sessionStorage.getItem(cleScroll)) || 0;
    } catch {}
    if (y > 0) {
      ScrollTrigger.refresh();
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else scrollTo(0, y);
    }
  }
  inscription?.verifierHash();
  // arrivée sur une ancre (ex. index.html#ecrits)
  try {
    if (location.hash.length > 1 && location.hash !== "#admin" && $(location.hash)) scrollToTarget(location.hash);
  } catch {}
});

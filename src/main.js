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

function runLoader(onReveal) {
  const loader = $(".loader");
  // le damier est déjà dans la page (script en ligne) : il couvre l'écran dès la première image
  const tiles = $$(".loader-grid span");
  const count = $(".loader-count span");
  const counter = { v: 0 };

  if (reduced || !tiles.length) {
    loader.remove();
    document.body.classList.remove("is-loading");
    return Promise.resolve();
  }

  // les carreaux changent de couleur en continu pendant le chargement
  const remelanger = () =>
    tiles.forEach((t) => {
      if (Math.random() < 0.5)
        gsap.to(t, { backgroundColor: PATCH[Math.floor(Math.random() * PATCH.length)], duration: 0.35, ease: "power1.inOut", overwrite: true });
    });
  const rythme = setInterval(remelanger, 280);

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(rythme);
        loader.remove();
        document.body.classList.remove("is-loading");
        resolve();
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => (count.textContent = Math.round(counter.v)),
    })
      .to(".loader-center", { opacity: 0, scale: 0.94, duration: 0.45, ease: "power2.in" }, ">0.1")
      // le damier se retire en laissant apparaître le site derrière
      .to(tiles, {
        scale: 0,
        rotate: () => gsap.utils.random(-30, 30),
        duration: 0.7,
        ease: "power3.inOut",
        stagger: { each: 0.018, from: "center", grid: "auto" },
      }, ">-0.05")
      .add(() => { clearInterval(rythme); onReveal && onReveal(); }, "<0.1");
  });
}

/* ---------------------------------------------------------
   Intro du hero
   --------------------------------------------------------- */
function heroIntro() {
  const rows = $$(".hero-row");
  const splits = rows.map((r) => new SplitText(r, { type: "chars", charsClass: "char" }));
  const chars = splits.flatMap((s) => s.chars);
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.fromTo(".hero-photo", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "expo.out" }, 0)
    .from(chars, { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.035 }, 0.15)
    .from(".hero-sub", { opacity: 0, y: 24, duration: 1.2 }, 0.8)
    .from(".hero-verse", { opacity: 0, y: 24, duration: 1.2 }, 1)
    .from(".hero-cta", { opacity: 0, y: 20, duration: 1.1 }, 1)
    .from(".hero-scroll", { opacity: 0, y: 20, duration: 1 }, 1)
    .from(".hero-pattern", { opacity: 0, xPercent: -6, duration: 2.6 }, 0.2)
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
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => (el.textContent = Math.round(o.v)),
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
  if (!finePointer) return;
  const float = $(".topic-float");
  const img = $("img", float);
  const xTo = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3" });
  const yTo = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3" });
  let rot = 0;
  let lastX = 0;
  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    rot = gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6);
    lastX = e.clientX;
    gsap.to(float, { rotate: rot, duration: 0.6, ease: "power2.out", overwrite: "auto" });
  });
  $$(".topic").forEach((t) => {
    t.addEventListener("mouseenter", () => {
      img.src = t.dataset.img;
      gsap.to(float, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" });
    });
    t.addEventListener("mouseleave", () => gsap.to(float, { opacity: 0, scale: 0.6, duration: 0.5, ease: "expo.out" }));
  });
}

/* ---------------------------------------------------------
   Marquees (institutions + footer), accélérés par le scroll
   --------------------------------------------------------- */
function marquees() {
  const rows = [...$$(".marquee-row"), $(".footer-track")];
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
      scale: 0.9,
      filter: "brightness(0.35) blur(3px)",
      ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 12%", scrub: true },
    });
  });
  cards.forEach((card) => {
    const img = $("img", card);
    if (img)
      gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 12%", scrub: true } });
  });
  gsap.from(".talks-title", {
    letterSpacing: "0.1em",
    opacity: 0,
    duration: 2,
    ease: "expo.out",
    scrollTrigger: { trigger: ".talks-title", start: "top 85%" },
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
   Livres : arrivée en 3D + inclinaison à la souris
   --------------------------------------------------------- */
function books() {
  const items = $$(".book-3d");
  gsap.from(items, {
    rotateY: -90,
    y: 120,
    opacity: 0,
    duration: 1.6,
    ease: "expo.out",
    stagger: 0.12,
    scrollTrigger: { trigger: ".shelf", start: "top 80%" },
  });
  if (!finePointer) return;
  $$(".book").forEach((book) => {
    const b = $(".book-3d", book);
    book.addEventListener("mousemove", (e) => {
      const r = book.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(b, { rotateY: -6 + px * 30, rotateX: -py * 16, y: -10, duration: 0.6, ease: "power3.out" });
    });
    book.addEventListener("mouseleave", () =>
      gsap.to(b, { rotateY: -28, rotateX: 4, y: 0, duration: 1, ease: "expo.out" })
    );
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
   Galerie : vitesses de parallaxe différentes
   --------------------------------------------------------- */
function gallery(mm) {
  $$(".m").forEach((fig) => {
    gsap.from(fig, {
      clipPath: "inset(30% 30% 30% 30%)",
      duration: 1.6,
      ease: "expo.inOut",
      scrollTrigger: { trigger: fig, start: "top 90%" },
    });
    gsap.to($("img", fig), {
      scale: 1.05,
      ease: "none",
      scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
  mm.add("(min-width: 761px)", () => {
    $$("[data-speed]").forEach((el) =>
      gsap.to(el, {
        y: () => +el.dataset.speed * window.innerHeight,
        ease: "none",
        scrollTrigger: { trigger: ".mosaic", start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      })
    );
  });
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
  const liens = {};
  $$("[data-nav]").forEach((a) => (liens[a.dataset.nav] = a));
  const actif = (id) => {
    $$(".header-nav .is-current").forEach((el) => el.classList.remove("is-current"));
    liens[id]?.classList.add("is-current");
  };
  const sections = { shaykh: "#shaykh", ecrits: "#ecrits", conferences: "#conferences" };
  Object.entries(sections).forEach(([id, sel]) => {
    ScrollTrigger.create({
      trigger: sel,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => (self.isActive ? actif(id) : liens[id]?.classList.remove("is-current")),
    });
  });
}

/* ---------------------------------------------------------
   Menu plein écran (carreaux de la muraqqa'a)
   --------------------------------------------------------- */
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
  $(".menu-btn-label").textContent = "Fermer";
  lenis?.stop();
  menuTl.timeScale(1).play();
}
function closeMenu() {
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");
  $(".menu-btn-label").textContent = "Menu";
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
function dust() {
  const canvas = $(".dust");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h, parts;
  const N = window.innerWidth < 760 ? 40 : 90;
  function resize() {
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.6 + 0.4) * dpr,
      vy: -(Math.random() * 0.25 + 0.05) * dpr,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      a: Math.random() * 0.6 + 0.2,
      t: Math.random() * Math.PI * 2,
    }));
  }
  resize();
  window.addEventListener("resize", resize);
  let scrollV = 0;
  lenis?.on("scroll", (l) => (scrollV = l.velocity));
  gsap.ticker.add(() => {
    if (+canvas.style.opacity === 0) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.t += 0.02;
      p.y += p.vy - scrollV * 0.15 * dpr;
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
  // visible seulement au-dessus des sections sombres
  [".hero", ".manifesto", ".research", ".talks", ".merkez", ".gallery", ".footer"].forEach((sel) =>
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

const ready = document.fonts ? document.fonts.ready : Promise.resolve();

ready.then(async () => {
  buildMenu();
  if (reduced) {
    await runLoader();
    gsap.set(".menu", { visibility: "hidden" });
    return;
  }
  const mm = gsap.matchMedia();
  header();
  navigation();
  heroScroll();
  manifesto();
  reveals();
  journey(mm);
  teachings();
  marquees();
  talks();
  books();
  articles();
  gallery(mm);
  cursor();
  dust();
  ScrollTrigger.refresh();

  const intro = heroIntro().pause();
  await runLoader(() => intro.play());
  lenis?.start();
});

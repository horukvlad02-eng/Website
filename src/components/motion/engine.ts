/**
 * Site motion engine — one module, started once on the client.
 *  - scroll reveals (.reveal) and word-by-word headings (.words) via two IntersectionObservers
 *  - count-up for big stat numbers, line-drawing for big stroke illustrations
 *  - header state (scrolled / hide on scroll down / progress bar) on one rAF-throttled scroll handler
 *  - pointer effects on fine pointers: glass sheen, hero spotlight, magnetic buttons, 3D depth cards
 *  - photos: lazy fill photos fade in over their blurred preview once decoded (one delegated listener)
 * No polling, no MutationObservers: `scan()` is called after every navigation.
 */

const EASE = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const raf = (fn: FrameRequestCallback) => requestAnimationFrame(fn);
const idle = (fn: () => void) => {
  const w = window as Window & typeof globalThis;
  if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(fn, { timeout: 600 });
  else w.setTimeout(fn, 120);
};

let started = false;
let reduce = false;
let coarse = false;
let fine = false;
let revealIO: IntersectionObserver | null = null;
let wordsIO: IntersectionObserver | null = null;
let countIO: IntersectionObserver | null = null;

/* ------------------------------------------------------------ reveal */
function show(el: Element, instant: boolean) {
  if (instant) el.classList.add("is-instant");
  el.classList.add("is-visible");
  window.setTimeout(() => el.classList.add("is-settled"), instant ? 0 : 1500);
}

function assignFx(els: HTMLElement[]) {
  // Batch all reads first, then write attributes.
  const plan: [HTMLElement, string][] = [];
  for (const el of els) {
    if (el.dataset["reveal"] && el.dataset["reveal"] !== "up") continue;
    let host: HTMLElement = el;
    const p0 = el.parentElement;
    if (p0 && p0.children.length === 1 && /^(LI|DIV)$/.test(p0.tagName) && p0.parentElement)
      host = p0;
    const p = host.parentElement;
    if (!p) continue;
    const kids = Array.prototype.filter.call(
      p.children,
      (c: Element) =>
        c === host || c.classList.contains("reveal") || !!c.querySelector(":scope > .reveal"),
    ) as Element[];
    const display = getComputedStyle(p).display;
    if (kids.length >= 3 && (display === "grid" || display === "flex")) plan.push([el, "card"]);
    else if (kids.length === 2 && display === "grid")
      plan.push([el, kids.indexOf(host) === 0 ? "left" : "right"]);
  }
  for (const [el, fx] of plan) el.dataset["fx"] = fx;
}

function scanReveals() {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-mv])"));
  if (!els.length) return;
  if (!reduce) assignFx(els);
  for (const el of els) {
    el.dataset["mv"] = "1";
    if (reduce || !revealIO) show(el, true);
    else revealIO.observe(el);
  }
}

function scanWords() {
  const els = document.querySelectorAll<HTMLElement>(".words:not([data-mv])");
  els.forEach((el) => {
    el.dataset["mv"] = "1";
    if (reduce || !wordsIO) el.classList.add("mv-in");
    else wordsIO.observe(el);
  });
}

/* ------------------------------------------------------------ count-up */
type CountState = { node: Text; val: number; dec: number; plus: string; orig: string };
const counts = new WeakMap<Element, CountState>();

function scanCounters() {
  if (reduce || !countIO) return;
  const re = /^(\d+(?:\.\d+)?)(\+?)$/;
  document
    .querySelectorAll<HTMLElement>(
      "main .font-display:not([data-mvc]), main .tabular-nums:not([data-mvc])",
    )
    .forEach((el) => {
      el.dataset["mvc"] = "1";
      if (el.children.length) return;
      const node = el.firstChild;
      if (!node || node.nodeType !== 3) return;
      const m = re.exec((node.nodeValue || "").trim());
      if (!m) return;
      const num = m[1] ?? "";
      const val = parseFloat(num);
      if (!(val > 1)) return;
      if (parseFloat(getComputedStyle(el).fontSize) < 40) return;
      counts.set(el, {
        node: node as Text,
        val,
        dec: (num.split(".")[1] || "").length,
        plus: m[2] ?? "",
        orig: node.nodeValue || "",
      });
      countIO!.observe(el);
    });
}

function runCount(el: Element) {
  const c = counts.get(el);
  if (!c) return;
  let t0 = 0;
  const dur = 1500;
  const step = (ts: number) => {
    if (!t0) t0 = ts;
    const p = Math.min(1, (ts - t0) / dur);
    c.node.nodeValue = (c.val * EASE(p)).toFixed(c.dec) + c.plus;
    if (p < 1) raf(step);
    else c.node.nodeValue = c.orig;
  };
  c.node.nodeValue = (0).toFixed(c.dec) + c.plus;
  raf(step);
}

/* ------------------------------------------------------------ line drawings */
function prepDraw(svg: SVGSVGElement, cls: string) {
  let k = 0;
  svg.querySelectorAll("path, rect, circle, line, polyline").forEach((n) => {
    n.setAttribute("pathLength", "1");
    (n as SVGElement).style.setProperty("--k", String(k++));
  });
  svg.classList.add(cls);
}

function scanDrawings() {
  if (reduce) return;
  document.querySelectorAll<SVGSVGElement>(".reveal svg:not([data-mvd])").forEach((svg) => {
    svg.dataset["mvd"] = "1";
    if (svg.closest(".hero-zone") || svg.classList.contains("lucide")) return;
    const r = svg.getBoundingClientRect();
    const big = r.width > 260 && r.height > 160;
    const strokes = svg.querySelectorAll("path[stroke], g[stroke] path, line").length > 6;
    if (big && strokes) prepDraw(svg, "draw-on-reveal");
  });
}

/* ------------------------------------------------------------ photos */
// Once a photo is on screen its blurred SVG preview is never seen again, but it would still be
// painted under the photo on every repaint (an SVG blur filter is costly to raster on phones):
// drop it after the fade-in.
function dropPreview(img: HTMLImageElement) {
  const ph = img.previousElementSibling;
  if (ph instanceof HTMLElement && ph.classList.contains("img-ph"))
    setTimeout(() => (ph.style.display = "none"), 900);
  if (img.style.backgroundImage) img.style.backgroundImage = "none";
}
function markLoaded(img: HTMLImageElement) {
  if (img.hasAttribute("data-loaded")) return;
  const done = () => {
    img.setAttribute("data-loaded", "");
    dropPreview(img);
  };
  // Decode off the main thread first so the fade never stalls on a big image.
  if (img.naturalWidth && typeof img.decode === "function") img.decode().then(done, done);
  else done();
}
function onImgEvent(e: Event) {
  const t = e.target;
  if (!(t instanceof HTMLImageElement)) return;
  if (t.hasAttribute("data-fade")) markLoaded(t);
  else if (e.type === "load" && t.classList.contains("img-bg")) dropPreview(t);
}
function scanImages() {
  document
    .querySelectorAll<HTMLImageElement>("img[data-fade]:not([data-loaded])")
    .forEach((img) => img.complete && markLoaded(img));
  document
    .querySelectorAll<HTMLImageElement>("img.img-bg:not([data-fade])")
    .forEach((img) => img.complete && img.naturalWidth && dropPreview(img));
}

/* ------------------------------------------------------------ header + scroll */
let header: HTMLElement | null = null;
let progress: HTMLElement | null = null;
let heroImg: HTMLElement | null = null;
let supportsTimeline = false;
let lastY = 0;
let acc = 0;
let hidden = false;
let scrollQueued = false;
let maxScroll = 1;

function measure() {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

function onScrollFrame() {
  scrollQueued = false;
  const y = window.scrollY || 0;
  if (header) {
    header.classList.toggle("is-scrolled", y > 12);
    const d = y - lastY;
    const menuOpen = document.documentElement.classList.contains("menu-open");
    // Phones (and in-app browsers like Telegram/Instagram, which add their own bars) have little
    // vertical room: tuck the header away almost immediately; desktop keeps the calmer threshold.
    const narrow = window.innerWidth < 1024;
    const top = narrow ? 90 : 420;
    if (reduce || y < top || menuOpen || header.contains(document.activeElement)) {
      acc = 0;
      if (hidden) {
        hidden = false;
        header.classList.remove("is-hidden");
      }
    } else {
      acc = d > 0 === acc >= 0 ? acc + d : d;
      if (!hidden && acc > (narrow ? 12 : 60)) {
        hidden = true;
        header.classList.add("is-hidden");
      } else if (hidden && acc < (narrow ? -48 : -24)) {
        hidden = false;
        header.classList.remove("is-hidden");
      }
    }
  }
  lastY = y;
  if (progress) progress.style.transform = `scaleX(${Math.min(1, y / maxScroll).toFixed(4)})`;
  if (heroImg && !supportsTimeline && !reduce) {
    const p = Math.min(1, Math.max(0, y / Math.max(1, window.innerHeight * 0.9)));
    heroImg.style.transform = `translate3d(0,${(p * 6).toFixed(2)}vh,0)`;
  }
}
/** Bring the header back right away (e.g. the menu opens while it is tucked away). */
export function revealHeader() {
  acc = 0;
  hidden = false;
  document.querySelector("header.site-header")?.classList.remove("is-hidden");
}
function onScroll() {
  if (scrollQueued) return;
  scrollQueued = true;
  raf(onScrollFrame);
}

/* ------------------------------------------------------------ pointer: depth cards */
type Depth = {
  el: HTMLElement;
  glare: HTMLElement;
  img: HTMLElement | null;
  chips: HTMLElement[];
  over: boolean;
  pressed: boolean;
  maxDeg: number;
  c: V10; // rx, ry, lift, sc, ga, z, gx, gy, px, py
  t: V10;
};
type V10 = [number, number, number, number, number, number, number, number, number, number];
const REST: V10 = [0, 0, 0, 1, 0, 0, 50, 50, 0, 0];
const depthMap = new WeakMap<HTMLElement, Depth>();
const moving = new Set<Depth>();
let loopOn = false;
let lastTs = 0;

function depthFor(card: HTMLElement): Depth | null {
  let s = depthMap.get(card);
  if (s) return s;
  if (card.closest('[role="slider"], .acc-item')) return null;
  const r = card.getBoundingClientRect();
  if (r.width < 200 || r.height < 140) return null;
  const img =
    card.querySelector<HTMLElement>(".img-zoom img") || card.querySelector<HTMLElement>("img");
  const chips: HTMLElement[] = [];
  if (img) {
    const frame = img.closest(".img-zoom") || img.parentElement;
    frame?.querySelectorAll<HTMLElement>(".absolute").forEach((el) => {
      if (!el.contains(img)) chips.push(el);
    });
  }
  const glare = document.createElement("span");
  glare.className = "depth-glare";
  glare.setAttribute("aria-hidden", "true");
  card.appendChild(glare);
  if (getComputedStyle(card).position === "static") card.style.position = "relative";
  s = {
    el: card,
    glare,
    img,
    chips,
    over: false,
    pressed: false,
    maxDeg: Math.min(11, Math.max(3, (11 * 380) / r.width)),
    c: [...REST],
    t: [...REST],
  };
  depthMap.set(card, s);
  return s;
}

function aim(s: Depth, e: PointerEvent) {
  const b = s.el.getBoundingClientRect();
  if (!b.width || !b.height) return;
  const x = Math.min(1, Math.max(0, (e.clientX - b.left) / b.width));
  const y = Math.min(1, Math.max(0, (e.clientY - b.top) / b.height));
  const nx = x - 0.5;
  const ny = y - 0.5;
  s.t[1] = nx * 2 * s.maxDeg;
  s.t[0] = -ny * 2 * s.maxDeg * 0.8;
  s.t[6] = x * 100;
  s.t[7] = y * 100;
  s.t[8] = nx * 2;
  s.t[9] = ny * 2;
}
function pose(s: Depth) {
  s.t[2] = s.pressed ? 3.2 : 8;
  s.t[3] = s.pressed ? 0.975 : 1.02;
  s.t[4] = 1;
  s.t[5] = 1;
}
function release(s: Depth) {
  s.over = false;
  s.pressed = false;
  const [g6, g7] = [s.t[6], s.t[7]];
  s.t = [...REST];
  s.t[6] = g6;
  s.t[7] = g7;
  wake(s);
}
function wake(s: Depth) {
  moving.add(s);
  if (!loopOn) {
    loopOn = true;
    lastTs = 0;
    raf(tick);
  }
}
function paint(s: Depth) {
  const [rx, ry, lift, sc, ga, z, gx, gy, px, py] = s.c;
  s.el.style.transform = `perspective(1000px) translate3d(0,${(-lift).toFixed(2)}px,0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${sc.toFixed(4)})`;
  s.el.style.setProperty("--ga", ga.toFixed(3));
  s.el.style.setProperty("--gx", gx.toFixed(1) + "%");
  s.el.style.setProperty("--gy", gy.toFixed(1) + "%");
  if (s.img) {
    s.img.style.scale = (1 + 0.06 * z).toFixed(4);
    s.img.style.translate = `${(-px * 8 * z).toFixed(2)}px ${(-py * 8 * z).toFixed(2)}px`;
  }
  for (const c of s.chips) c.style.translate = `${(px * 7).toFixed(2)}px ${(py * 7).toFixed(2)}px`;
}
function restStyles(s: Depth) {
  s.el.style.transform = "";
  s.el.style.removeProperty("--ga");
  s.el.removeAttribute("data-depth-live");
  if (s.img) {
    s.img.style.scale = "";
    s.img.style.translate = "";
  }
  for (const c of s.chips) c.style.translate = "";
}
function tick(ts: number) {
  const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 1 / 60;
  lastTs = ts;
  moving.forEach((s) => {
    const k = 1 - Math.exp(-(s.over ? 11 : 7) * dt);
    let still = true;
    for (let i = 0; i < s.c.length; i++) {
      const cur = s.c[i]!;
      const tgt = s.t[i]!;
      s.c[i] = cur + (tgt - cur) * k;
      if (Math.abs(tgt - s.c[i]!) > 0.002) still = false;
    }
    if (still && !s.over) {
      moving.delete(s);
      s.c = [...REST];
      restStyles(s);
    } else paint(s);
  });
  if (moving.size) raf(tick);
  else loopOn = false;
}

/* ------------------------------------------------------------ pointer: everything */
let ptrQueued = false;
let ptrEvent: PointerEvent | null = null;
let magEl: HTMLElement | null = null;
let depthEl: Depth | null = null;
const MAG_SEL =
  '.btn-primary, a[class*="bg-brand"]:not([class*="bg-brand/"]), button[class*="bg-brand"]:not([class*="bg-brand/"])';

function engage(s: Depth, e: PointerEvent) {
  if (s.el.classList.contains("reveal") && !s.el.classList.contains("is-settled")) return;
  s.over = true;
  s.el.setAttribute("data-depth-live", "");
  aim(s, e);
  pose(s);
  wake(s);
}

function pointerFrame() {
  ptrQueued = false;
  const e = ptrEvent;
  if (!e) return;
  const target = e.target as Element | null;
  if (!target || !target.closest) return;

  // glass sheen
  const glass = target.closest<HTMLElement>(".glass-interactive");
  if (glass) {
    const r = glass.getBoundingClientRect();
    if (r.width && r.height) {
      glass.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      glass.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    }
  }
  // hero spotlight
  const hero = target.closest<HTMLElement>(".hero-zone");
  if (hero) {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--sx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--sy", `${e.clientY - r.top}px`);
  }
  // magnetic buttons
  const mag = target.closest<HTMLElement>(MAG_SEL);
  if (magEl && magEl !== mag) {
    magEl.removeAttribute("data-mag-live");
    magEl.style.transform = "";
    magEl = null;
  }
  if (mag) {
    const r = mag.getBoundingClientRect();
    if (r.width >= 90) {
      mag.classList.add("mag");
      mag.setAttribute("data-mag-live", "");
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      mag.style.transform = `translate3d(${(dx * 10).toFixed(1)}px,${(dy * 8).toFixed(1)}px,0)`;
      magEl = mag;
    }
  }
  // depth cards
  const card = target.closest<HTMLElement>(".glass-interactive.group");
  const s = card ? depthFor(card) : null;
  if (depthEl && depthEl !== s) {
    release(depthEl);
    depthEl = null;
  }
  if (s) {
    if (!s.over) engage(s, e);
    else {
      aim(s, e);
      wake(s);
    }
    depthEl = s;
  }
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerType === "touch" || reduce) return;
  ptrEvent = e;
  if (!ptrQueued) {
    ptrQueued = true;
    raf(pointerFrame);
  }
}
function onPointerLeaveDoc() {
  if (magEl) {
    magEl.removeAttribute("data-mag-live");
    magEl.style.transform = "";
    magEl = null;
  }
  if (depthEl) {
    release(depthEl);
    depthEl = null;
  }
}
// Touch: cards lean under the finger until the page starts to scroll (not on phones: the lean
// starts a per-frame loop at the exact moment a scroll gesture begins).
function onPointerDown(e: PointerEvent) {
  if (reduce || (coarse && e.pointerType !== "mouse")) return;
  const card = (e.target as Element | null)?.closest?.<HTMLElement>(".glass-interactive.group");
  const s = card ? depthFor(card) : null;
  if (!s) return;
  s.pressed = true;
  engage(s, e);
  if (e.pointerType === "touch") depthEl = s;
}
function onPointerUp(e: PointerEvent) {
  if (!depthEl) return;
  depthEl.pressed = false;
  if (e.pointerType === "touch") {
    release(depthEl);
    depthEl = null;
  } else if (depthEl.over) {
    pose(depthEl);
    wake(depthEl);
  }
}
function onPointerCancel() {
  if (depthEl) {
    release(depthEl);
    depthEl = null;
  }
}

/* ------------------------------------------------------------ public API */
export function startMotion() {
  if (started || typeof window === "undefined") return;
  started = true;
  (window as Window & { __mv?: boolean }).__mv = true;
  const rq = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduce = rq.matches;
  rq.addEventListener?.("change", (e) => (reduce = e.matches));
  // Mouse/trackpad only. Phones with a stylus (Galaxy S Ultra) report a fine pointer too, but
  // their touch screen (any-pointer: coarse) must not run the per-move 3D card effects.
  coarse = window.matchMedia("(any-pointer: coarse)").matches;
  fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !coarse;
  try {
    supportsTimeline = CSS.supports("animation-timeline: scroll()");
  } catch {
    supportsTimeline = false;
  }

  if ("IntersectionObserver" in window) {
    revealIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            show(en.target, false);
            revealIO!.unobserve(en.target);
          } else if (en.boundingClientRect.bottom < 0) {
            show(en.target, true);
            revealIO!.unobserve(en.target);
          }
        }
      },
      // Huge top margin: anything already above the viewport counts as seen, so a fast fling that
      // jumps clean over a short element (below -> above in one frame) still reveals it.
      { rootMargin: "100000px 0px -6% 0px", threshold: 0.01 },
    );
    wordsIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting || en.boundingClientRect.bottom < 0) {
            en.target.classList.add("mv-in");
            wordsIO!.unobserve(en.target);
          }
        }
      },
      { threshold: 0.35, rootMargin: "100000px 0px -8% 0px" },
    );
    countIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          countIO!.unobserve(en.target);
          runCount(en.target);
        }
      },
      { threshold: 0.6 },
    );
  }

  document.addEventListener("load", onImgEvent, true);
  document.addEventListener("error", onImgEvent, true);
  window.addEventListener("scroll", onScroll, { passive: true });
  // Mobile browsers fire resize every time the address bar slides in or out during a scroll;
  // measuring (a forced layout) is batched into one frame instead of running on each event.
  let resizeQueued = false;
  window.addEventListener(
    "resize",
    () => {
      if (resizeQueued) return;
      resizeQueued = true;
      raf(() => {
        resizeQueued = false;
        measure();
        onScroll();
      });
    },
    { passive: true },
  );
  window.addEventListener("load", () => measure(), { once: true });
  if (fine) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveDoc);
  }
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerCancel, { passive: true });
}

/** Pick up everything in the current page. Call after mount and after every navigation. */
export function scan() {
  if (!started) return;
  header = document.querySelector<HTMLElement>("header.site-header");
  progress = document.querySelector<HTMLElement>(".scroll-progress");
  heroImg = document.querySelector<HTMLElement>(".hero-photo-inner > img");
  if (heroImg && !supportsTimeline && !reduce) {
    heroImg.parentElement!.style.transform = "scale(1.08)";
    heroImg.style.willChange = "transform";
  }
  scanImages();
  scanReveals();
  scanWords();
  measure();
  onScrollFrame();
  idle(() => {
    scanCounters();
    scanDrawings();
    measure();
  });
}

let scanQueued = false;
/** Batched re-scan for content mounted after navigation (filters, widgets, accordions). */
export function requestScan() {
  if (scanQueued || !started) return;
  scanQueued = true;
  raf(() => {
    scanQueued = false;
    scan();
  });
}

/**
 * Site motion engine — one module, started once on the client.
 *  - scroll reveals (.reveal) and word-by-word headings (.words) via two IntersectionObservers
 *  - count-up for big stat numbers, line-drawing for big stroke illustrations
 *  - header state (scrolled / hide on scroll down) on one rAF-throttled scroll handler
 *  - pointer effects on fine pointers: glass sheen, hero spotlight, magnetic buttons, 3D depth cards
 *  - photos: lazy fill photos fade in over their blurred preview once decoded (one delegated listener)
 * No polling, no MutationObservers: `scan()` is called after every navigation.
 *
 * Performance notes (measured on a 6x-throttled phone profile):
 *  - The scroll-progress bar used to be rewritten every frame with `style.transform`. That single
 *    write invalidated the whole document's style (320 extra recalcs per 9000px of scroll) and was
 *    the single largest source of main-thread time during scroll. It now runs on a CSS
 *    scroll-driven animation (`animation-timeline: scroll(root)`) where supported, with a throttled
 *    JS fallback (~10Hz) for older engines.
 *  - The 3D depth effect used to be disabled on touch devices. It is back, but only as a
 *    press-and-hold gesture that yields immediately to scrolling, so it can never fight a scroll.
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
/** Phone mode (html.phone, set by the boot script): no entrance animations or pointer effects. */
let phone = false;
const calm = () => reduce || phone;
let coarse = false;
let fine = false;
let revealIO: IntersectionObserver | null = null;
let wordsIO: IntersectionObserver | null = null;
let countIO: IntersectionObserver | null = null;

/* ------------------------------------------------------------ reveal */
/**
 * "Settled" bookkeeping.
 *
 * Every reveal used to schedule its own 1.5s timer that flipped a class on the element. A home
 * page with 60 reveals therefore fired 60 timers and 60 style recalcs scattered across the
 * scroll — measurable main-thread work on a phone. The timers are now batched: one scheduler
 * tracks when each element settled and flips the classes in one pass per frame, so the timing
 * per element is unchanged but the cost is one recalc instead of dozens.
 */
type Pending = { el: Element; at: number };
let pending: Pending[] = [];
let settleTimer = 0;

function flushSettled() {
  settleTimer = 0;
  const now = performance.now();
  const due: Element[] = [];
  const rest: Pending[] = [];
  for (const p of pending) {
    if (p.at <= now) due.push(p.el);
    else rest.push(p);
  }
  pending = rest;
  // One class change per element, but all in the same task, so the browser recalculates once.
  for (const el of due) el.classList.add("is-settled");
  if (pending.length) scheduleSettle();
}

function scheduleSettle() {
  if (settleTimer) return;
  const next = pending.reduce((min, p) => Math.min(min, p.at), Infinity);
  const delay = Math.max(16, next - performance.now());
  settleTimer = window.setTimeout(flushSettled, delay);
}

function show(el: Element, instant: boolean) {
  if (instant) el.classList.add("is-instant");
  el.classList.add("is-visible");
  pending.push({ el, at: performance.now() + (instant ? 0 : 1500) });
  scheduleSettle();
}

function assignFx(els: HTMLElement[]) {
  // Batch all reads first, then write attributes.
  const plan: [HTMLElement, string][] = [];
  // getComputedStyle is a read that can force a style recalc, so it is called once per unique
  // parent instead of once per element (siblings share a parent and therefore a display value).
  const displayCache = new Map<Element, string>();
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
    let display = displayCache.get(p);
    if (display === undefined) {
      display = getComputedStyle(p).display;
      displayCache.set(p, display);
    }
    if (kids.length >= 3 && (display === "grid" || display === "flex")) plan.push([el, "card"]);
    else if (kids.length === 2 && display === "grid")
      plan.push([el, kids.indexOf(host) === 0 ? "left" : "right"]);
  }
  for (const [el, fx] of plan) el.dataset["fx"] = fx;
}

function scanReveals() {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-mv])"));
  if (!els.length) return;
  if (phone) return; // phone mode: no hidden states at all, nothing to reveal
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
    if (calm() || !wordsIO) el.classList.add("mv-in");
    else wordsIO.observe(el);
  });
}

/* ------------------------------------------------------------ count-up */
type CountState = { node: Text; val: number; dec: number; plus: string; orig: string };
const counts = new WeakMap<Element, CountState>();

function scanCounters() {
  if (calm() || !countIO) return;
  const re = /^(\d+(?:\.\d+)?)(\+?)$/;
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main .font-display:not([data-mvc]), main .tabular-nums:not([data-mvc])",
    ),
  );
  if (!candidates.length) return;
  // Only plain numbers can count up: filter on text first (cheap), so getComputedStyle (which
  // forces a style recalc of the freshly rendered page) runs for a handful of elements, not all.
  const numeric = candidates.map(
    (el) => !el.children.length && re.test((el.firstChild?.nodeValue || "").trim()),
  );
  const sizes = candidates.map((el, i) =>
    numeric[i] ? parseFloat(getComputedStyle(el).fontSize) : 0,
  );
  candidates.forEach((el, i) => {
    el.dataset["mvc"] = "1";
    if (el.children.length) return;
    const node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    const m = re.exec((node.nodeValue || "").trim());
    if (!m) return;
    const num = m[1] ?? "";
    const val = parseFloat(num);
    if (!(val > 1)) return;
    if (sizes[i]! < 40) return;
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
  if (calm()) return;
  const svgs = Array.from(document.querySelectorAll<SVGSVGElement>(".reveal svg:not([data-mvd])"));
  if (!svgs.length) return;
  // getBoundingClientRect forces a layout, so all rects are read before anything is written.
  const rects = svgs.map((svg) => {
    const r = svg.getBoundingClientRect();
    return { w: r.width, h: r.height };
  });
  svgs.forEach((svg, i) => {
    svg.dataset["mvd"] = "1";
    if (svg.closest(".hero-zone") || svg.classList.contains("lucide")) return;
    const big = rects[i]!.w > 260 && rects[i]!.h > 160;
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
let heroImg: HTMLElement | null = null;
let supportsTimeline = false;
/** The progress bar runs on a CSS scroll-driven animation where supported; this is the fallback. */
let progressFallback = false;
let progressEl: HTMLElement | null = null;
let lastProgress = -1;
let lastProgressAt = 0;
let lastY = 0;
let acc = 0;
let hidden = false;
let scrollQueued = false;
let maxScroll = 1;

function measure() {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

/**
 * Progress bar without touching the DOM on every frame.
 *
 * The old implementation wrote `progress.style.transform` on every scroll frame. Because the bar
 * lives inside a backdrop-filtered header, that write invalidated the blurred layer and the whole
 * document's style: measured 320 extra style recalcs per 9000px of scroll on a 6x-throttled phone
 * profile (main-thread task time 4.2s -> 1.3s once removed).
 *
 * Now: where the browser supports `animation-timeline: scroll(root)` the bar is driven entirely by
 * CSS (styles.css), so JavaScript never touches it. Everywhere else (Safari < 26, older Firefox)
 * the JS fallback updates it at most every 100ms and only when the value actually changed.
 */
function paintProgress(y: number, now: number) {
  if (!progressFallback || !progressEl) return;
  const p = Math.min(1, y / maxScroll);
  // Quantise to whole percent: below that the bar does not visibly move.
  const q = Math.round(p * 100);
  if (q === lastProgress) return;
  if (now - lastProgressAt < 100) return;
  lastProgress = q;
  lastProgressAt = now;
  progressEl.style.transform = `scaleX(${(q / 100).toFixed(2)})`;
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
  paintProgress(y, performance.now());
  if (heroImg && !supportsTimeline && !calm()) {
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
    if (still) {
      // Every value has reached its target: stop animating this card.
      moving.delete(s);
      if (s.over) {
        // Still hovered: keep the last pose painted, but stop the loop until the pointer moves.
        // (The old code kept the loop running for as long as the pointer rested on the card.)
        paint(s);
      } else {
        s.c = [...REST];
        restStyles(s);
      }
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
  if (e.pointerType === "touch" || calm()) return;
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

/* --- touch: press-and-hold 3D ---------------------------------------------------
 * The 3D tilt used to be switched off entirely on touch devices, which is why the cards looked
 * flat on a phone. The reason it was switched off: on pointerdown the old code started a
 * per-frame loop at the exact moment a scroll gesture begins, and that loop fought the scroll.
 *
 * The fix is a press-and-hold gesture instead of an instant one:
 *   - the tilt only engages after the finger has been held still for HOLD_MS,
 *   - any scroll or finger movement cancels it immediately,
 *   - lifting the finger releases it.
 * So a tap still shows the 3D card, and a flick-scroll never starts the loop at all.
 */
const HOLD_MS = 180;
/** Movement (px) that turns a press into a scroll gesture. */
const HOLD_SLOP = 12;
let holdTimer = 0;
let holdStart: { x: number; y: number } | null = null;
let holdCard: Depth | null = null;
/** The card currently held down by a finger (after the hold delay). */
let touchDepth: Depth | null = null;

function clearHold() {
  if (holdTimer) {
    clearTimeout(holdTimer);
    holdTimer = 0;
  }
  holdStart = null;
  if (holdCard) {
    release(holdCard);
    holdCard = null;
  }
  if (touchDepth) {
    touchDepth.pressed = false;
    release(touchDepth);
    touchDepth = null;
  }
}

function onPointerDown(e: PointerEvent) {
  if (calm()) return;
  const card = (e.target as Element | null)?.closest?.<HTMLElement>(".glass-interactive.group");
  const s = card ? depthFor(card) : null;
  if (!s) return;
  if (e.pointerType === "mouse" || e.pointerType === "pen") {
    s.pressed = true;
    engage(s, e);
    if (e.pointerType !== "mouse") depthEl = s;
    return;
  }
  // Touch: wait for a press-and-hold before engaging.
  clearHold();
  holdCard = s;
  holdStart = { x: e.clientX, y: e.clientY };
  holdTimer = window.setTimeout(() => {
    holdTimer = 0;
    const h = holdCard;
    holdCard = null;
    if (!h) return;
    h.pressed = true;
    touchDepth = h;
    depthEl = h;
    engage(h, e);
  }, HOLD_MS);
}
function onPointerMoveTouch(e: PointerEvent) {
  if (e.pointerType !== "touch") return;
  if (holdStart) {
    // Movement means the user is scrolling, not pressing.
    if (
      Math.abs(e.clientX - holdStart.x) > HOLD_SLOP ||
      Math.abs(e.clientY - holdStart.y) > HOLD_SLOP
    ) {
      clearHold();
      return;
    }
  }
  // Once the press-and-hold has engaged, the card follows the finger.
  if (touchDepth && depthEl === touchDepth) {
    aim(touchDepth, e);
    wake(touchDepth);
  }
}
function onPointerUp(e: PointerEvent) {
  if (e.pointerType === "touch") {
    clearHold();
    if (!depthEl) return;
    depthEl.pressed = false;
    release(depthEl);
    depthEl = null;
    return;
  }
  if (!depthEl) return;
  depthEl.pressed = false;
  if (e.pointerType === "mouse") {
    if (depthEl.over) {
      pose(depthEl);
      wake(depthEl);
    }
  } else if (depthEl.over) {
    pose(depthEl);
    wake(depthEl);
  }
}
function onPointerCancel() {
  clearHold();
  if (depthEl) {
    release(depthEl);
    depthEl = null;
  }
}

/* ------------------------------------------------------------ public API */
/* Back/forward navigation: the visitor has already seen this page, and the router restores their
   scroll position. Replaying every entrance animation there reads as a blank screen followed by a
   fade-in (the "lag" when coming back), so for a moment after popstate everything in view shows
   at once, headings included, and number counters keep their final value. */
let instantUntil = 0;
const isReturning = () => performance.now() < instantUntil;

export function startMotion() {
  if (started || typeof window === "undefined") return;
  started = true;
  window.addEventListener("popstate", () => (instantUntil = performance.now() + 1200));
  (window as Window & { __mv?: boolean }).__mv = true;
  phone = document.documentElement.classList.contains("phone");
  const rq = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduce = rq.matches;
  rq.addEventListener?.("change", (e) => (reduce = e.matches));
  // Hover-driven effects (sheen, spotlight, magnetic buttons, the depth tilt under a mouse)
  // only run for a real hovering pointer. A phone with a stylus reports a fine pointer, but its
  // touch screen must not run the per-move effects, so `any-pointer: coarse` disqualifies it.
  coarse = window.matchMedia("(any-pointer: coarse)").matches;
  fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !coarse;
  try {
    supportsTimeline = CSS.supports("animation-timeline: scroll()");
  } catch {
    supportsTimeline = false;
  }
  // The progress bar is driven by CSS where scroll-driven animations exist; otherwise JS updates
  // it at ~10Hz. styles.css applies the CSS animation behind the same @supports gate.
  progressFallback = !supportsTimeline;
  document.documentElement.classList.toggle("mv-no-sda", progressFallback);

  if ("IntersectionObserver" in window) {
    revealIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            show(en.target, isReturning());
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
            if (isReturning()) en.target.classList.add("mv-instant");
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
          if (!isReturning()) runCount(en.target);
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
  // The press-and-hold 3D tilt is available on every device, including phones.
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointermove", onPointerMoveTouch, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerCancel, { passive: true });
  // A scroll always cancels a pending press: the gesture was a scroll, not a press.
  window.addEventListener("scroll", clearHold, { passive: true });
}

/** Pick up everything in the current page. Call after mount and after every navigation. */
/* Pinned header. iOS 26 (Safari, and in-app browsers such as Telegram) draws the page under its
   floating, translucent address bar, so content scrolling between that bar and the pinned header
   showed through and the header looked detached. While the header is pinned, a "curtain" in the
   header colour (header::before in styles.css) extends up under the browser bar so the two read as
   one surface. One IntersectionObserver on a sentinel just above the header; no scroll work. */
let stickIO: IntersectionObserver | null = null;
function watchStuck() {
  stickIO?.disconnect();
  const sentinel = document.querySelector(".header-sentinel");
  if (!sentinel || !header || !("IntersectionObserver" in window)) return;
  const h = header;
  stickIO = new IntersectionObserver(([en]) => {
    if (!en) return;
    h.classList.toggle("is-stuck", !en.isIntersecting && en.boundingClientRect.top < 0);
  });
  stickIO.observe(sentinel);
}

export function scan() {
  if (!started) return;
  header = document.querySelector<HTMLElement>("header.site-header");
  watchStuck();
  progressEl = document.querySelector<HTMLElement>(".scroll-progress");
  heroImg = document.querySelector<HTMLElement>(".hero-photo-inner > img");
  if (heroImg && !supportsTimeline && !calm()) {
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

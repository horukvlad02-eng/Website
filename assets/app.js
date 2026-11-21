/* EaDo Family Dental — concept redesign. One small engine, no dependencies. */
(() => {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* Settings: edit these when the site goes live                      */
  /* ---------------------------------------------------------------- */
  const SITE = Object.assign(
    {
      demo: true, // concept mode: shows the "not the official website" banner
      phone: "713-474-2334",
      timeZone: "America/Chicago",
      // 0 = Sunday … 6 = Saturday. [open, close] in 24h, half hours as .5
      hours: { 0: null, 1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 16], 6: null },
      leadsUrl: "/api/lead",
    },
    window.SITE || {},
  );
  const T = ((window.I18N && window.I18N.strings) || {});
  const LANG = document.documentElement.lang === "es" ? "es" : "en";
  const t = (key, fallback) => (T[key] !== undefined ? T[key] : fallback);
  const esc = (str) =>
    String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const BOOK_URL = document.documentElement.lang === "es" ? "/es/book" : "/book";
  const tpl = (key, vars, fallback) =>
    t(key, fallback).replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ""));

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DAY_NAMES = t("days", ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
  const MONTHS = t("months", ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
  const BENEFITS_HREF = document.querySelector("#comfort") ? "#comfort" : LANG === "es" ? "/es/comfort-and-payment/" : "/comfort-and-payment/";
  const store = {
    get(k) {
      try {
        return sessionStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        sessionStorage.setItem(k, v);
      } catch {}
    },
    setLocal(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch {}
    },
  };

  /* ---------------------------------------------------------------- */
  /* Clinic clock (always Houston time, whatever the visitor's zone)   */
  /* ---------------------------------------------------------------- */
  function houstonNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: SITE.timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const g = (t) => Number(parts.find((p) => p.type === t)?.value);
    const y = g("year"),
      m = g("month"),
      d = g("day"),
      h = g("hour"),
      min = g("minute");
    const stamp = Date.UTC(y, m - 1, d);
    return { y, m, d, h: h + min / 60, stamp, weekday: new Date(stamp).getUTCDay() };
  }
  function fmtTime(h) {
    const hh = Math.floor(h),
      mm = Math.round((h - hh) * 60);
    const suffix = hh >= 12 ? "pm" : "am";
    const base = hh % 12 || 12;
    return mm ? `${base}:${String(mm).padStart(2, "0")} ${suffix}` : `${base} ${suffix}`;
  }
  function openState(hoursMap) {
    const H = hoursMap || SITE.hours;
    const now = houstonNow();
    const today = H[now.weekday];
    if (today && now.h >= today[0] && now.h < today[1]) {
      return { open: true, label: `${t("open_now", "Open now")} · ${t("closes_at", "Closes")} ${fmtTime(today[1])}`, short: `${t("open_now", "Open now")} · ${t("closes_at", "Closes")} ${fmtTime(today[1])}` };
    }
    for (let off = 0; off < 8; off++) {
      const w = (now.weekday + off) % 7,
        hrs = H[w];
      if (!hrs || (off === 0 && now.h >= hrs[0])) continue;
      const when = off === 0 ? t("today", "today") : off === 1 ? t("tomorrow", "tomorrow") : DAY_NAMES[w];
      return {
        open: false,
        label: `${t("closed_now", "Closed")} · ${t("opens_at", "Opens")} ${when} ${fmtTime(hrs[0])}`,
        short: `${t("opens_at", "Opens")} ${when} ${fmtTime(hrs[0])}`,
      };
    }
    return { open: false, label: t("closed_now", "Closed"), short: t("closed_now", "Closed") };
  }
  function benefits() {
    const now = houstonNow();
    const end = Date.UTC(now.y, 11, 31),
      start = Date.UTC(now.y, 0, 1);
    const left = Math.round((end - now.stamp) / 864e5);
    const elapsed = (now.stamp - start) / (end - start);
    return { left, elapsed, year: now.y };
  }

  function paintClock() {
    const st = openState();
    const b = benefits();
    const row = $("[data-status]");
    if (row) {
      const benefitText =
        b.left === 0
          ? tpl("benefits_last", { y: b.year }, `Last day to use ${b.year} dental benefits`)
          : tpl("benefits_chip", { y: b.year, n: b.left }, `${b.year} dental benefits · ${b.left} days left`);
      row.innerHTML =
        `<span class="chip"><span class="dot${st.open ? " is-on" : ""}"></span>${st.label}</span>` +
        `<a class="chip" href="${BENEFITS_HREF}"><svg aria-hidden="true"><use href="#i-gift"/></svg>${benefitText}</a>`;
    }
    (SITE.locations || []).forEach((loc) => {
      const ls = openState(loc.hours);
      $$(`[data-loc-status="${loc.key}"]`).forEach(
        (el) => (el.innerHTML = `<span class="dot${ls.open ? " is-on" : ""}"></span>${ls.open ? ls.label : ls.short}`),
      );
    });
    const days = $("[data-benefit-days]");
    if (days) days.textContent = String(b.left);
    const yr = $("[data-benefit-year]");
    if (yr) yr.textContent = String(b.year);
    const meter = $("[data-benefit-meter]");
    if (meter) meter.style.setProperty("--w", `${Math.round(b.elapsed * 100)}%`);
    const chip = $("[data-hours-chip]");
    if (chip) chip.innerHTML = `<span class="dot${st.open ? " is-on" : ""}"></span>${st.open ? t("open_now", "Open now") : t("closed_now", "Closed now")}`;
    const line = $("[data-open-line]");
    if (line) line.textContent = st.label + ".";
    const wd = houstonNow().weekday;
    $$("[data-hours] tr").forEach((tr) => tr.classList.toggle("today", Number(tr.dataset.d) === wd));
    $$("[data-year]").forEach((el) => (el.textContent = String(houstonNow().y)));
  }
  paintClock();
  setInterval(paintClock, 60000);
  document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && paintClock());

  /* ---------------------------------------------------------------- */
  /* Demo banner                                                       */
  /* ---------------------------------------------------------------- */
  if (SITE.demo) {
    $$("[data-demo-foot]").forEach((el) => (el.hidden = false));
    const banner = $("[data-demo]");
    if (banner && store.get("demo-hidden") !== "1") banner.hidden = false;
    $("[data-demo-close]")?.addEventListener("click", () => {
      banner.hidden = true;
      store.set("demo-hidden", "1");
    });
  }

  /* ---------------------------------------------------------------- */
  /* Header: glass on scroll, tucks away going down, progress line     */
  /* ---------------------------------------------------------------- */
  const header = $("[data-header]");
  const callbar = $("[data-callbar]");
  const progress = $("[data-progress]");
  const cssProgress = CSS.supports("animation-timeline: scroll()");
  let lastY = scrollY,
    ticking = false,
    bookVisible = false;
  function onScroll() {
    ticking = false;
    const y = scrollY;
    const menuOpen = document.documentElement.classList.contains("menu-open");
    header.classList.toggle("is-scrolled", y > 8);
    if (!menuOpen) {
      if (y > 420 && y > lastY + 6) header.classList.add("is-hidden");
      else if (y < lastY - 6 || y < 420) header.classList.remove("is-hidden");
    }
    if (!cssProgress && progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(3) : "0");
    }
    callbar?.classList.toggle("is-on", y > 640 && !bookVisible);
    lastY = y;
  }
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();
  const bookEl = $("#book");
  if (bookEl && "IntersectionObserver" in window) {
    new IntersectionObserver(
      ([e]) => {
        bookVisible = e.isIntersecting;
        onScroll();
      },
      { threshold: 0.15 },
    ).observe(bookEl);
  }

  /* Mobile menu */
  const menuBtn = $("[data-menu-btn]"),
    mnav = $("[data-mnav]"),
    scrim = $("[data-scrim]");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? t("menu_close", "Close menu") : t("menu_open", "Open menu"));
    mnav.dataset.open = String(open);
    scrim.dataset.open = String(open);
    document.documentElement.classList.toggle("menu-open", open);
    if (open) {
      header.classList.remove("is-hidden");
      fitMenu();
      const sheet = $(".mnav-sheet", mnav);
      if (sheet) sheet.scrollTop = 0;
    }
  }
  // The sheet hangs under the header, which may sit lower than the top of the screen
  // (demo banner, top bar). Size it to the space that is really left, so it can scroll
  // to the last item instead of running off the bottom of a locked page.
  function fitMenu() {
    const sheet = $(".mnav-sheet", mnav);
    if (!sheet) return;
    const top = header.getBoundingClientRect().bottom + 8;
    sheet.style.maxHeight = Math.max(240, window.innerHeight - top - 12) + "px";
  }
  addEventListener("resize", () => mnav.dataset.open === "true" && fitMenu(), { passive: true });
  menuBtn?.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  scrim?.addEventListener("click", () => setMenu(false));
  $$("a", mnav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width: 1024px)").addEventListener?.("change", (e) => e.matches && setMenu(false));

  /* ---------------------------------------------------------------- */
  /* Light / dark theme. Light (cream) is always the default; the choice */
  /* is remembered on this device. The <head> applies it before paint.  */
  /* ---------------------------------------------------------------- */
  const themeBtns = $$("[data-theme-toggle]");
  const themeMeta = $('meta[name="theme-color"]');
  function paintTheme() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeBtns.forEach((b) => {
      b.setAttribute("aria-pressed", String(dark));
      const label = dark ? b.dataset.labelLight : b.dataset.labelDark;
      if (b.hasAttribute("aria-label")) b.setAttribute("aria-label", label);
      else b.removeAttribute("aria-label");
      b.title = label;
      const span = $("[data-theme-label]", b);
      if (span) span.textContent = label;
    });
    if (themeMeta) themeMeta.content = dark ? "#141a17" : "#faf6f0";
  }
  themeBtns.forEach((b) =>
    b.addEventListener("click", () => {
      const dark = document.documentElement.getAttribute("data-theme") !== "dark";
      document.documentElement.classList.add("theme-anim");
      if (dark) document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
      store.setLocal("theme", dark ? "dark" : "light");
      paintTheme();
      setTimeout(() => document.documentElement.classList.remove("theme-anim"), 500);
    }),
  );
  paintTheme();

  /* ---------------------------------------------------------------- */
  /* Services dropdown (desktop)                                        */
  /* ---------------------------------------------------------------- */
  const servicesToggle = $("[data-services-toggle]");
  const servicesMenu = $("[data-services-menu]");
  const servicesItem = servicesToggle && servicesToggle.closest(".nav-item");
  function setServices(open) {
    if (!servicesItem || !servicesMenu) return;
    if (open) {
      const hb = header.getBoundingClientRect().bottom,
        ib = servicesItem.getBoundingClientRect().bottom;
      servicesItem.style.setProperty("--menu-gap", Math.max(8, Math.round(hb - ib + 8)) + "px");
    }
    servicesItem.classList.toggle("is-open", open);
    servicesToggle.setAttribute("aria-expanded", String(open));
    servicesMenu.hidden = !open;
  }
  // Hover opens it on a mouse; the click pins it (keyboard and touch rely on the click).
  let servicesHover = false;
  let servicesPinned = false;
  const syncServices = () => setServices(servicesHover || servicesPinned);
  servicesToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    servicesPinned = !servicesPinned;
    syncServices();
  });
  document.addEventListener("click", (e) => {
    if (!servicesItem) return;
    if (!servicesItem.contains(e.target)) setServices(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && servicesItem?.classList.contains("is-open")) {
      setServices(false);
      servicesToggle.focus();
    }
  });
  if (servicesItem && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    // A short grace period on leave: the pointer can cross the gap (or overshoot the menu edge)
    // without the menu snapping shut. The CSS bridge (.nav-menu::before) covers the gap itself.
    let closeTimer = 0;
    servicesItem.addEventListener("pointerenter", () => {
      clearTimeout(closeTimer);
      servicesHover = true;
      syncServices();
    });
    servicesItem.addEventListener("pointerleave", () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        servicesHover = false;
        syncServices();
      }, 260);
    });
    servicesItem.addEventListener("focusout", (e) => {
      if (!servicesItem.contains(e.relatedTarget)) setServices(false);
    });
  }
  matchMedia("(max-width: 1023px)").addEventListener?.("change", (e) => e.matches && setServices(false));

  /* ---------------------------------------------------------------- */
  /* Scroll reveals, word-by-word headings, count-ups                  */
  /* ---------------------------------------------------------------- */
  $$("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words
      .map((w, i) => `<span class="w" aria-hidden="true"><span class="wi" style="--i:${i}">${w}</span></span>`)
      .join(" ");
    el.classList.add("words");
  });

  function countUp(el) {
    const target = Number(el.dataset.count);
    if (!target || reduceMotion) return;
    const t0 = performance.now(),
      dur = 1400;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const revealTargets = $$(".reveal, [data-words], [data-count], .stagger:not(.reveal .stagger)");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target;
          if (el.matches("[data-words]")) el.classList.add("mv-in");
          else if (el.matches("[data-count]")) countUp(el);
          else el.classList.add("is-visible");
          if (el.matches("[data-ba-wrap]")) hintSlider();
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible", "mv-in"));
  }

  /* Pointer-following sheen on glass cards */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$("[data-glass]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Before / after                                                    */
  /* ---------------------------------------------------------------- */
  const ba = $("[data-ba]"),
    baRange = $("[data-ba-range]");
  let hinted = false;
  function setPos(v) {
    v = Math.max(0, Math.min(100, v));
    ba.style.setProperty("--pos", `${v}%`);
    baRange.value = String(Math.round(v));
  }
  function hintSlider() {
    if (hinted || reduceMotion || !ba) return;
    hinted = true;
    const t0 = performance.now();
    const frames = (t) => {
      const k = (t - t0) / 1800;
      if (k >= 1 || ba.dataset.touched) return setPos(ba.dataset.touched ? Number(baRange.value) : 50);
      setPos(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k));
      requestAnimationFrame(frames);
    };
    setTimeout(() => requestAnimationFrame(frames), 600);
  }
  if (ba) {
    ba.parentElement.setAttribute("data-ba-wrap", "");
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        ([e], o) => {
          if (e.isIntersecting) {
            hintSlider();
            o.disconnect();
          }
        },
        { threshold: 0.5 },
      ).observe(ba);
    }
    baRange.style.pointerEvents = "none";
    let dragging = false;
    const fromEvent = (e) => {
      const r = ba.getBoundingClientRect();
      setPos(((e.clientX - r.left) / r.width) * 100);
    };
    ba.addEventListener("pointerdown", (e) => {
      dragging = true;
      ba.dataset.touched = "1";
      ba.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    ba.addEventListener("pointermove", (e) => dragging && fromEvent(e));
    ba.addEventListener("pointerup", () => (dragging = false));
    ba.addEventListener("pointercancel", () => (dragging = false));
    baRange.addEventListener("input", () => {
      ba.dataset.touched = "1";
      setPos(Number(baRange.value));
    });
  }

  /* ---------------------------------------------------------------- */
  /* Implant anatomy: hover a step to light its layer                  */
  /* ---------------------------------------------------------------- */
  const anatomy = $("[data-anatomy]");
  const pickBox = $("[data-anatomy-pick]");
  const layerItems = $$("[data-layer]");
  let pinned = null;
  function showLayer(n) {
    if (!anatomy) return;
    if (n) anatomy.setAttribute("data-focus", n);
    else anatomy.removeAttribute("data-focus");
    layerItems.forEach((x) => x.classList.toggle("is-active", x.dataset.layer === n));
    $$("[data-pick]", anatomy).forEach((g) => g.classList.toggle("is-active", g.dataset.pick === n));
    if (pickBox) {
      const li = layerItems.find((x) => x.dataset.layer === n);
      pickBox.classList.toggle("has-pick", !!li);
      if (li) {
        pickBox.innerHTML =
          `<span class="n">${n}</span><div><b>${esc($("h3", li).textContent)}</b><p>${esc($("p", li).textContent)}</p></div>`;
      } else if (pickBox.dataset.hint) pickBox.innerHTML = pickBox.dataset.hint;
    }
  }
  if (pickBox) pickBox.dataset.hint = pickBox.innerHTML;
  const pin = (n) => {
    pinned = pinned === n ? null : n;
    showLayer(pinned);
  };
  const figureOffscreen = () => {
    const r = anatomy.getBoundingClientRect();
    return r.bottom < 120 || r.top > innerHeight - 120;
  };
  layerItems.forEach((li) => {
    const n = li.dataset.layer;
    li.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && showLayer(n));
    li.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && showLayer(pinned));
    li.addEventListener("click", () => {
      pinned = n;
      showLayer(n);
      // On a phone the drawing sits above the list: bring it back into view with the part lit up.
      if (anatomy && figureOffscreen()) {
        anatomy.closest("figure").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    });
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        li.click();
      }
    });
  });
  if (anatomy) {
    $$("[data-pick]", anatomy).forEach((g) => {
      g.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && showLayer(g.dataset.pick));
      g.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && showLayer(pinned));
      g.addEventListener("click", () => pin(g.dataset.pick));
    });
  }

  /* ---------------------------------------------------------------- */
  /* Map + neighborhood list                                           */
  /* ---------------------------------------------------------------- */
  function lightArea(name) {
    $$(".map-pt").forEach((g) => g.classList.toggle("is-active", g.dataset.area === name));
    $$("[data-area-list] button").forEach((b) => b.classList.toggle("is-active", b.dataset.area === name));
  }
  $$("[data-area-list] button").forEach((b) => {
    b.addEventListener("pointerenter", () => lightArea(b.dataset.area));
    b.addEventListener("focus", () => lightArea(b.dataset.area));
    b.addEventListener("click", () => lightArea(b.dataset.area));
  });
  $$(".map-pt").forEach((g) => g.addEventListener("pointerenter", () => lightArea(g.dataset.area)));

  /* ---------------------------------------------------------------- */
  /* Smile check                                                       */
  /* ---------------------------------------------------------------- */
  const QUIZ = {
    questions: ((window.I18N && window.I18N.quiz && window.I18N.quiz.questions) || []).map((q) => [q[0], 1]),
    levels: ((window.I18N && window.I18N.quiz && window.I18N.quiz.results) || {}),
  };
  const quiz = $("[data-quiz]");
  let answers = [];
  function renderQuiz(focus) {
    if (!quiz) return;
    const total = QUIZ.questions.length;
    if (answers.length === total) {
      const score = answers.filter(Boolean).length;
      const max = QUIZ.questions.length;
      const lvl = score <= 1 ? "low" : score <= 3 ? "mid" : "high";
      const res = QUIZ.levels[lvl] || [];
      const title = res[1] || "";
      const text = res[2] || "";
      const cta = res[3] || "";
      quiz.innerHTML = `<div class="step-in" role="status">
        <p class="label-mono" style="color:oklch(1 0 0 / 50%)">${esc(t("quiz_result", "Your result"))}</p>
        <p class="lvl ${lvl}">${title}</p>
        <div class="meter"><i style="--w:${Math.max(6, Math.round((score / max) * 100))}%"></i></div>
        <p class="res-text">${text}</p>
        <p class="note">${t("quiz_note", "A quick self-check, not a diagnosis. Only an exam can tell what is really going on.")}</p>
        <div class="btn-row" style="margin-top:1.5rem">
          <a class="btn btn-primary" href="${lvl === "high" ? "tel:" + (SITE.phoneTel || "") : BOOK_URL}">${esc(cta)}</a>
          <button type="button" class="btn btn-outline-light" data-quiz-reset>${esc(t("quiz_restart", "Start over"))}</button>
        </div></div>`;
    } else {
      const i = answers.length;
      quiz.innerHTML = `<div class="step-in">
        <p class="label-mono eyebrow">${esc(tpl("quiz_q", { n: i + 1, t: total }, "Question ${i + 1} of ${total}"))}</p>
        <div class="quiz-steps">${QUIZ.questions.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div>
        <h3>${esc(QUIZ.questions[i][0])}</h3>
        <div class="grid2">
          <button type="button" class="btn btn-primary" data-ans="1">${esc(t("quiz_yes", "Yes"))}</button>
          <button type="button" class="btn btn-outline-light" data-ans="0">${esc(t("quiz_no", "No / not sure"))}</button>
        </div>
        ${i ? `<button type="button" class="back" data-quiz-back>${esc(t("quiz_back", "← Back"))}</button>` : ""}
      </div>`;
    }
    if (focus) quiz.focus({ preventScroll: true });
  }
  quiz?.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.ans) answers.push(t.dataset.ans === "1");
    else if (t.hasAttribute("data-quiz-back")) answers.pop();
    else if (t.hasAttribute("data-quiz-reset")) answers = [];
    renderQuiz(true);
  });
  renderQuiz(false);

  /* ---------------------------------------------------------------- */
  /* Cleaning planner                                                  */
  /* ---------------------------------------------------------------- */
  const planner = $("[data-planner]");
  function renderPlanner() {
    if (!planner) return;
    const range = $("[data-months]", planner);
    const months = Number(range.value);
    const every = Number($('input[name="every"]:checked', planner)?.value || 6);
    range.style.setProperty("--fill", `${(months / Number(range.max)) * 100}%`);
    $("[data-months-out]", planner).innerHTML = `${months >= 36 ? "36+" : months} <small>${esc(t("mo", "mo"))}</small>`;
    const due = every - months;
    const now = houstonNow();
    let big, text;
    if (due > 0) {
      const m = (now.m - 1 + due) % 12;
      big = due === 1 ? tpl("due_in", { n: due }, "Due in {n} month") : tpl("due_in_plural", { n: due }, "Due in {n} months");
      text = tpl("around", { month: MONTHS[m] }, "Around {month}. Booking ahead gets you the day and time you want.");
    } else if (due > -3) {
      big = t("due_now", "Due now");
      text = t("due_now_text", "You are right on schedule. Saturday and Tuesday-evening slots go first.");
    } else {
      const over = -due;
      big = over >= 12
        ? tpl("overdue_years", { n: Math.floor(over / 12) }, "Overdue by {n}+ years")
        : tpl("overdue", { n: over }, "Overdue by {n} months");
      text = t("overdue_text", "No judgment — it happens. A cleaning and exam is the easiest way to get back on track.");
    }
    $("[data-plan-big]", planner).textContent = big;
    $("[data-plan-text]", planner).textContent = text;
  }
  planner?.addEventListener("input", renderPlanner);
  renderPlanner();

  /* ---------------------------------------------------------------- */
  /* FAQ accordion                                                     */
  /* ---------------------------------------------------------------- */
  $$("[data-faq] .acc-item").forEach((item) => {
    const btn = $(".acc-btn", item);
    btn.addEventListener("click", () => {
      const open = item.dataset.open !== "true";
      item.dataset.open = String(open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------------------------------------------------------------- */
  /* Appointment request                                               */
  /* ---------------------------------------------------------------- */
  const form = $("[data-form]");
  if (form) {
    let step = 1;
    const FORMS = (window.I18N && window.I18N.form) || {};
    const TITLES = {
      1: FORMS.titles ? FORMS.titles[0] : "What do you need?",
      2: FORMS.titles ? FORMS.titles[1] : "When works for you?",
      3: FORMS.titles ? FORMS.titles[2] : "How do we reach you?",
    };
    const err = $("[data-form-error]", form);
    const next = $("[data-next]", form),
      back = $("[data-back]", form);
    const showError = (msg) => {
      err.textContent = msg;
      err.hidden = !msg;
    };
    function go(n) {
      step = n;
      $$(".fstep", form).forEach((fs) => (fs.hidden = Number(fs.dataset.step) !== n));
      $$(".form-steps i", form).forEach((i, k) => i.classList.toggle("on", k < n));
      $("[data-form-title]", form).textContent = TITLES[n];
      $("[data-form-count]", form).textContent = tpl("step", { n }, "Step ${n} of 3");
      back.hidden = n === 1;
      next.innerHTML =
        (n === 3 ? esc(t("send", "Send request")) : esc(t("continue", "Continue"))) +
        ' <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
      showError("");
      $(`.fstep[data-step="${n}"]`, form).classList.remove("step-in");
      void form.offsetWidth;
      $(`.fstep[data-step="${n}"]`, form).classList.add("step-in");
    }
    function validate(n) {
      if (n === 1 && !form.reason.value) return t("err_reason", "Pick the option closest to what you need.");
      if (n === 3) {
        const f = form;
        for (const el of [f.firstName, f.lastName, f.phone]) el.removeAttribute("aria-invalid");
        if (!f.firstName.value.trim()) return mark(f.firstName, t("err_first", "Please add your first name."));
        if (!f.lastName.value.trim()) return mark(f.lastName, t("err_last", "Please add your last name."));
        if (f.phone.value.replace(/\D/g, "").length < 10) return mark(f.phone, t("err_phone", "Please enter a 10-digit phone number."));
        if (f.email.value && !/^\S+@\S+\.\S+$/.test(f.email.value)) return mark(f.email, t("err_email", "That email does not look right."));
        if (!f.consent.checked) return t("err_consent", "Please tick the box so we can call or text you back.");
      }
      return "";
    }
    function mark(el, msg) {
      el.setAttribute("aria-invalid", "true");
      el.focus();
      return msg;
    }
    form.phone.addEventListener("input", () => {
      const d = form.phone.value.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
      form.phone.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
    });
    // Picking an option on step 1 moves straight on.
    $$('input[name="reason"]', form).forEach((r) => r.addEventListener("change", () => setTimeout(() => step === 1 && go(2), 220)));
    back.addEventListener("click", () => go(step - 1));
    next.addEventListener("click", async () => {
      const msg = validate(step);
      if (msg) return showError(msg);
      if (step < 3) return go(step + 1);
      await submit();
    });
    form.addEventListener("submit", (e) => e.preventDefault());

    async function submit() {
      const f = form;
      const data = {
        reason: f.reason.value,
        days: $$('input[name="days"]:checked', f).map((x) => x.value),
        location: (f.location && f.location.value) || "EaDo",
        time: f.time.value,
        newPatient: f.newPatient.value,
        firstName: f.firstName.value.trim(),
        lastName: f.lastName.value.trim(),
        phone: f.phone.value.trim(),
        email: f.email.value.trim(),
        note: f.note.value.trim().slice(0, 600),
        company: f.company.value,
        page: location.href,
        locale: document.documentElement.lang === "es" ? "es" : "en",
      };
      next.disabled = true;
      next.textContent = t("sending", "Sending…");
      let ok = false;
      try {
        const res = await fetch(SITE.leadsUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        ok = res.ok;
      } catch {}
      next.disabled = false;
      if (!ok && !SITE.demo) {
        go(3);
        return showError(tpl("err_send", { phone: SITE.phone }, "Sorry — that did not go through. Please call us at {phone}."));
      }
      $$(".fstep, [data-form-nav], .form-steps, .form-head", f).forEach((el) => (el.hidden = true));
      $(".form-steps", f).style.display = "none";
      $(".form-head", f).style.display = "none";
      showError("");
      const done = $("[data-done]", f);
      done.hidden = false;
      $("[data-done-text]", f).textContent = ok
        ? tpl("done_ok", { name: data.firstName, phone: data.phone, office: SITE.phone }, "Thanks, {name}! We will call {phone} to confirm a time.")
        : tpl("done_demo", { name: data.firstName }, "Thanks, {name}! (Demo: this request was not delivered anywhere.)");
      window.dataLayer?.push({ event: "generate_lead", reason: data.reason });
    }
    $("[data-reset]", form).addEventListener("click", () => {
      form.reset();
      $("[data-done]", form).hidden = true;
      $$("[data-form-nav]", form).forEach((el) => (el.hidden = false));
      $(".form-steps", form).style.display = "";
      $(".form-head", form).style.display = "";
      $(".form-head", form).hidden = false;
      $(".form-steps", form).hidden = false;
      go(1);
    });
    // Buttons elsewhere can pre-pick the reason ("Book my cleaning", "Ask about an implant"):
    // on the same page they fill the form in place; on another page they arrive as ?reason=.
    const preset = (value, scroll) => {
      const r = $$('input[name="reason"]', form).find((x) => x.value === value);
      if (!r) return false;
      r.checked = true;
      go(2);
      if (scroll) form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      return true;
    };
    $$("[data-preset]").forEach((a) =>
      a.addEventListener("click", (e) => {
        if (preset(a.dataset.preset, true)) e.preventDefault();
      }),
    );
    try {
      const fromUrl = new URLSearchParams(location.search).get("reason");
      if (fromUrl) preset(fromUrl, false);
    } catch {}
  }


  /* ---------------------------------------------------------------- */
  /* 3D "trading card" depth (Steam-style): hover lifts the card above */
  /* its neighbours, tilts it toward the pointer and sweeps a glare.   */
  /* Mouse: on hover. Touch: press and hold ~180 ms (a scroll cancels). */
  /* Ported from the Centurion motion engine, with a stronger pop.     */
  /* ---------------------------------------------------------------- */
  // Two strengths. STRONG: the big clickable "trading cards" (services, dentists, payment).
  // SOFT: supporting tiles get a gentle lift and a small tilt, so the page never feels busy.
  // Lists, rows, photos and maps stay still on purpose.
  const STRONG_SEL = [".svc", ".doc", ".team-card", ".doc-block-photo", ".comfort-card", ".pay-card", ".pay-detail", ".hero-card"].join(",");
  const SOFT_SEL = [".review", ".value", ".tech-card", ".comfort-tile", ".how-step", ".info-block", ".not-card", ".office-card", ".detail-list > li"].join(",");
  const TILT_SEL = STRONG_SEL + "," + SOFT_SEL;
  const NO_TILT = "form, [data-quiz], [data-planner], [data-ba], .map-card, .acc-item, [data-no-tilt]";
  const REST = [0, 0, 0, 1, 0, 0, 50, 50, 0, 0]; // rx, ry, lift, scale, glare, zoom, gx, gy, px, py
  const depthMap = new WeakMap();
  const moving = new Set();
  let loopOn = false,
    lastTs = 0,
    current = null;

  function depthFor(el) {
    if (!el || reduceMotion) return null;
    let d = depthMap.get(el);
    if (d) return d;
    if (el.closest(NO_TILT)) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 90 || r.height < 60) return null;
    const glare = document.createElement("span");
    glare.className = "depth-glare";
    glare.setAttribute("aria-hidden", "true");
    if (el.tagName !== "IMG" && el.tagName.toLowerCase() !== "svg") el.appendChild(glare);
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    const w = r.width;
    const soft = !el.matches(STRONG_SEL);
    d = {
      el,
      glare,
      img: el.tagName === "IMG" ? null : el.querySelector(".doc-photo img, .team-photo img, .visit-photo img, img"),
      over: false,
      pressed: false,
      soft,
      maxDeg: soft ? Math.min(5, Math.max(2, (5 * 380) / w)) : Math.min(12, Math.max(3, (11 * 380) / w)),
      pop: soft ? (w < 520 ? 1.025 : 1.015) : w < 300 ? 1.1 : w < 520 ? 1.07 : w < 800 ? 1.045 : 1.025,
      c: REST.slice(),
      t: REST.slice(),
    };
    depthMap.set(el, d);
    return d;
  }
  function aim(d, e) {
    const b = d.el.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const x = Math.min(1, Math.max(0, (e.clientX - b.left) / b.width));
    const y = Math.min(1, Math.max(0, (e.clientY - b.top) / b.height));
    d.t[1] = (x - 0.5) * 2 * d.maxDeg;
    d.t[0] = -(y - 0.5) * 2 * d.maxDeg * 0.8;
    d.t[6] = x * 100;
    d.t[7] = y * 100;
    d.t[8] = (x - 0.5) * 2;
    d.t[9] = (y - 0.5) * 2;
  }
  function pose(d) {
    d.t[2] = d.pressed ? 3 : d.soft ? 5 : 12;
    d.t[3] = d.pressed ? 1 + (d.pop - 1) * 0.6 : d.pop;
    d.t[4] = d.soft ? 0.6 : 1;
    d.t[5] = 1;
  }
  function release(d) {
    d.over = false;
    d.pressed = false;
    d.el.removeAttribute("data-depth-on");
    const gx = d.t[6],
      gy = d.t[7];
    d.t = REST.slice();
    d.t[6] = gx;
    d.t[7] = gy;
    wake(d);
  }
  function wake(d) {
    moving.add(d);
    if (!loopOn) {
      loopOn = true;
      lastTs = 0;
      requestAnimationFrame(tick);
    }
  }
  function paint(d) {
    const [rx, ry, lift, sc, ga, z, gx, gy, px, py] = d.c;
    d.el.style.transform = `perspective(900px) translate3d(0,${(-lift).toFixed(2)}px,0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${sc.toFixed(4)})`;
    d.el.style.setProperty("--ga", ga.toFixed(3));
    d.el.style.setProperty("--gx", gx.toFixed(1) + "%");
    d.el.style.setProperty("--gy", gy.toFixed(1) + "%");
    if (d.img) {
      d.img.style.scale = (1 + 0.07 * z).toFixed(4);
      d.img.style.translate = `${(-px * 9 * z).toFixed(2)}px ${(-py * 9 * z).toFixed(2)}px`;
    }
  }
  function restStyles(d) {
    d.el.style.transform = "";
    d.el.style.removeProperty("--ga");
    d.el.removeAttribute("data-depth-live");
    if (d.img) {
      d.img.style.scale = "";
      d.img.style.translate = "";
    }
  }
  function tick(ts) {
    const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 1 / 60;
    lastTs = ts;
    moving.forEach((d) => {
      const k = 1 - Math.exp(-(d.over ? 12 : 16) * dt);
      let still = true;
      for (let i = 0; i < d.c.length; i++) {
        d.c[i] += (d.t[i] - d.c[i]) * k;
        if (Math.abs(d.t[i] - d.c[i]) > (i === 3 ? 0.0005 : i >= 6 ? 0.5 : 0.02)) still = false;
      }
      if (still) {
        moving.delete(d);
        if (d.over) paint(d);
        else {
          d.c = REST.slice();
          restStyles(d);
        }
      } else paint(d);
    });
    if (moving.size) requestAnimationFrame(tick);
    else loopOn = false;
  }
  function engage(d, e) {
    // Wait until the entrance animation has finished, so the two transforms never fight.
    const rv = d.el.closest(".reveal");
    if (rv && !rv.classList.contains("is-visible")) return false;
    d.over = true;
    d.el.setAttribute("data-depth-live", "");
    d.el.setAttribute("data-depth-on", "");
    aim(d, e);
    pose(d);
    wake(d);
    return true;
  }
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(any-pointer: coarse)").matches;
  if (!reduceMotion) {
    let queued = false,
      last = null;
    const frame = () => {
      queued = false;
      const e = last;
      if (!e) return;
      const el = e.target && e.target.closest ? e.target.closest(TILT_SEL) : null;
      const d = el ? depthFor(el) : null;
      if (current && current !== d) {
        release(current);
        current = null;
      }
      if (d) {
        if (!d.over) {
          if (engage(d, e)) current = d;
        } else {
          aim(d, e);
          wake(d);
          current = d;
        }
      }
    };
    if (fine) {
      addEventListener(
        "pointermove",
        (e) => {
          if (e.pointerType === "touch") return;
          last = e;
          if (!queued) {
            queued = true;
            requestAnimationFrame(frame);
          }
        },
        { passive: true },
      );
      document.documentElement.addEventListener("pointerleave", () => {
        if (current) release(current);
        current = null;
      });
      addEventListener("pointerdown", (e) => {
        if (current && e.pointerType === "mouse") {
          current.pressed = true;
          pose(current);
          wake(current);
        }
      }, { passive: true });
      addEventListener("pointerup", () => {
        if (current && current.over) {
          current.pressed = false;
          pose(current);
          wake(current);
        }
      }, { passive: true });
    }
    // Touch: press and hold to pick the card up; any movement first means a scroll.
    let holdTimer = 0,
      holdStart = null,
      held = null;
    const clearHold = () => {
      clearTimeout(holdTimer);
      holdTimer = 0;
      holdStart = null;
      if (held) {
        release(held);
        held = null;
      }
    };
    addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "touch") return;
      const el = e.target.closest && e.target.closest(TILT_SEL);
      const d = el ? depthFor(el) : null;
      if (!d) return;
      clearHold();
      holdStart = { x: e.clientX, y: e.clientY };
      holdTimer = setTimeout(() => {
        holdTimer = 0;
        if (engage(d, e)) held = d;
      }, 180);
    }, { passive: true });
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "touch") return;
      if (holdStart && !held && (Math.abs(e.clientX - holdStart.x) > 12 || Math.abs(e.clientY - holdStart.y) > 12)) return clearHold();
      if (held) {
        aim(held, e);
        wake(held);
      }
    }, { passive: true });
    addEventListener("pointerup", (e) => e.pointerType === "touch" && clearHold(), { passive: true });
    addEventListener("pointercancel", clearHold, { passive: true });
    addEventListener("scroll", () => holdTimer && clearHold(), { passive: true });
  }

  /* Analytics hook (Vercel Analytics / GA pick these up if installed) */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='tel:']");
    if (a) window.dataLayer?.push({ event: "phone_click", where: a.dataset.track || "page" });
  });
})();

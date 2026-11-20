/* Acadian Family Dental — concept redesign. One small engine, no dependencies. */
(() => {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* Settings: edit these when the site goes live                      */
  /* ---------------------------------------------------------------- */
  const SITE = {
    demo: true, // concept mode: shows the "not the official website" banner
    phone: "713-766-5804",
    timeZone: "America/Chicago",
    // 0 = Sunday … 6 = Saturday. [open, close] in 24h, half hours as .5
    hours: { 0: null, 1: null, 2: [12, 19], 3: [8, 17], 4: [8, 17], 5: [8, 16.5], 6: [8, 15] },
    leadsUrl: "/api/lead",
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
  function openState() {
    const now = houstonNow();
    const today = SITE.hours[now.weekday];
    if (today && now.h >= today[0] && now.h < today[1]) {
      return { open: true, label: `Open now · until ${fmtTime(today[1])}`, short: `Open until ${fmtTime(today[1])}` };
    }
    for (let off = 0; off < 8; off++) {
      const w = (now.weekday + off) % 7,
        hrs = SITE.hours[w];
      if (!hrs || (off === 0 && now.h >= hrs[0])) continue;
      const when = off === 0 ? "today" : off === 1 ? "tomorrow" : DAY_NAMES[w];
      return { open: false, label: `Closed · opens ${when} ${fmtTime(hrs[0])}`, short: `Opens ${when} ${fmtTime(hrs[0])}` };
    }
    return { open: false, label: "Closed", short: "Closed" };
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
        b.left === 0 ? `Last day to use ${b.year} dental benefits` : `${b.year} dental benefits · ${b.left} ${b.left === 1 ? "day" : "days"} left`;
      row.innerHTML =
        `<span class="chip"><span class="dot${st.open ? " is-on" : ""}"></span>${st.label}</span>` +
        `<a class="chip" href="#comfort"><svg aria-hidden="true"><use href="#i-gift"/></svg>${benefitText}</a>`;
    }
    const days = $("[data-benefit-days]");
    if (days) days.textContent = String(b.left);
    const yr = $("[data-benefit-year]");
    if (yr) yr.textContent = String(b.year);
    const meter = $("[data-benefit-meter]");
    if (meter) meter.style.setProperty("--w", `${Math.round(b.elapsed * 100)}%`);
    const chip = $("[data-hours-chip]");
    if (chip) chip.innerHTML = `<span class="dot${st.open ? " is-on" : ""}"></span>${st.open ? "Open now" : "Closed now"}`;
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
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mnav.dataset.open = String(open);
    scrim.dataset.open = String(open);
    document.documentElement.classList.toggle("menu-open", open);
    if (open) header.classList.remove("is-hidden");
  }
  menuBtn?.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  scrim?.addEventListener("click", () => setMenu(false));
  $$("a", mnav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width: 1024px)").addEventListener?.("change", (e) => e.matches && setMenu(false));

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
  $$("[data-layer]").forEach((li) => {
    const on = () => {
      anatomy?.setAttribute("data-focus", li.dataset.layer);
      $$("[data-layer]").forEach((x) => x.classList.toggle("is-active", x === li));
    };
    li.addEventListener("pointerenter", on);
    li.addEventListener("click", on);
    li.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse") return;
      anatomy?.removeAttribute("data-focus");
      li.classList.remove("is-active");
    });
  });

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
    questions: [
      ["Has it been more than a year since your last cleaning?", 2],
      ["Do your gums bleed when you brush or floss?", 3],
      ["Is a tooth sensitive to hot, cold or sweets?", 2],
      ["Any tooth pain, swelling, or pain when you bite down?", 3],
      ["A chipped or cracked tooth, or a filling that feels loose?", 2],
      ["Are you missing a tooth that was never replaced?", 1],
    ],
    levels: {
      low: ["Looking good", "Nothing here points to trouble. Keep up your twice-a-year cleanings and it should stay that way."],
      mid: ["Worth a check-up", "A few of these signs tend to get worse if they wait. An exam will tell you exactly where you stand — usually while the fix is still small."],
      high: ["Come in soon", "Several warning signs add up. Pain, swelling and bleeding gums are worth seeing a dentist about sooner rather than later."],
    },
  };
  const quiz = $("[data-quiz]");
  let answers = [];
  function renderQuiz(focus) {
    if (!quiz) return;
    const total = QUIZ.questions.length;
    if (answers.length === total) {
      const score = answers.reduce((s, yes, i) => s + (yes ? QUIZ.questions[i][1] : 0), 0);
      const max = QUIZ.questions.reduce((s, q) => s + q[1], 0);
      const lvl = score <= 2 ? "low" : score <= 6 ? "mid" : "high";
      const [title, text] = QUIZ.levels[lvl];
      quiz.innerHTML = `<div class="step-in" role="status">
        <p class="label-mono" style="color:oklch(1 0 0 / 50%)">Your result</p>
        <p class="lvl ${lvl}">${title}</p>
        <div class="meter"><i style="--w:${Math.max(6, Math.round((score / max) * 100))}%"></i></div>
        <p class="res-text">${text}</p>
        <p class="note">A quick self-check, not a diagnosis. Only an exam can tell what’s really going on.</p>
        <div class="btn-row" style="margin-top:1.5rem">
          <a class="btn btn-primary" href="#book">Book a check-up</a>
          <button type="button" class="btn btn-outline-light" data-quiz-reset>Start over</button>
        </div></div>`;
    } else {
      const i = answers.length;
      quiz.innerHTML = `<div class="step-in">
        <p class="label-mono eyebrow">Question ${i + 1} of ${total}</p>
        <div class="quiz-steps">${QUIZ.questions.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div>
        <h3>${QUIZ.questions[i][0]}</h3>
        <div class="grid2">
          <button type="button" class="btn btn-primary" data-ans="1">Yes</button>
          <button type="button" class="btn btn-outline-light" data-ans="0">No / not sure</button>
        </div>
        ${i ? '<button type="button" class="back" data-quiz-back>← Back</button>' : ""}
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
    $("[data-months-out]", planner).innerHTML = `${months >= 36 ? "36+" : months} <small>mo</small>`;
    const due = every - months;
    const now = houstonNow();
    let big, text;
    if (due > 0) {
      const m = (now.m - 1 + due) % 12;
      big = `Due in ${due} ${due === 1 ? "month" : "months"}`;
      text = `Around ${MONTHS[m]}. Booking ahead gets you the day and time you want.`;
    } else if (due > -3) {
      big = "Due now";
      text = "You’re right on schedule for a cleaning and check-up. Saturday and Tuesday-evening slots go first.";
    } else {
      const over = -due;
      big = over >= 12 ? `Overdue by ${Math.floor(over / 12)}+ ${over >= 24 ? "years" : "year"}` : `Overdue by ${over} months`;
      text = "No judgment — it happens. A cleaning and exam is the easiest way to get back on track.";
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
    const TITLES = { 1: "What do you need?", 2: "When works for you?", 3: "How do we reach you?" };
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
      $("[data-form-count]", form).textContent = `Step ${n} of 3`;
      back.hidden = n === 1;
      next.innerHTML =
        n === 3 ? 'Send request <svg aria-hidden="true"><use href="#i-arrow"/></svg>' : 'Continue <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
      showError("");
      $(`.fstep[data-step="${n}"]`, form).classList.remove("step-in");
      void form.offsetWidth;
      $(`.fstep[data-step="${n}"]`, form).classList.add("step-in");
    }
    function validate(n) {
      if (n === 1 && !form.reason.value) return "Pick the option closest to what you need.";
      if (n === 3) {
        const f = form;
        for (const el of [f.firstName, f.lastName, f.phone]) el.removeAttribute("aria-invalid");
        if (!f.firstName.value.trim()) return mark(f.firstName, "Please add your first name.");
        if (!f.lastName.value.trim()) return mark(f.lastName, "Please add your last name.");
        if (f.phone.value.replace(/\D/g, "").length < 10) return mark(f.phone, "Please enter a 10-digit phone number.");
        if (f.email.value && !/^\S+@\S+\.\S+$/.test(f.email.value)) return mark(f.email, "That email doesn’t look right.");
        if (!f.consent.checked) return "Please tick the box so we can call or text you back.";
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
        time: f.time.value,
        newPatient: f.newPatient.value,
        firstName: f.firstName.value.trim(),
        lastName: f.lastName.value.trim(),
        phone: f.phone.value.trim(),
        email: f.email.value.trim(),
        note: f.note.value.trim().slice(0, 600),
        company: f.company.value,
        page: location.href,
      };
      next.disabled = true;
      next.textContent = "Sending…";
      let ok = false;
      try {
        const res = await fetch(SITE.leadsUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        ok = res.ok;
      } catch {}
      next.disabled = false;
      if (!ok && !SITE.demo) {
        go(3);
        return showError(`Sorry — that didn’t go through. Please call us at ${SITE.phone}.`);
      }
      $$(".fstep, [data-form-nav], .form-steps, .form-head", f).forEach((el) => (el.hidden = true));
      $(".form-steps", f).style.display = "none";
      $(".form-head", f).style.display = "none";
      showError("");
      const done = $("[data-done]", f);
      done.hidden = false;
      $("[data-done-text]", f).textContent =
        ok
          ? `Thanks, ${data.firstName}! We’ll call ${data.phone} to confirm a time. Need us sooner? Call ${SITE.phone}.`
          : `Thanks, ${data.firstName}! (Demo: this request wasn’t delivered anywhere — on the live site it goes straight to the front desk.)`;
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
    // Buttons elsewhere can pre-pick the reason ("Book my cleaning", "Ask about an implant").
    $$("[data-preset]").forEach((a) =>
      a.addEventListener("click", () => {
        const r = $$('input[name="reason"]', form).find((x) => x.value === a.dataset.preset);
        if (r) {
          r.checked = true;
          go(2);
        }
      }),
    );
  }

  /* Analytics hook (Vercel Analytics / GA pick these up if installed) */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='tel:']");
    if (a) window.dataLayer?.push({ event: "phone_click", where: a.dataset.track || "page" });
  });
})();

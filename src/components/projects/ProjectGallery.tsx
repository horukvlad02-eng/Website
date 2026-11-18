import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, MapPin, Maximize2, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Img } from "@/components/site/Img";
import { Words } from "@/components/motion/Words";
import { L, useLocale } from "@/components/site/L";
import { PROJECTS, GALLERY_TEXT, type CategoryKey } from "@/content/projects";
export function ProjectGallery() {
  const locale = useLocale(),
    s = GALLERY_TEXT[locale];
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [photo, setPhoto] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const visible = PROJECTS.filter((p) => filter === "all" || p.categoryKey === filter);
  const active = photo === null ? undefined : visible[photo];
  const move = (delta: number) =>
    setPhoto((i) => (i === null ? null : (i + delta + visible.length) % visible.length));
  useEffect(() => {
    if (photo === null) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhoto(null);
      if (e.key === "ArrowRight") setPhoto((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setPhoto((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
      if (e.key === "Tab") {
        const items = dialog.current?.querySelectorAll<HTMLElement>("button,a[href]");
        if (!items?.length) return;
        const first = items[0]!,
          last = items[items.length - 1]!;
        if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === dialog.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [photo, visible.length]);
  return (
    <section className="bg-white py-20 sm:py-28 blueprint-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div role="group" aria-label={s.filter} className="flex flex-wrap justify-center gap-2.5">
            {(["all", "metal", "flat", "shingle"] as const).map((key) => {
              const selected = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setPhoto(null);
                    setFilter(key);
                  }}
                  className={`rounded-full border px-5 py-3 text-sm font-bold transition-[background-color,border-color,color,box-shadow] duration-200 ${selected ? "border-ink bg-ink text-white shadow-lg shadow-ink/20" : "glass glass-flat glass-light border-ink/10 text-ink hover:border-brand hover:text-brand-deep"}`}
                >
                  {key === "all"
                    ? s.all
                    : PROJECTS.find((p) => p.categoryKey === key)!.locales[locale].category}{" "}
                  <span className={selected ? "text-brand" : "text-muted-foreground"}>
                    {key === "all"
                      ? PROJECTS.length
                      : PROJECTS.filter((p) => p.categoryKey === key).length}
                  </span>
                </button>
              );
            })}
          </div>
          <div key={filter} className="mt-10 grid gap-8 md:grid-cols-2" aria-live="polite">
            {visible.map((p, i) => {
              const t = p.locales[locale],
                wide = i === 0 && visible.length % 2 === 1;
              return (
                <article
                  className={`step-in glass glass-flat glass-light glass-interactive group relative overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/15 ${wide ? "md:col-span-2" : ""}`}
                  key={p.slug}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div
                    className={`img-zoom relative overflow-hidden ${wide ? "aspect-[21/9]" : "aspect-[16/10]"}`}
                  >
                    <Img src={p.image} fill alt={t.title} className="object-cover" loading="lazy" />
                    <button
                      aria-label={`${s.enlarge}: ${t.title}`}
                      onClick={() => setPhoto(i)}
                      className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/90 text-ink opacity-100 shadow-lg transition-[transform,background-color,border-color,color,opacity] hover:bg-brand md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                      type="button"
                    >
                      <Maximize2 className="size-5" aria-hidden="true" />
                    </button>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-[transform,background-color,border-color,color,opacity] duration-300 group-hover:rotate-45 group-hover:bg-brand"
                    >
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <L
                    className="block p-7 after:absolute after:inset-x-0 after:bottom-0 after:top-[calc(100%-12rem)] after:content-['']"
                    to={`/projects/${p.slug}/`}
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
                      <span className="rounded-full bg-brand/10 px-3 py-1 text-brand-deep">
                        {t.category}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {t.location}
                      </span>
                      <span className="text-brand-deep">{t.distance}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-ink">
                      <Words>{t.title}</Words>
                    </h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{t.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-deep">
                      {s.view}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  </L>
                </article>
              );
            })}
            <article className="flex flex-col justify-center gap-7 glass glass-flat glass-dark rounded-[28px] p-8 text-white shadow-[0_30px_60px_-30px_rgba(6,20,28,0.6)] sm:p-10 md:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                  <Words>{s.ctaTitle}</Words>
                </h2>
                <p className="mt-3 leading-relaxed text-white/65">{s.ctaText}</p>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:shrink-0">
                <a
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-ink transition-[transform,background-color,border-color,color,opacity] hover:bg-brand-bright"
                  href="#inspection"
                >
                  {s.ctaButton}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
                  href="tel:+17863724754"
                >
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {s.ctaPhone}
                </a>
              </div>
            </article>
          </div>
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">{s.near}</p>
      </div>
      {active && (
        <div
          ref={dialog}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={active.locales[locale].title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setPhoto(null)}
            aria-label={s.close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  move(-1);
                }}
                aria-label={s.prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  move(1);
                }}
                aria-label={s.next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}
          <figure
            key={active.slug}
            className="step-in max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Img
              src={active.image}
              alt={active.locales[locale].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-white">
              <p className="font-display text-xl font-extrabold">{active.locales[locale].title}</p>
              <p className="mt-1 text-sm text-white/60">
                {active.locales[locale].location} · {active.locales[locale].category}
              </p>
              <L
                to={`/projects/${active.slug}/`}
                className="mt-3 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-ink hover:bg-brand-bright"
              >
                {s.view} →
              </L>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

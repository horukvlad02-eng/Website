import { useEffect, useRef } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useLocale } from "@/components/site/L";
import { Img } from "@/components/site/Img";
import { Words } from "@/components/motion/Words";
import { SITE } from "@/lib/site";
const copy = {
  en: {
    eyebrow: "What a full replacement involves",
    title: "A roof at the end of its life, and what it becomes.",
    description:
      "Illustrative photos of a complete shingle replacement — the same tear-off, decking check and installation we run on every job. Drag the handle to compare.",
    before: "Before",
    after: "After",
    altBefore: "Illustrative photo: an aging, storm-damaged shingle roof before replacement",
    altAfter: "Illustrative photo: a new architectural shingle roof after replacement",
    slider: "Before and after comparison position",
    note: "Illustrative photos. Ask us for before-and-after photos from completed jobs near you.",
    stats: [
      { value: `${SITE.rating}★`, label: `${SITE.reviews} Google reviews` },
      { value: "Mon–Sat", label: "Office hours, closed Sunday" },
      { value: "Free", label: "Inspection & written quote" },
    ],
  },
  fr: {
    eyebrow: "Ce qu’un remplacement complet implique",
    title: "Un toit en fin de vie, et ce qu’il devient.",
    description:
      "Photos illustratives d’un remplacement complet en bardeaux — la même dépose, la même vérification du support et la même installation que sur chaque chantier. Faites glisser le curseur pour comparer.",
    before: "Avant",
    after: "Après",
    altBefore:
      "Photo illustrative : ancien toit en bardeaux abîmé par les tempêtes avant remplacement",
    altAfter: "Photo illustrative : nouveau toit en bardeaux architecturaux après remplacement",
    slider: "Position de la comparaison avant et après",
    note: "Photos illustratives. Demandez-nous des photos avant/après de chantiers terminés près de chez vous.",
    stats: [
      { value: `${SITE.rating}★`, label: `${SITE.reviews} avis Google` },
      { value: "Lun–sam", label: "Heures d’ouverture, fermé dimanche" },
      { value: "Gratuit", label: "Inspection et devis écrit" },
    ],
  },
  es: {
    eyebrow: "Lo que implica un reemplazo completo",
    title: "Un techo al final de su vida, y en qué se convierte.",
    description:
      "Fotos ilustrativas de un reemplazo completo de shingle: la misma remoción, la misma revisión de la base y la misma instalación que hacemos en cada trabajo. Deslice el control para comparar.",
    before: "Antes",
    after: "Después",
    altBefore:
      "Foto ilustrativa: techo de shingle viejo y dañado por tormentas antes del reemplazo",
    altAfter: "Foto ilustrativa: techo nuevo de shingle arquitectónico después del reemplazo",
    slider: "Posición de la comparación de antes y después",
    note: "Fotos ilustrativas. Pídanos fotos antes y después de trabajos terminados cerca de usted.",
    stats: [
      { value: `${SITE.rating}★`, label: `${SITE.reviews} rese\xf1as de Google` },
      { value: "Lun–sáb", label: "Horario de oficina, domingo cerrado" },
      { value: "Gratis", label: "Inspección y cotización por escrito" },
    ],
  },
};
export function TransformationsSection() {
  const t = copy[useLocale()];
  // The slider never re-renders React while dragging: the position lives in a ref and one
  // requestAnimationFrame per frame moves four layers with compositor-only transforms (no
  // clip-path, no left/width), so the photos are never repainted mid-drag.
  const box = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const pos = useRef(50);
  const raf = useRef(0);
  const rect = useRef<{ left: number; width: number } | null>(null);

  function paint() {
    raf.current = 0;
    const el = box.current;
    if (!el) return;
    const w = el.clientWidth;
    const x = (w * pos.current) / 100;
    if (clip.current) clip.current.style.transform = `translate3d(${x - w}px,0,0)`;
    if (inner.current) inner.current.style.transform = `translate3d(${w - x}px,0,0)`;
    const shift = `translate3d(${x - w / 2}px,0,0)`;
    if (line.current) line.current.style.transform = shift;
    if (handle.current) handle.current.style.transform = shift;
    if (input.current) input.current.value = String(Math.round(pos.current));
  }
  function set(value: number) {
    pos.current = Math.max(0, Math.min(100, value));
    if (!raf.current) raf.current = requestAnimationFrame(paint);
  }
  function fromPointer(clientX: number) {
    const r = rect.current;
    if (r && r.width > 0) set(((clientX - r.left) / r.width) * 100);
  }
  useEffect(() => {
    paint();
    const el = box.current;
    if (!el || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return (
    <section
      id="transformations"
      aria-labelledby="transform-heading"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand">{t.eyebrow}</p>
          <h2
            id="transform-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-white"
          >
            <Words>{t.title}</Words>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
            {t.description}
          </p>
        </div>
        <div
          ref={box}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            // Measure once per drag, not on every move (getBoundingClientRect forces layout).
            const r = e.currentTarget.getBoundingClientRect();
            rect.current = { left: r.left, width: r.width };
            fromPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e.clientX);
          }}
          onPointerUp={() => (rect.current = null)}
          onPointerCancel={() => (rect.current = null)}
          className="relative mt-14 aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/60 sm:aspect-[16/9]"
        >
          <Img
            src="roof-after"
            fill
            alt={t.altAfter}
            draggable="false"
            loading="lazy"
            className="object-cover"
          />
          <div
            ref={clip}
            className="absolute inset-0 overflow-hidden will-change-transform"
            style={{ transform: "translate3d(-50%,0,0)" }}
          >
            <div
              ref={inner}
              className="absolute inset-0 will-change-transform"
              style={{ transform: "translate3d(50%,0,0)" }}
            >
              <Img
                src="roof-before"
                fill
                alt={t.altBefore}
                draggable="false"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {t.before}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
            {t.after}
          </span>
          <div
            ref={line}
            className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] will-change-transform"
            aria-hidden="true"
          />
          <input
            type="range"
            min="0"
            max="100"
            aria-label={t.slider}
            className="peer pointer-events-none absolute inset-0 size-full opacity-0"
            role="slider"
            ref={input}
            defaultValue={50}
            onChange={(e) => set(Number(e.target.value))}
          />
          <div
            ref={handle}
            className="pointer-events-none absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-brand text-ink shadow-[0_0_30px_rgba(242,107,29,0.7)] will-change-transform peer-focus-visible:ring-4 peer-focus-visible:ring-white/50"
            aria-hidden="true"
          >
            <ChevronsLeftRight className="size-6" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-white/45">{t.note}</p>
        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center transition-colors hover:border-brand/30"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-black text-brand">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-white/60">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

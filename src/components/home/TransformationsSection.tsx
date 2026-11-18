import { useState } from "react";
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
  const [position, setPosition] = useState(50);
  function update(x: number, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    setPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  }
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
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            update(e.clientX, e.currentTarget);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e.clientX, e.currentTarget);
          }}
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
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <Img
              src="roof-before"
              fill
              alt={t.altBefore}
              draggable="false"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <span className="glass-chip on-photo absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {t.before}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
            {t.after}
          </span>
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          />
          <input
            type="range"
            min="0"
            max="100"
            aria-label={t.slider}
            className="peer pointer-events-none absolute inset-0 size-full opacity-0"
            role="slider"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
          />
          <div
            className="pointer-events-none absolute top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-brand text-ink shadow-[0_0_30px_rgba(242,107,29,0.7)] peer-focus-visible:ring-4 peer-focus-visible:ring-white/50"
            style={{ left: `${position}%` }}
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

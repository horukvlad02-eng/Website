import { useMemo, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useLocale, L } from "@/components/site/L";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { lifespan } from "@/content/lifespan";
import { SITE } from "@/lib/site";

const MAX_AGE = 40;

/**
 * Roof lifespan calculator (v17).
 *
 * A small, honest tool: pick a material, drag the age, get the expected service life and a plain
 * verdict. It hands off to the free inspection — it never replaces one.
 *
 * The age control is a real range input (works with a keyboard and a screen reader) rather than
 * a custom drag widget, so it costs nothing on the main thread.
 */
export function LifespanSection() {
  const locale = useLocale();
  const t = lifespan[locale];
  const [materialId, setMaterialId] = useState(t.materials[0]!.id);
  const [age, setAge] = useState(12);

  const material = useMemo(
    () => t.materials.find((m) => m.id === materialId) ?? t.materials[0]!,
    [t.materials, materialId],
  );

  const mid = (material.min + material.max) / 2;
  const remaining = mid - age;
  const pct = Math.max(0, Math.min(100, (remaining / material.max) * 100));

  const verdict =
    remaining > material.max * 0.35
      ? t.verdictGood
      : remaining > 0
        ? t.verdictWatch
        : t.verdictReplace;

  const headline =
    remaining > 0 ? t.remaining(Math.round(remaining)) : t.overdue(Math.abs(Math.round(remaining)));

  return (
    <section id="lifespan" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.13]" aria-hidden="true">
        <svg viewBox="0 0 1200 600" className="h-full w-full" fill="none" stroke="currentColor">
          <path d="M40 470 L600 120 L1160 470" strokeWidth="1.5" />
          <path d="M120 400 v90 h960 v-90" strokeWidth="1.5" />
          <path d="M300 490 v-70 h180 v70 M720 490 v-70 h180 v70" strokeWidth="1.5" />
          <path d="M40 520 h1120 M600 120 v-60" strokeWidth="1.5" strokeDasharray="8 10" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="label-mono text-brand">
            <Reveal as="span">{t.eyebrow}</Reveal>
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            <Words>{t.title}</Words>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/70">
            <Reveal as="span">{t.description}</Reveal>
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* --- inputs --- */}
          <div className="glass glass-flat glass-dark relative overflow-hidden rounded-[28px] p-6 text-white shadow-2xl shadow-ink/40 sm:p-8">
            <fieldset>
              <legend className="label-mono text-white/55">{t.materialLabel}</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.materials.map((m) => {
                  const on = m.id === materialId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMaterialId(m.id)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        on
                          ? "border-brand bg-brand text-ink"
                          : "border-white/20 text-white/75 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <label htmlFor="lifespan-age" className="label-mono text-white/55">
                {t.ageLabel}
              </label>
              <div className="mt-3 flex items-baseline gap-3">
                <output
                  htmlFor="lifespan-age"
                  className="font-display text-5xl font-black tabular-nums text-white"
                  data-mvc="1"
                >
                  {age}
                </output>
                <span className="text-lg text-white/60">{t.ageUnit}</span>
              </div>
              <input
                id="lifespan-age"
                type="range"
                min={0}
                max={MAX_AGE}
                step={1}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="range-brand mt-4"
                style={{
                  background: `linear-gradient(to right,#f26b1d 0%,#ff8a3d ${(age / MAX_AGE) * 100}%,rgba(255,255,255,.1) ${(age / MAX_AGE) * 100}%)`,
                }}
              />
              <div className="mt-2 flex justify-between text-[11px] text-white/50">
                <span>0</span>
                <span>{MAX_AGE}+</span>
              </div>
            </div>
          </div>

          {/* --- result --- */}
          <div className="glass glass-flat glass-dark relative overflow-hidden rounded-[28px] p-6 text-white shadow-2xl shadow-ink/40 sm:p-8">
            <p className="label-mono text-white/55">{t.resultLabel}</p>
            <p className="mt-3 font-display text-4xl font-black leading-none tabular-nums text-white sm:text-5xl">
              {material.min}–{material.max}
              <span className="ml-2 text-lg font-bold text-white/60">{t.ageUnit}</span>
            </p>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-bright transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>

            <p className="mt-6 font-display text-xl font-black text-white" aria-live="polite">
              {headline}
            </p>
            <p className="mt-2 text-white/70">{verdict}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{material.note}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <L className="btn-primary group whitespace-nowrap" to="/#inspection">
                {t.cta}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </L>
              <a href={SITE.phoneHref} className="btn-outline-light whitespace-nowrap">
                <Phone className="size-4 text-brand" aria-hidden="true" />
                {t.ctaSecondary}
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-white/50">{t.disclaimer}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-[1fr_1.2fr]">
          <h3 className="font-display text-xl font-black text-white sm:text-2xl">{t.noteTitle}</h3>
          <ul className="space-y-3">
            {t.notes.map((n, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-white/75"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

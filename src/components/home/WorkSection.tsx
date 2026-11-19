import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Img } from "@/components/site/Img";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

export function WorkSection() {
  const t = home[useLocale()].work;
  return (
    <section
      aria-labelledby="work-heading"
      className="blueprint-paper relative overflow-hidden py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-mono text-brand">{t.text01}</p>
        <Reveal>
          <h2
            id="work-heading"
            className="display-title mt-6 max-w-3xl text-ink sm:text-5xl lg:text-6xl"
          >
            <Words>{t.text02}</Words>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/60">{t.text03}</p>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          <li className="h-full">
            <Reveal className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/projects/red-standing-seam-metal-roof/"
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                  <Img
                    src="project-red-metal"
                    fill
                    alt={t.text04}
                    loading="lazy"
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                    {t.text05}
                  </span>
                  <span
                    className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {t.text06}
                    </span>
                    <span className="flex items-center gap-1.5 text-brand-deep">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M3 11l18-8-8 18-2-8-8-2z" strokeLinejoin="round" />
                      </svg>
                      {t.text07}
                    </span>
                  </span>
                  <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text08}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/55">
                    {t.text09}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 pt-1 text-sm font-bold text-brand-deep">
                    {t.text10}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </L>
            </Reveal>
          </li>
          <li className="h-full">
            <Reveal delay={110} className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/projects/white-standing-seam-metal-roof/"
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                  <Img
                    src="project-white-metal"
                    fill
                    alt={t.text11}
                    loading="lazy"
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                    {t.text12}
                  </span>
                  <span
                    className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {t.text13}
                    </span>
                    <span className="flex items-center gap-1.5 text-brand-deep">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M3 11l18-8-8 18-2-8-8-2z" strokeLinejoin="round" />
                      </svg>
                      {t.text14}
                    </span>
                  </span>
                  <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text15}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/55">
                    {t.text16}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 pt-1 text-sm font-bold text-brand-deep">
                    {t.text17}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </L>
            </Reveal>
          </li>
          <li className="h-full">
            <Reveal delay={220} className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/projects/commercial-flat-roof-installation/"
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                  <Img
                    src="project-flat-crew"
                    fill
                    alt={t.text18}
                    loading="lazy"
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                    {t.text19}
                  </span>
                  <span
                    className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {t.text20}
                    </span>
                    <span className="flex items-center gap-1.5 text-brand-deep">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M3 11l18-8-8 18-2-8-8-2z" strokeLinejoin="round" />
                      </svg>
                      {t.text21}
                    </span>
                  </span>
                  <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text22}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/55">
                    {t.text23}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 pt-1 text-sm font-bold text-brand-deep">
                    {t.text24}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </L>
            </Reveal>
          </li>
        </ul>
        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <L
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft"
            to="/projects/"
          >
            {t.text25}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </L>
          <a href="tel:+17863724754" className="btn-outline-dark">
            {t.text26}
          </a>
        </div>
      </div>
    </section>
  );
}

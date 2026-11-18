import { Blueprint } from "@/components/site/Blueprint";
import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Img } from "@/components/site/Img";
import { ArrowUpRight, Building2, Droplets, House, Layers } from "lucide-react";

export function ServicesSection() {
  const t = home[useLocale()].services;
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="blueprint-paper relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -right-20 top-4 opacity-[0.09]"
        aria-hidden="true"
      >
        <Blueprint className="pointer-events-none absolute select-none text-blueprint-ink-dark h-[520px] w-[920px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand-deep">{t.text01}</p>
          <h2
            id="services-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
          >
            <Words>{t.text02}</Words>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/60">
            {t.text03}
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <Reveal className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/services/metal-roofing/"
              >
                <div className="img-zoom relative aspect-[5/4] overflow-hidden">
                  <Img src="service-metal" fill alt="" loading="lazy" className="object-cover" />
                  <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                    {t.text04}
                  </span>
                  <span
                    className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-brand">
                    <Layers className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text05}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{t.text06}</p>
                  <span className="mt-4 block h-px w-10 bg-ink/10" aria-hidden="true" />
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text07}
                    </li>
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text08}
                    </li>
                  </ul>
                </div>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={110} className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/services/tile-shingle-replacement/"
              >
                <div className="img-zoom relative aspect-[5/4] overflow-hidden">
                  <Img
                    src="service-residential"
                    fill
                    alt=""
                    loading="lazy"
                    className="object-cover"
                  />
                  <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                    {t.text09}
                  </span>
                  <span
                    className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-brand">
                    <House className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text10}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{t.text11}</p>
                  <span className="mt-4 block h-px w-10 bg-ink/10" aria-hidden="true" />
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text12}
                    </li>
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text13}
                    </li>
                  </ul>
                </div>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={220} className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/services/flat-commercial/"
              >
                <div className="img-zoom relative aspect-[5/4] overflow-hidden">
                  <Img
                    src="service-commercial"
                    fill
                    alt=""
                    loading="lazy"
                    className="object-cover"
                  />
                  <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                    {t.text14}
                  </span>
                  <span
                    className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-brand">
                    <Building2 className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text15}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{t.text16}</p>
                  <span className="mt-4 block h-px w-10 bg-ink/10" aria-hidden="true" />
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text17}
                    </li>
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text18}
                    </li>
                  </ul>
                </div>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={330} className="h-full">
              <L
                className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                to="/services/emergency-leak-repair/"
              >
                <div className="img-zoom relative aspect-[5/4] overflow-hidden">
                  <Img
                    src="service-emergency"
                    fill
                    alt=""
                    loading="lazy"
                    className="object-cover"
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
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-brand">
                    <Droplets className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold leading-snug text-ink">
                    {t.text20}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{t.text21}</p>
                  <span className="mt-4 block h-px w-10 bg-ink/10" aria-hidden="true" />
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text22}
                    </li>
                    <li className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/70">
                      {t.text23}
                    </li>
                  </ul>
                </div>
              </L>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

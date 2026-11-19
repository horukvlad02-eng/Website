import { Blueprint } from "@/components/site/Blueprint";
import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { imageUrl } from "@/components/site/Img";
import { HeroStatus } from "@/components/widgets/HeroStatus";
import { ArrowRight, Check, Phone, ShieldCheck, Star } from "lucide-react";

export function HeroSection() {
  const t = home[useLocale()].hero;
  return (
    <section id="top" className="relative overflow-hidden isolate bg-ink hero-zone">
      {/*
        The hero photo is decorative texture behind a gradient, so it is painted as a CSS
        background: a background image is not an LCP candidate, which lets the <h1> be the
        Largest Contentful Paint instead of a 100 KB <img> (see src/content/meta.ts).
      */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-55 lg:[background-position:70%_50%]"
          style={{ backgroundImage: `url(${imageUrl("hero-roof", 1376)})` }}
        />
      </div>
      <div className="absolute inset-0 -z-20 opacity-[0.16]" aria-hidden="true">
        <Blueprint className="pointer-events-none absolute select-none text-blueprint-ink h-full w-full" />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/88 to-ink/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-20">
        <div className="max-w-3xl">
          <div className="rise">
            <a
              href="#reviews"
              className="glass-chip group inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-semibold text-white transition-all hover:border-brand/50 sm:text-sm"
            >
              <span
                className="flex items-center gap-0.5 rounded-full bg-brand px-2 py-0.5"
                aria-hidden="true"
              >
                <Star className="size-3 fill-ink text-ink" aria-hidden="true" />
                <Star className="size-3 fill-ink text-ink" aria-hidden="true" />
                <Star className="size-3 fill-ink text-ink" aria-hidden="true" />
                <Star className="size-3 fill-ink text-ink" aria-hidden="true" />
                <Star className="size-3 fill-ink text-ink" aria-hidden="true" />
              </span>
              <span>
                {t.text01}
                {t.text02}{" "}
                <span className="text-white/60">
                  {t.text03}
                  {t.text04} {t.text05}
                  {t.text06}
                </span>
              </span>
            </a>
            <HeroStatus />
          </div>
          <div className="rise" style={{ "--d": "100ms" } as React.CSSProperties}>
            <h1 className="mt-7 text-balance font-display text-[2.7rem] font-black leading-[0.94] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.6rem]">
              {t.text07}
            </h1>
          </div>
          <div className="rise" style={{ "--d": "200ms" } as React.CSSProperties}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
              {t.text08}
            </p>
          </div>
          <div className="rise" style={{ "--d": "300ms" } as React.CSSProperties}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <L className="btn-primary group" to="/#inspection">
                {t.text09}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </L>
              <a href="tel:+17863724754" className="btn-outline-light">
                <Phone className="size-4 text-brand" aria-hidden="true" />
                {t.text10}
              </a>
            </div>
          </div>
          <div className="rise" style={{ "--d": "400ms" } as React.CSSProperties}>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <dt className="label-mono text-white/55">{t.text11}</dt>
                <dd className="mt-2 font-display text-2xl font-extrabold text-white">{t.text12}</dd>
              </div>
              <div>
                <dt className="label-mono text-white/55">{t.text13}</dt>
                <dd className="mt-2 font-display text-2xl font-extrabold text-white">{t.text14}</dd>
              </div>
              <div>
                <dt className="label-mono text-white/55">{t.text15}</dt>
                <dd className="mt-2 font-display text-2xl font-extrabold text-white">{t.text16}</dd>
              </div>
              <div>
                <dt className="label-mono text-white/55">{t.text17}</dt>
                <dd className="mt-2 flex items-center gap-2 font-display text-2xl font-extrabold text-white">
                  <ShieldCheck className="size-5 text-brand" aria-hidden="true" />
                  {t.text18}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="rise relative z-20 mt-14 sm:mt-16"
          style={{ "--d": "500ms" } as React.CSSProperties}
        >
          <div className="glass glass-interactive max-w-2xl rounded-[28px] p-7 sm:p-9">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="absolute size-5 border-white/15 left-4 top-4 border-l border-t" />
              <span className="absolute size-5 border-white/15 right-4 top-4 border-r border-t" />
              <span className="absolute size-5 border-white/15 left-4 bottom-4 border-b border-l" />
              <span className="absolute size-5 border-white/15 right-4 bottom-4 border-b border-r" />
            </div>
            <p className="label-mono text-brand">{t.text19}</p>
            <h2 className="mt-4 font-display text-[1.75rem] font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
              {t.text20}
            </h2>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-[15px] text-white/85 sm:text-base">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {t.text21}
              </li>
              <li className="flex items-start gap-3 text-[15px] text-white/85 sm:text-base">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {t.text22}
              </li>
              <li className="flex items-start gap-3 text-[15px] text-white/85 sm:text-base">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {t.text23}
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <L className="btn-light" to="/#inspection">
                {t.text24}
                <ArrowRight className="size-4" aria-hidden="true" />
              </L>
              <a
                href="tel:+17863724754"
                className="label-mono text-white/55 transition-colors hover:text-brand"
              >
                {t.text25}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

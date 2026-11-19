import { useLocale } from "@/components/site/L";
import { pages } from "@/content/pages";
import { Words } from "@/components/motion/Words";
import { Accordion } from "@/components/site/Accordion";
import { TotalPrice } from "@/components/sections/TotalPrice";
import { Inspection } from "@/components/sections/Inspection";
import { ArrowDown, CalendarClock, CreditCard, House, Leaf, Phone } from "lucide-react";

export function FinancingPage() {
  const copy = pages["financing"][useLocale()];
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand">{copy.text[0]}</p>
          <h1 className="display-title mt-6 max-w-4xl text-balance text-[2.4rem] text-white sm:text-6xl lg:text-7xl">
            {copy.text[1]}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {copy.text[2]}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a className="btn-primary" href="#inspection">
              <ArrowDown className="size-4" aria-hidden="true" />
              {copy.text[3]}
            </a>
            <a className="btn-outline-light" href="tel:+17863724754">
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {copy.text[4]}
            </a>
          </div>
          <p className="label-mono mt-8 text-white/55">{copy.text[5]}</p>
        </div>
      </section>
      <section className="blueprint-paper relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            <Words>{copy.text[6]}</Words>
          </h2>
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            <li className="glass glass-flat glass-light glass-interactive flex gap-6 rounded-[28px] p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <CreditCard className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-ink">{copy.text[7]}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{copy.text[8]}</p>
              </div>
            </li>
            <li className="glass glass-flat glass-light glass-interactive flex gap-6 rounded-[28px] p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <Leaf className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-ink">{copy.text[9]}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{copy.text[10]}</p>
              </div>
            </li>
            <li className="glass glass-flat glass-light glass-interactive flex gap-6 rounded-[28px] p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <CalendarClock className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-ink">{copy.text[11]}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{copy.text[12]}</p>
              </div>
            </li>
            <li className="glass glass-flat glass-light glass-interactive flex gap-6 rounded-[28px] p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <House className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-ink">{copy.text[13]}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{copy.text[14]}</p>
              </div>
            </li>
          </ul>
          <p className="mt-10 text-center text-sm text-muted-foreground">{copy.text[15]}</p>
        </div>
      </section>
      <TotalPrice />
      <section
        aria-labelledby="financing-faq-heading"
        className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label-mono text-brand-deep">{copy.text[16]}</p>
            <h2
              className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
              id="financing-faq-heading"
            >
              <Words>{copy.text[17]}</Words>
            </h2>
          </div>
          <Accordion items={copy.faq} variant="light" className="mt-12" />
        </div>
      </section>
      <Inspection />
    </>
  );
}

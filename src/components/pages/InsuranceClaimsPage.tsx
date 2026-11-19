import { useLocale } from "@/components/site/L";
import { pages } from "@/content/pages";
import { Words } from "@/components/motion/Words";
import { Accordion } from "@/components/site/Accordion";
import { TotalPrice } from "@/components/sections/TotalPrice";
import { Inspection } from "@/components/sections/Inspection";
import { ArrowDown, ClipboardCheck, FileText, Phone, PhoneCall, Umbrella } from "lucide-react";

export function InsuranceClaimsPage() {
  const copy = pages["insurance-claims"][useLocale()];
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
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <li className="glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand">
                <PhoneCall className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{copy.text[7]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.text[8]}</p>
            </li>
            <li className="glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand">
                <ClipboardCheck className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{copy.text[9]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.text[10]}</p>
            </li>
            <li className="glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand">
                <FileText className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{copy.text[11]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.text[12]}</p>
            </li>
            <li className="glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand">
                <Umbrella className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{copy.text[13]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.text[14]}</p>
            </li>
          </ol>
        </div>
      </section>
      <section className="blueprint-paper relative overflow-hidden bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            <Words>{copy.text[15]}</Words>
          </h2>
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{copy.text[16]}</p>
            <p>{copy.text[17]}</p>
          </div>
        </div>
      </section>
      <TotalPrice />
      <section
        aria-labelledby="claims-faq-heading"
        className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label-mono text-brand-deep">{copy.text[18]}</p>
            <h2
              className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
              id="claims-faq-heading"
            >
              <Words>{copy.text[19]}</Words>
            </h2>
          </div>
          <Accordion items={copy.faq} variant="light" className="mt-12" />
        </div>
      </section>
      <Inspection />
    </>
  );
}

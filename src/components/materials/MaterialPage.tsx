import { ArrowRight, ArrowUpRight, CircleCheck, Phone, ShieldCheck } from "lucide-react";
import { L } from "@/components/site/L";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/site/Accordion";
import { Inspection } from "@/components/sections/Inspection";
import type { MaterialPageData } from "@/content/materials";

export function MaterialPage({ data }: { data: MaterialPageData }) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-20 sm:pb-24 sm:pt-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            {data.copy[0]!}
          </p>
          <h1 className="mt-5 font-display text-5xl font-black tracking-tight text-white sm:text-6xl">
            {data.copy[1]!}
          </h1>
          <p className="mt-3 text-lg font-semibold text-brand-bright">{data.copy[2]!}</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {data.copy[3]!}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#inspection"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-ink shadow-[0_0_32px_rgba(242,107,29,0.4)] transition-all hover:bg-brand-bright hover:shadow-[0_0_44px_rgba(242,107,29,0.6)]"
            >
              {data.copy[4]!}
              <ArrowRight className="size-4 rotate-90" aria-hidden="true" />
            </a>
            <a
              href="tel:+17863724754"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-base font-bold text-white transition-colors hover:border-brand hover:text-brand"
            >
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {data.copy[5]!}
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-deep">
              {data.copy[6]!}
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              <Words>{data.copy[7]!}</Words>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{data.copy[8]!}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{data.copy[9]!}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              <li className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-deep">
                {data.copy[10]!}
              </li>
              <li className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-deep">
                {data.copy[11]!}
              </li>
              <li className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-deep">
                {data.copy[12]!}
              </li>
              <li className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-deep">
                {data.copy[13]!}
              </li>
            </ul>
            <div className="mt-8 rounded-2xl border border-hairline bg-surface p-6">
              <p className="label-mono text-brand-deep">{data.copy[14]!}</p>
              <p className="mt-3 font-display text-3xl font-black text-ink">
                {data.copy[15]!}
                <span className="ml-2 font-sans text-sm font-medium text-muted-foreground">
                  {data.copy[16]!}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{data.copy[17]!}</p>
            </div>
          </div>
          <div className="space-y-5">
            <Reveal variant="right">
              <div className="group glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <CircleCheck className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">
                      {data.copy[18]!}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {data.copy[19]!}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <div className="group glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <CircleCheck className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">
                      {data.copy[20]!}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {data.copy[21]!}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="right" delay={240}>
              <div className="group glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <CircleCheck className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">
                      {data.copy[22]!}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {data.copy[23]!}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal variant="scale">
            <ShieldCheck className="mx-auto size-10 text-brand" aria-hidden="true" />
            <h2 className="mt-5 font-display text-3xl font-black text-white sm:text-4xl">
              <Words>{data.copy[24]!}</Words>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/60">{data.copy[25]!}</p>
          </Reveal>
        </div>
      </section>
      <section
        aria-labelledby="material-faq-heading"
        className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label-mono text-brand-deep">{data.copy[26]!}</p>
            <h2
              id="material-faq-heading"
              className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
            >
              <Words>{data.copy[27]!}</Words>
            </h2>
          </div>
          <Accordion items={data.faq} variant="light" className="mt-12" />
        </div>
      </section>
      <section className="bg-white py-16 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            <Words>{data.copy[28]!}</Words>
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            <li>
              <L
                to={data.links[0]!}
                className="group flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 font-display text-lg font-black text-ink/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-ink hover:shadow-[0_16px_40px_-20px_rgba(242,107,29,0.5)]"
              >
                {data.copy[29]!}
                <ArrowUpRight
                  className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </L>
            </li>
            <li>
              <L
                to={data.links[1]!}
                className="group flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 font-display text-lg font-black text-ink/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-ink hover:shadow-[0_16px_40px_-20px_rgba(242,107,29,0.5)]"
              >
                {data.copy[30]!}
                <ArrowUpRight
                  className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </L>
            </li>
            <li>
              <L
                to={data.links[2]!}
                className="group flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 font-display text-lg font-black text-ink/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-ink hover:shadow-[0_16px_40px_-20px_rgba(242,107,29,0.5)]"
              >
                {data.copy[31]!}
                <ArrowUpRight
                  className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </L>
            </li>
            <li>
              <L
                to={data.links[3]!}
                className="group flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 font-display text-lg font-black text-ink/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-ink hover:shadow-[0_16px_40px_-20px_rgba(242,107,29,0.5)]"
              >
                {data.copy[32]!}
                <ArrowUpRight
                  className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </L>
            </li>
            <li>
              <L
                to={data.links[4]!}
                className="group flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 font-display text-lg font-black text-ink/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-ink hover:shadow-[0_16px_40px_-20px_rgba(242,107,29,0.5)]"
              >
                {data.copy[33]!}
                <ArrowUpRight
                  className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </L>
            </li>
          </ul>
        </div>
      </section>
      <Inspection />
    </>
  );
}

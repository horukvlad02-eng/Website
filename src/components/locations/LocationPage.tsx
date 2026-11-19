import { ArrowDown, MapPin, Phone } from "lucide-react";
import { L } from "@/components/site/L";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/site/Accordion";
import { Inspection } from "@/components/sections/Inspection";
import { Reviews } from "@/components/sections/Reviews";
import type { LocationPageData } from "@/content/locations";

export function LocationPage({ data }: { data: LocationPageData }) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand">{data.copy[0]!}</p>
          <h1 className="display-title mt-6 max-w-4xl text-balance text-[2.4rem] text-white sm:text-6xl lg:text-7xl">
            {data.copy[1]!}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {data.copy[2]!}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#inspection" className="btn-primary">
              <ArrowDown className="size-4" aria-hidden="true" />
              {data.copy[3]!}
            </a>
            <a href="tel:+17863724754" className="btn-outline-light">
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {data.copy[4]!}
            </a>
          </div>
          <p className="label-mono mt-8 text-white/55">{data.copy[5]!}</p>
        </div>
      </section>
      <section className="blueprint-paper relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-deep">
            <MapPin className="size-4" aria-hidden="true" />
            {data.copy[6]!}
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
            <Words>{data.copy[7]!}</Words>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{data.copy[8]!}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="glass glass-flat glass-light rounded-[28px] p-6">
              <p className="label-mono text-brand-deep">{data.copy[9]!}</p>
              <p className="mt-3 font-display text-2xl font-black text-ink">
                {data.copy[10]!}
                <span className="ml-2 font-sans text-sm font-medium text-muted-foreground">
                  {data.copy[11]!}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{data.copy[12]!}</p>
            </div>
            <div className="glass glass-flat glass-light rounded-[28px] p-6">
              <p className="label-mono text-brand-deep">{data.copy[13]!}</p>
              <p className="mt-3 font-display text-2xl font-black text-ink">
                {data.copy[14]!}
                <span className="ml-2 font-sans text-sm font-medium text-muted-foreground">
                  {data.copy[15]!}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{data.copy[16]!}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="blueprint-paper relative overflow-hidden bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            <Words>{data.copy[17]!}</Words>
          </h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <L
                to={data.links[0]!}
                className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                  {data.copy[18]!}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold text-ink group-hover:text-brand-deep">
                  {data.copy[19]!} {data.copy[20]!} {data.copy[21]!}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {data.copy[22]!}
                </p>
              </L>
            </li>
            <li>
              <L
                to={data.links[1]!}
                className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                  {data.copy[23]!}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold text-ink group-hover:text-brand-deep">
                  {data.copy[24]!} {data.copy[25]!} {data.copy[26]!}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {data.copy[27]!}
                </p>
              </L>
            </li>
            <li>
              <L
                to={data.links[2]!}
                className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                  {data.copy[28]!}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold text-ink group-hover:text-brand-deep">
                  {data.copy[29]!} {data.copy[30]!} {data.copy[31]!}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {data.copy[32]!}
                </p>
              </L>
            </li>
            <li>
              <L
                to={data.links[3]!}
                className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                  {data.copy[33]!}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold text-ink group-hover:text-brand-deep">
                  {data.copy[34]!} {data.copy[35]!} {data.copy[36]!}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {data.copy[37]!}
                </p>
              </L>
            </li>
          </ul>
        </div>
      </section>
      <Reviews />
      <section
        aria-labelledby="location-faq-heading"
        className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label-mono text-brand-deep">{data.copy[38]!}</p>
            <h2
              id="location-faq-heading"
              className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
            >
              <Words>{data.copy[39]!}</Words>
            </h2>
          </div>
          <Accordion items={data.faq} variant="light" className="mt-12" />
        </div>
      </section>
      <Inspection />
    </>
  );
}

import { useLocale } from "@/components/site/L";
import { pages } from "@/content/pages";
import { Img } from "@/components/site/Img";
import { Brands } from "@/components/sections/Brands";
import { Credentials } from "@/components/sections/Credentials";
import { TotalPrice } from "@/components/sections/TotalPrice";
import { Reviews } from "@/components/sections/Reviews";
import { Inspection } from "@/components/sections/Inspection";

export function WhyCenturionPage() {
  const copy = pages["why-centurion"][useLocale()];
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="rise">
            <div className="img-zoom relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/60">
              <Img
                src="project-torchdown"
                alt={copy.attributes[0]}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="rise" style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
              {copy.text[0]}
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl">
              {copy.text[1]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">{copy.text[2]}</p>
            <p className="mt-4 text-lg leading-relaxed text-white/60">{copy.text[3]}</p>
          </div>
        </div>
      </section>
      <Brands />
      <Credentials />
      <TotalPrice />
      <Reviews />
      <Inspection />
    </>
  );
}

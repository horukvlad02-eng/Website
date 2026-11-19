import { useLocale } from "@/components/site/L";
import { pages } from "@/content/pages";
import { ArrowDown, Phone } from "lucide-react";
import type { PageCopy } from "@/content/pages";
import { Words } from "@/components/motion/Words";

function LegalBody({ blocks }: { blocks: PageCopy["legal"] }) {
  return (
    <section className="bg-white py-16 sm:py-24 blueprint-paper">
      <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
        {blocks.map((block) => (
          <div key={block.heading}>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              <Words>{block.heading}</Words>
            </h2>
            {block.paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-3 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
export function LegalPage({ page }: { page: "privacy" | "terms" }) {
  const copy = pages[page][useLocale()];
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
      <LegalBody blocks={copy.legal} />
    </>
  );
}

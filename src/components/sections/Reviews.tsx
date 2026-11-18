import { BadgeCheck, Quote, Star } from "lucide-react";
import { useLocale } from "@/components/site/L";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import type { Locale } from "@/lib/i18n";

const REVIEWS = [
  {
    name: "Eugenia",
    text: "Eduin was incredibly patient and answered all my questions. Professional, timely, and our new metal roof looks amazing!",
  },
  {
    name: "Vivian Noel",
    text: "Eduin and his company were timely, considerate and professional. The quote was fair. I recommend Centurion Roofing.",
  },
  { name: "Kei Shimura", text: "Great service. Very responsible and excellent price." },
  { name: "Janoy Gonzalez", text: "Professional, quality, fair pricing." },
  { name: "Joe Red", text: "They work as a team and are very efficient." },
];

const T: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    based: string;
    hours: string;
    source: string;
    stars: string;
    verified: string;
  }
> = {
  en: {
    eyebrow: "Customer Reviews",
    title: "What Miami homeowners say.",
    based: "Based on 65+ verified Google reviews",
    hours: "Mon–Fri 7am–5pm · Sat 7am–2pm",
    source: "Google review",
    stars: "5 out of 5 stars",
    verified: "Verified",
  },
  es: {
    eyebrow: "Reseñas de clientes",
    title: "Lo que dicen los propietarios en Miami.",
    based: "Basado en 65+ reseñas verificadas de Google",
    hours: "Lun–vie 7am–5pm · sáb 7am–2pm",
    source: "Reseña de Google",
    stars: "5 estrellas de 5",
    verified: "Verificada",
  },
  fr: {
    eyebrow: "Avis clients",
    title: "Ce que disent les propriétaires à Miami.",
    based: "Basé sur 65+ avis Google vérifiés",
    hours: "Lun–ven 7 h–17 h · sam 7 h–14 h",
    source: "Avis Google",
    stars: "5 étoiles sur 5",
    verified: "Vérifié",
  },
};

function Stars({ label, className }: { label: string; className?: string }) {
  return (
    <div className={className ?? "flex gap-0.5"} role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4 fill-star text-star" aria-hidden="true" />
      ))}
    </div>
  );
}

/** Google reviews block (home, city pages, Why Centurion). */
export function Reviews() {
  const t = T[useLocale()];
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand-deep">{t.eyebrow}</p>
          <h2
            id="reviews-heading"
            className="display-title mt-5 text-balance text-[2rem] text-ink sm:text-5xl lg:text-6xl"
          >
            <Words>{t.title}</Words>
          </h2>
        </div>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 glass glass-flat glass-light glass-interactive rounded-[28px] px-8 py-6 shadow-[0_20px_60px_-30px_rgba(242,107,29,0.6)] sm:flex-row sm:gap-6">
          <span className="font-display text-6xl font-black leading-none text-ink tabular-nums">
            4.9
          </span>
          <div className="text-center sm:text-left">
            <Stars label={t.stars} className="flex justify-center gap-0.5 sm:justify-start" />
            <p className="mt-1.5 text-sm font-semibold text-ink">{t.based}</p>
            <p className="text-xs text-muted-foreground">{t.hours}</p>
          </div>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li key={r.name}>
              <Reveal delay={i * 100} className="h-full">
                <div className="group relative flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
                  <Quote
                    className="absolute right-6 top-6 size-10 text-secondary transition-colors group-hover:text-brand/20"
                    aria-hidden="true"
                  />
                  <Stars label={t.stars} />
                  <blockquote
                    lang="en"
                    className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/80"
                  >
                    <p>“{r.text}”</p>
                  </blockquote>
                  <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-brand">
                      {r.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <p className="flex items-center gap-1 text-sm font-bold text-ink">
                        {r.name}
                        <BadgeCheck className="size-4 text-brand" aria-label={t.verified} />
                      </p>
                      <p className="text-xs text-muted-foreground">{t.source}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

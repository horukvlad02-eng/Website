import { House, Phone, Search } from "lucide-react";
import { useEffect } from "react";
import { L } from "@/components/site/L";
import { startMotion } from "@/components/motion/engine";
import { SITE } from "@/lib/site";

const corners = [
  "left-4 top-4 border-l border-t",
  "right-4 top-4 border-r border-t",
  "left-4 bottom-4 border-b border-l",
  "right-4 bottom-4 border-b border-r",
];

/** Full-screen 404 in the blueprint style. */
export function NotFoundPage() {
  useEffect(() => {
    startMotion();
    document.title = "Page not found | Centurion Roofing";
  }, []);
  return (
    <div className="blueprint-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true">
        <svg
          viewBox="0 0 900 520"
          className="h-full w-full text-blueprint-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M120 300 450 90l330 210" />
          <path d="M180 262v170h540V262" />
          <path d="M260 432V320h120v112M520 330h120v70H520z" />
          <path d="M60 470h780M450 90v-40M120 300l-40 26M780 300l40 26" strokeDasharray="6 8" />
        </svg>
      </div>
      <div className="relative w-full max-w-2xl">
        <div className="glass glass-interactive relative rounded-[28px] p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {corners.map((c) => (
              <span key={c} className={`absolute size-5 border-white/15 ${c}`} />
            ))}
          </div>
          <p className="label-mono text-brand">404 · Page not found</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-black tracking-tight sm:text-5xl">
            This page has been taken down by the storm.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/60">
            The page you were looking for does not exist or has moved. Our crews are on the roofs —
            the office is ready to help.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={SITE.phoneHref} className="btn-primary group">
              <Phone className="size-4" aria-hidden="true" />
              {SITE.phone}
            </a>
            <L className="btn-outline-light group" to="/services/">
              <Search className="size-4" aria-hidden="true" />
              Browse our services
            </L>
          </div>
          <L
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            to="/"
          >
            <House className="size-4" aria-hidden="true" />
            Back to the home page
          </L>
        </div>
      </div>
    </div>
  );
}

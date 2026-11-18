import { useLocation } from "@tanstack/react-router";
import { L } from "@/components/site/L";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { pathname } = useLocation();
  return (
    <L
      to="/"
      aria-label="Centurion Roofing home"
      className={cn("group flex items-center gap-2.5", className)}
      onClick={(e) => {
        // Already on the home page: glide back to the top instead of reloading.
        if (/^\/(es\/|fr\/)?$/.test(pathname)) {
          e.preventDefault();
          history.replaceState(null, "", pathname);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-bright to-brand shadow-[0_0_20px_rgba(242,107,29,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <svg viewBox="0 0 24 24" className="size-5 text-ink" fill="none" aria-hidden="true">
          <path
            d="M3 12 12 4l9 8"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 14l5-4.4 5 4.4"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-black uppercase tracking-[0.08em]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          Centurion
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
          Roofing
        </span>
      </span>
    </L>
  );
}

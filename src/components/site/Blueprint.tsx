import { cn } from "@/lib/utils";

/** Decorative blueprint roof drawing used behind several sections. */
export function Blueprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 520"
      className={cn("pointer-events-none absolute select-none", className)}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.3">
        <path d="M120 360 L420 120 L720 360" />
        <path d="M120 378 L420 138 L720 378" opacity="0.7" />
        <path d="M120 396 L420 156 L720 396" opacity="0.5" />
        <path d="M120 414 L420 174 L720 414" opacity="0.35" />
        <g strokeWidth="0.9" opacity="0.6">
          <path d="M120 460 L720 460" />
          <path d="M120 448 L120 472 M720 448 L720 472" />
        </g>
        <g strokeWidth="0.9" opacity="0.45">
          <path d="M120 340 L60 340 M720 340 L780 340" />
          <path d="M60 328 L60 352 M780 328 L780 352" />
        </g>
        <circle cx="790" cy="200" r="52" opacity="0.5" />
        <circle cx="790" cy="200" r="34" opacity="0.35" />
      </g>
    </svg>
  );
}

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const TONES = {
  dark: {
    item: "rounded-2xl border border-white/10 bg-ink-soft/50 px-5 data-[open=true]:border-brand/40 data-[open=true]:bg-ink-soft",
    button: "py-4 font-display text-base font-extrabold text-white",
    icon: "size-8 bg-brand/15 text-lg text-brand group-data-[open=true]:bg-brand group-data-[open=true]:text-ink",
    answer: "pb-5 leading-relaxed text-white/70",
    gap: "space-y-3",
  },
  light: {
    item: "rounded-2xl border border-border bg-white px-6 shadow-sm data-[open=true]:border-brand/40 data-[open=true]:shadow-[0_20px_50px_-30px_rgba(242,107,29,0.5)]",
    button: "py-5 font-display text-base font-extrabold text-ink",
    icon: "size-8 bg-ink text-lg text-brand group-data-[open=true]:bg-brand group-data-[open=true]:text-ink",
    answer: "pb-5 leading-relaxed text-muted-foreground",
    gap: "space-y-4",
  },
} as const;

export type QA = { q: string; a: ReactNode };

/** Animated FAQ list: one item open at a time, arrow-key navigation between questions. */
export function Accordion({
  items,
  variant = "dark",
  className,
}: {
  items: QA[];
  variant?: keyof typeof TONES;
  className?: string;
}) {
  const t = TONES[variant];
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next !== null) {
      e.preventDefault();
      refs.current[next]?.focus();
    }
  };

  return (
    <div className={cn(t.gap, className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const qId = `${id}-q${i}`;
        const aId = `${id}-a${i}`;
        return (
          <Reveal key={item.q} delay={60 * i}>
            <div
              data-open={isOpen}
              className={cn(
                "acc-item group transition-[border-color,background-color,box-shadow] duration-300",
                t.item,
              )}
            >
              <h3>
                <button
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  id={qId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={aId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
                    t.button,
                  )}
                >
                  <span>{item.q}</span>
                  <span
                    className={cn(
                      "acc-icon flex shrink-0 items-center justify-center rounded-full font-bold leading-none",
                      t.icon,
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={aId}
                role="region"
                aria-labelledby={qId}
                data-open={isOpen}
                className="acc-panel"
              >
                <div className="acc-inner">
                  <p className={t.answer}>{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

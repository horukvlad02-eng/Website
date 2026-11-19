import { useEffect, type CSSProperties, type ReactNode } from "react";
import { requestScan } from "./engine";

type Props = {
  children: ReactNode;
  /** Entrance direction. "up" is the default; grids get card/left/right variety automatically. */
  variant?: "up" | "left" | "right" | "scale" | "fade";
  /** Delay in ms before the entrance starts. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span";
};

/** Scroll-reveal wrapper. Content is always rendered; the motion engine only adds classes. */
export function Reveal({ children, variant = "up", delay = 0, className, as: Tag = "div" }: Props) {
  useEffect(requestScan, []);
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag
      data-reveal={variant}
      className={className ? `reveal ${className}` : "reveal"}
      style={style}
    >
      {children}
    </Tag>
  );
}

import { useEffect, type CSSProperties } from "react";
import { requestScan } from "./engine";

/** Word-by-word heading reveal. Screen readers get the plain sentence. */
export function Words({ children }: { children?: string | undefined }) {
  useEffect(requestScan, []);
  const text = (children ?? "").replace(/\s+/g, " ").trim();
  const words = text.split(" ");
  return (
    <span className="words">
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w">
            <span className="wi" style={{ "--i": i } as CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

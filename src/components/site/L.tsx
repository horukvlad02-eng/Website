import { Link, useLocation } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { localizePath, splitLocale, type Locale } from "@/lib/i18n";

export function useLocale(): Locale {
  // Derived from the URL so it also works in not-found and error screens.
  return useLocation({ select: (l) => splitLocale(l.pathname).locale });
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Locale-less app path, e.g. "/projects/" or "/#inspection". */
  to: string;
  children?: ReactNode;
};

// Paths are built at runtime from content, so the typed `to` of <Link> is widened here.
const AnyLink = Link as unknown as (p: Record<string, unknown>) => ReactNode;

/** Locale-aware internal link with intent preloading. */
export function L({ to, children, ...rest }: Props) {
  const locale = useLocale();
  const href = localizePath(locale, to);
  const i = href.indexOf("#");
  const path = i >= 0 ? href.slice(0, i) : href;
  const hash = i >= 0 ? href.slice(i + 1) : undefined;
  return (
    <AnyLink to={path} hash={hash} preload="intent" {...rest}>
      {children}
    </AnyLink>
  );
}

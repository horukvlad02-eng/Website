import { Outlet, createFileRoute, notFound, useLocation } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { scan, startMotion } from "@/components/motion/engine";
import { skipLink } from "@/content/pages";
import { splitLocale } from "@/lib/i18n";
import { track } from "@/lib/track";

// The chat/booking widget is split out and only loaded once the browser is idle.
const BookingWidget = lazy(() => import("@/components/widgets/BookingWidget"));

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && params.locale !== "es" && params.locale !== "fr")
      throw notFound();
  },
  component: LocaleLayout,
  notFoundComponent: NotFoundPage,
});

function useIdleMount() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & typeof globalThis;
    const go = () => setReady(true);
    if ("requestIdleCallback" in w) {
      const id = w.requestIdleCallback(go, { timeout: 2500 });
      return () => w.cancelIdleCallback(id);
    }
    const t = setTimeout(go, 1200);
    return () => clearTimeout(t);
  }, []);
  return ready;
}

function LocaleLayout() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  const mainRef = useRef<HTMLElement>(null);
  const widget = useIdleMount();

  // Motion engine: boot once, re-scan on every page change.
  useEffect(() => {
    startMotion();
    document.documentElement.classList.remove("lang-switching");
    scan();
    if (first.current) {
      first.current = false;
      return;
    }
    const el = mainRef.current;
    // Browsers with View Transitions already animate the page change.
    if (el && !("startViewTransition" in document)) {
      el.classList.remove("page-enter");
      void el.offsetWidth;
      el.classList.add("page-enter");
    }
  }, [pathname]);

  // Phone taps are the main conversion: count every tel: link click in analytics.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (a) track("phone_click", { page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Hash links (#inspection, #services…) glide to their section after navigation.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(
      () => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
    return () => clearTimeout(t);
  }, [pathname, hash]);

  const { locale } = splitLocale(pathname);

  return (
    <>
      <a href="#main" className="skip-link">
        {skipLink[locale]}
      </a>
      <TopBar />
      <SiteHeader />
      <main ref={mainRef} id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      {widget ? (
        <Suspense fallback={null}>
          <BookingWidget />
        </Suspense>
      ) : null}
    </>
  );
}

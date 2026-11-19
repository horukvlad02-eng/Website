import { Outlet, createFileRoute, notFound, useLocation, useRouter } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { scan, startMotion } from "@/components/motion/engine";
import { demoBanner, skipLink } from "@/content/pages";
import { SITE } from "@/lib/site";
import { splitLocale } from "@/lib/i18n";
import { track } from "@/lib/track";
import { isPhone } from "@/lib/device";

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
    // Browsers with View Transitions already animate the page change (desktop only, see router).
    // Phones get no page-level animation at all: fading and moving the whole <main> (20,000+px
    // tall on the home page) is a giant layer for a phone GPU, and restarting it forced a
    // synchronous layout of the full page on every navigation.
    if (el && !isPhone() && !("startViewTransition" in document)) {
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

  // Page changes jump, they never glide. <html> has scroll-behavior: smooth (for in-page
  // anchors), and the router's scroll-to-top on a new page and scroll restore on Back use plain
  // scrollTo(), so the browser used to animate through thousands of pixels of the page, firing
  // every reveal and image load on the way: the jerky "moving" when opening a page or coming
  // back. html.nav-jump switches smooth scrolling off until the new page has settled.
  const router = useRouter();
  useEffect(() => {
    const root = document.documentElement;
    let t = 0;
    const jump = () => {
      window.clearTimeout(t);
      root.classList.add("nav-jump");
    };
    const settle = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => root.classList.remove("nav-jump"), 700);
    };
    const offBefore = router.subscribe("onBeforeNavigate", (e) => {
      if (e.pathChanged) jump();
    });
    const offResolved = router.subscribe("onResolved", settle);
    window.addEventListener("popstate", jump, true);
    return () => {
      offBefore();
      offResolved();
      window.removeEventListener("popstate", jump, true);
      window.clearTimeout(t);
      root.classList.remove("nav-jump");
    };
  }, [router]);

  // Hash links (#inspection, #services…) glide to their section on the same page; arriving
  // from another page lands on the section directly.
  const lastPath = useRef(pathname);
  useEffect(() => {
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;
    if (!hash) return;
    const t = setTimeout(
      () =>
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: samePage ? "smooth" : "instant", block: "start" }),
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
      {SITE.demo ? (
        <div
          role="note"
          className="relative z-50 bg-brand px-4 py-2 text-center text-xs font-semibold leading-snug text-ink sm:text-sm"
        >
          {demoBanner[locale].text}{" "}
          <a href="https://centurionroofing.net/" className="underline underline-offset-2">
            {demoBanner[locale].link}
          </a>
        </div>
      ) : null}
      <TopBar />
      {/* Marks where the header starts in the page flow; the motion engine watches it to know
          when the sticky header is pinned to the top of the screen (adds .is-stuck). */}
      <div className="header-sentinel" aria-hidden="true" />
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

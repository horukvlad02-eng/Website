import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import interFont from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import archivoFont from "@fontsource/archivo/files/archivo-latin-900-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { HTML_LANG, splitLocale } from "@/lib/i18n";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

// Runs before first paint: enables reveal states only when JS is alive, with a safety net
// that shows everything if the app never boots.
// Flags iPhone/iPad as `ios` (safe-area + compact header tweaks in styles.css).
// Also flags low-end devices / data saver as `lite` (solid surfaces instead of frosted blur).
// Off Lovable (i.e. on Vercel) it loads Vercel Web Analytics + Speed Insights (cookie-free; turn
// both on in the Vercel project's Analytics / Speed Insights tabs, otherwise they stay silent).
const BOOT = `(function(d){d.classList.add('mv-js');var n=navigator,c=n.connection;if(/iP(hone|ad|od)/.test(n.userAgent)||(n.platform==='MacIntel'&&n.maxTouchPoints>1))d.classList.add('ios');if((n.deviceMemory&&n.deviceMemory<=2)||(n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(c&&c.saveData))d.classList.add('lite');setTimeout(function(){if(!window.__mv)d.classList.remove('mv-js')},3000);var h=location.hostname;if(!/lovable|localhost|127\\.0\\.0\\.1/.test(h)){window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};window.si=window.si||function(){(window.siq=window.siq||[]).push(arguments)};['/_vercel/insights/script.js','/_vercel/speed-insights/script.js'].forEach(function(u){var s=document.createElement('script');s.defer=true;s.src=u;document.head.appendChild(s)})}})(document.documentElement)`;

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="blueprint-grid flex min-h-screen items-center justify-center px-4 text-center text-white">
      <div className="glass max-w-md rounded-[28px] p-8">
        <h1 className="font-display text-2xl font-black">This page didn't load</h1>
        <p className="mt-3 text-white/60">
          Something went wrong on our end. Try again, or call (786) 372-4754.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a href="/" className="btn-outline-light">
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0d1b26" },
      { name: "author", content: "Centurion Roofing" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      {
        rel: "preload",
        href: archivoFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "preload", href: interFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-icon.png" },
    ],
    scripts: [{ children: BOOT }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = useLocation({ select: (l) => splitLocale(l.pathname).locale });
  return (
    <html lang={HTML_LANG[locale]} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

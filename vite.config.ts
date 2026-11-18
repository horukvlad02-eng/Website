// Build setup: TanStack Start + React + Tailwind + Nitro come from @lovable.dev/vite-tanstack-config
// (do not add those plugins again here, they would be duplicated).
// On Vercel (VERCEL=1 during the build) the server is built for Vercel functions; elsewhere the
// default target is used. Never set ssr.external / resolve.external and never add compression.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  ...(process.env["VERCEL"] ? { nitro: { preset: "vercel" } } : {}),
  tanstackStart: {
    // TanStack Start's server entry is src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});

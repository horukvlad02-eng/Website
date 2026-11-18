import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { isPhone } from "./lib/device";

export const getRouter = () => {
  // One client per request: a module-level QueryClient leaks cached data between SSR requests.
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Every site URL ends with a slash (matches the original site and its sitemap).
    trailingSlash: "always",
    defaultPreload: "intent",
    // Smooth cross-fade between pages; same-page hash jumps scroll without a transition.
    // Phones skip it: a View Transition snapshots and scales the whole long page, which drops
    // frames on mobile GPUs; they get the light .page-enter fade instead (see {-$locale}/route).
    defaultViewTransition: {
      types: ({ pathChanged }) => (pathChanged && !isPhone() ? ["page"] : false),
    },
    // Lets Query own freshness; set caching defaults on the QueryClient, not the router.
    defaultPreloadStaleTime: 0,
  });

  return router;
};

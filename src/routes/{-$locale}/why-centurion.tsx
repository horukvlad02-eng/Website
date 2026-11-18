import { createFileRoute } from "@tanstack/react-router";
import { WhyCenturionPage } from "@/components/pages/WhyCenturionPage";
import { META } from "@/content/meta";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/why-centurion")({
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return pageHead({ locale, path: "/why-centurion/", ...META.pages["why-centurion"][locale] });
  },
  component: WhyCenturionPage,
});

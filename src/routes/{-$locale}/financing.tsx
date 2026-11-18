import { createFileRoute } from "@tanstack/react-router";
import { FinancingPage } from "@/components/pages/FinancingPage";
import { META } from "@/content/meta";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/financing")({
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return pageHead({ locale, path: "/financing/", ...META.pages["financing"][locale] });
  },
  component: FinancingPage,
});

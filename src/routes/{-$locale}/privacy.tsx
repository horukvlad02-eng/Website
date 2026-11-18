import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { META } from "@/content/meta";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/privacy")({
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return pageHead({ locale, path: "/privacy/", ...META.pages["privacy"][locale] });
  },
  component: () => <LegalPage page="privacy" />,
});

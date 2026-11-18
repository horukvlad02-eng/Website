import { createFileRoute } from "@tanstack/react-router";
import { InsuranceClaimsPage } from "@/components/pages/InsuranceClaimsPage";
import { META } from "@/content/meta";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/insurance-claims")({
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return pageHead({
      locale,
      path: "/insurance-claims/",
      ...META.pages["insurance-claims"][locale],
    });
  },
  component: InsuranceClaimsPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/components/site/L";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
import { servicesHub } from "@/content/services";
import { META } from "@/content/meta";
import { ServicesHub } from "@/components/services/ServicesHub";
export const Route = createFileRoute("/{-$locale}/services/")({
  head: ({ params }) =>
    pageHead({
      locale: toLocale(params.locale),
      path: "/services/",
      ...META.servicesHub[toLocale(params.locale)],
    }),
  component: Page,
});
function Page() {
  return <ServicesHub data={servicesHub[useLocale()]} />;
}

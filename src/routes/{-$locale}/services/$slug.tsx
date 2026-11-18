import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLocale } from "@/components/site/L";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
import { services } from "@/content/services";
import { META, isServiceSlug } from "@/content/meta";
import { ServicePage } from "@/components/services/ServicePage";

export const Route = createFileRoute("/{-$locale}/services/$slug")({
  beforeLoad: ({ params }) => {
    if (!isServiceSlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    if (!isServiceSlug(params.slug)) throw notFound();
    const locale = toLocale(params.locale);
    return pageHead({
      locale,
      path: `/services/${params.slug}/`,
      ...META.services[params.slug][locale],
    });
  },
  component: Page,
});
function Page() {
  const { slug } = Route.useParams();
  const locale = useLocale();
  if (!isServiceSlug(slug)) throw notFound();
  return <ServicePage data={services[slug][locale]} />;
}

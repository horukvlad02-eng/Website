import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLocale } from "@/components/site/L";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
import { locations } from "@/content/locations";
import { META, isLocationSlug } from "@/content/meta";
import { LocationPage } from "@/components/locations/LocationPage";

export const Route = createFileRoute("/{-$locale}/locations/$slug")({
  beforeLoad: ({ params }) => {
    if (!isLocationSlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    if (!isLocationSlug(params.slug)) throw notFound();
    const locale = toLocale(params.locale);
    return pageHead({
      locale,
      path: `/locations/${params.slug}/`,
      ...META.locations[params.slug][locale],
    });
  },
  component: Page,
});
function Page() {
  const { slug } = Route.useParams();
  const locale = useLocale();
  if (!isLocationSlug(slug)) throw notFound();
  return <LocationPage data={locations[slug][locale]} />;
}

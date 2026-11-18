import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLocale } from "@/components/site/L";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
import { materials } from "@/content/materials";
import { META, isMaterialSlug } from "@/content/meta";
import { MaterialPage } from "@/components/materials/MaterialPage";

export const Route = createFileRoute("/{-$locale}/materials/$slug")({
  beforeLoad: ({ params }) => {
    if (!isMaterialSlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    if (!isMaterialSlug(params.slug)) throw notFound();
    const locale = toLocale(params.locale);
    return pageHead({
      locale,
      path: `/materials/${params.slug}/`,
      ...META.materials[params.slug][locale],
    });
  },
  component: Page,
});
function Page() {
  const { slug } = Route.useParams();
  const locale = useLocale();
  if (!isMaterialSlug(slug)) throw notFound();
  return <MaterialPage data={materials[slug][locale]} />;
}

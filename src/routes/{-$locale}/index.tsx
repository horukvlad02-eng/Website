import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { toLocale } from "@/lib/i18n";
import { META, HOME_JSON_LD } from "@/content/meta";
import { HeroSection } from "@/components/home/HeroSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Brands } from "@/components/sections/Brands";
import { TransformationsSection } from "@/components/home/TransformationsSection";
import { Credentials } from "@/components/sections/Credentials";
import { WorkStatementSection } from "@/components/home/WorkStatementSection";
import { WorkSection } from "@/components/home/WorkSection";
import { AnatomySection } from "@/components/home/AnatomySection";
import { InsuranceSection } from "@/components/home/InsuranceSection";
import { AreasSection } from "@/components/home/AreasSection";
import { Reviews } from "@/components/sections/Reviews";
import { RoofCheckSection } from "@/components/home/RoofCheckSection";
import { FaqSection } from "@/components/home/FaqSection";
import { EstimateSection } from "@/components/home/EstimateSection";
import { Inspection } from "@/components/sections/Inspection";

export const Route = createFileRoute("/{-$locale}/")({
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return {
      ...pageHead({ locale, path: "/", ...META.home[locale] }),
      scripts: HOME_JSON_LD.map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      })),
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <ServicesSection />
      <Brands />
      <TransformationsSection />
      <Credentials />
      <WorkStatementSection />
      <WorkSection />
      <AnatomySection />
      <InsuranceSection />
      <AreasSection />
      <Reviews />
      <RoofCheckSection />
      <FaqSection />
      <EstimateSection />
      <Inspection />
    </>
  );
}

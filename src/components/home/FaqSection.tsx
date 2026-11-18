import { useLocale } from "@/components/site/L";
import { Accordion } from "@/components/site/Accordion";
import { Words } from "@/components/motion/Words";
import { home } from "@/content/home";

export function FaqSection() {
  const t = home[useLocale()].faq;
  return (
    <section id="faq" className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-balance font-display text-3xl font-black sm:text-4xl">
          <Words>{t.heading}</Words>
        </h2>
        <Accordion items={t.items} variant="dark" className="mt-10" />
      </div>
    </section>
  );
}

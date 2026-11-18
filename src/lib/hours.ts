import type { Locale } from "./i18n";
import { SITE } from "./site";

/** Sentence form of the office hours, e.g. "Monday to Friday 7:00 AM–5:00 PM, Saturday 7:00 AM–2:00 PM". */
export function hoursSentence(locale: Locale) {
  const wk = SITE.hours[1]!;
  const sat = SITE.hours[6]!;
  const f = (h: number) =>
    locale === "fr" ? `${h} h` : `${h % 12 === 0 ? 12 : h % 12}:00 ${h >= 12 ? "PM" : "AM"}`;
  if (locale === "fr")
    return `lundi au vendredi de ${f(wk[0])} à ${f(wk[1])} et le samedi de ${f(sat[0])} à ${f(sat[1])}`;
  if (locale === "es")
    return `de lunes a viernes de ${f(wk[0])} a ${f(wk[1])} y los sábados de ${f(sat[0])} a ${f(sat[1])}`;
  return `Monday to Friday ${f(wk[0])}–${f(wk[1])}, Saturday ${f(sat[0])}–${f(sat[1])}`;
}

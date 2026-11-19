/** Business facts shared by every page. */
export const SITE = {
  name: "Centurion Roofing",
  url: "https://centurionroofing.net",
  phone: "(786) 372-4754",
  phoneHref: "tel:+17863724754",
  address: "3190 NW 38th St, Miami, FL 33142",
  license: "CCC1331979",
  licenseExpires: "08/31/2028",
  rating: "4.9",
  reviews: "60+",
  /** Office hours in America/New_York, 24h clock. 0 = Sunday. */
  hours: { 1: [7, 17], 2: [7, 17], 3: [7, 17], 4: [7, 17], 5: [7, 17], 6: [7, 14] } as Record<
    number,
    [number, number]
  >,
  timeZone: "America/New_York",
  /**
   * Search-engine indexing. Keep false while the site runs on a temporary address
   * (lovable.app / vercel.app). On launch at the real domain: set true AND replace the last
   * two lines of public/robots.txt with "User-agent: *" / "Allow: /" and a Sitemap line.
   */
  indexable: false,
  /**
   * Concept-preview mode (before Centurion Roofing approves this site): shows a banner saying
   * this is a concept, not the company's official website, and that form requests from this
   * demo reach the developer (LEAD_EMAIL_TO in notify.server.ts), not the company.
   * Set false once the company owns the site and leads go to their own inbox.
   */
  demo: true,
} as const;

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
  reviews: "65+",
  /** Office hours in America/New_York, 24h clock. 0 = Sunday. */
  hours: { 1: [7, 17], 2: [7, 17], 3: [7, 17], 4: [7, 17], 5: [7, 17], 6: [7, 14] } as Record<
    number,
    [number, number]
  >,
  timeZone: "America/New_York",
} as const;

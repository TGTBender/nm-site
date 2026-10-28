/**
 * The four lanes, as the landing page lists them.
 *
 * `href` is omitted while a lane has no page. The row then renders as plain
 * text rather than a dead link, and adding the route later is a one-line
 * change here.
 *
 * DRAFT COPY: the descriptions below are written from what the business has
 * said about each lane, not supplied as finished marketing copy. They are
 * meant to be corrected rather than trusted — particularly the Longevity
 * Project, where almost nothing is known yet.
 */

export type Lane = {
  name: string;
  description: string;
  href?: string;
  status?: string;
};

export const LANES: Lane[] = [
  {
    name: "The Viridian",
    description:
      "Charged biochar and liquid nutrient, brought together at home. The direct-to-consumer line, opening in Dallas–Fort Worth.",
    href: "/products",
    status: "December",
  },
  {
    name: "B2B Lane",
    description:
      "Wholesale supply for nurseries, landscapers, farms and garden centers — on schedule, on spec, with documentation on every run.",
    href: "/b2b",
  },
  {
    name: "Brokerage",
    description:
      "Sourcing and brokering biochar products, rather than operating production.",
    status: "Detail to come",
  },
  {
    name: "The Longevity Project",
    description:
      "A long-term project under Nature's Mastermind. Details to follow.",
    status: "Detail to come",
  },
];

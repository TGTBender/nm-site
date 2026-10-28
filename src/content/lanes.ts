/**
 * The lanes, as the landing page lists them.
 *
 * `href` is omitted while a lane has no page. The row then renders as plain
 * text rather than a dead link, and adding the route later is a one-line
 * change here.
 *
 * Descriptions are drafted from the business's own material and are meant to
 * be corrected rather than trusted as finished marketing copy.
 */

export type Lane = {
  name: string;
  description: string;
  href?: string;
  status?: string;
  /** Only the shipping product carries a preview. The weight is the point:
   *  one lane is real and the others are not yet. */
  image?: { desktop: string; mobile: string; alt: string };
  cta?: string;
};

export const LANES: Lane[] = [
  {
    name: "The Viridian",
    description:
      "Charged biochar and liquid nutrient, brought together at home. The direct-to-consumer line, opening in Dallas–Fort Worth.",
    href: "/products",
    status: "December",
    cta: "See The Viridian",
    image: {
      desktop: "/viridian/closed.jpg",
      mobile: "/viridian/closed-mobile.jpg",
      alt: "The closed Viridian box in dark emerald with a gold foil Nature's Mastermind seal.",
    },
  },
  {
    name: "The BGE",
    description:
      "The Black Glove Experience. Wholesale supply for nurseries, landscapers, farms and garden centers — on schedule, on spec, with documentation on every run.",
    href: "/bge",
  },
  {
    name: "Canopy",
    description:
      "The app behind both lanes: a garden companion for the home, and an account portal with batch-level traceability for the trade.",
    href: "/canopy",
    status: "In build",
  },
  {
    // Deliberately claims nothing. No entity, no legal form, no partners,
    // no funding — the same restraint the /longevity teaser keeps, and for
    // the same reason. See content/longevity.ts.
    name: "The Longevity Project",
    description:
      "Gardens, teaching, and ground to prove the material in. Something we are building alongside the business.",
    href: "/longevity",
    status: "A first look",
    cta: "See what we are building",
  },
];

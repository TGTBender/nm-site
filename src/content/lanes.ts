/**
 * The lanes, as the landing page lists them.
 *
 * `href` is omitted while a lane has no page. The row then renders as plain
 * text rather than a dead link, and adding the route later is a one-line
 * change here.
 *
 * `hidden` takes a lane off the site without taking it out of the file.
 * Oil Field Supply is hidden while the lane waits on a few more pieces;
 * its page redirects to the landing page in next.config.ts. Restoring it
 * is deleting the flag and that redirect.
 *
 * STATUS IS PART OF THE COPY. The BGE is not selling yet, so its button
 * collects interest rather than asking for a quote nobody can fill. A
 * lane that looks the same whether or not it has customers is a lane
 * that misleads.
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
  /** The lane the landing page leads with. Exactly one should carry it:
   *  it takes the gold border in the platform grid. It marks what the
   *  business is actually trading today, not a favorite, so it moves
   *  when the answer to that changes. */
  primary?: boolean;
  /** Off the site, still in the file. */
  hidden?: boolean;
};

/* Ordered as the landing page presents them — the live lane first. */
export const LANES: Lane[] = [
  {
    name: "Oil Field Supply",
    description:
      "Biochar and absorbent materials for oil field operations, delivered with documentation on every load.",
    href: "/oil-field",
    status: "Live",
    cta: "Request a briefing",
    hidden: true,
  },
  {
    name: "The BGE",
    description:
      "The Black Glove Experience. Wholesale supersacks for nurseries, landscapers, farms and garden centers — on schedule, on spec, with documentation on every run.",
    href: "/bge",
    status: "Coming soon",
    cta: "Join the early list",
    primary: true,
  },
  {
    name: "The Viridian",
    description:
      "Charged biochar and liquid nutrient, brought together at home. The direct-to-consumer line, launching December 12 in Dallas–Fort Worth.",
    href: "/products",
    status: "Dec 12",
    cta: "Join the waitlist",
    image: {
      desktop: "/viridian/closed.jpg",
      mobile: "/viridian/closed-mobile.jpg",
      alt: "The closed Viridian box in dark emerald with a gold foil Nature's Mastermind seal.",
    },
  },
  {
    name: "Canopy",
    description:
      "The app behind both lanes: a garden companion for the home, and an account portal with batch-level traceability for the trade.",
    href: "/canopy",
    status: "In build",
    cta: "Open Canopy",
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

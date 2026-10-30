/**
 * The Viridian — page copy.
 *
 * Kept out of the component so wording can change without touching layout,
 * and so the claims rules below are visible in one place rather than spread
 * through JSX.
 *
 * CLAIMS DISCIPLINE (from the product copy brief, 2026-10-27):
 *  - No price anywhere until pricing is settled.
 *  - No AgriTec credit.
 *  - No "seconds" or "under a minute" draw claim until the pilot's draw test
 *    passes. The renders' work mat carries that claim, which is why the hero
 *    images are cropped above it — see scripts/make-viridian-assets.mjs.
 *  - These are concept renders of a pre-launch product. Alt text describes
 *    the object; it does not present them as photographs of shipping stock.
 */

/** Runs under the page title. The date is firm, so the page states it
 *  rather than implying a vague window. */
export const VIRIDIAN_STATUS =
  "Launching December 12, 2026. Dallas–Fort Worth first.";

export type ViridianSection = {
  eyebrow: string;
  headline: string;
  subline: string;
  body?: string;
  cta?: { label: string; href: string };
  image: { desktop: string; mobile: string; alt: string };
};

export const VIRIDIAN_INTRO: ViridianSection = {
  eyebrow: "Nature's Mastermind",
  headline: "The Viridian",
  subline: "Charged biochar and liquid nutrient, brought together at home.",
  cta: { label: "Join the waitlist", href: "#waitlist" },
  image: {
    desktop: "/viridian/hero.jpg",
    mobile: "/viridian/hero-mobile.jpg",
    alt: "The Viridian by Nature's Mastermind, an emerald and gold box opened to show the biochar tube and a gold-framed instruction card.",
  },
};

export const VIRIDIAN_HOW: ViridianSection = {
  eyebrow: "The Viridian",
  headline: "So thirsty it defies logic.",
  subline: "Dock it. Twist it. Watch the liquid disappear.",
  body: "Two tubes meet with a magnetic click. One twist and the biochar draws the liquid nutrient in on its own: no pump, no mess, no guesswork.",
  image: {
    desktop: "/viridian/dock.jpg",
    mobile: "/viridian/dock-mobile.jpg",
    alt: "The Viridian's clear liquid nutrient tube docked on top of the emerald biochar tube, standing on its work mat.",
  },
};

export const VIRIDIAN_LAUNCH: ViridianSection = {
  eyebrow: "The Viridian",
  headline: "Launching December 12.",
  subline: "Dallas–Fort Worth first.",
  cta: { label: "Be first in line", href: "#waitlist" },
  image: {
    desktop: "/viridian/closed.jpg",
    mobile: "/viridian/closed-mobile.jpg",
    alt: "The closed Viridian box in dark emerald with a gold foil Nature's Mastermind seal.",
  },
};

export const VIRIDIAN_SECTIONS = [
  VIRIDIAN_INTRO,
  VIRIDIAN_HOW,
  VIRIDIAN_LAUNCH,
] as const;

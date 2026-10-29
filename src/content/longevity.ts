/**
 * The Longevity Project — teaser content.
 *
 * Deliberately a trailer, not an overview. Short title cards, generous
 * space, nothing explained in full.
 *
 * WHAT THIS PAGE DOES NOT SAY, and why:
 *  - It does not describe the project as a non-profit, or name any entity.
 *    The legal form is not settled and the organisation is not formed yet;
 *    on founder instruction the page makes no entity claim at all.
 *  - No volunteer recruitment, no donation ask, no sign-up. A public page
 *    soliciting either could engage charitable-solicitation rules before
 *    counsel has reviewed anything.
 *  - No funding model, no percentages, no partner names, no dates. All of
 *    those are provisional in the source material.
 *
 * What is left is the direction: gardens, teaching, and ground to prove the
 * material in. Everything here is stated in the project's own notes.
 *
 * THE IMAGERY is design study, not documentary. No such site is built, so
 * nothing on the page may imply one is. Three things keep that straight:
 * the alt text describes each frame as a design study rather than naming a
 * place, the copy stays in the future or the conditional, and DISCLOSURE
 * below runs in the closing card where anyone who reaches the end sees it.
 * If that line is ever cut, the page starts making a claim it cannot keep.
 */

export type Card = {
  line: string;
  note?: string;
  /** Not every card carries one. The silent card between two scenes is
   *  doing work — it is the beat that keeps this a trailer. */
  image?: { desktop: string; mobile: string; alt: string };
};

export const LONGEVITY_CARDS: Card[] = [
  {
    line: "Gardens above the ground, below it, and on the roof.",
    note: "Built for the places that have space and the places that don't.",
    image: {
      desktop: "/longevity/campus.jpg",
      mobile: "/longevity/campus-mobile.jpg",
      alt: "Design study: raised beds, in-ground plots and a planted roof on one site, with people working the beds at golden hour.",
    },
  },
  {
    line: "A classroom with dirt on the floor.",
    note: "Botany, horticulture, ecology, soil science — taught where it grows.",
  },
  {
    line: "Ground that proves the material.",
    note: "Where our biochar goes after the lab, into beds we actually watch.",
    image: {
      desktop: "/longevity/hands.jpg",
      mobile: "/longevity/hands-mobile.jpg",
      alt: "Design study: an older pair of hands and a child's hands setting a seedling into dark, biochar-flecked soil in a raised bed.",
    },
  },
];

/** The title card's own scene. */
export const LONGEVITY_TITLE_IMAGE = {
  desktop: "/longevity/gate.jpg",
  mobile: "/longevity/gate-mobile.jpg",
  alt: "Design study: a fenced garden campus at dusk, its low timber building lit from within beneath a planted roof.",
};

/** Runs in the closing card. See the imagery note above before changing it. */
export const DISCLOSURE =
  "Images are design studies of what we intend to build, not photographs of an existing site.";

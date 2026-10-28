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
 */

export type Card = { line: string; note?: string };

export const LONGEVITY_CARDS: Card[] = [
  {
    line: "Gardens above the ground, below it, and on the roof.",
    note: "Built for the places that have space and the places that don't.",
  },
  {
    line: "A classroom with dirt on the floor.",
    note: "Botany, horticulture, ecology, soil science — taught where it grows.",
  },
  {
    line: "Ground that proves the material.",
    note: "Where our biochar goes after the lab, into beds we actually watch.",
  },
];

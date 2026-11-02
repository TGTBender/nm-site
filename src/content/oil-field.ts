/**
 * Oil Field Supply — page content.
 *
 * CLAIMS DISCIPLINE, from the brief:
 *  - No regulatory approval, no remediation performance, no TRRC approval,
 *    no cleanup results, no named customers.
 *  - No prices, no price formulas, no per-ton discount schedule anywhere
 *    on the page.
 *  - The scope line below is the point of the page as much as the offer is:
 *    it says what this business does NOT do, which is what keeps the rest
 *    of the page from reading as a remediation claim.
 */

export const SUPPLY = [
  {
    title: "Biochar",
    text: "Raw, uncharged biochar, delivered to your site by bulk truck.",
  },
  {
    title: "Absorbent materials",
    text: "Absorbents for containment and spill response, sourced for you through our partner manufacturers.",
  },
  {
    title: "Documentation",
    text: "The batch record and delivery paperwork travel with every load, so you never have to ask for them.",
  },
];

export const STEPS = [
  { num: "01", text: "Tell us about your site and what you are working with." },
  {
    num: "02",
    text: "We confirm your delivery lane and get a quote back to you within 48 hours.",
  },
  {
    num: "03",
    text: "Your material arrives by bulk truck, with weigh tickets and batch documentation in hand.",
  },
];

/** Runs as its own block. Not a footnote — it is the page's boundary. */
export const SCOPE =
  "We are glad to supply the material, the logistics and the documentation behind them. What we do not do is handle oil-soaked material, and we are not a cleanup contractor — your treatment program, and its results, stay with you. For any specific uses, please inquire below.";

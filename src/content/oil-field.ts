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
    text: "Raw, uncharged biochar, delivered by bulk truck.",
  },
  {
    title: "Absorbent materials",
    text: "For containment and spill response, supplied through partner manufacturers.",
  },
  {
    title: "Documentation",
    text: "The batch record and delivery paperwork travel with every load.",
  },
];

export const STEPS = [
  { num: "01", text: "Tell us the site, the volume and the timeline." },
  {
    num: "02",
    text: "We confirm the delivery lane and send a volume-based quote within 48 hours.",
  },
  {
    num: "03",
    text: "Material arrives by bulk truck with weigh tickets and batch documentation.",
  },
];

/** Runs as its own block. Not a footnote — it is the page's boundary. */
export const SCOPE =
  "We supply material, logistics and documentation. We do not handle oil-soaked material and we are not a cleanup contractor. Your treatment program, and its results, stay with you. For any specific use, we tell you what is documented and what is not.";

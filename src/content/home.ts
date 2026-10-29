/**
 * Landing page content.
 *
 * The page's own thesis is "every claim has a source", so this file is
 * where a claim has to earn its place.
 *
 *  1. NOTHING IS INVENTED. Any figure not traceable to a source document
 *     is `null` and renders as a visible pending state.
 *  2. STATUS IS DATA, not decoration. Every lane, market and programme
 *     carries an explicit status, and the page renders that status rather
 *     than implying readiness through layout.
 *  3. THE EVIDENCE LABELS BELOW ARE THE SITE'S OWN STANDARD. Verified /
 *     Reasoned / Unknown is how this business says it labels what it
 *     knows, so the page has to meet it.
 */

/* ── Operating status ────────────────────────────────────────── */

export type State = "active" | "progress" | "planning" | "development";

export const STATE_LABEL: Record<State, string> = {
  active: "Active",
  progress: "In progress",
  planning: "In planning",
  development: "In development",
};

export type StatusRow = { name: string; state: State };

export const OPERATING_STATUS: StatusRow[] = [
  { name: "Sourcing & delivery service", state: "active" },
  { name: "Producer lab documentation", state: "active" },
  { name: "Processing facility", state: "planning" },
  { name: "The Viridian", state: "active" },
  { name: "Canopy app", state: "development" },
  { name: "The Longevity Project", state: "development" },
];

/* ── Evidence ──────────────────────────────────────────────────
 * SOURCE: "NM Bagasse Biochar — IBI Certification Lab Data (2026-09-20)"
 * in the vault — 12 IBI-certified batches, April 2023 to May 2024,
 * analysed by an independent laboratory.
 *
 * Every figure below is transcribed from that document. Three rules were
 * applied in deciding what to publish:
 *
 *  - ONLY EXACT FIGURES. The design mockup proposed "1–2 orders of
 *    magnitude below reference metal limits" as a headline stat. It is
 *    broadly true against the upper bound of IBI's max-level ranges and
 *    much weaker against the lower bound (zinc is ~2.4x, not 100x), so a
 *    reader could check it and find it overstated. It is replaced by the
 *    worst-case H:C ratio, which is exact and says the same thing about
 *    process control.
 *  - SCOPE IS PART OF THE CLAIM. This data covers bagasse feedstock only.
 *    SCOPE_NOTE says so, and must run wherever these figures run — other
 *    feedstocks certify as partners come on.
 *  - NO SUPPLY-CHAIN DETAIL. The founder stripped company-identifying
 *    information before this reached the vault. Methods and standards are
 *    cited because they are the source of each figure; the laboratory and
 *    analyst of record are not named here pending the founder's call.
 */

export type Stat = { value: string | null; caption: string };

export const EVIDENCE_STATS: Stat[] = [
  {
    value: "12",
    caption: "IBI-certified production batches, April 2023 to May 2024",
  },
  {
    value: "ND",
    caption: "Mercury — not detected in any of the twelve batches",
  },
  {
    value: "0.61",
    caption: "Highest H:C ratio recorded, against IBI's ceiling of 0.70",
  },
];

export type EvidenceRow = {
  parameter: string;
  result: string | null;
  reference: string | null;
};

export const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    parameter: "Organic carbon",
    result: "52.1 – 70.2 %",
    reference: "ASTM D1762-84",
  },
  {
    parameter: "H:C ratio",
    result: "0.37 – 0.61",
    reference: "IBI ceiling 0.70",
  },
  {
    parameter: "Mercury",
    result: "ND, all 12 batches",
    reference: "EPA 3050B / 6020",
  },
  {
    parameter: "Heavy metals",
    result: "Within range, every metal, every batch",
    reference: "IBI max-level ranges",
  },
  {
    parameter: "Surface area",
    result: "213 – 298 m²/g",
    reference: "Butane correlation, McLaughlin et al. 2012",
  },
  { parameter: "pH", result: "7.59 – 9.27", reference: "Rayment & Higginson" },
];

/** Runs directly under the evidence table. Not optional — see rule 2 of
 *  the source note above. */
export const SCOPE_NOTE =
  "These results are for our bagasse biochar, across twelve independently certified production batches. Every other feedstock we take on gets its own certification before it appears here. ND means not detected, below the laboratory reporting limit.";

/** Shown wherever a figure is still `null`. */
export const PENDING_NOTE =
  "Figures publish when the independent lab report is in hand. We would rather show you a blank than a number we cannot source.";

/* ── Operating model ─────────────────────────────────────────── */

export const MODEL_STEPS = [
  {
    title: "Source",
    text: "Material is bought against a specification, from producers who can document what they made.",
  },
  {
    title: "Ship",
    text: "Delivered on an agreed date, in the format the operation actually handles.",
  },
  {
    title: "Show",
    text: "The documentation for that batch travels with it, not on request.",
  },
  {
    title: "Measure",
    text: "What we learn from a delivery goes back into the next specification.",
  },
];

/* ── Markets ───────────────────────────────────────────────────
   Four lanes are trading, one is in R&D, four are under evaluation.
   The section headline counts `active` entries, so it cannot drift out
   of step with this list. */

export type MarketState = "active" | "rnd" | "evaluation";

export const MARKET_LABEL: Record<MarketState, string> = {
  active: "Active",
  rnd: "R&D",
  evaluation: "Under evaluation",
};

export type Market = { name: string; note: string; state: MarketState };

export const MARKETS: Market[] = [
  {
    name: "Soil & horticulture",
    note: "Nurseries, landscapers, growers and garden centers.",
    state: "active",
  },
  { name: "Water filtration", note: "Under evaluation.", state: "evaluation" },
  { name: "Air & odor control", note: "Under evaluation.", state: "evaluation" },
  { name: "Livestock feed", note: "Under evaluation.", state: "evaluation" },
  {
    name: "Construction materials",
    note: "In research and development.",
    state: "rnd",
  },
  {
    name: "Soil remediation",
    note: "Contaminated and worked ground.",
    state: "active",
  },
  {
    name: "Industrial absorbents",
    note: "Containment and spill response.",
    state: "active",
  },
  { name: "Aquaculture", note: "Under evaluation.", state: "evaluation" },
  {
    name: "Carbon markets",
    note: "Durable carbon removal, on documented material.",
    state: "active",
  },
];

/* ── Standard of evidence ────────────────────────────────────── */

export const EVIDENCE_LABELS = [
  {
    tag: "Verified",
    title: "Sourced and citable.",
    text: "A figure from our own lab work or a named published source, shown with that source attached.",
  },
  {
    tag: "Reasoned",
    title: "A conclusion, marked as one.",
    text: "Drawn from verified data and labelled as reasoning rather than as a measurement.",
  },
  {
    tag: "Unknown",
    title: "A gap, stated plainly.",
    text: "Where research does not produce an answer, we say so instead of filling the space.",
  },
];

/* ── Ways in ───────────────────────────────────────────────────
   No recruitment language under "work for us", and nothing under the
   mission column that asks for money or volunteers — The Longevity
   Project makes no entity claim yet. See content/longevity.ts. */

export const WAYS_IN = [
  {
    title: "Work with us",
    text: "For operations buying material.",
    points: [
      "Tell us the format, volume and season you work in.",
      "We confirm the delivery lane and build a cadence around it.",
      "Documentation arrives with the material.",
    ],
    cta: { label: "Request a briefing", href: "/bge" },
  },
  {
    title: "Partner with us",
    text: "For producers, labs and ground.",
    points: [
      "Producers who can document what they make.",
      "Laboratories to certify feedstocks we have not run yet.",
      "Operators with ground to prove the material on.",
    ],
    cta: { label: "Start a conversation", href: "/bge" },
  },
  {
    title: "Work for us",
    text: "For people who want to build this.",
    points: [
      "We are small, and the work is physical as often as it is technical.",
      "We would rather hear what you have done than what you have studied.",
      "Write to us before a role is posted.",
    ],
    cta: { label: "Get in touch", href: "/bge#contact" },
  },
  {
    title: "Work toward the mission",
    text: "For the longer project.",
    points: [
      "Gardens above the ground, below it, and on the roof.",
      "A classroom with dirt on the floor.",
      "Ground that proves the material.",
    ],
    cta: { label: "See The Longevity Project", href: "/longevity" },
  },
];

/* ── Contact ───────────────────────────────────────────────────
   Confirmed by the founder for publication. */

export const CONTACT = {
  phone: "254-338-9023",
  phoneHref: "tel:+12543389023",
  email: "nm@thegreenestthumb.org",
};

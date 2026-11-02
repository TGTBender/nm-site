/**
 * Landing page content.
 *
 * The page's own thesis is "every claim has a source", so this file is
 * where a claim has to earn its place.
 *
 *  1. NOTHING IS INVENTED. Any figure not traceable to a source document
 *     is `null` and renders as a visible pending state.
 *  2. STATUS IS DATA, not decoration. Every lane, market and program
 *     carries an explicit status, and the page renders that status rather
 *     than implying readiness through layout.
 *  3. THE EVIDENCE LABELS BELOW ARE THE SITE'S OWN STANDARD. Verified /
 *     Reasoned / Unknown is how this business says it labels what it
 *     knows, so the page has to meet it.
 */

/* ── Operating status ────────────────────────────────────────── */

export type State =
  | "active"
  | "soon"
  | "launching"
  | "development"
  | "planning";

export const STATE_LABEL: Record<State, string> = {
  active: "Active",
  soon: "Coming soon",
  launching: "Launching Dec 12",
  development: "In development",
  planning: "In planning",
};

/** Only "active" takes the solid gold. "Launching Dec 12" is dated and
 *  close, but it is not running yet, so it has to read as upcoming
 *  rather than live. */
export const SOLID_STATES: ReadonlySet<State> = new Set<State>(["active"]);

export type StatusRow = { name: string; state: State };

export const OPERATING_STATUS: StatusRow[] = [
  { name: "Sourcing & delivery service", state: "active" },
  { name: "Oil field supply", state: "active" },
  { name: "Producer lab documentation", state: "active" },
  { name: "The BGE (wholesale)", state: "soon" },
  { name: "The Viridian", state: "launching" },
  { name: "Canopy app", state: "development" },
  { name: "The Longevity Project", state: "development" },
  { name: "Processing facility", state: "planning" },
];

/* ── Evidence ──────────────────────────────────────────────────
 * SOURCE: the bagasse laboratory data held in the vault — twelve batches,
 * April 2023 to May 2024, analyzed by an independent laboratory.
 *
 * Every figure below is transcribed from that document. Four rules govern
 * what may appear here:
 *
 *  - IT IS THE PRODUCER'S DATA, NOT OURS. This is laboratory data supplied
 *    by the producer whose bagasse biochar the business currently works
 *    with. It is not Nature's Mastermind's own measurement and it covers
 *    historical batches. ATTRIBUTION_NOTE says so and runs under the
 *    table; it is not optional, because without it every figure here reads
 *    as a measurement this business took.
 *  - THREE PHRASES ARE BANNED SITEWIDE, per the update brief: the one
 *    asserting IBI certification, and the two that attach a possessive to
 *    the bagasse material or to the twelve batches. The first asserts a
 *    certification nobody has confirmed exists; the other two claim the
 *    producer's work as this business's own. Where the IBI reference is
 *    needed, the wording is "analyzed against IBI parameters".
 *  - ONLY EXACT FIGURES. The design mockup proposed "1–2 orders of
 *    magnitude below reference metal limits" as a headline stat. It holds
 *    against the upper bound of IBI's max-level ranges and not the lower
 *    (zinc is ~2.4x, not 100x), so a reader could check it and find it
 *    overstated. The worst-case H:C ratio says the same thing about
 *    process control and is exact.
 *  - NO SUPPLY-CHAIN DETAIL. The founder stripped company-identifying
 *    information before this reached the vault. Methods and standards are
 *    cited because they are the source of each figure; the laboratory and
 *    analyst of record are not named here pending the founder's call.
 */

export type Stat = { value: string | null; caption: string };

export const EVIDENCE_STATS: Stat[] = [
  {
    value: "12",
    caption:
      "Production batches, April 2023 to May 2024, analyzed by an independent laboratory",
  },
  {
    value: "ND",
    caption: "Mercury, not detected in any of the twelve batches",
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

/** Runs directly under the evidence table. Not optional — see rule 1 of
 *  the source note above. */
export const ATTRIBUTION_NOTE =
  "This is laboratory data supplied by the producer of the bagasse biochar Nature's Mastermind currently works with. It is the producer's data, not Nature's Mastermind's own measurements, and it covers historical batches from 2023 and 2024. Deliveries from Nature's Mastermind carry their own batch documentation. Data from any other producer appears here only once we hold it. ND means not detected, below the laboratory reporting limit.";

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
   Two markets are trading, one is in development, one is in R&D and five
   are under evaluation. The section headline counts `active` entries, so
   it cannot drift out of step with the grid beneath it.

   Carbon markets is "in development" and its copy carries no credit,
   offset or durable-removal language. Selling a carbon benefit is a
   regulated claim with its own methodology and verification behind it;
   supplying documented material to that market is not the same thing,
   and only the second is true today. */

export type MarketState =
  | "active"
  | "soon"
  | "development"
  | "rnd"
  | "evaluation";

export const MARKET_LABEL: Record<MarketState, string> = {
  active: "Active",
  soon: "Coming soon",
  development: "In development",
  rnd: "R&D",
  evaluation: "Under evaluation",
};

export type Market = { name: string; note: string; state: MarketState };

export const MARKETS: Market[] = [
  {
    name: "Soil & horticulture",
    note: "Nurseries, landscapers, growers and garden centers.",
    state: "soon",
  },
  {
    name: "Soil remediation",
    note: "Biochar supply for contaminated and worked ground.",
    state: "active",
  },
  {
    name: "Industrial absorbents",
    note: "Absorbent materials for containment and spill response, supplied through partner manufacturers.",
    state: "active",
  },
  {
    name: "Carbon markets",
    note: "Documented material for carbon markets.",
    state: "development",
  },
  { name: "Water filtration", note: "Under evaluation.", state: "evaluation" },
  { name: "Air & odor control", note: "Under evaluation.", state: "evaluation" },
  { name: "Livestock feed", note: "Under evaluation.", state: "evaluation" },
  {
    name: "Construction materials",
    note: "In research and development.",
    state: "rnd",
  },
  { name: "Aquaculture", note: "Under evaluation.", state: "evaluation" },
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
    text: "Drawn from verified data and labeled as reasoning rather than as a measurement.",
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
    cta: { label: "Join the early list", href: "/bge" },
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
    // NOT the BGE early list: that form signs people up for wholesale
    // supply news, which is not what someone asking about work wants,
    // and it would put them on the wrong list.
    cta: {
      label: "Get in touch",
      href: "mailto:nm@thegreenestthumb.org?subject=Work%20with%20Nature%27s%20Mastermind",
    },
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

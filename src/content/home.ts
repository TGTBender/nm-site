/**
 * Landing page content.
 *
 * The page's own thesis is "every claim has a source", so this file is
 * where a claim has to earn its place. Three rules hold it together:
 *
 *  1. NOTHING IS INVENTED. Any figure not supplied by the founder is
 *     `null` and renders as a visible pending state. A blank that reads
 *     as deliberate costs nothing; a plausible number that turns out to
 *     be wrong is a false claim about a soil amendment, under a headline
 *     promising evidence. The lab figures in the design mockup were
 *     placeholders and are held as `null` until the report arrives.
 *  2. STATUS IS DATA, not decoration. Every lane, market and programme
 *     carries an explicit `status`, and the page renders that status
 *     rather than implying readiness through layout.
 *  3. THE EVIDENCE LABELS BELOW ARE THE SITE'S OWN STANDARD. Verified /
 *     Reasoned / Unknown is how this business says it labels what it
 *     knows. The page has to meet it, which is rule 1 restated.
 */

/* ── Operating status ──────────────────────────────────────────
   The panel beside the headline. `state` drives the badge; keep the
   wording conservative until the founder confirms otherwise. */

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
  { name: "Producer lab documentation", state: "progress" },
  { name: "Processing facility", state: "planning" },
  { name: "Home grower line", state: "development" },
  { name: "Canopy app", state: "development" },
  { name: "The Longevity Project", state: "development" },
];

/* ── Evidence ──────────────────────────────────────────────────
   Held empty on purpose. See rule 1. When the lab report lands, fill
   `value` and `reference`; the section renders itself from these. */

export type Stat = { value: string | null; caption: string };

export const EVIDENCE_STATS: Stat[] = [
  { value: null, caption: "Independent lab-certified production batches" },
  { value: null, caption: "Orders of magnitude below reference metal limits" },
  { value: null, caption: "Mercury, against a non-detect threshold" },
];

export type EvidenceRow = {
  parameter: string;
  result: string | null;
  reference: string | null;
};

export const EVIDENCE_ROWS: EvidenceRow[] = [
  { parameter: "Heavy metals", result: null, reference: null },
  { parameter: "Mercury", result: null, reference: null },
  { parameter: "VOC molar ratio", result: null, reference: null },
  { parameter: "Surface area", result: null, reference: null },
];

/** Shown wherever a figure is still `null`. */
export const PENDING_NOTE =
  "Figures publish when the independent lab report is in hand. We would rather show you a blank than a number we cannot source.";

/* ── Operating model ───────────────────────────────────────────
   Describes how an order is handled. No times, no volumes — none are
   confirmed, and the lane copy already avoids them. */

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
   `live` is reserved for a market the business is actually serving
   today. Everything else is under evaluation and says so. The founder
   confirms which are live; the conservative default is that one is. */

export type Market = { name: string; note: string; live?: boolean };

export const MARKETS: Market[] = [
  {
    name: "Soil & horticulture",
    note: "Nurseries, landscapers, growers and garden centers.",
    live: true,
  },
  { name: "Water filtration", note: "Under evaluation." },
  { name: "Air & odor control", note: "Under evaluation." },
  { name: "Livestock feed", note: "Under evaluation." },
  { name: "Construction materials", note: "Under evaluation." },
  { name: "Soil remediation", note: "Under evaluation." },
  { name: "Industrial absorbents", note: "Under evaluation." },
  { name: "Aquaculture", note: "Under evaluation." },
  { name: "Carbon markets", note: "Under evaluation." },
];

/* ── Standard of evidence ──────────────────────────────────────
   The site's own labelling rule, stated publicly. */

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

/* ── Three ways in ─────────────────────────────────────────────
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

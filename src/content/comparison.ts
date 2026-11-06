/**
 * How charged biochar compares to the other things people put in soil.
 *
 * COMPARES CATEGORIES, NAMES NOBODY. Founder decision, 2026-11-06, and it
 * is the safer of the two shapes by some distance. Comparative advertising
 * is lawful, but a claim about a named competitor's product has to be true
 * AND substantiated, it has to stay true as they change their specs, and
 * getting it wrong invites a Lanham Act claim from the one party most
 * motivated to bring one. Comparing material categories makes the same
 * argument, stays true for longer, and gives nobody standing to sue.
 *
 * EVERY CELL IS NULL UNTIL THE FOUNDER FILLS IT. The column and row labels
 * below are categories and questions — not claims — so they are safe to
 * draft. The cells are the claims, and there is no sourced data for them
 * anywhere in the vault.
 *
 * THE SECTION HIDES ITSELF while every cell is null, so a half-built table
 * cannot reach the site by being forgotten. Fill any cell and it appears.
 * See `hasComparisonData` below.
 *
 * When filling it in: each cell should trace to something citable, the
 * same standard the evidence table is held to. Ranges and hedges are
 * fine — "varies", "3–5 years", "rarely" all say more than a tick does.
 */

/** A cell is free text so a row can say "varies" or give a range, not
 *  only yes and no. `null` means nobody has supplied it yet. */
export type Cell = string | null;

export type ComparisonColumn = {
  name: string;
  /** The one column that is us. Takes the highlight. */
  ours?: boolean;
};

export type ComparisonRow = {
  /** The question a buyer is actually asking. */
  attribute: string;
  /** Optional clarifier, shown small under the attribute. */
  note?: string;
  /** One cell per column, in column order. */
  cells: Cell[];
};

export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  { name: "Charged biochar", ours: true },
  { name: "Raw biochar" },
  { name: "Compost" },
  { name: "Peat" },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    attribute: "Nutrient-loaded on arrival",
    note: "Whether it feeds the soil straight away or has to be charged first.",
    cells: [null, null, null, null],
  },
  {
    attribute: "Carbon persistence in soil",
    cells: [null, null, null, null],
  },
  {
    attribute: "Water-holding capacity",
    cells: [null, null, null, null],
  },
  {
    attribute: "Batch documentation",
    note: "Whether what you receive can be traced to a tested batch.",
    cells: [null, null, null, null],
  },
  {
    attribute: "Feedstock",
    cells: [null, null, null, null],
  },
  {
    attribute: "Re-application",
    note: "How often it has to be put down again.",
    cells: [null, null, null, null],
  },
];

/** Runs under the table once there is anything in it. */
export const COMPARISON_NOTE =
  "Comparisons are between material categories rather than brands, and describe typical properties rather than any one supplier's product.";

/** The section renders only when there is something to show. */
export const hasComparisonData = COMPARISON_ROWS.some((r) =>
  r.cells.some((c) => c !== null && c !== ""),
);

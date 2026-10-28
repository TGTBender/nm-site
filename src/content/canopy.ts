/**
 * Canopy — page content.
 *
 * Drawn from the Canopy reference notes. Two audiences share one app:
 * consumer first, then trade.
 *
 * CLAIMS DISCIPLINE:
 *  - No tier prices. Plans are not settled and the DTC decision record
 *    explicitly keeps prices off customer-facing material.
 *  - The app runs on mock data with no authentication yet, so nothing here
 *    describes live accounts, logins or syncing as though they already work.
 *    "In build" is stated plainly rather than implied.
 *  - The delivery tracker is designed to sync from Jetty, which does not
 *    exist yet. Written as intent, not capability.
 */

export type Feature = { name: string; description: string };

export const CANOPY_HOME: Feature[] = [
  {
    name: "Garden book",
    description:
      "A journal for what you planted, when, and what happened next.",
  },
  {
    name: "Care tracking",
    description: "Watering, feeding and the rhythm each plant actually wants.",
  },
  {
    name: "Plant encyclopedia",
    description: "A reference you can read without a horticulture degree.",
  },
  {
    name: "Nutrient guides",
    description: "What to give, how much, and when to stop.",
  },
  {
    name: "Community",
    description: "The people growing the same things, a few weeks ahead of you.",
  },
];

export const CANOPY_TRADE: Feature[] = [
  {
    name: "Reorder in one step",
    description:
      "The standing order already knows the product, the quantity and the locked rate. Confirm and submit.",
  },
  {
    name: "Delivery in plain language",
    description:
      "Prepared, In Route, Delivered — the same three words you would use yourself, not carrier status codes.",
  },
  {
    name: "Batch lookup",
    description:
      "Scan the batch ID off the delivery sticker and the certified lab panel opens. No document request, no waiting.",
  },
  {
    name: "Account terms in the open",
    description:
      "Programme tier, locked rate and price-lock date on the dashboard rather than buried in a contract.",
  },
];

/** The two commitments stated on the trade dashboard itself. */
export const CANOPY_GUARANTEES: Feature[] = [
  {
    name: "Cadence",
    description: "The delivery lands when the schedule says it will.",
  },
  {
    name: "Spec Match",
    description: "What arrives matches what the lab certified.",
  },
];

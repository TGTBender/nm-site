import type { Metadata } from "next";

import { B2BPage } from "@/components/B2BPage";

/**
 * The B2B lane — wholesale supply.
 *
 * This is the original single-page site. When the site split into routes it
 * moved here largely intact, because its content was always the wholesale
 * funnel: bulk formats, delivery cadence, a quote request. The landing page
 * it used to be is now a separate route.
 *
 * A server component so the route can export metadata; the page body is
 * client-side and lives in components/B2BPage.
 */
export const metadata: Metadata = {
  title: "B2B Lane",
  description:
    "Wholesale biochar supply for nurseries, landscapers, farms and garden centers — on schedule, on spec, with documentation on every run.",
  openGraph: {
    title: "B2B Lane · Nature's Mastermind",
    description:
      "Wholesale biochar supply — on schedule, on spec, with documentation on every run.",
  },
};

export default function B2B() {
  return <B2BPage />;
}

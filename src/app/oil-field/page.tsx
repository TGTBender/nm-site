import type { Metadata } from "next";

import { OilFieldPage } from "@/components/OilFieldPage";

/**
 * Oil Field Supply — the live supply lane.
 *
 * A server component so the route can export metadata; the page body is
 * client-side and lives in components/OilFieldPage.
 */
export const metadata: Metadata = {
  title: "Oil Field Supply",
  description:
    "Biochar and absorbent materials for oil field operations, delivered with documentation on every load. Bringing biochar from niche to normal.",
  openGraph: {
    title: "Oil Field Supply · Nature's Mastermind",
    description:
      "Biochar and absorbent materials for oil field operations, delivered with documentation on every load.",
  },
};

export default function OilField() {
  return <OilFieldPage />;
}

import type { Metadata } from "next";

import { CanopyPage } from "@/components/CanopyPage";

/**
 * Canopy — the app behind both lanes.
 *
 * A server component so the route can export metadata; the page body is
 * client-side and lives in components/CanopyPage.
 *
 * The page states plainly that the app is still in build. For a product
 * whose pitch is traceability, implying capability it does not have yet
 * would undercut the thing it is selling.
 */
export const metadata: Metadata = {
  title: "Canopy",
  description:
    "One app, two sides. A garden companion at home, and an account portal for the trade — where a delivery traces back to the lab panel it was certified against.",
  openGraph: {
    title: "Canopy · Nature's Mastermind",
    description:
      "A garden companion at home, an account portal for the trade. In build.",
  },
};

export default function Canopy() {
  return <CanopyPage />;
}

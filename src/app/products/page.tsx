import type { Metadata } from "next";

import { ViridianPage } from "@/components/ViridianPage";

/**
 * The Viridian — the direct-to-consumer lane.
 *
 * A server component so the route can export metadata; the scenes and the
 * waitlist form are client-side and live in ViridianPage.
 *
 * Deliberately no price and no purchase path. The December Dallas–Fort Worth
 * release is a pilot, and the page's job is to collect a waitlist.
 */
export const metadata: Metadata = {
  title: "The Viridian",
  description:
    "Charged biochar and liquid nutrient, brought together at home. The Viridian arrives this December, Dallas–Fort Worth first.",
  openGraph: {
    title: "The Viridian · Nature's Mastermind",
    description:
      "Charged biochar and liquid nutrient, brought together at home. Arriving this December, Dallas–Fort Worth first.",
    images: [{ url: "/viridian/hero.jpg", width: 2400, height: 850 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Viridian · Nature's Mastermind",
    description:
      "Charged biochar and liquid nutrient, brought together at home.",
    images: ["/viridian/hero.jpg"],
  },
};

export default function Products() {
  return <ViridianPage />;
}

import type { Metadata } from "next";

import { LongevityPage } from "@/components/LongevityPage";

/**
 * The Longevity Project — a teaser.
 *
 * Makes no entity claim, solicits nothing, and names no dates, partners or
 * funding. See content/longevity.ts for the reasoning behind each omission.
 */
export const metadata: Metadata = {
  title: "The Longevity Project",
  description:
    "Gardens, teaching, and ground to prove the material in. A project we can be proud of, details coming soon.",
  openGraph: {
    title: "The Longevity Project · Nature's Mastermind",
    description:
      "Gardens, teaching, and ground to prove the material in. More soon.",
  },
};

export default function Longevity() {
  return <LongevityPage />;
}

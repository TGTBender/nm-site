import type { Metadata } from "next";

import { BGEPage } from "@/components/BGEPage";

/**
 * The BGE — The Black Glove Experience.
 *
 * The wholesale lane. The name inverts "white glove service": biochar is a
 * deep black material, and the promise is the same precision with dirt on
 * it. The nav carries the initials; the page resolves them on arrival.
 *
 * A server component so the route can export metadata; the page body is
 * client-side and lives in components/BGEPage.
 */
export const metadata: Metadata = {
  title: "The BGE",
  description:
    "The Black Glove Experience — wholesale biochar supply for nurseries, landscapers, farms and garden centers, on schedule, on spec, with documentation on every run.",
  openGraph: {
    title: "The BGE · Nature's Mastermind",
    description:
      "The Black Glove Experience — wholesale biochar supply, on schedule, on spec.",
  },
};

export default function BGE() {
  return <BGEPage />;
}

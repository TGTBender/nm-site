import type { Metadata } from "next";

import { LandingPage } from "@/components/LandingPage";

/**
 * The landing page.
 *
 * Its job is to route into the four lanes rather than to convert on one of
 * them, so it carries no single call to action. The wholesale content that
 * used to live here moved to /b2b largely intact — it was always the
 * wholesale funnel.
 */
export const metadata: Metadata = {
  title: {
    absolute: "Nature's Mastermind — Biochar, brokered and delivered",
  },
  description:
    "Brokered biochar products, a direct-to-consumer line, a wholesale lane, and a long-term research project.",
  openGraph: {
    title: "Nature's Mastermind",
    description:
      "Brokered biochar products, a direct-to-consumer line, a wholesale lane, and a long-term research project.",
  },
};

export default function Home() {
  return <LandingPage />;
}

import type { Metadata } from "next";

import { LandingPage } from "@/components/LandingPage";

/**
 * The landing page.
 *
 * Its job is to route into the four lanes rather than to convert on one of
 * them, so it carries no single call to action. The wholesale content that
 * used to live here moved to /bge largely intact — it was always the
 * wholesale funnel.
 */
export const metadata: Metadata = {
  title: {
    absolute:
      "Nature's Mastermind — Bringing biochar from niche to normal",
  },
  description:
    "Bringing biochar from niche to normal, on a global scale. Soil remediation, food production, material enhancement and more — if biochar can do it, we will source it and provide it.",
  openGraph: {
    title: "Nature's Mastermind",
    description:
      "Bringing biochar from niche to normal, on a global scale.",
  },
};

export default function Home() {
  return <LandingPage />;
}

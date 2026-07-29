import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

/**
 * next/font self-hosts these, so no request ever goes to Google and
 * there is no layout shift. The original markup asked for
 * "Playfair Display" by literal name but never actually loaded it —
 * every heading was silently falling back to a generic serif.
 *
 * Because next/font emits a hashed family name, the display face is
 * referenced through --font-playfair (see globals.css) rather than by
 * its human-readable name.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://naturesmastermind.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nature's Mastermind — Biochar Distribution for the Ark-La-Tex",
    template: "%s · Nature's Mastermind",
  },
  description:
    "Reliable biochar delivery for nurseries, landscapers, farms, and garden centers across the Ark-La-Tex — on schedule, on spec, with documentation on every run.",
  keywords: [
    "biochar",
    "biochar supplier",
    "Ark-La-Tex",
    "Shreveport",
    "soil amendment",
    "nursery supply",
    "landscaping supply",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Nature's Mastermind",
    title: "A biochar supply lane that actually shows up.",
    description:
      "Reliable biochar delivery for nurseries, landscapers, farms, and garden centers across the Ark-La-Tex.",
  },
  twitter: {
    card: "summary_large_image",
    title: "A biochar supply lane that actually shows up.",
    description:
      "Reliable biochar delivery across the Ark-La-Tex — on schedule, on spec.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Next 16 stopped overriding scroll-behavior during navigation
      // unless this attribute is set.
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

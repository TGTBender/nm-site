import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/SiteHeader";
import { WorldBackground } from "@/components/WorldBackground";
import { SiteFooter } from "@/components/SiteFooter";
import { OG_IMAGE, SITE_URL } from "@/lib/og";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nature's Mastermind — Bringing biochar from niche to normal",
    template: "%s · Nature's Mastermind",
  },
  description:
    "Bringing biochar from niche to normal. We source, document and deliver biochar and the inputs that go with it — on schedule, on spec, with documentation on every run.",
  keywords: [
    "biochar",
    "biochar supplier",
    "soil amendment",
    "nursery supply",
    "landscaping supply",
  ],
  // The site-wide fallback, used by any route that does not declare its
  // own. It was the BGE page's headline until 2026-11-16, which made the
  // whole site share under one lane's slogan — and /privacy, the only
  // route with no openGraph of its own, inherited it verbatim.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Nature's Mastermind",
    title: "Nature's Mastermind — Bringing biochar from niche to normal",
    description:
      "Bringing biochar from niche to normal. We source, document and deliver biochar and the inputs that go with it.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature's Mastermind — Bringing biochar from niche to normal",
    description:
      "Bringing biochar from niche to normal.",
    images: [OG_IMAGE.url],
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
        <Providers>
          <WorldBackground />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

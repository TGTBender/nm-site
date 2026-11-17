/**
 * Canonical origin and the default share card.
 *
 * THE ORIGIN WAS WRONG UNTIL 2026-11-16. `metadataBase` pointed at
 * https://naturesmastermind.com, which is not attached to the Vercel
 * project and does not resolve at all. Two consequences, both live:
 * every page advertised a dead host as its canonical `og:url`, and the
 * one page that declared an `og:image` resolved it against that host, so
 * the Viridian share card loaded nothing. nm.thegreenestthumb.org is the
 * only custom domain on the project; if the other name is ever bought and
 * attached, change it here and nowhere else.
 */
export const SITE_URL = "https://nm.thegreenestthumb.org";

/**
 * The site-wide share image.
 *
 * Next merges `openGraph` shallowly: a page that declares its own
 * `openGraph` replaces the parent's entirely, images included. So this is
 * not inherited — every page spreads it explicitly, and a page with a
 * better image of its own passes that instead. Before this existed only
 * /products carried an image and every other page shared as a bare text
 * card.
 */
export const OG_IMAGE = {
  url: "/bge/scoop.jpg",
  width: 2000,
  height: 848,
  alt: "A gloved hand holding a scoop of biochar over a raised bed at sunset.",
} as const;

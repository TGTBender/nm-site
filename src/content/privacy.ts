/**
 * Privacy Notice content.
 *
 * DRAFT. The brief states plainly that a lawyer should review this before
 * anyone relies on it, and that stands — nothing here has been reviewed.
 *
 * TWO FACTS ARE THE OWNER'S TO CONFIRM, and both are marked below:
 *  - MAILING_ADDRESS. Still outstanding. It is also required by CAN-SPAM in
 *    any commercial email, so the Viridian waitlist confirmation cannot ship
 *    without it either.
 *  - The provider list. Written from what the repository actually uses
 *    rather than from a template: Vercel hosts the site and its logs, and
 *    Resend sends the mail. There is nothing else. The site has no
 *    analytics package, no tag manager, no advertising pixel and sets no
 *    cookies of its own — checked against package.json and the source, not
 *    assumed. That is why there is no consent banner: the brief says to add
 *    one only if non-essential cookies or third-party trackers load, and
 *    none do. If analytics are ever added, this section and that decision
 *    both have to change.
 */

/**
 * The postal address, required by CAN-SPAM in commercial email and named
 * in the privacy notice.
 *
 * Supplied by the founder 2026-11-02 as an interim while there is no
 * office. Setting it here does two things at once: the privacy notice
 * stops saying an address is coming, and the Viridian waitlist
 * confirmation email becomes sendable — it was gated on exactly this.
 */
export const MAILING_ADDRESS: string | null =
  "1203 Cove St, Bossier City, LA 71112";

export const PRIVACY_UPDATED = "October 30, 2026";

export type PrivacySection = { heading: string; paragraphs: string[] };

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Nature's Mastermind, a subsidiary of The Greenest Thumb, Inc. You can reach us at nm@thegreenestthumb.org or 254-338-9023.",
    ],
  },
  {
    heading: "What we collect",
    paragraphs: [
      "What you type into our forms: name, email, phone, company, location or ZIP, site location, estimated volume, the kind of involvement you choose, and your message.",
      "We also collect the basic technical data your browser sends when you visit — IP address, browser type and the pages you open. This site runs no analytics package, no tag manager and no advertising trackers, and it sets no cookies of its own. That technical data exists only as standard server logs kept by our hosting provider.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "To respond to your request, to quote and supply material, to tell you when The Viridian or The BGE launches, to contact you about The Longevity Project if you ask us to, and to keep the site working and secure.",
    ],
  },
  {
    heading: "Who sees it",
    paragraphs: [
      "Our team, and the two service providers that run the site for us: Vercel, which hosts the site and keeps its server logs, and Resend, which delivers the email our forms generate. We do not sell your personal information.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "For as long as we need it for the purposes above or as the law requires, then we delete it.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can ask us to see, correct or delete what we hold about you, and you can unsubscribe from any email using the link in it. Write to nm@thegreenestthumb.org.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "This site is for adults. We do not knowingly collect information from children under 13.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We will post changes on this page and update the date above.",
    ],
  },
];

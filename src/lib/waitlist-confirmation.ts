import { MAILING_ADDRESS } from "@/content/privacy";

/**
 * The confirmation email sent to someone who joins the Viridian waitlist.
 *
 * WHY THIS IS GATED. CAN-SPAM requires a commercial email to carry a valid
 * physical postal address and a working unsubscribe mechanism. The address
 * is still outstanding — MAILING_ADDRESS is null — so `buildConfirmation`
 * returns null and the route sends nothing rather than sending something
 * non-compliant. Supply the address in content/privacy.ts and this starts
 * working with no other change.
 *
 * The unsubscribe link points at a mailto, which satisfies the requirement
 * and needs no list infrastructure. When a real list exists behind this,
 * swap it for a one-click URL.
 */

const UNSUBSCRIBE =
  "mailto:nm@thegreenestthumb.org?subject=Unsubscribe%20from%20The%20Viridian%20waitlist";

export function buildConfirmation(
  email: string,
): { subject: string; text: string } | null {
  if (!MAILING_ADDRESS) return null;

  return {
    subject: "You are on The Viridian waitlist",
    text: [
      "Thank you for joining the waitlist for The Viridian.",
      "",
      "The Viridian launches December 12, 2026, in Dallas–Fort Worth first.",
      "We will email you when it opens, and not for anything else.",
      "",
      "Nature's Mastermind, a subsidiary of The Greenest Thumb, Inc.",
      MAILING_ADDRESS,
      "",
      `To unsubscribe, reply to this message or write to ${UNSUBSCRIBE.replace("mailto:", "").split("?")[0]}.`,
      `This message was sent to ${email}.`,
    ].join("\n"),
  };
}

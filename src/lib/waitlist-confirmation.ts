/**
 * The confirmation email sent to someone who joins the Viridian waitlist.
 *
 * NO POSTAL ADDRESS, on founder instruction while the response templates
 * are being written elsewhere. That is defensible for this message and
 * will not be for the next one, so the distinction is worth recording:
 *
 *  - THIS message is transactional. Its whole purpose is to confirm a
 *    signup the recipient just asked for, and it sells nothing. CAN-SPAM
 *    separates transactional and relationship messages from commercial
 *    ones, and only the commercial kind must carry a physical postal
 *    address and an opt-out.
 *  - THE LAUNCH ANNOUNCEMENT in December is the commercial one. It exists
 *    to sell a product, so it does need a valid postal address and a
 *    working unsubscribe. Whatever template sends it has to carry both.
 *
 * The unsubscribe line stays here anyway. It is not required of a
 * transactional message, but someone who wants off the list should not
 * have to wait for the next email to find out how, and keeping it costs
 * nothing. It points at a mailto, which needs no list infrastructure;
 * swap it for a one-click URL when there is a real list behind this.
 */

const UNSUBSCRIBE_ADDRESS = "nm@thegreenestthumb.org";

export function buildConfirmation(email: string): {
  subject: string;
  text: string;
} {
  return {
    subject: "You are on The Viridian waitlist",
    text: [
      "Thank you for joining the waitlist for The Viridian.",
      "",
      "The Viridian launches December 12, 2026, in Dallas–Fort Worth first.",
      "We will email you when it opens, and not for anything else.",
      "",
      "Nature's Mastermind, a subsidiary of The Greenest Thumb, Inc.",
      "",
      `To come off the list, reply to this message or write to ${UNSUBSCRIBE_ADDRESS}.`,
      `This message was sent to ${email}.`,
    ].join("\n"),
  };
}

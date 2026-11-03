import { MAILING_ADDRESS } from "@/content/privacy";

/**
 * The confirmation email sent to someone who joins the Viridian waitlist.
 *
 * Sent as HTML with a plain-text alternative. Both are built here from the
 * same content so they cannot drift: a text-only client sees the same
 * message, and Resend is handed both parts.
 *
 * THE POSTAL ADDRESS SITS IN THE FOOTER, not the body — small, muted, and
 * below a rule, the way a business address belongs in email. It reads as
 * the sender's imprint rather than as something the reader has to take in.
 *
 * That also settles a question this message raised on its own. CAN-SPAM
 * requires an address and an opt-out only of COMMERCIAL mail, and this
 * confirmation is transactional — it confirms a signup the recipient just
 * asked for and sells nothing. Carrying the imprint anyway means the
 * distinction stops mattering here. It still matters for the December
 * launch announcement, which IS commercial and must carry both.
 *
 * EMAIL HTML IS NOT WEB HTML. Everything is inline-styled, the type is a
 * system stack, and the layout is one centred block: no stylesheet, no web
 * font, no flexbox or grid, because a good share of clients strip or
 * ignore all four.
 */

const UNSUBSCRIBE_ADDRESS = "nm@thegreenestthumb.org";
const COMPANY = "Nature's Mastermind, a subsidiary of The Greenest Thumb, Inc.";

const BODY = [
  "Thank you for joining the waitlist for The Viridian.",
  "The Viridian launches December 12, 2026, in Dallas–Fort Worth first. We will email you when it opens, and not for anything else.",
];

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function buildConfirmation(email: string): {
  subject: string;
  text: string;
  html: string;
} {
  const footerLines = [
    COMPANY,
    MAILING_ADDRESS,
    `To come off the list, reply to this message or write to ${UNSUBSCRIBE_ADDRESS}.`,
    `This message was sent to ${email}.`,
  ].filter(Boolean) as string[];

  // Body paragraphs are separated by a blank line; the footer is a block,
  // so its lines run consecutively. Joining everything with "\n\n" spread
  // the imprint into four paragraphs and gave it the weight of the message.
  const text = [BODY.join("\n\n"), "—", footerLines.join("\n")].join("\n\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f5f3ee;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;font-family:${FONT};">
      ${BODY.map(
        (p) =>
          `<p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1a1a18;">${p}</p>`,
      ).join("\n      ")}

      <hr style="border:none;border-top:1px solid #ddd6c8;margin:32px 0 16px;" />

      <!-- Imprint. Small and muted on purpose: present for anyone who
           looks for it, out of the way of the message itself. -->
      ${footerLines
        .map(
          (line) =>
            `<p style="margin:0 0 4px;font-size:11px;line-height:1.5;color:#8a8275;">${line}</p>`,
        )
        .join("\n      ")}
    </div>
  </body>
</html>`;

  return {
    subject: "You are on The Viridian waitlist",
    text,
    html,
  };
}

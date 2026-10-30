import { Resend } from "resend";

/**
 * One Resend client and one pair of addresses for the whole site.
 *
 * `resend` is null when RESEND_API_KEY is absent. Locally that is normal and
 * callers log instead of sending, so forms stay exercisable end to end
 * without credentials.
 *
 * IN A DEPLOYED ENVIRONMENT IT IS NOT NORMAL, IT IS AN OUTAGE. The first
 * version of this treated the two cases the same: a missing key meant the
 * route returned `{ ok: true, delivered: false }` and the form rendered a
 * success message. Production ran that way — every submission on every page
 * reported "Thank you" to the sender and reached nobody, with nothing in the
 * response to say so. A form that fails must fail visibly.
 *
 * `MAIL_CONFIGURED` is false only when mail genuinely cannot be sent;
 * `MAIL_REQUIRED` says whether that should be treated as an error.
 *
 * NOTE: sending also requires the FROM domain to be DNS-verified in Resend.
 * Without that a valid key still produces rejected sends, which surface as
 * an error from the send call rather than here.
 */
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** True anywhere Vercel is running this — production or preview. */
export const MAIL_REQUIRED = Boolean(process.env.VERCEL_ENV);

export const MAIL_CONFIGURED = resend !== null;

export const MAIL_FROM = "Nature's Mastermind <hello@nm.thegreenestthumb.org>";
export const MAIL_TO = "nm@thegreenestthumb.org";

/** The response for a deployed environment with no mail credentials. */
export function mailMisconfigured(route: string): Response {
  console.error(
    `[${route}] RESEND_API_KEY is not set in a deployed environment — ` +
      `the submission was NOT delivered and the sender was told so.`,
  );
  return Response.json(
    {
      error:
        "We could not send that right now. Please email nm@thegreenestthumb.org and we will pick it up.",
    },
    { status: 503 },
  );
}

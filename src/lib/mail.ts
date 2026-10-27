import { Resend } from "resend";

/**
 * One Resend client and one pair of addresses for the whole site.
 *
 * `resend` is null when RESEND_API_KEY is absent, which is the normal local
 * state. Callers log instead of sending in that case, so forms stay
 * exercisable end to end without credentials.
 *
 * NOTE: sending also requires the FROM domain to be DNS-verified in Resend.
 * Without that, a valid key still produces rejected sends in production.
 */
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const MAIL_FROM = "Nature's Mastermind <hello@nm.thegreenestthumb.org>";
export const MAIL_TO = "nm@thegreenestthumb.org";

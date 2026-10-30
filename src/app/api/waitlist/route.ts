import { waitlistSchema } from "@/lib/waitlist-schema";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { resend, MAIL_FROM, MAIL_TO } from "@/lib/mail";
import { buildConfirmation } from "@/lib/waitlist-confirmation";

/**
 * The Viridian waitlist.
 *
 * Signups are emailed through for now; HubSpot is planned, at which point
 * this handler gains a second write rather than changing shape.
 */

// Sending email is a side effect — never prerender or cache this.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { email, name, zip, company } = parsed.data;

  // Honeypot tripped. Answer exactly as success would so a bot learns
  // nothing from the response, but send nothing.
  if (company) {
    console.info("[waitlist] honeypot tripped", { email });
    return Response.json({ ok: true, delivered: false });
  }

  const body = `
New Viridian waitlist signup

Email: ${email}
Name:  ${name || "(not provided)"}
Zip:   ${zip || "(not provided)"}
  `.trim();

  if (!resend) {
    console.info("[waitlist] signup (no RESEND_API_KEY — dev mode)", {
      email,
      name,
      zip,
    });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: `Viridian waitlist — ${email}`,
      text: body,
    });

    if (error) {
      console.error("[waitlist] Resend rejected the send", error);
      return Response.json({ error: "Failed to record signup." }, { status: 502 });
    }
  } catch (err) {
    console.error("[waitlist] unexpected error sending email", err);
    return Response.json({ error: "Failed to record signup." }, { status: 502 });
  }

  // Confirmation to the subscriber. Returns null until a mailing address
  // exists, because a commercial email without one is not compliant — see
  // lib/waitlist-confirmation.ts.
  const confirmation = buildConfirmation(email);
  if (confirmation) {
    try {
      await resend.emails.send({
        from: MAIL_FROM,
        to: email,
        subject: confirmation.subject,
        text: confirmation.text,
      });
    } catch (err) {
      // The signup itself already succeeded; a failed confirmation must
      // not turn that into an error for the person who just signed up.
      console.error("[waitlist] confirmation send failed", err);
    }
  } else {
    console.warn(
      "[waitlist] no confirmation sent: MAILING_ADDRESS is not set",
    );
  }

  console.info("[waitlist] signup recorded", { email, zip });
  return Response.json({ ok: true, delivered: true });
}

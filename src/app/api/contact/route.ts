import { contactSchema, FORMAT_LABELS } from "@/lib/contact-schema";
import { checkZip } from "@/lib/delivery-area";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { resend, MAIL_FROM, MAIL_TO } from "@/lib/mail";

/**
 * Ported from the standalone Express server (api-server/src/routes/contact.ts).
 *
 * As a Route Handler this ships with the site itself: same origin, so no
 * CORS, no second service to host, no separate deploy. It runs as a
 * serverless function on Vercel.
 *
 * The throttle, the Resend client and the addresses now live in lib/ and are
 * shared with the waitlist endpoint.
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

  // The browser form validates with this same schema, but the form is
  // client-side and therefore bypassable — anyone can POST here directly.
  // This parse is the one that actually protects the mailbox.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, location, format, message, zip } = parsed.data;

  const inLane = zip ? checkZip(zip) : null;
  const zipLine = zip
    ? `${zip}${inLane === "in" ? " (in delivery lane)" : inLane === "out" ? " (OUTSIDE current lane)" : ""}`
    : "(not provided)";

  const body = `
New quote request from Nature's Mastermind website

Name:     ${name}
Email:    ${email}
Location: ${location}
Zip:      ${zipLine}
Format:   ${FORMAT_LABELS[format]}
Message:  ${message || "(none)"}
  `.trim();

  if (!resend) {
    // Local development without an API key: log instead of sending so the
    // form is still exercisable end to end.
    console.info("[contact] submission (no RESEND_API_KEY — dev mode)", {
      name,
      email,
      location,
      format,
      zip,
      message,
    });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: `Quote Request — ${name} (${location})`,
      text: body,
    });

    if (error) {
      console.error("[contact] Resend rejected the send", error);
      return Response.json({ error: "Failed to send email." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] unexpected error sending email", err);
    return Response.json({ error: "Failed to send email." }, { status: 502 });
  }

  console.info("[contact] email sent", { name, email, location, format, zip });
  return Response.json({ ok: true, delivered: true });
}

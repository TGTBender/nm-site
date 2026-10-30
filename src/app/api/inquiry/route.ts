import { inquirySchema, describeInquiry } from "@/lib/inquiry-schema";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import {
  resend,
  MAIL_FROM,
  MAIL_TO,
  MAIL_REQUIRED,
  mailMisconfigured,
} from "@/lib/mail";

/**
 * One endpoint for the oil field briefing, The BGE early list and the
 * Longevity Project interest form.
 *
 * Replaces /api/contact, which was shaped around a quote request that no
 * longer exists — the BGE form dropped its format and zip fields when the
 * lane moved to supersacks only and to an early list.
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

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot. Answer exactly as a success would, so a bot learns nothing
  // from the response — no mail is sent and nothing is logged as real.
  if (data.website) {
    console.info("[inquiry] honeypot tripped", { kind: data.kind });
    return Response.json({ ok: true, delivered: false });
  }

  const { subject, body } = describeInquiry(data);

  if (!resend) {
    // Deployed with no credentials is an outage, not a dev convenience:
    // say so rather than reporting a success nobody received.
    if (MAIL_REQUIRED) return mailMisconfigured("inquiry");

    // Local development: log instead of sending so the forms stay
    // exercisable end to end without credentials.
    console.info("[inquiry] submission (no RESEND_API_KEY — local)", {
      kind: data.kind,
      subject,
    });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: data.email,
      subject,
      text: body,
    });

    if (error) {
      console.error("[inquiry] Resend rejected the send", error);
      return Response.json({ error: "Failed to send." }, { status: 502 });
    }
  } catch (err) {
    console.error("[inquiry] unexpected error sending email", err);
    return Response.json({ error: "Failed to send." }, { status: 502 });
  }

  console.info("[inquiry] email sent", { kind: data.kind });
  return Response.json({ ok: true, delivered: true });
}

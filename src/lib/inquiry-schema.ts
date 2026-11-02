import * as z from "zod";

/**
 * Every non-waitlist form on the site, as one discriminated union.
 *
 * Three forms now take submissions — the oil field briefing, The BGE early
 * list and The Longevity Project interest form — and they differ only in
 * their fields. One union and one route handler means the rate limit, the
 * honeypot and the mail path are written once rather than three times, and
 * a fourth form later is a branch here rather than another endpoint.
 *
 * Shared between the browser and the route handler. Validating only in the
 * browser would leave the endpoint open: anyone can POST straight past a
 * client-side form, so the server parses the same schema.
 */

/**
 * Honeypot, on every variant.
 *
 * Deliberately NOT constrained to empty. Rejecting a filled honeypot in
 * validation returns a 400 naming the field, which hands a bot the exact
 * signal the trap exists to withhold. It is accepted here and judged in the
 * handler, which then answers exactly as it would on success.
 */
const honeypot = z.string().max(200).optional().or(z.literal(""));

const name = z.string().min(2, "Name is required").max(100);
const email = z.string().email("Enter a valid email address").max(200);
const message = z.string().max(4000).optional().or(z.literal(""));

/**
 * Timeline buckets for the oil field briefing.
 *
 * Free text here produced answers that could not be compared, let alone
 * scheduled against — "soon", "next spring" and "within twenty years"
 * all arriving in the same field. These are ranges an operator can
 * actually pick from, and the last one lets a long-horizon enquiry say
 * so without inventing a date.
 */
export const TIMELINE = [
  "Immediate — within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Planning ahead — no date yet",
] as const;

export const INVOLVEMENT = [
  "Volunteer",
  "Educator",
  "Site host",
  "Partner",
  "Supporter",
] as const;

export const oilFieldSchema = z.object({
  kind: z.literal("oil-field"),
  name,
  company: z.string().min(2, "Company is required").max(160),
  email,
  phone: z.string().max(40).optional().or(z.literal("")),
  site: z.string().min(2, "Site location is required").max(200),
  volume: z.string().min(1, "Estimated volume is required").max(80),
  timeline: z.enum(TIMELINE, {
    errorMap: () => ({ message: "Choose a timeline" }),
  }),
  message,
  website: honeypot,
});

export const bgeSchema = z.object({
  kind: z.literal("bge"),
  name,
  email,
  location: z.string().min(2, "Location is required").max(200),
  message,
  website: honeypot,
});

export const longevitySchema = z.object({
  kind: z.literal("longevity"),
  name,
  email,
  involvement: z.enum(INVOLVEMENT, {
    errorMap: () => ({ message: "Choose how you would like to be involved" }),
  }),
  message,
  website: honeypot,
});

export const inquirySchema = z.discriminatedUnion("kind", [
  oilFieldSchema,
  bgeSchema,
  longevitySchema,
]);

export type InquiryInput = z.infer<typeof inquirySchema>;
export type OilFieldInput = z.infer<typeof oilFieldSchema>;
export type BgeInput = z.infer<typeof bgeSchema>;
export type LongevityInput = z.infer<typeof longevitySchema>;

/** Subject line and mail body per kind, so the handler stays shapeless. */
export function describeInquiry(data: InquiryInput): {
  subject: string;
  body: string;
} {
  switch (data.kind) {
    case "oil-field":
      return {
        subject: `Oil Field briefing — ${data.name}, ${data.company}`,
        body: [
          "New oil field briefing request from the Nature's Mastermind website",
          "",
          `Name:      ${data.name}`,
          `Company:   ${data.company}`,
          `Email:     ${data.email}`,
          `Phone:     ${data.phone || "(not provided)"}`,
          `Site:      ${data.site}`,
          `Volume:    ${data.volume}`,
          `Timeline:  ${data.timeline}`,
          `Message:   ${data.message || "(none)"}`,
        ].join("\n"),
      };
    case "bge":
      return {
        subject: `BGE early list — ${data.name} (${data.location})`,
        body: [
          "New BGE early-list signup from the Nature's Mastermind website",
          "",
          `Name:     ${data.name}`,
          `Email:    ${data.email}`,
          `Location: ${data.location}`,
          `Message:  ${data.message || "(none)"}`,
        ].join("\n"),
      };
    case "longevity":
      return {
        subject: `Longevity Project — ${data.name} (${data.involvement})`,
        body: [
          "New Longevity Project interest from the Nature's Mastermind website",
          "",
          `Name:        ${data.name}`,
          `Email:       ${data.email}`,
          `Involvement: ${data.involvement}`,
          `Message:     ${data.message || "(none)"}`,
        ].join("\n"),
      };
  }
}

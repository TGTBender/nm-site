import { z } from "zod";

/**
 * Shared between the form and the route handler, so the server validates the
 * same shape the client does rather than trusting it. Client-side validation
 * is only a convenience — anyone can POST here directly.
 */
export const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().max(120).optional().or(z.literal("")),
  zip: z
    .string()
    .regex(/^\d{5}$/, "Enter a 5-digit zip code")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot. Real people leave it empty; naive bots fill every field.
   *
   * Deliberately NOT constrained to empty here. An earlier version used
   * .max(0), which meant a filled honeypot failed validation and came back
   * as a 400 naming the field — handing a bot the exact signal the trap is
   * meant to withhold. It is accepted silently and judged in the handler,
   * which answers as though the signup succeeded.
   */
  company: z.string().max(200).optional().or(z.literal("")),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

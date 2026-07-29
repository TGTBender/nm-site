import * as z from "zod";

/**
 * Shared between the quote form and the /api/contact route handler.
 *
 * Validating in only one place would leave the endpoint open: the form
 * runs in the browser, so anyone can POST straight past it. Both sides
 * parse the same schema.
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(200),
  location: z.string().min(2, "Location is required").max(200),
  format: z.enum(["drums", "supersacks", "unsure"], {
    errorMap: () => ({ message: "Please select a format" }),
  }),
  message: z.string().max(4000).optional(),
  /** Carried over from the delivery-area checker when the visitor used it. */
  zip: z
    .string()
    .regex(/^\d{5}$/, "Zip must be 5 digits")
    .optional()
    .or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const FORMAT_LABELS: Record<ContactInput["format"], string> = {
  drums: "200 lb Drums",
  supersacks: "1,000 lb Supersacks",
  unsure: "Not Sure Yet",
};

"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { waitlistSchema, type WaitlistInput } from "@/lib/waitlist-schema";
import {
  VIRIDIAN_INTRO,
  VIRIDIAN_HOW,
  VIRIDIAN_LAUNCH,
  type ViridianSection,
} from "@/content/viridian";

/** easeOutQuart — the curve shared by CSS and framer-motion site-wide. */
const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: EASE, delay },
});

const eyebrowStyle: CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: "var(--gold)",
};

/**
 * One product scene: the render full-bleed, with the headline set as live
 * type over the dark left field the renders were composed to leave empty.
 *
 * Type is live rather than baked into the picture so it stays selectable,
 * translatable, responsive and readable by a screen reader — and so a
 * headline can change without re-rendering the artwork.
 *
 * No scrim. Measured across that field the renders sit at luminance 5–13,
 * giving creme 17:1 and gold 7:1, both clear of WCAG AAA. Adding one would
 * only muddy the product.
 */
function Scene({
  section,
  minHeight,
}: {
  section: ViridianSection;
  minHeight: string;
}) {
  const { eyebrow, headline, subline, body, cta, image } = section;

  return (
    <section
      className="relative flex items-center overflow-hidden px-6 sm:px-10"
      style={{ minHeight, backgroundColor: "var(--ink-deep)" }}
    >
      {/* Art direction: the wide crop would render barely 140px tall on a
          phone, so a portrait render takes over below the md breakpoint.
          Neither carries `priority`: with it, the hidden variant was fetched
          too. Browsers skip hidden images that are not priority, and still
          load a lazy one immediately when it is already in the viewport. */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={image.desktop}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 md:hidden">
        <Image
          src={image.mobile}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px]">
        <div className="max-w-[34rem]">
          <motion.p {...reveal()} style={{ ...eyebrowStyle, marginBottom: "1.5rem" }}>
            {eyebrow}
          </motion.p>

          <motion.h2
            {...reveal(0.06)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--creme)",
              marginBottom: "1.25rem",
            }}
          >
            {headline}
          </motion.h2>

          <motion.p
            {...reveal(0.12)}
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              fontWeight: 300,
              color: "rgba(245,239,230,0.62)",
              maxWidth: "32ch",
            }}
          >
            {subline}
          </motion.p>

          {body && (
            <motion.p
              {...reveal(0.18)}
              style={{
                marginTop: "1.5rem",
                fontSize: "15px",
                lineHeight: 1.8,
                fontWeight: 300,
                color: "rgba(245,239,230,0.42)",
                maxWidth: "38ch",
              }}
            >
              {body}
            </motion.p>
          )}

          {cta && (
            <motion.div {...reveal(0.24)} style={{ marginTop: "2.5rem" }}>
              <a
                href={cta.href}
                className="nm-cta"
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--gold)",
                  color: "#1a1a18",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "17px 44px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {cta.label}
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

const inputStyle: CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "var(--creme)",
  height: "46px",
  borderRadius: "0.5rem",
  fontSize: "14px",
};

const labelStyle: CSSProperties = {
  color: "rgba(245,239,230,0.45)",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 600,
};

function WaitlistForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", name: "", zip: "", company: "" },
  });

  async function onSubmit(values: WaitlistInput) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Server error");
      setJoined(true);
      form.reset();
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Please try again or email us at nm@thegreenestthumb.org",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (joined) {
    return (
      <div
        role="status"
        style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
      >
        <CheckCircle2
          style={{ width: 18, height: 18, color: "var(--gold)", flexShrink: 0, marginTop: 2 }}
        />
        <div>
          <p style={{ fontSize: "15px", color: "var(--creme)", fontWeight: 500 }}>
            You&apos;re on the list.
          </p>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(245,239,230,0.45)",
              marginTop: "0.35rem",
              maxWidth: "36ch",
            }}
          >
            We&apos;ll be in touch before the Dallas–Fort Worth release.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...field}
                  style={inputStyle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stacks on phones — a fixed two-column split leaves each field
            around 149px at 375px, too tight to type into. */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Name (optional)</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Your name"
                    {...field}
                    style={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Zip (optional)</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    maxLength={5}
                    autoComplete="postal-code"
                    placeholder="75201"
                    {...field}
                    style={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Honeypot. Hidden from sight and from assistive tech, and skipped
            in the tab order — a real visitor never reaches it, while naive
            bots fill every field they find. */}
        <div aria-hidden="true" className="hidden">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input tabIndex={-1} autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="nm-cta"
          style={{
            width: "100%",
            height: "52px",
            backgroundColor: "var(--gold)",
            color: "#1a1a18",
            fontWeight: 700,
            fontSize: "15px",
            borderRadius: "9999px",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            letterSpacing: "0.025em",
            marginTop: "0.5rem",
          }}
        >
          {isSubmitting ? "Adding you…" : "Join the waitlist"}
        </button>
      </form>
    </Form>
  );
}

export function ViridianPage() {
  return (
    <>
      <Scene section={VIRIDIAN_INTRO} minHeight="88vh" />
      <Scene section={VIRIDIAN_HOW} minHeight="76vh" />
      <Scene section={VIRIDIAN_LAUNCH} minHeight="76vh" />

      <section
        id="waitlist"
        className="px-6 py-28 sm:px-10 sm:py-36"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p style={{ ...eyebrowStyle, marginBottom: "1.5rem" }}>
                The waitlist
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.2vw, 3.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "var(--creme)",
                  marginBottom: "1.25rem",
                }}
              >
                Be first in line.
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  color: "rgba(245,239,230,0.42)",
                  maxWidth: "34ch",
                }}
              >
                The first release is Dallas–Fort Worth only. Leave your email and
                we&apos;ll tell you when it opens.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal(0.1)} className="md:col-span-7">
            <WaitlistForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}

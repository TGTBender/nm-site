"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, CheckCircle2, Clock, Menu, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { checkZip, type ZipCheck } from "@/lib/delivery-area";

const NAV_LINKS = [
  { name: "Why biochar", href: "#why" },
  { name: "How it works", href: "#how" },
];

/** easeOutQuart — the single curve shared by CSS and framer-motion.
 *  Mirrors --ease-out-quart in globals.css; keep the two in step. */
const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/** Shared reveal. Distances stay small: the point is to feel authored,
 *  not to announce itself. */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: EASE, delay },
});

/* Facts stated elsewhere on this page, surfaced as a scannable grid.
   Nothing here asserts anything the copy does not already claim. */
const SPECS = [
  { value: "200 lb", label: "Drums" },
  { value: "1,000 lb", label: "Supersacks" },
  { value: "1 day", label: "Quote response" },
  { value: "Every run", label: "Documented" },
];

const STEPS = [
  { num: "01", text: "Tell us about your operation — format, volume, and season." },
  { num: "02", text: "We confirm your delivery lane and build your cadence." },
  {
    num: "03",
    text: "Product arrives on schedule, with documentation on every delivery.",
  },
];

export default function Home() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<ZipCheck | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);

      // Header reveal: retreat on downward scroll, return on upward.
      // The 8px gate ignores trackpad jitter that would otherwise make
      // the bar flicker, and nothing hides until well past the fold so
      // the hero is never interrupted.
      if (Math.abs(y - lastY.current) > 8) {
        setHeaderHidden(y > lastY.current && y > 260);
        lastY.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // An open menu must never ride away with the header.
  const hideHeader = headerHidden && !mobileMenuOpen;

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", location: "", message: "", zip: "" },
  });

  async function onSubmit(values: ContactInput) {
    setIsSubmitting(true);
    try {
      // The zip the visitor checked above is the most qualifying detail
      // on the page, so it rides along with the submission.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, zip: zipInput || undefined }),
      });
      if (!res.ok) throw new Error("Server error");
      toast({
        title: "Request sent!",
        description: "We'll be in touch within 1 business day.",
      });
      form.reset();
      setZipInput("");
      setZipResult(null);
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

  const ctaStyle: CSSProperties = {
    display: "inline-block",
    backgroundColor: "var(--gold)",
    color: "#1a1a18",
    fontWeight: 700,
    fontSize: "15px",
    padding: "17px 44px",
    borderRadius: "9999px",
    textDecoration: "none",
    letterSpacing: "0.02em",
  };

  const eyebrowStyle: CSSProperties = {
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 600,
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "var(--ink)", color: "var(--creme)" }}
    >
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          // Constant padding. The previous build animated padding between
          // scroll states, which is a layout property and forces reflow;
          // the compact feel now comes from transform alone.
          padding: "16px 0",
          backgroundColor: isScrolled ? "rgba(15,20,16,0.92)" : "transparent",
          backdropFilter: isScrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(14px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.55s var(--ease-out-quart), background-color 0.45s var(--ease-out-quart), border-color 0.45s var(--ease-out-quart)",
          // A fixed, backdrop-blurred bar over a full-bleed image will
          // smear on some GPUs unless it owns its compositing layer.
          backfaceVisibility: "hidden",
          isolation: "isolate",
          willChange: "transform, background-color",
        }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 sm:px-10">
          <a
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Nature's Mastermind"
              width={32}
              height={32}
              priority
              style={{
                width: 32,
                height: 32,
                borderRadius: "9999px",
                objectFit: "cover",
                border: "1.5px solid rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}
            />
            <div className="hidden md:block">
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--creme)",
                  lineHeight: 1.2,
                }}
              >
                Nature&apos;s Mastermind
              </p>
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  color: "var(--gold-muted)",
                  textTransform: "uppercase",
                }}
              >
                Biochar Distribution · Ark-La-Tex
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nm-link"
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="nm-cta"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#1a1a18",
                backgroundColor: "var(--gold)",
                borderRadius: "9999px",
                padding: "9px 22px",
                textDecoration: "none",
              }}
            >
              Get a Quote
            </a>
          </nav>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--creme)",
              padding: 4,
            }}
          >
            {mobileMenuOpen ? (
              <X style={{ width: 22, height: 22 }} />
            ) : (
              <Menu style={{ width: 22, height: 22 }} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "rgba(15,20,16,0.97)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              backfaceVisibility: "hidden",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "1.25rem 1.5rem 1.75rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[...NAV_LINKS, { name: "Get a Quote", href: "#contact" }].map(
              (link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nm-link"
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "13px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {link.name}
                </a>
              ),
            )}
          </div>
        )}
      </header>

      {/* ── Section 1: Hero ──────────────────────────────────────── */}
      {/* Content sits low-left rather than dead-centre. Centred stacks
          are the strongest "template" tell there is; anchoring the type
          to one edge is most of what reads as editorial. */}
      <section
        id="hero"
        className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-20 pt-32 sm:px-10 sm:pb-28"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            // WebP rather than PNG: identical art, 77 KB vs 738 KB on the
            // largest above-the-fold element.
            //
            // Layered backgrounds: if the image is ever missing the browser
            // skips that layer and falls through to the gradient, so the hero
            // still reads as intentional rather than as a broken image.
            backgroundImage:
              "url('/delivery.webp'), radial-gradient(ellipse at 50% 30%, #35563a 0%, #1b2a1d 55%, #0f1410 100%)",
            backgroundSize: "cover, cover",
            backgroundPosition: "center top, center",
            backgroundRepeat: "no-repeat, no-repeat",
            // Was 0.35, which put the art ~6 luminance points above the bare
            // section ink — effectively invisible. The art was authored dark
            // to survive that; both were lifted together.
            opacity: 0.88,
            zIndex: 0,
          }}
        />
        {/* Scrim weighted to the lower edge, where the type sits. The upper
            band is left almost clear so the treeline and horizon glow are
            actually visible; it ramps hard through the lower half to hold
            contrast under the headline. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,20,16,0.10) 0%, rgba(15,20,16,0.16) 30%, rgba(15,20,16,0.44) 56%, rgba(15,20,16,0.80) 79%, rgba(15,20,16,0.93) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1240px]" style={{ zIndex: 2 }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              ...eyebrowStyle,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              marginBottom: "1.75rem",
            }}
          >
            <MapPin
              style={{
                display: "inline",
                width: 11,
                height: 11,
                marginRight: "6px",
                verticalAlign: "middle",
                marginBottom: "1px",
              }}
            />
            Ark-La-Tex Region · Biochar Distribution
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
            className="max-w-[15ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              color: "var(--creme)",
              letterSpacing: "-0.03em",
              marginBottom: "2rem",
            }}
          >
            A biochar supply lane that actually shows up.
          </motion.h1>

          {/* Sub-copy and CTA share a baseline row on wide screens —
              asymmetry the centred layout could not express. */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
              style={{
                fontSize: "1.0625rem",
                lineHeight: "1.75",
                color: "rgba(245,239,230,0.55)",
                maxWidth: "44ch",
                fontWeight: 300,
              }}
            >
              Reliable biochar delivery for nurseries, landscapers, farms, and
              garden centers across the Ark-La-Tex — on schedule, on spec, with
              documentation on every run.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
              className="shrink-0"
            >
              <a href="#contact" className="nm-cta" style={ctaStyle}>
                Request a Quote
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Why it matters ───────────────────────────── */}
      {/* Editorial two-column: label parked in a narrow rail, prose set
          against it. The rail is sticky on desktop so the section keeps
          announcing itself while the body scrolls. */}
      <section
        id="why"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{
          backgroundColor: "var(--off-white)",
          // Rules on this section sit on a light ground.
          ["--hairline" as string]: "var(--hairline-ink)",
        }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-3">
            <p
              className="md:sticky md:top-28"
              style={{ ...eyebrowStyle, color: "var(--gold)" }}
            >
              Why it matters
            </p>
          </motion.div>

          <div className="md:col-span-9 md:max-w-[46rem]">
            <motion.h2
              {...reveal(0.05)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.6vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "var(--brown)",
                marginBottom: "2.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Biochar doesn&apos;t wear off. One application changes your soil for
              decades.
            </motion.h2>

            <motion.div
              {...reveal(0.12)}
              style={{
                fontSize: "1.0625rem",
                lineHeight: "1.9",
                color: "var(--brown-light)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                maxWidth: "62ch",
              }}
            >
              <p>
                It retains moisture, reduces fertilizer dependency, and builds
                living structure into soil that plants return to season after
                season. For nurseries, farms, landscapers, and garden centers —
                it&apos;s not a trendy amendment. It&apos;s a long-term investment
                in the ground.
              </p>
              <p>
                The problem isn&apos;t demand. It&apos;s access. Consistent,
                reliable, documented biochar has been nearly impossible to source
                in the Ark-La-Tex. Shipments that don&apos;t show. Specs that
                don&apos;t match. No paperwork for the customers who ask questions.
                We built Nature&apos;s Mastermind to close that gap — for good.
              </p>
            </motion.div>

            {/* Hairline spec grid. Large display figures against small
                grey labels — the ratio is what reads as considered. */}
            <motion.dl
              {...reveal(0.18)}
              className="nm-rule-grid mt-16 grid grid-cols-2 lg:grid-cols-4"
            >
              {SPECS.map((s) => (
                <div key={s.label} className="px-5 py-8 sm:px-6 sm:py-10">
                  <dt className="sr-only">{s.label}</dt>
                  <dd
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      fontWeight: 700,
                      color: "var(--brown)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </dd>
                  <p
                    style={{
                      marginTop: "0.85rem",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "rgba(59,37,16,0.42)",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* ── Signature motif ──────────────────────────────────────
          The arc sweep, carrying a full-bleed image against a forest
          block. This is the slot a real delivery photograph drops
          into — swap the src and nothing else changes. */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--forest)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="nm-arc-br relative h-[46vw] min-h-[260px] overflow-hidden md:h-[34vw] md:min-h-[380px]"
          >
            <Image
              src="/delivery.webp"
              alt="Biochar delivery across the Ark-La-Tex"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
            />
          </motion.div>

          <div className="flex items-center px-6 py-16 sm:px-10 md:py-0">
            <motion.div {...reveal(0.1)} className="max-w-[38ch]">
              <p
                style={{
                  ...eyebrowStyle,
                  color: "var(--gold-muted)",
                  marginBottom: "1.5rem",
                }}
              >
                On the ground
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "var(--creme)",
                  letterSpacing: "-0.015em",
                }}
              >
                Built around the delivery, not the order form.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: How to get it ─────────────────────────────── */}
      <section
        id="how"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-3">
            <p
              className="md:sticky md:top-28"
              style={{ ...eyebrowStyle, color: "var(--gold-muted)" }}
            >
              How to get it
            </p>
          </motion.div>

          <div className="md:col-span-9">
            <div style={{ borderTop: "1px solid var(--hairline)" }}>
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...reveal(i * 0.08)}
                  className="flex items-baseline gap-8 border-b py-10 sm:gap-12 sm:py-12"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 4vw, 3.25rem)",
                      fontWeight: 700,
                      color: "var(--gold)",
                      opacity: 0.3,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </span>
                  <p
                    style={{
                      fontSize: "clamp(1.0625rem, 1.6vw, 1.375rem)",
                      lineHeight: "1.55",
                      color: "var(--creme)",
                      fontWeight: 300,
                      letterSpacing: "-0.005em",
                      maxWidth: "36ch",
                    }}
                  >
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div {...reveal(0.3)} style={{ marginTop: "3rem" }}>
              <a href="#contact" className="nm-cta" style={ctaStyle}>
                Request a Quote
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          {/* Pitch rail on the left, form on the right. */}
          <motion.div {...reveal()} className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p
                style={{
                  ...eyebrowStyle,
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                }}
              >
                Start here
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.2vw, 3.5rem)",
                  fontWeight: 700,
                  color: "var(--creme)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  marginBottom: "1.25rem",
                }}
              >
                Request a quote.
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "rgba(245,239,230,0.42)",
                  fontWeight: 300,
                  maxWidth: "34ch",
                }}
              >
                Tell us what you run and we&apos;ll come back within one business
                day with formats, cadence and a delivery lane.
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-7">
            {/* Zip checker */}
            <motion.div {...reveal(0.08)} style={{ marginBottom: "2.25rem" }}>
              <label
                htmlFor="zip-check"
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,239,230,0.30)",
                  marginBottom: "0.75rem",
                }}
              >
                Check delivery availability
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  id="zip-check"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Your zip code"
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value.replace(/\D/g, "").slice(0, 5));
                    setZipResult(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setZipResult(checkZip(zipInput));
                    }
                  }}
                  style={{ ...inputStyle, flex: 1, padding: "0 1rem" }}
                />
                <button
                  type="button"
                  onClick={() => setZipResult(checkZip(zipInput))}
                  className="nm-quiet"
                  style={{
                    height: "46px",
                    padding: "0 1.25rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "rgba(255,255,255,0.07)",
                    color: "rgba(245,239,230,0.60)",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "1px solid rgba(255,255,255,0.12)",
                    cursor: "pointer",
                  }}
                >
                  Check
                </button>
              </div>
              <div aria-live="polite">
                {zipResult === "in" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginTop: "0.75rem",
                    }}
                  >
                    <CheckCircle2
                      style={{
                        width: 13,
                        height: 13,
                        color: "var(--gold)",
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ fontSize: "13px", color: "rgba(245,239,230,0.55)" }}>
                      You&apos;re in our delivery lane.
                    </p>
                  </div>
                )}
                {zipResult === "out" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginTop: "0.75rem",
                    }}
                  >
                    <Clock
                      style={{
                        width: 13,
                        height: 13,
                        color: "var(--gold-muted)",
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ fontSize: "13px", color: "rgba(245,239,230,0.40)" }}>
                      Outside our current lane — we&apos;re expanding. Fill out the
                      form anyway.
                    </p>
                  </div>
                )}
                {zipResult === "invalid" && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#c97c3a",
                      marginTop: "0.6rem",
                    }}
                  >
                    Please enter a valid 5-digit zip code.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...reveal(0.14)}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.125rem",
                  }}
                >
                  {/* Stacks on phones — at 375px a fixed 1fr 1fr left each
                      input ~149px wide, too tight to type an email into. */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={labelStyle}>Name</FormLabel>
                          <FormControl>
                            <Input
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={labelStyle}>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              {...field}
                              style={inputStyle}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={labelStyle}>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City, State"
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
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={labelStyle}>Format</FormLabel>
                          {/* `?? ""` keeps this controlled after form.reset().
                              With a bare undefined, Radix falls back to
                              uncontrolled and keeps rendering the previous
                              label, so a cleared form still showed a format. */}
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <FormControl>
                              <SelectTrigger style={inputStyle}>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="drums">200 lb Drums</SelectItem>
                              <SelectItem value="supersacks">
                                1,000 lb Supersacks
                              </SelectItem>
                              <SelectItem value="unsure">Not Sure Yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={labelStyle}>Message (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your operation..."
                            {...field}
                            style={{
                              backgroundColor: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              color: "var(--creme)",
                              minHeight: "100px",
                              resize: "none",
                              borderRadius: "0.5rem",
                              fontSize: "14px",
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    {isSubmitting ? "Sending…" : "Send My Request"}
                  </button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        className="px-6 py-14 sm:px-10"
        style={{
          backgroundColor: "var(--ink-deep)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <Image
              src="/logo.jpg"
              alt=""
              width={28}
              height={28}
              style={{
                width: 28,
                height: 28,
                borderRadius: "9999px",
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(245,239,230,0.45)",
                }}
              >
                Nature&apos;s Mastermind
              </p>
              <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.22)" }}>
                A subsidiary of The Greenest Thumb Inc.
              </p>
            </div>
          </div>

          <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.16)" }}>
            © 2026 Nature&apos;s Mastermind
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState, useEffect, type CSSProperties } from "react";
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
import { SoilProfile } from "@/components/SoilProfile";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { checkZip, type ZipCheck } from "@/lib/delivery-area";

const NAV_LINKS = [
  { name: "Why biochar", href: "#why" },
  { name: "How it works", href: "#how" },
];

export default function Home() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<ZipCheck | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    transition: "opacity 0.2s, transform 0.2s",
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#0f1410", color: "var(--creme)" }}
    >
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s, padding 0.3s",
          backgroundColor: isScrolled ? "rgba(15,20,16,0.92)" : "transparent",
          backdropFilter: isScrolled ? "blur(14px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          padding: isScrolled ? "12px 0" : "22px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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

          <nav className="hidden lg:flex items-center" style={{ gap: "2.5rem" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(245,239,230,0.55)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--creme)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(245,239,230,0.55)")
                }
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#1a1a18",
                backgroundColor: "var(--gold)",
                borderRadius: "9999px",
                padding: "8px 22px",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "1.25rem 2rem 1.75rem",
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
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "rgba(245,239,230,0.75)",
                    padding: "13px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    textDecoration: "none",
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
      <section
        id="hero"
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "8rem 2rem 6rem",
          backgroundColor: "#0f1410",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            // WebP rather than PNG: identical art, 77 KB vs 738 KB on the
            // largest above-the-fold element. Every browser Next 16 supports
            // handles WebP, so a PNG fallback would never be served.
            //
            // Layered backgrounds: if the image is ever missing the browser
            // skips that layer and falls through to the gradient, so the hero
            // still reads as intentional rather than as a broken image.
            backgroundImage:
              "url('/delivery.webp'), radial-gradient(ellipse at 50% 30%, #35563a 0%, #1b2a1d 55%, #0f1410 100%)",
            backgroundSize: "cover, cover",
            backgroundPosition: "center top, center",
            backgroundRepeat: "no-repeat, no-repeat",
            opacity: 0.35,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,20,16,0.55) 0%, rgba(15,20,16,0.40) 40%, rgba(15,20,16,0.82) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: "70vw",
            maxWidth: "800px",
            maxHeight: "800px",
            background:
              "radial-gradient(circle, rgba(45,74,45,0.35) 0%, transparent 68%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "820px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              color: "var(--gold)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "2.25rem",
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
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8.5vw, 7rem)",
              fontWeight: 700,
              lineHeight: 1.03,
              color: "var(--creme)",
              letterSpacing: "-0.025em",
              marginBottom: "2.25rem",
            }}
          >
            A biochar supply lane that actually shows up.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.8",
              color: "rgba(245,239,230,0.52)",
              maxWidth: "480px",
              margin: "0 auto 3.25rem",
              fontWeight: 300,
            }}
          >
            Reliable biochar delivery for nurseries, landscapers, farms, and
            garden centers across the Ark-La-Tex — on schedule, on spec, with
            documentation on every run.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            <a
              href="#contact"
              style={ctaStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Request a Quote
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <a
            href="#why"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,239,230,0.22)",
              textDecoration: "none",
              display: "block",
            }}
          >
            scroll
          </a>
        </motion.div>
      </section>

      {/* ── Section 2: Why it matters ───────────────────────────── */}
      <section
        id="why"
        style={{ backgroundColor: "var(--off-white)", padding: "9rem 2rem" }}
      >
        <div style={{ maxWidth: "660px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: "var(--gold)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "2.5rem",
            }}
          >
            Why it matters
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.125rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--brown)",
              marginBottom: "2.75rem",
              letterSpacing: "-0.015em",
            }}
          >
            Biochar doesn&apos;t wear off. One application changes your soil for
            decades.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            style={{
              fontSize: "1.0625rem",
              lineHeight: "1.9",
              color: "var(--brown-light)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
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

          <SoilProfile />
        </div>
      </section>

      {/* ── Section 3: How to get it ─────────────────────────────── */}
      <section
        id="how"
        style={{ backgroundColor: "var(--forest)", padding: "9rem 2rem" }}
      >
        <div style={{ maxWidth: "660px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: "var(--gold-muted)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "2.5rem",
            }}
          >
            How to get it
          </motion.p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            {[
              {
                num: "01",
                text: "Tell us about your operation — format, volume, and season.",
              },
              {
                num: "02",
                text: "We confirm your delivery lane and build your cadence.",
              },
              {
                num: "03",
                text: "Product arrives on schedule, with documentation on every delivery.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: "flex",
                  gap: "2.25rem",
                  alignItems: "baseline",
                  padding: "2.75rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.25rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    opacity: 0.28,
                    lineHeight: 1,
                    width: "4.5rem",
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </span>
                <p
                  style={{
                    fontSize: "1.25rem",
                    lineHeight: "1.6",
                    color: "var(--creme)",
                    fontWeight: 300,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            style={{ marginTop: "3rem" }}
          >
            <a
              href="#contact"
              style={ctaStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Request a Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{ backgroundColor: "#0f1410", padding: "9rem 2rem" }}
      >
        <div style={{ maxWidth: "540px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: "3rem" }}
          >
            <p
              style={{
                color: "var(--gold)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              Start here
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--creme)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
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
              }}
            >
              We respond within 1 business day.
            </p>
          </motion.div>

          {/* Zip checker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: "2.25rem" }}
          >
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
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(245,239,230,0.55)",
                    }}
                  >
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
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(245,239,230,0.40)",
                    }}
                  >
                    Outside our current lane — we&apos;re expanding. Fill out
                    the form anyway.
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
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
                      <FormLabel style={labelStyle}>
                        Message (optional)
                      </FormLabel>
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
                    transition: "opacity 0.2s",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.opacity = "0.88";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.opacity = "1";
                  }}
                >
                  {isSubmitting ? "Sending…" : "Send My Request"}
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: "#0c110d",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "540px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            textAlign: "center",
          }}
        >
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
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(245,239,230,0.45)",
              }}
            >
              Nature&apos;s Mastermind
            </p>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.22)" }}>
            A subsidiary of The Greenest Thumb Inc.
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(245,239,230,0.16)",
              marginTop: "0.5rem",
            }}
          >
            © 2026 Nature&apos;s Mastermind
          </p>
        </div>
      </footer>
    </div>
  );
}

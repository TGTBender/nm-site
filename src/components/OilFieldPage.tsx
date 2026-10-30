"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SCOPE, STEPS, SUPPLY } from "@/content/oil-field";
import { InquiryForm, type Field } from "@/components/InquiryForm";
import { oilFieldSchema } from "@/lib/inquiry-schema";
import { ctaStyle, eyebrowStyle } from "@/lib/form-styles";
import { EASE, reveal } from "@/lib/motion";

/**
 * Oil Field Supply.
 *
 * Built on the /bge template, as the brief specifies: same hero treatment
 * with the type anchored low-left over a scrimmed photograph, the same
 * numbered steps, the same form styling.
 *
 * The scope block is given its own section rather than a line of small
 * print. It is the only thing on the page that limits what is being
 * offered, and a page that sells supply into oil field work without it
 * reads as a remediation claim — which this business does not make.
 */

const FIELDS: Field[] = [
  { name: "name", label: "Name" },
  { name: "company", label: "Company" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel", optional: true },
  { name: "site", label: "Site location", wide: true },
  { name: "volume", label: "Estimated volume (tons)" },
  { name: "timeline", label: "Timeline" },
  { name: "message", label: "Message", type: "textarea", optional: true },
];

export function OilFieldPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex min-h-[90dvh] flex-col justify-end overflow-hidden px-6 pb-24 pt-40 sm:px-10"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/bge/load.jpg"
            alt="A flatbed load of Nature's Mastermind bulk bags strapped to pallets."
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
            style={{ objectPosition: "center 42%" }}
          />
          <Image
            src="/bge/load-mobile.jpg"
            alt="A flatbed load of Nature's Mastermind bulk bags strapped to pallets."
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
            style={{ objectPosition: "center 45%" }}
          />
        </div>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(15,20,16,0.20) 0%, rgba(15,20,16,0.30) 30%, rgba(15,20,16,0.60) 56%, rgba(15,20,16,0.88) 79%, rgba(15,20,16,0.96) 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1240px]" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-7 flex flex-wrap items-center gap-4"
          >
            <p style={{ ...eyebrowStyle, color: "var(--gold)" }}>
              Oil &amp; Gas · Biochar Supply
            </p>
            <span
              style={{
                ...eyebrowStyle,
                fontSize: "9px",
                color: "var(--nm-black)",
                backgroundColor: "var(--gold)",
                padding: "0.3rem 0.55rem",
                borderRadius: "2px",
              }}
            >
              Active
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
            className="max-w-[18ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5.6vw, 4.75rem)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--creme)",
            }}
          >
            Biochar supply for oil field operations. Documented, on schedule.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
            style={{
              marginTop: "2rem",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              fontWeight: 300,
              color: "var(--on-dark)",
              maxWidth: "54ch",
            }}
          >
            We source biochar and absorbent materials from documented producers
            and deliver them to operators and to land-treatment and
            produced-water companies. You get the material, the logistics and
            the paperwork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
            style={{ marginTop: "2.5rem" }}
          >
            <a href="#briefing" className="nm-cta" style={ctaStyle}>
              Request a briefing
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── What we supply ─────────────────────────────────────── */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-36"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.p
            {...reveal()}
            style={{ ...eyebrowStyle, color: "var(--gold)", marginBottom: "3rem" }}
          >
            What we supply
          </motion.p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {SUPPLY.map((item, i) => (
              <motion.div key={item.title} {...reveal(0.05 + i * 0.06)}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    color: "var(--creme)",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    marginTop: "0.85rem",
                    fontSize: "0.9375rem",
                    lineHeight: 1.8,
                    fontWeight: 300,
                    color: "var(--on-dark)",
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────── */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-36"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-3">
            <p
              className="md:sticky md:top-28"
              style={{ ...eyebrowStyle, color: "var(--gold-muted)" }}
            >
              How it works
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
                      color: "var(--gold-muted)",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </span>
                  <p
                    style={{
                      fontSize: "clamp(1.0625rem, 1.6vw, 1.375rem)",
                      lineHeight: 1.55,
                      color: "var(--creme)",
                      fontWeight: 300,
                      maxWidth: "40ch",
                    }}
                  >
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scope ──────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 sm:px-10 sm:py-32"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.div
            {...reveal()}
            style={{
              borderLeft: "2px solid var(--gold)",
              paddingLeft: "clamp(1.25rem, 3vw, 2.5rem)",
              maxWidth: "62ch",
            }}
          >
            <p
              style={{ ...eyebrowStyle, color: "var(--gold)", marginBottom: "1.5rem" }}
            >
              What we do and don&apos;t do
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.4vw, 1.875rem)",
                fontWeight: 700,
                lineHeight: 1.45,
                letterSpacing: "-0.015em",
                color: "var(--creme)",
              }}
            >
              {SCOPE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Briefing form ──────────────────────────────────────── */}
      <section
        id="briefing"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p
                style={{ ...eyebrowStyle, color: "var(--gold)", marginBottom: "1.5rem" }}
              >
                Start here
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.2vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "var(--creme)",
                }}
              >
                Request a briefing.
              </h2>
              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  color: "var(--on-dark)",
                  maxWidth: "40ch",
                }}
              >
                Tell us the site, the volume and the timeline. We come back
                within one business day with what we can supply and what we can
                document.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal(0.1)} className="md:col-span-7">
            <InquiryForm
              schema={oilFieldSchema.omit({ kind: true })}
              kind="oil-field"
              fields={FIELDS}
              submitLabel="Send My Request"
              privacyNote="We use what you send only to respond to your request."
              successMessage="We will come back within one business day with what we can supply and what we can document."
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

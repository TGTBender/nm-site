"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { LANES, type Lane } from "@/content/lanes";

/** easeOutQuart — the curve shared by CSS and framer-motion site-wide. */
const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: EASE, delay },
});

/**
 * A lane row.
 *
 * Rendered as a wide editorial row rather than a card: the site's other
 * pages are full-bleed and typographic, and a grid of boxes would read as a
 * different design language.
 *
 * Lanes without a page yet are not links. A nav item that goes nowhere is
 * worse than one that is visibly not ready.
 */
function LaneRow({ lane, index }: { lane: Lane; index: number }) {
  const inner = (
    <div
      className="grid grid-cols-1 items-baseline gap-4 py-10 sm:gap-10 sm:py-12 md:grid-cols-12"
      style={{ borderBottom: "1px solid var(--hairline)" }}
    >
      <div className="md:col-span-1">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--gold)",
            opacity: 0.4,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="md:col-span-4">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.625rem, 3vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "var(--creme)",
          }}
        >
          {lane.name}
        </h3>
        {lane.status && (
          <p
            style={{
              marginTop: "0.65rem",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--gold-muted)",
            }}
          >
            {lane.status}
          </p>
        )}
      </div>

      <div className="md:col-span-6">
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            fontWeight: 300,
            color: "rgba(245,239,230,0.52)",
            maxWidth: "42ch",
          }}
        >
          {lane.description}
        </p>
      </div>

      <div className="flex md:col-span-1 md:justify-end">
        {lane.href ? (
          <ArrowRight
            aria-hidden
            style={{ width: 20, height: 20, color: "var(--gold)" }}
          />
        ) : null}
      </div>
    </div>
  );

  return (
    <motion.div {...reveal(index * 0.06)}>
      {lane.href ? (
        <Link
          href={lane.href}
          className="nm-lane"
          style={{ display: "block", textDecoration: "none" }}
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────
          Type only, on the deep ground. The lanes differ too much for one
          photograph to stand for all of them, and the product renders
          belong to the lane that owns them. */}
      <section
        className="flex min-h-[78vh] items-end px-6 pb-20 pt-40 sm:px-10 sm:pb-28"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "1.75rem",
            }}
          >
            Nature&apos;s Mastermind
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
            className="max-w-[18ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--creme)",
              marginBottom: "2rem",
            }}
          >
            Bring biochar from niche to normal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              fontWeight: 300,
              color: "rgba(245,239,230,0.55)",
              maxWidth: "46ch",
            }}
          >
            On a global scale. If biochar can do it, we will source it, provide
            it, and get dirty with you.
          </motion.p>
        </div>
      </section>

      {/* ── The lanes ─────────────────────────────────────────────── */}
      <section
        id="lanes"
        className="px-6 pb-28 sm:px-10 sm:pb-36"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto max-w-[1240px]">
          <motion.p
            {...reveal()}
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--gold-muted)",
              marginBottom: "2.5rem",
            }}
          >
            The lanes
          </motion.p>

          <div style={{ borderTop: "1px solid var(--hairline)" }}>
            {LANES.map((lane, i) => (
              <LaneRow key={lane.name} lane={lane} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── The Viridian, featured ────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden px-6 sm:px-10"
        style={{ minHeight: "70vh", backgroundColor: "var(--ink-deep)" }}
      >
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/viridian/closed.jpg"
            alt="The closed Viridian box in dark emerald with a gold foil Nature's Mastermind seal."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/viridian/closed-mobile.jpg"
            alt="The closed Viridian box in dark emerald with a gold foil Nature's Mastermind seal."
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="max-w-[34rem]">
            <motion.p
              {...reveal()}
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--gold)",
                marginBottom: "1.5rem",
              }}
            >
              Arriving this December
            </motion.p>
            <motion.h2
              {...reveal(0.06)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--creme)",
                marginBottom: "1.25rem",
              }}
            >
              The Viridian.
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                fontWeight: 300,
                color: "rgba(245,239,230,0.62)",
                maxWidth: "32ch",
                marginBottom: "2.5rem",
              }}
            >
              Charged biochar and liquid nutrient, brought together at home.
              Dallas–Fort Worth first.
            </motion.p>
            <motion.div {...reveal(0.18)}>
              <Link
                href="/products"
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
                See The Viridian
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

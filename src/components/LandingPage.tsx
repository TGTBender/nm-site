"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { LANES, type Lane } from "@/content/lanes";
import { EASE, reveal } from "@/lib/motion";

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
      className="grid grid-cols-1 items-start gap-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-12"
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

      {/* The row's own arrow is suppressed when the lane carries a call to
          action, which already has one — otherwise the row shows two. */}
      <div className="flex md:col-span-1 md:justify-end">
        {lane.href && !lane.cta ? (
          <ArrowRight
            aria-hidden
            style={{ width: 20, height: 20, color: "var(--gold)" }}
          />
        ) : null}
      </div>

      {/* The preview belongs to the lane, not to a section of its own. Only
          the shipping product has one, which is the hierarchy: one of these
          is real and the rest are not yet. */}
      {lane.image && (
        <div className="md:col-span-10 md:col-start-2">
          <div
            className="nm-arc-br relative mt-2 overflow-hidden"
            style={{ aspectRatio: "16 / 7" }}
          >
            <Image
              src={lane.image.desktop}
              alt={lane.image.alt}
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              className="hidden object-cover md:block"
              // bias left: the render's lit backdrop falls off to the upper
              // right, and the arc cut turns it into a bright wedge that
              // competes with the box
              style={{ objectPosition: "38% 52%" }}
            />
            <Image
              src={lane.image.mobile}
              alt={lane.image.alt}
              fill
              sizes="100vw"
              className="object-cover md:hidden"
              style={{ objectPosition: "center 42%" }}
            />
          </div>

          {lane.cta && (
            <span
              className="nm-lane-cta mt-7 inline-flex items-center gap-2"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "var(--gold)",
              }}
            >
              {lane.cta}
              <ArrowRight aria-hidden style={{ width: 15, height: 15 }} />
            </span>
          )}
        </div>
      )}
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
        className="sec flex min-h-[78vh] items-end px-6 pb-48 pt-40 sm:px-10"
        data-bg="black"
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
        className="sec px-6 py-48 sm:px-10"
        data-bg="deep"
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

    </>
  );
}

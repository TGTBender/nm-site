"use client";

import { motion } from "framer-motion";

import { LONGEVITY_CARDS } from "@/content/longevity";
import { EASE } from "@/lib/motion";

/**
 * A trailer, not a page.
 *
 * Each card holds the screen on its own: one line, a lot of black, a slow
 * reveal. The restraint is the point — the project is early, and a teaser
 * that withholds reads as deliberate where a thin overview would read as
 * unfinished.
 *
 * Nothing here is a commitment. See content/longevity.ts for what the page
 * deliberately does not say.
 */
export function LongevityPage() {
  return (
    <>
      {/* ── Title card ─────────────────────────────────────────── */}
      <section
        className="flex min-h-[86vh] items-center px-6 sm:px-10"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              fontSize: "11px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "2.25rem",
            }}
          >
            Nature&apos;s Mastermind
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="max-w-[13ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--creme)",
            }}
          >
            The Longevity Project
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            style={{
              transformOrigin: "left",
              height: "1px",
              backgroundColor: "var(--gold)",
              opacity: 0.4,
              margin: "3rem 0 2.25rem",
              maxWidth: "22rem",
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              fontWeight: 300,
              color: "rgba(245,239,230,0.5)",
              maxWidth: "40ch",
            }}
          >
            Something we are building alongside the business. Not ready to
            explain yet — close enough to show you the shape of it.
          </motion.p>
        </div>
      </section>

      {/* ── Cards ──────────────────────────────────────────────── */}
      {LONGEVITY_CARDS.map((card, i) => (
        <section
          key={card.line}
          className="flex min-h-[64vh] items-center px-6 sm:px-10"
          style={{
            backgroundColor: i % 2 === 0 ? "var(--ink)" : "var(--ink-deep)",
          }}
        >
          <div className="mx-auto w-full max-w-[1240px]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--gold)",
                opacity: 0.45,
                marginBottom: "1.75rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
              className="max-w-[20ch]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5.4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "var(--creme)",
              }}
            >
              {card.line}
            </motion.h2>

            {card.note && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
                style={{
                  marginTop: "1.75rem",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: "rgba(245,239,230,0.42)",
                  maxWidth: "42ch",
                }}
              >
                {card.note}
              </motion.p>
            )}
          </div>
        </section>
      ))}

      {/* ── Closing card ───────────────────────────────────────── */}
      <section
        className="flex min-h-[52vh] items-center px-6 sm:px-10"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--gold)",
            }}
          >
            More soon.
          </motion.p>
        </div>
      </section>
    </>
  );
}

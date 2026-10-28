"use client";

import { motion } from "framer-motion";

import {
  CANOPY_HOME,
  CANOPY_TRADE,
  CANOPY_LAB_PANEL,
  CANOPY_GUARANTEES,
  type Feature,
} from "@/content/canopy";

/** easeOutQuart — the curve shared by CSS and framer-motion site-wide. */
const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: EASE, delay },
});

const eyebrow = {
  fontSize: "11px",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
};

/**
 * Canopy has no product renders of its own, so this page is carried by type,
 * rule and space rather than photography — which suits software better than
 * a borrowed image would.
 */
function FeatureList({ features }: { features: Feature[] }) {
  return (
    <div style={{ borderTop: "1px solid var(--hairline)" }}>
      {features.map((f, i) => (
        <motion.div
          key={f.name}
          {...reveal(i * 0.05)}
          className="py-6"
          style={{ borderBottom: "1px solid var(--hairline)" }}
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--creme)",
              marginBottom: "0.4rem",
            }}
          >
            {f.name}
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.75,
              fontWeight: 300,
              color: "rgba(245,239,230,0.45)",
              maxWidth: "46ch",
            }}
          >
            {f.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export function CanopyPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="flex min-h-[72vh] items-end px-6 pb-20 pt-40 sm:px-10 sm:pb-28"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ ...eyebrow, color: "var(--gold)", marginBottom: "1.75rem" }}
          >
            Nature&apos;s Mastermind · In build
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
            className="max-w-[14ch]"
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
            Canopy
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
              maxWidth: "48ch",
            }}
          >
            One app, two sides. A garden companion at home, and an account
            portal for the trade — where a delivery can be traced back to the
            lab panel it was certified against.
          </motion.p>
        </div>
      </section>

      {/* ── Two sides ──────────────────────────────────────────── */}
      <section
        className="px-6 pb-28 sm:px-10 sm:pb-36"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-14">
          <div>
            <motion.p
              {...reveal()}
              style={{ ...eyebrow, color: "var(--gold)", marginBottom: "1.5rem" }}
            >
              At home
            </motion.p>
            <motion.h2
              {...reveal(0.05)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--creme)",
                marginBottom: "2rem",
              }}
            >
              For the people growing things.
            </motion.h2>
            <FeatureList features={CANOPY_HOME} />
          </div>

          <div>
            <motion.p
              {...reveal()}
              style={{
                ...eyebrow,
                color: "var(--gold-muted)",
                marginBottom: "1.5rem",
              }}
            >
              For the trade
            </motion.p>
            <motion.h2
              {...reveal(0.05)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--creme)",
                marginBottom: "2rem",
              }}
            >
              For the people buying it by the pallet.
            </motion.h2>
            <FeatureList features={CANOPY_TRADE} />
          </div>
        </div>
      </section>

      {/* ── Traceability ───────────────────────────────────────── */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-36"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 md:grid-cols-12">
          <motion.div {...reveal()} className="md:col-span-5">
            <p style={{ ...eyebrow, color: "var(--gold)", marginBottom: "1.5rem" }}>
              Proof, not promises
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
              Every batch, on the record.
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                fontWeight: 300,
                color: "rgba(245,239,230,0.45)",
                maxWidth: "38ch",
              }}
            >
              Scan the batch ID off a delivery and the certified panel opens.
              The same numbers a brand-conscious grower can show their own
              customers.
            </p>
          </motion.div>

          <motion.div {...reveal(0.1)} className="md:col-span-7">
            <div className="nm-rule-grid grid grid-cols-2 sm:grid-cols-3">
              {CANOPY_LAB_PANEL.map((item) => (
                <div key={item} className="px-5 py-7">
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(245,239,230,0.72)",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "12px",
                lineHeight: 1.7,
                color: "rgba(245,239,230,0.26)",
              }}
            >
              Panel contents per certified lab report. Values are per batch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Guarantees ─────────────────────────────────────────── */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-32"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto max-w-[1240px]">
          <motion.p
            {...reveal()}
            style={{
              ...eyebrow,
              color: "var(--gold-muted)",
              marginBottom: "2.5rem",
            }}
          >
            Stated on the dashboard
          </motion.p>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14">
            {CANOPY_GUARANTEES.map((g, i) => (
              <motion.div key={g.name} {...reveal(i * 0.08)}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--gold)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {g.name}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    fontWeight: 300,
                    color: "rgba(245,239,230,0.52)",
                    maxWidth: "34ch",
                  }}
                >
                  {g.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Said plainly rather than implied. The app runs on mock data with
              no authentication yet; overstating that here would be the one
              thing a traceability product cannot afford. */}
          <motion.p
            {...reveal(0.2)}
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--hairline)",
              fontSize: "14px",
              lineHeight: 1.8,
              fontWeight: 300,
              color: "rgba(245,239,230,0.38)",
              maxWidth: "52ch",
            }}
          >
            Canopy is still being built. It arrives alongside the first
            deliveries, consumer side first.
          </motion.p>
        </div>
      </section>
    </>
  );
}

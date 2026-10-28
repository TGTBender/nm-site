"use client";

import { motion } from "framer-motion";

import {
  CANOPY_HOME,
  CANOPY_TRADE,
  CANOPY_GUARANTEES,
  type Feature,
} from "@/content/canopy";
import {
  CanopyCard,
  CanopyStatTile,
  CanopyDeliveryTracker,
  CanopyScreen,
} from "@/components/CanopyUI";

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
 * Sample batch, for showing the interface.
 *
 * These are the app's own development figures, not a certified result. The
 * caption inside the panel says so, deliberately placed inside the frame so
 * it travels with any screenshot of it.
 */
const SAMPLE_BATCH = {
  id: "NM-BC-20260612-A",
  physical: [
    { label: "pH", value: "8.1" },
    { label: "EC", value: "0.17 dS/m" },
    { label: "Organic carbon", value: "61%" },
    { label: "H/C ratio", value: "0.44" },
  ],
  nutrients: [
    { label: "Nitrogen (N)", value: "0.8%" },
    { label: "Phosphorus (P)", value: "0.3%" },
    { label: "Potassium (K)", value: "1.9%" },
    { label: "Calcium (Ca)", value: "2.4%" },
    { label: "Magnesium (Mg)", value: "0.6%" },
  ],
};

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

      {/* ── Traceability, shown ────────────────────────────────────
          The app is a light interface. Dropping it onto the dark page as a
          lifted panel shows the real product and gives the section its
          contrast, rather than describing the interface in prose. */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-36"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto max-w-[1240px]">
          <motion.div {...reveal()} className="mb-14 max-w-[46ch]">
            <p style={{ ...eyebrow, color: "var(--gold)", marginBottom: "1.5rem" }}>
              Proof, not promises
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
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
              }}
            >
              Scan the batch ID off a delivery and the certified panel opens.
              The same numbers a brand-conscious grower can show their own
              customers.
            </p>
          </motion.div>

          <motion.div {...reveal(0.1)}>
            <CanopyScreen>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--gold)",
                  marginBottom: "0.35rem",
                }}
              >
                Traceability
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--canopy-ink)",
                  marginBottom: "1.5rem",
                }}
              >
                Batch lookup
              </h3>

              <CanopyCard title={`Batch ${SAMPLE_BATCH.id}`}>
                <h5
                  className="mb-3"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--canopy-ink)",
                  }}
                >
                  Physical &amp; stability
                </h5>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                  {SAMPLE_BATCH.physical.map((s) => (
                    <CanopyStatTile key={s.label} {...s} />
                  ))}
                </div>

                <h5
                  className="mb-3 mt-6"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--canopy-ink)",
                  }}
                >
                  Nutrient profile
                </h5>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
                  {SAMPLE_BATCH.nutrients.map((s) => (
                    <CanopyStatTile key={s.label} {...s} />
                  ))}
                </div>
              </CanopyCard>

              {/* Inside the frame on purpose, so it survives a screenshot. */}
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "11.5px",
                  lineHeight: 1.6,
                  color: "var(--canopy-muted)",
                }}
              >
                Interface preview. Figures shown are sample values from the app
                in development, not a certified result.
              </p>
            </CanopyScreen>
          </motion.div>
        </div>
      </section>

      {/* ── Delivery, shown ────────────────────────────────────── */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-32"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-16">
          <motion.div {...reveal()} className="md:col-span-5">
            <p
              style={{
                ...eyebrow,
                color: "var(--gold-muted)",
                marginBottom: "1.5rem",
              }}
            >
              Three words, not status codes
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--creme)",
                marginBottom: "1.25rem",
              }}
            >
              Where it is, in plain language.
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                fontWeight: 300,
                color: "rgba(245,239,230,0.45)",
                maxWidth: "36ch",
              }}
            >
              The same three words you would use describing it yourself. Built
              to sync from dispatch once that integration exists.
            </p>
          </motion.div>

          <motion.div {...reveal(0.1)} className="md:col-span-7">
            <CanopyScreen>
              <CanopyCard title="Next delivery">
                <div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-3">
                  <CanopyStatTile label="Window" value="8–12" caption="Morning" />
                  <CanopyStatTile label="Units" value="2" caption="Supersacks" />
                  <CanopyStatTile label="Status" value="Confirmed" />
                </div>
                <CanopyDeliveryTracker stage="in_route" />
              </CanopyCard>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "11.5px",
                  lineHeight: 1.6,
                  color: "var(--canopy-muted)",
                }}
              >
                Interface preview. Sample account.
              </p>
            </CanopyScreen>
          </motion.div>
        </div>
      </section>

      {/* ── Two sides ──────────────────────────────────────────── */}
      <section
        className="px-6 py-28 sm:px-10 sm:py-32"
        style={{ backgroundColor: "var(--ink-deep)" }}
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

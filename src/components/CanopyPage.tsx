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
import { EASE, reveal } from "@/lib/motion";

/* Eyebrows run small, so they take the muted gold rather than the brand
   gold: at this size the brand value measured 4.7:1 on the deep ground,
   which clears the AA floor and still squints on a phone. */
const eyebrow = {
  fontSize: "var(--text-micro)",
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
    { label: "pH", value: "8.4" },
    { label: "EC", value: "0.17 dS/m" },
    { label: "Organic carbon", value: "61%" },
    { label: "H/C ratio", value: "0.50" },
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
              color: "var(--on-dark-muted)",
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
      {/* Canopy was the last page still painting its own flat grounds
          while the rest of the site ran on the world, which is most of
          why it felt like a different site. The sections below declare a
          ground and let the engine draw the field and the transitions;
          the padding is set to keep content clear of the 360px zone.

          The run ends on black because the footer is black — a different
          ground here would put a color transition inside 157px of
          footer and bleed it through the underglow. */}
      <section
        className="sec flex min-h-[86vh] items-center px-6 pb-48 pt-40 sm:px-10"
        data-bg="black"
      >
        <div className="mx-auto w-full max-w-[1240px]">
          {/* The invitation, as it is printed: 285 x 108 mm, deep emerald,
              gold foil frame. The aspect is held at wide screens and let
              go on phones, where 2.6:1 would leave the type too small to
              read for the sake of a shape nobody can check.

              WHAT IT DOES NOT SAY. The card's copy rule is Canopy facts
              only — no tier prices, and no Longevity Project. It also
              says nothing about how the invitation is redeemed, because
              code-versus-QR is still an open decision; promising a
              mechanism here would commit the box to one. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="nm-invitation mx-auto w-full max-w-[52rem]"
          >
            <div className="nm-invitation-inner px-7 py-14 text-center sm:px-16 sm:py-20">
              <p
                style={{
                  ...eyebrow,
                  color: "var(--gold-muted)",
                  marginBottom: "2.5rem",
                }}
              >
                Nature&apos;s Mastermind
              </p>

              <div className="flex items-center justify-center gap-5">
                <span className="nm-invitation-rule" aria-hidden />
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--creme)",
                  }}
                >
                  Canopy
                </h1>
                <span className="nm-invitation-rule" aria-hidden />
              </div>

              <p
                className="mx-auto"
                style={{
                  marginTop: "2.25rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.0625rem, 1.9vw, 1.375rem)",
                  lineHeight: 1.6,
                  color: "var(--creme)",
                  maxWidth: "34ch",
                }}
              >
                You are invited to keep the record of everything you grow.
              </p>

              <p
                className="mx-auto"
                style={{
                  marginTop: "1.5rem",
                  fontSize: "0.9375rem",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: "var(--on-dark)",
                  maxWidth: "40ch",
                }}
              >
                Every Viridian box connects to Canopy. This is what is
                behind it.
              </p>

              <p
                style={{
                  ...eyebrow,
                  marginTop: "3rem",
                  color: "var(--gold-muted)",
                }}
              >
                In build
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mx-auto mt-16 text-center"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              fontWeight: 300,
              color: "var(--on-dark)",
              maxWidth: "52ch",
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
      <section className="sec px-6 py-56 sm:px-10" data-bg="deep">
        <div className="mx-auto max-w-[1240px]">
          <motion.div {...reveal()} className="mb-14 max-w-[46ch]">
            <p style={{ ...eyebrow, color: "var(--gold-muted)", marginBottom: "1.5rem" }}>
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
                color: "var(--on-dark-muted)",
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
                  // Inside the app panel, so the ground here is Canopy's
                  // near-white surface, not the section's. The brand gold
                  // is tuned for dark and measures 2.6:1 on it.
                  color: "var(--gold-on-light)",
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
                Interface preview. Sample values within the range of
                producer-supplied laboratory data; not a certified result.
              </p>
            </CanopyScreen>
          </motion.div>
        </div>
      </section>

      {/* ── Delivery, shown ────────────────────────────────────── */}
      <section className="sec px-6 py-56 sm:px-10" data-bg="black">
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
                color: "var(--on-dark-muted)",
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
      <section className="sec px-6 py-56 sm:px-10" data-bg="green">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-14">
          <div>
            <motion.p
              {...reveal()}
              style={{ ...eyebrow, color: "var(--gold-muted)", marginBottom: "1.5rem" }}
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
      <section className="sec px-6 py-56 sm:px-10" data-bg="black">
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
                    color: "var(--on-dark)",
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
              color: "var(--on-dark-muted)",
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

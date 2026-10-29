"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  DISCLOSURE,
  LONGEVITY_CARDS,
  LONGEVITY_TITLE_IMAGE,
  type Card,
} from "@/content/longevity";
import { EASE } from "@/lib/motion";

/**
 * A trailer, not a page.
 *
 * Each card holds the screen on its own: one line, a lot of black, a slow
 * reveal. The restraint is the point — the project is early, and a teaser
 * that withholds reads as deliberate where a thin overview would read as
 * unfinished.
 *
 * The cards alternate scene and silence on purpose. Two of the three carry
 * a full-bleed image; the middle one is black. Three scenes in a row would
 * be a gallery, and a gallery is an overview — the thing this page is not.
 * The cut to black is what makes the next scene land.
 *
 * Nothing here is a commitment, and the imagery is a design study rather
 * than a record of anything built. See content/longevity.ts for what the
 * page deliberately does not say, and for the disclosure that must stay.
 */

/** A full-bleed scene, shared with the landing page's lane panels: the
 *  image is the ground, and .nm-scrim darkens the side the copy sits on so
 *  type never has to compete with the picture. */
function Scene({
  image,
  priority = false,
}: {
  image: NonNullable<Card["image"]>;
  priority?: boolean;
}) {
  return (
    <div className="nm-scene">
      <Image
        src={image.desktop}
        alt={image.alt}
        fill
        sizes="100vw"
        priority={priority}
        className="hidden object-cover md:block"
      />
      <Image
        src={image.mobile}
        alt={image.alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover md:hidden"
      />
      <div className="nm-scrim" aria-hidden />
    </div>
  );
}

export function LongevityPage() {
  return (
    <>
      {/* ── Title card ─────────────────────────────────────────────
          Dusk at the gate. The render's sky is clean and unbroken on the
          left, which is why the crop keeps it: the headline sits there. */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 py-28 sm:px-10">
        <Scene image={LONGEVITY_TITLE_IMAGE} priority />

        <div className="relative mx-auto w-full max-w-[1240px]">
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
              color: "var(--on-dark)",
              maxWidth: "40ch",
            }}
          >
            Something we are building alongside the business. Not ready to
            explain yet — close enough to show you the shape of it.
          </motion.p>
        </div>
      </section>

      {/* ── Cards ──────────────────────────────────────────────────
          A card with a scene runs taller and full-bleed; a card without
          keeps its flat ground and its own breathing room. */}
      {LONGEVITY_CARDS.map((card, i) => (
        <section
          key={card.line}
          className={
            card.image
              ? "relative flex min-h-[88vh] items-center overflow-hidden px-6 py-28 sm:px-10"
              : "flex min-h-[64vh] items-center px-6 sm:px-10"
          }
          style={
            card.image
              ? undefined
              : { backgroundColor: i % 2 === 0 ? "var(--ink)" : "var(--ink-deep)" }
          }
        >
          {card.image && <Scene image={card.image} />}

          <div className="relative mx-auto w-full max-w-[1240px]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontWeight: 700,
                // Was var(--gold) at 0.45 opacity, which on the brighter
                // scenes left the card number barely present. The muted
                // gold is dimmer than the brand gold by design, so it
                // still sits behind the headline without disappearing.
                color: "var(--gold-muted)",
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
              className={card.image ? "max-w-[16ch] md:w-[46%]" : "max-w-[20ch]"}
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
                  // Brighter over a scene than over flat ground: even
                  // through the scrim, a photograph is a noisier ground
                  // than flat ink and needs more separation to read at
                  // the same apparent weight.
                  color: card.image
                    ? "var(--on-dark)"
                    : "var(--on-dark-muted)",
                  maxWidth: "42ch",
                }}
              >
                {card.note}
              </motion.p>
            )}
          </div>
        </section>
      ))}

      {/* ── Closing card ───────────────────────────────────────────
          Cut to black. The disclosure runs here because this is the one
          card everyone who finishes the page reaches. */}
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            style={{
              marginTop: "3rem",
              fontSize: "12px",
              lineHeight: 1.7,
              fontWeight: 300,
              color: "var(--on-dark-muted)",
              maxWidth: "46ch",
            }}
          >
            {DISCLOSURE}
          </motion.p>
        </div>
      </section>
    </>
  );
}

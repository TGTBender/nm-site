"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { LANES, type Lane } from "@/content/lanes";
import { EASE, reveal } from "@/lib/motion";

/**
 * A lane panel.
 *
 * Each lane gets a panel rather than a row in a list. The image runs off the
 * page edge and dissolves into the contour field on its inner edge: a
 * rectangle with margin on all four sides reads as a window cut into the
 * page, which is exactly what this is not meant to be.
 *
 * Sides alternate so the eye crosses the page as it descends. A lane with no
 * image yet gives its copy the full measure instead, so the panel reads as
 * complete rather than half empty.
 *
 * Every panel sits inside one themed section, so none of them introduces a
 * colour transition — the field runs straight through the whole run.
 */
function LanePanel({ lane, index }: { lane: Lane; index: number }) {
  const mediaRight = index % 2 === 0;
  const hasMedia = Boolean(lane.image);

  const body = (
    <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-10">
      <div
        className={
          hasMedia
            ? `md:w-[44%] ${mediaRight ? "" : "md:ml-auto"}`
            : "md:w-[72%]"
        }
      >
        <motion.p
          {...reveal()}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--gold)",
            opacity: 0.45,
            marginBottom: "1.25rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.p>

        <motion.h3
          {...reveal(0.05)}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            color: "var(--creme)",
          }}
        >
          {lane.name}
        </motion.h3>

        {lane.status && (
          <motion.p
            {...reveal(0.09)}
            style={{
              marginTop: "0.9rem",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--gold-muted)",
            }}
          >
            {lane.status}
          </motion.p>
        )}

        <motion.p
          {...reveal(0.13)}
          style={{
            marginTop: "1.5rem",
            fontSize: "1rem",
            lineHeight: 1.8,
            fontWeight: 300,
            color: "rgba(245,239,230,0.54)",
            maxWidth: "44ch",
          }}
        >
          {lane.description}
        </motion.p>

        {lane.href && (
          <motion.p {...reveal(0.18)} style={{ marginTop: "2.25rem" }}>
            <span
              className="nm-lane-cta inline-flex items-center gap-2"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "var(--gold)",
              }}
            >
              {lane.cta ?? "Open " + lane.name}
              <ArrowRight aria-hidden style={{ width: 15, height: 15 }} />
            </span>
          </motion.p>
        )}
      </div>
    </div>
  );

  const panel = (
    <div className="relative py-24 md:py-32">
      {lane.image && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className={[
            "nm-lane-media",
            mediaRight ? "nm-lane-media-right" : "nm-lane-media-left",
            "relative mb-10 h-[58vw] max-h-[340px] w-full",
            // off the page edge on wide screens, so it belongs to the page
            // rather than sitting on top of it
            "md:absolute md:inset-y-0 md:mb-0 md:h-auto md:max-h-none md:w-[52%]",
            mediaRight ? "md:right-0" : "md:left-0",
          ].join(" ")}
        >
          <Image
            src={lane.image.desktop}
            alt={lane.image.alt}
            fill
            sizes="(min-width: 768px) 52vw, 100vw"
            className="hidden object-cover md:block"
            style={{ objectPosition: "42% 50%" }}
          />
          <Image
            src={lane.image.mobile}
            alt={lane.image.alt}
            fill
            sizes="100vw"
            className="object-cover md:hidden"
            style={{ objectPosition: "center 44%" }}
          />
        </motion.div>
      )}
      {body}
    </div>
  );

  return lane.href ? (
    <Link
      href={lane.href}
      className="nm-lane"
      style={{ display: "block", textDecoration: "none" }}
    >
      {panel}
    </Link>
  ) : (
    panel
  );
}

export function LandingPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────
          Type only, on the deep ground. The lanes differ too much for one
          photograph to stand for all of them, and each lane's own panel
          carries its image. */}
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

      {/* ── The lanes ──────────────────────────────────────────────
          One themed section holding every panel, so the colour field runs
          through the whole run without a transition between lanes. */}
      <section id="lanes" className="sec px-0 py-40 sm:py-48" data-bg="deep">
        <div className="mx-auto mb-8 w-full max-w-[1240px] px-6 sm:px-10">
          <motion.p
            {...reveal()}
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--gold-muted)",
            }}
          >
            The lanes
          </motion.p>
        </div>

        {LANES.map((lane, i) => (
          <LanePanel key={lane.name} lane={lane} index={i} />
        ))}
      </section>
    </>
  );
}

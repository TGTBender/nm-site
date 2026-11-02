"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Beef,
  Building2,
  Droplets,
  Fish,
  FlaskConical,
  Gauge,
  Layers,
  LineChart,
  Recycle,
  Sprout,
  Truck,
  Wind,
  type LucideIcon,
} from "lucide-react";

import { LANES } from "@/content/lanes";

/* A hidden lane keeps its copy in content/lanes.ts but does not appear
   on the site. The headline counts this filtered list, so taking a lane
   down cannot leave the count claiming one more than the grid shows. */
const VISIBLE_LANES = LANES.filter((l) => !l.hidden);
import {
  CONTACT,
  EVIDENCE_LABELS,
  EVIDENCE_ROWS,
  EVIDENCE_STATS,
  MARKET_LABEL,
  MARKETS,
  MODEL_STEPS,
  OPERATING_STATUS,
  PENDING_NOTE,
  ATTRIBUTION_NOTE,
  SOLID_STATES,
  STATE_LABEL,
  WAYS_IN,
  type State,
} from "@/content/home";
import { EASE, reveal } from "@/lib/motion";

/**
 * The landing page.
 *
 * Built to the founder's layout: an evidence-forward B2B page that leads
 * with what the business can document rather than with what it sells. The
 * grounds run black → deep → cream → black → green → cream → black, which
 * is the first thing on this site to use the world's full palette; the
 * engine draws every transition, so each section only declares its ground
 * and keeps enough padding to stay out of the zone (280px beside cream,
 * 180px elsewhere — see the rule in globals.css).
 *
 * WHERE THE FIGURES ARE. The evidence section renders from content/home.ts
 * and every number there is currently `null`, so it shows a pending state
 * instead. That is deliberate and it is the whole point of the page: the
 * headline promises a source for every claim, and the one thing that
 * cannot appear under it is a number nobody can source yet.
 */

const MARKET_ICONS: LucideIcon[] = [
  Sprout,
  Droplets,
  Wind,
  Beef,
  Building2,
  Recycle,
  Layers,
  Fish,
  LineChart,
];

const MODEL_ICONS: LucideIcon[] = [FlaskConical, Truck, Layers, Gauge];

/* The markets headline counts the list rather than restating it. An
   earlier pass hard-coded "Nine markets. One is live." and the moment a
   market changed state the headline was a false claim sitting directly
   above the grid that contradicted it. */
const COUNT_WORD: Record<number, string> = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
};

const LIVE_COUNT = MARKETS.filter((m) => m.state === "active").length;
const LIVE_HEADLINE =
  LIVE_COUNT === 1
    ? "One is live."
    : COUNT_WORD[LIVE_COUNT]
      ? COUNT_WORD[LIVE_COUNT] + " are live."
      : LIVE_COUNT + " are live.";

const eyebrow = {
  fontSize: "var(--text-micro)",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 600,
} as const;

const display = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.04,
} as const;

/** Section label: "01 / Evidence". */
function Label({ num, text, tone }: { num: string; text: string; tone?: string }) {
  return (
    <motion.p
      {...reveal()}
      style={{ ...eyebrow, color: tone ?? "var(--gold-muted)", marginBottom: "2rem" }}
    >
      {num} <span style={{ opacity: 0.7 }}>/</span> {text}
    </motion.p>
  );
}

/** Status pill. `active` is the only one that gets the solid gold. */
function Badge({ state }: { state: State }) {
  const solid = SOLID_STATES.has(state);
  return (
    <span
      style={{
        ...eyebrow,
        fontSize: "var(--text-micro)",
        whiteSpace: "nowrap",
        padding: "0.3rem 0.55rem",
        borderRadius: "2px",
        color: solid ? "var(--nm-black)" : "var(--gold-muted)",
        backgroundColor: solid ? "var(--gold)" : "transparent",
        border: solid ? "1px solid var(--gold)" : "1px solid rgba(212,168,90,0.34)",
      }}
    >
      {STATE_LABEL[state]}
    </span>
  );
}

export function LandingPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="sec px-6 pb-44 pt-36 sm:px-10"
        data-bg="black"
        id="top"
      >
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ ...eyebrow, color: "var(--gold)", marginBottom: "2rem" }}
            >
              Nature&apos;s Mastermind
              {/* Was this same gold at 0.45 opacity, which measured
                  about 2.6:1 on the black ground. The muted gold at full
                  strength reads as secondary without going under AA. */}
              <span style={{ color: "var(--gold-muted)" }}>
                {" "}
                · A subsidiary of The Greenest Thumb
              </span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
              className="max-w-[11ch]"
              style={{
                ...display,
                fontSize: "clamp(2.75rem, 6.6vw, 5.75rem)",
                color: "var(--creme)",
              }}
            >
              Biochar, built to a{" "}
              <span style={{ color: "var(--gold)" }}>standard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
              style={{
                marginTop: "2.25rem",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                fontWeight: 300,
                color: "var(--on-dark)",
                maxWidth: "48ch",
              }}
            >
              We source, document and deliver biochar and the inputs that go
              with it — and we are building the infrastructure to supply it at
              scale, across agriculture and industry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {/* .nm-cta and .nm-quiet carry only hover/focus behavior —
                  appearance is the caller's, as everywhere else on the
                  site. Solid gold leads; the outline follows. */}
              <Link
                href="/bge"
                className="nm-cta inline-flex items-center gap-2"
                style={{
                  ...eyebrow,
                  backgroundColor: "var(--gold)",
                  color: "var(--nm-black)",
                  padding: "0.95rem 1.5rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Join the early list
                <ArrowRight aria-hidden style={{ width: 14, height: 14 }} />
              </Link>
              <Link
                href="#evidence"
                className="nm-quiet inline-flex items-center"
                style={{
                  ...eyebrow,
                  color: "var(--on-dark)",
                  border: "1px solid rgba(245,239,230,0.2)",
                  padding: "0.95rem 1.5rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Review the evidence
              </Link>
            </motion.div>
          </div>

          {/* Operating status. The page's first honest act: it says what is
              running and what is not, before it asks for anything. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div
              style={{
                border: "1px solid rgba(212,168,90,0.22)",
                backgroundColor: "rgba(6,56,43,0.46)",
                backdropFilter: "blur(2px)",
                borderRadius: "3px",
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  ...eyebrow,
                  color: "var(--gold)",
                  paddingBottom: "1.1rem",
                  marginBottom: "0.4rem",
                  borderBottom: "1px solid rgba(212,168,90,0.18)",
                }}
              >
                Operating status
              </p>

              <ul>
                {OPERATING_STATUS.map((row) => (
                  <li
                    key={row.name}
                    className="flex items-center justify-between gap-4"
                    style={{
                      padding: "0.85rem 0",
                      borderBottom: "1px solid rgba(245,239,230,0.07)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        color: "var(--on-dark)",
                      }}
                    >
                      {row.name}
                    </span>
                    <Badge state={row.state} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Market strip: the breadth claim, stated as icons rather than as a
            sentence promising nine working product lines. */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mx-auto mt-24 flex w-full max-w-[1240px] flex-wrap gap-x-10 gap-y-6"
        >
          {MARKETS.map((m, i) => {
            const Icon = MARKET_ICONS[i];
            return (
              <li key={m.name} className="flex items-center gap-2">
                <Icon
                  aria-hidden
                  style={{
                    width: 14,
                    height: 14,
                    color:
                      m.state === "active" ? "var(--gold)" : "var(--on-dark-muted)",
                  }}
                />
                <span
                  style={{
                    ...eyebrow,
                    fontSize: "var(--text-micro)",
                    color:
                      m.state === "active"
                        ? "var(--gold-muted)"
                        : "var(--on-dark-muted)",
                  }}
                >
                  {m.name}
                </span>
              </li>
            );
          })}
        </motion.ul>
      </section>

      {/* ── 01 Evidence ────────────────────────────────────────── */}
      <section
        className="sec px-6 py-56 sm:px-10"
        data-bg="deep"
        id="evidence"
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <Label num="01" text="Evidence" />

          <motion.h2
            {...reveal(0.05)}
            className="max-w-[16ch]"
            style={{
              ...display,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              color: "var(--creme)",
            }}
          >
            Every claim has a source.{" "}
            <span style={{ color: "var(--gold)" }}>Here is the data.</span>
          </motion.h2>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {EVIDENCE_STATS.map((s, i) => (
              <motion.div key={s.caption} {...reveal(0.08 + i * 0.06)}>
                <p
                  style={{
                    ...display,
                    fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
                    color: s.value ? "var(--gold)" : "rgba(212,168,90,0.3)",
                  }}
                >
                  {s.value ?? "—"}
                </p>
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    color: "var(--on-dark-muted)",
                    maxWidth: "26ch",
                  }}
                >
                  {s.caption}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal(0.1)} className="mt-20 overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Parameter", "Result", "Reference"].map((h) => (
                    <th
                      key={h}
                      style={{
                        ...eyebrow,
                        fontSize: "var(--text-micro)",
                        textAlign: "left",
                        color: "var(--gold-muted)",
                        padding: "0 1rem 0.9rem 0",
                        borderBottom: "1px solid rgba(212,168,90,0.22)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_ROWS.map((r) => (
                  <tr key={r.parameter}>
                    {[r.parameter, r.result, r.reference].map((cell, c) => (
                      <td
                        key={c}
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 300,
                          padding: "1.05rem 1rem 1.05rem 0",
                          borderBottom: "1px solid rgba(245,239,230,0.08)",
                          color:
                            cell === null
                              ? "var(--on-dark-faint)"
                              : c === 0
                                ? "var(--on-dark-strong)"
                                : "var(--on-dark)",
                        }}
                      >
                        {cell ?? "Pending"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            {...reveal(0.12)}
            style={{
              marginTop: "2rem",
              fontSize: "12px",
              lineHeight: 1.7,
              fontWeight: 300,
              // Legal attribution, and the smallest text anyone actually has to
              // read on the page. It takes the body rung, not a muted one.
              color: "var(--on-dark)",
              maxWidth: "58ch",
            }}
          >
            {/* Scope travels with the figures. These results are bagasse
                only, and a reader who takes them for the whole catalogue
                has been misled by omission. */}
            {EVIDENCE_ROWS.some((r) => r.result === null)
              ? PENDING_NOTE
              : ATTRIBUTION_NOTE}
          </motion.p>
        </div>
      </section>

      {/* ── 02 Operating model ─────────────────────────────────── */}
      <section className="sec px-6 py-72 sm:px-10" data-bg="cream" id="model">
        <div className="mx-auto w-full max-w-[1240px]">
          <Label num="02" text="Operating model" tone="var(--gold-on-light)" />

          <motion.h2
            {...reveal(0.05)}
            className="max-w-[18ch]"
            style={{
              ...display,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              color: "var(--nm-black)",
            }}
          >
            Source. Ship. Show.{" "}
            <span style={{ color: "var(--gold-on-light)" }}>Measure.</span>
          </motion.h2>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {MODEL_STEPS.map((step, i) => {
              const Icon = MODEL_ICONS[i];
              return (
                <motion.div key={step.title} {...reveal(0.06 + i * 0.05)}>
                  <p style={{ ...eyebrow, fontSize: "var(--text-micro)", color: "var(--gold-on-light)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <Icon
                    aria-hidden
                    style={{
                      width: 22,
                      height: 22,
                      margin: "1.5rem 0 1.25rem",
                      color: "var(--gold-on-light)",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--nm-black)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "0.85rem",
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      fontWeight: 300,
                      color: "var(--ink-soft)",
                    }}
                  >
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            {...reveal(0.1)}
            className="mt-24 border-t pt-14"
            style={{ borderColor: "var(--hairline)" }}
          >
            <h3
              style={{
                ...display,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--nm-black)",
              }}
            >
              Each delivery is documented.
            </h3>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "1rem",
                lineHeight: 1.8,
                fontWeight: 300,
                color: "var(--ink-soft)",
                maxWidth: "52ch",
              }}
            >
              A record that what you were sent is what was specified — the
              batch it came from, and what is known about it. It travels with
              the material rather than waiting to be asked for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 03 Markets ─────────────────────────────────────────── */}
      <section
        className="sec px-6 pb-56 pt-72 sm:px-10"
        data-bg="black"
        id="markets"
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <Label num="03" text="Markets" />

          <motion.h2
            {...reveal(0.05)}
            className="max-w-[16ch]"
            style={{
              ...display,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              color: "var(--creme)",
            }}
          >
            {COUNT_WORD[MARKETS.length] ?? MARKETS.length} markets.{" "}
            <span style={{ color: "var(--gold)" }}>{LIVE_HEADLINE}</span>
          </motion.h2>

          <motion.p
            {...reveal(0.08)}
            style={{
              marginTop: "1.5rem",
              fontSize: "1rem",
              lineHeight: 1.8,
              fontWeight: 300,
              color: "var(--on-dark)",
              maxWidth: "46ch",
            }}
          >
            We publish what we can prove. Everything else, we label as what it
            is — under evaluation.
          </motion.p>

          <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {MARKETS.map((m, i) => {
              const Icon = MARKET_ICONS[i];
              return (
                <motion.div
                  key={m.name}
                  {...reveal(0.04 + (i % 3) * 0.05)}
                  style={{
                    border: "1px solid var(--hairline)",
                    padding: "1.75rem",
                    backgroundColor:
                      m.state === "active"
                        ? "rgba(201,145,42,0.05)"
                        : "transparent",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon
                      aria-hidden
                      style={{
                        width: 20,
                        height: 20,
                        color:
                          m.state === "active"
                            ? "var(--gold)"
                            : "var(--on-dark-muted)",
                      }}
                    />
                    {m.state === "active" ? (
                      <Badge state="active" />
                    ) : (
                      // R&D and evaluation both read as "not selling this
                      // yet", so neither takes the solid badge — but R&D is
                      // work in progress rather than an open question, and
                      // the outline says which.
                      <span
                        style={{
                          ...eyebrow,
                          fontSize: "var(--text-micro)",
                          whiteSpace: "nowrap",
                          color: "var(--on-dark-muted)",
                          padding:
                            m.state === "evaluation" ? 0 : "0.3rem 0.55rem",
                          borderRadius: "2px",
                          border:
                            m.state === "evaluation"
                              ? "none"
                              : "1px solid rgba(245,239,230,0.22)",
                        }}
                      >
                        {MARKET_LABEL[m.state]}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      marginTop: "2.5rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color:
                        m.state === "active"
                          ? "var(--creme)"
                          : "var(--on-dark-strong)",
                    }}
                  >
                    {m.name}
                  </h3>
                  <p
                    style={{
                      marginTop: "0.6rem",
                      fontSize: "0.8125rem",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      color: "var(--on-dark-muted)",
                    }}
                  >
                    {m.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 04 Platform ────────────────────────────────────────── */}
      <section className="sec px-6 py-56 sm:px-10" data-bg="green" id="platform">
        <div className="mx-auto w-full max-w-[1240px]">
          <Label num="04" text="Platform" />

          <motion.h2
            {...reveal(0.05)}
            className="max-w-[16ch]"
            style={{
              ...display,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              color: "var(--creme)",
            }}
          >
            {COUNT_WORD[VISIBLE_LANES.length] ?? VISIBLE_LANES.length} lanes.{" "}
            <span style={{ color: "var(--gold)" }}>One standard.</span>
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VISIBLE_LANES.map((lane, i) => {
              const body = (
                <>
                  {/* The slot renders even when empty, so every heading in
                      the row starts on the same line. A lane without a
                      status otherwise pulls its title up and the grid
                      reads as four unrelated cards. */}
                  <p
                    aria-hidden={!lane.status}
                    style={{ ...eyebrow, fontSize: "var(--text-micro)", color: "var(--gold-muted)" }}
                  >
                    {lane.status ?? " "}
                  </p>
                  <h3
                    style={{
                      marginTop: "1.75rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.375rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "var(--creme)",
                    }}
                  >
                    {lane.name}
                  </h3>
                  <p
                    style={{
                      marginTop: "0.9rem",
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      fontWeight: 300,
                      color: "var(--on-dark)",
                    }}
                  >
                    {lane.description}
                  </p>
                  {lane.href && (
                    <span
                      className="nm-lane-cta mt-7 inline-flex items-center gap-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--gold)",
                      }}
                    >
                      {lane.cta ?? "Open " + lane.name}
                      <ArrowRight aria-hidden style={{ width: 14, height: 14 }} />
                    </span>
                  )}
                </>
              );

              const card = (
                <div
                  className="flex h-full flex-col"
                  style={{
                    border: lane.primary
                      ? "1px solid rgba(201,145,42,0.45)"
                      : "1px solid var(--hairline)",
                    backgroundColor: lane.primary
                      ? "rgba(201,145,42,0.07)"
                      : "rgba(11,13,12,0.22)",
                    padding: "1.75rem",
                    borderRadius: "3px",
                  }}
                >
                  {body}
                </div>
              );

              return (
                <motion.div key={lane.name} {...reveal(0.05 + i * 0.05)}>
                  {lane.href ? (
                    <Link
                      href={lane.href}
                      className="nm-lane block h-full"
                      style={{ textDecoration: "none" }}
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05 Standard of evidence ────────────────────────────── */}
      <section className="sec px-6 py-72 sm:px-10" data-bg="cream" id="standard">
        <div className="mx-auto w-full max-w-[1240px]">
          <Label num="05" text="Standard of evidence" tone="var(--gold-on-light)" />

          <motion.h2
            {...reveal(0.05)}
            className="max-w-[16ch]"
            style={{
              ...display,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              color: "var(--nm-black)",
            }}
          >
            How we label{" "}
            <span style={{ color: "var(--gold-on-light)" }}>what we know.</span>
          </motion.h2>

          <motion.p
            {...reveal(0.08)}
            style={{
              marginTop: "1.5rem",
              fontSize: "1rem",
              lineHeight: 1.8,
              fontWeight: 300,
              color: "var(--ink-soft)",
              maxWidth: "48ch",
            }}
          >
            Every claim in our research, and on this site, is one of three
            things.
          </motion.p>

          <div className="mt-16 grid grid-cols-1 gap-px md:grid-cols-3">
            {EVIDENCE_LABELS.map((e, i) => (
              <motion.div
                key={e.tag}
                {...reveal(0.06 + i * 0.06)}
                style={{
                  border: "1px solid var(--hairline)",
                  padding: "1.75rem",
                }}
              >
                <span
                  style={{
                    ...eyebrow,
                    fontSize: "var(--text-micro)",
                    color: "var(--gold-on-light)",
                    border: "1px solid rgba(122,92,18,0.3)",
                    padding: "0.3rem 0.55rem",
                    borderRadius: "2px",
                  }}
                >
                  {e.tag}
                </span>
                <h3
                  style={{
                    marginTop: "2.25rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--nm-black)",
                  }}
                >
                  {e.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.85rem",
                    fontSize: "0.9375rem",
                    lineHeight: 1.75,
                    fontWeight: 300,
                    color: "var(--ink-soft)",
                  }}
                >
                  {e.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Ways in ───────────────────────────────────── */}
      <section className="sec px-6 pb-56 pt-72 sm:px-10" data-bg="black" id="mission">
        <div className="mx-auto w-full max-w-[1240px]">
          <Label num="06" text="Ways in" />

          <motion.h2
            {...reveal(0.05)}
            style={{
              ...display,
              fontSize: "clamp(2rem, 4.8vw, 3.75rem)",
              color: "var(--creme)",
            }}
          >
            {COUNT_WORD[WAYS_IN.length] ?? WAYS_IN.length} ways{" "}
            <span style={{ color: "var(--gold)" }}>in.</span>
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {WAYS_IN.map((w, i) => (
              <motion.div key={w.title} {...reveal(0.06 + i * 0.06)}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    color: "var(--creme)",
                  }}
                >
                  {w.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.6rem",
                    fontSize: "0.8125rem",
                    fontWeight: 300,
                    color: "var(--gold-muted)",
                  }}
                >
                  {w.text}
                </p>

                <ul
                  className="mt-8 border-t"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  {w.points.map((p) => (
                    <li
                      key={p}
                      style={{
                        padding: "1rem 0",
                        borderBottom: "1px solid var(--hairline)",
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        fontWeight: 300,
                        color: "var(--on-dark)",
                      }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                {/* A mailto is not an in-app route, so it gets a plain
                    anchor rather than next/link. */}
                {w.cta.href.startsWith("/") ? (
                  <Link
                    href={w.cta.href}
                    className="nm-link mt-8 inline-flex items-center gap-2"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--gold)",
                    }}
                  >
                    {w.cta.label}
                    <ArrowRight aria-hidden style={{ width: 14, height: 14 }} />
                  </Link>
                ) : (
                  <a
                    href={w.cta.href}
                    className="nm-link mt-8 inline-flex items-center gap-2"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--gold)",
                    }}
                  >
                    {w.cta.label}
                    <ArrowRight aria-hidden style={{ width: 14, height: 14 }} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing band ───────────────────────────────────────────
          Opaque and hard-edged on purpose: it is NOT a .sec, so the world
          neither paints it nor has to resolve a gold→black transition in
          the 157px of footer below it. Carries no phone or address —
          those publish only once the founder confirms them. */}
      <section
        className="relative px-6 py-28 sm:px-10"
        style={{ backgroundColor: "var(--nm-gold)", zIndex: 2 }}
      >
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.h2
            {...reveal()}
            className="max-w-[12ch]"
            style={{
              ...display,
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              color: "#1a1405",
            }}
          >
            Request a briefing.
          </motion.h2>

          <motion.div {...reveal(0.1)}>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                fontWeight: 300,
                color: "rgba(26,20,5,0.76)",
                maxWidth: "38ch",
                marginBottom: "1.75rem",
              }}
            >
              Tell us the format, the volume and the season. We will come back
              with what we can supply and what we can document.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/bge"
                className="inline-flex items-center gap-2"
                style={{
                  ...eyebrow,
                  backgroundColor: "#1a1405",
                  color: "var(--nm-gold)",
                  padding: "0.9rem 1.5rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Start here
                <ArrowRight aria-hidden style={{ width: 14, height: 14 }} />
              </Link>

              {/* Real contact details, so the band is an answer and not
                  just another form. Both confirmed for publication. */}
              <div className="flex flex-col gap-1">
                <a
                  href={CONTACT.phoneHref}
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#1a1405",
                    textDecoration: "none",
                  }}
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 300,
                    color: "rgba(26,20,5,0.8)",
                  }}
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

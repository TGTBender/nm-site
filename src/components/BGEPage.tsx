"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { InquiryForm } from "@/components/InquiryForm";
import { bgeSchema } from "@/lib/inquiry-schema";
import { EASE, reveal } from "@/lib/motion";
import { ctaStyle, eyebrowStyle } from "@/lib/form-styles";

/* Facts stated elsewhere on this page, surfaced as a scannable grid.
   Nothing here asserts anything the copy does not already claim. */
const SPECS = [
  { value: "1,000 lb", label: "Supersacks" },
  { value: "48 hours", label: "Quote response" },
  { value: "Every run", label: "Documented" },
];

const STEPS = [
  { num: "01", text: "Tell us about your operation — format, volume, and season." },
  { num: "02", text: "We confirm your delivery lane and build your cadence." },
  {
    num: "03",
    text: "Product arrives on schedule, with documentation on every delivery.",
  },
];

export function BGEPage() {
  return (
    <>

      {/* ── Section 1: Hero ──────────────────────────────────────── */}
      {/* Content sits low-left rather than dead-center. Centered stacks
          are the strongest "template" tell there is; anchoring the type
          to one edge is most of what reads as editorial. */}
      <section
        id="hero"
        className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-20 pt-32 sm:px-10 sm:pb-28"
        style={{ backgroundColor: "var(--ink)" }}
      >
        {/* The load arriving. This replaced an illustrated treeline that
            stood in until there was a real delivery frame to use — the
            whole lane is a promise about delivery, so the hero should be
            one rather than a landscape behind the word. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/bge/load.jpg"
            alt="A flatbed load of Nature's Mastermind bulk bags, strapped to pallets, at a nursery."
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
            style={{ objectPosition: "center 42%" }}
          />
          <Image
            src="/bge/load-mobile.jpg"
            alt="A flatbed load of Nature's Mastermind bulk bags, strapped to pallets, at a nursery."
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
            style={{ objectPosition: "center 45%" }}
          />
        </div>
        {/* Scrim weighted to the lower edge, where the type sits. The upper
            band is left almost clear so the load and the golden-hour sky are
            actually visible; it ramps hard through the lower half to hold
            contrast under the headline. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,20,16,0.10) 0%, rgba(15,20,16,0.16) 30%, rgba(15,20,16,0.44) 56%, rgba(15,20,16,0.80) 79%, rgba(15,20,16,0.93) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1240px]" style={{ zIndex: 2 }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              ...eyebrowStyle,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              marginBottom: "1.75rem",
            }}
          >
            <MapPin
              style={{
                display: "inline",
                width: 11,
                height: 11,
                marginRight: "6px",
                verticalAlign: "middle",
                marginBottom: "1px",
              }}
            />
            Wholesale Supply · Biochar Distribution
          </motion.p>

          {/* The lane is not selling yet. The tag says so beside the
              eyebrow, and the banner below the hero repeats it where
              someone skimming will actually land. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            style={{
              ...eyebrowStyle,
              fontSize: "var(--text-micro)",
              display: "inline-block",
              color: "var(--gold-muted)",
              border: "1px solid rgba(212,168,90,0.4)",
              padding: "0.35rem 0.6rem",
              borderRadius: "2px",
              marginBottom: "1.75rem",
            }}
          >
            Coming soon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.08 }}
            className="max-w-[15ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              color: "var(--creme)",
              letterSpacing: "-0.03em",
              marginBottom: "2rem",
            }}
          >
            A biochar supply lane that actually shows up.
          </motion.h1>

          {/* Sub-copy and CTA share a baseline row on wide screens —
              asymmetry the centered layout could not express. */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
              style={{
                fontSize: "1.0625rem",
                lineHeight: "1.75",
                color: "var(--on-dark)",
                maxWidth: "44ch",
                fontWeight: 300,
              }}
            >
              Reliable biochar delivery for nurseries, landscapers, farms and
              garden centers — on schedule, on spec, with documentation on
              every run.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
              className="shrink-0"
            >
              <a href="#contact" className="nm-cta" style={ctaStyle}>
                Join the early list
              </a>
            </motion.div>
          </div>

          {/* Launch banner, plus the cross-link for anyone who needs
              material now rather than at launch. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.48 }}
            className="mt-14 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            style={{ borderColor: "var(--hairline)" }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                fontWeight: 300,
                color: "var(--on-dark)",
              }}
            >
              Launching soon. Join the early list and we&apos;ll let you know
              the moment supply opens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Why it matters ───────────────────────────── */}
      {/* Editorial two-column: label parked in a narrow rail, prose set
          against it. The rail is sticky on desktop so the section keeps
          announcing itself while the body scrolls. */}
      <section
        id="why"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{
          backgroundColor: "var(--off-white)",
          // Rules on this section sit on a light ground.
          ["--hairline" as string]: "var(--hairline-ink)",
        }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-3">
            <p
              className="md:sticky md:top-28"
              style={{ ...eyebrowStyle, color: "var(--gold)" }}
            >
              Why it matters
            </p>
          </motion.div>

          <div className="md:col-span-9 md:max-w-[46rem]">
            <motion.h2
              {...reveal(0.05)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.6vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "var(--brown)",
                marginBottom: "2.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Biochar is built to last. Stable carbon, documented batch by
              batch.
            </motion.h2>

            <motion.div
              {...reveal(0.12)}
              style={{
                fontSize: "1.0625rem",
                lineHeight: "1.9",
                color: "var(--brown-light)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                maxWidth: "62ch",
              }}
            >
              <p>
                It retains moisture, reduces fertilizer dependency, and builds
                living structure into soil that plants return to season after
                season. For nurseries, farms, landscapers, and garden centers —
                it&apos;s not a trendy amendment. It&apos;s a long-term investment
                in the ground.
              </p>
              <p>
                The problem isn&apos;t demand. It&apos;s access. Consistent,
                reliable, documented biochar has been nearly impossible to source.
                Shipments that don&apos;t show. Specs that
                don&apos;t match. No paperwork for the customers who ask questions.
                We built Nature&apos;s Mastermind to close that gap — for good.
              </p>
            </motion.div>

            {/* Hairline spec grid. Large display figures against small
                grey labels — the ratio is what reads as considered. */}
            <motion.dl
              {...reveal(0.18)}
              className="nm-rule-grid mt-16 grid grid-cols-2 lg:grid-cols-4"
            >
              {SPECS.map((s) => (
                <div key={s.label} className="px-5 py-8 sm:px-6 sm:py-10">
                  <dt className="sr-only">{s.label}</dt>
                  <dd
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      fontWeight: 700,
                      color: "var(--brown)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </dd>
                  <p
                    style={{
                      marginTop: "0.85rem",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "rgba(59,37,16,0.42)",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* ── The material ─────────────────────────────────────────
          A full-bleed band, no copy over it. The lane is named for a
          black glove and this is the frame that earns the name, so it
          is left to carry itself; a headline across it would be the
          caption explaining a joke. */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative h-[62vw] min-h-[320px] md:h-[38vw] md:min-h-[420px]"
        >
          <Image
            src="/bge/scoop.jpg"
            alt="A gloved hand holding a scoop of biochar over a raised bed at sunset."
            fill
            sizes="100vw"
            className="hidden object-cover md:block"
          />
          <Image
            src="/bge/scoop-mobile.jpg"
            alt="A gloved hand holding a scoop of biochar over a raised bed at sunset."
            fill
            sizes="100vw"
            className="object-cover md:hidden"
          />
          {/* Feathered top and bottom only, so the band joins the
              sections either side instead of sitting between them as a
              cut-out rectangle. */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom, var(--ink) 0%, rgba(15,20,16,0) 18%, rgba(15,20,16,0) 82%, var(--ink) 100%)",
            }}
          />
        </motion.div>
      </section>

      {/* ── What is printed on the bag ───────────────────────────
          The documentation claim, shown rather than asserted. The batch
          card and the code on the bag are the mechanism behind "with
          documentation on every run" in the lane copy. */}
      <section
        className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative h-[72vw] min-h-[300px] overflow-hidden md:h-[30vw] md:min-h-[400px]"
            style={{ borderRadius: "3px" }}
          >
            <Image
              src="/bge/bag.jpg"
              alt="A Nature's Mastermind bulk bag on a pallet, with a batch card pocket and a scannable code on its face."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="hidden object-cover md:block"
            />
            <Image
              src="/bge/bag-mobile.jpg"
              alt="A Nature's Mastermind bulk bag on a pallet, with a batch card pocket and a scannable code on its face."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover md:hidden"
            />
          </motion.div>

          <motion.div {...reveal(0.1)} className="max-w-[40ch]">
            <p
              style={{
                ...eyebrowStyle,
                color: "var(--gold-muted)",
                marginBottom: "1.5rem",
              }}
            >
              On the bag
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.25,
                color: "var(--creme)",
                letterSpacing: "-0.015em",
              }}
            >
              Built around the delivery, not the order form.
            </p>
            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "1rem",
                lineHeight: 1.8,
                fontWeight: 300,
                color: "var(--on-dark)",
              }}
            >
              Every bag carries its own batch card and a code that returns
              the record for what is inside it. You should not have to ring
              anyone to find out what you were sent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: How to get it ─────────────────────────────── */}
      <section
        id="how"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <p style={{ ...eyebrowStyle, color: "var(--gold-muted)" }}>
                How to get it
              </p>

              {/* The end of the sequence, in the rail rather than across
                  the page: the steps are the subject here, and this is
                  what they are for. Carries no copy — what biochar does
                  in ground is a claim, and this page does not make it. */}
              <div
                className="relative mt-10 hidden overflow-hidden md:block"
                style={{ aspectRatio: "3 / 4", borderRadius: "3px" }}
              >
                <Image
                  src="/bge/application-mobile.jpg"
                  alt="Gloved hands working biochar into the soil at the base of a tree."
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(15,20,16,0) 55%, rgba(15,20,16,0.55) 100%)",
                  }}
                />
              </div>
            </div>
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
                      color: "var(--gold)",
                      opacity: 0.3,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </span>
                  <p
                    style={{
                      fontSize: "clamp(1.0625rem, 1.6vw, 1.375rem)",
                      lineHeight: "1.55",
                      color: "var(--creme)",
                      fontWeight: 300,
                      letterSpacing: "-0.005em",
                      maxWidth: "36ch",
                    }}
                  >
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div {...reveal(0.3)} style={{ marginTop: "3rem" }}>
              <a href="#contact" className="nm-cta" style={ctaStyle}>
                Join the early list
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Early list ───────────────────────────────────────────
          The lane is not selling yet, so this collects interest rather
          than taking a quote request it cannot answer. The delivery-area
          checker went with it: a lane with no launch date cannot tell
          anyone whether they are inside it. */}
      <section
        id="contact"
        className="px-6 py-28 sm:px-10 sm:py-40"
        style={{ backgroundColor: "var(--ink-deep)" }}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          <motion.div {...reveal()} className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p
                style={{
                  ...eyebrowStyle,
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                }}
              >
                Start here
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.2vw, 3.5rem)",
                  fontWeight: 700,
                  color: "var(--creme)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  marginBottom: "1.25rem",
                }}
              >
                Join the early list.
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--on-dark)",
                  fontWeight: 300,
                  maxWidth: "34ch",
                }}
              >
                Tell us a little about what you run. When supply opens we&apos;ll
                come back to you with formats, cadence and a delivery lane that
                suits you.
              </p>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "var(--on-dark-muted)",
                  maxWidth: "34ch",
                }}
              >
                We&apos;ll confirm delivery availability for your area at launch.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal(0.1)} className="md:col-span-7">
            <InquiryForm
              schema={bgeSchema.omit({ kind: true })}
              kind="bge"
              fields={[
                { name: "name", label: "Name" },
                { name: "email", label: "Email", type: "email" },
                { name: "location", label: "Location", wide: true },
                {
                  name: "message",
                  label: "Message",
                  type: "textarea",
                  optional: true,
                },
              ]}
              submitLabel="Join the List"
              privacyNote="We&apos;ll only use what you send to let you know when supply opens and to answer your message."
              successMessage="You are on the early list. We&apos;ll be in touch the moment supply opens."
            />
          </motion.div>
        </div>
      </section>


    </>
  );
}

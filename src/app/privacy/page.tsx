import type { Metadata } from "next";

import {
  MAILING_ADDRESS,
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED,
} from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Nature's Mastermind handles the information you send through this site. Bringing biochar from niche to normal.",
};

/**
 * The Privacy Notice.
 *
 * Deliberately NOT a `.sec` on the world: a cream world ground would put a
 * color transition inside the 157px footer below it. The page paints its
 * own light ground instead, the world stays off for this route, and the
 * footer keeps its black.
 *
 * Long prose on a dark ground is the wrong trade for a document people
 * actually have to read, which is why this is the one page set on cream.
 */
export default function PrivacyPage() {
  return (
    <article
      data-bg="cream"
      className="px-6 pb-28 pt-40 sm:px-10"
      style={{ backgroundColor: "var(--nm-cream)" }}
    >
      <div className="mx-auto w-full max-w-[72ch]">
        <p
          style={{
            fontSize: "var(--text-micro)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--gold-on-light)",
          }}
        >
          Nature&apos;s Mastermind
        </p>

        <h1
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--nm-black)",
          }}
        >
          Privacy Notice
        </h1>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.875rem",
            color: "var(--ink-faint)",
          }}
        >
          Last updated: {PRIVACY_UPDATED}
        </p>

        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.heading} style={{ marginTop: "3rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "var(--nm-black)",
              }}
            >
              {section.heading}
            </h2>
            {section.paragraphs.map((p) => (
              <p
                key={p}
                style={{
                  marginTop: "1rem",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: "var(--ink-soft)",
                }}
              >
                {p}
              </p>
            ))}

            {/* The mailing address belongs in "Who we are". Until there is
                one, the section says so rather than carrying a bracketed
                placeholder dressed up as published text. */}
            {section.heading === "Who we are" && (
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: "var(--ink-soft)",
                }}
              >
                {MAILING_ADDRESS ?? (
                  <span style={{ color: "var(--ink-faint)" }}>
                    Our mailing address will be published here shortly. Until
                    then, please use the email address or phone number above.
                  </span>
                )}
              </p>
            )}
          </section>
        ))}

        <p
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--hairline-ink)",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            fontWeight: 300,
            color: "var(--ink-faint)",
          }}
        >
          Bringing biochar from niche to normal.
        </p>
      </div>
    </article>
  );
}

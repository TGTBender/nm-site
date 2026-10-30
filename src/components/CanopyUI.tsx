"use client";

import type { ReactNode } from "react";

/**
 * Faithful recreations of Canopy's own interface pieces, for showing the app
 * on the marketing site.
 *
 * Ported from natures-mastermind/src/components — Card, StatTile and
 * DeliveryTracker — keeping the same geometry, borders, weights and colors.
 * They are recreated rather than imported because the app is a separate
 * codebase and a build-time dependency between the two would be worse than a
 * small amount of duplication.
 *
 * If the app's design moves, these move with it. A marketing page showing a
 * product that no longer looks like this is worse than showing nothing.
 */

export function CanopyCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md p-5 ${className}`}
      style={{
        backgroundColor: "var(--canopy-card)",
        border: "1px solid var(--canopy-border)",
        boxShadow: "0 1px 2px rgba(26,26,24,0.05)",
      }}
    >
      {title && (
        <h4
          className="mb-2"
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--canopy-ink)",
          }}
        >
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

export function CanopyStatTile({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <div
      className="rounded-md p-4"
      style={{
        backgroundColor: "var(--canopy-card)",
        border: "1px solid var(--canopy-border)",
      }}
    >
      <div
        style={{
          fontSize: "10.5px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--canopy-muted)",
        }}
      >
        {label}
      </div>
      <div
        className="mt-1.5"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "var(--forest)",
        }}
      >
        {value}
      </div>
      {caption && (
        <div
          className="mt-1.5"
          style={{
            fontSize: "12px",
            lineHeight: 1.4,
            color: "var(--canopy-muted)",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

const STAGES = [
  { key: "prepared", label: "Prepared" },
  { key: "in_route", label: "In Route" },
  { key: "delivered", label: "Delivered" },
] as const;

export function CanopyDeliveryTracker({
  stage,
}: {
  stage: (typeof STAGES)[number]["key"];
}) {
  const currentIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <div className="flex items-center">
      {STAGES.map((s, i) => {
        const reached = i <= currentIndex;
        return (
          <div key={s.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  border: `2px solid ${reached ? "var(--forest)" : "var(--canopy-border)"}`,
                  backgroundColor: reached
                    ? "var(--forest)"
                    : "var(--canopy-surface)",
                  color: reached
                    ? "var(--canopy-button-text)"
                    : "var(--canopy-muted)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {i < currentIndex ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: reached
                    ? "var(--canopy-ink)"
                    : "var(--canopy-muted)",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div
                className="mx-2 h-0.5 flex-1"
                style={{
                  backgroundColor:
                    i < currentIndex ? "var(--forest)" : "var(--canopy-border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * The frame the app sits in. A light panel on the dark page, lifted off the
 * ground so it reads as a screen rather than a section with a different
 * background color.
 */
export function CanopyScreen({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 sm:p-7"
      style={{
        backgroundColor: "var(--canopy-surface)",
        border: "1px solid var(--canopy-border)",
        boxShadow:
          "0 30px 60px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </div>
  );
}

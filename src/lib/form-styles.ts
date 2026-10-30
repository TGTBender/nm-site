import type { CSSProperties } from "react";

/**
 * The form vocabulary, lifted out of BGEPage so every form on the site is
 * visibly the same control rather than a near-match rebuilt per page.
 *
 * The label color is the one change from the original: it was 0.45 alpha,
 * which measured under 4.5:1 against the ink grounds these forms sit on.
 */
export const inputStyle: CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "var(--creme)",
  height: "46px",
  borderRadius: "0.5rem",
  fontSize: "14px",
  width: "100%",
  padding: "0 1rem",
};

export const labelStyle: CSSProperties = {
  color: "var(--on-dark-muted)",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 600,
};

export const ctaStyle: CSSProperties = {
  display: "inline-block",
  backgroundColor: "var(--gold)",
  color: "#1a1a18",
  fontWeight: 700,
  fontSize: "15px",
  padding: "17px 44px",
  borderRadius: "9999px",
  textDecoration: "none",
  letterSpacing: "0.02em",
  border: "none",
  cursor: "pointer",
};

export const eyebrowStyle: CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 600,
};

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Replaces the wouter `<Route component={NotFound} />` catch-all.
 * App Router serves this file for any unmatched path automatically.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#0f1410",
        color: "var(--creme)",
      }}
    >
      <p
        style={{
          color: "var(--gold)",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: "1.75rem",
        }}
      >
        404 · Page not found
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem, 6vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          marginBottom: "1.5rem",
          maxWidth: "600px",
        }}
      >
        This one went off the delivery lane.
      </h1>

      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "rgba(245,239,230,0.52)",
          fontWeight: 300,
          maxWidth: "420px",
          marginBottom: "2.75rem",
        }}
      >
        The page you were looking for doesn&apos;t exist or has moved.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          backgroundColor: "var(--gold)",
          color: "#1a1a18",
          fontWeight: 700,
          fontSize: "15px",
          padding: "17px 44px",
          borderRadius: "9999px",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm, type FieldValues, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { ZodType } from "zod";

import { ctaStyle, inputStyle, labelStyle } from "@/lib/form-styles";

/**
 * Every form on the site except the Viridian waitlist.
 *
 * Driven by a field spec rather than written out three times, so the oil
 * field briefing, The BGE early list and the Longevity interest form are
 * the same control with different fields — which is what the brief asks
 * for when it says to reuse the /bge form styling.
 *
 * Three things it does that a plain form would not:
 *  - a honeypot, visually hidden and off the tab order, judged server-side
 *  - a live region for the result, so a screen reader hears the outcome
 *  - a privacy link under the button on every instance, because the brief
 *    requires one beside every form and a prop that could be forgotten is
 *    weaker than a line that is always rendered
 */

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: readonly string[];
  optional?: boolean;
  placeholder?: string;
  /** Full width in the two-column grid. */
  wide?: boolean;
};

export function InquiryForm<T extends FieldValues>({
  schema,
  kind,
  fields,
  submitLabel,
  privacyNote,
  successMessage,
}: {
  schema: ZodType<T>;
  kind: string;
  fields: Field[];
  submitLabel: string;
  privacyNote: string;
  successMessage: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<T>({ resolver: zodResolver(schema) });

  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function onSubmit(values: T) {
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        style={{
          border: "1px solid rgba(201,145,42,0.4)",
          backgroundColor: "rgba(201,145,42,0.07)",
          borderRadius: "0.75rem",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--creme)",
          }}
        >
          Thank you — that reached us.
        </p>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.9375rem",
            lineHeight: 1.75,
            fontWeight: 300,
            color: "var(--on-dark)",
          }}
        >
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.name as Path<T>];
          const id = `${kind}-${f.name}`;
          const describedBy = err ? `${id}-error` : undefined;

          return (
            <div
              key={f.name}
              className={f.wide || f.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <label
                htmlFor={id}
                style={{ ...labelStyle, display: "block", marginBottom: "0.6rem" }}
              >
                {f.label}
                {f.optional && (
                  <span style={{ color: "var(--on-dark-faint)" }}> (optional)</span>
                )}
              </label>

              {f.type === "textarea" ? (
                <textarea
                  id={id}
                  rows={4}
                  placeholder={f.placeholder}
                  aria-invalid={!!err}
                  aria-describedby={describedBy}
                  {...register(f.name as Path<T>)}
                  style={{ ...inputStyle, height: "auto", padding: "0.85rem 1rem" }}
                />
              ) : f.type === "select" ? (
                <select
                  id={id}
                  defaultValue=""
                  aria-invalid={!!err}
                  aria-describedby={describedBy}
                  {...register(f.name as Path<T>)}
                  style={inputStyle}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {f.options?.map((o) => (
                    <option key={o} value={o} style={{ color: "#1a1a18" }}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={f.type ?? "text"}
                  placeholder={f.placeholder}
                  aria-invalid={!!err}
                  aria-describedby={describedBy}
                  {...register(f.name as Path<T>)}
                  style={inputStyle}
                />
              )}

              {err && (
                <p id={`${id}-error`} style={{ marginTop: "0.5rem", fontSize: "12px", color: "#e09a5a" }}>
                  {String(err.message)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot. Hidden from sight and from the tab order; a real person
          never reaches it, and the handler answers a filled one exactly as
          it answers a success. */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor={`${kind}-website`}>Website</label>
        <input
          id={`${kind}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website" as Path<T>)}
        />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button type="submit" disabled={isSubmitting} className="nm-cta" style={ctaStyle}>
          {isSubmitting ? "Sending…" : submitLabel}
        </button>
      </div>

      <p
        style={{
          marginTop: "1.25rem",
          fontSize: "12px",
          lineHeight: 1.7,
          fontWeight: 300,
          color: "var(--on-dark-muted)",
          maxWidth: "46ch",
        }}
      >
        {privacyNote}{" "}
        <Link href="/privacy" className="nm-link" style={{ color: "var(--gold)" }}>
          See our Privacy Notice
        </Link>
        .
      </p>

      <div aria-live="polite">
        {status === "error" && (
          <p style={{ marginTop: "1rem", fontSize: "13px", color: "#e09a5a" }}>
            That did not go through. Please try again, or email
            nm@thegreenestthumb.org.
          </p>
        )}
      </div>
    </form>
  );
}

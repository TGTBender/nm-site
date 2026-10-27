import Image from "next/image";

/** Site-wide footer. Shared by every route through the root layout. */
export function SiteFooter() {
  return (
    <footer
      className="px-6 py-14 sm:px-10"
      style={{
        backgroundColor: "var(--ink-deep)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Image
            src="/logo.jpg"
            alt=""
            width={28}
            height={28}
            style={{
              width: 28,
              height: 28,
              borderRadius: "9999px",
              objectFit: "cover",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(245,239,230,0.45)",
              }}
            >
              Nature&apos;s Mastermind
            </p>
            <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.22)" }}>
              A subsidiary of The Greenest Thumb Inc.
            </p>
          </div>
        </div>

        <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.16)" }}>
          © 2026 Nature&apos;s Mastermind
        </p>
      </div>
    </footer>
  );
}

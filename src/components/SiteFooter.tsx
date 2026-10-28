import Image from "next/image";
import Link from "next/link";
import { ACTIVE_SOCIALS } from "@/content/social";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

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
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
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
            <Link
              href="/"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(245,239,230,0.45)",
                textDecoration: "none",
              }}
            >
              Nature&apos;s Mastermind
            </Link>
            <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.22)" }}>
              A subsidiary of The Greenest Thumb Inc.
            </p>
          </div>
        </div>

        {/* Right side: social marks over the copyright. Only platforms with a
            real URL in content/social.ts render — an icon linking nowhere is
            worse than no icon. */}
        <div className="flex flex-col gap-4 sm:items-end">
          {ACTIVE_SOCIALS.length > 0 && (
            <ul className="flex items-center gap-5">
              {ACTIVE_SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.name];
                if (!Icon) return null;
                return (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Nature's Mastermind on ${s.name}`}
                      className="nm-social"
                    >
                      <Icon style={{ width: 18, height: 18 }} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.16)" }}>
            © 2026 Nature&apos;s Mastermind
          </p>
        </div>
      </div>
    </footer>
  );
}

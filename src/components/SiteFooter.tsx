import Image from "next/image";
import Link from "next/link";
import { SOCIALS } from "@/content/social";
import { SOCIAL_ICONS } from "@/components/SocialIcons";

/**
 * Site-wide footer, lit from below.
 *
 * A shaft of light rises from the base: a blurred beam and a tighter pool
 * where it meets the floor, both on `screen` so they add light rather than
 * painting over what is behind them. A contour field local to the footer
 * answers the same pulse, masked to fade out with height so the lines
 * emerge from the light instead of sitting on top of it.
 *
 * Everything breathes on one cycle and in phase — unlike the page-wide
 * world, whose ink layers are deliberately offset — because here it should
 * all read as a response to a single source.
 *
 * The source is below the content, so the social marks cast upward.
 */
export function SiteFooter() {
  return (
    <footer
      className="nm-footer px-6 pb-16 pt-44 sm:px-10"
      style={{
        backgroundColor: "var(--nm-black)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="nm-footer-lines" aria-hidden />
      <div className="nm-footer-underglow" aria-hidden />

      <div className="nm-footer-content mx-auto flex max-w-[1240px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
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

        {/* Right side: social marks over the copyright. A platform with a
            URL renders as a link; one without renders as a plain mark, so
            the footer is complete before the accounts exist without putting
            a dead link on the page. */}
        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex items-center gap-5">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.name];
              if (!Icon) return null;
              const glyph = <Icon style={{ width: 18, height: 18 }} />;
              return (
                <li key={s.name}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Nature's Mastermind on ${s.name}`}
                      className="nm-social"
                    >
                      {glyph}
                    </a>
                  ) : (
                    // Not yet connected. role="img" announces the platform
                    // without implying it can be activated.
                    <span role="img" aria-label={s.name} className="nm-social">
                      {glyph}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <p style={{ fontSize: "11px", color: "rgba(245,239,230,0.16)" }}>
            © 2026 Nature&apos;s Mastermind
          </p>
        </div>
      </div>
    </footer>
  );
}

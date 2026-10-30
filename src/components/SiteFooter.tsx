import Image from "next/image";
import Link from "next/link";
import { SOCIALS } from "@/content/social";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { CONTACT } from "@/content/home";

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
      className="sec nm-footer px-6 pb-9 pt-16 sm:px-10"
      data-bg="black"
      // Joins the world where one exists; never creates one on its own.
      data-world-tail=""
    >
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
                color: "var(--on-dark)",
                textDecoration: "none",
              }}
            >
              Nature&apos;s Mastermind
            </Link>
            <p style={{ fontSize: "11px", color: "var(--on-dark-muted)" }}>
              A subsidiary of The Greenest Thumb Inc.
            </p>
            <p
              style={{
                marginTop: "0.35rem",
                fontSize: "11px",
                color: "var(--gold-muted)",
              }}
            >
              Bringing biochar from niche to normal.
            </p>
          </div>
        </div>

        {/* Contact and the Privacy Notice, required on every page. */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <a
            href={`tel:+1${CONTACT.phone.replace(/\D/g, "")}`}
            style={{ fontSize: "11px", color: "var(--on-dark)" }}
          >
            {CONTACT.phone}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{ fontSize: "11px", color: "var(--on-dark)" }}
          >
            {CONTACT.email}
          </a>
          <Link
            href="/privacy"
            className="nm-link"
            style={{ fontSize: "11px", color: "var(--gold-muted)" }}
          >
            Privacy Notice
          </Link>
        </nav>

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

          <p style={{ fontSize: "11px", color: "var(--on-dark-muted)" }}>
            © 2026 Nature&apos;s Mastermind
          </p>
        </div>
      </div>
    </footer>
  );
}

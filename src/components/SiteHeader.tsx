"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * The site-wide header.
 *
 * Lifted out of the home page when the site went from one page to several.
 * It owns the scroll state and the reveal-on-scroll-up behavior, so every
 * route gets them without repeating the logic.
 *
 * Navigation is route-aware: page links are constant, while in-page anchors
 * and the call to action belong to whichever route is showing. A "Get a
 * Quote" button on the Viridian page would point at the wrong funnel.
 */

type NavItem = { name: string; href: string };

const PAGES: NavItem[] = [
  { name: "The Viridian", href: "/products" },
  { name: "The BGE", href: "/bge" },
  { name: "Canopy", href: "/canopy" },
  { name: "Longevity", href: "/longevity" },
];

/** Anchors that only make sense while that route is on screen. */
const ANCHORS: Record<string, NavItem[]> = {
  "/bge": [
    { name: "Why biochar", href: "#why" },
    { name: "How it works", href: "#how" },
  ],
};

/**
 * Each lane converts differently, so the button belongs to the route rather
 * than the site. The landing page deliberately has none: its job is to route
 * into the four lanes, not to push one of them.
 */
const CTA: Record<string, NavItem | undefined> = {
  "/products": { name: "Join the waitlist", href: "#waitlist" },
  // The BGE is not selling yet, so its button collects interest rather
  // than asking for a quote it cannot fill.
  "/bge": { name: "Join the early list", href: "#contact" },
};

/* The region claim was pulled at the founder's direction while the
   business moves from one territory to brokerage; it goes back when
   there is a territory to name again. The descriptor now says what the
   business does rather than where, which is also the landing page's
   headline. */
const DESCRIPTOR = "Bringing biochar from niche to normal";

/**
 * Routes that paint a light ground.
 *
 * The header is transparent until you scroll, so on these pages its creme
 * wordmark, gold descriptor, nav links and menu icon all sat on cream —
 * the menu icon was reported as too faint, but the whole header had the
 * same fault and the wordmark beside it was no better.
 *
 * Only the unscrolled state is affected: once the bar paints itself dark
 * the creme ink is correct again, so the ink has to follow the bar rather
 * than the route alone.
 */
const LIGHT_ROUTES = new Set(["/privacy"]);

/** Dark teal-green: 9.7:1 on the cream ground, and on-brand. */
const INK_ON_LIGHT = "#223B37";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastY = useRef(0);

  // Close the menu when the route changes, or it survives the navigation.
  // Adjusted during render rather than in an effect: setState inside an
  // effect body cascades an extra render, and this is the pattern React
  // documents for responding to a changed value.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      // The 8px gate ignores trackpad jitter that would otherwise make the
      // bar flicker; nothing hides until well past the fold.
      if (Math.abs(y - lastY.current) > 8) {
        setHeaderHidden(y > lastY.current && y > 260);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // An open menu must never ride away with the header.
  const hideHeader = headerHidden && !mobileMenuOpen;

  // The bar is painted when scrolled, and also whenever the mobile menu is
  // open — an open menu over a transparent bar left the close button on
  // bare cream, which is the same bug in the state people reach by trying
  // to fix the first one.
  const painted = isScrolled || mobileMenuOpen;
  const onLight = LIGHT_ROUTES.has(pathname) && !painted;
  const ink = onLight ? INK_ON_LIGHT : "var(--creme)";
  const inkMuted = onLight ? "var(--gold-on-light)" : "var(--gold-muted)";
  const inkLink = onLight ? INK_ON_LIGHT : undefined;

  const anchors = ANCHORS[pathname] ?? [];
  const cta = CTA[pathname];
  const pages = PAGES.filter((p) => p.href !== pathname);
  const links = [...anchors, ...pages];

  const mobileItemStyle = {
    fontSize: "15px",
    fontWeight: 500,
    padding: "13px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  } as const;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        // Constant padding. Animating padding between scroll states is a
        // layout property and forces reflow; the compact feel comes from
        // transform alone.
        padding: "16px 0",
        // Low alpha on purpose. The world background now paints the ground,
        // and a near-opaque bar in the old ink sat on top of it as a separate
        // slab. At this weight the contour field reads through the blur.
        backgroundColor: painted ? "rgba(11,13,12,0.62)" : "transparent",
        backdropFilter: painted ? "blur(18px) saturate(140%)" : "none",
        WebkitBackdropFilter: painted ? "blur(18px) saturate(140%)" : "none",
        borderBottom: painted
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
        transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
        transition:
          "transform 0.55s var(--ease-out-quart), background-color 0.45s var(--ease-out-quart), border-color 0.45s var(--ease-out-quart)",
        // A fixed, backdrop-blurred bar over a full-bleed image will smear on
        // some GPUs unless it owns its compositing layer.
        backfaceVisibility: "hidden",
        isolation: "isolate",
        willChange: "transform, background-color",
      }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          <Image
            src="/logo.jpg"
            alt="Nature's Mastermind"
            width={32}
            height={32}
            priority
            style={{
              width: 32,
              height: 32,
              borderRadius: "9999px",
              objectFit: "cover",
              border: onLight
                ? "1.5px solid rgba(34,59,55,0.25)"
                : "1.5px solid rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          />
          <div className="hidden md:block">
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: ink,
                lineHeight: 1.2,
              }}
            >
              Nature&apos;s Mastermind
            </p>
            <p
              style={{
                fontSize: "var(--text-micro)",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: inkMuted,
                textTransform: "uppercase",
              }}
            >
              {DESCRIPTOR}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                className="nm-link"
                style={{ fontSize: "13px", fontWeight: 500, color: inkLink }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="nm-link"
                style={{ fontSize: "13px", fontWeight: 500, color: inkLink }}
              >
                {link.name}
              </Link>
            ),
          )}
          {cta && (
            <a
              href={cta.href}
              className="nm-cta"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#1a1a18",
                backgroundColor: "var(--gold)",
                borderRadius: "9999px",
                padding: "9px 22px",
                textDecoration: "none",
              }}
            >
              {cta.name}
            </a>
          )}
        </nav>

        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: ink,
            padding: 4,
          }}
        >
          {mobileMenuOpen ? (
            <X style={{ width: 22, height: 22 }} />
          ) : (
            <Menu style={{ width: 22, height: 22 }} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "rgba(11,13,12,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backfaceVisibility: "hidden",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "1.25rem 1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[...links, ...(cta ? [cta] : [])].map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="nm-link"
                style={mobileItemStyle}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="nm-link"
                style={mobileItemStyle}
              >
                {link.name}
              </Link>
            ),
          )}
        </div>
      )}
    </header>
  );
}

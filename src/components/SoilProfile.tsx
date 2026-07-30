"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * A soil cross-section that enriches as the visitor scrolls past it.
 *
 * Scroll-*linked* rather than triggered: unlike the `whileInView` animations
 * elsewhere on the page (which fire once on entry), every value here is
 * driven continuously by scroll position, so the profile transforms as the
 * reader moves.
 *
 * Deliberately qualitative — no figures or percentages. It illustrates the
 * claim the surrounding copy already makes ("one application changes your
 * soil for decades") without inventing data to back it.
 */

const VB_W = 680;
const VB_H = 420;

const SURFACE_Y = 96; // soil surface line
const FLOOR_Y = VB_H - 8;

/* Deterministic PRNG. Positions must be identical on server and client or
   hydration mismatches; computing them at module scope with a fixed seed
   keeps both renders in agreement. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Fleck = { x: number; y: number; r: number; rot: number; squash: number };

/** Three depth bands. Grouping flecks lets each band share a single motion
 *  value instead of giving ~50 nodes their own — far cheaper per frame. */
const BANDS: { from: number; to: number; count: number; size: [number, number] }[] =
  [
    { from: SURFACE_Y + 6, to: SURFACE_Y + 108, count: 26, size: [3.4, 7.2] },
    { from: SURFACE_Y + 100, to: SURFACE_Y + 210, count: 20, size: [2.8, 6.0] },
    { from: SURFACE_Y + 200, to: FLOOR_Y - 10, count: 14, size: [2.2, 4.8] },
  ];

const FLECK_BANDS: Fleck[][] = (() => {
  const rand = mulberry32(0x6b10c4a);
  return BANDS.map((band) => {
    const out: Fleck[] = [];
    for (let i = 0; i < band.count; i++) {
      out.push({
        x: 18 + rand() * (VB_W - 36),
        y: band.from + rand() * (band.to - band.from),
        r: band.size[0] + rand() * (band.size[1] - band.size[0]),
        rot: rand() * 180,
        squash: 0.5 + rand() * 0.4,
      });
    }
    return out;
  });
})();

/** Root paths, shallow to deep — they draw in sequence as progress advances. */
const ROOTS = [
  "M340 96 C 336 150, 318 176, 296 206 C 282 226, 276 244, 272 262",
  "M340 96 C 346 152, 366 178, 392 208 C 410 229, 418 248, 422 268",
  "M340 96 C 340 168, 338 224, 336 276 C 335 310, 334 336, 333 366",
];

const ROOT_BRANCHES = [
  "M296 206 C 280 210, 268 206, 254 198",
  "M392 208 C 408 212, 420 208, 434 200",
  "M336 276 C 320 286, 310 298, 302 312",
  "M336 276 C 352 286, 362 298, 370 312",
];

export function SoilProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Begins as the panel enters the lower viewport, completes before it
    // leaves the top — the whole change happens while it is comfortably read.
    offset: ["start 0.88", "end 0.42"],
  });

  // Spring smooths scroll jitter into the gentle drift the design calls for.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 58,
    damping: 22,
    restDelta: 0.0005,
  });

  /* Reduced motion: present the informative end state outright rather than
     an inert depleted one. The hook still runs unconditionally — only the
     source value swaps. */
  const settled = useMotionValue(1);
  const p: MotionValue<number> = prefersReduced ? settled : smoothed;

  // Rich loam cross-fades over the depleted base.
  const richOpacity = useTransform(p, [0, 0.85], [0, 1]);
  const moistureOpacity = useTransform(p, [0.15, 0.9], [0, 0.42]);

  // Depth-staggered so enrichment reads as working downward.
  const band0 = useTransform(p, [0.05, 0.45], [0, 1]);
  const band1 = useTransform(p, [0.25, 0.7], [0, 1]);
  const band2 = useTransform(p, [0.45, 0.95], [0, 1]);
  const bandOpacities = [band0, band1, band2];

  const root0 = useTransform(p, [0.1, 0.5], [0, 1]);
  const root1 = useTransform(p, [0.2, 0.62], [0, 1]);
  const root2 = useTransform(p, [0.3, 0.8], [0, 1]);
  const rootLengths = [root0, root1, root2];

  const branchLength = useTransform(p, [0.55, 0.95], [0, 1]);
  const canopyScale = useTransform(p, [0, 0.9], [0.86, 1]);
  const canopyOpacity = useTransform(p, [0, 0.35], [0.45, 1]);

  // Caption cross-fade, using the section's own language rather than figures.
  const beforeLabel = useTransform(p, [0.28, 0.5], [1, 0]);
  const afterLabel = useTransform(p, [0.5, 0.72], [0, 1]);

  return (
    <div ref={ref} style={{ marginTop: "3.5rem" }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        role="img"
        aria-label="Cross-section of soil gaining biochar structure, moisture retention and deeper root growth after a single application."
        style={{ display: "block", borderRadius: "0.75rem" }}
      >
        <defs>
          <linearGradient id="sp-depleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cdbb9c" />
            <stop offset="55%" stopColor="#bda882" />
            <stop offset="100%" stopColor="#a89170" />
          </linearGradient>
          <linearGradient id="sp-rich" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b4c2a" />
            <stop offset="45%" stopColor="#4c3319" />
            <stop offset="100%" stopColor="#33210f" />
          </linearGradient>
          <linearGradient id="sp-moist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6f9c8b" stopOpacity="0" />
            <stop offset="45%" stopColor="#6f9c8b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4f7d6d" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="sp-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#faf8f4" />
            <stop offset="100%" stopColor="#f0ece2" />
          </linearGradient>

          <clipPath id="sp-clip">
            <rect
              x="0"
              y={SURFACE_Y}
              width={VB_W}
              height={FLOOR_Y - SURFACE_Y}
              rx="10"
            />
          </clipPath>
        </defs>

        {/* air above the soil line */}
        <rect x="0" y="0" width={VB_W} height={SURFACE_Y} fill="url(#sp-sky)" />

        <g clipPath="url(#sp-clip)">
          <rect
            x="0"
            y={SURFACE_Y}
            width={VB_W}
            height={FLOOR_Y - SURFACE_Y}
            fill="url(#sp-depleted)"
          />
          <motion.rect
            x="0"
            y={SURFACE_Y}
            width={VB_W}
            height={FLOOR_Y - SURFACE_Y}
            fill="url(#sp-rich)"
            style={{ opacity: richOpacity }}
          />

          {/* moisture held in the profile */}
          <motion.rect
            x="0"
            y={SURFACE_Y}
            width={VB_W}
            height={FLOOR_Y - SURFACE_Y}
            fill="url(#sp-moist)"
            style={{ opacity: moistureOpacity }}
          />

          {/* biochar, emerging top band first */}
          {FLECK_BANDS.map((band, bi) => (
            <motion.g key={bi} style={{ opacity: bandOpacities[bi] }}>
              {band.map((f, i) => (
                <ellipse
                  key={i}
                  cx={f.x}
                  cy={f.y}
                  rx={f.r}
                  ry={f.r * f.squash}
                  fill="#14140f"
                  opacity={0.82}
                  transform={`rotate(${f.rot} ${f.x} ${f.y})`}
                />
              ))}
            </motion.g>
          ))}

          {/* roots reaching deeper */}
          {ROOTS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="#e6d8bd"
              strokeWidth={i === 2 ? 3.2 : 2.4}
              strokeLinecap="round"
              opacity={0.9}
              style={{ pathLength: rootLengths[i] }}
            />
          ))}
          {ROOT_BRANCHES.map((d) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="#e6d8bd"
              strokeWidth={1.6}
              strokeLinecap="round"
              opacity={0.7}
              style={{ pathLength: branchLength }}
            />
          ))}
        </g>

        {/* soil surface line */}
        <rect
          x="0"
          y={SURFACE_Y - 2}
          width={VB_W}
          height="3"
          fill="#3b2510"
          opacity="0.28"
        />

        {/* the plant this is all for */}
        <motion.g
          style={{
            scale: canopyScale,
            opacity: canopyOpacity,
            originX: "340px",
            originY: "96px",
          }}
        >
          <path
            d="M340 96 L340 42"
            stroke="#2d4a2d"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M340 62 C 318 58, 306 44, 304 28 C 324 30, 338 44, 340 62 Z"
            fill="#2d4a2d"
          />
          <path
            d="M340 74 C 362 70, 374 56, 376 40 C 356 42, 342 56, 340 74 Z"
            fill="#375a37"
          />
        </motion.g>
      </svg>

      {/* Caption echoes the surrounding copy; no figures are asserted. */}
      <div
        style={{
          position: "relative",
          height: "1.5rem",
          marginTop: "1.25rem",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <motion.p
          style={{
            position: "absolute",
            inset: 0,
            color: "rgba(59,37,16,0.45)",
            opacity: beforeLabel,
          }}
        >
          Soil without it
        </motion.p>
        <motion.p
          style={{
            position: "absolute",
            inset: 0,
            color: "var(--gold)",
            opacity: afterLabel,
          }}
        >
          One application · seasons of structure
        </motion.p>
      </div>
    </div>
  );
}

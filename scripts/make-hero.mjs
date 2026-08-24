/**
 * Generates the Nature's Mastermind hero backdrop: a layered piney-woods
 * horizon receding into atmospheric haze.
 *
 * The image renders at high opacity under a scrim weighted to the lower edge,
 * where the headline sits. Built for composition and tonality rather than
 * fine detail, and kept calm behind the type.
 *
 * Tonal note: an earlier revision was authored to survive 0.35 opacity under
 * a heavy scrim, which left it near-black once composited. Sky, treeline and
 * vignette were all lifted when the compositing was rebalanced — change one
 * and the other needs revisiting.
 *
 * Usage: node make-hero.mjs <outPath>
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const W = 2400;
const H = 1600;

// Brand palette
const INK = "#0f1410";
const FOREST = "#2d4a2d";
const GOLD = "#c9912a";

// Deterministic PRNG so the art is reproducible across runs.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260729);
const between = (a, b) => a + rand() * (b - a);

/** A conifer silhouette: three overlapping tiers read as a pine at any scale. */
function pine(cx, baseY, h, w) {
  const tiers = 3;
  let d = "";
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers;
    const apex = baseY - h * (1 - t * 0.42);
    const tierBase = baseY - h * (0.46 - t * 0.23);
    const halfW = (w / 2) * (0.42 + t * 0.58);
    d += `M${(cx - halfW).toFixed(1)} ${tierBase.toFixed(1)} `;
    d += `L${cx.toFixed(1)} ${apex.toFixed(1)} `;
    d += `L${(cx + halfW).toFixed(1)} ${tierBase.toFixed(1)} Z `;
  }
  // slim trunk
  const tw = Math.max(1.2, w * 0.045);
  d += `M${(cx - tw).toFixed(1)} ${baseY.toFixed(1)} L${(cx - tw).toFixed(1)} ${(baseY - h * 0.3).toFixed(1)} L${(cx + tw).toFixed(1)} ${(baseY - h * 0.3).toFixed(1)} L${(cx + tw).toFixed(1)} ${baseY.toFixed(1)} Z `;
  return d;
}

/**
 * Depth layers, far -> near. Distant ranks sit lighter and hazier (aerial
 * perspective); near ranks go almost black so the treeline reads as mass.
 */
const layers = [
  { baseY: 0.60, h: [26, 46], w: [16, 26], step: 15, fill: "#7ba07e", op: 0.34 },
  { baseY: 0.655, h: [40, 70], w: [22, 36], step: 20, fill: "#638a68", op: 0.48 },
  { baseY: 0.72, h: [64, 112], w: [30, 52], step: 28, fill: "#476b51", op: 0.66 },
  { baseY: 0.80, h: [104, 178], w: [46, 80], step: 42, fill: "#2f4a36", op: 0.82 },
  { baseY: 0.90, h: [170, 290], w: [72, 128], step: 66, fill: "#1d3021", op: 0.94 },
  { baseY: 1.02, h: [250, 430], w: [110, 190], step: 104, fill: "#121e14", op: 1.0 },
];

let treeLayers = "";
for (const L of layers) {
  const baseY = H * L.baseY;
  let d = "";
  // start off-canvas on both sides so the rank never ends mid-frame
  for (let x = -L.step; x < W + L.step; x += L.step * between(0.72, 1.28)) {
    const h = between(L.h[0], L.h[1]);
    const w = between(L.w[0], L.w[1]);
    d += pine(x, baseY + between(-4, 4), h, w);
  }
  treeLayers += `  <path d="${d}" fill="${L.fill}" opacity="${L.op}"/>\n`;
}

// Haze bands sit *between* ranks to separate them and sell depth.
let haze = "";
for (let i = 0; i < layers.length - 1; i++) {
  const y = H * layers[i].baseY - 26;
  const o = 0.3 - i * 0.045;
  haze += `  <rect x="0" y="${y.toFixed(0)}" width="${W}" height="110" fill="url(#hazeGrad)" opacity="${o.toFixed(3)}"/>\n`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Sky: deep ink overhead easing to a warm, hazy horizon. Kept calm up
         top because the h1 sits over that band. -->
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#1a2a1f"/>
      <stop offset="26%"  stop-color="#263b2c"/>
      <stop offset="46%"  stop-color="#3f6249"/>
      <stop offset="57%"  stop-color="#628c68"/>
      <stop offset="62%"  stop-color="#84ae79"/>
      <stop offset="66%"  stop-color="#5b8158"/>
      <stop offset="100%" stop-color="#16211a"/>
    </linearGradient>

    <!-- Low sun glow just above the treeline, tinted with brand gold. -->
    <radialGradient id="glow" cx="0.5" cy="0.615" r="0.42">
      <stop offset="0%"   stop-color="${GOLD}" stop-opacity="0.52"/>
      <stop offset="38%"  stop-color="${GOLD}" stop-opacity="0.19"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="hazeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#7d9c7f" stop-opacity="0"/>
      <stop offset="50%"  stop-color="#8fae8d" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#7d9c7f" stop-opacity="0"/>
    </linearGradient>

    <!-- Vignette keeps the eye centred and darkens the edges under the scrim. -->
    <radialGradient id="vig" cx="0.5" cy="0.52" r="0.78">
      <stop offset="55%"  stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.30"/>
    </radialGradient>

    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#132015" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0d160e" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

${haze}
${treeLayers}
  <!-- foreground floor -->
  <rect x="0" y="${(H * 0.93).toFixed(0)}" width="${W}" height="${(H * 0.07).toFixed(0)}" fill="url(#ground)"/>

  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;

const outPath = process.argv[2];
const svgPath = outPath.replace(/\.png$/, ".svg");
writeFileSync(svgPath, svg);

const info = await sharp(Buffer.from(svg), { density: 96 })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(outPath);

console.log("PNG :", outPath, `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(0)} KB`);

// WebP alternative — far smaller for a decorative full-bleed backdrop.
const webp = await sharp(Buffer.from(svg), { density: 96 })
  .webp({ quality: 82 })
  .toFile(outPath.replace(/\.png$/, ".webp"));
console.log("WebP:", `${(webp.size / 1024).toFixed(0)} KB`);

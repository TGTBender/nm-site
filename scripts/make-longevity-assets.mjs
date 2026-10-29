/**
 * Prepare The Longevity Project web assets from the render set.
 *
 *   node scripts/make-longevity-assets.mjs [sourceDir]
 *
 * Three renders, each cut twice: a 2:1 band for wide screens and a 4:5
 * portrait for phones. Same arrangement as the Viridian set, and for the
 * same reason — one crop cannot serve both without either starving the
 * wide layout or burying the subject on a phone.
 *
 * The crops are chosen around where the copy sits on each card, not around
 * the centre of the frame:
 *
 *  - gate-dusk is the title card. The sky is clean and unbroken on the
 *    left, which is where the headline goes, so the crop keeps the sky
 *    band and drops asphalt from the bottom instead.
 *  - campus illustrates gardens "above the ground, below it, and on the
 *    roof", so the crop has to hold the raised beds, the in-ground plots
 *    AND the green roof at once. That fixes it almost exactly as shot;
 *    only the hazy skyline comes off the top.
 *  - hands is the payoff shot and the only one with biochar visibly in
 *    the soil. The wide cut is a band around the seedling, because a 2:1
 *    crop of a portrait frame otherwise lands on forearms and bed timber.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC =
  process.argv[2] ||
  "C:/The Vault/TMV/The Greenest Thumb/Subsidiaries/Nature's Mastermind/Reference/Sales & Marketing/Claude outputs/Longevity_Website_Images";
const OUT = path.join(process.cwd(), "public", "longevity");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/** Photographic sources: JPEG keeps next/image's AVIF pass from stacking
 *  two lossy encodes on top of each other. */
const JPEG = { quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" };

const jobs = [
  // ── Title card: dusk at the gate ──────────────────────────────
  {
    in: "longevity_gate_dusk.webp",
    out: "gate.jpg",
    // keeps the full sky for the headline, drops asphalt from the bottom
    crop: { left: 0, top: 0, width: 2000, height: 1000 },
  },
  {
    in: "longevity_gate_dusk.webp",
    out: "gate-mobile.jpg",
    // the lit building and the gate posts; the booth alone reads as a hut
    crop: { left: 680, top: 0, width: 893, height: 1116 },
  },

  // ── 01: the grounds ───────────────────────────────────────────
  {
    in: "longevity_campus.webp",
    out: "campus.jpg",
    // off the top only — the beds, the plots and the green roof all stay
    crop: { left: 0, top: 100, width: 2000, height: 1000 },
  },
  {
    in: "longevity_campus.webp",
    out: "campus-mobile.jpg",
    crop: { left: 620, top: 0, width: 893, height: 1116 },
  },

  // ── 03: biochar in the bed ────────────────────────────────────
  {
    in: "longevity_hands.webp",
    out: "hands.jpg",
    // a band centred on the seedling rather than the middle of the frame
    crop: { left: 0, top: 577, width: 1493, height: 746 },
  },
  {
    in: "longevity_hands.webp",
    out: "hands-mobile.jpg",
    crop: { left: 0, top: 70, width: 1493, height: 1866 },
  },
];

mkdirSync(OUT, { recursive: true });

for (const job of jobs) {
  let pipe = sharp(path.join(SRC, job.in));
  if (job.crop) pipe = pipe.extract(job.crop);
  const info = await pipe.jpeg(JPEG).toFile(path.join(OUT, job.out));
  console.log(
    `  ${job.out.padEnd(18)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)}  ${kb(info.size).padStart(8)}`
  );
}

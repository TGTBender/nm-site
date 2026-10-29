/**
 * Prepare The BGE web assets from the render set.
 *
 *   node scripts/make-bge-assets.mjs [sourceDir]
 *
 * Four renders carrying the lane's argument in order: the load arriving,
 * the bag it arrives in, the material itself, and the material going in.
 *
 * Crop notes, where the choice is not obvious:
 *
 *  - load is the hero. The near pallet is the subject, but the headline
 *    sits over the left third, so the wide cut keeps the bags right of
 *    centre and lets the treeline carry the left.
 *  - bag is the only frame shot in a bright warehouse, against a site
 *    that is otherwise dark. It is kept because it is the one image that
 *    shows the batch card and the QR — the documentation claim made
 *    literal — and it runs behind a scrim rather than full strength.
 *  - scoop arrives at 2.36:1, which is already a band, so the wide cut
 *    is the frame untouched.
 *  - application is portrait and the hands sit low in it, so the wide cut
 *    is a band taken from the lower half rather than the middle.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC =
  process.argv[2] ||
  "C:/The Vault/TMV/The Greenest Thumb/Subsidiaries/Nature's Mastermind/Reference/Sales & Marketing/Claude outputs/BGE_Website_Images";
const OUT = path.join(process.cwd(), "public", "bge");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const JPEG = { quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" };

const jobs = [
  // ── Hero: the load ────────────────────────────────────────────
  {
    in: "bge_load.webp",
    out: "load.jpg",
    crop: { left: 0, top: 40, width: 2000, height: 1000 },
  },
  {
    in: "bge_load.webp",
    out: "load-mobile.jpg",
    // the near pallets, not the tractor unit
    crop: { left: 150, top: 0, width: 893, height: 1116 },
  },

  // ── The bag, and what is printed on it ────────────────────────
  {
    in: "bge_bag.webp",
    out: "bag.jpg",
    // trims warehouse ceiling; keeps the lift handles, which are most of
    // what makes it read as a bulk bag rather than a crate
    crop: { left: 0, top: 150, width: 2000, height: 1150 },
  },
  {
    in: "bge_bag.webp",
    out: "bag-mobile.jpg",
    crop: { left: 400, top: 0, width: 1194, height: 1493 },
  },

  // ── The material ──────────────────────────────────────────────
  { in: "bge_scoop.webp", out: "scoop.jpg" },
  {
    in: "bge_scoop.webp",
    out: "scoop-mobile.jpg",
    // the scoop itself; anything wider loses it among the orchard rows
    crop: { left: 760, top: 0, width: 678, height: 848 },
  },

  // ── Going in ──────────────────────────────────────────────────
  {
    in: "bge_application.webp",
    out: "application.jpg",
    crop: { left: 0, top: 450, width: 1493, height: 995 },
  },
  {
    in: "bge_application.webp",
    out: "application-mobile.jpg",
    crop: { left: 0, top: 70, width: 1493, height: 1866 },
  },
];

mkdirSync(OUT, { recursive: true });

for (const job of jobs) {
  let pipe = sharp(path.join(SRC, job.in));
  if (job.crop) pipe = pipe.extract(job.crop);
  const info = await pipe.jpeg(JPEG).toFile(path.join(OUT, job.out));
  console.log(
    `  ${job.out.padEnd(22)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)}  ${kb(info.size).padStart(8)}`
  );
}

/**
 * Prepare The Viridian web assets from the render set.
 *
 *   node scripts/make-viridian-assets.mjs [sourceDir]
 *
 * Sources are the text-free `banner_clean_2x1` and `mobile_4x5` renders, so
 * headlines are set as live type rather than baked into the picture —
 * selectable, translatable, responsive, and readable by a screen reader.
 *
 * The one non-obvious step is the hero crop. The open-box render includes a
 * work mat carrying "Draw: under 1 minute", "Figures to be confirmed by pilot
 * testing" and "Draft wording", plus a Canopy card stating subscription terms.
 * The copy guidance explicitly keeps sub-minute claims off the site until the
 * pilot's draw test passes, and the other two lines are internal review notes.
 * Cropping to the upper band keeps the box and drops all of it.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC =
  process.argv[2] ||
  "C:/The Vault/TMV/The Greenest Thumb/Subsidiaries/Nature's Mastermind/Reference/Sales & Marketing/Claude outputs/Viridian_Website_Images/Viridian_Website_Images";
const OUT = path.join(process.cwd(), "public", "viridian");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/** Photographic sources: JPEG keeps next/image's AVIF pass from stacking
 *  two lossy encodes on top of each other. */
const JPEG = { quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" };

const jobs = [
  {
    in: "banner_clean_2x1/Viridian_web_1_open_banner.jpg",
    out: "hero.jpg",
    // keeps the open box, drops the mat and the Canopy card below it
    crop: { left: 0, top: 0, width: 2400, height: 850 },
  },
  {
    in: "banner_clean_2x1/Viridian_web_2_dock_banner.jpg",
    out: "dock.jpg",
  },
  {
    in: "banner_clean_2x1/Viridian_web_3_closed_banner.jpg",
    out: "closed.jpg",
  },
  {
    in: "mobile_4x5/Viridian_web_1_open_mobile.jpg",
    out: "hero-mobile.jpg",
    // same removal as the desktop hero; the notes are larger and plainer here
    crop: { left: 0, top: 120, width: 1080, height: 660 },
  },
  { in: "mobile_4x5/Viridian_web_2_dock_mobile.jpg", out: "dock-mobile.jpg" },
  { in: "mobile_4x5/Viridian_web_3_closed_mobile.jpg", out: "closed-mobile.jpg" },
];

mkdirSync(OUT, { recursive: true });

for (const job of jobs) {
  let pipe = sharp(path.join(SRC, job.in));
  if (job.crop) pipe = pipe.extract(job.crop);
  const info = await pipe.jpeg(JPEG).toFile(path.join(OUT, job.out));
  console.log(
    `  ${job.out.padEnd(18)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)}  ${kb(info.size).padStart(8)}${job.crop ? "   (cropped)" : ""}`
  );
}

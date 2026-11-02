/**
 * Prepare the Oil Field Supply web assets.
 *
 *   node scripts/make-oilfield-assets.mjs [sourceDir]
 *
 * One render, cut twice. It replaces the nursery flatbed the page borrowed
 * from the BGE set while there was nothing closer — that frame showed the
 * right company and the wrong industry.
 *
 * The headline and intro sit bottom-left over gravel and standing water,
 * which is the darkest quarter of the frame, so the wide cut keeps the
 * figure right of centre and lets that corner stay empty. The horizon band
 * carries the only warm light in the picture and is worth keeping: dropping
 * it to square the crop would lose the dusk entirely.
 *
 * The mobile cut centres the figure rather than the pad. At 4:5 the spread
 * material runs off frame whatever you do, and a person at work reads at
 * phone size where a stain on concrete does not.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC =
  process.argv[2] ||
  "C:/The Vault/TMV/The Greenest Thumb/Subsidiaries/Nature's Mastermind/Reference/Sales & Marketing/Claude outputs/OilField_Website_Images";
const OUT = path.join(process.cwd(), "public", "oil-field");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const JPEG = { quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" };

const jobs = [
  {
    in: "oilfield_spread_dusk.webp",
    out: "spread.jpg",
    // trims a little dead sky; keeps the horizon glow and the whole figure
    crop: { left: 0, top: 58, width: 2000, height: 1000 },
  },
  {
    in: "oilfield_spread_dusk.webp",
    out: "spread-mobile.jpg",
    // 4:5 around the figure and the material leaving their hand
    crop: { left: 560, top: 0, width: 893, height: 1116 },
  },
];

mkdirSync(OUT, { recursive: true });

for (const job of jobs) {
  let pipe = sharp(path.join(SRC, job.in));
  if (job.crop) pipe = pipe.extract(job.crop);
  const info = await pipe.jpeg(JPEG).toFile(path.join(OUT, job.out));
  console.log(
    `  ${job.out.padEnd(20)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)}  ${kb(info.size).padStart(8)}`,
  );
}

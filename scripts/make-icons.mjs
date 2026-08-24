/**
 * Generate the site icon set from the Nature's Mastermind emblem.
 *
 *   node scripts/make-icons.mjs
 *
 * Writes into src/app/, where Next's metadata file conventions pick them up
 * automatically and emit the <link> tags:
 *
 *   favicon.ico     16 / 32 / 48 px, multi-resolution
 *   icon.png        512 px
 *   apple-icon.png  180 px
 *
 * The source emblem sits on a large empty field — the badge occupies barely
 * 60% of the canvas. Scaled straight to 16px that padding leaves a mark about
 * nine pixels across, which is illegible in a browser tab. So the badge is
 * cropped out first and the icon is built from that.
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "public", "logo.jpg");
const OUT = path.join(process.cwd(), "src", "app");

// The emblem's bounding box within the 1024px source, measured off the art.
// Expressed as fractions so a re-exported logo at another resolution still works.
const CROP = { x: 0.191, y: 0.183, size: 0.618 };

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

/**
 * The emblem is two colours and a gradient. Truecolour PNG stores that
 * appallingly — a 512px frame lands at ~340 KB, several times the weight of
 * the hero photograph, for an image that renders at 32 pixels. Quantising to
 * a palette costs nothing visible here and cuts it by an order of magnitude.
 */
const PNG_OPTS = {
  palette: true,
  colours: 128,
  dither: 0.6,
  compressionLevel: 9,
  effort: 10,
};

/**
 * Assemble a multi-resolution .ico.
 *
 * ICO is a directory of images: a 6-byte header, then one 16-byte entry per
 * size, then the payloads. Each payload here is a complete PNG, which every
 * browser and Windows since Vista accepts — and which sharp can produce,
 * where it cannot write ICO directly.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;

  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 encodes 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette count
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function main() {
  const meta = await sharp(SRC).metadata();
  console.log(`source        logo.jpg  ${meta.width}x${meta.height}`);

  const side = Math.round(meta.width * CROP.size);
  const left = Math.round(meta.width * CROP.x);
  const top = Math.round(meta.height * CROP.y);
  console.log(`crop          ${side}x${side} at (${left}, ${top})`);

  mkdirSync(OUT, { recursive: true });

  // One cropped master, resized down for each target.
  const master = () =>
    sharp(SRC).extract({ left, top, width: side, height: side });

  const icon = await master()
    .resize(512, 512, { kernel: "lanczos3" })
    .png(PNG_OPTS)
    .toFile(path.join(OUT, "icon.png"));
  console.log(`write         icon.png        512x512   ${kb(icon.size)}`);

  const apple = await master()
    .resize(180, 180, { kernel: "lanczos3" })
    .png(PNG_OPTS)
    .toFile(path.join(OUT, "apple-icon.png"));
  console.log(`write         apple-icon.png  180x180   ${kb(apple.size)}`);

  // ICO payloads must be RGBA. Next's decoder rejects both indexed-colour
  // PNGs (what PNG_OPTS produces) and plain RGB — and the source is a JPEG
  // with no alpha channel, so ensureAlpha is required even without the
  // palette. At these sizes the truecolour cost is a couple of kilobytes.
  const pngs = [];
  for (const size of [16, 32, 48]) {
    const data = await master()
      .resize(size, size, { kernel: "lanczos3" })
      .ensureAlpha()
      // palette:false must be explicit — passing `effort` alone puts libvips
      // into palette mode, which is what produced the indexed PNGs the
      // decoder rejected.
      .png({ palette: false, compressionLevel: 9 })
      .toBuffer();
    pngs.push({ size, data });
  }

  const ico = buildIco(pngs);
  writeFileSync(path.join(OUT, "favicon.ico"), ico);
  console.log(
    `write         favicon.ico     ${pngs.map((p) => p.size).join("/")}      ${kb(ico.length)}`,
  );
}

main().catch((e) => {
  console.error(`\n${e.message}\n`);
  process.exit(1);
});

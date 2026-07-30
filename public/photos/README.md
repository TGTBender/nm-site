# Photography

Drop originals in this folder. `next/image` handles resizing, format
conversion (AVIF/WebP) and `srcset` generation at build time — so commit the
**largest good version you have** and let the pipeline derive the rest.

## What to shoot

Ranked by how much work each image does on the page. The first two are the
ones that change how the site feels; the rest are useful once those exist.

| # | Shot | Where it goes | Why it matters |
|---|------|---------------|----------------|
| 1 | Truck loaded with drums/supersacks, on site, daylight | Hero background | Replaces the generated treeline. The single highest-impact asset on the site. |
| 2 | Product being unloaded — hands, pallet jack, tailgate | Arc panel ("On the ground") | Proves delivery actually happens. Currently reusing the hero art. |
| 3 | Biochar close-up in hand or scoop | Optional "Why it matters" panel | Shows the product itself. Texture reads well in macro. |
| 4 | Delivery paperwork being signed | Optional, near step 03 | Backs the "documentation on every run" claim visually. |
| 5 | A customer site — nursery rows, garden centre yard | Optional | Puts the buyer in the picture. |

## Shooting notes

A recent phone in good light is genuinely enough here. For a regional
trust-based sale, an authentic photo of your own truck beats a polished
stock image — buyers are asking "will this show up on Tuesday", and real
equipment answers that in a way art direction cannot.

- **Light**: early morning or late afternoon. Overcast is fine and forgiving.
  Avoid harsh midday sun — it blows out the highlights on white trucks and
  buries the drums in hard shadow.
- **Orientation**: shoot **landscape** for the hero and arc panel. Portrait
  crops badly into a full-bleed banner.
- **Headroom**: leave empty space in the frame for type to sit over. The hero
  copy is anchored bottom-left, so keep the lower-left third uncluttered.
- **Resolution**: 2400px on the long edge or better. Don't pre-compress or
  pre-resize — the build does that better, and it can't recover detail you
  already threw away.
- **Format**: JPEG or HEIC straight off the camera is fine.
- **People**: get permission before using anyone's face, staff or customer.

## Wiring a photo in

Hero (`src/app/page.tsx`, the layered `backgroundImage`) — swap the URL:

```
url('/photos/hero-truck.jpg'), radial-gradient(…)
```

The gradient stays as the second layer; if the file is ever missing the
browser skips to it rather than showing a broken image.

Arc panel — change the `src` on the `<Image>` inside `.nm-arc-br`:

```tsx
<Image src="/photos/unloading.jpg" alt="…" fill sizes="(min-width: 768px) 50vw, 100vw" />
```

Keep `sizes` accurate. It's what tells the browser which `srcset` entry to
pull; a wrong value means it downloads a far larger file than it renders.

**Alt text**: describe what is happening, not what the file is. "Supersacks
being unloaded at a nursery in Shreveport" — not "delivery photo".

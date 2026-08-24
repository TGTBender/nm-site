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

## Briefing a photographer

Worth stating explicitly on the day — each of these is free at the shoot and
costs a reshoot afterward.

- **Shoot wider than the final crop.** The same frame gets used at 16:9 for
  the hero and near-square in the arc panel. A tightly-framed shot cannot
  serve both.
- **Deliberate negative space.** Ask for a few frames composed with the
  subject pushed right and the lower-left deliberately empty. That is where
  the headline sits, and it is the hardest thing to fake later.
- **Deliver full-resolution originals**, not web exports. RAW or maximum-
  quality JPEG. Anything already resized or compressed for the web has thrown
  away detail the build would otherwise use.
- **Bracket the exposure** on the hero candidates. The scrim over the hero is
  tuned to a specific tonal range; having a slightly darker and lighter
  version of the same frame makes that adjustment trivial.
- **Get verticals too** where it is cheap. Not needed now, but phone-shaped
  crops are the first thing anyone asks for later.

## Product photography

A separate discipline from the on-site work above, and the site has no
product section yet — so treat these as assets to hold until the layout
exists for them.

- **Consistent background across the whole set.** One surface, one light
  setup. A grid of product shots taken in different conditions reads as a
  jumble no CSS will rescue.
- **Square or croppable to square.** Product grids are square far more often
  than not; leave margin on all four sides.
- **One angle repeated**, not a variety pack. Sameness across the set is what
  makes a grid look designed.
- **Shoot the scale.** A supersack alone is unreadable — a person or pallet
  beside it communicates 1,000 lb instantly.
- **Include the label** on at least one frame per format. It is documentation
  as much as photography.

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

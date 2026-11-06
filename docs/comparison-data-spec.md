# Comparison panel — what each cell needs

What to research before filling `src/content/comparison.ts`. The panel is
hidden until at least one cell has a value, so nothing is published by
leaving this half-done.

Six rows × four columns = 24 cells. The question is the same across a row,
so the work is really six questions asked four ways.

---

## Before anything else: define the four columns

A comparison is only as good as its categories, and three of these four are
genuinely variable. Write a one-line definition for each and keep it in this
file, because every cell in that column has to be true of the thing you
defined — not of the best example of it.

| Column | What needs pinning down |
|---|---|
| **Charged biochar** | Charged with what, at what loading? This is your product, so the definition is yours to set — but it has to match what actually ships. |
| **Raw biochar** | Uncharged, and from what feedstock class? Properties vary widely between woody and herbaceous feedstocks. |
| **Compost** | Feedstock and maturity. Finished yard-waste compost and manure compost are not the same material. |
| **Peat** | Sphagnum peat as sold for horticulture, which is the fair comparison. |

If a column can't be pinned down without a paragraph, it's the wrong column.

---

## What counts as a source

Your Marketing Rulebook asks every claim to trace to citable data. In
descending order of strength:

1. **Your own lab data.** You have it for the bagasse biochar, and two rows
   below can be answered from it directly.
2. **Peer-reviewed literature**, with a DOI. Prefer meta-analyses and
   reviews over single trials.
3. **Standards bodies** — IBI, EBC — for threshold and definitional claims.
4. **Government and extension publications** — USDA, state extension
   services. The USDA EQIP reference your Round 2 notes mention sits here.

**Not acceptable:** another supplier's marketing, Wikipedia, trade-press
summaries without a primary citation, or anything you cannot put a URL or
DOI against.

Record it per row in the `source` field as you go. Reconstructing a citation
six months later is far harder than writing it down now, and a buyer who
asks about one cell will ask about the rest.

---

## Row 1 — Nutrient-loaded on arrival

**Question:** does the material supply plant-available nutrients immediately
on application, without being charged or composted first?

**Format:** `Yes` / `No` / `Partly`, plus a short qualifier where it helps.

| Column | What to establish |
|---|---|
| Charged biochar | What nutrients the charge carries and at roughly what loading. |
| Raw biochar | Expect `No` — and check the nitrogen-immobilisation literature, below. |
| Compost | Likely `Partly`. Nutrients are present but release slowly and NPK is low relative to fertiliser. |
| Peat | Expect `No`. Peat is a physical amendment, close to nutritionally inert. |

**The thing worth finding:** raw biochar can temporarily *immobilise*
nitrogen — microbial draw-down on application, so the first season can show
reduced N availability. It is well documented, it is the sharpest honest
contrast between raw and charged, and it is the single most useful fact in
this row. Find the primary source rather than asserting it.

---

## Row 2 — Carbon persistence in soil

**Question:** how long does carbon added by the material remain in soil
before it mineralises?

**Format:** an order-of-magnitude range — `Months`, `Years`, `Decades`,
`Centuries`. Resist a single number; mean residence time estimates vary by
method and nobody can defend a point value.

| Column | What to establish |
|---|---|
| Charged biochar | Same as raw — the charge does not change the carbon skeleton. |
| Raw biochar | Tie it to H:C ratio, below. |
| Compost | The labile fraction mineralises fast. Months to a few years. |
| Peat | Decades in soil. Worth noting separately that extraction releases carbon that was already stored, which belongs in Row 5 rather than here. |

**You can answer this from data you already hold.** H:C molar ratio is the
IBI's proxy for carbonisation and persistence, with 0.7 as the ceiling. Your
twelve bagasse batches run 0.37–0.61 — comfortably under, and already on the
site in the evidence table directly above this panel. That makes this the
one row where your own lab data is the citation, and it is worth saying so.

---

## Row 3 — Water-holding capacity

**Question:** how much does the material change plant-available water?

**This is the row most likely to produce a claim you cannot defend.** The
effect is strongly dependent on application rate and on the texture of the
soil it goes into — large in sandy soils, small or negligible in clays. A
bare `High` is not a claim anyone can check, and a percentage with no rate
and no soil type attached is worse, because it looks precise.

**Format:** a percentage change **with** the application rate and soil
texture stated, or the honest alternative — `Varies with soil` plus a
qualifier. The second is a perfectly good answer and far safer than a
number that only holds in one trial's conditions.

Note also that **peat performs genuinely well here.** If the research says
so, the cell should say so. A comparison table that has your column winning
every row reads as marketing rather than evidence, and one honest loss buys
credibility for the rows you do win.

---

## Row 4 — Batch documentation

**Question:** does the material typically arrive with laboratory results
traceable to the batch delivered?

**This is your strongest row and the most defensible, but phrase it with
care.** It describes a *supply practice*, not a property of the material.
Compost does not inherently lack documentation; most compost suppliers
simply do not provide it. Write the cells as "typically supplied with…"
rather than as something the material is incapable of.

**Format:** `Yes` for your column; `Varies` or `Rarely` elsewhere, if that
is what the research shows.

**Source:** this one is about market practice rather than soil science, so
look at what suppliers actually publish — standards participation rates
(IBI certification, US Composting Council STA), extension purchasing guides
telling buyers what to ask for. If buyers are routinely advised to request
test results, that tells you they are not routinely given them.

---

## Row 5 — Feedstock

**Question:** what is the material made from, and is the source renewable?

**Format:** a short noun phrase. `Waste biomass`, `Organic waste`,
`Extracted peat bog`.

The strongest contrast on the panel sits here, and it is low-risk because it
is a matter of fact rather than performance: peat is extracted from bogs
that took millennia to form, and extraction is a carbon release as well as a
habitat loss. IUCN and UK Defra have published positions on this. Three of
your four columns are waste-derived; one is mined.

Keep the cells factual and let the contrast do the work. No adjectives.

---

## Row 6 — Re-application

**Question:** how often must it be reapplied to maintain its effect?

**This row is a trap, and the site has already fallen into it once.** The
BGE page previously read *"Biochar doesn't wear off. One application changes
your soil for decades"* and it was pulled, because it conflates two
different things:

- the **carbon** persists for centuries (Row 2), and
- the **nutrient charge** depletes on an ordinary cropping timescale.

A cell saying "once" would reintroduce exactly the claim that was removed.
Whatever the research supports, the honest shape of this answer separates
the two: the amendment stays in the soil, the fertility it carries does not.

**Format:** likely two clauses rather than one word.

---

## Rows you might add

Two more you could answer straight from the bagasse lab data, which makes
them cheap and fully sourced:

- **pH / liming effect.** Your batches run pH 7.59–9.27 with liming value
  4.7–13.8 % CaCO₃. Genuinely useful to a grower deciding on an acid soil,
  and it cuts both ways — which again helps the table read as evidence.
- **Bulk density.** 9.8–22.9 lb/ft³ across your batches. Matters for
  freight and spreading, and your buyers think in truckloads.

Neither is required. Both are free.

---

## Filling it in

In `src/content/comparison.ts`, each row takes:

```ts
{
  attribute: "Nutrient-loaded on arrival",
  note: "Whether it feeds the soil straight away or has to be charged first.",
  cells: ["Yes", "No", "Partly", "No"],   // column order: ours, raw, compost, peat
  source: "…citation or URL…",
}
```

Cells are free text, so `Varies with soil`, `Rarely` and `3–5 years` are all
valid and all better than a tick that overstates. A hedge that is true beats
a confident answer that is not — particularly on a panel sitting directly
beneath a heading that promises every claim has a source.

The section appears on the site as soon as any cell has a value, so fill a
row at a time if that suits, but check the page after the first one lands.

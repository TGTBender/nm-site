/**
 * ZIP prefixes Nature's Mastermind currently delivers to.
 *
 * NOTE: this list makes a delivery promise to strangers on the contact
 * page, so it should be audited against the real service area rather
 * than assumed. Carried over verbatim from the original site; 750–753
 * reach into the Dallas–Fort Worth metro, which is a long haul from
 * Shreveport, and 715 / 719 are worth confirming.
 */
export const ARK_LA_TEX_PREFIXES = [
  "710",
  "711",
  "712",
  "713",
  "714",
  "715",
  "716",
  "717",
  "718",
  "719",
  "750",
  "751",
  "752",
  "753",
  "754",
  "755",
  "756",
  "757",
  "758",
  "759",
] as const;

export type ZipCheck = "in" | "out" | "invalid";

export function checkZip(zip: string): ZipCheck {
  if (!/^\d{5}$/.test(zip)) return "invalid";
  return ARK_LA_TEX_PREFIXES.includes(
    zip.slice(0, 3) as (typeof ARK_LA_TEX_PREFIXES)[number],
  )
    ? "in"
    : "out";
}

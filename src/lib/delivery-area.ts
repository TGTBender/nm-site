/**
 * ZIP prefixes Nature's Mastermind currently delivers to.
 *
 * The region name was removed from the site while the business moves
 * from one territory to brokerage. THE LIST ITSELF IS UNCHANGED — which
 * ZIPs are actually served is a delivery commitment, not copy, so it is
 * the founder's to set rather than mine to widen along with the wording.
 *
 * NOTE, still open: this list makes a delivery promise to strangers on
 * the contact page, so it should be audited against the real service
 * area rather than assumed. It was carried over verbatim from the
 * original site; 750–753 reach into the Dallas–Fort Worth metro, and
 * 715 / 719 are worth confirming.
 */
export const SERVICE_AREA_PREFIXES = [
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
  return SERVICE_AREA_PREFIXES.includes(
    zip.slice(0, 3) as (typeof SERVICE_AREA_PREFIXES)[number],
  )
    ? "in"
    : "out";
}

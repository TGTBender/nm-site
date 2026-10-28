/**
 * Social links.
 *
 * Every platform listed renders its mark. A platform with a `url` renders as
 * a real link; one without renders as a non-interactive mark instead, so the
 * footer is visually complete before the accounts are connected and nothing
 * on the page is a dead link.
 *
 * Adding a URL upgrades that mark to a link with no other change.
 */

export type Social = { name: string; url: string };

export const SOCIALS: Social[] = [
  { name: "Instagram", url: "" },
  { name: "TikTok", url: "" },
  { name: "Facebook", url: "" },
  { name: "LinkedIn", url: "" },
  { name: "YouTube", url: "" },
];

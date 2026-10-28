/**
 * Social links.
 *
 * Add the real profile URL to a platform and its icon appears in the footer.
 * Leave `url` empty and it is skipped entirely — an icon that links nowhere
 * is worse than no icon.
 */

export type Social = { name: string; url: string };

export const SOCIALS: Social[] = [
  { name: "Instagram", url: "" },
  { name: "TikTok", url: "" },
  { name: "Facebook", url: "" },
  { name: "LinkedIn", url: "" },
  { name: "YouTube", url: "" },
];

export const ACTIVE_SOCIALS = SOCIALS.filter((s) => s.url.trim().length > 0);

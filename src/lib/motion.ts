/**
 * Shared motion values.
 *
 * easeOutQuart is the site's one curve and mirrors --ease-out-quart in
 * globals.css — keep the two in step. It lived in five page components
 * independently, which meant changing the curve in one silently desynced
 * the others.
 */
export const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/**
 * The standard section reveal. Distances stay small on purpose: the point
 * is to feel authored, not to announce itself.
 */
export const reveal = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.75, ease: EASE, delay },
  }) as const;

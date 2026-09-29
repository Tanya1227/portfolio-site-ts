// Shared motion tokens. One curve and one reveal recipe so every section
// enters the same way, instead of each file redefining its own EASE.

// Strong ease-out: fast start, long settle. Built-in CSS easings are too weak for UI.
export const EASE_OUT = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];

// Snappy, lightly bouncy spring for layout/indicator moves.
export const SPRING_SNAPPY = { type: 'spring', duration: 0.45, bounce: 0.15 };

export const REVEAL_DISTANCE = 16;
export const REVEAL_STAGGER = 0.06;

/**
 * Props for a scroll-into-view reveal. Spread onto a motion element:
 *   <motion.div {...reveal(index * REVEAL_STAGGER)} />
 * Opacity + a short translate only - no scale(0), no layout properties.
 */
export function reveal(delay = 0, { distance = REVEAL_DISTANCE, amount = 0.25 } = {}) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  };
}

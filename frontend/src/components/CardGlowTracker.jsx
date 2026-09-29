import { useEffect, useRef } from 'react';
import { applyGlowWithRect, clearGlow } from '@/lib/borderGlow';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function CardGlowTracker() {
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, target: null });
  const activeCardRef = useRef(null);
  const activeRectRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    // getBoundingClientRect() forces a layout read - only call it when the
    // hovered card changes, not on every pointermove frame while inside it.
    const consumeFrame = () => {
      rafRef.current = null;
      const { x, y, target } = pointerRef.current;
      const card = target instanceof Element ? target.closest('.surface-card') : null;

      if (card) {
        if (card !== activeCardRef.current) {
          if (activeCardRef.current) clearGlow(activeCardRef.current);
          activeCardRef.current = card;
          activeRectRef.current = card.getBoundingClientRect();
        }
        applyGlowWithRect(card, activeRectRef.current, x, y);
      } else if (activeCardRef.current) {
        clearGlow(activeCardRef.current);
        activeCardRef.current = null;
        activeRectRef.current = null;
      }
    };

    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, target: event.target };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(consumeFrame);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (activeCardRef.current) clearGlow(activeCardRef.current);
    };
  }, [prefersReducedMotion]);

  return null;
}

export default CardGlowTracker;

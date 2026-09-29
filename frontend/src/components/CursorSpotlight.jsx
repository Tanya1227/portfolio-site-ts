import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function CursorSpotlight() {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const handleChange = (event) => setCanHover(event.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !canHover) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const consumeFrame = () => {
      rafRef.current = null;
      el.style.setProperty('--spot-x', `${pointerRef.current.x}px`);
      el.style.setProperty('--spot-y', `${pointerRef.current.y}px`);
    };

    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(consumeFrame);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, canHover]);

  if (prefersReducedMotion || !canHover) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{
        background:
          'radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 30%), rgba(255,255,255,0.35), transparent 70%)',
      }}
    />
  );
}

export default CursorSpotlight;

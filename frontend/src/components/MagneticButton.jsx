import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

export function MagneticButton({
  as = 'button',
  className,
  children,
  strength = 0.25,
  radius = 24,
  disabled = false,
  ...props
}) {
  const { ref, style, handlers } = useMagnetic({ strength, radius, disabled });
  const glowRef = useRef(null);
  // Memoized: motion.create() returns a new component type each call, and an
  // unmemoized call here would give React a new component identity every
  // render, remounting the underlying DOM node instead of updating it.
  const MotionComponent = useMemo(() => motion.create(as), [as]);

  const handleMouseMove = (event) => {
    handlers.onMouseMove(event);
    const el = glowRef.current;
    if (!el) return;
    const rect = event.currentTarget.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <MotionComponent
      ref={ref}
      className={cn('group relative inline-flex items-center justify-center overflow-hidden glass-press', className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      {...props}
    >
      <span
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(140px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35), transparent 70%)',
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </MotionComponent>
  );
}

export default MagneticButton;

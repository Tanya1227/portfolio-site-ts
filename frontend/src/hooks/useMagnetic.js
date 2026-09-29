import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagnetic({ strength = 0.25, radius = 24, disabled = false } = {}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMouseMove = (event) => {
    if (disabled || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const relX = event.clientX - (bounds.left + bounds.width / 2);
    const relY = event.clientY - (bounds.top + bounds.height / 2);
    const clampedX = Math.max(-radius, Math.min(radius, relX * strength));
    const clampedY = Math.max(-radius, Math.min(radius, relY * strength));
    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: disabled ? {} : { x: springX, y: springY },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

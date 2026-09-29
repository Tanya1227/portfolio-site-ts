import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export function useTilt({ max = 10, disabled = false } = {}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 230, damping: 23 });
  const springY = useSpring(y, { stiffness: 230, damping: 23 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-max, max]);

  const handleMouseMove = (event) => {
    if (disabled || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width - 0.5);
    y.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: disabled ? {} : { rotateX, rotateY, transformPerspective: 1000 },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

import { forwardRef, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/motion';


export const RippleSurface = forwardRef(function RippleSurface(
  { as: Component = 'div', className, onClick, children, ...props },
  ref
) {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = Date.now() + Math.random();

      setRipples((prev) => [...prev, { id, x, y, size }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.(event);
    },
    [onClick]
  );

  return (
    <Component ref={ref} className={cn('relative overflow-hidden', className)} onClick={handleClick} {...props}>
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-ink-900/10"
            style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
});

export default RippleSurface;

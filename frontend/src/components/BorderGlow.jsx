import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { applyGlow, clearGlow } from '@/lib/borderGlow';

export function BorderGlow({ as: Component = 'div', className, animated = false, children, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    applyGlow(ref.current, event.clientX, event.clientY);
  };

  const handleMouseLeave = () => {
    if (ref.current) clearGlow(ref.current);
  };

  return (
    <Component
      ref={ref}
      className={cn('border-glow', animated && 'border-glow-animated', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}

export default BorderGlow;

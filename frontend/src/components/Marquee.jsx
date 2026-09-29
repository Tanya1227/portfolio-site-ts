import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export function Marquee({ children, speed = 34, className, trackClassName }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={cn('marquee-viewport overflow-hidden', className)}>
      <div
        className={cn('marquee-track', trackClassName)}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: prefersReducedMotion ? 'paused' : 'running',
        }}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;

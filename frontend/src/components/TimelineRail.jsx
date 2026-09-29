import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

import { useCanHover } from '@/hooks/useCanHover';
import { EASE_OUT } from '@/lib/motion';

export function TimelineRail({ items, gradientId, gradientStops, getIcon }) {
  const canHover = useCanHover();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 85%', 'end 65%'] });

  return (
    <div ref={containerRef} className="relative pl-14 sm:pl-16">
      <svg
        className="absolute left-4 top-0 h-full w-[2px] sm:left-5"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            {gradientStops.map((stop) => (
              <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
        <line x1="1" y1="0" x2="1" y2="100" stroke="var(--color-ink-100)" strokeWidth="2" />
        <motion.line x1="1" y1="0" x2="1" y2="100" stroke={`url(#${gradientId})`} strokeWidth="2" style={{ pathLength: scrollYProgress }} />
      </svg>

      <div className="flex flex-col gap-6">
        {items.map((item, index) => {
          const Icon = getIcon(index);
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.06 }}
              whileHover={canHover ? { y: -3 } : undefined}
              data-testid={item.testId}
              className="surface-card rounded-card relative p-6"
            >
              <span className="icon-badge absolute -left-[52px] top-6 hidden sm:flex">
                <Icon className="h-5 w-5 text-ink-900" aria-hidden="true" strokeWidth={1.75} />
              </span>
              {item.content}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default TimelineRail;

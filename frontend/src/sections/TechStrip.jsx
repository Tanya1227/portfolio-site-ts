import { motion } from 'framer-motion';
import { ALL_SKILLS } from '@/data/resume';
import { Marquee } from '@/components/Marquee';
import { useTilt } from '@/hooks/useTilt';
import { slugify } from '@/lib/utils';

function TechPill({ label }) {
  const { ref, style, handlers } = useTilt({ max: 12 });

  return (
    <motion.span
      ref={ref}
      {...handlers}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      data-testid={`tech-pill-${slugify(label)}`}
      className="tech-pill rounded-pill mx-2 inline-flex items-center px-4 py-2 font-mono text-xs font-semibold text-ink-900"
    >
      {label}
    </motion.span>
  );
}

export function TechStrip() {
  const items = ALL_SKILLS;

  return (
    <section aria-label="Technology stack" className="relative py-10">
      <Marquee speed={34}>
        {items.map((item) => (
          <TechPill key={item} label={item} />
        ))}
      </Marquee>
    </section>
  );
}

export default TechStrip;

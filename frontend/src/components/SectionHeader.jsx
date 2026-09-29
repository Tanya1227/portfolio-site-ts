import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/motion';

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 14, rotateX: -14 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', duration: 0.6, bounce: 0.15 } },
};

export function SectionHeader({ eyebrow, title, description, className }) {
  const words = title.split(' ');

  return (
    <motion.div
      className={cn('flex flex-col items-center text-center mb-12 sm:mb-16', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={headerVariants}
    >
      <motion.p
        variants={fadeVariants}
        className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-500 mb-4"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={headerVariants}
        className="glass-heading font-display font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)]"
        style={{ perspective: 800 }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: i < words.length - 1 ? '0.28em' : 0 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      {description ? (
        <motion.p variants={fadeVariants} className="max-w-xl mt-4 text-base text-ink-500 sm:text-lg">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export default SectionHeader;

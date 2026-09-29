import { ALL_SKILLS, RESUME } from '@/data/resume';
import { Marquee } from '@/components/Marquee';
import { cn } from '@/lib/utils';

export function StatementMarquee() {
  const { title } = RESUME.profile;
  const words = [title, ...ALL_SKILLS];

  return (
    <section aria-hidden="true" className="relative py-16 sm:py-20">
      <Marquee speed={90}>
        {words.map((word, i) => (
          <span
            key={word}
            className={cn(
              'mx-6 font-display text-3xl font-bold sm:text-5xl lg:text-6xl',
              i % 2 === 0 ? 'text-ink-900/70' : 'text-[#a78bfa]/45'
            )}
          >
            {word}
            <span className="mx-6 text-[#c084fc]/70">✦</span>
          </span>
        ))}
      </Marquee>
      <div className="hairline mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8" />
    </section>
  );
}

export default StatementMarquee;

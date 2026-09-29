import { GraduationCap } from 'lucide-react';
import { RESUME } from '@/data/resume';
import { SectionHeader } from '@/components/SectionHeader';
import { TimelineRail } from '@/components/TimelineRail';
import { slugify } from '@/lib/utils';

export function Education() {
  const items = RESUME.education.map((entry) => ({
    key: entry.institution + entry.period,
    testId: `education-item-${slugify(entry.institution)}`,
    content: (
      <>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-base font-semibold text-ink-900">{entry.institution}</p>
          <p className="font-mono text-xs text-ink-500">{entry.period}</p>
        </div>
        <p className="mt-1 text-sm text-ink-700">{entry.degree}</p>
        <p className="mt-1 text-xs text-ink-500">{entry.location}</p>
      </>
    ),
  }));

  return (
    <section id="education" className="relative py-20 sm:py-28 lg:py-32" data-testid="section-education">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="06 - Education" title="Education" description="The academic foundation behind the engineering." />

        <TimelineRail
          items={items}
          gradientId="education-gradient"
          gradientStops={[
            { offset: '0%', color: 'var(--color-wash-sky)' },
            { offset: '100%', color: 'var(--color-wash-mint)' },
          ]}
          getIcon={() => GraduationCap}
        />
      </div>
    </section>
  );
}

export default Education;

import { Award, BadgeCheck, ShieldCheck } from 'lucide-react';
import { RESUME } from '@/data/resume';
import { SectionHeader } from '@/components/SectionHeader';
import { TimelineRail } from '@/components/TimelineRail';
import { slugify } from '@/lib/utils';

const ICONS = [Award, ShieldCheck, BadgeCheck];

export function Certifications() {
  const items = RESUME.certifications.map((cert) => ({
    key: cert.name,
    testId: `certification-item-${slugify(cert.name)}`,
    content: (
      <>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-base font-semibold text-ink-900">{cert.name}</p>
          {cert.period ? <p className="font-mono text-xs text-ink-500">{cert.period}</p> : null}
        </div>
        <p className="mt-1 text-sm text-ink-500">{cert.issuer}</p>
        {cert.points.length ? (
          <ul className="mt-3 flex flex-col gap-1.5">
            {cert.points.map((point) => (
              <li key={point} className="text-sm leading-relaxed text-ink-700">
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </>
    ),
  }));

  return (
    <section id="certifications" className="relative py-20 sm:py-28 lg:py-32" data-testid="section-certifications">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="05 - Certifications"
          title="Certifications"
          description="Credentials, awards, and recognitions earned along the way."
        />

        <TimelineRail
          items={items}
          gradientId="certifications-gradient"
          gradientStops={[
            { offset: '0%', color: 'var(--color-wash-peach)' },
            { offset: '50%', color: 'var(--color-wash-lavender)' },
            { offset: '100%', color: 'var(--color-wash-mint)' },
          ]}
          getIcon={(index) => ICONS[index % ICONS.length]}
        />
      </div>
    </section>
  );
}

export default Certifications;

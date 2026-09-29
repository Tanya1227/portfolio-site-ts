import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import { RESUME } from '@/data/resume';
import { SectionHeader } from '@/components/SectionHeader';
import { ContactRow } from '@/components/ContactRow';
import { useTilt } from '@/hooks/useTilt';
import { slugify } from '@/lib/utils';
import { reveal, REVEAL_STAGGER } from '@/lib/motion';


function MetricTile({ value, label, index }) {
  return (
    <motion.div
      {...reveal(index * REVEAL_STAGGER, { amount: 0.4 })}
      data-testid={`about-metric-${slugify(label)}`}
      className="surface-card group relative overflow-hidden rounded-card p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-wash-lavender/0 blur-2xl transition-colors duration-500 group-hover:bg-wash-lavender/70"
      />
      <p className="relative font-display text-3xl font-bold tabular-nums text-ink-900">{value}</p>
      <p className="relative mt-2 text-xs uppercase tracking-[0.16em] text-ink-500">{label}</p>
    </motion.div>
  );
}

export function About() {
  const { profile, summary, currently, coreFocus, metrics } = RESUME;
  const { ref: profileRef, style: profileStyle, handlers: profileHandlers } = useTilt({ max: 5 });

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32" data-testid="section-about">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="01 - About"
          title="Professional Summary"
          description="A snapshot of how I build — the stack, the focus, and what I'm working on right now."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.div
            ref={profileRef}
            {...profileHandlers}
            style={{ ...profileStyle, transformStyle: 'preserve-3d' }}
            {...reveal(0, { amount: 0.3 })}
            className="surface-card rounded-card p-6 sm:p-7 lg:col-span-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-surface-0">
                {profile.initials}
              </div>
              <div>
                <p className="font-display text-base font-semibold text-ink-900">{profile.name}</p>
                <p className="font-mono text-xs text-ink-500">{profile.title}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-1">
              <ContactRow prefix="about-contact" icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactRow prefix="about-contact" icon={Linkedin} label="LinkedIn" value="tanya-singh" href={profile.linkedin} />
              <ContactRow
                prefix="about-contact"
                icon={Phone}
                label="Phone"
                value={profile.phone}
                href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
              />
              <ContactRow prefix="about-contact" icon={MapPin} label="Location" value={profile.location} href="#contact" />
            </div>
          </motion.div>

          <motion.div
            {...reveal(REVEAL_STAGGER * 1.5, { amount: 0.3 })}
            className="surface-card rounded-card p-6 sm:p-8 lg:col-span-8"
          >
            <p className="max-w-prose text-base leading-relaxed text-ink-700 sm:text-lg">{summary}</p>

            <div className="hairline my-8" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Currently</p>
                <p className="mt-2 text-sm text-ink-900">{currently}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Location</p>
                <p className="mt-2 text-sm text-ink-900">{profile.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Core Focus</p>
                <p className="mt-2 text-sm text-ink-900">{coreFocus}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricTile key={metric.label} {...metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;

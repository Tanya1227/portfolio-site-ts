import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { RESUME } from '@/data/resume';
import { HERO } from '@/constants/testIds/home';
import { scrollToSection } from '@/hooks/useLenis';
import { useFontsReady } from '@/hooks/useFontsReady';
import { MagneticButton } from '@/components/MagneticButton';
import { ProfileCard } from '@/components/ProfileCard';
import { EASE_IN_OUT, EASE_OUT } from '@/lib/motion';


export function Hero() {
  const sectionRef = useRef(null);
  const fontsReady = useFontsReady();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.94]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.12]);
  const avatarY = useTransform(scrollYProgress, [0, 0.7], [0, -30]);

  const { profile } = RESUME;
  const nameWords = profile.name.split(' ');
  let charIndex = -1;

  // Staged entrance for the non-name content. Gated on fonts so nothing shifts mid-reveal.
  const enter = (delay) => ({
    initial: { opacity: 0, y: 12 },
    animate: fontsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  });

  const goTo = (id) => (event) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <section id="hero" ref={sectionRef} className="relative h-[120vh]" data-testid="section-hero">
      <div className="sticky top-20 z-10 mx-auto max-w-[1308px] px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-card border border-ink-100 bg-surface-0/55 shadow-card">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-card">
            <div className="absolute inset-0 bg-hero-wash opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-0/70" />
          </div>

          <motion.div
            style={{ opacity: contentOpacity, scale: contentScale }}
            className="relative grid grid-cols-1 gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-24"
          >
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div
                {...enter(0)}
                data-testid={HERO.availabilityPill}
                className="glass-chip rounded-pill mb-8 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-ink-700"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability}
              </motion.div>

              <motion.p {...enter(0.06)} className="text-2xl font-normal text-ink-500 sm:text-4xl">
                Hi, I&apos;m
              </motion.p>

              <h1
                aria-label={profile.name}
                className="glass-heading glass-heading-hero mt-1 text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl xl:text-8xl"
              >
                {nameWords.map((word, wi) => (
                  <span key={word + wi}>
                    <span className="inline-block whitespace-nowrap" aria-hidden="true">
                      {word.split('').map((char) => {
                        charIndex += 1;
                        const delay = charIndex * 0.035;
                        return (
                          <motion.span
                            key={charIndex}
                            initial={{ opacity: 0, y: 16 }}
                            animate={fontsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.7, delay }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                    {wi < nameWords.length - 1 ? ' ' : null}
                  </span>
                ))}
              </h1>

              <motion.p {...enter(0.45)} className="max-w-content mt-6 text-lg text-ink-500">
                {profile.tagline}
              </motion.p>

              <motion.div {...enter(0.55)} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <MagneticButton
                  as="a"
                  href="#projects"
                  onClick={goTo('projects')}
                  data-testid={HERO.primaryCta}
                  className="glass-button-dark cta-shimmer focus-neon rounded-pill px-6 py-3 text-sm font-medium text-white"
                >
                  View Projects
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#contact"
                  onClick={goTo('contact')}
                  data-testid={HERO.secondaryCta}
                  className="glass-chip focus-neon rounded-pill px-6 py-3 text-sm font-medium text-ink-900"
                >
                  Get in Touch
                </MagneticButton>
              </motion.div>
            </div>

            <motion.div
              style={{ scale: avatarScale, y: avatarY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <ProfileCard />
            </motion.div>
          </motion.div>

          <div className="relative flex flex-col items-center justify-between gap-4 border-t border-ink-100 px-6 py-6 sm:flex-row sm:px-10 lg:px-16">
            <p className="font-mono text-xs text-ink-500">{profile.location}</p>
            <button
              type="button"
              data-testid={HERO.scrollCta}
              onClick={goTo('about')}
              className="focus-neon link-underline inline-flex items-center gap-2 font-mono text-xs text-ink-500"
            >
              Scroll to explore
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: EASE_IN_OUT }}>
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

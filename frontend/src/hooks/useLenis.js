import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

let lenisInstance = null;

export function scrollToSection(id, options = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -88, duration: 1.1, ...options });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function useLenis() {
  // Scroll restoration is handled by an inline script in public/index.html,
  // which runs before React mounts (and before any whileInView observer
  // attaches) - see that file for why it can't live in a React effect.
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisInstance = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [prefersReducedMotion]);
}

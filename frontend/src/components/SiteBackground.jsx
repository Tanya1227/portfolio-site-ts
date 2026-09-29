import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EASE_OUT } from '@/lib/motion';

const LiquidEther = lazy(() => import('./LiquidEther'));

function checkCapability() {
  if (typeof window === 'undefined') return false;
  const hoverFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wideEnough = window.matchMedia('(min-width: 1024px)').matches;
  const saveData = navigator.connection?.saveData === true;
  const cores = navigator.hardwareConcurrency || 0;
  return hoverFine && wideEnough && !saveData && cores > 4;
}

export function SiteBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldMount, setShouldMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !checkCapability()) return undefined;

    setShouldMount(true);

    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
    } else {
      idleId = window.setTimeout(() => setReady(true), 300);
    }

    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
      <div className="site-bg-wash absolute inset-0" />

      {shouldMount && ready && (
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B497CF']}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={30}
              iterationsViscous={8}
              iterationsPoisson={12}
              resolution={0.3}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </motion.div>
        </Suspense>
      )}
    </div>
  );
}

export default SiteBackground;

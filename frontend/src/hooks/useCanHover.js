import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

/**
 * True only on devices with a real hovering pointer. Touch devices fire
 * :hover on tap and leave it stuck, so JS-driven hover motion (framer's
 * whileHover) is gated on this. CSS hover is handled by Tailwind's
 * `future.hoverOnlyWhenSupported`.
 */
export function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setCanHover(mq.matches);
    const handleChange = (event) => setCanHover(event.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return canHover;
}

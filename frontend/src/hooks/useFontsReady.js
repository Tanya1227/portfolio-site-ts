import { useEffect, useState } from 'react';

/**
 * True once the page's web fonts have finished loading (or immediately if the
 * Font Loading API isn't available). Gate position-sensitive mount animations
 * on this - otherwise a font swap mid-animation shifts glyph widths under
 * already-animating inline-block spans, making the reveal visibly jump.
 */
export function useFontsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) {
      setReady(true);
      return undefined;
    }

    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    document.fonts.ready.then(markReady).catch(markReady);

    // Safety net in case a stalled font request keeps fonts.ready from ever resolving.
    const timeoutId = window.setTimeout(markReady, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return ready;
}

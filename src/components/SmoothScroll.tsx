'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;

    const syncDialog = () => {
      if (!lenis) return;
      const locked = document.body.style.overflow === 'hidden';
      if (locked && !lenis.isStopped) lenis.stop();
      if (!locked && lenis.isStopped) lenis.start();
    };

    const syncPreference = () => {
      if (preference.matches) {
        lenis?.destroy();
        lenis = undefined;
      } else if (!lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.16,
          smoothWheel: true,
          syncTouch: false,
          anchors: true,
          stopInertiaOnNavigate: true,
        });
        syncDialog();
      }
    };

    const observer = new MutationObserver(syncDialog);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    preference.addEventListener('change', syncPreference);
    syncPreference();

    return () => {
      observer.disconnect();
      preference.removeEventListener('change', syncPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}

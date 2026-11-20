import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface UseLenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Custom hook to initialize Lenis smooth scrolling and synchronize with GSAP ScrollTrigger.
 */
export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: options.lerp ?? 0.08,
      duration: options.duration ?? 1.2,
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger recalculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, [options.duration, options.lerp, options.smoothWheel]);

  return lenisRef;
}

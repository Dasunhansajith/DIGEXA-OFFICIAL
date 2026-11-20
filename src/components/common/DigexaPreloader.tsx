import React, { useRef, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import digexaLogoDark from '@/assets/digexa-logo-dark-trimmed.png';

interface LetterConfig {
  id: string;
  char: string;
  clipPath: string;
}

// Letter boundaries accurately calibrated to the 340x82 original DIGEXA artwork
const LETTERS: LetterConfig[] = [
  { id: 'A', char: 'a', clipPath: 'inset(0% 0% 0% 86.0%)' },
  { id: 'X', char: 'x', clipPath: 'inset(0% 13.82% 0% 75.29%)' },
  { id: 'E', char: 'e', clipPath: 'inset(0% 24.71% 0% 62.35%)' },
  { id: 'G', char: 'g', clipPath: 'inset(0% 37.65% 0% 48.82%)' },
  { id: 'I', char: 'i', clipPath: 'inset(0% 51.18% 0% 45.00%)' },
  { id: 'D', char: 'D', clipPath: 'inset(0% 55.00% 0% 27.94%)' },
  { id: 'Mark', char: 'mark', clipPath: 'inset(0% 72.06% 0% 0%)' },
];

export const DigexaPreloader: React.FC = () => {
  const location = useLocation();

  // Navigation tracking
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [mode, setMode] = useState<'full' | 'route' | 'idle'>('full');
  const [isVisible, setIsVisible] = useState(true);

  const isInitialMountRef = useRef(true);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // DOM refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLImageElement | null)[]>([]);
  const fullLogoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Synchronous path change detection to prevent any frame flash on navigation
  if (location.pathname !== currentPath) {
    setCurrentPath(location.pathname);
    if (!isInitialMountRef.current) {
      setMode('route');
      setIsVisible(true);
    }
  }

  // Handle Full Page Load vs Route Navigation transitions
  useLayoutEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock page scrolling & stop Lenis while preloader overlay is active
    document.body.style.overflow = 'hidden';
    if (window.__lenis) {
      window.__lenis.stop();
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Cancel any previous active timeline
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Cleanup and completion handler
    const finishPreloader = () => {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setIsVisible(false);
      setMode('idle');
      isInitialMountRef.current = false;
    };

    if (prefersReducedMotion) {
      const timer = setTimeout(finishPreloader, mode === 'full' ? 400 : 200);
      return () => clearTimeout(timer);
    }

    // -------------------------------------------------------------
    // MODE 1: FULL PAGE LOAD / REFRESH (~2.2s total duration)
    // Reverse letter reveal: A -> X -> E -> G -> I -> D -> Mark
    // With glowing red spark orbiting continuously
    // -------------------------------------------------------------
    if (mode === 'full') {
      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });
      activeTimelineRef.current = tl;

      // Initial state
      gsap.set(overlay, { opacity: 1 });
      gsap.set(letterRefs.current, { opacity: 0, scale: 0.96 });
      if (fullLogoRef.current) gsap.set(fullLogoRef.current, { opacity: 0 });
      if (glowRef.current) gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      const LETTER_START = 0.15;
      const STEP_DURATION = 0.22;

      // Sequential letter reveals: A -> X -> E -> G -> I -> D -> Mark
      letterRefs.current.forEach((el, index) => {
        if (!el) return;
        const startTime = LETTER_START + index * STEP_DURATION;

        tl.to(
          el,
          {
            opacity: 1,
            scale: 1,
            duration: 0.12,
            ease: 'power3.out',
          },
          startTime
        );
      });

      // Complete logo takeover & ambient aura
      const completeTime = LETTER_START + (LETTERS.length - 1) * STEP_DURATION + 0.12; // ~1.59s

      if (fullLogoRef.current) {
        tl.to(
          fullLogoRef.current,
          {
            opacity: 1,
            duration: 0.08,
            ease: 'none',
          },
          completeTime
        );
      }

      if (glowRef.current) {
        tl.to(
          glowRef.current,
          {
            opacity: 0.45,
            scale: 1.15,
            duration: 0.35,
            ease: 'power2.out',
          },
          completeTime - 0.05
        );
      }

      // Hold complete logo briefly, then smooth fade-out (1.85s -> 2.20s)
      const fadeOutStart = completeTime + 0.26; // ~1.85s

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        },
        fadeOutStart
      );

      return () => {
        tl.kill();
        document.body.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
      };
    }

    // -------------------------------------------------------------
    // MODE 2: INTERNAL ROUTE NAVIGATION (~0.75s total duration)
    // Instant complete logo display + orbiting spark -> quick reveal
    // -------------------------------------------------------------
    if (mode === 'route') {
      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });
      activeTimelineRef.current = tl;

      // Immediate complete logo display
      gsap.set(overlay, { opacity: 1 });
      gsap.set(letterRefs.current, { opacity: 1, scale: 1 });
      if (fullLogoRef.current) gsap.set(fullLogoRef.current, { opacity: 1 });
      if (glowRef.current) gsap.set(glowRef.current, { opacity: 0.35, scale: 1 });

      // Hold complete logo with orbiting spark (~0.45s), then smooth fade out (0.30s)
      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.30,
          ease: 'power2.inOut',
        },
        0.45
      );

      return () => {
        tl.kill();
        document.body.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
      };
    }
  }, [isVisible, mode, currentPath]);

  // If not visible and not animating, unmount overlay
  if (!isVisible && mode === 'idle') {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading DIGEXA"
      className="fixed inset-0 z-[99999] w-full h-[100dvh] bg-black flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      style={{ height: '100dvh', backgroundColor: '#000000' }}
    >
      {/* 
        Inline CSS keyframes for butter-smooth GPU-accelerated clockwise orbit.
        Decoupled from JS thread for continuous 60/120fps rotation on all devices.
      */}
      <style>{`
        @keyframes digexa-spark-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Centered Logo & Orbit System Container */}
      <div className="relative w-[190px] h-[190px] md:w-[260px] md:h-[260px] flex items-center justify-center">
        {/* 
          Orbiting Red Spark SVG Overlay
          ViewBox: 0 0 260 260
          Center: (130, 130), Radius: 120
          Spark color: #E50914 with brilliant white core
          Smooth clockwise circular motion with thin fading red trail
          Orbits completely outside the logo letters with zero intersection
        */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 260 260"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* Fading red trail gradient along the arc chord */}
            <linearGradient
              id="digexa-spark-trail"
              gradientUnits="userSpaceOnUse"
              x1="21.24"
              y1="79.29"
              x2="130"
              y2="10"
            >
              <stop offset="0%" stopColor="#E50914" stopOpacity="0" />
              <stop offset="30%" stopColor="#E50914" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#E50914" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#E50914" stopOpacity="1" />
            </linearGradient>

            {/* Subtle glow filter for the spark */}
            <filter id="digexa-spark-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Continuously rotating group with clockwise spin */}
          <g
            style={{
              transformOrigin: '130px 130px',
              animation: 'digexa-spark-orbit 1.5s linear infinite',
            }}
          >
            {/* Thin, elegant fading trail behind the spark (-65deg arc) */}
            <path
              d="M 21.24 79.29 A 120 120 0 0 1 130 10"
              stroke="url(#digexa-spark-trail)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Glowing red outer halo */}
            <circle
              cx="130"
              cy="10"
              r="7"
              fill="#E50914"
              opacity="0.35"
              filter="url(#digexa-spark-glow)"
            />

            {/* Vibrant #E50914 spark corona */}
            <circle
              cx="130"
              cy="10"
              r="4"
              fill="#E50914"
              opacity="0.95"
              filter="url(#digexa-spark-glow)"
            />

            {/* Crisp white spark core */}
            <circle cx="130" cy="10" r="2" fill="#FFFFFF" />
          </g>
        </svg>

        {/* 
          Compact Centered DIGEXA Logo:
          Desktop: width 210px (fits 200–230px requirement)
          Mobile: width 150px (fits 140–170px requirement)
          Aspect ratio: 340 / 82
        */}
        <div className="relative w-[150px] md:w-[210px] aspect-[340/82] flex items-center justify-center z-10">
          {/* Subtle atmospheric ambient glow behind the logo */}
          <div
            ref={glowRef}
            className="absolute inset-0 -m-8 rounded-full bg-[#E50914]/20 blur-[30px] pointer-events-none"
          />

          {/* 
            Sequential Letter Layers:
            Exact original DIGEXA logo artwork rendered in identical position with distinct clip-paths.
            Order: A -> X -> E -> G -> I -> D -> Logo Mark
          */}
          {LETTERS.map((item, index) => (
            <img
              key={item.id}
              ref={(el) => {
                letterRefs.current[index] = el;
              }}
              src={digexaLogoDark}
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                clipPath: item.clipPath,
                WebkitClipPath: item.clipPath,
              }}
            />
          ))}

          {/* Complete Unclipped Logo (takes over seamlessly for finale display and route transitions) */}
          <img
            ref={fullLogoRef}
            src={digexaLogoDark}
            alt="DIGEXA"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DigexaPreloader;

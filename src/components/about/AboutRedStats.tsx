import React, { useEffect, useRef, useState } from 'react';

export const AboutRedStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    employees: 0,
    satisfaction: 0,
    frameworks: 0,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // 1. Accessibility: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts({
        years: 3,
        projects: 50,
        employees: 20,
        satisfaction: 100,
        frameworks: 15,
      });
      setIsRevealed(true);
      return;
    }

    const currentSection = sectionRef.current;
    if (!currentSection) return;

    let animFrameId: number | null = null;

    // 2. Count-Up Animation via requestAnimationFrame with smooth cubic ease-out
    const startAnimation = () => {
      setIsRevealed(true);
      let startTime: number | null = null;
      const duration = 1900;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Individual counter progress calculation with 100ms staggered delay
        const getVal = (target: number, delayMs: number) => {
          if (elapsed < delayMs) return 0;
          const p = Math.min((elapsed - delayMs) / duration, 1);
          const easeOut = 1 - Math.pow(1 - p, 3);
          return Math.round(easeOut * target);
        };

        const nextYears = getVal(3, 0);
        const nextProjects = getVal(50, 100);
        const nextEmployees = getVal(20, 200);
        const nextSatisfaction = getVal(100, 300);
        const nextFrameworks = getVal(15, 400);

        setCounts({
          years: nextYears,
          projects: nextProjects,
          employees: nextEmployees,
          satisfaction: nextSatisfaction,
          frameworks: nextFrameworks,
        });

        // Run loop until the last staggered counter completes
        if (elapsed < duration + 400) {
          animFrameId = requestAnimationFrame(animate);
        } else {
          setCounts({
            years: 3,
            projects: 50,
            employees: 20,
            satisfaction: 100,
            frameworks: 15,
          });
        }
      };

      animFrameId = requestAnimationFrame(animate);
    };

    // 3. Native IntersectionObserver with 0.35 visibility threshold
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Trigger ONLY when at least 35% of the statistics section enters viewport
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();
          startAnimation();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(currentSection);

    // 4. Memory cleanup on unmount
    return () => {
      observer.disconnect();
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Agency Statistics & Experience"
      className="relative z-20 w-full overflow-hidden bg-[#b80000] min-h-[340px] md:min-h-[380px] flex items-end shadow-2xl"
    >
      {/* 
        ========================================================================
        1. PHOTOGRAPHIC WORKSPACE BACKGROUND WITH BALANCED RED CINEMATIC TINT
        - Clearly visible desks, people, laptops, and creative workspace
        - Reduced red saturation so photography shines through with contrast
        ========================================================================
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        <img
          src="/images/cta-business-laptop.jpg"
          alt=""
          className="w-full h-full object-cover object-center filter contrast-125 brightness-95 scale-102"
        />
        {/* Balanced Cinematic Red Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/75 via-[#a80000]/65 to-[#990000]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 
        ========================================================================
        2. STATS & EXPERIENCE CARD CONTAINER
        - White rectangular Experience Card overlapping lower-left
        - Four statistics arranged horizontally across the lower portion
        - Staggered scroll reveal using GPU-friendly opacity & translate
        ========================================================================
      */}
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 py-10 sm:py-12 lg:py-14">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-8 sm:gap-10 lg:gap-12">
          
          {/* White Rectangular Experience Card (Square corners, lower-left region) */}
          <div
            className={`bg-white text-black p-6 sm:p-7 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)] shrink-0 rounded-none w-full sm:w-auto sm:min-w-[260px] lg:min-w-[280px] transition-all duration-700 ease-out ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="font-serif text-5xl sm:text-6xl font-black leading-none text-black tracking-tight">
              {counts.years}+
            </div>
            <div className="font-mono text-xs sm:text-[12.5px] font-bold tracking-[0.2em] uppercase text-black/85 mt-2.5 sm:mt-3 leading-snug">
              YEARS OF DIGITAL
              <br />
              EXCELLENCE
            </div>
          </div>

          {/* 4 Horizontally Arranged Statistics with Staggered Scroll Reveal */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 flex-1 w-full text-white pb-1">
            
            {/* Stat 1: 50+ Projects Completed */}
            <div
              className={`space-y-1.5 border-l border-white/25 pl-4 sm:pl-5 transition-all duration-700 ease-out delay-100 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-none">
                {counts.projects}+
              </div>
              <div className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/90 font-medium leading-tight">
                PROJECTS
                <br />
                COMPLETED
              </div>
            </div>

            {/* Stat 2: 20+ Digital Specialists */}
            <div
              className={`space-y-1.5 border-l border-white/25 pl-4 sm:pl-5 transition-all duration-700 ease-out delay-200 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-none">
                {counts.employees}+
              </div>
              <div className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/90 font-medium leading-tight">
                DIGITAL
                <br />
                SPECIALISTS
              </div>
            </div>

            {/* Stat 3: 100% Client Satisfaction */}
            <div
              className={`space-y-1.5 border-l border-white/25 pl-4 sm:pl-5 transition-all duration-700 ease-out delay-300 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-none">
                {counts.satisfaction}%
              </div>
              <div className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/90 font-medium leading-tight">
                CLIENT
                <br />
                SATISFACTION
              </div>
            </div>

            {/* Stat 4: 15+ Enterprise Frameworks */}
            <div
              className={`space-y-1.5 border-l border-white/25 pl-4 sm:pl-5 transition-all duration-700 ease-out delay-400 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-none">
                {counts.frameworks}+
              </div>
              <div className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/90 font-medium leading-tight">
                ENTERPRISE
                <br />
                FRAMEWORKS
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutRedStats;

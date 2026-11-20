import React, { useEffect, useRef, useState } from 'react';

// Custom SVGs precisely matching the reference screenshot
const ClipboardCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 56" fill="none" aria-hidden="true">
    {/* Clipboard body */}
    <rect x="4" y="8" width="40" height="46" rx="6" fill="white" />
    {/* Clip tab on top */}
    <path d="M18 8V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" stroke="white" strokeWidth="4" strokeLinecap="round" />
    {/* Cutout / red checkmark */}
    <path d="M15 32L22 39L33 25" stroke="#e51b1b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const EmployeesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 54 44" fill="white" aria-hidden="true">
    {/* Left person */}
    <circle cx="16" cy="14" r="7" opacity="0.9" />
    <path d="M4 36c0-6 5-10 11-10s11 4 11 10z" opacity="0.9" />
    {/* Right person */}
    <circle cx="38" cy="14" r="7" opacity="0.9" />
    <path d="M28 36c0-6 5-10 11-10s11 4 11 10z" opacity="0.9" />
    {/* Center foreground person */}
    <circle cx="27" cy="11" r="8" />
    <path d="M14 36c0-7 6-12 13-12s13 5 13 12z" />
  </svg>
);

const HappyClientsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 56 46" fill="none" aria-hidden="true">
    {/* Background silhouettes */}
    <circle cx="22" cy="10" r="5" fill="white" />
    <circle cx="34" cy="10" r="5" fill="white" />
    <path d="M16 26c0-5 3-8 7-8s7 3 7 8z" fill="white" />
    <path d="M26 26c0-5 3-8 7-8s7 3 7 8z" fill="white" />
    {/* Foreground figures */}
    <circle cx="15" cy="20" r="5.5" fill="white" />
    <path d="M7 38c0-5.5 3.5-9 8-9s8 3.5 8 9z" fill="white" />
    <circle cx="28" cy="20" r="5.5" fill="white" />
    <path d="M20 38c0-5.5 3.5-9 8-9s8 3.5 8 9z" fill="white" />
    <circle cx="39" cy="20" r="5" fill="white" />
    <path d="M33 38c0-4.5 3-7.5 7-7.5z" fill="white" />
    {/* Checkmark circle badge in bottom right */}
    <circle cx="42" cy="33" r="10" fill="#e51b1b" stroke="white" strokeWidth="2.5" />
    <path d="M38 33L41 36L46 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const CustomerSatisfactionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    {/* Outer circle */}
    <circle cx="24" cy="24" r="21" stroke="white" strokeWidth="3" fill="none" />
    {/* Eyes */}
    <circle cx="17" cy="19" r="2.5" fill="white" />
    <circle cx="31" cy="19" r="2.5" fill="white" />
    {/* Smile */}
    <path d="M15 27c2.5 6 15.5 6 18 0" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const StatisticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    employees: 0,
    clients: 0,
    satisfaction: 0,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);

          // Respect prefers-reduced-motion
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setCounts({
              projects: 100,
              employees: 20,
              clients: 150,
              satisfaction: 99,
            });
            return;
          }

          // Smooth 2-second synchronized count-up via requestAnimationFrame
          const duration = 2000;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth cubic ease-out curve
            const easeOut = 1 - Math.pow(1 - progress, 3);

            // Continuously update integers on every animation frame
            setCounts({
              projects: Math.round(easeOut * 100),
              employees: Math.round(easeOut * 20),
              clients: Math.round(easeOut * 150),
              satisfaction: Math.round(easeOut * 99),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                projects: 100,
                employees: 20,
                clients: 150,
                satisfaction: 99,
              });
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Agency Statistics"
      className="relative z-20 w-full bg-[#e51b1b] text-white py-8 sm:py-10 md:py-11 overflow-hidden shadow-[0_10px_35px_rgba(229,27,27,0.3)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* 4 Horizontally aligned statistics matching reference screenshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 items-center justify-between">
          
          {/* 01: PROJECTS COMPLETED */}
          <div
            className={`flex items-center gap-3.5 sm:gap-4 lg:gap-4.5 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <ClipboardCheckIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0" />
            <div className="flex flex-col">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-normal tracking-tight text-white leading-none flex items-baseline">
                <span className="tabular-nums font-serif">{counts.projects}</span>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white ml-0.5 select-none">+</span>
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-sans font-bold tracking-[0.14em] uppercase text-white mt-1.5 whitespace-nowrap">
                PROJECTS COMPLETED
              </span>
            </div>
          </div>

          {/* 02: EMPLOYEES */}
          <div
            className={`flex items-center gap-3.5 sm:gap-4 lg:gap-4.5 transition-all duration-700 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <EmployeesIcon className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 shrink-0" />
            <div className="flex flex-col">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-normal tracking-tight text-white leading-none flex items-baseline">
                <span className="tabular-nums font-serif">{counts.employees}</span>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white ml-0.5 select-none">+</span>
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-sans font-bold tracking-[0.14em] uppercase text-white mt-1.5 whitespace-nowrap">
                EMPLOYEES
              </span>
            </div>
          </div>

          {/* 03: HAPPY CLIENTS */}
          <div
            className={`flex items-center gap-3.5 sm:gap-4 lg:gap-4.5 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <HappyClientsIcon className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 shrink-0" />
            <div className="flex flex-col">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-normal tracking-tight text-white leading-none flex items-baseline">
                <span className="tabular-nums font-serif">{counts.clients}</span>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white ml-0.5 select-none">+</span>
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-sans font-bold tracking-[0.14em] uppercase text-white mt-1.5 whitespace-nowrap">
                HAPPY CLIENTS
              </span>
            </div>
          </div>

          {/* 04: CUSTOMER SATISFACTION */}
          <div
            className={`flex items-center gap-3.5 sm:gap-4 lg:gap-4.5 transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <CustomerSatisfactionIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0" />
            <div className="flex flex-col">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-normal tracking-tight text-white leading-none flex items-baseline">
                <span className="tabular-nums font-serif">{counts.satisfaction}</span>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white ml-1 select-none">%</span>
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-sans font-bold tracking-[0.14em] uppercase text-white mt-1.5 whitespace-nowrap">
                CUSTOMER SATISFACTION
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

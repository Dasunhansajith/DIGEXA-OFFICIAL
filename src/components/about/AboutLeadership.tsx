import React, { useEffect, useRef, useState } from 'react';
import { LEADERSHIP_DATA } from '@/data/leadership';

export const AboutLeadership: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const publishedLeaders = LEADERSHIP_DATA.filter((l) => l.published);

  return (
    <section
      ref={sectionRef}
      aria-label="Leadership Perspective"
      className="relative w-full bg-black text-white py-16 sm:py-20 lg:py-22 overflow-hidden border-b border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* Section Heading - Balanced Compact Spacing */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <div
            className={`flex items-center justify-center gap-2.5 mb-2.5 sm:mb-3 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.8)] shrink-0"
            />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
              EXECUTIVE PERSPECTIVE
            </span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight transition-all duration-800 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            LEADERSHIP PERSPECTIVE
          </h2>
        </div>

        {/* Leadership Cards Grid: Two columns desktop, single column mobile */}
        {publishedLeaders.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full">
            {publishedLeaders.map((leader, idx) => (
              <div
                key={leader.id}
                className={`group relative flex flex-col sm:flex-row items-center sm:items-stretch bg-[#0d0e12] border border-white/[0.08] hover:border-[#FF0000]/40 rounded-[14px] sm:rounded-[16px] overflow-hidden transition-all duration-500 ease-out shadow-[0_10px_35px_rgba(0,0,0,0.6)] ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${150 + idx * 120}ms`,
                }}
              >
                {/* Photo on Left */}
                <div className="relative w-full sm:w-[42%] min-h-[220px] sm:min-h-full overflow-hidden bg-[#15161b] shrink-0">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-600 ease-out"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/60 pointer-events-none" />
                </div>

                {/* Information on Right */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-2">
                    {/* Role Tag with Red Accent */}
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] shrink-0" />
                      <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#FF0000] font-semibold">
                        {leader.role}
                      </span>
                    </div>

                    {/* Full Name */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-snug">
                      {leader.name}
                    </h3>

                    {/* Short Professional Statement */}
                    <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A1AA] font-light leading-relaxed">
                      &ldquo;{leader.statement}&rdquo;
                    </p>
                  </div>

                  {/* Optional Designation / Focus */}
                  {leader.designation && (
                    <div className="pt-2.5 border-t border-white/[0.06] text-xs font-mono tracking-wider text-white/50 uppercase">
                      {leader.designation}
                    </div>
                  )}
                </div>

                {/* Bottom Red Decorative Line on Hover */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF0000] group-hover:w-full transition-all duration-500 ease-out"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default AboutLeadership;

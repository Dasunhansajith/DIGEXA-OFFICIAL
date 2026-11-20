import React, { useEffect, useRef, useState } from 'react';

export const AboutIntroAndMission: React.FC = () => {
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

  return (
    <section
      ref={sectionRef}
      aria-label="Agency Introduction & Mission"
      className="relative w-full bg-black text-white py-16 sm:py-20 lg:py-22 overflow-hidden border-b border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* 
          ======================================================================
          1. EDITORIAL INTRODUCTION
          ======================================================================
        */}
        <div className="max-w-4xl space-y-5 sm:space-y-6 mb-10 sm:mb-12 lg:mb-14">
          
          {/* Label with Red Dot */}
          <div
            className={`flex items-center gap-2.5 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shadow-[0_0_10px_rgba(255,0,0,0.85)] shrink-0"
            />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
              ABOUT DIGEXA
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[66px] font-bold uppercase tracking-tight leading-[1.05]">
            <span
              className={`block text-white transition-all duration-800 delay-100 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              CRAFTING DIGITAL
            </span>
            <span
              className={`block text-[#777777] transition-all duration-800 delay-150 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              EXCELLENCE
            </span>
          </h2>

          {/* Description */}
          <p
            className={`text-base sm:text-[17px] lg:text-[1.075rem] text-[#B0B0B5] font-sans font-light leading-relaxed max-w-3xl transition-all duration-800 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="text-white font-medium">DIGEXA</span> is a creative digital agency where visionary concepts converge with high-performance engineering. We specialize in architecting bespoke web platforms, transformative brand identities, high-conversion digital experiences, and scalable software solutions tailored to propel modern businesses forward in a dynamic online landscape.
          </p>

        </div>

        {/* 
          ======================================================================
          2. MISSION & VISION TWO-COLUMN SECTION
          - Left: OUR MISSION (slides gently from left)
          - Right: OUR VISION (slides gently from right)
          ======================================================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 pt-8 sm:pt-10 border-t border-white/[0.08]">
          
          {/* Left Column: OUR MISSION */}
          <div
            className={`space-y-3.5 transition-all duration-800 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
              <h3 className="font-serif text-2xl sm:text-[26px] font-bold uppercase tracking-tight text-white">
                OUR MISSION
              </h3>
            </div>
            <p className="text-[#A1A1AA] font-sans text-[14.5px] sm:text-[15.5px] leading-relaxed font-light">
              To engineer powerful, high-performance digital products and memorable brand identities that drive sustainable growth, bridge complex technology with intuitive interfaces, and elevate businesses to industry leadership.
            </p>
          </div>

          {/* Right Column: OUR VISION */}
          <div
            className={`space-y-3.5 transition-all duration-800 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
              <h3 className="font-serif text-2xl sm:text-[26px] font-bold uppercase tracking-tight text-white">
                OUR VISION
              </h3>
            </div>
            <p className="text-[#A1A1AA] font-sans text-[14.5px] sm:text-[15.5px] leading-relaxed font-light">
              To become the benchmark creative digital agency for forward-thinking brands globally—delivering timeless design, robust architectural scalability, and human-centric digital innovation.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutIntroAndMission;

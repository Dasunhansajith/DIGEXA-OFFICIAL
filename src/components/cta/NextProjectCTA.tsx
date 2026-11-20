import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import coderAtWorkImg from '@/assets/coder-at-work-stockcake.jpg';

export const NextProjectCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
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
      id="cta"
      aria-label="Start Your Next Project"
      className="relative w-full min-h-[460px] sm:min-h-[520px] md:h-[580px] lg:h-[620px] overflow-hidden flex items-center justify-center py-16 sm:py-20 md:py-24"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url(${coderAtWorkImg})`,
        backgroundSize: 'cover',
        backgroundPosition: '60% 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 
        Foreground Content:
        Framed cleanly between the coding monitors on the left and the developer's profile on the right.
        Centered on desktop and mobile with balanced spacing.
      */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-12 text-center flex flex-col items-center justify-center w-full">
        {/* Large Elegant Serif Headline */}
        <h2
          className={`font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.08] text-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-white">LET'S START YOUR</span>
          <span className="block text-[#FF0000] mt-1 sm:mt-2">NEXT PROJECT</span>
        </h2>

        {/* White Rectangular Button Centered */}
        <div
          className={`mt-8 sm:mt-10 md:mt-12 w-full flex justify-center transition-all duration-700 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 bg-white text-black font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase px-8 sm:px-10 py-4 transition-all duration-300 hover:bg-[#FF0000] hover:text-white shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(255,0,0,0.7)]"
          >
            <span>GET IN TOUCH</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

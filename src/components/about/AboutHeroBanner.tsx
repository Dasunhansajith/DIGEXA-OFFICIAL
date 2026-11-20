import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import aboutRedSmoke from '@/assets/images/about-red-smoke.jpeg';

export const AboutHeroBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      aria-label="About Us Header"
      className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden flex items-center justify-center border-b border-white/[0.08] bg-black select-none"
    >
      {/* 
        Red Smoke Background Visual with Subtle Drift
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        <img
          src={aboutRedSmoke}
          alt=""
          className="w-full h-full object-cover object-center opacity-75 mix-blend-screen scale-110 filter saturate-150 contrast-125 transition-transform duration-1000 ease-out"
        />
        {/* Soft edge feathering and text contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Banner Centered Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Heading: ABOUT US (Fades upward on entry) */}
        <h1
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold uppercase tracking-tight text-white leading-tight transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          ABOUT US
        </h1>

        {/* Breadcrumb Navigation: HOME | ABOUT US (Fades in slightly afterward) */}
        <nav
          aria-label="Breadcrumb"
          className={`mt-3 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-mono tracking-[0.22em] uppercase select-none transition-all duration-700 delay-150 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            to="/"
            className="text-[#888888] hover:text-white transition-colors duration-200"
          >
            HOME
          </Link>
          <span className="text-[#555555] text-xs" aria-hidden="true">
            |
          </span>
          <span className="text-white font-medium">ABOUT US</span>
        </nav>
      </div>
    </section>
  );
};

export default AboutHeroBanner;


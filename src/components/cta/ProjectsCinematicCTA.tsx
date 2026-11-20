import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ProjectsCinematicCTA: React.FC = () => {
  return (
    <section
      aria-label="Transform Your Business Idea"
      className="relative w-full min-h-[420px] md:h-[460px] lg:h-[480px] overflow-hidden flex items-center bg-black border-t border-white/[0.08]"
    >
      {/* 
        ========================================================================
        1. CINEMATIC BUSINESS PHOTOGRAPH BACKGROUND
        - Professional photograph of a businessperson working on a laptop
        - High-contrast grayscale appearance
        - Clearly visible, especially on the right side
        - Gradient overlay on the left ensures optimal text readability
        ========================================================================
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        <img
          src="/images/cta-business-laptop.jpg"
          alt=""
          className="w-full h-full object-cover object-right md:object-center filter grayscale contrast-[1.25] brightness-90 scale-105"
        />
        {/* Editorial Vignette & Text Readability Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      </div>

      {/* 
        ========================================================================
        2. LEFT-ALIGNED CTA CONTENT
        - Headline: TRANSFORM YOUR BUSINESS IDEA INTO A DIGITAL REALITY!
        - Description: High-conversion copy, light gray, max ~600px
        - CTA: LET'S TALK with red-to-white circle arrow animation
        ========================================================================
      */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 py-16 sm:py-20 md:py-0">
        <div className="max-w-[640px] space-y-5 sm:space-y-6">
          {/* Two-Line Editorial Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[42px] font-bold text-white uppercase tracking-tight leading-[1.14]">
            <span className="block">TRANSFORM YOUR BUSINESS IDEA</span>
            <span className="block text-white/95">INTO A DIGITAL REALITY!</span>
          </h2>

          {/* Description */}
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[16.5px] text-[#D1D1D6] font-light leading-relaxed max-w-[600px]">
            Are you ready to take your business idea to the next level? <span className="text-white font-medium">DIGEXA</span> specializes in engineering innovative digital experiences and platforms that bring ambitious concepts to life. Let&apos;s collaborate and create something extraordinary together.
          </p>

          {/* LET'S TALK Button with Red-to-White Hover Animation */}
          <div className="pt-2 sm:pt-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 sm:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] cursor-pointer select-none"
              aria-label="Let's Talk - Contact DIGEXA"
            >
              {/* White Serif Label */}
              <span className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight uppercase text-white group-hover:text-white transition-colors duration-400">
                LET&apos;S TALK
              </span>

              {/* Red Circular Button with Black Arrow */}
              <div
                aria-hidden="true"
                className="w-[62px] h-[62px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#FF0000] group-hover:bg-white flex items-center justify-center transition-all duration-500 ease-out shadow-[0_4px_25px_rgba(255,0,0,0.5)] group-hover:shadow-[0_4px_25px_rgba(255,255,255,0.4)] group-hover:scale-105 shrink-0"
              >
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-black stroke-[2.5] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCinematicCTA;


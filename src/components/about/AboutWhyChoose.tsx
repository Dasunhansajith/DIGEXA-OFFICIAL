import React, { useEffect, useRef, useState } from 'react';
import digexaLogoDark from '@/assets/digexa-logo-dark-trimmed.png';

interface Capability {
  id: string;
  label: string;
  image: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'mobile-app',
    label: 'MOBILE APP',
    image: '/images/services-slider/mobile-app-dev.jpg',
  },
  {
    id: 'ui-ux',
    label: 'UI/UX DESIGN',
    image: '/images/services-slider/ui-ux-design.jpg',
  },
  {
    id: 'web-dev',
    label: 'WEB DEVELOPMENT',
    image: '/images/services-slider/web-development.jpg',
  },
  {
    id: 'social-media',
    label: 'SOCIAL MEDIA',
    image: '/images/services-slider/social-media.jpg',
  },
];

export const AboutWhyChoose: React.FC = () => {
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
      aria-label="Why Choose DIGEXA - Capabilities"
      className="relative w-full bg-black text-white py-16 sm:py-20 lg:py-22 overflow-hidden border-t border-white/[0.06]"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* 
          Two-Column Capabilities Composition
          - Left column: ~43% width, aligned at top with heading
          - Right column: ~57% width
          - Column gap: ~48–60px
        */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14 xl:gap-16 w-full">
          
          {/* 
            ====================================================================
            LEFT COLUMN (43%): Creative Workspace Photograph with DIGEXA Logo
            - Replaced circuit graphic with modern workspace with monitors
            - Dark cinematic atmosphere & subtle red lighting
            - Authentic DIGEXA logo near bottom-right
            ====================================================================
          */}
          <div
            className={`w-full lg:w-[43%] xl:w-[43%] shrink-0 relative transition-all duration-900 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-98'
            }`}
          >
            <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[14px] sm:rounded-[16px] overflow-hidden bg-[#0d0e12] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Creative Workspace with Monitors & Cinematic Atmosphere */}
              <img
                src="/images/about-workspace-monitors.jpg"
                alt="DIGEXA Creative Technology Workspace"
                loading="lazy"
                className="w-full h-full object-cover object-center filter contrast-115 brightness-95 scale-102"
              />

              {/* Subtle Red & Dark Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#990000]/40 via-transparent to-black/60 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Authentic DIGEXA Logo near bottom-right */}
              <div className="absolute bottom-5 right-5 z-20 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 shadow-2xl flex items-center">
                <img
                  src={digexaLogoDark}
                  alt="DIGEXA"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>

              {/* Subtle Red Frame Accent */}
              <div className="absolute inset-0 border border-[#FF0000]/25 rounded-[14px] sm:rounded-[16px] pointer-events-none" />
            </div>
          </div>

          {/* 
            ====================================================================
            RIGHT COLUMN (57%): Heading, Paragraph, and Four Full-Color Capability Panels
            - Small label: [RED DOT] WHY US
            - Large heading: DISCOVER OUR (white) CAPABILITIES (muted gray)
            - Concise paragraph
            - 4 vibrant full-color capability panels
            ====================================================================
          */}
          <div
            className={`w-full lg:w-[57%] xl:w-[57%] space-y-6 sm:space-y-7 transition-all duration-900 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Small Label with Red Dot */}
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shadow-[0_0_10px_rgba(255,0,0,0.85)] shrink-0"
              />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
                WHY US
              </span>
            </div>

            {/* Large Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-bold uppercase tracking-tight leading-[1.08]">
              <span className="block text-white">DISCOVER OUR</span>
              <span className="block text-[#777777]">CAPABILITIES</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-[#B0B0B5] font-sans font-light leading-relaxed max-w-xl">
              At <span className="text-white font-medium">DIGEXA</span>, we bridge the gap between ambitious concepts and precision software engineering. By unifying human-centric UI/UX design with scalable cloud architectures, our specialized multidisciplinary capabilities empower modern businesses to accelerate growth and outperform competitors.
            </p>

            {/* 
              FOUR VIBRANT FULL-COLOR CAPABILITY PANELS
              - Four equally sized image panels
              - FULL COLOR by default (grayscale-0, opacity-1)
              - Consistent height (~220–240px desktop)
              - 12–16px gaps
              - Clean labels visible at bottom with subtle contrast gradient
              - Smooth hover zoom, subtle brightness, red border & accent
            */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4 w-full">
                {CAPABILITIES.map((cap) => (
                  <div
                    key={cap.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`Explore ${cap.label}`}
                    className="group relative overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#121318] border border-white/[0.1] hover:border-[#FF0000] cursor-pointer select-none transition-all duration-500 ease-out h-[175px] sm:h-[210px] md:h-[225px] lg:h-[235px] shadow-md hover:shadow-[0_8px_25px_rgba(255,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000]"
                  >
                    {/* Capability Image - FULL COLOR BY DEFAULT */}
                    <img
                      src={cap.image}
                      alt={cap.label}
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter grayscale-0 opacity-100 scale-100 group-hover:scale-106 group-hover:brightness-105 transition-all duration-500 ease-out"
                      style={{ filter: 'grayscale(0%)', opacity: 1 }}
                    />

                    {/* Subtle Bottom Vignette for Crisp Label Contrast Only (No heavy darkening) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                    {/* Label Clearly Visible at Bottom */}
                    <div className="absolute bottom-3 left-2 right-2 z-10 text-center">
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-white group-hover:text-white transition-colors duration-300 block truncate drop-shadow-md">
                        {cap.label}
                      </span>
                    </div>

                    {/* Refined Red Bottom Accent Line on Hover */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutWhyChoose;

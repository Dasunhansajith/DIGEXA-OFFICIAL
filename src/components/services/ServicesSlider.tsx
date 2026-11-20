import React, { useState } from 'react';
import digexaLogo from '@/assets/digexa-logo-dark-trimmed.png';

interface SliderService {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  targetId: string;
}

const SLIDER_SERVICES: SliderService[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'WEB DEVELOPMENT',
    category: 'FULL-STACK PLATFORMS',
    image: '/images/services-slider/web-development.jpg',
    targetId: 'web-app-dev',
  },
  {
    id: 'seo-optimization',
    number: '02',
    title: 'SEO OPTIMIZATION',
    category: 'SEARCH & PERFORMANCE',
    image: '/images/services-slider/seo-optimization.jpg',
    targetId: 'ai-automation',
  },
  {
    id: 'branding-identity',
    number: '03',
    title: 'BRANDING & IDENTITY',
    category: 'IDENTITY SYSTEMS',
    image: '/images/services-slider/branding-identity.jpg',
    targetId: 'branding',
  },
  {
    id: 'social-media-marketing',
    number: '04',
    title: 'SOCIAL MEDIA MARKETING',
    category: 'CONTENT & STRATEGY',
    image: '/images/services-slider/social-media.jpg',
    targetId: 'social-media',
  },
  {
    id: 'ui-ux-design',
    number: '05',
    title: 'UI/UX DESIGN',
    category: 'EXPERIENCE ARCHITECTURE',
    image: '/images/services-slider/ui-ux-design.jpg',
    targetId: 'ui-ux-dev',
  },
  {
    id: 'mobile-app-dev',
    number: '06',
    title: 'MOBILE APP DEVELOPMENT',
    category: 'IOS & ANDROID APPS',
    image: '/images/services-slider/mobile-app-dev.jpg',
    targetId: 'mobile-app-dev',
  },
  {
    id: 'digital-marketing',
    number: '07',
    title: 'DIGITAL MARKETING',
    category: 'GROWTH & ACQUISITION',
    image: '/images/services-slider/digital-marketing.jpg',
    targetId: 'social-media',
  },
  {
    id: 'graphic-design',
    number: '08',
    title: 'GRAPHIC DESIGN',
    category: 'VISUAL SYSTEMS & ASSETS',
    image: '/images/services-slider/graphic-design.jpg',
    targetId: 'branding',
  },
];

export const ServicesSlider: React.FC = () => {
  // Mobile tap state to support touching a card to reveal color & logo
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);

  const handleCardClick = (serviceId: string, targetId: string) => {
    // If on touch device, toggle active card
    if (window.innerWidth <= 768) {
      if (activeMobileId === serviceId) {
        // Second tap navigates to detailed services
        const targetElement = document.getElementById(targetId) || document.getElementById('detailed-services');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setActiveMobileId(serviceId);
      }
    } else {
      const targetElement = document.getElementById(targetId) || document.getElementById('detailed-services');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      aria-label="Continuous Services Slider"
      className="relative w-full bg-black overflow-hidden select-none border-b border-white/[0.08]"
    >
      {/* 
        ========================================================================
        CONTINUOUS AUTOMATIC SERVICES SLIDER
        - Desktop height: approximately 500px (h-[440px] sm:h-[450px] md:h-[480px] lg:h-[510px])
        - 4 panels visible simultaneously on desktop (25vw each)
        - 2 panels visible on tablet (50vw)
        - ~1.15 panels visible on mobile (85vw)
        - Smooth 40s linear continuous loop from right to left
        - Automatically pauses on hover, resumes on mouse leave
        - Edge-to-edge, NO gaps, NO borders, NO rounded corners
        ========================================================================
      */}
      <div className="w-full h-[440px] sm:h-[460px] md:h-[490px] lg:h-[515px] overflow-hidden flex items-center">
        <div className="animate-services-slider flex items-center h-full shrink-0">
          
          {/* TRACK 1: Original 8 Services */}
          {SLIDER_SERVICES.map((service) => {
            const isActive = activeMobileId === service.id;

            return (
              <div
                key={`s1-${service.id}`}
                onClick={() => handleCardClick(service.id, service.targetId)}
                tabIndex={0}
                role="button"
                aria-label={`Service: ${service.title}`}
                className="group relative h-full w-[85vw] sm:w-[50vw] lg:w-[25vw] shrink-0 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] z-10"
              >
                {/* 
                  Background Image
                  - Default: 100% Grayscale
                  - On Hover / Tap: Smoothly removes grayscale (reveals full color) & scales to 1.04
                */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className={`w-full h-full object-cover object-center transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive
                        ? 'filter-none scale-[1.04]'
                        : 'filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.04]'
                    }`}
                  />
                </div>

                {/* 
                  Subtle Dark Overlay
                  - Keeps typography readable
                  - Softens on hover for enhanced image vibrancy
                */}
                <div
                  className={`absolute inset-0 transition-opacity duration-600 ease-out ${
                    isActive
                      ? 'bg-gradient-to-t from-black/85 via-black/30 to-black/30'
                      : 'bg-gradient-to-t from-black/90 via-black/45 to-black/35 group-hover:from-black/80 group-hover:via-black/25'
                  }`}
                />

                {/* Service Numbering (Top-Left) */}
                <div className="absolute top-5 sm:top-6 left-5 sm:left-6 z-20">
                  <span className="font-mono text-xs sm:text-sm tracking-[0.22em] text-white/50 group-hover:text-white transition-colors duration-300">
                    {service.number}
                  </span>
                </div>

                {/* 
                  Foreground Content:
                  - Small uppercase category label with dot
                  - Elegant white serif heading
                  - DIGEXA Logo: Hidden by default, reveals beneath title ONLY on hover / tap
                */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 z-20 flex flex-col justify-end text-left pointer-events-none">
                  {/* Category Label */}
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-[#FF0000] transition-colors duration-300" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/60 group-hover:text-white/90 transition-colors duration-300">
                      {service.category}
                    </span>
                  </div>

                  {/* Service Heading */}
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-[23px] xl:text-[25px] font-bold uppercase tracking-tight text-white leading-tight">
                    {service.title}
                  </h3>

                  {/* 
                    DIGEXA Brand Logo:
                    - Hidden by default (opacity: 0, translateY: 10px)
                    - Reveals only when card is hovered or tapped on mobile
                  */}
                  <div
                    className={`mt-3 sm:mt-4 transition-all duration-500 ease-out flex items-center ${
                      isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0'
                    }`}
                  >
                    <img
                      src={digexaLogo}
                      alt="DIGEXA"
                      className="h-5 sm:h-5.5 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                    />
                  </div>
                </div>

                {/* Subtle Red Bottom Accent Line on Hover */}
                <div
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-all duration-500 ease-out ${
                    isActive
                      ? 'bg-[#FF0000]'
                      : 'bg-transparent group-hover:bg-[#FF0000]'
                  }`}
                />
              </div>
            );
          })}

          {/* TRACK 2: Duplicated 8 Services for Seamless Infinite Loop */}
          {SLIDER_SERVICES.map((service) => {
            return (
              <div
                key={`s2-${service.id}`}
                onClick={() => handleCardClick(service.id, service.targetId)}
                aria-hidden="true"
                tabIndex={-1}
                className="group relative h-full w-[85vw] sm:w-[50vw] lg:w-[25vw] shrink-0 overflow-hidden cursor-pointer z-10"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35 group-hover:from-black/80 group-hover:via-black/25 transition-opacity duration-600 ease-out" />

                {/* Number */}
                <div className="absolute top-5 sm:top-6 left-5 sm:left-6 z-20">
                  <span className="font-mono text-xs sm:text-sm tracking-[0.22em] text-white/50 group-hover:text-white transition-colors duration-300">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 z-20 flex flex-col justify-end text-left pointer-events-none">
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-[#FF0000] transition-colors duration-300" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/60 group-hover:text-white/90 transition-colors duration-300">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl lg:text-[23px] xl:text-[25px] font-bold uppercase tracking-tight text-white leading-tight">
                    {service.title}
                  </h3>

                  {/* DIGEXA Logo on hover */}
                  <div className="mt-3 sm:mt-4 opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center">
                    <img
                      src={digexaLogo}
                      alt="DIGEXA"
                      className="h-5 sm:h-5.5 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                    />
                  </div>
                </div>

                {/* Red Accent Line */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-transparent group-hover:bg-[#FF0000] transition-all duration-500 ease-out"
                />
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;

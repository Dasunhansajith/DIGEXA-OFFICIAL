import React, { useEffect, useRef, useState } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Crisp, custom inline SVG icons for social platforms (16–18px rendering)
const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-[17px] h-[17px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-[17px] h-[17px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-[17px] h-[17px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-[17px] h-[17px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-[17px] h-[17px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-[17px] h-[17px]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_ITEMS: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: LinkedInIcon,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: InstagramIcon,
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/94766414622',
    icon: WhatsAppIcon,
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: FacebookIcon,
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com',
    icon: TikTokIcon,
  },
  {
    name: 'Twitter / X',
    url: 'https://twitter.com',
    icon: TwitterXIcon,
  },
];

export const ContactContentSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    // Scroll observer for cinematic reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.15,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white pt-[48px] sm:pt-[50px] lg:pt-[52px] pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
      aria-label="Contact Information"
    >
      {/* 
        ======================================================================
        CENTERED CONTENT CONTAINER: MAX-WIDTH ~1100PX
        ======================================================================
      */}
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-10 w-full">
        {/* 
          ======================================================================
          MAIN HEADING: WE DEVELOP TOGETHER!
          - Approximately 44px on desktop using clamp()
          - Vertical space above & below reduced to approximately 48–50px
          - "WE DEVELOP" in white, "TOGETHER!" in muted gray
          ======================================================================
        */}
        <div
          className={`mb-[46px] sm:mb-[48px] lg:mb-[50px] transition-all duration-700 ease-out ${
            prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-bold uppercase tracking-tight leading-[1.12] text-left">
            <span className="text-white">WE DEVELOP </span>
            <span className="text-[#888888]">TOGETHER!</span>
          </h2>
        </div>

        {/* 
          ======================================================================
          THREE MINIMALIST CONTACT ROWS
          Rows: LOCATION, CONTACT, SOCIAL
          - Heights approximately 85–100px on desktop (consistent vertical center)
          - Labels: 23–25px uppercase serif typography
          - Details: 15–16px sans-serif typography
          - Separated by thin, low-opacity horizontal dividers
          ======================================================================
        */}
        <div className="border-t border-white/10 w-full">
          {/* ROW 1: LOCATION (~85–100px on desktop with center alignment) */}
          <div
            className={`border-b border-white/10 py-5 sm:py-6 md:py-0 md:h-[92px] flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-10 transition-all duration-700 ease-out ${
              prefersReducedMotion
                ? 'opacity-100 translate-y-0'
                : isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? '0ms' : '100ms',
            }}
          >
            {/* Left Label: 23–25px Serif */}
            <div className="w-full md:w-1/3 shrink-0">
              <h3 className="font-serif text-[23px] sm:text-[24px] md:text-[25px] font-normal uppercase tracking-wide text-white leading-none">
                LOCATION
              </h3>
            </div>

            {/* Right Information: 15–16px */}
            <div className="w-full md:w-2/3 md:text-right flex flex-col md:items-end justify-center space-y-1">
              <p className="font-sans text-[15px] sm:text-[15.5px] text-white font-medium leading-snug">
                Colombo, Sri Lanka
              </p>
              <p className="font-sans text-[14px] sm:text-[14.5px] text-white/60 leading-snug">
                Global Remote Operations
              </p>
            </div>
          </div>

          {/* ROW 2: CONTACT (~85–100px on desktop with center alignment) */}
          <div
            className={`border-b border-white/10 py-5 sm:py-6 md:py-0 md:h-[92px] flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-10 transition-all duration-700 ease-out ${
              prefersReducedMotion
                ? 'opacity-100 translate-y-0'
                : isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? '0ms' : '200ms',
            }}
          >
            {/* Left Label: 23–25px Serif */}
            <div className="w-full md:w-1/3 shrink-0">
              <h3 className="font-serif text-[23px] sm:text-[24px] md:text-[25px] font-normal uppercase tracking-wide text-white leading-none">
                CONTACT
              </h3>
            </div>

            {/* Right Information: 15–16px */}
            <div className="w-full md:w-2/3 md:text-right flex flex-col md:items-end justify-center space-y-1.5">
              <a
                href="mailto:hello@digexa.agency"
                className="font-sans text-[15px] sm:text-[15.5px] text-white hover:text-[#FF0000] transition-colors duration-200 inline-block focus:outline-none focus-visible:underline leading-snug"
                aria-label="Send email to hello@digexa.agency"
              >
                hello@digexa.agency
              </a>
              <a
                href="tel:+94766414622"
                className="font-sans text-[15px] sm:text-[15.5px] text-white/90 hover:text-[#FF0000] font-mono tracking-wider transition-colors duration-200 inline-block focus:outline-none focus-visible:underline leading-snug"
                aria-label="Call +94 76 641 4622"
              >
                +94 76 641 4622
              </a>
            </div>
          </div>

          {/* ROW 3: SOCIAL (~85–100px on desktop with center alignment) */}
          <div
            className={`border-b border-white/10 py-5 sm:py-6 md:py-0 md:h-[92px] flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 md:gap-10 transition-all duration-700 ease-out ${
              prefersReducedMotion
                ? 'opacity-100 translate-y-0'
                : isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? '0ms' : '300ms',
            }}
          >
            {/* Left Label: 23–25px Serif */}
            <div className="w-full md:w-1/3 shrink-0">
              <h3 className="font-serif text-[23px] sm:text-[24px] md:text-[25px] font-normal uppercase tracking-wide text-white leading-none">
                SOCIAL
              </h3>
            </div>

            {/* Right Information: Red Circular Social Icons (40px diameter, 16–18px icons, 12px gap) */}
            <div className="w-full md:w-2/3 flex flex-wrap items-center justify-start md:justify-end gap-[12px]">
              {SOCIAL_ITEMS.map((item, index) => {
                const IconComponent = item.icon;
                const iconDelayMs = prefersReducedMotion ? 0 : 350 + index * 50;

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow DIGEXA on ${item.name}`}
                    className={`group relative w-[40px] h-[40px] rounded-full bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-[2px] hover:scale-105 shadow-[0_0_12px_rgba(255,0,0,0.22)] focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:ring-offset-2 focus:ring-offset-black shrink-0 ${
                      prefersReducedMotion
                        ? 'opacity-100 scale-100'
                        : isVisible
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-90'
                    }`}
                    style={{
                      transitionDelay: prefersReducedMotion ? '0ms' : `${iconDelayMs}ms`,
                    }}
                  >
                    <IconComponent className="w-[17px] h-[17px] transition-transform duration-300 group-hover:scale-105" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContentSection;

import React from 'react';

export interface TechLogo {
  name: string;
  lightSrc: string; // High-contrast for dark ribbon
  darkSrc: string;  // Original brand colors for white ribbon
  darkContrastClass?: string;
}

export const TECH_LOGOS: TechLogo[] = [
  { name: 'React', lightSrc: '/images/logos/react.png', darkSrc: '/images/logos/react.png' },
  { name: 'Node.js', lightSrc: '/images/logos/nodejs.svg', darkSrc: '/images/logos/nodejs.svg' },
  { name: 'TypeScript', lightSrc: '/images/logos/typescript.png', darkSrc: '/images/logos/typescript.png', darkContrastClass: 'brightness-125' },
  { name: 'Flutter', lightSrc: '/images/logos/flutter.png', darkSrc: '/images/logos/flutter.png' },
  { name: 'Python', lightSrc: '/images/logos/python.png', darkSrc: '/images/logos/python.png' },
  { name: 'Angular', lightSrc: '/images/logos/angular.png', darkSrc: '/images/logos/angular.png' },
  { name: 'Laravel', lightSrc: '/images/logos/laravel.svg', darkSrc: '/images/logos/laravel.svg' },
  { name: 'Figma', lightSrc: '/images/logos/figma.png', darkSrc: '/images/logos/figma.png' },
  { name: 'Google Cloud', lightSrc: '/images/logos/googlecloud.svg', darkSrc: '/images/logos/googlecloud.svg' },
  { name: 'AWS', lightSrc: '/images/logos/aws-light.png', darkSrc: '/images/logos/aws.png' },
  { name: 'Meta', lightSrc: '/images/logos/meta-light.png', darkSrc: '/images/logos/meta.png' },
  { name: 'WordPress', lightSrc: '/images/logos/wordpress.svg', darkSrc: '/images/logos/wordpress.svg' },
  { name: 'Vue.js', lightSrc: '/images/logos/vue.svg', darkSrc: '/images/logos/vue.svg' },
  { name: 'Shopify', lightSrc: '/images/logos/shopify.svg', darkSrc: '/images/logos/shopify.svg' },
  { name: 'MongoDB', lightSrc: '/images/logos/mongodb.png', darkSrc: '/images/logos/mongodb.png' },
  { name: 'JavaScript', lightSrc: '/images/logos/javascript.png', darkSrc: '/images/logos/javascript.png' },
  { name: 'Spring Boot', lightSrc: '/images/logos/springboot.png', darkSrc: '/images/logos/springboot.png' },
  { name: 'PostgreSQL', lightSrc: '/images/logos/postgresql.png', darkSrc: '/images/logos/postgresql.png' },
  { name: 'Java', lightSrc: '/images/logos/java.png', darkSrc: '/images/logos/java.png' },
];

export interface TechLogoMarqueeProps {
  className?: string;
  darkAngle?: number;
  whiteAngle?: number;
  darkDirection?: 'left' | 'right';
  whiteDirection?: 'left' | 'right';
  darkBg?: string;
  whiteBg?: string;
  ribbonHeightClass?: string;
  containerHeightClass?: string;
  mobileHeightClass?: string;
}

export const TechLogoMarquee: React.FC<TechLogoMarqueeProps> = ({
  className = '',
  darkAngle = 6,
  whiteAngle = -6,
  darkDirection = 'right',
  whiteDirection = 'left',
  darkBg = '#18181B',
  whiteBg = '#FFFFFF',
  ribbonHeightClass = 'h-[80px] sm:h-[95px] md:h-[110px] lg:h-[120px]',
  containerHeightClass = 'h-[220px] md:h-[260px]',
  mobileHeightClass = 'h-[58px]',
}) => {
  const darkAnimClass = darkDirection === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  const whiteAnimClass = whiteDirection === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <section
      aria-label="Technology and Framework Expertise"
      className={`w-full bg-black select-none overflow-hidden ${className}`}
    >
      {/* 
        ========================================================================
        1. DESKTOP LAYOUT (Above 768px: md:flex)
        Two thick diagonal ribbons crossing in an X-shaped arrangement.
        - Dark ribbon behind (z-index: 2)
        - White ribbon in front (z-index: 3, crosses over dark ribbon)
        ========================================================================
      */}
      <div className={`hidden md:flex relative w-full ${containerHeightClass} overflow-hidden items-center justify-center`}>
        {/* Ribbon 2 (BEHIND): Dark Charcoal, tilted darkAngle */}
        <div
          className={`absolute w-[160vw] max-w-none left-1/2 ${ribbonHeightClass} border-y border-white/10 overflow-hidden flex items-center pointer-events-none`}
          style={{
            zIndex: 2,
            backgroundColor: darkBg,
            transform: `translateX(-50%) rotate(${darkAngle}deg)`,
            transformOrigin: 'center center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.85)',
          }}
        >
          <div className={`${darkAnimClass} flex items-center shrink-0`}>
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`desk-dark-a-${tech.name}-${idx}`}
                className="flex items-center justify-center px-6 sm:px-8 md:px-10 shrink-0"
              >
                <img
                  src={tech.lightSrc}
                  alt={tech.name}
                  loading="lazy"
                  className={`h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[125px] md:max-w-[145px] object-contain ${
                    tech.darkContrastClass || ''
                  }`}
                />
              </div>
            ))}
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`desk-dark-b-${tech.name}-${idx}`}
                aria-hidden="true"
                className="flex items-center justify-center px-6 sm:px-8 md:px-10 shrink-0"
              >
                <img
                  src={tech.lightSrc}
                  alt=""
                  loading="lazy"
                  className={`h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[125px] md:max-w-[145px] object-contain ${
                    tech.darkContrastClass || ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ribbon 1 (IN FRONT): Pure White (#FFFFFF), tilted whiteAngle, crosses over dark */}
        <div
          className={`absolute w-[160vw] max-w-none left-1/2 ${ribbonHeightClass} overflow-hidden flex items-center pointer-events-none`}
          style={{
            zIndex: 3,
            backgroundColor: whiteBg,
            transform: `translateX(-50%) rotate(${whiteAngle}deg)`,
            transformOrigin: 'center center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
          }}
        >
          <div className={`${whiteAnimClass} flex items-center shrink-0`}>
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`desk-white-a-${tech.name}-${idx}`}
                className="flex items-center justify-center px-6 sm:px-8 md:px-10 shrink-0"
              >
                <img
                  src={tech.darkSrc}
                  alt={tech.name}
                  loading="lazy"
                  className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[125px] md:max-w-[145px] object-contain drop-shadow-sm"
                />
              </div>
            ))}
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`desk-white-b-${tech.name}-${idx}`}
                aria-hidden="true"
                className="flex items-center justify-center px-6 sm:px-8 md:px-10 shrink-0"
              >
                <img
                  src={tech.darkSrc}
                  alt=""
                  loading="lazy"
                  className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[125px] md:max-w-[145px] object-contain drop-shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        2. MOBILE LAYOUT (768px and below: md:hidden)
        Two straight horizontal ribbons, one above the other.
        - Dark ribbon on top
        - White ribbon below
        - Full viewport width, zero rotation, seamless infinite marquee
        ========================================================================
      */}
      <div className="flex md:hidden flex-col w-full py-4 gap-3 bg-black overflow-hidden">
        {/* Top Horizontal Ribbon: Dark Charcoal */}
        <div
          className={`w-full ${mobileHeightClass} border-y border-white/10 overflow-hidden flex items-center shadow-lg`}
          style={{ backgroundColor: darkBg }}
        >
          <div className={`${darkAnimClass} flex items-center shrink-0`}>
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`mob-dark-a-${tech.name}-${idx}`}
                className="flex items-center justify-center px-5 shrink-0"
              >
                <img
                  src={tech.lightSrc}
                  alt={tech.name}
                  loading="lazy"
                  className={`h-6 w-auto max-w-[90px] object-contain ${
                    tech.darkContrastClass || ''
                  }`}
                />
              </div>
            ))}
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`mob-dark-b-${tech.name}-${idx}`}
                aria-hidden="true"
                className="flex items-center justify-center px-5 shrink-0"
              >
                <img
                  src={tech.lightSrc}
                  alt=""
                  loading="lazy"
                  className={`h-6 w-auto max-w-[90px] object-contain ${
                    tech.darkContrastClass || ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Ribbon: White */}
        <div
          className={`w-full ${mobileHeightClass} overflow-hidden flex items-center shadow-md`}
          style={{ backgroundColor: whiteBg }}
        >
          <div className={`${whiteAnimClass} flex items-center shrink-0`}>
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`mob-white-a-${tech.name}-${idx}`}
                className="flex items-center justify-center px-5 shrink-0"
              >
                <img
                  src={tech.darkSrc}
                  alt={tech.name}
                  loading="lazy"
                  className="h-6 w-auto max-w-[90px] object-contain drop-shadow-sm"
                />
              </div>
            ))}
            {TECH_LOGOS.map((tech, idx) => (
              <div
                key={`mob-white-b-${tech.name}-${idx}`}
                aria-hidden="true"
                className="flex items-center justify-center px-5 shrink-0"
              >
                <img
                  src={tech.darkSrc}
                  alt=""
                  loading="lazy"
                  className="h-6 w-auto max-w-[90px] object-contain drop-shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

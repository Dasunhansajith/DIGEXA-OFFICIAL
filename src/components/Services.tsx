import React, { useEffect, useRef } from 'react';
import { 
  Globe, 
  Code2, 
  ShoppingBag, 
  Bot, 
  Megaphone, 
  Smartphone, 
  Palette, 
  Layout 
} from 'lucide-react';
import { gsap } from '@/lib/gsap';

export interface ServiceCard {
  id: string;
  number: string;
  title: string;
  watermark: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'web-app-dev',
    number: '01',
    title: 'WEB APPLICATION DEVELOPMENT',
    watermark: 'WEB APPS',
    description:
      'High-performance web applications and bespoke digital platforms engineered with cutting-edge architectures, seamless data flows, and interactive user experiences.',
    icon: Globe,
  },
  {
    id: 'software-dev',
    number: '02',
    title: 'SOFTWARE DEVELOPMENT',
    watermark: 'SOFTWARE',
    description:
      'Enterprise-grade software systems, secure cloud microservices, and robust APIs architected to streamline operations and scale businesses with zero compromise.',
    icon: Code2,
  },
  {
    id: 'ecommerce',
    number: '03',
    title: 'E-COMMERCE SOLUTIONS',
    watermark: 'COMMERCE',
    description:
      'Conversion-optimized digital commerce storefronts, custom checkout pipelines, and frictionless transaction architectures designed to scale global sales.',
    icon: ShoppingBag,
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI / AUTOMATION',
    watermark: 'AI SYSTEM',
    description:
      'Custom artificial intelligence integrations, automated neural workflow pipelines, and predictive intelligent systems that drive operational autonomy.',
    icon: Bot,
  },
  {
    id: 'social-media',
    number: '05',
    title: 'SOCIAL MEDIA MARKETING',
    watermark: 'MARKETING',
    description:
      'Data-driven audience acquisition, high-impact creative campaigns, and strategic content systems that elevate digital authority and convert followers into brand advocates.',
    icon: Megaphone,
  },
  {
    id: 'mobile-app-dev',
    number: '06',
    title: 'MOBILE APP DEVELOPMENT',
    watermark: 'MOBILE',
    description:
      'High-performance iOS and Android applications offering native fluid responsiveness, offline-first reliability, and engaging gesture-driven user journeys.',
    icon: Smartphone,
  },
  {
    id: 'branding',
    number: '07',
    title: 'BRANDING',
    watermark: 'BRANDING',
    description:
      'Distinctive visual identities, bespoke design systems, and holistic brand narratives that position forward-thinking companies as timeless industry leaders.',
    icon: Palette,
  },
  {
    id: 'ui-ux-dev',
    number: '08',
    title: 'UI / UX DEVELOPMENT',
    watermark: 'UI / UX',
    description:
      'Intuitive interface architecture, human-centric design thinking, and rapid interactive prototyping that eliminate user friction and maximize engagement.',
    icon: Layout,
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Ambient Background Glow Parallax
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // 2. Section Header Scroll Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      // Section label reveal
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }

      // Line-by-line heading reveal from masked overflows
      if (headingLine1Ref.current && headingLine2Ref.current) {
        tl.fromTo(
          [headingLine1Ref.current, headingLine2Ref.current],
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.16 },
          '-=0.5'
        );
      }

      // Supporting description fade
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.8'
        );
      }

      // 3. Staggered Service Cards Entrance
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services"
      className="relative z-10 w-full bg-black text-white pt-12 pb-14 sm:pt-16 sm:pb-20 lg:py-40 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Subtle atmospheric dark-red ambient gradient */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 w-[75vw] sm:w-[50vw] lg:w-[42vw] h-[65vh] max-w-[750px] max-h-[650px] bg-[radial-gradient(circle_at_75%_45%,rgba(235,35,45,0.18)_0%,rgba(145,15,25,0.06)_45%,transparent_72%)] blur-3xl"
      />

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-6 sm:space-y-8 mb-14 sm:mb-18 lg:mb-20">
          
          {/* Section Label */}
          <div 
            ref={labelRef} 
            className="flex items-center gap-3"
          >
            {/* Pulsing red circular indicator */}
            <span 
              aria-hidden="true" 
              className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shadow-[0_0_12px_rgba(255,0,0,0.85)] shrink-0 animate-pulse" 
            />
            <span className="text-xs sm:text-[13px] font-mono tracking-[0.25em] text-white/70 uppercase font-semibold">
              OUR EXPERTISE
            </span>
          </div>

          {/* Main Heading & Supporting Description Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            
            {/* Heading */}
            <div className="lg:col-span-8 space-y-2">
              {/* Line 1: DIGITAL SOLUTIONS */}
              <div className="overflow-hidden">
                <h2
                  ref={headingLine1Ref}
                  className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] leading-[1.04] tracking-[-0.01em] uppercase text-white font-normal"
                >
                  DIGITAL SOLUTIONS
                </h2>
              </div>

              {/* Line 2: THAT MAKE AN IMPACT. */}
              <div className="overflow-hidden">
                <h2
                  ref={headingLine2Ref}
                  className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] leading-[1.04] tracking-[-0.01em] uppercase text-white font-normal"
                >
                  THAT MAKE AN{' '}
                  <span className="text-[#FF0000] drop-shadow-[0_0_35px_rgba(255,0,0,0.35)]">
                    IMPACT.
                  </span>
                </h2>
              </div>
            </div>

            {/* Supporting Description */}
            <div className="lg:col-span-4 pb-1">
              <p
                ref={descRef}
                className="text-sm sm:text-base lg:text-[1.05rem] text-white/70 font-sans font-light leading-relaxed max-w-lg"
              >
                From powerful digital platforms to distinctive brand experiences, DIGEXA combines creativity and technology to bring ambitious ideas to life.
              </p>
            </div>

          </div>

        </div>

        {/* Two-Column Grid of Refined Compact Service Cards */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-[22px] w-full"
        >
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="group relative bg-[#171719] hover:bg-[#420000] transition-colors duration-500 ease-out p-6 sm:p-7 md:p-[32px] rounded-none border border-white/[0.04] hover:border-[#FF0000]/40 overflow-hidden cursor-pointer select-none flex items-center min-h-[170px] md:h-[215px]"
              >
                {/* Large Semi-Transparent Service Title Watermark Behind Content */}
                <div 
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 font-serif font-black uppercase text-4xl sm:text-5xl lg:text-6xl text-white/5 group-hover:text-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none select-none tracking-tight translate-y-2 group-hover:translate-y-0"
                >
                  {service.watermark}
                </div>

                {/* Card Foreground Content - Vertically Centered */}
                <div className="flex items-center gap-5 sm:gap-6 relative z-10 w-full">
                  
                  {/* LEFT: 60px Diameter White Circular Icon Background */}
                  <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-md">
                    <Icon className="w-6 h-6 stroke-[1.75] text-black" />
                  </div>

                  {/* RIGHT: Service Heading & Description */}
                  <div className="space-y-2 flex-1">
                    <h3 className="font-serif text-[21px] sm:text-[22px] font-normal tracking-tight uppercase text-white leading-snug transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-[#aaaaaa] group-hover:text-white/85 font-sans font-light transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div 
                  aria-hidden="true" 
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF0000] group-hover:w-full transition-all duration-500 ease-out" 
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;

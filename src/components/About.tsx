import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (imageWrapperRef.current) {
        gsap.set(imageWrapperRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Red Smoke Parallax Background Movement
      if (smokeRef.current) {
        gsap.to(smokeRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // 2. Main Timeline for Left Column & Heading
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

      // Line-by-line heading reveal from below overflow mask
      if (headingLine1Ref.current && headingLine2Ref.current) {
        tl.fromTo(
          [headingLine1Ref.current, headingLine2Ref.current],
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.16 },
          '-=0.5'
        );
      }

      // Left description paragraphs fade upward on scroll
      if (descRef.current) {
        tl.fromTo(
          descRef.current.children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
          '-=0.8'
        );
      }

      // 3. Right Column: Main Image Clip-Path Reveal
      if (imageWrapperRef.current && imageRef.current) {
        // Initial clip-path state: hidden from bottom
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle image scale-down on reveal for cinematic polish
        gsap.fromTo(
          imageRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Red Square Badge Entrance (Subtle Scale & Entrance)
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.75, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 70%',
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
      id="about"
      aria-label="About DIGEXA"
      className="relative z-10 w-full bg-black text-white pt-12 pb-14 sm:pt-16 sm:pb-20 lg:py-40 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Decorative Red Smoke Photograph Background */}
      <div
        ref={smokeRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 sm:top-0 right-0 sm:right-1/4 w-[340px] sm:w-[500px] lg:w-[650px] xl:w-[720px] h-[550px] sm:h-[750px] lg:h-[900px] select-none opacity-40 mix-blend-screen overflow-hidden z-0"
      >
        <img
          src="/images/about-red-smoke.jpeg"
          alt=""
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        {/* Soft edge feathering gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* Section Label */}
        <div 
          ref={labelRef} 
          className="flex items-center gap-3 mb-10 sm:mb-14 lg:mb-16"
        >
          {/* Small red circular indicator */}
          <span 
            aria-hidden="true" 
            className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shadow-[0_0_12px_rgba(255,0,0,0.85)] shrink-0 animate-pulse" 
          />
          <span className="text-xs sm:text-[13px] font-mono tracking-[0.25em] text-white/70 uppercase font-semibold">
            ABOUT DIGEXA
          </span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          
          {/* Left Column: Heading & Description */}
          <div 
            ref={leftColRef} 
            className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-8 sm:space-y-10"
          >
            {/* Main Heading */}
            <div className="space-y-2">
              {/* Line 1: WELCOME TO THE */}
              <div className="overflow-hidden">
                <h2
                  ref={headingLine1Ref}
                  className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] leading-[1.04] tracking-[-0.01em] uppercase text-white font-normal"
                >
                  WELCOME TO THE
                </h2>
              </div>

              {/* Line 2: WORLD OF DIGEXA. */}
              <div className="overflow-hidden">
                <h2
                  ref={headingLine2Ref}
                  className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] leading-[1.04] tracking-[-0.01em] uppercase text-white font-normal"
                >
                  WORLD OF{' '}
                  <span className="text-[#FF0000] drop-shadow-[0_0_35px_rgba(255,0,0,0.35)]">
                    DIGEXA.
                  </span>
                </h2>
              </div>
            </div>

            {/* Description Paragraphs (Fades upward on scroll) */}
            <div 
              ref={descRef} 
              className="space-y-6 sm:space-y-7 max-w-xl"
            >
              <p className="text-base sm:text-lg lg:text-[1.125rem] text-white/85 font-sans font-light leading-relaxed">
                DIGEXA is a creative digital agency where bold ideas meet innovative technology. We specialize in crafting exceptional digital experiences, powerful software solutions, and distinctive brand identities that help businesses stand out in the digital world.
              </p>

              <p className="text-sm sm:text-base lg:text-[1rem] text-white/60 font-sans font-light leading-relaxed">
                From strategy and design to development and innovation, we transform ambitious concepts into meaningful digital solutions.
              </p>
            </div>

          </div>

          {/* Right Column: AI Microchip Feature Image & Overlapping Red Badge */}
          <div className="lg:col-span-6 xl:col-span-6 relative lg:-mt-10 xl:-mt-14 w-full">
            
            {/* Main Rectangular Feature Image Container with Clip-Path Reveal */}
            <div
              ref={imageWrapperRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-[#0d0e14] shadow-2xl"
              style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            >
              <img
                ref={imageRef}
                src="/images/about-ai-chip.jpg"
                alt="DIGEXA AI Technology & Innovation"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Subtle dark gradient overlay for depth and contrast */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" 
              />
              <div 
                aria-hidden="true" 
                className="absolute inset-0 border border-white/[0.08] pointer-events-none" 
              />
            </div>

            {/* Bright-Red Square Badge Overlapping the Lower-Left Corner */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 left-4 sm:-bottom-8 sm:-left-6 lg:-bottom-10 lg:-left-10 z-20 w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52 bg-[#FF0000] text-black p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(255,0,0,0.45)] select-none"
              aria-label="DIGEXA Creative Digital Solutions Badge"
            >
              {/* Badge Brand Header */}
              <div className="flex items-center justify-between border-b border-black/25 pb-2">
                <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] uppercase text-black">
                  DIGEXA
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>

              {/* Badge Main Title */}
              <div className="pt-2">
                <div className="font-sans font-black uppercase text-base sm:text-lg lg:text-xl xl:text-[1.35rem] leading-[1.08] tracking-tight text-black">
                  CREATIVE
                  <br />
                  DIGITAL
                  <br />
                  SOLUTIONS
                </div>
              </div>

              {/* Subtle architectural corner accents */}
              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-black/70 uppercase pt-2">
                <span>EST. 2026</span>
                <span>GLOBAL</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;

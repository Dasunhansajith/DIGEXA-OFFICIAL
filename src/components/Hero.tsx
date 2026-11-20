import React, { useState, useEffect, useRef } from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const TYPEWRITER_WORDS = [
  'INSTANTLY!',
  'CREATIVELY!',
  'SEAMLESSLY!',
  'BEAUTIFULLY!',
  'INTELLIGENTLY!',
];

const TYPING_SPEED = 90; // ms per character
const DELETING_SPEED = 50; // ms per character
const WORD_PAUSE = 1500; // 1.5 seconds pause after completion

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const callUsRef = useRef<HTMLAnchorElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const solidCircleRef = useRef<HTMLDivElement>(null);
  const outlinedCircleRef = useRef<HTMLDivElement>(null);

  // Typewriter state
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // GSAP Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline Entrance
      if (headlineLine1Ref.current && headlineLine2Ref.current) {
        tl.fromTo(
          headlineLine1Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1, delay: 0.1 }
        ).fromTo(
          headlineLine2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=0.85'
        );
      }

      // Supporting copy & Call Us
      if (subtextRef.current && callUsRef.current) {
        tl.fromTo(
          [subtextRef.current, callUsRef.current],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
          '-=0.7'
        );
      }

      // Overlapping Circles
      if (circlesRef.current) {
        tl.fromTo(
          circlesRef.current,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' },
          '-=1.0'
        );

        // Subtle organic breathing float for the overlapping circles
        if (solidCircleRef.current && outlinedCircleRef.current) {
          gsap.to(solidCircleRef.current, {
            y: -12,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to(outlinedCircleRef.current, {
            y: 10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Infinite Typewriter Effect
  useEffect(() => {
    // Respect reduced-motion preferences: display primary static word without typing cycles
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedText(TYPEWRITER_WORDS[0]);
      return;
    }

    const currentWord = TYPEWRITER_WORDS[wordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        // Typing characters
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, TYPING_SPEED);
      } else {
        // Pause 1.5s after completing the word
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, WORD_PAUSE);
      }
    } else {
      if (displayedText.length > 0) {
        // Deleting characters
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, DELETING_SPEED);
      } else {
        // Word completely deleted, switch to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Hero Section"
      className="relative z-10 w-full h-auto min-h-0 lg:min-h-[calc(100vh-96px)] lg:h-[calc(100vh-96px)] flex flex-col justify-start lg:justify-between overflow-hidden bg-black"
    >
      {/* Deep-red gradient toward the upper-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[85vw] sm:w-[65vw] lg:w-[50vw] h-[85vh] max-w-[950px] max-h-[850px] bg-[radial-gradient(ellipse_at_80%_15%,rgba(235,35,45,0.42)_0%,rgba(145,15,25,0.18)_40%,transparent_72%)] blur-2xl"
      />

      {/* Main Hero Content Area - Compact content-based height on mobile, centered on desktop */}
      <div className="max-w-[1440px] mx-auto px-[22px] sm:px-[24px] lg:px-16 w-full flex-1 flex flex-col justify-start lg:justify-center pt-[75px] sm:pt-[85px] lg:py-6 pb-[45px] sm:pb-[50px] lg:pb-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">

          {/* Left Column: Headlines & Call to action */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col items-start text-left">

            {/* Primary Main Headline */}
            <div className="space-y-1 sm:space-y-2 w-full mb-[20px] sm:mb-[22px] lg:mb-0">
              {/* First Line: Elegant White Serif */}
              <h1
                ref={headlineLine1Ref}
                className="font-serif text-white uppercase text-[30px] xs:text-[36px] sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.75rem] leading-[1.06] sm:leading-[1.04] tracking-[-0.01em] font-normal"
              >
                IDEAS TO REALITY
              </h1>

              {/* Second Line: Bright-Red Serif Typewriter with Blinking Cursor */}
              <h2
                ref={headlineLine2Ref}
                className="font-serif text-[#FF0000] uppercase text-[30px] xs:text-[36px] sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.75rem] leading-[1.06] sm:leading-[1.04] tracking-[-0.01em] font-normal drop-shadow-[0_0_35px_rgba(255,0,0,0.35)] min-h-[1.15em] flex items-center"
                aria-live="polite"
              >
                <span className="inline-block">{displayedText}</span>
                {/* Blinking vertical cursor */}
                <span
                  aria-hidden="true"
                  className="inline-block text-[#FF0000] font-serif font-light ml-1 sm:ml-2 animate-cursor-blink select-none"
                >
                  |
                </span>
              </h2>
            </div>

            {/* Supporting Micro Copy */}
            <div
              ref={subtextRef}
              className="max-w-xl text-sm sm:text-base text-white/60 font-sans font-normal leading-relaxed mb-[26px] sm:mb-[28px] lg:mb-0 lg:mt-6"
            >
              DIGEXA is a high-caliber digital agency translating ambitious brand visions into bespoke, cutting-edge interactive web experiences and digital products.
            </div>

            {/* CALL US Action Cluster */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:mt-8">
              <a
                ref={callUsRef}
                href="tel:+94766414622"
                className="inline-flex items-center gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f52d2d] rounded-full p-1"
                aria-label="Call DIGEXA team"
              >
                {/* Red Circular Phone Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f52d2d] group-hover:bg-[#d92222] transition-all duration-300 group-hover:scale-105 active:scale-95 flex items-center justify-center text-white shadow-[0_0_25px_rgba(245,45,45,0.45)] shrink-0">
                  <Phone className="w-5 h-5 fill-white/20 transition-transform duration-300 group-hover:rotate-12" />
                </div>

                {/* Call Us Text */}
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.22em] text-white uppercase group-hover:text-[#f52d2d] transition-colors">
                    CALL US
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-white/50 tracking-wider">
                    +94 76 641 4622
                  </span>
                </div>
              </a>

              {/* Secondary Explore Action */}
              <a
                href="#projects"
                className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium tracking-[0.18em] text-white/70 hover:text-white uppercase transition-colors group"
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="w-4 h-4 text-[#f52d2d] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Large Negative Space & Two Overlapping Circles (Desktop only, hidden on 768px and below) */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 items-center justify-center lg:justify-end relative">
            <div
              ref={circlesRef}
              className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 xl:w-96 xl:h-96 flex items-center justify-center"
              aria-label="Hero visual motif"
            >
              {/* White Outlined Circle */}
              <div
                ref={outlinedCircleRef}
                className="absolute inset-0 rounded-full border-[1.5px] border-white/70 transition-all duration-700"
              />

              {/* Solid Red Circle Overlapping */}
              <div
                ref={solidCircleRef}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 xl:w-56 xl:h-56 rounded-full bg-[#f52d2d] shadow-[0_0_50px_rgba(245,45,45,0.45)] transition-all duration-700 flex items-center justify-center"
              >
                {/* Subtle internal concentric ring */}
                <div className="w-full h-full rounded-full border border-white/20" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Horizontal Information Bar Anchored to the Very Bottom Inside Hero */}
      <div
        aria-label="Agency Overview Strip"
        className="w-full bg-[#000000] border-t border-b border-[#222222] relative z-20 h-[48px] sm:h-[54px] lg:h-[60px] flex items-center flex-shrink-0"
      >
        <div className="max-w-[1440px] mx-auto px-4 xs:px-[22px] sm:px-[24px] lg:px-16 w-full">
          <div className="grid grid-cols-3 items-center w-full gap-2 sm:gap-4">
            {/* LEFT: CREATIVE & DIGITAL STRATEGY */}
            <div className="text-left">
              <span className="font-mono text-[9px] xs:text-[10.5px] sm:text-[11.5px] md:text-[12px] uppercase tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.22em] text-[#777777] font-medium block truncate sm:overflow-visible">
                CREATIVE & DIGITAL STRATEGY
              </span>
            </div>

            {/* CENTER: HIGH SPEED EXECUTION */}
            <div className="text-center">
              <span className="font-mono text-[9px] xs:text-[10.5px] sm:text-[11.5px] md:text-[12px] uppercase tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.22em] text-[#777777] font-medium block truncate sm:overflow-visible">
                HIGH SPEED EXECUTION
              </span>
            </div>

            {/* RIGHT: EST. 2025 */}
            <div className="text-right">
              <span className="font-mono text-[9px] xs:text-[10.5px] sm:text-[11.5px] md:text-[12px] uppercase tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.22em] text-[#777777] font-medium block truncate sm:overflow-visible">
                EST. 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

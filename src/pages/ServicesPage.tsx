import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import aboutRedSmoke from '@/assets/images/about-red-smoke.jpeg';
import { SERVICES_DATA } from '@/components/Services';
import { ServicesSlider } from '@/components/services/ServicesSlider';
import { ServicesExpertiseAndTech } from '@/components/services/ServicesExpertiseAndTech';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 
        ========================================================================
        1. SERVICES PAGE BANNER
        - Full-width cinematic banner directly below navigation
        - Deep black background with dramatic red smoke texture
        - Height: 225–250px on desktop
        - Large centered white serif heading: "OUR SERVICES"
        - Breadcrumb underneath: "HOME | OUR SERVICES"
        ========================================================================
      */}
      <section
        aria-label="Services Page Header"
        className="relative w-full h-[220px] sm:h-[235px] md:h-[250px] overflow-hidden flex items-center justify-center border-b border-white/[0.08]"
      >
        {/* Red Smoke Background Visual */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        >
          <img
            src={aboutRedSmoke}
            alt=""
            className="w-full h-full object-cover object-center opacity-75 mix-blend-screen scale-110 filter saturate-150 contrast-125"
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* Banner Content (Centered) */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* Heading: OUR SERVICES */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold uppercase tracking-tight text-white leading-tight">
            OUR SERVICES
          </h1>

          {/* Breadcrumb Navigation: HOME | OUR SERVICES */}
          <nav
            aria-label="Breadcrumb"
            className="mt-3 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-mono tracking-[0.22em] uppercase select-none"
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
            <span className="text-white font-medium">OUR SERVICES</span>
          </nav>
        </div>
      </section>

      {/* 
        ========================================================================
        2. MAIN SERVICES INTRODUCTION SECTION
        - Spacious black section
        - Center content inside container around 1210px
        - Two columns: Left (approx 48%), Right (approx 52%)
        - Thin dark-gray vertical guide lines at container boundaries
        ========================================================================
      */}
      <section
        aria-label="Services Introduction"
        className="relative w-full bg-black py-16 sm:py-20 lg:py-24 border-b border-white/[0.06]"
      >
        {/* Main Content Container matching ~1210px reference width */}
        <div className="max-w-[1210px] mx-auto px-6 sm:px-10 lg:px-12 relative">
          {/* Subtle vertical architectural guide lines at boundaries */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-6 sm:left-10 lg:left-12 top-0 bottom-0 w-[1px] bg-white/[0.05] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute right-6 sm:right-10 lg:right-12 top-0 bottom-0 w-[1px] bg-white/[0.05] pointer-events-none"
          />

          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 sm:gap-14 lg:gap-16">
            
            {/* 
              LEFT COLUMN (Approx 48%)
              - Red dot indicator + "WHAT WE OFFER"
              - Large editorial serif headline:
                UNLOCK REVENUE (white)
                GROWTH FOR YOUR (white)
                BUSINESS (muted gray)
            */}
            <div className="w-full lg:w-[48%] space-y-5 sm:space-y-6">
              {/* Section Subtitle with Red Dot */}
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.8)] shrink-0"
                />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
                  WHAT WE OFFER
                </span>
              </div>

              {/* Large Editorial Heading */}
              <h2 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-bold uppercase tracking-tight leading-[1.06] text-left">
                <span className="block text-white">UNLOCK REVENUE</span>
                <span className="block text-white">GROWTH FOR YOUR</span>
                <span className="block text-[#777777]">BUSINESS</span>
              </h2>
            </div>

            {/* 
              RIGHT COLUMN (Approx 52%)
              - Two professional paragraphs introducing DIGEXA's digital agency services
              - Occurrences of DIGEXA highlighted in red
              - Clean sans-serif typography, comfortable line height
            */}
            <div className="w-full lg:w-[52%] space-y-6 text-[#B0B0B5] font-sans text-sm sm:text-base leading-relaxed lg:pt-8">
              <p>
                At <span className="text-[#FF0000] font-medium">DIGEXA</span>, we engineer bespoke digital solutions that bridge visionary creativity with rigorous technical execution. From enterprise-grade website design and full-stack web applications to transformative brand identities, our multidisciplinary team builds immersive digital experiences tailored to propel your business forward in an increasingly competitive marketplace.
              </p>
              <p>
                We partner with forward-thinking enterprises and fast-growing founders to accelerate online growth through high-conversion digital commerce, intuitive UI/UX design, and data-driven marketing systems. By aligning custom technology with strategic brand storytelling, <span className="text-[#FF0000] font-medium">DIGEXA</span> empowers brands to improve their online presence, captivate modern audiences, and unlock sustainable revenue growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        3. FULL-WIDTH CINEMATIC SERVICES IMAGE SLIDER
        - Directly below the "WHAT WE OFFER" introduction section
        - Edge-to-edge continuous photography wall (4 panels desktop, no gaps)
        - Interactive drag, swipe, hover reveals, and smooth snap
        ========================================================================
      */}
      <ServicesSlider />

      {/* 
        ========================================================================
        4. OUR EXPERTISE & CROSSING TECHNOLOGY RIBBONS
        - Multi-row compact service pills (Red Outline, Solid Red, White)
        - Centered TECHNOLOGIES WE USE heading with red indicator
        - Two crossing diagonal technology ribbons with opposite marquee animations
        ========================================================================
      */}
      <ServicesExpertiseAndTech />

      {/* 
        ========================================================================
        4. SERVICES OFFERINGS GRID
        - Retains all 8 core services below the slider
        - Two-column compact rectangular cards (#171719) matching reference
        - 60px white icon circle on left, serif title & description on right
        ========================================================================
      */}
      <section
        id="detailed-services"
        aria-label="Detailed Service Offerings"
        className="relative w-full bg-black py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-[1210px] mx-auto px-6 sm:px-10 lg:px-12 relative">
          {/* Subtle vertical architectural guide lines at boundaries */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-6 sm:left-10 lg:left-12 top-0 bottom-0 w-[1px] bg-white/[0.05] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute right-6 sm:right-10 lg:right-12 top-0 bottom-0 w-[1px] bg-white/[0.05] pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
            {SERVICES_DATA.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="group relative bg-[#171719] hover:bg-[#3d0000] transition-colors duration-500 ease-out p-6 sm:p-7 md:p-8 rounded-none border border-white/[0.04] hover:border-[#FF0000]/40 overflow-hidden cursor-pointer select-none flex items-center min-h-[170px] md:h-[215px]"
                >
                  {/* Large Semi-Transparent Service Title Watermark */}
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-2 -right-2 font-serif font-black uppercase text-4xl sm:text-5xl lg:text-6xl text-white/5 group-hover:text-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none select-none tracking-tight translate-y-2 group-hover:translate-y-0"
                  >
                    {service.watermark}
                  </div>

                  {/* Card Content - Vertically Centered */}
                  <div className="flex items-center gap-5 sm:gap-6 relative z-10 w-full">
                    {/* Left: 60px White Circular Icon */}
                    <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-md">
                      <Icon className="w-6 h-6 stroke-[1.75] text-black" />
                    </div>

                    {/* Right: Service Heading & Description */}
                    <div className="space-y-1.5 sm:space-y-2 flex-1">
                      <h3 className="font-serif text-[20px] sm:text-[21px] md:text-[22px] font-normal tracking-tight uppercase text-white leading-snug transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#aaaaaa] group-hover:text-white/90 font-sans font-light transition-colors duration-300">
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
    </div>
  );
};

export default ServicesPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import aboutRedSmoke from '@/assets/images/about-red-smoke.jpeg';
import { 
  TALL_PROJECTS, 
  CATEGORY_FILTERS, 
  type CategoryFilter 
} from '@/data/projects';
import { ProjectShowcaseGrid } from '@/components/projects/ProjectShowcaseGrid';
import { ProjectsCinematicCTA } from '@/components/cta/ProjectsCinematicCTA';
import { TechLogoMarquee } from '@/components/marquee/TechLogoMarquee';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('SEE ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = TALL_PROJECTS.filter((project) => {
    if (activeFilter === 'SEE ALL') return true;
    return project.filterCategories.includes(activeFilter);
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* 
        ========================================================================
        1. PROJECTS PAGE BANNER
        - Full-width cinematic banner directly below navigation
        - Deep black background with visible flowing red smoke texture
        - Height: 180–220px on desktop
        - Centered white serif heading: "PROJECTS"
        - Breadcrumb underneath: "HOME | OUR PROJECTS"
        - Thin horizontal border beneath the banner
        ========================================================================
      */}
      <section
        aria-label="Projects Page Header"
        className="relative w-full h-[185px] sm:h-[200px] md:h-[220px] overflow-hidden flex items-center justify-center border-b border-white/[0.08]"
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
          {/* Heading: PROJECTS */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold uppercase tracking-tight text-white leading-tight">
            PROJECTS
          </h1>

          {/* Breadcrumb Navigation: HOME | OUR PROJECTS */}
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
            <span className="text-white font-medium">OUR PROJECTS</span>
          </nav>
        </div>
      </section>

      {/* 
        ========================================================================
        2. PROJECTS SHOWCASE SECTION (EXACT HOMEPAGE DESIGN)
        - Uses the exact same layout, typography, filters, and spacing as Homepage
        - Left: Red dot + "PROJECTS" + "DISCOVER OUR" (white) "PROJECTS" (gray)
        - Right: Architectural Category Filters with thin red indicator
        - Grid: Shared ProjectShowcaseGrid with identical tall screenshots,
          grayscale-to-color transition, and centered floating white/red info boxes
        ========================================================================
      */}
      <section
        id="projects-showcase"
        aria-label="Complete Projects Portfolio"
        className="relative z-10 w-full bg-[#050505] text-white py-20 sm:py-28 lg:py-32 overflow-hidden"
      >
        {/* Centered container matching exact Homepage max-width ~1320px */}
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end justify-between">
              
              {/* Left Header Block */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Section Subtitle with Red Dot */}
                <div className="flex items-center gap-2.5">
                  <span 
                    aria-hidden="true" 
                    className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shadow-[0_0_10px_rgba(255,0,0,0.85)] shrink-0" 
                  />
                  <span className="text-xs sm:text-[13px] font-mono tracking-[0.25em] text-white/80 uppercase font-semibold">
                    PROJECTS
                  </span>
                </div>

                {/* Main Heading: DISCOVER OUR (white) PROJECTS (muted gray) */}
                <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight uppercase font-normal">
                  <span className="text-white block">DISCOVER OUR</span>
                  <span className="text-[#969696] block">PROJECTS</span>
                </h2>

              </div>

              {/* Right Side: Exact Homepage Category Filters with Thin Red Indicator */}
              <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-x-6 gap-y-3 pt-2">
                {CATEGORY_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-[#969696] hover:text-white'
                      }`}
                    >
                      {/* Thin red indicator beside the active category */}
                      {isActive && (
                        <span 
                          aria-hidden="true" 
                          className="w-[2px] h-3.5 bg-[#FF0000] mr-2 inline-block shadow-[0_0_8px_#FF0000]" 
                        />
                      )}
                      <span>{filter}</span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Reusable Project Showcase Grid (Exact Homepage Presentation & Interactions) */}
          {filteredProjects.length > 0 ? (
            <ProjectShowcaseGrid projects={filteredProjects} />
          ) : (
            <div className="py-20 text-center space-y-4">
              <p className="font-serif text-2xl text-white/80">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setActiveFilter('SEE ALL')}
                className="font-mono text-xs uppercase tracking-widest text-[#FF0000] hover:underline"
              >
                View All Projects
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 
        ========================================================================
        3. CINEMATIC BUSINESS CTA SECTION
        - Full-width black-and-white businessperson photograph
        - Left-aligned headline, description, and red circular LET'S TALK CTA
        ========================================================================
      */}
      <ProjectsCinematicCTA />

      {/* 
        ========================================================================
        4. CROSSING TECHNOLOGY RIBBONS
        - Reusable TechLogoMarquee component
        - Dark ribbon moving right-to-left (rising to right)
        - White ribbon moving left-to-right (descending to right)
        ========================================================================
      */}
      <TechLogoMarquee
        darkAngle={-6}
        whiteAngle={6}
        darkDirection="left"
        whiteDirection="right"
        darkBg="#262629"
        ribbonHeightClass="h-[88px] sm:h-[96px] md:h-[105px] lg:h-[110px]"
        containerHeightClass="h-[240px] sm:h-[265px] md:h-[290px] lg:h-[310px]"
        mobileHeightClass="h-[58px] sm:h-[64px]"
      />
    </div>
  );
};

export default ProjectsPage;

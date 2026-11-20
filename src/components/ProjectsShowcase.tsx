import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { ProjectShowcaseGrid } from '@/components/projects/ProjectShowcaseGrid';
import { 
  TALL_PROJECTS, 
  CATEGORY_FILTERS, 
  type TallProject, 
  type CategoryFilter 
} from '@/data/projects';

export { TALL_PROJECTS, CATEGORY_FILTERS };
export type { TallProject, CategoryFilter };

export const ProjectsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('SEE ALL');

  // Instant category filtering without page refresh
  const filteredProjects = TALL_PROJECTS.filter((project) => {
    if (activeFilter === 'SEE ALL') return true;
    return project.filterCategories.includes(activeFilter);
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header Scroll Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Grid Entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
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
      id="work"
      aria-label="Our Projects Showcase"
      className="relative z-10 w-full bg-[#050505] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Centered container with max width ~1240–1320px */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          
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

              {/* View All Projects Navigation Button with Red Circle Arrow */}
              <div className="pt-2">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-3.5 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold text-white hover:text-white/80 transition-colors group cursor-pointer"
                  aria-label="View All Projects"
                >
                  <span>VIEW ALL PROJECTS</span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(255,0,0,0.4)]">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>

            </div>

            {/* Right Side: Category Filters with Thin Red Indicator */}
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

        {/* Two-Column Tall Website Screenshot Layout */}
        <ProjectShowcaseGrid
          gridRef={gridRef}
          projects={filteredProjects}
        />

      </div>
    </section>
  );
};

export default ProjectsShowcase;

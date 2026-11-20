import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000]"
      aria-label={`View ${project.title} - ${project.category}`}
    >
      {/* 
        ========================================================================
        1. MAIN SCREENSHOT CONTAINER
        - Consistent 16:10 aspect ratio matching 1280x800 native assets
        - Grayscale by default, smooth 700ms transition to full color on hover
        - Subtle 1.04 zoom on hover
        - Dark overlay softens on hover
        - Hover reveal: "VIEW PROJECT" with diagonal arrow
        - Contained without overflow
        ========================================================================
      */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0d0e12] border border-white/[0.06] group-hover:border-[#FF0000]/40 transition-colors duration-500">
        {/* Actual Project Screenshot */}
        <img
          src={project.image}
          alt={`${project.title} Screenshot`}
          loading="lazy"
          className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
        />

        {/* Subtle Dark Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors duration-700 pointer-events-none"
        />

        {/* Hover-Revealed Overlay Badge ("VIEW PROJECT" + Diagonal Arrow) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
        >
          <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-2.5 px-5 py-2.5 bg-black/90 border border-[#FF0000]/60 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-white font-semibold">
              VIEW PROJECT
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF0000] stroke-[2.5]" />
          </div>
        </div>

        {/* Minimal Bottom Red Indicator Line on Hover */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF0000] group-hover:w-full transition-all duration-700 ease-out"
        />
      </div>

      {/* 
        ========================================================================
        2. PROJECT INFORMATION (Below Screenshot)
        - Large white serif project name
        - Small uppercase muted category label with minimal red accent
        ========================================================================
      */}
      <div className="mt-5 sm:mt-6 space-y-1.5 sm:space-y-2">
        {/* Small Uppercase Muted Category Label with Minimal Red Accent */}
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#FF0000] shrink-0"
          />
          <span className="font-mono text-xs sm:text-[12.5px] uppercase tracking-[0.2em] text-[#888888] group-hover:text-[#aaaaaa] transition-colors duration-300">
            {project.category}
          </span>
        </div>

        {/* Large White Serif Project Name */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase tracking-tight text-white group-hover:text-[#FF0000] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-[#888888] group-hover:text-[#FF0000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

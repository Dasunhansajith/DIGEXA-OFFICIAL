import React from 'react';
import { Link } from 'react-router-dom';
import type { TallProject } from '@/data/projects';

export interface ProjectShowcaseCardProps {
  project: TallProject;
}

export const ProjectShowcaseCard: React.FC<ProjectShowcaseCardProps> = ({ project }) => {
  return (
    <Link
      to={`/projects/${project.slug || project.id}`}
      className="project-item relative group overflow-hidden bg-black cursor-pointer block select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000]"
      aria-label={`View ${project.name} - ${project.category}`}
    >
      {/* Tall Website Screenshot with exact homepage grayscale-to-color transition */}
      <img
        src={project.image}
        alt={`${project.name} Website Screenshot`}
        loading="lazy"
        className="project-image w-full h-auto block filter grayscale transition-[filter] duration-600 ease-in-out group-hover:grayscale-0"
      />

      {/* Centered Floating Overlay: White Name Box + Red Category Box */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="flex flex-col items-center max-w-[90%] sm:max-w-[85%] transition-all duration-500 ease-out opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-3 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
          {/* Top block: White background, Black text, Project name */}
          <div className="bg-white text-black font-sans font-bold text-xs sm:text-[13px] md:text-sm tracking-[0.2em] uppercase px-6 sm:px-8 py-2.5 sm:py-3 text-center w-full shadow-2xl border-b border-black/10">
            {project.name}
          </div>

          {/* Bottom block: Bright red background, White text, Category (serif) */}
          <div className="bg-[#FF0000] text-white font-serif text-sm sm:text-base md:text-lg tracking-[0.08em] uppercase font-semibold px-6 sm:px-8 py-2 sm:py-2.5 text-center w-full shadow-2xl">
            {project.category}
          </div>
        </div>
      </div>
    </Link>
  );
};

export interface ProjectShowcaseGridProps {
  projects: TallProject[];
  className?: string;
  gridRef?: React.Ref<HTMLDivElement>;
}

export const ProjectShowcaseGrid: React.FC<ProjectShowcaseGridProps> = ({
  projects,
  className = '',
  gridRef,
}) => {
  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 w-full ${className}`}
    >
      {projects.map((project) => (
        <ProjectShowcaseCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectShowcaseGrid;


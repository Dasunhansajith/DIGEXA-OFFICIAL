import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '@/data/projects';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = PROJECTS_DATA.find(
    (p) =>
      p.slug === slug ||
      (slug === 'titan' && p.slug === 'titan-2026') ||
      (slug === 'battle-of-greens' && p.slug === 'battle-of-the-greens-2026')
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-6">
        <h1 className="text-4xl font-serif">Project Not Found</h1>
        <p className="text-[#A1A1AA]">The requested project does not exist in our portfolio.</p>
        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#151517] hover:bg-[#FF0000] text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#050505] text-white pt-28 sm:pt-36 pb-24 sm:pb-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(235,35,45,0.18)_0%,transparent_70%)] blur-3xl" 
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-[#A1A1AA] hover:text-white uppercase transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF0000] transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO PROJECTS</span>
          </Link>

          <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
            PROJECT {project.number}
          </span>
        </div>

        {/* Project Header Block */}
        <div className="space-y-4 sm:space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/20 uppercase">
            {project.category}
          </div>

          <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight uppercase text-white font-normal leading-[1.05]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[#A1A1AA] font-sans font-light leading-relaxed">
            {project.description}
          </p>

          {/* Visit Website button, only when valid URL configured */}
          {project.websiteUrl && (
            <div className="pt-2">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#d92222] text-white text-xs font-mono tracking-widest uppercase font-semibold transition-all shadow-[0_0_20px_rgba(255,0,0,0.4)]"
              >
                <span>VISIT WEBSITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Main Large Screenshot Showcase */}
        <div className="w-full aspect-[16/10] rounded-none overflow-hidden border border-white/[0.08] bg-[#151517] shadow-2xl">
          <img
            src={project.image}
            alt={`${project.title} Interface Preview`}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Project Details Grid: Overview, Features & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-6 border-t border-white/[0.08]">
          
          {/* Left Column: Comprehensive Overview */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-tight text-white font-normal">
              PROJECT OVERVIEW
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed">
              {project.overview}
            </p>

            {/* Key Features */}
            <div className="pt-6 space-y-4">
              <h3 className="font-mono text-xs sm:text-sm tracking-widest uppercase text-white/80 font-semibold">
                KEY ARCHITECTURAL HIGHLIGHTS
              </h3>
              <ul className="space-y-3.5">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#A1A1AA]">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Verified Technology Stack */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#151517] p-8 sm:p-10 border border-white/[0.06] space-y-6">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                <Layers className="w-5 h-5 text-[#FF0000]" />
                <h3 className="font-mono text-xs sm:text-sm tracking-widest uppercase text-white font-semibold">
                  VERIFIED TECH STACK
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-white bg-black/60 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-xs font-mono text-white/40 tracking-wider">
                CERTIFIED AGENCY DELIVERABLE
              </div>
            </div>
          </div>

        </div>

      </div>
    </article>
  );
};

export default ProjectDetailPage;


import React from 'react';
import { TechLogoMarquee } from '@/components/marquee/TechLogoMarquee';

interface ExpertisePill {
  name: string;
  variant: 'outline' | 'solid-red' | 'white';
  targetId?: string;
}

const EXPERTISE_TAGS: ExpertisePill[] = [
  { name: 'Web Application Development', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Branding', variant: 'solid-red', targetId: 'detailed-services' },
  { name: 'ERP Solutions', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Mobile App Development', variant: 'white', targetId: 'detailed-services' },
  { name: 'SEO', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Software Development', variant: 'outline', targetId: 'detailed-services' },
  { name: 'E-Commerce Solutions', variant: 'solid-red', targetId: 'detailed-services' },
  { name: 'Graphic Design', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Video Editing', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Website Maintenance', variant: 'white', targetId: 'detailed-services' },
  { name: 'Social Media Marketing', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Content Creation', variant: 'solid-red', targetId: 'detailed-services' },
  { name: 'PPC Advertising', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Email Marketing', variant: 'outline', targetId: 'detailed-services' },
  { name: 'UI/UX Design', variant: 'solid-red', targetId: 'detailed-services' },
  { name: 'Web Design', variant: 'outline', targetId: 'detailed-services' },
  { name: 'IT Consulting', variant: 'white', targetId: 'detailed-services' },
  { name: 'VR Solutions', variant: 'outline', targetId: 'detailed-services' },
  { name: 'AR Development', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Cloud Solutions', variant: 'solid-red', targetId: 'detailed-services' },
  { name: 'Chatbot Development', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Online Reputation Management', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Conversion Rate Optimization', variant: 'white', targetId: 'detailed-services' },
  { name: 'Affiliate Marketing', variant: 'outline', targetId: 'detailed-services' },
  { name: 'Influencer Marketing', variant: 'outline', targetId: 'detailed-services' },
  { name: 'CMS Development', variant: 'solid-red', targetId: 'detailed-services' },
  { name: 'Web Hosting', variant: 'outline', targetId: 'detailed-services' },
];

export const ServicesExpertiseAndTech: React.FC = () => {
  const handlePillClick = (targetId?: string) => {
    if (!targetId) return;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Our Expertise & Technologies"
      className="relative w-full bg-black text-white pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 overflow-hidden border-b border-white/[0.06]"
    >
      {/* 
        ========================================================================
        PART A: OUR EXPERTISE — MULTI-ROW SERVICE PILLS
        - Centered, flex-wrap layout
        - 3 visual variants: Red Outline, Solid Red, White with Red Border
        - Small bold uppercase sans-serif
        - Compact height ~26-32px, padded, fully rounded
        - Hover animation: smooth fill transition, 2px lift, 300ms ease-out
        ========================================================================
      */}
      <div className="max-w-[1210px] mx-auto px-6 sm:px-10 lg:px-12 relative">
        {/* Subtle Section Eyebrow */}
        <div className="flex items-center justify-center gap-2.5 mb-8 sm:mb-10">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.8)] shrink-0"
          />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
            OUR EXPERTISE
          </span>
        </div>

        {/* Multi-Row Service Tag Cloud (Flex Wrap, Centered) */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 max-w-[1140px] mx-auto">
          {EXPERTISE_TAGS.map((pill) => {
            let variantClasses = '';

            if (pill.variant === 'solid-red') {
              // Variant B — Solid Red: Red bg, white text, 2px lift, subtle red glow
              variantClasses =
                'bg-[#FF0000] text-white border border-[#FF0000] hover:bg-[#D90000] hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,0,0,0.45)]';
            } else if (pill.variant === 'white') {
              // Variant C — White: White bg, thin red border, black text, 2px lift
              variantClasses =
                'bg-white text-black font-extrabold border border-[#FF0000] hover:-translate-y-[2px] hover:shadow-[0_4px_14px_rgba(255,255,255,0.25)]';
            } else {
              // Variant A — Red Outline: Black bg, thin red border, white text
              // On hover smoothly transitions to solid red + 2px lift
              variantClasses =
                'bg-[#060608] text-white border border-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_4px_14px_rgba(255,0,0,0.35)]';
            }

            return (
              <button
                key={pill.name}
                type="button"
                onClick={() => handlePillClick(pill.targetId)}
                className={`h-[28px] sm:h-[30px] md:h-[32px] px-3.5 sm:px-4 md:px-5 inline-flex items-center justify-center rounded-full font-sans font-bold uppercase tracking-wider text-[11px] sm:text-[11.5px] md:text-[12px] select-none cursor-pointer transition-all duration-300 ease-out shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] ${variantClasses}`}
              >
                {pill.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        PART B: TECHNOLOGIES WE USE HEADING & TWO CROSSING RIBBONS
        - Generous vertical breathing space
        - Small red dot + "TECHNOLOGIES"
        - White serif heading "TECHNOLOGIES " with muted gray "WE USE"
        - Two thick diagonal ribbons crossing in an X-formation
          * Dark charcoal ribbon rising to the right, moving right-to-left
          * Pure white ribbon descending to the right, moving left-to-right (in front)
        ========================================================================
      */}
      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 text-center">
        {/* Subtitle with Red Dot */}
        <div className="flex items-center justify-center gap-2.5 mb-3 sm:mb-4">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.8)] shrink-0"
          />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
            TECHNOLOGIES
          </span>
        </div>

        {/* Heading: TECHNOLOGIES (white) WE USE (muted gray) */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold uppercase tracking-tight leading-tight px-4">
          <span className="text-white">TECHNOLOGIES </span>
          <span className="text-[#777777]">WE USE</span>
        </h2>
      </div>

      {/* Two Crossing Diagonal Technology Ribbons (Desktop) / Horizontal Strips (Mobile) */}
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
    </section>
  );
};

export default ServicesExpertiseAndTech;


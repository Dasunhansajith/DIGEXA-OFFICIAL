import React, { useEffect, useRef, useState } from 'react';

type PillVariant = 'black' | 'red' | 'white';

interface ServiceItem {
  id: string;
  name: string;
  variant: PillVariant;
}

const SERVICES_DATA: ServiceItem[] = [
  { id: 'web-app', name: 'Web Application Development', variant: 'black' },
  { id: 'branding', name: 'Branding', variant: 'red' },
  { id: 'erp', name: 'ERP Solutions', variant: 'white' },
  { id: 'mobile-app', name: 'Mobile App Development', variant: 'black' },
  { id: 'seo', name: 'SEO', variant: 'red' },
  { id: 'software-dev', name: 'Software Development', variant: 'white' },
  { id: 'ecommerce', name: 'E-Commerce Solutions', variant: 'black' },
  { id: 'graphic-design', name: 'Graphic Design', variant: 'red' },
  { id: 'video-editing', name: 'Video Editing', variant: 'white' },
  { id: 'website-maintenance', name: 'Website Maintenance', variant: 'black' },
  { id: 'social-media', name: 'Social Media Marketing', variant: 'red' },
  { id: 'content-creation', name: 'Content Creation', variant: 'white' },
  { id: 'ui-ux', name: 'UI/UX Design', variant: 'black' },
  { id: 'web-design', name: 'Web Design', variant: 'red' },
  { id: 'it-consulting', name: 'IT Consulting', variant: 'white' },
  { id: 'cloud-solutions', name: 'Cloud Solutions', variant: 'black' },
  { id: 'chatbot', name: 'Chatbot Development', variant: 'red' },
  { id: 'cms', name: 'CMS Development', variant: 'white' },
  { id: 'web-hosting', name: 'Web Hosting', variant: 'black' },
];

export const AboutServicesTagCloud: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    // Scroll-triggered staggered reveal using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  const getVariantStyles = (variant: PillVariant) => {
    switch (variant) {
      case 'black':
        // STYLE A — Black: Black bg, thin red outline, white text. Hover -> red bg, white text
        return 'bg-black text-white border border-[#FF0000] hover:bg-[#FF0000] hover:text-white';
      case 'red':
        // STYLE B — Red: DIGEXA red bg, white text. Hover -> white bg, black text
        return 'bg-[#FF0000] text-white border border-[#FF0000] hover:bg-white hover:text-black';
      case 'white':
        // STYLE C — White: White bg, black text, thin red outline. Hover -> red bg, white text
        return 'bg-white text-black border border-[#FF0000] hover:bg-[#FF0000] hover:text-white';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-14 sm:py-16 lg:py-[72px] overflow-hidden"
      aria-label="Our Services and Expertise"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered multi-row pill-shaped service labels */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-5 sm:gap-y-6 lg:gap-y-7">
          {SERVICES_DATA.map((service, index) => {
            const variantClasses = getVariantStyles(service.variant);
            const delayMs = prefersReducedMotion ? 0 : index * 35;

            return (
              <button
                key={service.id}
                type="button"
                className={`group inline-flex items-center justify-center h-[38px] sm:h-[40px] md:h-[42px] px-5 sm:px-6 rounded-full font-sans font-bold uppercase text-[11px] sm:text-[12px] md:text-[12.5px] tracking-[0.3px] transition-all duration-350 ease-out cursor-pointer select-none hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:ring-offset-2 focus:ring-offset-black ${variantClasses} ${
                  prefersReducedMotion
                    ? 'opacity-100 translate-y-0'
                    : isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
                style={{
                  transitionDelay: prefersReducedMotion ? '0ms' : `${delayMs}ms`,
                  transitionProperty: 'opacity, transform, background-color, color, border-color, box-shadow',
                  transitionDuration: '500ms',
                }}
              >
                <span>{service.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutServicesTagCloud;


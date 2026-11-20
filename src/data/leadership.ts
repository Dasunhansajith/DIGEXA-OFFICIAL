export interface Leader {
  id: string;
  name: string;
  role: string;
  statement: string;
  designation?: string;
  image: string;
  published: boolean;
}

export const LEADERSHIP_DATA: Leader[] = [
  {
    id: 'tech-direction',
    name: 'DIGEXA Technical Directorate',
    role: 'Technical Architecture & Engineering',
    statement:
      'The foundation of every high-conversion digital platform is uncompromising engineering rigor. Our team prioritizes sub-second latency, responsive ergonomics, and resilient infrastructure that empowers businesses to scale without technical debt.',
    designation: 'Enterprise Cloud & Web Engineering',
    image: '/images/cta-business-laptop.jpg',
    published: true,
  },
  {
    id: 'creative-direction',
    name: 'DIGEXA Creative Direction',
    role: 'Brand Storytelling & Experience Design',
    statement:
      'Digital agency craft must transcend generic layouts. By fusing bold typographic hierarchies, intentional negative space, and kinetic motion, we turn digital interfaces into immersive, authoritative brand touchpoints.',
    designation: 'UI/UX & Kinetic Motion Strategy',
    image: '/images/services-slider/branding-identity.jpg',
    published: true,
  },
];


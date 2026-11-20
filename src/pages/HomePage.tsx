import React from 'react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { StatisticsSection } from '@/components/statistics/StatisticsSection';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';
import { TechLogoMarquee } from '@/components/marquee/TechLogoMarquee';
import { NextProjectCTA } from '@/components/cta/NextProjectCTA';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section with typewriter animation & anchored bottom info bar */}
      <Hero />

      {/* Editorial About DIGEXA Section */}
      <About />

      {/* Premium Our Services Section */}
      <Services />

      {/* Premium Animated Statistics Counter Bar */}
      <StatisticsSection />

      {/* Premium Home Page Projects Showcase (Featured Selection) */}
      <ProjectsShowcase />

      {/* Technology Logo Ribbons (Crossing Diagonal Marquees) */}
      <TechLogoMarquee />

      {/* Next Project CTA Section */}
      <NextProjectCTA />
    </>
  );
};

export default HomePage;

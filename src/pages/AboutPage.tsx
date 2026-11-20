import React, { useEffect } from 'react';
import { AboutHeroBanner } from '@/components/about/AboutHeroBanner';
import { AboutIntroAndMission } from '@/components/about/AboutIntroAndMission';
import { AboutRedStats } from '@/components/about/AboutRedStats';
import { AboutLeadership } from '@/components/about/AboutLeadership';
import { AboutWhyChoose } from '@/components/about/AboutWhyChoose';
import { AboutServicesTagCloud } from '@/components/about/AboutServicesTagCloud';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 
        ========================================================================
        1. ABOUT US HERO BANNER
        - Full-width cinematic banner below navigation
        - Flowing red smoke background, centered "ABOUT US" & breadcrumb
        ========================================================================
      */}
      <AboutHeroBanner />

      {/* 
        ========================================================================
        2. AGENCY INTRODUCTION & MISSION/VISION SECTION
        - Editorial headline: CRAFTING DIGITAL (white) EXCELLENCE (gray)
        - Agency introduction paragraph
        - Two-column sliding OUR MISSION and OUR VISION statements
        ========================================================================
      */}
      <AboutIntroAndMission />

      {/* 
        ========================================================================
        3. RED-TINTED PHOTOGRAPHIC STATISTICS SECTION
        - Workspace photo beneath rich red gradient overlay
        - White rectangular Experience card (3+ Years) overlapping lower-left
        - 4 animated count-up statistics (50+ Projects, 20+ Team, 100%, 15+)
        ========================================================================
      */}
      <AboutRedStats />

      {/* 
        ========================================================================
        4. LEADERSHIP PERSPECTIVE SECTION
        - Large centered headline: LEADERSHIP PERSPECTIVE
        - Two-column leadership cards (photo on left, info on right, dark charcoal)
        ========================================================================
      */}
      <AboutLeadership />

      {/* 
        ========================================================================
        5. WHY CHOOSE DIGEXA & FOUR CAPABILITIES SECTION
        - Left: Square workspace image with authentic DIGEXA logo in bottom right
        - Right: DISCOVER OUR CAPABILITIES + 4 interactive expandable vertical panels
        ========================================================================
      */}
      <AboutWhyChoose />

      {/* 
        ========================================================================
        6. ANIMATED SERVICES TAG CLOUD
        - Centered multi-row pill tags with 3 alternating styles (Black, Red, White)
        - Staggered scroll entrance & smooth hover state inversions
        ========================================================================
      */}
      <AboutServicesTagCloud />
    </div>
  );
};

export default AboutPage;

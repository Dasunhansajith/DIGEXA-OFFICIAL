import React, { useEffect } from 'react';
import { ContactHeroBanner } from '@/components/contact/ContactHeroBanner';
import { ContactContentSection } from '@/components/contact/ContactContentSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 
        ========================================================================
        1. CINEMATIC CONTACT BANNER
        - Flowing red smoke background asset
        - Centered CONTACT US heading & HOME | CONTACT US breadcrumb
        - Mount fade-up entrance animation
        ========================================================================
      */}
      <ContactHeroBanner />

      {/* 
        ========================================================================
        2. MAIN EDITORIAL CONTACT SECTION
        - Large left-aligned heading: WE DEVELOP TOGETHER!
        - Three minimalist horizontal rows: LOCATION, CONTACT, SOCIAL
        - Separated by thin, low-opacity horizontal dividers
        - Interactive red circular social icons with lift and white invert on hover
        ========================================================================
      */}
      <ContactContentSection />
    </div>
  );
};

export default ContactPage;


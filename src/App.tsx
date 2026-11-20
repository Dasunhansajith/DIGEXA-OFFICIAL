import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useLenis } from '@/hooks/useLenis';
import { VerticalGuides } from '@/components/common/VerticalGuides';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AboutPage } from '@/pages/AboutPage';
import { NewsPage } from '@/pages/NewsPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { ContactPage } from '@/pages/ContactPage';

// Scroll to top automatically when route changes
const ScrollToTopOnNavigate: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll and GSAP ScrollTrigger sync
  useLenis();

  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <div className="min-h-screen bg-black text-white relative flex flex-col selection:bg-[#FF0000]/30 selection:text-white">
        {/* Subtle vertical architectural guide lines */}
        <VerticalGuides />

        {/* Persistent DIGEXA Navbar */}
        <Navbar />

        {/* Multi-Page Route Outlet */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Persistent Editorial Footer & Interactive PING US */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

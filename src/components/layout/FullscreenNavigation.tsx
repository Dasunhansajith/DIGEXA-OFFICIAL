import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import digexaLogoDark from '@/assets/digexa-logo-dark-trimmed.png';

interface FullscreenNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'About Us', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact Us', path: '/contact' },
];

export const FullscreenNavigation: React.FC<FullscreenNavigationProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Component visibility state (stays mounted during exit animation)
  const [shouldRender, setShouldRender] = useState(false);
  const isAnimatingRef = useRef(false);

  // Desktop Animation DOM refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Mobile Animation DOM refs
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement>(null);

  // Play closing animation and trigger onClose once finished
  const handleAnimatedClose = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (prefersReducedMotion || !overlayRef.current) {
      isAnimatingRef.current = false;
      setShouldRender(false);
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setShouldRender(false);
        onClose();
      },
    });

    if (isDesktop) {
      const links = linksContainerRef.current?.querySelectorAll('.nav-link-item');
      const infoBlocks = infoContainerRef.current?.querySelectorAll('.info-block');

      if (links && links.length > 0) {
        tl.to(links, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: 'power2.in',
        }, 0);
      }

      if (infoBlocks && infoBlocks.length > 0) {
        tl.to(infoBlocks, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: 'power2.in',
        }, 0);
      }

      if (rightPanelRef.current) {
        tl.to(rightPanelRef.current, {
          xPercent: 100,
          duration: 0.45,
          ease: 'power3.in',
        }, 0.08);
      }

      if (leftPanelRef.current) {
        tl.to(leftPanelRef.current, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        }, 0.15);
      }

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 0.25);
    } else {
      // Mobile exit animation
      if (mobileContainerRef.current) {
        tl.to(mobileContainerRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.25,
          ease: 'power2.in',
        }, 0);
      }

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      }, 0.05);
    }
  }, [onClose]);

  // Navigate to link and close
  const handleLinkClick = useCallback((e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isAnimatingRef.current) return;

    // Trigger instant Lenis/window scroll reset
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Close animation and navigate
    handleAnimatedClose();
    setTimeout(() => {
      navigate(path);
    }, 280);
  }, [handleAnimatedClose, navigate]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleAnimatedClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleAnimatedClose]);

  // Scroll locking & opening timeline orchestration
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  // Run opening animation when shouldRender flips to true
  useEffect(() => {
    if (!shouldRender || !isOpen) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const overlay = overlayRef.current;
    if (!overlay) return;

    isAnimatingRef.current = true;

    if (isDesktop) {
      const rightPanel = rightPanelRef.current;
      const leftPanel = leftPanelRef.current;
      const links = linksContainerRef.current?.querySelectorAll('.nav-link-item');
      const infoBlocks = infoContainerRef.current?.querySelectorAll('.info-block');

      if (!rightPanel || !leftPanel) return;

      // Set initial states
      gsap.set(overlay, { opacity: 1 });
      gsap.set(rightPanel, { xPercent: 100 });
      gsap.set(leftPanel, { opacity: 0 });
      if (links) gsap.set(links, { opacity: 0, y: 35 });
      if (infoBlocks) gsap.set(infoBlocks, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          closeBtnRef.current?.focus();
        },
      });

      // 1. Reveal dark right panel sliding in from the right (0.72s, power3.out)
      tl.to(rightPanel, {
        xPercent: 0,
        duration: 0.72,
        ease: 'power3.out',
      }, 0);

      // 2. Smooth reveal of black left panel
      tl.to(leftPanel, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.1);

      // 3. Sequential staggered fade-up for navigation links (stagger 0.08)
      if (links && links.length > 0) {
        tl.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.18);
      }

      // 4. Staggered fade-up for right section contact details
      if (infoBlocks && infoBlocks.length > 0) {
        tl.to(infoBlocks, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
        }, 0.35);
      }

      return () => {
        tl.kill();
      };
    } else {
      // Mobile Opening Animation
      const mobileContainer = mobileContainerRef.current;
      const mobileLinks = mobileContentRef.current?.querySelectorAll('.nav-link-item');
      const mobileInfo = mobileContentRef.current?.querySelectorAll('.info-block');

      if (!mobileContainer) return;

      gsap.set(overlay, { opacity: 1 });
      gsap.set(mobileContainer, { opacity: 0 });
      if (mobileLinks) gsap.set(mobileLinks, { opacity: 0, y: 25 });
      if (mobileInfo) gsap.set(mobileInfo, { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          mobileCloseBtnRef.current?.focus();
        },
      });

      tl.to(mobileContainer, {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      }, 0);

      if (mobileLinks && mobileLinks.length > 0) {
        tl.to(mobileLinks, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
        }, 0.1);
      }

      if (mobileInfo && mobileInfo.length > 0) {
        tl.to(mobileInfo, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.25);
      }

      return () => {
        tl.kill();
      };
    }
  }, [shouldRender, isOpen]);

  if (!shouldRender) return null;

  const isLinkActive = (path: string): boolean => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Overlay"
      className="fixed inset-0 z-[9999] w-full h-[100dvh] max-h-screen bg-[#050505] overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* 
        ======================================================================
        MOBILE LAYOUT (< 768px)
        - Fixed viewport overlay (100dvh)
        - Persistent Header: DIGEXA Logo (left) + Red circular X close button (right)
        - Scrollable Content Area: Touch scrollable with Momentum + Lenis bypass
        - Complete navigation items + Brief Us + Our Office + Follow Us
        ======================================================================
      */}
      <div
        ref={mobileContainerRef}
        className="flex md:hidden flex-col w-full h-full overflow-hidden bg-[#050505]"
      >
        {/* Persistent Mobile Header (flex-shrink-0, sticky at top) */}
        <header
          className="flex-shrink-0 h-20 flex items-center justify-between px-6 sm:px-8 bg-[#050505] border-b border-white/[0.08] relative z-30 select-none"
          style={{ touchAction: 'none' }}
        >
          <Link
            to="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
            aria-label="DIGEXA Homepage"
          >
            <img
              src={digexaLogoDark}
              alt="DIGEXA"
              className="h-7 sm:h-8 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </Link>

          <button
            ref={mobileCloseBtnRef}
            type="button"
            onClick={handleAnimatedClose}
            aria-label="Close navigation menu"
            className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(229,9,20,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Mobile Content (data-lenis-prevent to bypass smooth scroll interception) */}
        <div
          ref={mobileContentRef}
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-6 sm:px-8 pt-8 pb-[calc(40px+env(safe-area-inset-bottom,0px))] overscroll-contain"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
          }}
        >
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-5" aria-label="Mobile Navigation Links">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.path);

              return (
                <div key={item.label} className="nav-link-item overflow-hidden">
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`group inline-flex items-center text-[28px] xs:text-[32px] sm:text-[36px] font-sans font-medium tracking-tight uppercase transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] hover:text-[#E50914] hover:translate-x-3 ${
                      active ? 'text-[#E50914]' : 'text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="ml-3 w-2 h-2 rounded-full bg-[#E50914] shadow-[0_0_10px_#E50914] inline-block"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Thin Divider Line */}
          <div className="w-full h-px bg-white/10 my-8" />

          {/* Mobile Information Blocks */}
          <div className="space-y-8 pb-4">
            {/* BRIEF US */}
            <div className="info-block space-y-2">
              <h3 className="text-white font-sans text-lg font-semibold tracking-tight">
                Brief us
              </h3>
              <div className="pt-1 space-y-1">
                <a
                  href="mailto:infodigexa@gmail.com"
                  className="text-[#E50914] text-sm font-sans block hover:underline transition-all"
                  aria-label="Email infodigexa@gmail.com"
                >
                  infodigexa@gmail.com
                </a>
                <a
                  href="tel:+94766414622"
                  className="text-[#E50914] text-sm font-sans font-mono block hover:underline transition-all"
                  aria-label="Call +94 76 641 4622"
                >
                  Tel. +94 76 641 4622
                </a>
              </div>
            </div>

            {/* OUR OFFICE */}
            <div className="info-block space-y-2">
              <h3 className="text-white font-sans text-lg font-semibold tracking-tight">
                Our Office
              </h3>
              <div className="pt-1 space-y-1 text-sm text-[#E50914] font-sans leading-relaxed">
                <p>Colombo, Sri Lanka</p>
                <p>Global Remote</p>
              </div>
            </div>

            {/* FOLLOW US */}
            <div className="info-block space-y-3">
              <h3 className="text-white font-sans text-lg font-semibold tracking-tight">
                Follow us
              </h3>
              <div className="pt-1 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/90">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://wa.me/94766414622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Mobile Footer Brand Tag */}
            <div className="pt-4 text-xs font-mono tracking-widest text-white/30 uppercase">
              DIGEXA DIGITAL AGENCY — ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================
        DESKTOP LAYOUT (>= 768px)
        - Preserved original 68% / 32% split layout
        - Pure black (#050505) left panel
        - Charcoal (#17171B) right panel with contact info & top-right X button
        - GSAP slide-in & stagger animations
        ======================================================================
      */}
      <div className="hidden md:flex w-full h-full relative overflow-hidden">
        {/* Left Section — 68% Width */}
        <div
          ref={leftPanelRef}
          className="w-[68%] h-full bg-[#050505] flex flex-col justify-between pl-[8vw] lg:pl-[10vw] pr-8 relative z-10 select-none"
        >
          {/* Top Bar with DIGEXA Logo */}
          <div className="pt-10 flex items-center">
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
              aria-label="DIGEXA Homepage"
            >
              <img
                src={digexaLogoDark}
                alt="DIGEXA"
                className="h-8 md:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Navigation Links — Vertically Centered */}
          <nav
            ref={linksContainerRef}
            className="my-auto py-4 flex flex-col space-y-4 md:space-y-6 lg:space-y-7"
            aria-label="Desktop Navigation Links"
          >
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.path);

              return (
                <div key={item.label} className="nav-link-item overflow-hidden">
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`group inline-flex items-center text-[40px] lg:text-[44px] xl:text-[46px] font-sans font-medium tracking-tight transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] hover:text-[#E50914] hover:translate-x-4 ${
                      active ? 'text-[#E50914]' : 'text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="ml-4 w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_10px_#E50914] inline-block"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Bottom subtle brand tag on left section */}
          <div className="pb-10 text-xs font-mono tracking-[0.2em] text-white/30 uppercase">
            DIGEXA DIGITAL AGENCY — ALL RIGHTS RESERVED
          </div>
        </div>

        {/* Right Section — 32% Width */}
        <div
          ref={rightPanelRef}
          className="w-[32%] h-full bg-[#17171B] flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-16 relative z-20 border-l border-white/[0.06] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] select-none"
        >
          {/* Top-Right Close Button */}
          <div className="flex justify-end">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleAnimatedClose}
              aria-label="Close navigation overlay"
              className="group w-11 h-11 rounded-full bg-white/5 hover:bg-[#E50914] text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5 transition-transform duration-300" />
            </button>
          </div>

          {/* Three Information Groups */}
          <div ref={infoContainerRef} className="space-y-10 lg:space-y-12 my-auto">
            {/* GROUP 1: BRIEF US */}
            <div className="info-block space-y-2">
              <h3 className="text-white font-sans text-xl lg:text-2xl font-semibold tracking-tight">
                Brief us
              </h3>
              <div className="pt-1 space-y-1">
                <a
                  href="mailto:infodigexa@gmail.com"
                  className="text-[#E50914] text-sm lg:text-[15px] font-sans block hover:underline transition-all"
                  aria-label="Email infodigexa@gmail.com"
                >
                  infodigexa@gmail.com
                </a>
                <a
                  href="tel:+94766414622"
                  className="text-[#E50914] text-sm lg:text-[15px] font-sans font-mono block hover:underline transition-all"
                  aria-label="Call +94 76 641 4622"
                >
                  Tel. +94 76 641 4622
                </a>
              </div>
            </div>

            {/* GROUP 2: OUR OFFICE */}
            <div className="info-block space-y-2">
              <h3 className="text-white font-sans text-xl lg:text-2xl font-semibold tracking-tight">
                Our Office
              </h3>
              <div className="pt-1 space-y-1 text-sm lg:text-[15px] text-[#E50914] font-sans leading-relaxed">
                <p>Colombo, Sri Lanka</p>
                <p>Global Remote</p>
              </div>
            </div>

            {/* GROUP 3: FOLLOW US */}
            <div className="info-block space-y-3">
              <h3 className="text-white font-sans text-xl lg:text-2xl font-semibold tracking-tight">
                Follow us
              </h3>
              <div className="pt-1 flex flex-wrap gap-x-5 lg:gap-x-7 gap-y-2.5 text-sm lg:text-[15px] text-white/90">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://wa.me/94766414622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
                >
                  <span className="text-[#E50914] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom subtle indicator */}
          <div className="text-xs font-mono tracking-widest text-white/20 uppercase">
            DIGEXA AGENCY
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenNavigation;

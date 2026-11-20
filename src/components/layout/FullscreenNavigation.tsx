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

  // Animation DOM refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Play closing animation and trigger onClose once finished
  const handleAnimatedClose = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    const overlay = overlayRef.current;
    const rightPanel = rightPanelRef.current;
    const leftPanel = leftPanelRef.current;
    const links = linksContainerRef.current?.querySelectorAll('.nav-link-item');
    const infoBlocks = infoContainerRef.current?.querySelectorAll('.info-block');

    if (!overlay || !rightPanel || !leftPanel) return;

    isAnimatingRef.current = true;

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

    // 1. Reveal dark right panel sliding in from the right (0.75s, power3.out)
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
      className="fixed inset-0 z-[9999] w-full h-full bg-black/80 backdrop-blur-sm select-none"
    >
      <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
        
        {/* 
          ======================================================================
          LEFT SECTION — 68% Width on Desktop
          - Pure black background (#050505)
          - Large, elegant white navigation links, vertically centered
          - Left padding approx. 8–10vw
          - Smooth hover transition from white to DIGEXA red with horizontal movement
          ======================================================================
        */}
        <div
          ref={leftPanelRef}
          className="w-full md:w-[68%] h-full bg-[#050505] flex flex-col justify-between p-6 sm:p-10 md:p-0 md:pl-[8vw] lg:pl-[10vw] relative z-10 overflow-y-auto md:overflow-visible"
        >
          {/* Top Bar with DIGEXA Logo (visible across all breakpoints) */}
          <div className="pt-4 sm:pt-6 md:pt-10 pb-6 md:pb-0 flex items-center justify-between md:justify-start">
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
              aria-label="DIGEXA Homepage"
            >
              <img
                src={digexaLogoDark}
                alt="DIGEXA"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            {/* Mobile-only Close Button (hidden on desktop) */}
            <button
              type="button"
              onClick={handleAnimatedClose}
              aria-label="Close navigation menu"
              className="md:hidden w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links — Vertically Centered */}
          <nav
            ref={linksContainerRef}
            className="my-auto py-8 md:py-0 flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7"
            aria-label="Overlay Navigation Links"
          >
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.path);

              return (
                <div key={item.label} className="nav-link-item overflow-hidden">
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`group inline-flex items-center text-[28px] xs:text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[46px] font-sans font-medium tracking-tight uppercase md:normal-case transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] hover:text-[#E50914] hover:translate-x-3 sm:hover:translate-x-4 ${
                      active ? 'text-[#E50914]' : 'text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="ml-3 sm:ml-4 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E50914] shadow-[0_0_10px_#E50914] inline-block"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Bottom subtle brand tag on left section */}
          <div className="hidden md:block pb-10 text-xs font-mono tracking-[0.2em] text-white/30 uppercase">
            DIGEXA DIGITAL AGENCY — ALL RIGHTS RESERVED
          </div>

          {/* Mobile-only inline contact info (stacked under links on < 768px screens) */}
          <div className="md:hidden pt-8 pb-12 border-t border-white/10 space-y-6">
            <div>
              <h3 className="text-white font-sans text-lg font-semibold mb-2">Brief us</h3>
              <a
                href="mailto:infodigexa@gmail.com"
                className="text-[#E50914] text-sm font-sans block hover:underline"
              >
                infodigexa@gmail.com
              </a>
              <a
                href="tel:+94766414622"
                className="text-[#E50914] text-sm font-sans block hover:underline mt-1 font-mono"
              >
                Tel. +94 76 641 4622
              </a>
            </div>

            <div>
              <h3 className="text-white font-sans text-lg font-semibold mb-2">Our Office</h3>
              <p className="text-[#E50914] text-sm font-sans leading-relaxed">
                Colombo, Sri Lanka
              </p>
              <p className="text-[#E50914] text-sm font-sans leading-relaxed">
                Global Remote
              </p>
            </div>

            <div>
              <h3 className="text-white font-sans text-lg font-semibold mb-2">Follow us</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E50914] transition-colors inline-flex items-center gap-1"
                >
                  <span className="text-[#E50914]">↗</span> Facebook
                </a>
                <a
                  href="https://wa.me/94766414622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E50914] transition-colors inline-flex items-center gap-1"
                >
                  <span className="text-[#E50914]">↗</span> WhatsApp
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E50914] transition-colors inline-flex items-center gap-1"
                >
                  <span className="text-[#E50914]">↗</span> LinkedIn
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E50914] transition-colors inline-flex items-center gap-1"
                >
                  <span className="text-[#E50914]">↗</span> TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 
          ======================================================================
          RIGHT SECTION — 32% Width on Desktop
          - Dark charcoal background (#17171B)
          - Small X close button at top-right
          - 3 information groups: Brief Us, Our Office, Follow Us
          - Smooth slide-in from right on desktop
          ======================================================================
        */}
        <div
          ref={rightPanelRef}
          className="hidden md:flex md:w-[32%] h-full bg-[#17171B] flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-16 relative z-20 border-l border-white/[0.06] shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
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


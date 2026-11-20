import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import digexaLogoDark from '@/assets/digexa-logo-dark-trimmed.png';
import { FullscreenNavigation } from './FullscreenNavigation';

interface NavItem {
  label: string;
  path: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'SERVICES', path: '/services' },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'NEWS', path: '/news' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'CONTACT US', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Determine active state for links
  const isLinkActive = (item: NavItem): boolean => {
    if (item.label === 'HOME') {
      return location.pathname === '/';
    }
    if (item.label === 'SERVICES') {
      return location.pathname.startsWith('/services');
    }
    if (item.label === 'PROJECTS') {
      return location.pathname.startsWith('/projects');
    }
    if (item.label === 'NEWS') {
      return location.pathname.startsWith('/news');
    }
    if (item.label === 'ABOUT US') {
      return location.pathname.startsWith('/about');
    }
    if (item.label === 'CONTACT US') {
      return location.pathname.startsWith('/contact');
    }
    return false;
  };

  return (
    <>
      <header className="relative z-50 w-full bg-black border-b border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo on the left */}
            <Link 
              to="/" 
              className="flex items-center group py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f52d2d]"
              aria-label="DIGEXA Homepage"
            >
              <img 
                src={digexaLogoDark} 
                alt="DIGEXA" 
                className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav 
              className="hidden lg:flex items-center space-x-7 xl:space-x-10"
              aria-label="Primary Navigation"
            >
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link);
                const isHash = link.path.startsWith('/#');

                if (isHash) {
                  return (
                    <a
                      key={link.label}
                      href={link.path}
                      className="text-[12px] xl:text-[13px] font-sans font-medium tracking-[0.2em] transition-colors duration-200 uppercase text-white hover:text-[#f52d2d]"
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => {
                      if (window.__lenis) {
                        window.__lenis.scrollTo(0, { immediate: true });
                      }
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className={`text-[12px] xl:text-[13px] font-sans font-medium tracking-[0.2em] transition-colors duration-200 uppercase ${
                      active
                        ? 'text-[#f52d2d]'
                        : 'text-white hover:text-[#f52d2d]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Red Circular Grid-Menu Button on the Far Right */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f52d2d] hover:bg-[#d92222] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,45,45,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <div className="grid grid-cols-3 gap-[3px] w-4 h-4" aria-hidden="true">
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                    <span className="w-1 h-1 bg-white rounded-[0.5px]" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cinematic Full-Screen Split Navigation Overlay */}
      <FullscreenNavigation
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;

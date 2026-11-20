import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import aboutRedSmoke from '@/assets/images/about-red-smoke.jpeg';

export const Footer: React.FC = () => {
  return (
    <footer
      id="contact"
      aria-label="Footer & Contact"
      className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* 
        ========================================================================
        1. LAYERED RED SMOKE BACKGROUND WITH CINEMATIC FLOW
        Layer 1: Deep black base background (#050505)
        Layer 2: Animated red smoke image layer (visible, vibrant, 22s drift)
        Layer 3: Subtle dark overlay for readability (never covers the smoke)
        ========================================================================
      */}
      {/* Layer 2: Animated Red Smoke */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 z-0 overflow-hidden select-none"
      >
        <img
          src={aboutRedSmoke}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-85 mix-blend-screen filter saturate-150 contrast-125 animate-smoke-flow"
        />
      </div>

      {/* Layer 3: Subtle Dark Overlay for Text Readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/25 to-black/60 select-none"
      />

      {/* 
        ========================================================================
        Layer 4: Footer Foreground Content
        ========================================================================
      */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
        {/* Main Body: LEFT (PING US Circle) & RIGHT (Two-column, two-row info grid) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 sm:gap-16 lg:gap-24 pb-16 lg:pb-20">

          {/* 
            ====================================================================
            LEFT SIDE — PING US Circle
            - 390–400px diameter on desktop (aspect-ratio: 1/1)
            - Vertically centered within main footer content
            - Solid bright red background (#FF0000)
            - Subtle, natural outer glow (no excessive blinding glow)
            - Black diagonal arrow ABOVE text
            - Large elegant serif "PING US" typography
            - Smooth red-to-white circular expanding fill on hover (550ms)
            ====================================================================
          */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start shrink-0">
            <a
              href="mailto:hello@digexa.agency"
              className="group relative aspect-square w-[240px] xs:w-[270px] sm:w-[320px] lg:w-[395px] rounded-full bg-[#FF0000] flex flex-col items-center justify-center overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(255,0,0,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white transition-all duration-300 select-none shrink-0"
              aria-label="Ping DIGEXA - Contact via email"
            >
              {/* Expanding White Radial Fill on Hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 m-auto w-full h-full rounded-full bg-white scale-0 group-hover:scale-125 transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-center pointer-events-none"
              />

              {/* Button Content: Black arrow ABOVE black serif "PING US" */}
              <div className="relative z-10 flex flex-col items-center justify-center text-black pointer-events-none space-y-1 sm:space-y-2">
                {/* Black diagonal arrow icon above text */}
                <ArrowUpRight className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[2.2] transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-2 group-hover:-translate-y-2" />

                {/* Large elegant serif typography */}
                <span className="font-serif text-3xl xs:text-3xl sm:text-4xl lg:text-[2.65rem] font-bold uppercase tracking-tight">
                  PING US
                </span>
              </div>
            </a>
          </div>

          {/* 
            ====================================================================
            RIGHT SIDE — Information Grid
            Clean two-column, two-row information grid.
            - No vertical divider separating from the circle
            - No internal horizontal dividers
            - Generous spacing, small muted uppercase labels
            ====================================================================
          */}
          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 lg:gap-16">

            {/* COLUMN 1: SOCIAL MEDIA & USEFUL LINKS */}
            <div className="flex flex-col justify-between space-y-10 sm:space-y-12">
              {/* SOCIAL MEDIA */}
              <div className="space-y-3 sm:space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#888888] font-semibold block">
                  SOCIAL MEDIA
                </span>
                <ul className="space-y-2.5 text-sm font-sans tracking-wide">
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF0000] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>Twitter / X</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF0000] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF0000] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>Instagram</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dribbble.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#FF0000] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>Dribbble</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* USEFUL LINKS */}
              <div className="space-y-3 sm:space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#888888] font-semibold block">
                  USEFUL LINKS
                </span>
                <ul className="space-y-2.5 text-sm font-sans tracking-wide">
                  <li>
                    <Link to="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                      About DIGEXA
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="text-white/80 hover:text-white transition-colors">
                      Our Services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUMN 2: CONTACT INFO & MORE INFO */}
            <div className="flex flex-col justify-between space-y-10 sm:space-y-12">
              {/* CONTACT INFO */}
              <div className="space-y-3 sm:space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#888888] font-semibold block">
                  CONTACT INFO
                </span>
                <ul className="space-y-3 text-sm font-sans">
                  <li>
                    <a
                      href="mailto:hello@digexa.agency"
                      className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2.5 group"
                    >
                      <Mail className="w-4 h-4 text-[#FF0000] shrink-0" />
                      <span>hello@digexa.agency</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+94766414622"
                      className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2.5 font-mono group"
                    >
                      <Phone className="w-4 h-4 text-[#FF0000] shrink-0" />
                      <span>+94 76 641 4622</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5 text-white/70">
                    <MapPin className="w-4 h-4 text-[#FF0000] shrink-0" />
                    <span>Colombo, Sri Lanka / Global Remote</span>
                  </li>
                </ul>
              </div>

              {/* MORE INFO */}
              <div className="space-y-3 sm:space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#888888] font-semibold block">
                  MORE INFO
                </span>
                <ul className="space-y-2.5 text-sm font-sans tracking-wide">
                  <li>
                    <Link to="/services" className="text-white/80 hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects" className="text-white/80 hover:text-white transition-colors">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <span className="text-white/50 cursor-default">
                      Brand Strategy
                    </span>
                  </li>
                  <li>
                    <span className="text-white/50 cursor-default">
                      Web Development
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* 
          ======================================================================
          5. COPYRIGHT BOTTOM ROW
          Thin horizontal divider above copyright section.
          Left: Copyright © 2026 DIGEXA. All rights reserved.
          Right: Privacy Policy | Terms & Conditions
          ======================================================================
        */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
          <div>
            <span>Copyright © 2026 DIGEXA. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

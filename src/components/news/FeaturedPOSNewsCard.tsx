import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  CreditCard,
  Wifi,
  Sparkles,
  ShoppingBag,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { gsap } from '@/lib/gsap';

export const FeaturedPOSNewsCard: React.FC = () => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      className="group relative w-full rounded-[20px] sm:rounded-[24px] bg-[#101113] border border-emerald-500/20 hover:border-emerald-500/40 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] hover:-translate-y-1 overflow-hidden"
      aria-labelledby="featured-pos-title"
    >
      {/* 
        ========================================================================
        SUBTLE EMERALD GLOW & GRADIENT BACKGROUND AURA
        - Constrained purely inside the DIGEXA POS card
        - Atmospheric lighting with zero impact on global branding
        ========================================================================
      */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-[110px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-emerald-500/[0.06] blur-[95px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-black/40 pointer-events-none"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-center w-full">
        {/* 
          ======================================================================
          LEFT COLUMN — TEXT CONTENT (~55% width on desktop)
          - Eyebrow: PRODUCT ANNOUNCEMENT
          - Badges: COMING SOON + UNDER DEVELOPMENT
          - Headline: Introducing DIGEXA POS.
          - Tagline: Smarter Sales. Simpler Business.
          - Description & Feature Pills
          - Interactive CTA: Discover What's Coming -> /news/introducing-digexa-pos
          ======================================================================
        */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)] shrink-0"
              />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
                PRODUCT ANNOUNCEMENT
              </span>
            </div>

            <span aria-hidden="true" className="text-white/20 hidden sm:inline">
              •
            </span>

            {/* Coming Soon Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>COMING SOON</span>
            </span>

            {/* Development Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-medium tracking-wider uppercase text-white/60 bg-white/[0.04] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>UNDER DEVELOPMENT</span>
            </span>
          </div>

          {/* Headline & Tagline */}
          <div className="space-y-2.5">
            <h2
              id="featured-pos-title"
              className="font-serif text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-bold text-white tracking-tight leading-[1.12] uppercase"
            >
              Introducing DIGEXA POS.
            </h2>
            <p className="font-sans text-lg sm:text-xl md:text-[22px] font-medium text-emerald-400/90 tracking-tight">
              Smarter Sales. Simpler Business.
            </p>
          </div>

          {/* Description */}
          <p className="font-sans text-[15px] sm:text-base md:text-[16.5px] text-[#A1A1AA] font-light leading-[1.75] max-w-xl">
            A powerful new cloud-based point-of-sale experience is on its way. DIGEXA POS is
            being developed to help retail businesses manage sales, inventory, customers, and
            business insights from one modern platform.
          </p>

          {/* Key Capabilities Preview Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono text-white/80">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Real-Time Inventory</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Instant Checkout</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Cloud Insights</span>
            </div>
          </div>

          {/* Interactive CTA Button */}
          <div className="pt-3">
            <Link
              to="/news/introducing-digexa-pos"
              className="group/cta inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              aria-label="Discover what's coming with DIGEXA POS"
            >
              <span>Discover What's Coming</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-out group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 
          ======================================================================
          RIGHT COLUMN — REALISTIC DIGEXA POS DASHBOARD PREVIEW (~45% width)
          - Realistic illustrative SaaS UI mockup
          - Dark glassmorphic container with emerald accents
          - Header with terminal status & wifi
          - Live sales analytics & inventory metrics
          - Active checkout ticket with cart items & action trigger
          - Perspective tilt on desktop, clean responsive fit on mobile
          ======================================================================
        */}
        <div className="lg:col-span-5 w-full">
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none rounded-[16px] sm:rounded-[18px] bg-[#0c0e12] border border-emerald-500/25 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group-hover:border-emerald-500/40 transition-all duration-500">
            {/* Top Terminal Status Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              {/* Window dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/40" />
              </div>

              {/* Terminal Label */}
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-white/90 font-medium">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>DIGEXA POS • TERMINAL 01</span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <Wifi className="w-3 h-3" />
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-2.5 py-3">
              {/* Metric 1: Today's Volume */}
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">
                  <span>TODAY'S SALES</span>
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-mono">
                  $4,820.50
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                  +14.8% vs yesterday
                </div>
              </div>

              {/* Metric 2: Live Inventory */}
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">
                  <span>INVENTORY</span>
                  <Activity className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-mono">
                  99.4% In Stock
                </div>
                <div className="text-[10px] font-mono text-white/60 mt-0.5">
                  1,420 SKUs synced
                </div>
              </div>
            </div>

            {/* Active Transaction Ticket */}
            <div className="rounded-xl bg-[#08090b] border border-white/[0.06] p-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pb-1.5 border-b border-white/[0.05]">
                <span>TICKET #4082</span>
                <span className="text-emerald-400/90 font-medium">REGISTER READY</span>
              </div>

              {/* Sample Ticket Items */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-white/90">
                  <span className="truncate pr-2">Flagship Retail Blend (1kg)</span>
                  <span className="text-white/60 shrink-0">2 × $18.00</span>
                </div>
                <div className="flex items-center justify-between text-white/90">
                  <span className="truncate pr-2">Wireless Barcode Terminal</span>
                  <span className="text-white/60 shrink-0">1 × $89.00</span>
                </div>
                <div className="flex items-center justify-between text-white/90">
                  <span className="truncate pr-2">Branded Kraft Gift Set</span>
                  <span className="text-white/60 shrink-0">3 × $5.00</span>
                </div>
              </div>

              {/* Checkout Calculation */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between text-white/50 text-[11px]">
                  <span>Subtotal</span>
                  <span>$140.00</span>
                </div>
                <div className="flex items-center justify-between text-white/50 text-[11px]">
                  <span>Tax (8%)</span>
                  <span>$11.20</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold text-sm pt-1 border-t border-white/[0.05]">
                  <span>TOTAL DUE</span>
                  <span className="text-emerald-400 font-mono text-base">$151.20</span>
                </div>
              </div>

              {/* POS Charge Action */}
              <div className="pt-2 flex items-center gap-2">
                <div className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold tracking-wider uppercase">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CHARGE $151.20</span>
                </div>
                <div className="py-2 px-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/60 font-mono text-[11px]">
                  CASH
                </div>
              </div>
            </div>

            {/* Bottom Floating Beta Badge */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-white/40 pt-1">
              <span>CLOUD SYNC • V0.9.4-BETA</span>
              <span className="text-emerald-400/80">SAMPLE PREVIEW</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPOSNewsCard;


import React from 'react';

/**
 * Subtle vertical guide lines that run through the page layout,
 * creating the architectural editorial framework seen in high-end agencies.
 */
export const VerticalGuides: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="pointer-events-none fixed inset-0 z-0 flex justify-between max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full"
    >
      <div className="w-px h-full bg-white/[0.04]" />
      <div className="hidden md:block w-px h-full bg-white/[0.03]" />
      <div className="hidden lg:block w-px h-full bg-white/[0.03]" />
      <div className="hidden sm:block w-px h-full bg-white/[0.03]" />
      <div className="w-px h-full bg-white/[0.04]" />
    </div>
  );
};

export default VerticalGuides;


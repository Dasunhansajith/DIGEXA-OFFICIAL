import React, { useEffect } from 'react';
import { NEWS_ARTICLES } from '@/data/news';
import { NewsCard } from '@/components/news/NewsCard';

export const NewsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-32">
      {/* 
        ========================================================================
        1. CENTERED EDITORIAL HEADER
        - Clean black background matching reference screenshot
        - Large elegant white serif font: "LATEST NEWS" (~42–50px)
        - Subtitle with glowing red dot
        ========================================================================
      */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 text-center mb-12 sm:mb-16 md:mb-20">
        {/* Subtle Eyebrow with Red Dot */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-3 sm:mb-4">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.8)] shrink-0"
          />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
            DIGEXA INSIGHTS & UPDATES
          </span>
        </div>

        {/* Headline: LATEST NEWS */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-bold uppercase tracking-tight text-white leading-tight">
          LATEST NEWS
        </h1>
      </div>

      {/* 
        ========================================================================
        2. THREE-COLUMN NEWS CARDS GRID
        - Desktop: Exactly 3 columns (lg:grid-cols-3)
        - Tablet: 2 columns (md:grid-cols-2)
        - Mobile: 1 column (grid-cols-1)
        - Gaps: 24–28px (gap-6 sm:gap-7 lg:gap-7)
        - Container: max-w-[1280px] centered
        ========================================================================
      */}
      <main className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-7 w-full">
          {NEWS_ARTICLES.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsPage;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { NewsArticle } from '@/data/news';

export interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="group relative flex flex-col justify-between h-full bg-[#0d0e12] border border-white/[0.08] hover:border-white/[0.22] rounded-[16px] sm:rounded-[18px] p-5 sm:p-6 transition-all duration-400 ease-out select-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
      aria-labelledby={`news-title-${article.id}`}
    >
      <div className="space-y-5">
        {/* 
          1. FEATURED NEWS IMAGE
          - 16:10 aspect ratio
          - Rounded corners matching card aesthetics
          - Object-fit cover, subtle scale on card hover
          - Branded fallback if image fails to load
        */}
        <div className="relative w-full aspect-[16/10] rounded-[12px] sm:rounded-[14px] overflow-hidden bg-[#15161b] border border-white/[0.05]">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#121318] to-[#0a0a0d] text-center">
              <span className="font-serif text-xl font-bold tracking-wider text-white/40 uppercase">
                DIGEXA NEWS
              </span>
            </div>
          ) : (
            <img
              src={article.image}
              alt={article.title}
              onError={() => setImageError(true)}
              loading="lazy"
              className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 scale-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            />
          )}

          {/* Category Tag Overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-black/80 border border-white/10 rounded-full text-white/90 backdrop-blur-md">
              {article.category}
            </span>
          </div>
        </div>

        {/* 
          2. NEWS TITLE & SHORT DESCRIPTION
          - White bold sans-serif title (~20–23px)
          - Light gray description (~15–16px, leading-1.7)
        */}
        <div className="space-y-2.5">
          {/* Metadata: Date & Read Time */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#888888] uppercase">
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-white/20">
              •
            </span>
            <span>{article.readTime}</span>
          </div>

          {/* Title */}
          <h2
            id={`news-title-${article.id}`}
            className="font-sans text-[19px] sm:text-[21px] md:text-[22px] font-bold text-white leading-snug tracking-tight group-hover:text-white transition-colors duration-300"
          >
            {article.title}
          </h2>

          {/* Description */}
          <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#A1A1AA] font-light leading-[1.7] line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* 
        3. READ MORE BUTTON
        - Full width inside card
        - Dark charcoal background (#1c1d22), thin gray border
        - Fully rounded shape (rounded-full)
        - White bold text
        - Smooth transition to DIGEXA red on hover
      */}
      <div className="pt-6 mt-auto">
        <Link
          to={`/news/${article.slug}`}
          className="group/btn w-full inline-flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-6 rounded-full bg-[#1c1d22] hover:bg-[#FF0000] border border-white/10 hover:border-[#FF0000] text-white font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase transition-all duration-350 ease-out shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] cursor-pointer"
          aria-label={`Read full article: ${article.title}`}
        >
          <span>READ MORE</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;


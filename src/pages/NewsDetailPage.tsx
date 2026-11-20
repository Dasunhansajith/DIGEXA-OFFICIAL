import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { NEWS_ARTICLES } from '@/data/news';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const article = NEWS_ARTICLES.find((a) => a.slug === slug || a.id === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-6">
        <h1 className="text-4xl font-serif">Article Not Found</h1>
        <p className="text-[#A1A1AA]">The requested news article does not exist in our archive.</p>
        <button
          type="button"
          onClick={() => navigate('/news')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#151517] hover:bg-[#FF0000] text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All News</span>
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-black text-white pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="max-w-[960px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Back Navigation Breadcrumb */}
        <div className="mb-8 sm:mb-10 border-b border-white/[0.08] pb-6">
          <Link
            to="/news"
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-widest text-[#A1A1AA] hover:text-white uppercase transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF0000] transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO ALL NEWS</span>
          </Link>
        </div>

        {/* Article Metadata Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs font-mono tracking-wider text-[#A1A1AA] uppercase">
          <span className="px-3 py-1 rounded-full bg-[#FF0000]/15 text-[#FF0000] font-semibold border border-[#FF0000]/30">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-white/50" />
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-white/50" />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-white/50" />
            {article.author}
          </span>
        </div>

        {/* Article Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.14] uppercase mb-8">
          {article.title}
        </h1>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#121318] border border-white/[0.08] mb-10 sm:mb-12 shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Article Introduction */}
        <div className="text-base sm:text-lg text-[#E4E4E7] font-sans leading-relaxed mb-8 sm:mb-10 font-light border-l-2 border-[#FF0000] pl-5 sm:pl-6">
          <p>{article.content.intro}</p>
        </div>

        {/* Article Content Sections */}
        <div className="space-y-8 sm:space-y-10 text-[15px] sm:text-base text-[#B0B0B5] font-sans leading-[1.8] font-light">
          {article.content.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight uppercase">
                {section.heading}
              </h2>
              {section.body.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </section>
          ))}

          {/* Key Architectural Takeaways Box */}
          {article.content.takeaways && article.content.takeaways.length > 0 && (
            <div className="mt-10 p-6 sm:p-8 rounded-[16px] bg-[#0d0e12] border border-white/10 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF0000] font-bold">
                KEY ARCHITECTURAL HIGHLIGHTS
              </h3>
              <ul className="space-y-2.5 text-white/90 text-sm sm:text-base">
                {article.content.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-[18px] bg-gradient-to-r from-[#14151a] to-[#0a0a0d] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <h3 className="font-serif text-2xl text-white font-bold tracking-tight uppercase">
              Ready to engineer your next digital platform?
            </h3>
            <p className="text-sm text-[#A1A1AA] font-light">
              Collaborate with DIGEXA to create high-conversion web applications, custom digital marketplaces, and distinctive brand identities.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FF0000] hover:bg-white text-white hover:text-black font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)] shrink-0"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsDetailPage;


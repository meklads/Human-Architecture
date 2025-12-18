import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, BlogPost } from '../types';
import { BLOG_POSTS, TRANSLATIONS } from '../constants';
import { ArrowLeft, ArrowRight } from './Icons';

interface JournalPageProps {
  lang: Language;
}

export const JournalPage: React.FC<JournalPageProps> = ({ lang }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  if (selectedPost) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="pt-28 min-h-screen bg-[#050505] text-concrete"
      >
        <article className="container mx-auto px-6 max-w-4xl">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-slate hover:text-bronze mb-8 transition-colors text-sm uppercase tracking-widest"
          >
            {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {isAr ? 'العودة للسجل' : 'Back to Log'}
          </button>
          <header className="mb-12 text-center">
            <div className="text-bronze text-sm tracking-widest uppercase mb-4">{selectedPost.category} — {selectedPost.date}</div>
            <h1 className={`text-4xl md:text-6xl mb-8 leading-tight ${headingFont} text-white`}>{selectedPost.title[lang]}</h1>
          </header>
          <div className="aspect-video w-full overflow-hidden mb-12 border border-white/5">
            <img src={selectedPost.image} alt={selectedPost.title[lang]} className="w-full h-full object-cover filter brightness-[0.7] grayscale" />
          </div>
          <div 
            className={`prose prose-invert prose-lg mx-auto ${bodyFont} text-slate/80`}
            dangerouslySetInnerHTML={{ __html: selectedPost.content?.[lang] || '' }}
          />
        </article>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-[#050505] text-concrete"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 border-b border-white/5 pb-8">
          <h2 className={`text-5xl md:text-6xl ${headingFont} text-white`}>{TRANSLATIONS.nav.journal[lang]}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer flex flex-col h-full bg-[#111] border border-white/5 p-6 hover:border-bronze/30 transition-all">
              <div className="overflow-hidden aspect-video mb-6 border border-white/5 relative">
                 <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover filter brightness-[0.6] grayscale transition-all duration-700 group-hover:scale-105 group-hover:brightness-100" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="text-xs text-slate tracking-widest uppercase mb-3 pb-2 border-b border-white/5">{post.date}</div>
                <h3 className={`text-2xl mb-4 group-hover:text-bronze transition-colors ${headingFont} text-white`}>{post.title[lang]}</h3>
                <p className="text-slate/60 text-sm mb-6 flex-1">{post.excerpt[lang]}</p>
                <span className="text-xs uppercase tracking-widest border-b border-bronze w-max pb-1 text-bronze">Read Entry</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
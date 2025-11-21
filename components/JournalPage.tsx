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

  // Detail View
  if (selectedPost) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="pt-28 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete"
      >
        <article className="container mx-auto px-6 max-w-4xl">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-slate hover:text-bronze mb-8 transition-colors text-sm uppercase tracking-widest"
          >
            {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {isAr ? 'العودة للصحيفة' : 'Back to Journal'}
          </button>

          <header className="mb-12 text-center">
            <div className="text-bronze text-sm tracking-widest uppercase mb-4">{selectedPost.category} — {selectedPost.date}</div>
            <h1 className={`text-4xl md:text-6xl mb-8 leading-tight ${headingFont}`}>{selectedPost.title[lang]}</h1>
            <div className="w-20 h-1 bg-charcoal dark:bg-concrete mx-auto"></div>
          </header>

          <div className="aspect-video w-full overflow-hidden mb-12">
            <img src={selectedPost.image} alt={selectedPost.title[lang]} className="w-full h-full object-cover grayscale" />
          </div>

          <div 
            className={`prose dark:prose-invert prose-lg mx-auto ${bodyFont} first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-justify`}
            dangerouslySetInnerHTML={{ __html: selectedPost.content?.[lang] || '' }}
          />
          
          <div className="mt-20 pt-10 border-t border-slate/20 text-center italic text-slate">
             End of Entry
          </div>
        </article>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 border-b border-charcoal/10 dark:border-white/10 pb-8">
          <h1 className={`text-6xl md:text-8xl text-slate/20 font-bold absolute z-0 pointer-events-none transform -translate-y-12 ${isAr ? '-translate-x-10' : 'translate-x-10'}`}>
             LOG
          </h1>
          <h2 className={`relative z-10 text-5xl md:text-6xl ${headingFont}`}>
            {TRANSLATIONS.nav.journal[lang]}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer flex flex-col h-full">
              <div className="overflow-hidden aspect-[4/3] mb-6 border border-slate/10 relative">
                 <div className="absolute inset-0 bg-bronze/0 group-hover:bg-bronze/10 z-10 transition-colors duration-500"></div>
                 <img 
                  src={post.image} 
                  alt={post.title[lang]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale" 
                 />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center text-xs text-slate tracking-widest uppercase mb-3 border-b border-slate/10 pb-2">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                </div>
                <h3 className={`text-3xl mb-4 group-hover:text-bronze transition-colors ${headingFont}`}>{post.title[lang]}</h3>
                <p className={`text-slate dark:text-slate/60 line-clamp-3 mb-6 ${bodyFont}`}>{post.excerpt[lang]}</p>
                <span className="mt-auto inline-block text-xs uppercase tracking-widest border-b border-charcoal dark:border-concrete w-max pb-1 group-hover:text-bronze group-hover:border-bronze transition-colors">
                  {isAr ? 'قراءة السجل' : 'Read Entry'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Language, View, Product } from '../types';
import { Hero } from './Hero';
import { Assessment } from './Assessment';
import { PILLARS, RESTORATION_LOGS, BLOG_POSTS, TRANSLATIONS } from '../constants';
import { ArrowLeft, ArrowRight, Layers, Activity, Quote, QrCode, Plus } from './Icons';

interface LandingPageProps {
  lang: Language;
  setView: (view: View) => void;
  onCheckout?: (items: Product[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-serif';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-[#050505] text-alabaster"
    >
      {/* 1. HERO SECTION (The X-Ray Experience) */}
      <Hero lang={lang} setView={setView} />
      
      {/* 2. DIAGNOSTICS (The Interactive Assessment) */}
      <div id="assessment-section" className="relative z-10 border-t border-white/10">
        <Assessment lang={lang} setView={setView} />
      </div>

      {/* 3. STRUCTURAL PREVIEW (The Pillars) */}
      <section className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <span className="text-bronze text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-4">
                <Layers size={14} /> {isAr ? 'الهيكل الداخلي' : 'Internal Structure'}
                </span>
                <h2 className={`text-4xl md:text-5xl text-alabaster ${headingFont}`}>
                {isAr ? 'الأعمدة الأربعة' : 'The Four Pillars'}
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-b border-white/10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 bg-[#050505]">
                {PILLARS.map((pillar, idx) => (
                <div 
                    key={pillar.id} 
                    onClick={() => setView('library')} // Direct to the Blueprint Funnel
                    className="group relative h-[400px] overflow-hidden cursor-pointer bg-black/20 hover:bg-black/40 transition-colors"
                >
                    {/* Image Layer */}
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-700">
                        <img src={pillar.image} className="w-full h-full object-cover grayscale" />
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between">
                            <span className="text-[0.6rem] text-bronze uppercase tracking-widest border border-bronze/30 px-2 py-1">SEC-0{idx + 1}</span>
                            <span className="text-4xl font-serif text-white/10 font-bold">0{idx+1}</span>
                        </div>
                        <div>
                            <h3 className={`text-2xl text-white mb-2 ${headingFont} group-hover:text-bronze transition-colors`}>{pillar.title[lang]}</h3>
                            <div className="w-8 h-1 bg-white/10 group-hover:bg-bronze transition-colors"></div>
                        </div>
                    </div>
                    
                    {/* Scan Line Hover */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)] z-20 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none"></div>
                </div>
                ))}
            </div>
         </div>
      </section>

      {/* 4. CASE STUDIES (Restoration Logs) */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
          <div className="container mx-auto px-6">
              <div className="flex flex-col items-center mb-16">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-2">
                      {isAr ? 'قصص الترميم' : 'Restoration Logs'}
                  </span>
                  <h2 className={`text-4xl md:text-5xl text-white ${headingFont}`}>
                      {isAr ? 'قبل وبعد الهندسة' : 'Before & After Architecture'}
                  </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {RESTORATION_LOGS.map((log) => (
                      <div 
                        key={log.id} 
                        className="bg-[#111] p-8 border border-white/10 shadow-lg transition-colors hover:border-bronze/30 relative group"
                      >
                          <div className="absolute top-4 right-4 text-white/5 group-hover:text-bronze/10 transition-colors">
                              <Quote size={48} />
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                              <span className={`text-xs px-2 py-1 border border-bronze text-bronze uppercase ${isAr ? 'font-ibm' : 'font-montserrat'} bg-bronze/10`}>
                                  {log.status[lang]}
                              </span>
                              <span className="text-xs text-slate uppercase tracking-widest">{log.role[lang]}</span>
                          </div>
                          <div className="min-h-[80px]">
                            <p className={`text-lg text-slate group-hover:text-white transition-colors italic mb-6 leading-relaxed ${bodyFont}`}>
                                "{log.report[lang]}"
                            </p>
                          </div>
                          <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                              <h4 className={`font-bold text-white ${headingFont}`}>{log.name[lang]}</h4>
                              <span className="text-xs text-slate/50 uppercase tracking-widest">Ref: {log.id}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. JOURNAL PREVIEW (SITE LOG) - REFINED DESIGN */}
      <section className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
           {/* Header with Watermark */}
           <div className="flex items-end justify-between mb-16">
             <div className="relative">
                <span className={`absolute -top-12 -left-4 text-[6rem] md:text-[8rem] text-white/[0.03] font-bold pointer-events-none select-none leading-none ${headingFont}`}>
                    LOG
                </span>
                <h2 className={`text-3xl md:text-5xl text-white uppercase ${headingFont} relative z-10 tracking-tight`}>
                    {TRANSLATIONS.nav.journal[lang]}
                </h2>
             </div>
             
             <button 
                onClick={() => setView('journal')} 
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors pb-2"
             >
                <Plus size={24} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
             </button>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <article key={post.id} className="group cursor-pointer" onClick={() => setView('journal')}>
                <div className="relative overflow-hidden mb-6 aspect-video border border-white/10">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                        src={post.image} 
                        alt={post.title[lang]} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                    />
                </div>
                
                <div className="flex justify-between items-center text-[0.6rem] text-slate/60 uppercase tracking-[0.2em] mb-3">
                    <span className="text-bronze">{post.category}</span>
                    <span>{post.date}</span>
                </div>
                
                <h3 className={`text-2xl text-white group-hover:text-bronze transition-colors mb-3 leading-tight ${headingFont}`}>
                  {post.title[lang]}
                </h3>
                
                <p className={`text-slate text-sm line-clamp-2 leading-relaxed ${bodyFont}`}>
                    {post.excerpt[lang]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA TO BLUEPRINT */}
      <section className="py-24 bg-[#F2F0EB] text-[#050505] border-t border-white/10 text-center">
          <div className="container mx-auto px-6">
              <h2 className={`text-4xl md:text-6xl mb-6 ${headingFont}`}>
                  {isAr ? 'هل أنت جاهز لإعادة البناء؟' : 'Ready to Rebuild?'}
              </h2>
              <p className={`text-[#2B2B2B] mb-10 max-w-2xl mx-auto ${bodyFont} text-lg opacity-80`}>
                  {isAr ? 'احصل على المخطط الهندسي الكامل وابدأ التنفيذ.' : 'Acquire the Master Blueprint and begin execution.'}
              </p>
              <button 
                onClick={() => setView('library')}
                className="px-12 py-5 bg-bronze text-white uppercase tracking-[0.2em] font-bold hover:bg-[#050505] transition-all shadow-2xl"
              >
                  {isAr ? 'دخول غرفة المخطط' : 'ENTER BLUEPRINT ROOM'}
              </button>
          </div>
      </section>

    </motion.div>
  );
};

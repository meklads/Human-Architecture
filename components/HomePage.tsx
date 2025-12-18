
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View } from '../types';
import { Hero } from './Hero';
import { Assessment } from './Assessment';
import { PILLARS, BLOG_POSTS, RESTORATION_LOGS, TRANSLATIONS } from '../constants';
import { ArrowLeft, ArrowRight, Quote, Compass, QrCode, X, ScanLine, Layers, Activity, Plus } from './Icons';

interface HomePageProps {
  lang: Language;
  setView: (view: View) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, setView }) => {
  const [qrItem, setQrItem] = useState<{id: string, title: string, desc: string} | null>(null);

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  // Helper to safely get translations to prevent "Cannot read properties of undefined"
  const getTxt = (obj: any, key: string = lang) => {
    if (!obj) return '';
    return obj[key] || obj['en'] || obj['ar'] || '';
  };

  // تحديث دالة توليد الـ QR لاستخدام المسارات النظيفة
  const generateQrUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=2B2B2B&bgcolor=F2F0EB`;
  };
  
  // Handle Incoming Scroll Requests
  useEffect(() => {
      const hash = window.location.hash;
      if (hash === '#assessment') {
           setTimeout(() => {
              document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' });
              // Clear hash to allow re-triggering later
              try {
                history.replaceState(null, '', window.location.pathname); 
              } catch (e) {
                console.debug('Hash clear skipped', e);
              }
           }, 500);
      }
  }, []); 

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <Hero lang={lang} setView={setView} />
      
      {/* Added ID for linking */}
      <div id="assessment-section">
        <Assessment lang={lang} setView={setView} />
      </div>

      {/* Pillars Preview - X-RAY ARCHITECTURE GALLERY */}
      <section id="xray-section" className="py-24 bg-[#080808] relative overflow-hidden">
         {/* Top Decoration */}
         <div className="absolute top-10 left-10 text-white/20 z-20">
             <Plus size={24} strokeWidth={1} />
         </div>
         
         {/* Background Watermark */}
         <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-[10rem] md:text-[15rem] text-white/5 pointer-events-none whitespace-nowrap ${headingFont} z-0 opacity-10 uppercase`}>
            STRUCTURE
         </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-bronze text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-4">
              <Layers size={14} /> {isAr ? 'الهيكل الداخلي' : 'X-Ray Structural Scan'}
            </span>
            <h2 className={`text-4xl md:text-5xl text-alabaster ${headingFont}`}>
               {isAr ? 'الأعمدة الأربعة' : 'The Four Pillars'}
            </h2>
            <p className="text-slate/50 text-sm mt-4">{isAr ? 'مرر الماوس لكشف المخطط الداخلي' : 'Hover to reveal internal blueprint'}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-b border-white/10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 bg-[#0a0a0a]">
            {PILLARS.map((pillar, idx) => (
              <div 
                key={pillar.id} 
                onClick={() => setView('philosophy')}
                className="group relative h-[500px] lg:h-[650px] overflow-hidden cursor-pointer bg-[#111]"
              >
                {/* 1. LAYER A: STANDARD IMAGE (Exterior) */}
                <div className="absolute inset-0 z-10 transition-all duration-700 group-hover:opacity-0 group-hover:scale-105">
                   <img 
                    src={pillar.image} 
                    alt={getTxt(pillar.title)} 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-opacity"
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'; // Technical fallback
                    }}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                {/* 2. LAYER B: BLUEPRINT IMAGE (Interior / X-Ray) */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 bg-[#050505]">
                    {/* The Blueprint Image with Technical Filters */}
                    <img 
                        src={pillar.blueprintImage || pillar.image} 
                        alt="Blueprint"
                        className="w-full h-full object-cover filter contrast-[1.4] brightness-[0.6] sepia-[100%] hue-rotate-[185deg] saturate-[400%]"
                        loading="lazy"
                    />
                    
                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 architectural-grid opacity-20 mix-blend-screen"></div>
                    
                    {/* Measurement Lines (Decorations) */}
                    <div className="absolute top-10 left-0 w-full h-[1px] bg-cyan-500/20"></div>
                    <div className="absolute bottom-10 left-0 w-full h-[1px] bg-cyan-500/20"></div>
                    <div className="absolute top-0 left-10 h-full w-[1px] bg-cyan-500/20"></div>
                    <div className="absolute top-0 right-10 h-full w-[1px] bg-cyan-500/20"></div>
                </div>

                {/* 3. SCANNING LINE EFFECT */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none"></div>

                {/* 4. CONTENT & UI */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-30">
                   {/* Top: Header */}
                   <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                          <span className="text-[0.6rem] text-bronze uppercase tracking-widest border border-bronze/30 px-2 py-1 bg-black/50 backdrop-blur-sm group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                             SEC-0{idx + 1}
                          </span>
                          <span className="text-[0.5rem] font-mono text-cyan-500/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                             SCANNING...
                          </span>
                      </div>

                      {/* Interactive QR */}
                      <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setQrItem({
                                id: pillar.id,
                                title: getTxt(pillar.title),
                                desc: isAr 
                                    ? 'امسح الرمز للوصول إلى الشرح الصوتي والمخططات التفصيلية لهذا العمود.' 
                                    : 'Scan to access Audio Commentary & Detailed Schematics for this Pillar.'
                            });
                        }}
                        className="w-8 h-8 flex items-center justify-center border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all rounded-sm opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300"
                      >
                        <QrCode size={14} />
                      </button>

                      <span className="absolute right-8 top-20 text-8xl font-serif text-white/5 font-bold pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-500">
                         0{idx + 1}
                      </span>
                   </div>

                   {/* Bottom: Info */}
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className={`text-3xl text-slate/40 group-hover:text-white mb-2 ${headingFont} transition-colors duration-300 relative inline-block`}>
                         {getTxt(pillar.title)}
                      </h3>
                      
                      {/* Description Reveal */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                          <div className="overflow-hidden">
                              <p className={`text-cyan-100/70 text-sm leading-relaxed pt-2 ${bodyFont} font-mono text-[0.65rem] opacity-0 group-hover:opacity-100 transition-opacity delay-150`}>
                                  [{isAr ? 'حالة النظام' : 'SYSTEM STATUS'}]: {getTxt(pillar.description)}
                              </p>
                              <div className="mt-4 flex items-center gap-2 text-bronze text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                  <span>{isAr ? 'تحليل المخطط' : 'Analyze Blueprint'}</span>
                                  {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                              </div>
                          </div>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
             <button onClick={() => setView('philosophy')} className="group relative px-10 py-4 border border-white/20 overflow-hidden transition-colors">
                <span className="absolute inset-0 w-full h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 text-slate uppercase tracking-widest text-sm group-hover:text-black transition-colors font-bold">
                    {isAr ? 'استكشاف الفلسفة الكاملة' : 'Explore Full Philosophy'}
                </span>
             </button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-alabaster dark:bg-darkBg border-t border-slate/10">
          <div className="container mx-auto px-6">
              <div className="flex flex-col items-center mb-16">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-2">
                      {isAr ? 'دراسات الحالة' : 'Case Studies'}
                  </span>
                  <h2 className={`text-4xl md:text-5xl text-charcoal dark:text-concrete ${headingFont}`}>
                      {isAr ? 'سجلات ما قبل وبعد الترميم' : 'Before & After Logs'}
                  </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {RESTORATION_LOGS.map((log) => (
                      <div 
                        key={log.id} 
                        className="bg-white dark:bg-white/5 p-8 border border-slate/10 shadow-sm transition-shadow relative group"
                      >
                          <div className="absolute top-4 right-4 text-slate/10">
                              <Quote size={48} />
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                              <span className={`text-xs px-2 py-1 border border-bronze text-bronze uppercase ${isAr ? 'font-ibm' : 'font-montserrat'} ${log.status.en === 'Restored' ? 'bg-bronze/10' : 'bg-slate/10 text-slate border-slate'}`}>
                                  {getTxt(log.status)}
                              </span>
                              <span className="text-xs text-slate uppercase tracking-widest">{getTxt(log.role)}</span>
                          </div>
                          <div className="min-h-[100px]">
                            <p className={`text-lg text-charcoal dark:text-concrete/90 italic mb-6 leading-relaxed ${bodyFont}`}>
                                "{getTxt(log.report)}"
                            </p>
                          </div>
                          <div className="border-t border-slate/10 pt-4 flex justify-between items-center">
                              <h4 className={`font-bold ${headingFont}`}>{getTxt(log.name)}</h4>
                              <span className="text-xs text-slate uppercase tracking-widest">Ref: {log.id}</span>
                          </div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-bronze opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute top-0 left-0 w-full h-full bg-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Journal Preview */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <div className="flex items-end justify-between mb-16 border-b border-charcoal dark:border-concrete pb-6">
             <h2 className={`text-4xl md:text-6xl text-charcoal dark:text-concrete ${headingFont}`}>
               {getTxt(TRANSLATIONS.nav.journal)}
             </h2>
             <button onClick={() => setView('journal')} className="flex items-center gap-2 text-bronze hover:text-charcoal dark:hover:text-white transition-colors cursor-pointer">
                <span className="uppercase tracking-widest text-xs">{isAr ? 'عرض الكل' : 'View All'}</span>
                {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <article key={post.id} className="group cursor-pointer" onClick={() => setView('journal')}>
                <div className="overflow-hidden mb-6 aspect-[4/3] relative">
                  <div className="absolute inset-0 border border-slate/20 z-10 pointer-events-none"></div>
                  <img src={post.image} alt={getTxt(post.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                </div>
                <div className="flex justify-between items-center text-xs text-slate tracking-widest uppercase mb-2">
                    <span>{post.date}</span>
                </div>
                <h3 className={`text-2xl mb-2 text-charcoal dark:text-alabaster group-hover:text-bronze transition-colors ${headingFont}`}>
                  {getTxt(post.title)}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QR MODAL */}
      <AnimatePresence>
        {qrItem && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                onClick={() => setQrItem(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                    className="bg-alabaster relative max-w-sm w-full p-8 border-4 border-bronze text-center shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-charcoal border-4 border-bronze shadow-md"></div>
                    <button onClick={() => setQrItem(null)} className="absolute top-2 right-2 text-charcoal/50 hover:text-charcoal"><X /></button>

                    <span className="text-charcoal/40 text-[0.6rem] uppercase tracking-[0.3em] font-mono mb-6 block">
                        PAGE ID: {qrItem.id.toUpperCase()}
                    </span>

                    <div className="bg-white p-4 border border-charcoal/10 inline-block mb-6 shadow-inner">
                        <img 
                            src={generateQrUrl(`${window.location.origin}/philosophy?id=${qrItem.id}`)} 
                            alt="QR Code" 
                            className="w-48 h-48 mix-blend-multiply"
                        />
                    </div>

                    <h3 className={`text-xl mb-2 text-charcoal ${headingFont}`}>{qrItem.title}</h3>
                    <p className={`text-sm text-slate mb-6 ${bodyFont}`}>{qrItem.desc}</p>

                    <div className="flex justify-center gap-4 border-t border-charcoal/10 pt-4">
                         <button className="text-xs text-bronze uppercase tracking-widest font-bold hover:underline flex items-center gap-2">
                             <ScanLine size={14} /> {isAr ? 'فتح المحتوى' : 'Open Content'}
                         </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

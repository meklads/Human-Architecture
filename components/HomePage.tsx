import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View } from '../types';
import { Hero } from './Hero';
import { Assessment } from './Assessment';
import { PILLARS, BLOG_POSTS, RESTORATION_LOGS, TRANSLATIONS } from '../constants';
import { ArrowLeft, ArrowRight, Quote, Compass, QrCode, X, ScanLine } from './Icons';

interface HomePageProps {
  lang: Language;
  setView: (view: View) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, setView }) => {
  const [qrItem, setQrItem] = useState<{id: string, title: string, desc: string} | null>(null);

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

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
                // Use safer URL construction and try-catch for sandboxed environments
                history.replaceState(null, '', window.location.pathname + window.location.search); 
              } catch (e) {
                // Ignore security errors in strict sandboxes
                console.debug('Hash clear skipped', e);
              }
           }, 500);
      }
  }, []); // Run on mount

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <Hero lang={lang} setView={setView} />
      
      {/* Added ID for linking */}
      <div id="assessment-section">
        <Assessment lang={lang} setView={setView} />
      </div>

      {/* Pillars Preview - Architectural Gallery */}
      <section className="py-24 bg-concrete/30 dark:bg-white/5 relative overflow-hidden">
         {/* Background Watermark */}
         <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-[10rem] md:text-[15rem] text-slate/5 pointer-events-none whitespace-nowrap ${headingFont} z-0`}>
            PILLARS
         </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-bronze text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-4">
              <Compass size={14} /> {isAr ? 'الهيكل الداخلي' : 'Internal Structure'}
            </span>
            <h2 className={`text-4xl md:text-5xl text-charcoal dark:text-concrete ${headingFont}`}>
               {isAr ? 'الأعمدة الأربعة' : 'The Four Pillars'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-b border-slate/20 divide-y lg:divide-y-0 lg:divide-x divide-slate/20 bg-alabaster dark:bg-charcoal/20">
            {PILLARS.map((pillar, idx) => (
              <div 
                key={pillar.id} 
                onClick={() => setView('philosophy')}
                className="group relative h-[500px] lg:h-[650px] overflow-hidden cursor-pointer"
              >
                {/* 1. Image Layer - The Room (UPDATED OPACITY TO 10%) */}
                <div className="absolute inset-0 bg-charcoal">
                   <img 
                    src={pillar.image} 
                    alt={pillar.title[lang]} 
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-80 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[800ms] ease-out"
                   />
                </div>

                {/* 2. Darkness Overlay - The "Unlit" State */}
                <div className="absolute inset-0 bg-charcoal/80 group-hover:bg-charcoal/10 transition-colors duration-[800ms]"></div>
                
                {/* 3. Illumination Layer - The "Light Switch" Effect */}
                {/* Top Beam */}
                <div className="absolute inset-0 bg-gradient-to-b from-bronze/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] mix-blend-overlay pointer-events-none"></div>
                {/* Bottom Shadow for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-[800ms] pointer-events-none"></div>

                {/* 4. Architectural Grid Pattern - Reveals on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-[1000ms] architectural-grid mix-blend-soft-light"></div>
                
                {/* 5. Inner Border - The Frame */}
                <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-bronze/30 transition-all duration-[800ms] m-4 pointer-events-none"></div>

                {/* 6. Content Layer */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                   {/* Top: Number & QR Code */}
                   <div className="flex justify-between items-start">
                      <span className="text-xs text-bronze uppercase tracking-widest border border-bronze/30 px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                         {isAr ? 'عمود' : 'Pillar'} {pillar.id}
                      </span>

                      {/* Interactive QR Code */}
                      <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setQrItem({
                                id: pillar.id,
                                title: pillar.title[lang],
                                desc: isAr 
                                    ? 'امسح الرمز للوصول إلى الشرح الصوتي والمخططات التفصيلية لهذا العمود.' 
                                    : 'Scan to access Audio Commentary & Detailed Schematics for this Pillar.'
                            });
                        }}
                        className="w-10 h-10 flex items-center justify-center border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white hover:text-charcoal transition-all duration-500 z-30 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 shadow-lg"
                        title={isAr ? "رابط رقمي" : "Digital Link"}
                      >
                        <QrCode size={16} />
                      </button>

                      <span className={`absolute right-8 top-8 text-6xl md:text-8xl font-serif text-white/5 group-hover:text-bronze/20 transition-colors duration-[800ms] leading-none pointer-events-none`}>
                         0{idx + 1}
                      </span>
                   </div>

                   {/* Bottom: Title & Description Slide-up */}
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[800ms] ease-out">
                      <h3 className={`text-3xl text-slate/50 group-hover:text-white mb-2 ${headingFont} transition-colors duration-500 relative inline-block`}>
                         {pillar.title[lang]}
                         <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-bronze group-hover:w-full transition-all duration-[1000ms] ease-in-out delay-100"></span>
                      </h3>
                      
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-in-out">
                          <div className="overflow-hidden">
                              <p className={`text-white/80 text-sm leading-relaxed pt-4 ${bodyFont} opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] delay-200`}>
                                  {pillar.description[lang]}
                              </p>
                              <div className="mt-6 flex items-center gap-2 text-bronze text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] delay-300">
                                  <span>{isAr ? 'اقرأ المخطط' : 'View Blueprint'}</span>
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
             <button onClick={() => setView('philosophy')} className="group relative px-10 py-4 border border-charcoal dark:border-concrete overflow-hidden transition-colors">
                <span className="absolute inset-0 w-full h-full bg-charcoal dark:bg-concrete transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 text-charcoal dark:text-concrete uppercase tracking-widest text-sm group-hover:text-white dark:group-hover:text-charcoal transition-colors font-bold">
                    {isAr ? 'استكشاف الفلسفة الكاملة' : 'Explore Full Philosophy'}
                </span>
             </button>
          </div>
        </div>
      </section>

      {/* Case Studies (Formerly Logs) - Professional Architectural Reports */}
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
                        onClick={() => setView('community')}
                        className="bg-white dark:bg-white/5 p-8 border border-slate/10 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
                      >
                          <div className="absolute top-4 right-4 text-slate/10">
                              <Quote size={48} />
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                              <span className={`text-xs px-2 py-1 border border-bronze text-bronze uppercase ${isAr ? 'font-ibm' : 'font-montserrat'} ${log.status.en === 'Restored' ? 'bg-bronze/10' : 'bg-slate/10 text-slate border-slate'}`}>
                                  {log.status[lang]}
                              </span>
                              <span className="text-xs text-slate uppercase tracking-widest">{log.role[lang]}</span>
                          </div>
                          <div className="min-h-[100px]">
                            <p className={`text-lg text-charcoal dark:text-concrete/90 italic mb-6 leading-relaxed ${bodyFont}`}>
                                "{log.report[lang]}"
                            </p>
                          </div>
                          <div className="border-t border-slate/10 pt-4 flex justify-between items-center">
                              <h4 className={`font-bold ${headingFont}`}>{log.name[lang]}</h4>
                              <span className="text-xs text-slate uppercase tracking-widest">Ref: {log.id}</span>
                          </div>
                          {/* Decorative corner */}
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
               {TRANSLATIONS.nav.journal[lang]}
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
                  <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                </div>
                <div className="flex justify-between items-center text-xs text-slate tracking-widest uppercase mb-2">
                    <span>{post.date}</span>
                </div>
                <h3 className={`text-2xl mb-2 text-charcoal dark:text-alabaster group-hover:text-bronze transition-colors ${headingFont}`}>
                  {post.title[lang]}
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
                            src={generateQrUrl(`https://humanarchitecture.com/link/pillar/${qrItem.id}`)} 
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
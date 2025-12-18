
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View } from '../types';
import { PILLARS, TRANSLATIONS, THIRTY_DAY_PROGRAM, THEORY_CARDS, ART_PRODUCTS } from '../constants';
import { Box, ShoppingBag, Maximize2, Activity, Shield, Target, PenTool, Check, Lock } from './Icons';

interface PhilosophyPageProps {
  lang: Language;
  setView?: (view: View) => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({ lang, setView }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  
  const [activeWeek, setActiveWeek] = useState(1);
  const [activePillar, setActivePillar] = useState(() => (PILLARS && PILLARS.length > 0 ? PILLARS[0].id : ''));
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Safe data retrieval to prevent "Uncaught TypeError"
  const currentWeekData = THIRTY_DAY_PROGRAM?.find(w => w.id === activeWeek) || (THIRTY_DAY_PROGRAM?.length > 0 ? THIRTY_DAY_PROGRAM[0] : null);

  const handleAcquire = () => {
    if (setView) setView('art-store');
  };

  if (!PILLARS || PILLARS.length === 0) {
    return (
      <div className="pt-32 text-center text-slate flex flex-col items-center gap-4">
        <Activity className="animate-pulse text-bronze" />
        <span>Initializing Systems...</span>
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-[#050505] text-concrete overflow-hidden"
    >
      {/* 1. HERO: THE CODEX HEADER */}
      <section className="relative container mx-auto px-6 py-24 mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bronze/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-3 border border-bronze/30 bg-bronze/5 px-6 py-2 mb-8 rounded-full"
          >
             <Activity size={14} className="text-bronze animate-pulse" />
             <span className="text-[0.7rem] uppercase tracking-[0.4em] text-bronze font-bold">
                {isAr ? 'كود البناء البشري: النسخة 4.0' : 'HUMAN BUILDING CODE: VER 4.0'}
             </span>
          </motion.div>
          
          <motion.h1 
             className={`text-6xl md:text-9xl mb-8 ${headingFont} text-white leading-tight font-bold tracking-tighter`}
          >
            {TRANSLATIONS.nav.philosophy?.[lang] || 'THE CODE'}
          </motion.h1>
          
          <motion.p 
             className={`text-xl md:text-3xl leading-relaxed text-slate/80 max-w-4xl mx-auto ${bodyFont} font-light`}
          >
            {isAr 
              ? 'الإنسان ليس كائناً عشوائياً، بل بنية هندسية مقدسة. هذا الكود يحدد قوانين الأحمال، متانة القواعد، ومعايير السلامة الإنشائية للذات.'
              : 'The human being is not a random occurrence, but a sacred architectural structure. This code defines the laws of loads, foundation durability, and the structural safety standards of the self.'
            }
          </motion.p>
        </div>
      </section>

      {/* 2. THE STRUCTURAL SCHEMATICS (Anatomy) */}
      <section className="py-32 bg-[#080808] border-y border-white/5 relative">
          <div className="container mx-auto px-6 mb-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  <div>
                    <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-4 block">{isAr ? 'المخططات التفصيلية' : 'DETAILED SCHEMATICS'}</span>
                    <h2 className={`text-4xl md:text-6xl text-white ${headingFont}`}>{isAr ? 'تشريح البنيان' : 'Anatomy of Structure'}</h2>
                  </div>
                  <div className="flex gap-2 bg-black p-1 border border-white/10 rounded-sm overflow-x-auto no-scrollbar">
                      {PILLARS.map(p => (
                          <button 
                            key={p.id}
                            onClick={() => setActivePillar(p.id)}
                            className={`px-4 py-2 text-[0.6rem] uppercase tracking-widest transition-all whitespace-nowrap ${activePillar === p.id ? 'bg-bronze text-white font-bold' : 'text-slate hover:text-white'}`}
                          >
                              {p.title?.[lang]?.split(' ')[0] || 'Sector'}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          <div className="container mx-auto px-6">
              <AnimatePresence mode='wait'>
                  {PILLARS.map(pillar => pillar.id === activePillar && (
                      <motion.div 
                        key={pillar.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
                      >
                          <div className="lg:col-span-7 group relative">
                                <div className="absolute -inset-4 border border-bronze/20 z-0 pointer-events-none group-hover:border-bronze/50 transition-colors"></div>
                                <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
                                    <img 
                                        src={pillar.blueprintImage || pillar.image} 
                                        alt={pillar.id}
                                        className="w-full h-full object-cover grayscale contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)] animate-scan opacity-0 group-hover:opacity-100"></div>
                                    
                                    <button 
                                        onClick={handleAcquire}
                                        className="absolute bottom-8 right-8 bg-white text-black px-6 py-3 text-[0.6rem] font-bold uppercase tracking-widest flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-bronze hover:text-white"
                                    >
                                        <ShoppingBag size={14} /> {isAr ? 'اقتناء المخطط من الجاليري' : 'Acquire Blueprint from Gallery'}
                                    </button>
                                </div>
                          </div>

                          <div className="lg:col-span-5">
                              <span className="text-bronze font-mono text-xs mb-4 block">SECTOR_0{PILLARS.indexOf(pillar)+1}</span>
                              <h3 className={`text-4xl text-white mb-6 ${headingFont}`}>{pillar.title?.[lang] || 'Pillar'}</h3>
                              <p className={`text-slate text-lg leading-relaxed mb-8 ${bodyFont}`}>
                                  {pillar.description?.[lang] || ''}
                              </p>
                              
                              <div className="space-y-6">
                                  <div className="border-l-2 border-bronze pl-6">
                                      <span className="block text-[0.6rem] text-slate uppercase tracking-widest mb-1">{isAr ? 'القوة الإنشائية' : 'Structural Strength'}</span>
                                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-bronze"></motion.div>
                                      </div>
                                  </div>
                                  <div className="border-l-2 border-slate/30 pl-6">
                                      <span className="block text-[0.6rem] text-slate uppercase tracking-widest mb-1">{isAr ? 'توزيع الأحمال' : 'Load Distribution'}</span>
                                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                          <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="h-full bg-slate"></motion.div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </AnimatePresence>
          </div>
      </section>

      {/* 3. THE THEORY ROOM (Engineering Standards) */}
      <section className="py-32 bg-[#050505] relative">
         <div className="container mx-auto px-6 mb-20 text-center">
             <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 mb-6">
                 <Box size={16} /> {isAr ? 'المعايير الهندسية (القوانين)' : 'ENGINEERING STANDARDS (LAWS)'}
             </span>
             <h2 className={`text-5xl md:text-7xl ${headingFont} mb-8 text-white font-bold`}>
                 {isAr ? 'قواعد الفيزياء النفسية' : 'Psych-Physics Standards'}
             </h2>
         </div>

         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {THEORY_CARDS?.map((card, idx) => (
                 <motion.div 
                    key={idx} 
                    whileHover={{ y: -10 }}
                    className="group relative bg-[#0a0a0a] border border-white/5 p-10 hover:border-bronze/50 transition-all duration-500 flex flex-col justify-between min-h-[420px] shadow-2xl"
                 >
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-700 architectural-grid"></div>
                     <div>
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-[0.6rem] font-mono text-bronze border border-bronze/20 px-2 py-1 bg-bronze/5">STD_0{card.day}</span>
                            <Shield size={20} className="text-slate/20 group-hover:text-bronze transition-colors" />
                        </div>
                        <h3 className={`text-2xl mb-6 ${headingFont} text-white group-hover:text-bronze transition-colors leading-tight`}>{card.title?.[lang] || ''}</h3>
                        <p className={`text-slate/60 text-sm leading-loose ${bodyFont}`}>{card.task?.[lang] || ''}</p>
                     </div>
                 </motion.div>
             ))}
         </div>
      </section>

      {/* 4. THE MATERIALS LIBRARY */}
      <section className="py-32 bg-[#080808] border-t border-white/5">
          <div className="container mx-auto px-6 text-center mb-20">
              <h2 className={`text-4xl md:text-6xl text-white ${headingFont}`}>{isAr ? 'مقتنيات الكود' : 'The Codex Collection'}</h2>
              <p className="text-slate/50 mt-4">{isAr ? 'جسّد الفلسفة في مساحتك الخاصة عبر الأعمال الفنية الأصلية.' : 'Manifest the philosophy in your sanctuary via original artifacts.'}</p>
          </div>

          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
              {ART_PRODUCTS?.slice(0, 3).map(art => (
                  <div key={art.id} className="group relative">
                      <div className="aspect-[4/5] bg-black border border-white/10 overflow-hidden relative mb-6">
                          <img src={art.image} alt={art.name?.[lang] || 'Art'} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={handleAcquire}
                                className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:bg-bronze hover:text-white transition-colors"
                              >
                                  <Maximize2 size={14} /> {isAr ? 'معاينة في الجاليري' : 'View in Gallery'}
                              </button>
                          </div>
                      </div>
                      <h4 className={`text-xl text-white mb-2 ${headingFont}`}>{art.name?.[lang] || ''}</h4>
                      <span className="text-bronze font-mono text-xs">${art.price}</span>
                  </div>
              ))}
          </div>
      </section>

      {/* 5. THE PROGRAM PROTOCOL */}
      <section className="bg-[#050505] py-32 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col lg:flex-row gap-20">
                 <div className="w-full lg:w-1/3">
                     <div className="sticky top-40">
                        <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold mb-6 block">{isAr ? 'مخطط التنفيذ' : 'EXECUTION TIMELINE'}</span>
                        <h2 className={`text-5xl md:text-7xl mb-10 ${headingFont} text-white font-bold leading-none`}>
                            {isAr ? 'بروتوكول الـ 30 يوماً' : 'The 30-Day Protocol'}
                        </h2>
                        <div className="space-y-4">
                            {THIRTY_DAY_PROGRAM?.map((week) => (
                                <button 
                                    key={week.id}
                                    onClick={() => setActiveWeek(week.id)}
                                    className={`w-full text-start p-8 border-l-4 transition-all duration-500 relative overflow-hidden group ${activeWeek === week.id ? 'border-bronze bg-white/5 shadow-2xl' : 'border-white/5 hover:border-bronze/30 hover:bg-white/5'}`}
                                >
                                    <span className={`text-2xl font-bold ${headingFont} ${activeWeek === week.id ? 'text-white' : 'text-slate/30'}`}>
                                        {week.focus?.[lang] || ''}
                                    </span>
                                </button>
                            ))}
                        </div>
                     </div>
                 </div>

                 <div className="w-full lg:w-2/3">
                     <div className="bg-[#0a0a0a] border border-white/5 p-10 md:p-16 relative min-h-[700px] shadow-2xl">
                         <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
                         
                         <AnimatePresence mode='wait'>
                            {currentWeekData ? (
                              <motion.div 
                                  key={activeWeek}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="relative z-10"
                              >
                                  <div className="flex items-center gap-6 mb-12 border-b border-white/5 pb-8">
                                      <div className="w-16 h-16 rounded-full border-2 border-bronze flex items-center justify-center text-bronze text-2xl font-serif">
                                          {activeWeek}
                                      </div>
                                      <h3 className={`text-4xl ${headingFont} text-white mb-1`}>{currentWeekData.focus?.[lang] || ''}</h3>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {currentWeekData.days?.map((day) => (
                                          <div 
                                              key={day.day}
                                              className={`p-8 border-l-2 group ${day.isLocked ? 'border-white/10 bg-white/[0.02]' : 'border-bronze bg-bronze/[0.03] shadow-lg'} transition-all`}
                                          >
                                              <div className="flex justify-between items-start mb-6">
                                                  <span className="text-[0.6rem] font-mono uppercase text-slate/40">Phase_Entry_{day.day}</span>
                                                  {day.isLocked ? <Lock size={14} className="text-slate/30" /> : <Check size={14} className="text-bronze" />}
                                              </div>
                                              <h4 className={`text-2xl mb-4 ${headingFont} text-white leading-tight`}>{day.title?.[lang] || ''}</h4>
                                              <p className="text-sm text-slate/50 leading-relaxed mb-6">{day.task?.[lang] || ''}</p>
                                              
                                              {day.bookPageRef && (
                                                  <div className="flex items-center gap-2 text-[0.5rem] text-bronze/60 uppercase tracking-widest font-mono">
                                                      <PenTool size={10} />
                                                      Ref: Pg. {day.bookPageRef}
                                                  </div>
                                              )}
                                          </div>
                                      ))}
                                  </div>

                                  <div className="mt-16 pt-10 border-t border-white/5 text-center">
                                      <button 
                                          onClick={() => setView?.('landing')}
                                          className="bg-bronze text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-black transition-all flex items-center gap-4 mx-auto"
                                      >
                                          {isAr ? 'بدء التنفيذ الفعلي' : 'INITIATE FULL EXECUTION'} <Target size={16} />
                                      </button>
                                  </div>
                              </motion.div>
                            ) : (
                              <div className="flex items-center justify-center h-[500px] text-slate/30 uppercase tracking-[0.3em]">Week data not available</div>
                            )}
                         </AnimatePresence>
                     </div>
                 </div>
             </div>
         </div>
      </section>
    </motion.div>
  );
};

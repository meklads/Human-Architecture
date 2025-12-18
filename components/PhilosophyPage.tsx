import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Language, View } from '../types';
import { PILLARS, TRANSLATIONS, PHASES, THIRTY_DAY_PROGRAM, THEORY_CARDS } from '../constants';
import { Compass, Layers, ArrowRight, Check, Lock, Box, Eye, ShoppingBag, Grid, Maximize2, ScanLine } from './Icons';

interface PhilosophyPageProps {
  lang: Language;
  setView?: (view: View) => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({ lang, setView }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  
  const [activeWeek, setActiveWeek] = useState(1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleNavigate = (target: View, hash?: string) => {
    if (setView) {
        setView(target);
        if (hash) {
            window.location.hash = hash;
        } else {
            window.scrollTo(0, 0);
        }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-[#050505] text-concrete overflow-hidden"
    >
      {/* 1. INTRO */}
      <section className="relative container mx-auto px-6 py-24 mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block border border-bronze/30 px-4 py-1 mb-6"
          >
             <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bronze">
                {isAr ? 'المرجع الهندسي: IHAM-01' : 'REF: IHAM-01'}
             </span>
          </motion.div>
          
          <motion.h1 
             className={`text-5xl md:text-8xl mb-8 ${headingFont} text-white leading-tight`}
          >
            {TRANSLATIONS.nav.philosophy[lang]}
          </motion.h1>
          <motion.div 
            style={{ y: yParallax }}
            className="h-1 w-24 bg-bronze mx-auto mb-12"
          ></motion.div>
          <motion.p 
             className={`text-lg md:text-2xl leading-relaxed text-slate/80 ${bodyFont}`}
          >
            {isAr 
              ? 'الإنسان ليس كائناً عشوائياً، بل بنية هندسية مقدسة. كل شعور هو طوبة، وكل فكرة هي عمود، وكل قيمة هي أساس.'
              : 'The human being is not a random occurrence, but a sacred architectural structure. Every feeling is a brick, every thought is a pillar, and every value is a foundation.'
            }
          </motion.p>
        </div>
      </section>

      {/* 2. THE THEORY ROOM */}
      <section className="py-24 bg-[#0a0a0a] border-t border-b border-white/5 relative">
         <div className="container mx-auto px-6 mb-16 text-center">
             <span className="text-bronze text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-4">
                 <Box size={14} /> {isAr ? 'قوانين الفيزياء النفسية' : 'Psych-Physics Laws'}
             </span>
             <h2 className={`text-3xl md:text-5xl ${headingFont} mb-6 text-white`}>
                 {isAr ? 'غرفة النظريات' : 'The Theory Room'}
             </h2>
         </div>

         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {THEORY_CARDS.map((card, idx) => (
                 <motion.div 
                    key={idx} 
                    className="group relative bg-[#111] border border-white/5 p-8 hover:border-bronze transition-all duration-500 flex flex-col justify-between min-h-[380px]"
                 >
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500 architectural-grid"></div>
                     <div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-xs font-mono text-slate/50 border border-white/5 px-2 py-1">LAW 0{card.day}</span>
                            <Layers size={20} className="text-slate/20 group-hover:text-bronze transition-colors" />
                        </div>
                        <h3 className={`text-xl md:text-2xl mb-4 ${headingFont} text-white group-hover:text-bronze transition-colors`}>{card.title[lang]}</h3>
                        <p className={`text-slate/70 text-sm leading-relaxed ${bodyFont}`}>{card.task[lang]}</p>
                     </div>
                 </motion.div>
             ))}
         </div>
      </section>

      {/* 3. THE PROGRAM */}
      <section className="bg-[#050505] py-24 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row gap-16">
                 <div className="w-full md:w-1/3">
                     <h2 className={`text-4xl md:text-5xl mb-8 ${headingFont} text-white`}>{isAr ? 'برنامج الـ 30 يوماً' : 'The 30-Day Protocol'}</h2>
                     <div className="space-y-4">
                         {THIRTY_DAY_PROGRAM.map((week) => (
                             <button 
                                key={week.id}
                                onClick={() => setActiveWeek(week.id)}
                                className={`w-full text-start p-6 border-l-4 transition-all duration-300 relative overflow-hidden ${activeWeek === week.id ? 'border-bronze bg-white/5' : 'border-white/10 hover:border-bronze/50'}`}
                             >
                                 <span className={`text-[0.6rem] uppercase tracking-widest block mb-1 ${activeWeek === week.id ? 'text-bronze' : 'text-slate'}`}>{week.title[lang].split(':')[0]}</span>
                                 <span className={`text-xl font-bold ${headingFont} ${activeWeek === week.id ? 'text-white' : 'text-slate/70'}`}>{week.focus[lang]}</span>
                             </button>
                         ))}
                     </div>
                 </div>
                 <div className="w-full md:w-2/3 bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative min-h-[600px] shadow-inner">
                     <div className="absolute inset-0 opacity-[0.05] pointer-events-none architectural-grid"></div>
                     <div className="relative z-10">
                         <h3 className={`text-3xl md:text-4xl ${headingFont} text-white border-b border-white/10 pb-4 mb-8`}>{THIRTY_DAY_PROGRAM[activeWeek-1].focus[lang]}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {THIRTY_DAY_PROGRAM[activeWeek-1].days.map((day) => (
                                 <div key={day.day} className={`p-6 border-l-2 ${day.isLocked ? 'border-white/10 bg-white/5' : 'border-bronze bg-white/5'} transition-all`}>
                                     <div className="flex justify-between items-start mb-4">
                                         <span className="text-[0.6rem] font-mono uppercase text-slate/60">Day {day.day}</span>
                                         {day.isLocked ? <Lock size={14} className="text-slate/40" /> : <Check size={14} className="text-bronze" />}
                                     </div>
                                     <h4 className={`text-xl mb-2 ${headingFont} text-white`}>{day.title[lang]}</h4>
                                     <p className="text-sm text-slate/70">{day.task[lang]}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>
    </motion.div>
  );
};
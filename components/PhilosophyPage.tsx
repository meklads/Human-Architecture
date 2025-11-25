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

  // Enhanced Navigation Handler with Hash Support
  const handleNavigate = (target: View, hashSuffix?: string) => {
     window.location.hash = `#${target}${hashSuffix ? hashSuffix : ''}`;
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete overflow-hidden"
    >
      {/* 1. INTRO: The Architectural Manifesto */}
      <section className="relative container mx-auto px-6 py-24 mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block border border-bronze/30 px-4 py-1 mb-6"
          >
             <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bronze">
                {isAr ? 'المرجع الهندسي: IHAM-01' : 'REF: IHAM-01'}
             </span>
          </motion.div>
          
          <motion.h1 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className={`text-5xl md:text-8xl mb-8 ${headingFont} text-charcoal dark:text-concrete leading-tight`}
          >
            {TRANSLATIONS.nav.philosophy[lang]}
          </motion.h1>
          <motion.div 
            style={{ y: yParallax }}
            className="h-1 w-24 bg-bronze mx-auto mb-12"
          ></motion.div>
          <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className={`text-lg md:text-2xl leading-relaxed text-slate dark:text-slate/80 ${bodyFont}`}
          >
            {isAr 
              ? 'الإنسان ليس كائناً عشوائياً، بل بنية هندسية مقدسة. كل شعور هو طوبة، وكل فكرة هي عمود، وكل قيمة هي أساس. فلسفتنا تقوم على تحويل نظرتك لنفسك من "ضحية للظروف" إلى "مهندس للمصير".'
              : 'The human being is not a random occurrence, but a sacred architectural structure. Every feeling is a brick, every thought is a pillar, and every value is a foundation. We transform your self-view from "victim" to "architect".'
            }
          </motion.p>
        </div>
      </section>

      {/* 2. THE THEORY ROOM - ARCHIVE GRID */}
      <section className="py-24 bg-white dark:bg-[#151515] border-t border-b border-slate/10 relative">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bronze/30 to-transparent opacity-50"></div>
         
         <div className="container mx-auto px-6 mb-16 text-center">
             <span className="text-bronze text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-4">
                 <Box size={14} /> {isAr ? 'قوانين الفيزياء النفسية' : 'Psych-Physics Laws'}
             </span>
             <h2 className={`text-3xl md:text-5xl ${headingFont} mb-6`}>
                 {isAr ? 'غرفة النظريات' : 'The Theory Room'}
             </h2>
             <p className={`text-slate max-w-2xl mx-auto ${bodyFont}`}>
                 {isAr ? 'مجموعة القواعد التي تحكم ثبات الهيكل البشري. هذه ليست نصائح، بل معادلات إنشائية.' : 'The set of rules governing human structural stability. These are not tips, but structural equations.'}
             </p>
         </div>

         {/* The Archive Grid */}
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {THEORY_CARDS.map((card, idx) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className="group relative bg-alabaster dark:bg-darkBg border border-slate/10 p-8 hover:border-bronze transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,160,101,0.1)] flex flex-col justify-between min-h-[380px]"
                 >
                     {/* Architectural Corners */}
                     <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                     {/* Blueprint Grid BG on Hover */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500 architectural-grid"></div>

                     <div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-xs font-mono text-slate/50 border border-slate/10 px-2 py-1 rounded-sm group-hover:border-bronze/30 group-hover:text-bronze transition-colors">
                                LAW 0{card.day}
                            </span>
                            <Layers size={20} className="text-slate/20 group-hover:text-bronze transition-colors" strokeWidth={1} />
                        </div>
                        
                        <h3 className={`text-xl md:text-2xl mb-4 ${headingFont} leading-tight group-hover:text-bronze transition-colors duration-300`}>
                            {card.title[lang]}
                        </h3>
                        
                        <div className="w-8 h-1 bg-slate/10 group-hover:bg-bronze mb-6 transition-colors duration-500"></div>

                        <p className={`text-slate text-sm leading-relaxed ${bodyFont}`}>
                            {card.task[lang]}
                        </p>
                     </div>

                     <div className="mt-8 pt-6 border-t border-slate/10 group-hover:border-bronze/20 transition-colors">
                        <div className="flex items-center gap-3 text-xs text-slate group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                            <ScanLine size={14} className="text-bronze" />
                            <span className="uppercase tracking-widest text-[0.6rem]">{isAr ? 'المفهوم البصري:' : 'Visual Concept:'}</span>
                        </div>
                        <p className={`text-xs mt-2 italic text-slate/70 ${bodyFont} line-clamp-2`}>
                            {card.visualConcept?.[lang]}
                        </p>
                     </div>
                 </motion.div>
             ))}
         </div>
      </section>

      {/* 3. THE PROGRAM (Blueprint) */}
      <section className="mb-0 bg-alabaster dark:bg-darkBg py-24 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row gap-16">
                 
                 {/* Left: Controls & Context */}
                 <div className="w-full md:w-1/3">
                     <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-6 block flex items-center gap-2">
                         <Grid size={14} /> {isAr ? 'مخطط التنفيذ' : 'Execution Blueprint'}
                     </span>
                     <h2 className={`text-4xl md:text-5xl mb-8 ${headingFont}`}>
                         {isAr ? 'برنامج الـ 30 يوماً' : 'The 30-Day Protocol'}
                     </h2>
                     <p className={`text-slate mb-12 ${bodyFont} text-lg`}>
                         {isAr 
                          ? 'النظرية وحدها لا تبني المنازل. هذا هو الجدول الزمني الهندسي لإعادة البناء، طابقاً تلو الآخر.' 
                          : 'Theory alone builds no houses. This is the engineering schedule for reconstruction, floor by floor.'}
                     </p>

                     {/* Week Selectors */}
                     <div className="space-y-4">
                         {THIRTY_DAY_PROGRAM.map((week) => (
                             <button 
                                key={week.id}
                                onClick={() => setActiveWeek(week.id)}
                                className={`w-full text-start p-6 border-l-4 transition-all duration-300 relative overflow-hidden group ${activeWeek === week.id ? 'border-bronze bg-white dark:bg-white/5 shadow-xl pl-8 translate-x-2' : 'border-slate/20 hover:border-bronze/50'}`}
                             >
                                 <div className="relative z-10 flex justify-between items-center">
                                     <div>
                                         <span className={`text-[0.6rem] uppercase tracking-widest block mb-1 ${activeWeek === week.id ? 'text-bronze' : 'text-slate'}`}>
                                             {week.title[lang].split(':')[0]}
                                         </span>
                                         <span className={`text-xl font-bold ${headingFont} ${activeWeek === week.id ? 'text-charcoal dark:text-concrete' : 'text-slate/70'}`}>
                                             {week.focus[lang]}
                                         </span>
                                     </div>
                                     {activeWeek === week.id && <ArrowRight size={20} className="text-bronze" />}
                                 </div>
                             </button>
                         ))}
                     </div>
                 </div>

                 {/* Right: The Blueprint Grid Display */}
                 <div className="w-full md:w-2/3 bg-[#F2F0EB] dark:bg-[#111] border border-slate/10 p-8 md:p-12 relative min-h-[600px] shadow-inner">
                     {/* CAD Grid Background */}
                     <div 
                        className="absolute inset-0 opacity-[0.15] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#8C9598 1px, transparent 1px), linear-gradient(90deg, #8C9598 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                     ></div>
                     
                     {/* Blueprint Lines Decoration */}
                     <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-bronze/50"></div>
                     <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-bronze/50"></div>
                     <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-bronze/50"></div>
                     <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-bronze/50"></div>

                     {/* Content Transition */}
                     <div className="relative z-10 h-full flex flex-col">
                         {/* Header of Grid */}
                         <div className="flex justify-between items-start mb-12 border-b-2 border-charcoal dark:border-concrete pb-4">
                             <div>
                                 <span className="text-[6rem] md:text-[8rem] leading-none font-serif text-slate/5 font-bold absolute top-0 right-0 pointer-events-none select-none">
                                     0{activeWeek}
                                 </span>
                                 <span className="text-bronze text-xs uppercase tracking-widest block mb-2">{isAr ? 'قطاع' : 'SECTION'}: {THIRTY_DAY_PROGRAM[activeWeek-1].title[lang]}</span>
                                 <h3 className={`text-3xl md:text-4xl ${headingFont}`}>{THIRTY_DAY_PROGRAM[activeWeek-1].focus[lang]}</h3>
                             </div>
                         </div>

                         {/* Days Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                             {THIRTY_DAY_PROGRAM[activeWeek-1].days.map((day, idx) => (
                                 <motion.div 
                                    key={day.day} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`p-6 border-l-2 ${day.isLocked ? 'border-slate/20 bg-slate/5' : 'border-bronze bg-white dark:bg-white/5 shadow-sm'} group hover:shadow-lg transition-all relative overflow-hidden`}
                                 >
                                     
                                     {/* Hover Effect: CAD Lines */}
                                     <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-1 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] transition-opacity"></div>
                                     
                                     <div className="flex justify-between items-start mb-4 relative z-10">
                                         <span className="text-[0.6rem] font-mono uppercase text-slate/60 bg-slate/10 px-2 py-0.5 rounded-sm">Day {day.day < 10 ? `0${day.day}` : day.day}</span>
                                         {day.isLocked ? <Lock size={14} className="text-slate/40" /> : <Check size={14} className="text-bronze" />}
                                     </div>
                                     <h4 className={`text-xl mb-2 ${headingFont} ${day.isLocked ? 'text-slate opacity-50' : 'text-charcoal dark:text-concrete'}`}>{day.title[lang]}</h4>
                                     <p className={`text-sm ${day.isLocked ? 'text-slate/40' : 'text-slate'} line-clamp-2 ${bodyFont} mb-4`}>
                                         {day.task[lang]}
                                     </p>
                                     
                                     {/* Visual Concept Hint */}
                                     {!day.isLocked && (
                                         <div className="mt-auto pt-4 border-t border-slate/10 flex items-center gap-2 text-[0.6rem] text-bronze uppercase tracking-wider">
                                             <Maximize2 size={10} />
                                             {day.visualConcept?.[lang]}
                                         </div>
                                     )}
                                 </motion.div>
                             ))}
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* 4. METHODOLOGY (Construction Phases) */}
      <section className="bg-charcoal text-alabaster py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-24">
              <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Layers size={14} />
                  {isAr ? 'منهجية العمل' : 'Methodology'}
              </span>
              <h2 className={`text-4xl md:text-6xl text-center ${headingFont}`}>
                  {isAr ? 'مراحل البناء' : 'Construction Phases'}
              </h2>
          </div>

          <div className="max-w-5xl mx-auto relative">
             {/* Vertical Axis Line */}
             <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2"></div>

             {PHASES.map((phase, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  key={phase.id}
                  className={`relative flex flex-col md:flex-row gap-8 mb-20 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center group`}
                >
                   {/* Timeline Dot */}
                   <div className="absolute left-[15px] md:left-1/2 w-8 h-8 bg-charcoal rounded-full transform -translate-x-1/2 translate-y-0 z-20 border border-white/20 flex items-center justify-center group-hover:border-bronze group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                       <div className="w-2 h-2 bg-bronze rounded-full"></div>
                   </div>

                   <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                      <span className="text-bronze text-[4rem] font-serif opacity-10 absolute -top-10 left-10 md:static md:opacity-5 md:block leading-none pointer-events-none group-hover:text-bronze group-hover:opacity-20 transition-all">{phase.id}</span>
                      <h3 className={`text-2xl md:text-3xl mb-3 ${headingFont} text-white mt-4 md:mt-0`}>{phase.title[lang]}</h3>
                      <p className={`text-slate/60 leading-relaxed mb-6 ${bodyFont}`}>
                        {phase.desc[lang]}
                      </p>
                      <span className="text-[0.6rem] text-bronze uppercase tracking-widest border border-bronze/20 px-3 py-1 inline-block hover:bg-bronze hover:text-white transition-colors cursor-default">
                        {phase.ref}
                      </span>
                   </div>
                   
                   <div className="hidden md:block w-1/2"></div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. THE STRUCTURAL MODEL (Pillars) */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
            <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-2">{isAr ? 'الهيكل التفصيلي' : 'Structural Detail'}</span>
            <h2 className={`text-4xl md:text-5xl ${headingFont}`}>{isAr ? 'الأعمدة الأربعة' : 'The Four Pillars'}</h2>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
              
              {/* Image Side (Shop Integration) */}
              <div className="w-full md:w-1/2 relative group perspective-1000">
                <div className="aspect-[4/5] relative overflow-hidden border border-slate/10 bg-charcoal transform transition-transform duration-700 group-hover:rotate-y-2 group-hover:shadow-2xl">
                    <img 
                        src={pillar.image} 
                        alt={pillar.title[lang]} 
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                    
                    {/* Shopping Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <span className="text-bronze text-xs uppercase tracking-widest font-bold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-100">
                            {isAr ? 'متاح كعمل فني' : 'Available as Art Piece'}
                        </span>
                        <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-200">
                            <button 
                                onClick={() => handleNavigate('library', `?id=${pillar.id}`)} 
                                className="flex-1 py-4 bg-white text-charcoal text-xs uppercase tracking-[0.2em] font-bold hover:bg-bronze hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                                <ShoppingBag size={16} /> {isAr ? 'شراء اللوحة' : 'Buy Art'}
                            </button>
                            <button 
                                onClick={() => handleNavigate('library')}
                                className="px-5 py-4 border border-white/20 text-white hover:bg-white hover:text-charcoal transition-colors backdrop-blur-sm"
                            >
                                <Eye size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Decorative Frame */}
                <div className="absolute top-6 -right-6 w-full h-full border-2 border-bronze/10 -z-10 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl font-serif text-charcoal/5 dark:text-white/5 font-bold">0{index + 1}</span>
                    <div className="h-px flex-1 bg-slate/20"></div>
                </div>
                <h2 className={`text-4xl mb-6 ${headingFont} text-charcoal dark:text-concrete`}>{pillar.title[lang]}</h2>
                <div className="space-y-6">
                    <p className={`text-lg leading-loose text-slate dark:text-slate/70 ${bodyFont}`}>
                    {pillar.fullContent?.[lang] || pillar.description[lang]}
                    </p>
                    <div className="p-8 bg-alabaster dark:bg-white/5 border-l-4 border-bronze shadow-sm">
                        <h4 className="text-xs uppercase tracking-widest text-bronze mb-3 flex items-center gap-2">
                            <Compass size={14} /> {isAr ? 'حكمة هندسية' : 'Engineering Wisdom'}
                        </h4>
                        <p className="italic text-base text-charcoal dark:text-slate">
                            "{isAr 
                              ? 'إذا مال هذا العمود، انهار السقف. الصيانة هنا ليست رفاهية، بل ضرورة للبقاء.'
                              : 'If this pillar tilts, the roof collapses. Maintenance here is not a luxury, but a necessity for survival.'}"
                        </p>
                    </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 6. NEXT STEPS NAV */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-slate/10">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
                  {/* Option 1: Start Audit - Links to Home Assessment */}
                  <div 
                    onClick={() => handleNavigate('home', '?section=assessment')}
                    className="flex-1 border border-slate/10 p-10 hover:border-bronze transition-colors group text-center md:text-start cursor-pointer hover:shadow-lg"
                  >
                      <div className="mb-6 text-slate group-hover:text-bronze transition-colors">
                          <Check size={40} strokeWidth={1} />
                      </div>
                      <h3 className={`text-2xl mb-4 ${headingFont}`}>{isAr ? 'لست متأكداً من أين تبدأ؟' : 'Not sure where to start?'}</h3>
                      <p className={`text-slate text-sm mb-8 ${bodyFont} leading-relaxed`}>
                          {isAr ? 'قم بإجراء الفحص الهندسي لتحديد نقاط الضعف في هيكلك.' : 'Run the structural audit to identify weak points in your structure.'}
                      </p>
                      <button className="text-xs uppercase tracking-widest font-bold border-b border-bronze pb-1">
                          {isAr ? 'ابدأ الفحص' : 'Start Audit'}
                      </button>
                  </div>

                  {/* Option 2: Enter Gallery - Links to Library */}
                  <div 
                    onClick={() => handleNavigate('library')}
                    className="flex-1 bg-charcoal text-white p-10 group text-center md:text-start relative overflow-hidden shadow-2xl cursor-pointer"
                  >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-bronze/10 rounded-full blur-3xl group-hover:bg-bronze/20 transition-colors"></div>
                      <div className="mb-6 text-bronze relative z-10">
                          <Box size={40} strokeWidth={1} />
                      </div>
                      <h3 className={`text-2xl mb-4 relative z-10 ${headingFont}`}>{isAr ? 'جاهز للتنفيذ؟' : 'Ready to Execute?'}</h3>
                      <p className={`text-white/60 text-sm mb-8 relative z-10 ${bodyFont} leading-relaxed`}>
                          {isAr ? 'اذهب إلى المعرض للحصول على المخطط والعدة اللازمة.' : 'Head to the Gallery to acquire the Master Blueprint and tools.'}
                      </p>
                      <button className="text-xs uppercase tracking-widest font-bold bg-bronze text-white px-8 py-4 relative z-10 hover:bg-white hover:text-charcoal transition-colors shadow-lg">
                          {isAr ? 'دخول المعرض' : 'Enter Gallery'}
                      </button>
                  </div>
              </div>
          </div>
      </section>
      
    </motion.div>
  );
};
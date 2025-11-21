
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { PILLARS, TRANSLATIONS, PHASES, THIRTY_DAY_PROGRAM } from '../constants';
import { Compass, Layers, ChevronDown, ArrowRight, Check, Lock } from './Icons';

interface PhilosophyPageProps {
  lang: Language;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  
  const [activeWeek, setActiveWeek] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete"
    >
      {/* Intro Section */}
      <section className="container mx-auto px-6 py-16 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className={`text-5xl md:text-7xl mb-8 ${headingFont}`}
          >
            {TRANSLATIONS.nav.philosophy[lang]}
          </motion.h1>
          <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className={`text-lg md:text-xl leading-relaxed text-slate ${bodyFont}`}
          >
            {isAr 
              ? 'الإنسان ليس كائناً عشوائياً، بل بنية هندسية مقدسة. كل شعور هو طوبة، وكل فكرة هي عمود، وكل قيمة هي أساس. فلسفتنا تقوم على تحويل نظرتك لنفسك من "ضحية للظروف" إلى "مهندس للمصير".'
              : 'The human being is not a random occurrence, but a sacred architectural structure. Every feeling is a brick, every thought is a pillar, and every value is a foundation. Our philosophy is based on transforming your view of yourself from a "victim of circumstances" to an "architect of destiny".'
            }
          </motion.p>
        </div>
      </section>

      {/* NEW: BLUEPRINT VIEWER (Interactive 30-Day Structure) */}
      <section className="mb-32 border-t border-b border-slate/10 bg-white dark:bg-white/5 py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bronze/5 to-transparent pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row gap-16">
                 
                 {/* Viewer Controls (Weeks) */}
                 <div className="w-full md:w-1/3">
                     <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-6 block flex items-center gap-2">
                         <Layers size={14} /> {isAr ? 'مخطط التنفيذ' : 'Execution Blueprint'}
                     </span>
                     <h2 className={`text-4xl mb-8 ${headingFont}`}>
                         {isAr ? 'برنامج الـ 30 يوماً' : 'The 30-Day Protocol'}
                     </h2>
                     <p className={`text-slate mb-12 ${bodyFont}`}>
                         {isAr 
                          ? 'النظرية وحدها لا تبني المنازل. هذا هو الجدول الزمني الهندسي لإعادة البناء، طابقاً تلو الآخر.' 
                          : 'Theory alone builds no houses. This is the engineering schedule for reconstruction, floor by floor.'}
                     </p>

                     <div className="space-y-4">
                         {THIRTY_DAY_PROGRAM.map((week) => (
                             <button 
                                key={week.id}
                                onClick={() => setActiveWeek(week.id)}
                                className={`w-full text-start p-6 border transition-all duration-300 relative overflow-hidden group ${activeWeek === week.id ? 'border-bronze bg-bronze text-white shadow-lg' : 'border-slate/20 hover:border-bronze/50'}`}
                             >
                                 <div className="relative z-10 flex justify-between items-center">
                                     <div>
                                         <span className={`text-xs uppercase tracking-widest block mb-1 ${activeWeek === week.id ? 'text-white/70' : 'text-slate'}`}>
                                             {week.title[lang].split(':')[0]}
                                         </span>
                                         <span className={`text-lg font-bold ${headingFont} ${activeWeek === week.id ? 'text-white' : 'text-charcoal dark:text-concrete'}`}>
                                             {week.focus[lang]}
                                         </span>
                                     </div>
                                     {activeWeek === week.id && <ArrowRight size={20} />}
                                 </div>
                             </button>
                         ))}
                     </div>
                 </div>

                 {/* Viewer Display (Days Grid) - Visualizing Progress */}
                 <div className="w-full md:w-2/3 bg-alabaster dark:bg-[#1a1a1a] border border-slate/10 p-8 md:p-12 shadow-inner relative">
                     {/* Blueprint Grid BG */}
                     <div className="absolute inset-0 opacity-[0.05] pointer-events-none architectural-grid"></div>
                     
                     <AnimatePresence mode='wait'>
                         <motion.div 
                            key={activeWeek}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                         >
                             <div className="flex justify-between items-end mb-8 border-b border-slate/10 pb-4">
                                 <div>
                                     <span className="text-[4rem] md:text-[6rem] leading-none font-serif text-slate/10 font-bold absolute top-4 right-4 pointer-events-none">
                                         0{activeWeek}
                                     </span>
                                     <h3 className={`text-2xl md:text-3xl ${headingFont}`}>{THIRTY_DAY_PROGRAM[activeWeek-1].title[lang]}</h3>
                                     <span className="text-bronze text-xs uppercase tracking-widest">{THIRTY_DAY_PROGRAM[activeWeek-1].focus[lang]}</span>
                                 </div>
                             </div>

                             {/* STRUCTURE ELEVATION VISUALIZATION */}
                             <div className="mb-8 h-24 flex items-end gap-1 border-b-2 border-charcoal dark:border-concrete px-4 pb-1">
                                 {THIRTY_DAY_PROGRAM[activeWeek-1].days.map((day, idx) => (
                                     <motion.div 
                                        key={day.day}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(idx + 1) * 12}%` }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className={`flex-1 bg-bronze/20 border border-bronze relative group cursor-pointer hover:bg-bronze/40 transition-colors`}
                                        title={day.title[lang]}
                                     >
                                         {/* Tooltip */}
                                         <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[0.5rem] uppercase tracking-widest p-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                             Day {day.day}
                                         </div>
                                     </motion.div>
                                 ))}
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {THIRTY_DAY_PROGRAM[activeWeek-1].days.map((day) => (
                                     <div key={day.day} className={`p-4 border ${day.isLocked ? 'border-slate/10 bg-slate/5' : 'border-bronze/20 bg-white dark:bg-white/5'} relative group hover:border-bronze transition-colors`}>
                                         <div className="flex justify-between items-start mb-2">
                                             <span className="text-xs font-mono text-slate/50">Day {day.day}</span>
                                             {day.isLocked ? <Lock size={12} className="text-slate/40" /> : <Check size={12} className="text-bronze" />}
                                         </div>
                                         <h4 className={`text-lg mb-1 ${headingFont} ${day.isLocked ? 'text-slate opacity-50' : 'text-charcoal dark:text-concrete'}`}>{day.title[lang]}</h4>
                                         <p className={`text-sm ${day.isLocked ? 'text-slate/40' : 'text-slate'} line-clamp-2 ${bodyFont}`}>
                                             {day.task[lang]}
                                         </p>
                                         
                                         {/* Visual Concept Tooltip/Hint */}
                                         {!day.isLocked && day.visualConcept && (
                                            <div className="mt-3 pt-3 border-t border-dashed border-slate/20">
                                                <span className="text-[0.55rem] uppercase tracking-widest text-slate/60 block mb-1">{isAr ? 'المفهوم البصري' : 'Visual Concept'}</span>
                                                <span className="text-xs italic text-bronze">{day.visualConcept[lang]}</span>
                                            </div>
                                         )}
                                     </div>
                                 ))}
                             </div>
                         </motion.div>
                     </AnimatePresence>
                 </div>
             </div>
         </div>
      </section>

      {/* Construction Phases (Curriculum) */}
      <section className="bg-concrete/20 dark:bg-white/5 py-24 mb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none architectural-grid"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-16">
              <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Compass size={14} />
                  {isAr ? 'منهجية العمل' : 'Methodology'}
              </span>
              <h2 className={`text-4xl md:text-5xl text-charcoal dark:text-concrete ${headingFont}`}>
                  {isAr ? 'مراحل البناء' : 'Construction Phases'}
              </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
             {/* Vertical Axis Line */}
             <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-bronze/30 transform md:-translate-x-1/2"></div>

             {PHASES.map((phase, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={phase.id}
                  className={`relative flex flex-col md:flex-row gap-8 mb-16 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center`}
                >
                   {/* Timeline Dot */}
                   <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-bronze rounded-full transform -translate-x-1/2 translate-y-1 md:translate-y-0 z-20 border-4 border-alabaster dark:border-darkBg box-content"></div>

                   <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <span className="text-bronze text-xs font-bold tracking-widest mb-1 block">{phase.id}</span>
                      <h3 className={`text-2xl mb-3 ${headingFont}`}>{phase.title[lang]}</h3>
                      <p className={`text-slate dark:text-slate/70 leading-relaxed mb-2 ${bodyFont}`}>
                        {phase.desc[lang]}
                      </p>
                      <span className="text-[0.65rem] text-slate/40 uppercase tracking-wider border-b border-slate/10 pb-1 inline-block">
                        {phase.ref}
                      </span>
                   </div>
                   
                   {/* Empty div for spacing on the other side */}
                   <div className="hidden md:block w-1/2"></div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Pillars Detailed */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 gap-24">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full md:w-1/2 aspect-[4/5] relative overflow-hidden group">
                <img 
                  src={pillar.image} 
                  alt={pillar.title[lang]} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-slate/20 m-4 pointer-events-none"></div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-bronze text-6xl font-serif opacity-20 mb-4 block">0{index + 1}</span>
                <h2 className={`text-4xl mb-6 ${headingFont}`}>{pillar.title[lang]}</h2>
                <p className={`text-lg leading-loose text-slate dark:text-slate/80 ${bodyFont}`}>
                  {pillar.fullContent?.[lang] || pillar.description[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Architect (Author) Section */}
      <section className="bg-concrete/20 dark:bg-white/5 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto">
             <div className="w-full md:w-1/3">
                <div className="aspect-square bg-slate/20 rounded-full overflow-hidden border-4 border-alabaster dark:border-charcoal shadow-xl">
                   <img 
                    src="https://picsum.photos/seed/author/500/500?grayscale" 
                    alt="The Architect" 
                    className="w-full h-full object-cover"
                   />
                </div>
             </div>
             <div className="w-full md:w-2/3 text-center md:text-start">
                <h2 className={`text-4xl mb-6 ${headingFont}`}>{TRANSLATIONS.nav.architect[lang]}</h2>
                <p className={`text-lg text-slate leading-relaxed mb-6 ${bodyFont}`}>
                  {isAr 
                    ? 'أنا إبراهيم مقلد. كمعماري ومصمم ومؤسس لـ Graphics House — الشركة الرائدة في الإظهار المعماري التي تعمل منذ أكثر من 15 عاماً — قضيت مسيرتي في تحويل المخططات المجردة إلى واقع فائق الدقة. أفهم تماماً الدقة المطلوبة لجعل البناء يصمد. من خلال سنوات من تحليل فيزياء المباني العظيمة وبيولوجيا الأنظمة الحية، توصلت إلى استنتاج واحد مرعب: الإنسان هو الهيكل الأكثر تعقيداً في الوجود، لكنه الوحيد الذي يعمل بدون مخطط تصميم.'
                    : 'I am Abraham Meklad. As an architect, designer, and the founder of Graphics House—a premier architectural visualization firm operating for over 15 years—I have spent my career turning abstract blueprints into hyper-realistic realities. I understand the precision required to make a structure stand. Through years of analyzing the physics of great buildings and the biology of living systems, I reached a singular, terrifying conclusion: The human being is the most sophisticated structure in existence, yet the only one operating without a design schematic.'
                  }
                </p>
                
                {/* Signature & Company Link Row */}
                <div className="mt-10 flex flex-col md:flex-row items-center gap-8 justify-center md:justify-start">
                    
                    {/* Signature */}
                    <div className="relative group cursor-default">
                        <h3 className="font-handwriting text-3xl md:text-4xl text-charcoal dark:text-concrete transform -rotate-2 font-bold z-10 relative whitespace-nowrap">
                            Arch. Abraham Meklad
                        </h3>
                        {/* Artistic Underline */}
                        <div className="absolute -bottom-2 left-0 w-full h-2 bg-bronze/20 rounded-full transform skew-x-12 group-hover:bg-bronze/40 transition-colors duration-300"></div>
                    </div>

                    {/* Vertical Divider (Hidden on Mobile) */}
                    <div className="hidden md:block w-px h-8 bg-slate/20 rotate-12"></div>

                    {/* Graphics House Link - Creative & Light */}
                    <a 
                       href="https://3dgraphicshouse.com" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="group flex items-center gap-4 opacity-70 hover:opacity-100 transition-all duration-500"
                    >
                        {/* Custom Architectural Logo Icon (Hexagon Structure) */}
                        <div className="relative w-10 h-10 border border-slate/20 rounded-sm flex items-center justify-center bg-white/5 group-hover:border-bronze group-hover:bg-bronze/10 transition-all duration-500 overflow-hidden">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6 text-charcoal dark:text-concrete group-hover:text-bronze transition-colors">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                                <path d="M2 17L12 22L22 17" />
                                <path d="M2 7V17" />
                                <path d="M22 7V17" />
                                <path d="M12 22V12" />
                            </svg>
                            {/* Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                        </div>
                        
                        <div className="flex flex-col text-left">
                            <span className="text-[0.6rem] uppercase tracking-[0.25em] font-bold text-charcoal dark:text-concrete group-hover:text-bronze transition-colors">
                                Graphics House
                            </span>
                            <span className="text-[0.4rem] uppercase tracking-widest text-slate group-hover:text-charcoal dark:group-hover:text-concrete transition-colors">
                                3dgraphicshouse.com
                            </span>
                        </div>
                    </a>
                </div>

             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

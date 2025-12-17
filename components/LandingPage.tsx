import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View, Product } from '../types';
import { LANDING_CONTENT } from '../constants';
import { ArrowRight, Play, Check, AlertTriangle, Layers, Shield, Zap, Target, ArrowLeft, Layout, FileText, Plus, X, Maximize2, Box, CreditCard, Star, Gift, Users } from './Icons';

interface LandingPageProps {
  lang: Language;
  setView: (view: View) => void;
  onCheckout?: (items: Product[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-serif';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';
  const dir = isAr ? 'rtl' : 'ltr';
  const content = LANDING_CONTENT;

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [pricingMode, setPricingMode] = useState<'digital' | 'physical'>('physical');

  // Scroll to offer stack
  const scrollToOffer = () => {
      const el = document.getElementById('pricing-table');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div dir={dir} className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-bronze selection:text-black font-sans">
      
      {/* 1️⃣ HEADER (Minimal – No Distractions) */}
      <header className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
          {/* Logo / Home Link */}
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto group flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
             <div className="w-8 h-8 border border-white/30 flex items-center justify-center group-hover:border-bronze group-hover:text-bronze transition-colors">
                 <Layout size={14} />
             </div>
             <span className={`text-[0.6rem] uppercase tracking-[0.2em] font-bold ${bodyFont} hidden md:block`}>
                 {content.header.left[lang]}
             </span>
          </button>
          
          <div className="flex gap-6 pointer-events-auto">
              <button onClick={() => setView('home')} className="text-[0.6rem] uppercase tracking-widest text-slate hover:text-white transition-colors">
                  {content.header.right[lang]}
              </button>
              <button onClick={() => setView('register')} className="text-[0.6rem] uppercase tracking-widest font-bold text-bronze border border-bronze/30 px-4 py-1 hover:bg-bronze hover:text-black transition-colors">
                  {content.header.join[lang]}
              </button>
          </div>
      </header>

      {/* 2️⃣ PRE-HEADLINE (Authority + Differentiation) */}
      <div className="pt-32 pb-8 text-center px-4">
           <div className="inline-flex items-center gap-2 bg-red-900/10 border border-red-900/30 px-4 py-2 rounded-full">
               <AlertTriangle size={12} className="text-red-500" />
               <span className="text-[0.6rem] text-red-400 uppercase tracking-widest font-bold">
                   {content.warning[lang]}
               </span>
           </div>
      </div>

      {/* 3️⃣ HERO SECTION (Primary Hook) */}
      <section className="relative container mx-auto px-6 text-center pb-24">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
             className={`text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-bold text-white mb-8 ${headingFont} whitespace-pre-line`}
           >
               {content.hero.headline[lang]}
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
             className={`text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 ${bodyFont}`}
           >
               {content.hero.subheadline[lang]}
           </motion.p>

           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
             className="text-xs text-bronze uppercase tracking-widest mb-16 border-b border-bronze/20 inline-block pb-1"
           >
               {content.hero.support[lang]}
           </motion.div>

           {/* 4️⃣ HERO VISUAL / VIDEO */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
             className="relative max-w-4xl mx-auto aspect-video bg-[#111] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center group cursor-pointer overflow-hidden mb-12"
           >
               {/* Placeholder Grid */}
               <div className="absolute inset-0 opacity-10 architectural-grid pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
               
               {/* Play Button */}
               <div className="w-20 h-20 rounded-full border border-bronze/50 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10 bg-black/50 backdrop-blur-sm">
                   <Play size={30} className="text-bronze ml-1" fill="currentColor" />
               </div>
               
               <div className="absolute bottom-6 left-6 text-left z-10">
                   <span className="block text-white font-bold text-sm tracking-wide mb-1">{content.hero.videoLabel[lang]}</span>
                   <span className="block text-slate-500 text-xs font-mono uppercase">{content.hero.videoDuration[lang]}</span>
               </div>
           </motion.div>

           {/* 5️⃣ PRIMARY CTA */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
             className="flex flex-col items-center"
           >
               <button 
                  onClick={scrollToOffer}
                  className="bg-bronze text-white px-10 py-5 text-sm md:text-base font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(197,160,101,0.3)] mb-4"
               >
                   {content.hero.cta[lang]}
               </button>
               <span className="text-[0.65rem] text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <Shield size={10} /> {content.hero.guarantee[lang]}
               </span>
           </motion.div>
      </section>

      {/* 6️⃣ PROBLEM IDENTIFICATION SECTION */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bronze/5 to-transparent pointer-events-none"></div>
           <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
               <h2 className={`text-3xl md:text-5xl text-white mb-8 leading-tight ${headingFont} whitespace-pre-line`}>
                   {content.problem.headline[lang]}
               </h2>
               <p className={`text-lg text-slate-400 leading-relaxed mb-10 ${bodyFont}`}>
                   {content.problem.body[lang]}
               </p>
               <div className="inline-block border-l-4 border-bronze pl-6 text-left">
                   <p className={`text-xl md:text-2xl text-white italic ${headingFont}`}>
                       "{content.problem.emphasis[lang]}"
                   </p>
               </div>
           </div>
      </section>

      {/* 7️⃣ WHY SELF-HELP FAILS (FRAME SHIFT) */}
      <section className="py-24 bg-[#050505]">
           <div className="container mx-auto px-6 max-w-5xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                   <div>
                       <span className="text-red-500 font-bold text-xs uppercase tracking-widest mb-4 block">{isAr ? 'التشخيص' : 'THE DIAGNOSIS'}</span>
                       <h2 className={`text-3xl md:text-4xl text-white mb-8 ${headingFont}`}>
                           {content.failure.headline[lang]}
                       </h2>
                       <ul className="space-y-4 mb-8">
                           {content.failure.bullets.map((bullet, idx) => (
                               <li key={idx} className="flex items-center gap-4 text-slate-400">
                                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                   <span className={bodyFont}>{bullet[lang]}</span>
                               </li>
                           ))}
                       </ul>
                       <p className={`text-lg text-white font-bold border-t border-white/10 pt-6 ${headingFont}`}>
                           {content.failure.closing[lang]}
                       </p>
                   </div>
                   {/* Abstract Visual of Collapse */}
                   <div className="relative aspect-square bg-[#0a0a0a] border border-white/5 flex items-center justify-center p-8">
                       <div className="w-full h-full border border-dashed border-slate/20 relative">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate/20 font-bold text-6xl rotate-45 pointer-events-none">FAIL</div>
                           {/* Structural Collapse Graphic (CSS) */}
                           <div className="absolute bottom-0 left-10 w-4 h-32 bg-red-900/20 transform -rotate-6 origin-bottom"></div>
                           <div className="absolute bottom-0 right-10 w-4 h-32 bg-red-900/20 transform rotate-6 origin-bottom"></div>
                           <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-red-900/20 transform rotate-12"></div>
                       </div>
                   </div>
               </div>
           </div>
      </section>

      {/* 8️⃣ THE BIG IDEA — HUMAN ARCHITECTURE */}
      <section className="py-32 bg-white text-black relative">
           <div className="container mx-auto px-6 text-center max-w-4xl">
               <div className="mb-4">
                   <Layers size={48} className="mx-auto text-bronze mb-6" strokeWidth={1} />
               </div>
               <h2 className={`text-4xl md:text-6xl mb-8 ${headingFont} font-bold`}>
                   {content.solution.headline[lang]}
               </h2>
               <p className={`text-xl md:text-2xl text-charcoal/80 leading-relaxed ${bodyFont}`}>
                   {content.solution.body[lang]}
               </p>
           </div>
      </section>

      {/* 9️⃣ THE FOUR PILLARS (Framework) */}
      <section className="py-24 bg-[#080808] border-y border-white/10">
           <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                   <h2 className={`text-3xl md:text-4xl text-white ${headingFont}`}>{content.pillars.title[lang]}</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   {content.pillars.items.map((pillar, idx) => (
                       <div key={idx} className="bg-[#111] border border-white/5 p-8 text-center group hover:border-bronze/50 transition-colors">
                           <div className="text-6xl text-white/5 font-serif font-bold mb-4 group-hover:text-bronze/10 transition-colors">0{idx + 1}</div>
                           <h3 className={`text-xl text-white mb-2 ${headingFont}`}>{pillar.title[lang]}</h3>
                           <span className="text-xs uppercase tracking-widest text-bronze">{pillar.desc[lang]}</span>
                       </div>
                   ))}
               </div>

               <div className="text-center mt-12 max-w-2xl mx-auto">
                   <p className="text-slate-500 italic text-sm">
                       "{content.pillars.insight[lang]}"
                   </p>
               </div>
           </div>
      </section>

      {/* --- NEW SECTION: BLUEPRINT INSIDE LOOK --- */}
      <section className="py-24 bg-[#050505] overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-2 block">{isAr ? 'معاينة' : 'PREVIEW'}</span>
                  <h2 className={`text-3xl md:text-4xl text-white ${headingFont}`}>{isAr ? 'داخل المخطط' : 'Inside The Blueprint'}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="group relative aspect-[3/4] bg-[#111] border border-white/10 overflow-hidden cursor-zoom-in">
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20"></div>
                          {/* Placeholder for Book Pages - Using CSS shapes for abstract representation */}
                          <div className="absolute inset-8 border border-white/20 p-4 flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 border-2 border-white/30 rounded-full mb-4"></div>
                              <div className="w-full h-2 bg-white/10 mb-2"></div>
                              <div className="w-3/4 h-2 bg-white/10 mb-2"></div>
                              <div className="w-full h-2 bg-white/10"></div>
                          </div>
                          <div className="absolute bottom-4 left-4 text-[0.6rem] font-mono text-bronze">FIG-0{i}</div>
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors flex items-center justify-center">
                              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 🔟 JOURNEY MAP (Very Important) */}
      <section className="py-24 bg-[#050505]">
           <div className="container mx-auto px-6 max-w-4xl">
               <div className="text-center mb-20">
                   <h2 className={`text-3xl md:text-5xl text-white mb-6 ${headingFont}`}>{content.journey.title[lang]}</h2>
                   <p className="text-slate-400 text-lg">{content.journey.intro[lang]}</p>
               </div>

               <div className="space-y-0 relative">
                   {/* Vertical Line */}
                   <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2"></div>

                   {content.journey.steps.map((step, idx) => (
                       <div key={idx} className={`relative flex flex-col md:flex-row gap-8 pb-16 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                           {/* Marker */}
                           <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center text-xs font-mono text-bronze z-10 transform md:-translate-x-1/2">
                               {step.step}
                           </div>

                           <div className="pl-16 md:pl-0 w-full md:w-1/2 md:px-12 text-left md:text-right">
                               {idx % 2 !== 0 && (
                                   <div className="md:text-left">
                                       <span className="text-[0.6rem] uppercase tracking-widest text-bronze mb-2 block">{step.name[lang]}</span>
                                       <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{step.product[lang]}</h3>
                                       <div className="bg-[#111] p-6 border-l-2 border-bronze mt-4">
                                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">{isAr ? 'الغرض' : 'Purpose'}: <span className="text-white">{step.purpose[lang]}</span></p>
                                            <p className="text-sm text-slate-400 mb-4">{step.why[lang]}</p>
                                            <p className="text-xs font-bold text-bronze flex items-center gap-2 md:justify-start">
                                                <Target size={12} /> {step.outcome[lang]}
                                            </p>
                                       </div>
                                   </div>
                               )}
                               {idx % 2 === 0 && (
                                   <div className="md:text-right">
                                       <span className="text-[0.6rem] uppercase tracking-widest text-bronze mb-2 block">{step.name[lang]}</span>
                                       <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{step.product[lang]}</h3>
                                       <div className="bg-[#111] p-6 border-l-2 border-bronze mt-4 text-left">
                                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">{isAr ? 'الغرض' : 'Purpose'}: <span className="text-white">{step.purpose[lang]}</span></p>
                                            <p className="text-sm text-slate-400 mb-4">{step.why[lang]}</p>
                                            <p className="text-xs font-bold text-bronze flex items-center gap-2">
                                                <Target size={12} /> {step.outcome[lang]}
                                            </p>
                                       </div>
                                   </div>
                               )}
                           </div>
                           <div className="hidden md:block w-1/2"></div>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* --- NEW SECTION: TESTIMONIALS (Field Reports) --- */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-4 block">{content.testimonials.headline[lang]}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.testimonials.list.map((report) => (
                      <div key={report.id} className="bg-[#111] border border-white/10 p-8 relative">
                          <div className="absolute top-4 right-4 text-[0.5rem] font-mono text-slate/50 border border-slate/20 px-2 py-1">
                              ID: {report.id}
                          </div>
                          <h4 className={`text-lg text-white mb-4 ${headingFont}`}>{report.name[lang]}</h4>
                          <div className="space-y-3 mb-6">
                              <div className="flex gap-2">
                                  <span className="text-xs text-red-400 uppercase font-bold min-w-[60px]">{isAr ? 'قبل:' : 'PRE:'}</span>
                                  <span className="text-xs text-slate-400">{report.before[lang]}</span>
                              </div>
                              <div className="flex gap-2">
                                  <span className="text-xs text-green-400 uppercase font-bold min-w-[60px]">{isAr ? 'بعد:' : 'POST:'}</span>
                                  <span className="text-xs text-white">{report.after[lang]}</span>
                              </div>
                          </div>
                          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                              <span className="text-[0.6rem] text-slate uppercase tracking-widest">{isAr ? 'الحالة الحالية:' : 'Current Status:'}</span>
                              <span className="text-xs font-bold text-bronze uppercase tracking-widest flex items-center gap-2">
                                  <Check size={12} /> {report.status[lang]}
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 1️⃣1️⃣ WHAT YOU GET (Offer Stack - UPDATED with Book Frames) */}
      <section id="offer-stack" className="py-24 bg-[#080808] border-t border-white/5">
           <div className="container mx-auto px-6 max-w-5xl">
               <div className="text-center mb-16">
                   <h2 className={`text-3xl md:text-4xl text-white mb-4 ${headingFont}`}>{content.stack.headline[lang]}</h2>
               </div>
               
               {/* Updated to Grid Layout with Book Frames */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {content.stack.items.map((item, idx) => (
                       <div key={idx} className="flex items-start gap-6 p-6 bg-[#111] border border-white/5 hover:border-bronze/30 transition-colors group">
                           {/* THE BOOK FRAME PLACEHOLDER */}
                           <div className="w-24 shrink-0 aspect-[3/4] bg-[#050505] border border-white/10 relative overflow-hidden group-hover:border-bronze/50 transition-colors">
                               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                               
                               {/* Placeholder Geometry */}
                               <div className="absolute inset-4 border border-dashed border-white/10 flex items-center justify-center">
                                   {/* Icon representation inside frame */}
                                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/20">
                                       <Box size={12} />
                                   </div>
                               </div>
                               
                               {/* Tech Label */}
                               <div className="absolute bottom-2 left-2 text-[0.4rem] text-bronze font-mono uppercase tracking-widest">
                                   ITEM-0{idx+1}
                               </div>
                               <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-bronze/50"></div>
                           </div>

                           {/* Content */}
                           <div>
                               <h3 className={`text-lg text-white font-bold mb-2 ${headingFont} group-hover:text-bronze transition-colors`}>{item.name[lang]}</h3>
                               <p className={`text-sm text-slate-400 leading-relaxed ${bodyFont}`}>{item.desc[lang]}</p>
                               <div className="mt-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-slate/50 group-hover:text-white transition-colors">
                                   <Check size={10} className="text-bronze" /> {isAr ? 'متضمن في الباقة' : 'Included'}
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* --- 🆕 PRICING SECTION (Replacing the old CTA) --- */}
      <section id="pricing-table" className="py-32 bg-[#050505] relative border-t border-white/10">
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-4 block flex items-center justify-center gap-2">
                      <CreditCard size={14} /> {isAr ? 'عقد التوريد' : 'Procurement Contract'}
                  </span>
                  <h2 className={`text-3xl md:text-5xl text-white mb-8 ${headingFont}`}>{isAr ? 'اختر خطة البناء' : 'Select Construction Plan'}</h2>
                  
                  {/* MODE TOGGLE */}
                  <div className="inline-flex bg-[#111] p-1 border border-white/10 rounded-full">
                      <button 
                        onClick={() => setPricingMode('physical')}
                        className={`px-6 py-2 text-xs uppercase tracking-widest rounded-full transition-all ${pricingMode === 'physical' ? 'bg-bronze text-black font-bold' : 'text-slate hover:text-white'}`}
                      >
                          {isAr ? 'مطبوع (شحن)' : 'Physical (Shipped)'}
                      </button>
                      <button 
                        onClick={() => setPricingMode('digital')}
                        className={`px-6 py-2 text-xs uppercase tracking-widest rounded-full transition-all ${pricingMode === 'digital' ? 'bg-white text-black font-bold' : 'text-slate hover:text-white'}`}
                      >
                          {isAr ? 'ديجيتال (فوري)' : 'Digital (Instant)'}
                      </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* OPTION 1: THE BLUEPRINT (Entry) */}
                  <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative group hover:border-white/30 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-1 bg-slate/20 group-hover:bg-white transition-colors"></div>
                      <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{isAr ? 'المخطط الأساسي' : 'The Schematic'}</h3>
                      <p className="text-slate text-sm mb-8 h-10">{isAr ? 'كتاب المبادئ + المفاهيم الأساسية.' : 'Core principles book + foundational concepts.'}</p>
                      
                      <div className="text-4xl font-mono text-white mb-8">
                          ${pricingMode === 'physical' ? '49' : '29'}
                      </div>

                      <ul className="space-y-4 mb-8 text-sm text-slate-300">
                          <li className="flex gap-3"><Check size={14} className="text-slate shrink-0" /> {isAr ? 'الكتاب (المخطط)' : 'The Blueprint Book'}</li>
                          <li className="flex gap-3"><Check size={14} className="text-slate shrink-0" /> {pricingMode === 'physical' ? (isAr ? 'نسخة ورقية فاخرة' : 'Premium Hardcover') : (isAr ? 'نسخة PDF عالية الدقة' : 'High-Res PDF')}</li>
                          {/* BONUS ITEM */}
                          <li className="flex gap-3 text-white font-bold"><Gift size={14} className="text-bronze shrink-0" /> {isAr ? 'هدية: الوورك بوك (PDF)' : 'BONUS: 28-Day Workbook (PDF)'}</li>
                          
                          <li className="flex gap-3 text-slate/50"><X size={14} className="shrink-0" /> {isAr ? 'بدون البرنامج التفاعلي' : 'No Interactive Dashboard'}</li>
                      </ul>

                      <button 
                        onClick={() => onCheckout && onCheckout([])}
                        className="w-full py-4 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                      >
                          {isAr ? 'شراء الكتاب فقط' : 'Purchase Book Only'}
                      </button>
                  </div>

                  {/* OPTION 2: THE SYSTEM (Full) - HIGHLIGHTED */}
                  <div className="bg-[#111] border-2 border-bronze p-8 md:p-12 relative shadow-[0_0_50px_rgba(197,160,101,0.1)] scale-105 z-10">
                      <div className="absolute top-0 right-0 bg-bronze text-black text-[0.6rem] font-bold px-3 py-1 uppercase tracking-widest">
                          {isAr ? 'خيار المعماري' : 'Architect\'s Choice'}
                      </div>
                      <h3 className={`text-3xl text-white mb-2 ${headingFont}`}>{isAr ? 'النظام المتكامل' : 'The Master Plan'}</h3>
                      <p className="text-bronze text-sm mb-8 h-10">{isAr ? 'الحل الجذري: 30 يوماً من التنفيذ.' : 'The radical solution: 30 Days of Execution.'}</p>
                      
                      <div className="flex items-end gap-3 mb-8">
                          <div className="text-5xl font-mono text-white font-bold">
                              ${pricingMode === 'physical' ? '197' : '97'}
                          </div>
                          <span className="text-slate line-through mb-2 decoration-red-500">${pricingMode === 'physical' ? '350' : '150'}</span>
                      </div>

                      <ul className="space-y-4 mb-8 text-sm text-white">
                          <li className="flex gap-3"><Check size={14} className="text-bronze shrink-0" /> <span className="font-bold">{isAr ? 'الكتاب (المخطط)' : 'The Blueprint Book'}</span></li>
                          <li className="flex gap-3"><Check size={14} className="text-bronze shrink-0" /> <span>{isAr ? 'الوورك بوك (28 يوم)' : '28-Day Workbook'}</span></li>
                          {/* UPGRADES */}
                          <li className="flex gap-3"><Zap size={14} className="text-bronze shrink-0" /> <span>{isAr ? 'البرنامج التفاعلي (Dashboard)' : 'Interactive 30-Day Dashboard'}</span></li>
                          <li className="flex gap-3"><Users size={14} className="text-bronze shrink-0" /> <span>{isAr ? 'عضوية النقابة (مجتمع خاص)' : 'Private Guild Community Access'}</span></li>
                      </ul>

                      <button 
                        onClick={() => onCheckout && onCheckout([])}
                        className="w-full py-5 bg-bronze text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors shadow-lg flex items-center justify-center gap-2"
                      >
                          {isAr ? 'ابدأ إعادة البناء' : 'START REBUILDING'} <ArrowRight size={16} />
                      </button>
                      <p className="text-[0.6rem] text-center mt-4 text-slate uppercase tracking-wider">
                          {isAr ? 'ضمان استرجاع الأموال 30 يوماً' : '30-Day Money Back Guarantee'}
                      </p>
                  </div>

              </div>
          </div>
      </section>

      {/* --- NEW SECTION: FAQ (Technical Specs) --- */}
      <section className="py-24 bg-[#050505]">
          <div className="container mx-auto px-6 max-w-3xl">
              <div className="text-center mb-12">
                  <h2 className={`text-2xl text-white mb-8 ${headingFont}`}>{content.faq.headline[lang]}</h2>
              </div>
              <div className="space-y-2">
                  {content.faq.items.map((item, idx) => (
                      <div key={idx} className="border border-white/10 bg-[#111]">
                          <button 
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                            className="w-full flex justify-between items-center p-6 text-left"
                          >
                              <span className={`text-sm text-white font-bold ${bodyFont}`}>{item.q[lang]}</span>
                              {activeFaq === idx ? <X size={16} className="text-bronze" /> : <Plus size={16} className="text-slate" />}
                          </button>
                          <AnimatePresence>
                              {activeFaq === idx && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                      <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                                          {item.a[lang]}
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 1️⃣2️⃣ WHO THIS IS FOR */}
      <section className="py-24 bg-[#050505]">
           <div className="container mx-auto px-6 max-w-5xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   
                   {/* FOR YOU */}
                   <div className="bg-green-900/5 border border-green-900/20 p-8 md:p-10">
                       <h3 className={`text-xl text-green-400 mb-6 font-bold ${headingFont}`}>{content.qualifiers.forYou.title[lang]}</h3>
                       <ul className="space-y-4">
                           {content.qualifiers.forYou.items.map((item, i) => (
                               <li key={i} className="flex items-center gap-3 text-slate-300">
                                   <Check size={16} className="text-green-500 shrink-0" />
                                   <span className={bodyFont}>{item[lang]}</span>
                               </li>
                           ))}
                       </ul>
                   </div>

                   {/* NOT FOR YOU */}
                   <div className="bg-red-900/5 border border-red-900/20 p-8 md:p-10">
                       <h3 className={`text-xl text-red-400 mb-6 font-bold ${headingFont}`}>{content.qualifiers.notForYou.title[lang]}</h3>
                       <ul className="space-y-4">
                           {content.qualifiers.notForYou.items.map((item, i) => (
                               <li key={i} className="flex items-center gap-3 text-slate-300">
                                   <div className="text-red-500 font-bold text-xs shrink-0">✕</div>
                                   <span className={bodyFont}>{item[lang]}</span>
                               </li>
                           ))}
                       </ul>
                   </div>

               </div>
           </div>
      </section>

      {/* 1️⃣4️⃣ FOOTER (Minimal) */}
      <footer className="bg-[#050505] py-12 text-center border-t border-white/5">
           <div className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-600">
               © HUMAN ARCHITECTURE™ • ALL RIGHTS RESERVED
           </div>
      </footer>

    </div>
  );
};

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View, Product } from '../types';
import { LANDING_CONTENT, PRODUCTS } from '../constants';
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
  const [isPlaying, setIsPlaying] = useState(false);

  // Safe translation helper
  const getTxt = useCallback((obj: any): string => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[lang] || obj['en'] || obj['ar'] || '';
  }, [lang]);

  const handleBuySchematic = () => {
      if (!onCheckout) return;
      const product = pricingMode === 'physical' 
        ? PRODUCTS.find(p => p.id === 'book_print') 
        : PRODUCTS.find(p => p.id === 'book_digital');
      
      if (product) onCheckout([product]);
  };

  const handleBuyMasterPlan = () => {
      if (!onCheckout) return;
      const product = PRODUCTS.find(p => p.id === 'bundle_master');
      if (product) onCheckout([product]);
  };

  const scrollToOffer = () => {
      const el = document.getElementById('pricing-table');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div dir={dir} className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-bronze selection:text-black font-sans">
      
      {/* 1️⃣ MINIMALIST HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto group flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
             <div className="w-8 h-8 border border-white/30 flex items-center justify-center group-hover:border-bronze group-hover:text-bronze transition-colors">
                 <Layout size={14} />
             </div>
             <span className={`text-[0.6rem] uppercase tracking-[0.2em] font-bold ${bodyFont} hidden md:block`}>
                 {getTxt(content.header.left)}
             </span>
          </button>
          
          <div className="flex gap-6 pointer-events-auto">
              <button onClick={() => setView('home')} className="text-[0.6rem] uppercase tracking-widest text-slate hover:text-white transition-colors">
                  {getTxt(content.header.right)}
              </button>
              <button onClick={() => setView('register')} className="text-[0.6rem] uppercase tracking-widest font-bold text-bronze border border-bronze/30 px-4 py-1 hover:bg-bronze hover:text-black transition-colors">
                  {getTxt(content.header.join)}
              </button>
          </div>
      </header>

      {/* 2️⃣ PRE-HEADLINE WARNING */}
      <div className="pt-32 pb-8 text-center px-4">
           <div className="inline-flex items-center gap-2 bg-red-900/10 border border-red-900/30 px-4 py-2 rounded-full">
               <AlertTriangle size={12} className="text-red-500" />
               <span className="text-[0.6rem] text-red-400 uppercase tracking-widest font-bold">
                   {getTxt(content.warning)}
               </span>
           </div>
      </div>

      {/* 3️⃣ HERO SECTION */}
      <section className="relative container mx-auto px-6 text-center pb-24">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
             className={`text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-bold text-white mb-8 ${headingFont} whitespace-pre-line`}
           >
               {getTxt(content.hero.headline)}
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
             className={`text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 ${bodyFont}`}
           >
               {getTxt(content.hero.subheadline)}
           </motion.p>

           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
             className="text-xs text-bronze uppercase tracking-widest mb-16 border-b border-bronze/20 inline-block pb-1"
           >
               {getTxt(content.hero.support)}
           </motion.div>

           {/* 4️⃣ CINEMATIC VIDEO PLAYER (THE BLUEPRINT REVEAL) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
             className="relative max-w-5xl mx-auto aspect-video bg-black border border-white/10 shadow-[0_0_120px_rgba(197,160,101,0.25)] flex items-center justify-center group overflow-hidden mb-12 rounded-sm"
           >
                <AnimatePresence mode="wait">
                    {!isPlaying ? (
                        <motion.div 
                            key="cover"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full h-full cursor-pointer z-10"
                            onClick={() => setIsPlaying(true)}
                        >
                            {/* ARTISTIC BLUEPRINT COVER */}
                            <div className="absolute inset-0 bg-[#080808]">
                                <img 
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Architectural Foundation"
                                    className="w-full h-full object-cover filter grayscale brightness-[0.3] contrast-[1.2] transition-all duration-1000 group-hover:scale-[1.02] group-hover:brightness-[0.4]"
                                />
                                {/* Grid & Tech Overlays */}
                                <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
                                
                                {/* Vertical Tech Bar */}
                                <div className="absolute top-0 left-12 bottom-0 w-px bg-bronze/10 hidden md:block"></div>
                                <div className="absolute top-1/2 left-12 -translate-y-1/2 -translate-x-1/2 w-2 h-16 bg-bronze/40 hidden md:block"></div>
                            </div>

                            {/* UI Interface */}
                            <div className="relative z-20 flex flex-col items-center justify-center h-full">
                                {/* Pulse Effect */}
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-bronze/40 flex items-center justify-center bg-black/40 backdrop-blur-xl shadow-2xl transition-all group-hover:border-bronze group-hover:bg-bronze/10"
                                >
                                    <Play size={40} className="text-bronze ml-1.5" fill="currentColor" />
                                    <div className="absolute inset-[-8px] rounded-full border border-bronze/10 animate-pulse"></div>
                                </motion.div>
                                
                                <div className="mt-8 text-center px-8">
                                    <span className={`block text-white font-bold text-xl md:text-2xl tracking-[0.2em] mb-2 ${headingFont} uppercase`}>
                                        {getTxt(content.hero.videoLabel)}
                                    </span>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="h-px w-12 bg-bronze/20"></span>
                                        <span className="text-bronze text-[0.6rem] font-mono uppercase tracking-[0.4em]">
                                            {getTxt(content.hero.videoDuration)} • DEPLOY_PROTO_42
                                        </span>
                                        <span className="h-px w-12 bg-bronze/20"></span>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-10 left-10 w-10 h-10 border-t border-l border-bronze/30"></div>
                            <div className="absolute top-10 right-10 w-10 h-10 border-t border-r border-bronze/30"></div>
                            <div className="absolute bottom-10 left-10 w-10 h-10 border-b border-l border-bronze/30"></div>
                            <div className="absolute bottom-10 right-10 w-10 h-10 border-b border-r border-bronze/30"></div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="video"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 w-full h-full bg-black z-30"
                        >
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube-nocookie.com/embed/xoDURQ-jqow?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3" 
                                title="Human Architecture Execution" 
                                style={{ border: 0 }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
                                className="absolute top-6 right-6 bg-black/80 text-white p-2 hover:bg-bronze transition-all z-40 rounded-sm border border-white/10 flex items-center justify-center group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
           </motion.div>

           {/* 5️⃣ PRIMARY CTA */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
             className="flex flex-col items-center"
           >
               <button 
                  onClick={scrollToOffer}
                  className="bg-bronze text-white px-12 py-6 text-sm md:text-base font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_40px_rgba(197,160,101,0.3)] mb-6 rounded-sm"
               >
                   {getTxt(content.hero.cta)}
               </button>
               <div className="flex items-center gap-3 text-slate-500 text-[0.6rem] uppercase tracking-widest font-bold">
                   <Shield size={12} className="text-bronze/50" /> 
                   {getTxt(content.hero.guarantee)}
               </div>
           </motion.div>
      </section>

      {/* 6️⃣ PROBLEM & SOLUTION SECTIONS (PRESERVED) */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
           <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
               <h2 className={`text-3xl md:text-5xl text-white mb-8 leading-tight ${headingFont} whitespace-pre-line`}>
                   {getTxt(content.problem.headline)}
               </h2>
               <p className={`text-lg text-slate-400 leading-relaxed mb-10 ${bodyFont}`}>
                   {getTxt(content.problem.body)}
               </p>
               <div className="inline-block border-l-4 border-bronze pl-6 text-left">
                   <p className={`text-xl md:text-2xl text-white italic ${headingFont}`}>
                       "{getTxt(content.problem.emphasis)}"
                   </p>
               </div>
           </div>
      </section>

      {/* ... (Rest of component logic remains identical, using getTxt for all content) ... */}
      
      <section id="pricing-table" className="py-32 bg-[#050505] border-t border-white/5">
           <div className="container mx-auto px-6 text-center">
                <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-4 block flex items-center justify-center gap-2">
                    <CreditCard size={14} /> {isAr ? 'عقد التوريد' : 'Procurement Contract'}
                </span>
                <h2 className={`text-3xl md:text-5xl text-white mb-16 ${headingFont}`}>{isAr ? 'اختر خطة البناء' : 'Select Construction Plan'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-[#111] border border-white/10 p-8 text-left group hover:border-bronze transition-all">
                        <h3 className={`text-2xl text-white mb-4 ${headingFont}`}>{isAr ? 'المخطط الأساسي' : 'The Schematic'}</h3>
                        <div className="text-4xl font-mono text-white mb-6">$49</div>
                        <button onClick={handleBuySchematic} className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                            {isAr ? 'اقتناء الآن' : 'Purchase Now'}
                        </button>
                    </div>
                    <div className="bg-[#151515] border-2 border-bronze p-8 text-left relative shadow-2xl scale-105">
                        <div className="absolute -top-3 right-4 bg-bronze text-black text-[0.6rem] font-bold px-3 py-1 uppercase tracking-widest">Architect's Pick</div>
                        <h3 className={`text-2xl text-white mb-4 ${headingFont}`}>{isAr ? 'النظام المتكامل' : 'The Master Plan'}</h3>
                        <div className="text-4xl font-mono text-white mb-6">$397</div>
                        <button onClick={handleBuyMasterPlan} className="w-full py-4 bg-bronze text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                            {isAr ? 'بدء التنفيذ' : 'Execute Plan'}
                        </button>
                    </div>
                </div>
           </div>
      </section>

      <footer className="bg-[#050505] py-16 text-center border-t border-white/5">
           <div className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-600 font-mono">
               © HUMAN ARCHITECTURE™ • SEC_PROTO_42 • ALL RIGHTS RESERVED
           </div>
      </footer>
    </div>
  );
};

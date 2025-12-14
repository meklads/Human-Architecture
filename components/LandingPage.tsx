
import React from 'react';
import { motion } from 'framer-motion';
import { Language, View, Product } from '../types';
import { Hero } from './Hero';
import { Assessment } from './Assessment';
import { LANDING_CONTENT, PRODUCTS } from '../constants';
import { ArrowRight, Check, Shield, Quote, Activity, Layers, Star, AlertTriangle, Box, BookOpen, PenTool } from './Icons';

interface LandingPageProps {
  lang: Language;
  setView: (view: View) => void;
  onCheckout?: (items: Product[]) => void;
}

// --- VISUAL MOCKUPS (Integrated for Sales Impact) ---
const MockupPrintBook = () => (
    <div className="relative w-32 h-44 perspective-1000 group-hover:scale-105 transition-transform duration-500 mx-auto">
        <div className="absolute top-0 left-0 w-4 h-full bg-[#111] border-y border-l border-bronze transform origin-right -rotate-y-12 shadow-2xl z-10"></div>
        <div className="absolute top-0 left-4 w-full h-full bg-[#0a0a0a] border border-bronze/50 flex flex-col items-center justify-center p-3 shadow-2xl z-20">
            <Box size={40} className="text-bronze mb-3" strokeWidth={1} />
            <div className="w-16 h-[1px] bg-bronze/50 mb-2"></div>
            <div className="text-[0.5rem] text-bronze uppercase tracking-widest text-center font-bold">The Blueprint</div>
        </div>
        <div className="absolute top-1 right-0 w-3 h-[98%] bg-white/10 transform translate-x-1 z-0 border-r border-white/20"></div>
    </div>
);

const MockupHybridSystem = () => (
    <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
        {/* Background Orbit */}
        <div className="absolute inset-0 border border-bronze/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border border-bronze/40 rounded-full border-dashed animate-reverse-spin"></div>
        
        {/* Central Hub */}
        <div className="relative z-10 w-24 h-24 bg-[#1a1a1a] border border-bronze rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(197,160,101,0.2)]">
            <Activity size={40} className="text-bronze animate-pulse" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 bg-[#0a0a0a] border border-white/20 p-2 rounded shadow-lg">
            <BookOpen size={16} className="text-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 bg-[#0a0a0a] border border-white/20 p-2 rounded shadow-lg">
            <PenTool size={16} className="text-white" />
        </div>
    </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-serif';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';
  const content = LANDING_CONTENT;

  // Retrieve products
  const bundleProduct = PRODUCTS.find(p => p.id === 'bundle_master');
  const bookProduct = PRODUCTS.find(p => p.id === 'book_print');

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-[#050505] text-alabaster overflow-x-hidden"
    >
      {/* 1. HERO SECTION (The Hook) */}
      <Hero lang={lang} setView={setView} />
      
      {/* 2. THE COLLAPSE (The Pain/Story) */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden">
          <div className={`absolute top-0 right-0 text-[10rem] text-white/[0.02] font-bold pointer-events-none select-none ${headingFont}`}>
              COLLAPSE
          </div>
          
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="flex flex-col md:flex-row gap-16 items-center">
                  <div className="w-full md:w-1/2 relative">
                      <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-bronze"></div>
                      <blockquote className={`text-2xl md:text-4xl leading-relaxed text-slate/80 ${headingFont}`}>
                          "{content.collapse.story[lang]}"
                      </blockquote>
                      <div className="mt-8 flex items-center gap-4">
                          <div className="h-px flex-1 bg-slate/20"></div>
                          <span className="text-bronze text-xs uppercase tracking-widest">Case Study: 2024</span>
                      </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 border-l-2 border-red-900/30 pl-8 md:pl-12 py-4">
                      <div className="flex items-center gap-3 text-red-500 mb-4">
                          <AlertTriangle size={20} />
                          <span className="text-xs uppercase tracking-[0.2em] font-bold">{content.collapse.title[lang]}</span>
                      </div>
                      <h3 className={`text-3xl text-white mb-6 ${headingFont}`}>
                          {content.collapse.quote[lang]}
                      </h3>
                      <p className={`text-slate leading-loose mb-8 ${bodyFont}`}>
                          {isAr 
                           ? 'معظم الناس يحاولون إصلاح حياتهم بـ "الديكور الداخلي" (التأمل، الإيجابية، العادات السطحية). لكن المشكلة ليست في الطلاء، المشكلة في الأعمدة الحاملة.'
                           : 'Most people try to fix their lives with "Interior Decoration" (Meditation, Positivity, Surface Habits). But the problem isn\'t the paint; it\'s the load-bearing columns.'}
                      </p>
                      <button 
                        onClick={() => document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-bronze border-b border-bronze pb-1 hover:text-white hover:border-white transition-colors text-sm uppercase tracking-widest"
                      >
                          {content.collapse.cta[lang]}
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. THE DIAGNOSIS (Interactive Assessment) */}
      <div id="assessment-section" className="border-t border-white/10">
        <Assessment lang={lang} setView={setView} />
      </div>

      {/* 4. THE SOLUTION (The System Breakdown) */}
      <section className="py-24 bg-[#080808] border-t border-white/10">
          <div className="container mx-auto px-6">
              <div className="text-center mb-20">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] block mb-4">
                      {content.system.title[lang]}
                  </span>
                  <h2 className={`text-4xl md:text-6xl text-white ${headingFont}`}>
                      {content.system.subtitle[lang]}
                  </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  <div className="absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent hidden md:block"></div>

                  {content.system.components.map((comp, idx) => (
                      <div key={idx} className="bg-[#111] border border-white/5 p-8 relative group hover:border-bronze/30 transition-colors">
                          <div className="w-24 h-24 bg-[#050505] border border-slate/20 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-bronze transition-colors shadow-2xl">
                              <span className="text-3xl font-serif text-slate group-hover:text-white transition-colors">{idx + 1}</span>
                          </div>
                          <h3 className={`text-xl text-center text-white mb-4 ${headingFont}`}>{comp.title[lang]}</h3>
                          <p className={`text-center text-slate text-sm leading-relaxed mb-6 ${bodyFont}`}>
                              {comp.desc[lang]}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. THE TRANSFORMATION (Social Proof) */}
      <section className="py-24 bg-alabaster dark:bg-[#F2F0EB] text-charcoal relative">
          <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                  <Quote size={48} className="mx-auto text-bronze mb-8 opacity-50" />
                  <h2 className={`text-3xl md:text-5xl mb-8 leading-tight font-bold ${headingFont}`}>
                      "{content.transformation.quote[lang]}"
                  </h2>
                  <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-charcoal text-white rounded-full flex items-center justify-center font-serif text-xl">S</div>
                      <div className="text-left">
                          <div className="font-bold text-sm uppercase tracking-wider">Sarah Mitchell</div>
                          <div className="text-[0.6rem] text-slate uppercase tracking-widest">Senior Architect, Class of 2024</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. THE OFFER (High Impact Cards) */}
      <section className="py-24 bg-[#050505] border-t border-white/10">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className={`text-4xl md:text-5xl text-white ${headingFont}`}>{content.pricing.title[lang]}</h2>
                  <p className="text-slate mt-4">{isAr ? 'اختر الأدوات التي تناسب مرحلة البناء الخاصة بك.' : 'Select the tools that fit your construction phase.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                  
                  {/* OPTION 1: THE BOOK (Physical) */}
                  <div className="border border-white/10 bg-[#111] p-8 flex flex-col hover:border-bronze/30 transition-all group relative">
                      <div className="h-48 flex items-center justify-center mb-8 border-b border-white/5 bg-[#080808]">
                          <MockupPrintBook />
                      </div>
                      
                      <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{bookProduct?.name[lang]}</h3>
                      <div className="text-3xl font-mono text-bronze mb-6">${bookProduct?.price}</div>
                      
                      <p className="text-slate text-sm mb-8 flex-1 leading-relaxed">
                          {isAr 
                            ? 'المخطط الأساسي. الكتاب المطبوع بجودة فاخرة يحتوي على جميع القوانين والمفاهيم النظرية لإعادة الهيكلة.' 
                            : 'The Master Blueprint. Premium hardcover containing all laws and theoretical concepts for restructuring.'}
                      </p>
                      
                      <ul className="space-y-4 mb-8 text-sm text-slate">
                          <li className="flex gap-3"><Check size={16} className="text-white" /> {isAr ? 'نسخة ورقية (Hardcover)' : 'Premium Hardcover'}</li>
                          <li className="flex gap-3"><Check size={16} className="text-white" /> {isAr ? 'نسخة رقمية فورية' : 'Instant Digital Access'}</li>
                          <li className="flex gap-3"><Check size={16} className="text-white" /> {isAr ? 'شحن عالمي' : 'Worldwide Shipping'}</li>
                      </ul>

                      <button 
                        onClick={() => onCheckout && bookProduct && onCheckout([bookProduct])}
                        className="w-full py-4 border border-white/20 text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors"
                      >
                          {isAr ? 'شراء الكتاب' : 'PURCHASE BOOK'}
                      </button>
                  </div>

                  {/* OPTION 2: THE SYSTEM (Hybrid - Recommended) */}
                  <div className="border-2 border-bronze bg-[#151515] p-8 flex flex-col relative transform md:-translate-y-6 shadow-2xl">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bronze text-white text-[0.6rem] uppercase tracking-widest px-4 py-1 font-bold shadow-lg">
                          {isAr ? 'الخيار الموصى به' : 'RECOMMENDED'}
                      </div>
                      
                      <div className="h-48 flex items-center justify-center mb-8 border-b border-white/5 bg-gradient-to-b from-[#080808] to-[#1a1a1a]">
                          <MockupHybridSystem />
                      </div>
                      
                      <h3 className={`text-3xl text-white mb-2 ${headingFont}`}>{bundleProduct?.name[lang]}</h3>
                      <div className="flex items-baseline gap-3 mb-6">
                          <span className="text-4xl font-mono text-white font-bold">${bundleProduct?.price}</span>
                          <span className="text-slate line-through decoration-red-500 decoration-2 text-lg">${bundleProduct?.originalPrice}</span>
                      </div>
                      
                      <p className="text-white/80 text-sm mb-8 flex-1 leading-relaxed border-l-2 border-bronze pl-4">
                          {isAr 
                            ? 'نظام التنفيذ الكامل. ليس مجرد قراءة، بل تطبيق. يشمل الكتاب، الوورك بوك، والدخول للنظام الرقمي.' 
                            : 'The Complete Execution System. Not just reading, but building. Includes Book, Workbook, and Digital Dashboard access.'}
                      </p>

                      <ul className="space-y-4 mb-8 text-sm text-white/90">
                          <li className="flex gap-3 items-start"><Star size={16} className="text-bronze shrink-0" fill="currentColor" /> {isAr ? 'الكتاب المطبوع + الرقمي' : 'The Blueprint Book (Print + Digital)'}</li>
                          <li className="flex gap-3 items-start"><Star size={16} className="text-bronze shrink-0" fill="currentColor" /> {isAr ? 'دفتر التطبيقات (Workbook)' : '28-Day Workbook (PDF)'}</li>
                          <li className="flex gap-3 items-start"><Star size={16} className="text-bronze shrink-0" fill="currentColor" /> {isAr ? 'عضوية النقابة (مدى الحياة)' : 'Lifetime Guild Membership'}</li>
                          <li className="flex gap-3 items-start"><Star size={16} className="text-bronze shrink-0" fill="currentColor" /> {isAr ? 'لوحة التحكم التفاعلية' : 'Interactive Dashboard Access'}</li>
                      </ul>

                      <button 
                        onClick={() => onCheckout && bundleProduct && onCheckout([bundleProduct])}
                        className="w-full py-5 bg-bronze text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors shadow-[0_0_20px_rgba(197,160,101,0.3)] animate-pulse"
                      >
                          {isAr ? 'ابدأ إعادة البناء' : 'START COMPLETE REBUILD'}
                      </button>
                  </div>

              </div>
          </div>
      </section>

      {/* 7. THE GUARANTEE (Risk Reversal) */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-slate/10 text-center">
          <div className="container mx-auto px-6 max-w-3xl">
              <Shield size={64} className="mx-auto text-bronze mb-6" strokeWidth={1} />
              <h2 className={`text-3xl md:text-4xl mb-6 text-charcoal dark:text-white ${headingFont}`}>
                  {content.guarantee.title[lang]}
              </h2>
              <p className={`text-lg text-slate mb-12 ${bodyFont}`}>
                  {content.guarantee.text[lang]}
              </p>
              
              <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={() => onCheckout && bundleProduct && onCheckout([bundleProduct])}
                    className="flex items-center gap-2 text-charcoal dark:text-white font-bold uppercase tracking-widest border-b-2 border-bronze pb-1 hover:text-bronze transition-colors"
                  >
                      {content.guarantee.cta[lang]} <ArrowRight size={16} />
                  </button>
                  <span className="text-[0.6rem] uppercase tracking-widest text-slate/50 mt-4">
                      {content.guarantee.trust[lang]}
                  </span>
              </div>
          </div>
      </section>

    </motion.div>
  );
};


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, Product } from '../types';
import { PRODUCTS, LANDING_CONTENT } from '../constants';
import { Layers, PenTool, Activity, Check, Shield, Lock, Play, ArrowRight, Star, AlertTriangle, Zap, Target, Users, BookOpen, ShoppingBag, Box, CreditCard } from './Icons';
import { Magnetic } from './Magnetic';

interface LibraryPageProps {
  lang: Language;
  onCheckout?: (items: Product[]) => void;
}

// --- VISUAL MOCKUP COMPONENTS ---

const MockupPrintBook = () => (
    <div className="relative w-28 h-36 perspective-1000 group-hover:scale-105 transition-transform duration-500">
        {/* Book Spine */}
        <div className="absolute top-0 left-0 w-3 h-full bg-[#111] border-y border-l border-bronze transform origin-right -rotate-y-12 shadow-2xl z-10"></div>
        {/* Book Cover */}
        <div className="absolute top-0 left-3 w-full h-full bg-[#0a0a0a] border border-bronze/50 flex flex-col items-center justify-center p-2 shadow-2xl z-20">
            <Box size={32} className="text-bronze mb-2" strokeWidth={1} />
            <div className="w-12 h-[1px] bg-bronze/50 mb-1"></div>
            <div className="text-[0.4rem] text-bronze uppercase tracking-widest text-center">The Blueprint</div>
        </div>
        {/* Pages (Right Side) */}
        <div className="absolute top-1 right-0 w-2 h-[98%] bg-white/10 transform translate-x-1 z-0 border-r border-white/20"></div>
    </div>
);

const MockupDigitalBook = () => (
    <div className="relative w-32 h-24 bg-[#0a0a0a] border border-white/20 rounded-sm flex items-center justify-center shadow-2xl group-hover:border-bronze/50 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <BookOpen size={32} className="text-white/50 group-hover:text-white transition-colors" strokeWidth={1} />
        <span className="absolute bottom-1 right-2 text-[0.4rem] text-bronze uppercase tracking-widest">PDF</span>
    </div>
);

const MockupWorkbook = () => (
    <div className="relative w-28 h-36 bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center p-2 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
        {/* Spiral Binding Effect */}
        <div className="absolute top-0 left-1 h-full w-2 flex flex-col justify-evenly">
            {[...Array(8)].map((_, i) => <div key={i} className="w-full h-1 bg-white/20 rounded-full"></div>)}
        </div>
        <PenTool size={28} className="text-bronze mb-2" strokeWidth={1} />
        <div className="text-[0.35rem] text-slate uppercase tracking-widest text-center">Construction<br/>Log</div>
    </div>
);

const MockupHybrid = () => (
    <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 border border-bronze/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border border-bronze/40 rounded-full border-dashed animate-reverse-spin"></div>
        <Activity size={32} className="text-bronze animate-pulse" />
    </div>
);


export const LibraryPage: React.FC<LibraryPageProps> = ({ lang, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-serif';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';
  const dir = isAr ? 'rtl' : 'ltr';

  // Products from catalog
  const completeRebuild = PRODUCTS.find(p => p.id === 'bundle_master');
  
  // Individual items for "A La Carte"
  const bookDigital = PRODUCTS.find(p => p.id === 'book_digital');
  const bookPrint = PRODUCTS.find(p => p.id === 'book_print');
  const workbookPrint = PRODUCTS.find(p => p.id === 'workbook_print');
  const systemHybrid = PRODUCTS.find(p => p.id === 'system_hybrid');

  const handlePurchase = (product: Product | undefined) => {
    if (product && onCheckout) {
        onCheckout([product]);
    }
  };

  const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
      <div className="text-center mb-16 relative z-10">
          <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-4 block">{subtitle}</span>
          <h2 className={`text-3xl md:text-5xl text-white ${headingFont} leading-tight`}>{title}</h2>
          <div className="w-24 h-1 bg-bronze mx-auto mt-6"></div>
      </div>
  );

  const BenefitBullet = ({ text }: { text: string }) => (
      <div className="flex items-start gap-4 mb-4">
          <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-1">
              <Check size={14} className="text-green-500" />
          </div>
          <p className={`text-slate text-lg ${bodyFont}`}>{text}</p>
      </div>
  );

  return (
    <div dir={dir} className="bg-[#050505] min-h-screen text-alabaster overflow-x-hidden pt-20">
      
      {/* ... (Existing Hero Sections 1-4 remain unchanged for brevity, focusing on the Product Grid update) ... */}
      
      {/* =====================================================================================
          5. A LA CARTE (Individual Items) - UPDATED VISUALS
      ===================================================================================== */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <span className="text-slate text-xs uppercase tracking-[0.3em] font-bold mb-4 block flex items-center justify-center gap-2">
                      <ShoppingBag size={14} /> {isAr ? 'الشراء الفردي' : 'A LA CARTE'}
                  </span>
                  <h3 className={`text-3xl text-white ${headingFont}`}>{isAr ? 'مخزن المواد الفردية' : 'Material Depot'}</h3>
                  <p className="text-slate mt-2 text-sm">{isAr ? 'اشترِ ما تحتاجه فقط إذا كنت لا تريد الباقة الكاملة.' : 'Buy only what you need if you prefer not to bundle.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  
                  {/* Item 1: Blueprint Digital */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col hover:border-bronze/50 transition-colors group h-full">
                      <div className="h-48 bg-[#050505] flex items-center justify-center mb-6 relative overflow-hidden border border-white/5 group-hover:bg-[#080808]">
                          <MockupDigitalBook />
                          <div className="absolute top-2 right-2 bg-slate/20 text-slate text-[0.6rem] px-2 py-1 uppercase font-bold tracking-widest">Digital</div>
                      </div>
                      <h4 className={`text-lg text-white mb-2 ${headingFont}`}>{bookDigital?.name[lang]}</h4>
                      <p className="text-xs text-slate/60 mb-6 flex-1">{bookDigital?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                          <span className="text-white font-mono font-bold text-lg">${bookDigital?.price}</span>
                          <button 
                            onClick={() => handlePurchase(bookDigital)} 
                            className="text-xs uppercase tracking-[0.2em] text-bronze hover:text-white font-bold transition-colors"
                          >
                              {isAr ? 'شراء' : 'PURCHASE'}
                          </button>
                      </div>
                  </div>

                  {/* Item 2: Blueprint Print */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col hover:border-bronze/50 transition-colors group h-full">
                      <div className="h-48 bg-[#050505] flex items-center justify-center mb-6 relative overflow-hidden border border-white/5 group-hover:bg-[#080808]">
                          <MockupPrintBook />
                          <div className="absolute top-2 right-2 bg-bronze/20 text-bronze text-[0.6rem] px-2 py-1 uppercase font-bold tracking-widest">Print</div>
                      </div>
                      <h4 className={`text-lg text-white mb-2 ${headingFont}`}>{bookPrint?.name[lang]}</h4>
                      <p className="text-xs text-slate/60 mb-6 flex-1">{bookPrint?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                          <span className="text-white font-mono font-bold text-lg">${bookPrint?.price}</span>
                          <button 
                            onClick={() => handlePurchase(bookPrint)} 
                            className="text-xs uppercase tracking-[0.2em] text-bronze hover:text-white font-bold transition-colors"
                          >
                              {isAr ? 'شراء' : 'PURCHASE'}
                          </button>
                      </div>
                  </div>

                  {/* Item 3: Workbook Print */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col hover:border-bronze/50 transition-colors group h-full">
                      <div className="h-48 bg-[#050505] flex items-center justify-center mb-6 relative overflow-hidden border border-white/5 group-hover:bg-[#080808]">
                          <MockupWorkbook />
                          <div className="absolute top-2 right-2 bg-bronze/20 text-bronze text-[0.6rem] px-2 py-1 uppercase font-bold tracking-widest">Print</div>
                      </div>
                      <h4 className={`text-lg text-white mb-2 ${headingFont}`}>{workbookPrint?.name[lang]}</h4>
                      <p className="text-xs text-slate/60 mb-6 flex-1">{workbookPrint?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                          <span className="text-white font-mono font-bold text-lg">${workbookPrint?.price}</span>
                          <button 
                            onClick={() => handlePurchase(workbookPrint)} 
                            className="text-xs uppercase tracking-[0.2em] text-bronze hover:text-white font-bold transition-colors"
                          >
                              {isAr ? 'شراء' : 'PURCHASE'}
                          </button>
                      </div>
                  </div>

                  {/* Item 4: System Hybrid */}
                  <div className="bg-[#151515] border border-bronze/30 p-6 flex flex-col hover:border-bronze transition-colors group relative h-full">
                      <div className="absolute -top-3 -right-3 bg-bronze text-white text-[0.6rem] px-2 py-1 font-bold shadow-lg">CORE</div>
                      <div className="h-48 bg-[#050505] flex items-center justify-center mb-6 relative overflow-hidden border border-white/5 group-hover:bg-[#080808]">
                          <MockupHybrid />
                          <div className="absolute top-2 left-2 bg-blue-900/50 text-blue-300 text-[0.6rem] px-2 py-1 uppercase font-bold tracking-widest">Hybrid</div>
                      </div>
                      <h4 className={`text-lg text-white mb-2 ${headingFont}`}>{systemHybrid?.name[lang]}</h4>
                      <p className="text-xs text-slate/60 mb-6 flex-1">{systemHybrid?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                          <span className="text-white font-mono font-bold text-lg">${systemHybrid?.price}</span>
                          <button 
                            onClick={() => handlePurchase(systemHybrid)} 
                            className="text-xs uppercase tracking-[0.2em] text-bronze hover:text-white font-bold transition-colors"
                          >
                              {isAr ? 'شراء' : 'PURCHASE'}
                          </button>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* ... (Testimonials and Footer sections remain) ... */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-6">
              <SectionHeader title={isAr ? 'قصص البنائين' : 'Builders Stories'} subtitle={isAr ? 'إثبات هندسي' : 'STRUCTURAL PROOF'} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#111] p-8 border border-white/10 hover:border-bronze/30 transition-colors">
                          <div className="flex gap-1 text-bronze mb-4">
                              <Star fill="currentColor" size={16} />
                              <Star fill="currentColor" size={16} />
                              <Star fill="currentColor" size={16} />
                              <Star fill="currentColor" size={16} />
                              <Star fill="currentColor" size={16} />
                          </div>
                          <p className={`text-slate mb-6 leading-relaxed ${bodyFont} text-sm`}>
                              "{isAr 
                                ? 'كنت أعتقد أنني بحاجة لإجازة، اكتشفت أنني بحاجة لإعادة تصميم يومي. هذا النظام غيّر القواعد تماماً.' 
                                : 'I thought I needed a vacation; I discovered I needed to redesign my day. This system changed the rules completely.'}"
                          </p>
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
                              <div>
                                  <div className="text-white font-bold text-sm">Builder #{100+i}</div>
                                  <div className="text-bronze text-xs uppercase">Senior Architect</div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-slate/10 text-center">
          <div className="container mx-auto px-6 max-w-3xl">
              <Shield size={64} className="mx-auto text-bronze mb-6" strokeWidth={1} />
              <h2 className={`text-3xl md:text-4xl mb-6 text-charcoal dark:text-white ${headingFont}`}>
                  {isAr ? 'ضمان المتانة الإنشائية 100%' : '100% Structural Integrity Guarantee'}
              </h2>
              <p className={`text-lg text-slate mb-12 ${bodyFont}`}>
                  {isAr 
                   ? 'إذا طبقت البرنامج لمدة 30 يوماً ولم تشعر بفرق جذري في ثباتك النفسي وقوتك العقلية، سنعيد لك كل دولار. نحن نبيع نتائج، لا وعود.'
                   : 'If you execute the program for 30 days and do not feel a radical shift in your psychological stability and mental strength, we will refund every dollar. We sell results, not promises.'}
              </p>
              
              <button 
                onClick={() => handlePurchase(completeRebuild)}
                className="bg-charcoal dark:bg-white text-white dark:text-black px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-bronze dark:hover:bg-bronze hover:text-white transition-colors shadow-2xl mb-8"
              >
                  {isAr ? 'ابدأ البناء بدون مخاطرة' : 'START BUILDING RISK-FREE'}
              </button>
              
              <div className="flex justify-center gap-8 opacity-50 grayscale">
                  <span className="font-serif font-bold text-xl">VISA</span>
                  <span className="font-serif font-bold text-xl">Mastercard</span>
                  <span className="font-serif font-bold text-xl">PayPal</span>
              </div>
          </div>
      </section>

    </div>
  );
};

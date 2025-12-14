
import React from 'react';
import { motion } from 'framer-motion';
import { Language, Product, View } from '../types';
import { PRODUCTS, LANDING_CONTENT } from '../constants';
import { Check, Shield, ArrowRight, Layers, Star, Box, Compass, Users, PenTool, Layout, Lock, FileText, Activity, AlertTriangle } from './Icons';
import { Magnetic } from './Magnetic';

interface LandingPageProps {
  lang: Language;
  setView: (view: View) => void;
  onCheckout?: (items: Product[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-serif'; // Lora via font-serif
  const bodyFont = isAr ? 'font-ibm' : 'font-sans'; // Inter via font-sans
  const dir = isAr ? 'rtl' : 'ltr';

  // Products
  const blueprintOnly = PRODUCTS.find(p => p.id === 'book_only');
  const completeRebuild = PRODUCTS.find(p => p.id === 'bundle_master');
  const masterArchitect = PRODUCTS.find(p => p.id === 'bundle_coach');

  const handlePurchase = (product: Product | undefined) => {
    if (product && onCheckout) {
        onCheckout([product]);
    } else {
        setView('checkout');
    }
  };

  return (
    <div dir={dir} className="bg-alabaster min-h-screen text-charcoal overflow-x-hidden">
      
      {/* 1. HERO - Minimalist & High-Impact */}
      <header className="relative min-h-[90vh] flex items-center bg-white overflow-hidden border-b border-slate/10">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
         
         <div className="container mx-auto px-6 relative z-10 pt-20">
             <div className="max-w-4xl mx-auto text-center">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 border border-[#C5A065]/50 px-4 py-1 mb-8"
                 >
                     <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[#C5A065] font-bold">
                         {LANDING_CONTENT.hero.subtitle[lang]}
                     </span>
                 </motion.div>

                 <motion.h1 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className={`text-5xl md:text-8xl leading-[1.1] mb-8 ${headingFont} font-normal text-charcoal`}
                 >
                     {LANDING_CONTENT.hero.headline[lang]}
                 </motion.h1>

                 <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className={`text-xl text-slate leading-relaxed max-w-2xl mx-auto mb-12 ${bodyFont} font-light`}
                 >
                     {LANDING_CONTENT.hero.desc[lang]}
                 </motion.p>
                 
                 <div className="flex justify-center">
                    <Magnetic strength={0.3}>
                        <button 
                            onClick={() => document.getElementById('collapse')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#C5A065] text-white px-10 py-5 text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#003366] transition-all shadow-2xl flex items-center gap-4"
                        >
                            {LANDING_CONTENT.hero.cta[lang]} <ArrowRight size={16} />
                        </button>
                    </Magnetic>
                 </div>
             </div>
         </div>
      </header>

      {/* 2. STAGE 1: THE COLLAPSE (Problem) */}
      <section id="collapse" className="py-32 bg-white text-charcoal relative">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row gap-20 items-center">
                  <div className="md:w-1/2">
                      <div className="flex items-center gap-2 mb-6">
                          <AlertTriangle size={18} className="text-[#C5A065]" />
                          <span className="text-[#003366] text-xs uppercase tracking-[0.2em] font-bold">Diagnosis</span>
                      </div>
                      <h2 className={`text-4xl md:text-5xl mb-8 leading-tight ${headingFont}`}>
                          {LANDING_CONTENT.collapse.title[lang]}
                      </h2>
                      <blockquote className="text-xl md:text-2xl text-[#003366] italic font-serif mb-10 border-l-4 border-[#C5A065] pl-6 py-2 leading-relaxed">
                          "{LANDING_CONTENT.collapse.quote[lang]}"
                      </blockquote>
                      <p className={`text-slate leading-relaxed text-lg mb-8 ${bodyFont}`}>
                          {LANDING_CONTENT.collapse.story[lang]}
                      </p>
                      <button 
                        onClick={() => document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#C5A065] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#003366] transition-colors shadow-lg"
                      >
                          {LANDING_CONTENT.collapse.cta[lang]}
                      </button>
                  </div>
                  
                  <div className="md:w-1/2 flex justify-center relative">
                      {/* Symbolic Sketch */}
                      <div className="relative w-full max-w-md aspect-[3/4] border border-slate/10 p-4 bg-alabaster shadow-xl">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                              <Compass size={64} className="text-[#003366]" />
                          </div>
                          <div className="h-full w-full border border-dashed border-[#003366]/20 flex items-center justify-center relative overflow-hidden bg-white">
                              <img 
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
                                className="w-full h-full object-cover grayscale opacity-30 mix-blend-multiply contrast-125"
                                alt="Cracked Structure"
                              />
                              {/* Red Lines */}
                              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300">
                                  <path d="M50,250 L80,150 L60,100 M120,250 L110,180" fill="none" stroke="#dc2626" strokeWidth="1" strokeDasharray="5 5" />
                                  <circle cx="80" cy="150" r="3" fill="#dc2626" />
                                  <text x="90" y="155" fill="#dc2626" fontSize="8" fontFamily="monospace">FATAL ERROR</text>
                              </svg>
                          </div>
                          <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg border-l-4 border-red-600 max-w-xs">
                              <p className="text-xs text-slate font-mono uppercase leading-relaxed">
                                  WARNING: STRUCTURAL INTEGRITY CRITICAL.<br/>IMMEDIATE INTERVENTION REQUIRED.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. STAGE 2: THE SYSTEM (3 Layers) */}
      <section id="system" className="py-32 bg-[#F9F9F9] border-t border-slate/10">
          <div className="container mx-auto px-6">
              <div className="text-center mb-24">
                  <h2 className={`text-4xl md:text-6xl text-[#003366] mb-4 ${headingFont}`}>
                      {LANDING_CONTENT.system.title[lang]}
                  </h2>
                  <p className={`text-[#C5A065] uppercase tracking-[0.3em] font-bold text-sm ${bodyFont}`}>
                      {LANDING_CONTENT.system.subtitle[lang]}
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  
                  {/* Layer 1: Blueprint */}
                  <div className="bg-white border border-[#003366]/20 p-12 flex flex-col items-center text-center hover:shadow-xl hover:border-[#003366]/50 transition-all duration-300 group relative">
                      <div className="w-20 h-20 bg-alabaster rounded-full flex items-center justify-center text-[#003366] mb-8 group-hover:scale-110 transition-transform border border-slate/10">
                          <Layers size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 text-[#003366] ${headingFont}`}>
                          {LANDING_CONTENT.system.components[0].title[lang]}
                      </h3>
                      <p className="text-[#C5A065] font-bold mb-6 font-mono text-lg">
                          {LANDING_CONTENT.system.components[0].price}
                      </p>
                      <p className={`text-slate text-sm leading-loose mb-8 ${bodyFont}`}>
                          {LANDING_CONTENT.system.components[0].desc[lang]}
                      </p>
                  </div>

                  {/* Layer 2: Kit */}
                  <div className="bg-white border border-[#003366]/20 p-12 flex flex-col items-center text-center hover:shadow-xl hover:border-[#003366]/50 transition-all duration-300 group relative">
                      <div className="absolute top-0 right-0 bg-[#C5A065] text-white text-[0.6rem] px-3 py-1 uppercase font-bold tracking-widest">
                          {isAr ? 'مجاناً' : 'INCLUDED'}
                      </div>
                      <div className="w-20 h-20 bg-alabaster rounded-full flex items-center justify-center text-[#003366] mb-8 group-hover:scale-110 transition-transform border border-slate/10">
                          <PenTool size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 text-[#003366] ${headingFont}`}>
                          {LANDING_CONTENT.system.components[1].title[lang]}
                      </h3>
                      <p className="text-[#C5A065] font-bold mb-6 font-mono text-lg">
                          {LANDING_CONTENT.system.components[1].price}
                      </p>
                      <p className={`text-slate text-sm leading-loose mb-8 ${bodyFont}`}>
                          {LANDING_CONTENT.system.components[1].desc[lang]}
                      </p>
                  </div>

                  {/* Layer 3: Accelerator */}
                  <div className="bg-white border-2 border-[#003366] p-12 flex flex-col items-center text-center shadow-2xl relative transform md:-translate-y-4 z-10">
                      <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center text-white mb-8 animate-pulse shadow-lg">
                          <Activity size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 text-[#003366] ${headingFont}`}>
                          {LANDING_CONTENT.system.components[2].title[lang]}
                      </h3>
                      <p className="text-[#C5A065] font-bold mb-6 font-mono text-lg">
                          {LANDING_CONTENT.system.components[2].price}
                      </p>
                      <p className={`text-slate text-sm leading-loose mb-10 ${bodyFont}`}>
                          {LANDING_CONTENT.system.components[2].desc[lang]}
                      </p>
                      <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#C5A065] text-white px-8 py-4 w-full text-xs uppercase tracking-widest font-bold hover:bg-[#003366] transition-colors"
                      >
                          {isAr ? 'انضم للمسرّع' : 'Join The Accelerator →'}
                      </button>
                  </div>
              </div>

              <div className="text-center mt-20">
                  <p className={`text-[#003366] italic font-serif text-xl opacity-80 border-b border-[#C5A065] inline-block pb-2`}>
                      "{LANDING_CONTENT.system.footer[lang]}"
                  </p>
              </div>
          </div>
      </section>

      {/* 4. STAGE 3: TRANSFORMATION (Story) */}
      <section className="py-32 bg-[#f9f9ff] text-[#1a1a1a] relative overflow-hidden">
          {/* Architectural Line Decoration */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-[#003366]/10 transform -translate-x-1/2 hidden lg:block"></div>

          <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto">
                  <div className="lg:w-1/2 relative group">
                      <div className="aspect-[3/4] bg-slate-200 relative overflow-hidden border border-[#003366]/10 shadow-xl">
                          <img 
                            src="https://images.unsplash.com/photo-1502086223501-681a918f5926?auto=format&fit=crop&q=80" 
                            alt="Transformation" 
                            className="w-full h-full object-cover grayscale contrast-125"
                          />
                          <div className="absolute inset-0 bg-[#003366]/10 mix-blend-multiply"></div>
                      </div>
                      {/* Decorative Frame */}
                      <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#C5A065] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                  </div>
                  
                  <div className="lg:w-1/2 bg-white p-12 border border-slate/10 shadow-lg lg:-ml-20 relative">
                      <div className="mb-8">
                          <span className="text-[#C5A065] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
                              {LANDING_CONTENT.transformation.title[lang]}
                          </span>
                          <p className={`text-xl leading-relaxed italic text-[#003366] font-serif mb-8 whitespace-pre-line`}>
                              "{LANDING_CONTENT.transformation.quote[lang]}"
                          </p>
                          <div className="flex items-center gap-4 border-t border-slate/10 pt-6">
                              <div className="w-12 h-12 bg-slate-300 rounded-full overflow-hidden border border-[#003366]">
                                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" />
                              </div>
                              <div>
                                  <div className="font-bold text-sm uppercase tracking-widest text-charcoal">Sarah Mitchell</div>
                                  <div className="text-xs text-[#C5A065]">Venture Capitalist</div>
                              </div>
                          </div>
                      </div>
                      <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#C5A065] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#003366] transition-colors w-full"
                      >
                          {LANDING_CONTENT.transformation.cta[lang]}
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. STAGE 4: PRICING (Choose Level) */}
      <section id="pricing" className="py-32 bg-white">
          <div className="container mx-auto px-6">
              <h2 className={`text-4xl md:text-5xl text-center text-[#003366] mb-24 ${headingFont}`}>
                  {LANDING_CONTENT.pricing.title[lang]}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                  
                  {/* Tier 1: Blueprint Only */}
                  <div className="border border-slate/20 p-8 flex flex-col hover:shadow-lg transition-shadow bg-white">
                      <h3 className={`text-2xl mb-2 text-[#003366] ${headingFont}`}>{blueprintOnly?.name[lang]}</h3>
                      <div className="text-3xl font-bold text-slate-800 mb-6 font-mono">${blueprintOnly?.price}</div>
                      <p className={`text-slate text-sm mb-8 ${bodyFont}`}>{blueprintOnly?.description?.[lang]}</p>
                      
                      <ul className="space-y-4 mb-8 flex-1 border-t border-slate/10 pt-6">
                          {blueprintOnly?.features?.map((f, i) => (
                              <li key={i} className="flex gap-3 text-sm text-slate">
                                  <Check size={16} className="text-[#C5A065] mt-1 shrink-0" />
                                  <span>{f[lang]}</span>
                              </li>
                          ))}
                      </ul>
                      
                      <button 
                        onClick={() => handlePurchase(blueprintOnly)}
                        className="w-full py-4 border-2 border-[#003366] text-[#003366] font-bold uppercase tracking-widest text-xs hover:bg-[#003366] hover:text-white transition-colors"
                      >
                          {isAr ? 'الحصول على المخطط' : 'Get The Blueprint'}
                      </button>
                  </div>

                  {/* Tier 2: Complete Rebuild (Best Value) */}
                  <div className="border-2 border-[#003366] p-8 flex flex-col shadow-2xl relative transform lg:-translate-y-6 bg-white z-10">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#003366] text-white text-[0.65rem] uppercase tracking-[0.2em] px-6 py-2 font-bold shadow-md">
                          BEST VALUE
                      </div>
                      <h3 className={`text-2xl mb-2 text-[#003366] ${headingFont} mt-6`}>{completeRebuild?.name[lang]}</h3>
                      <div className="text-4xl font-bold text-[#C5A065] mb-6 font-mono">${completeRebuild?.price}</div>
                      <p className={`text-slate text-sm mb-8 ${bodyFont}`}>{completeRebuild?.description?.[lang]}</p>
                      
                      <ul className="space-y-4 mb-8 flex-1 border-t border-slate/10 pt-6">
                          {completeRebuild?.features?.map((f, i) => (
                              <li key={i} className="flex gap-3 text-sm text-slate-800 font-medium">
                                  <div className="bg-[#003366] text-white rounded-full p-0.5 mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center">
                                      <Check size={10} strokeWidth={3} />
                                  </div>
                                  <span>{f[lang]}</span>
                              </li>
                          ))}
                      </ul>
                      
                      <button 
                        onClick={() => handlePurchase(completeRebuild)}
                        className="w-full py-5 bg-[#C5A065] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#003366] transition-colors shadow-lg"
                      >
                          {isAr ? 'بدء البناء الكامل' : 'Start Full Reconstruction'}
                      </button>
                  </div>

                  {/* Tier 3: Master Architect */}
                  <div className="border border-slate/20 p-8 flex flex-col hover:shadow-lg transition-shadow bg-[#f9f9f9]">
                      <h3 className={`text-2xl mb-2 text-[#003366] ${headingFont}`}>{masterArchitect?.name[lang]}</h3>
                      <div className="text-3xl font-bold text-slate-800 mb-6 font-mono">${masterArchitect?.price}+</div>
                      <p className={`text-slate text-sm mb-8 ${bodyFont}`}>{masterArchitect?.description?.[lang]}</p>
                      
                      <ul className="space-y-4 mb-8 flex-1 border-t border-slate/10 pt-6">
                          {masterArchitect?.features?.map((f, i) => (
                              <li key={i} className="flex gap-3 text-sm text-slate">
                                  <Check size={16} className="text-[#C5A065] mt-1 shrink-0" />
                                  <span>{f[lang]}</span>
                              </li>
                          ))}
                      </ul>
                      
                      <button 
                        onClick={() => handlePurchase(masterArchitect)}
                        className="w-full py-4 border border-slate-300 text-slate-600 font-bold uppercase tracking-widest text-xs hover:border-[#003366] hover:text-[#003366] transition-colors"
                      >
                          {isAr ? 'تقديم طلب توجيه' : 'Apply for 1:1 Coaching'}
                      </button>
                  </div>

              </div>
          </div>
      </section>

      {/* 6. STAGE 5: GUARANTEE & TRUST */}
      <section className="py-24 bg-[#003366] text-white">
          <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                  <div className="mb-8">
                      <Shield size={64} className="mx-auto text-[#C5A065] mb-6 opacity-80" strokeWidth={1} />
                      <h2 className={`text-3xl md:text-4xl mb-8 ${headingFont}`}>
                          {LANDING_CONTENT.guarantee.title[lang]}
                      </h2>
                      <p className={`text-lg md:text-2xl leading-relaxed italic opacity-90 mb-12 ${bodyFont}`}>
                          "{LANDING_CONTENT.guarantee.text[lang]}"
                      </p>
                  </div>
                  
                  <button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#C5A065] text-black px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors shadow-2xl mb-16"
                  >
                      {LANDING_CONTENT.guarantee.cta[lang]}
                  </button>

                  {/* Trust Bar */}
                  <div className="pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-12 text-xs uppercase tracking-widest opacity-60 font-mono">
                      <span className="flex items-center gap-2"><Lock size={14} /> Secure Checkout</span>
                      <span className="hidden md:inline">|</span>
                      <span className="flex items-center gap-2"><Layers size={14} /> Lifetime Access</span>
                      <span className="hidden md:inline">|</span>
                      <span className="flex items-center gap-2"><Users size={14} /> 2,300+ Builders Worldwide</span>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

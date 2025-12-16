
import React from 'react';
import { motion } from 'framer-motion';
import { Language, View, Product } from '../types';
import { Hero } from './Hero';
import { Assessment } from './Assessment';
import { PILLARS, LANDING_CONTENT, TIERS, PRODUCTS } from '../constants';
import { ArrowLeft, ArrowRight, Layers, Activity, Quote, QrCode, Plus, Check, Shield, AlertTriangle, Box, BookOpen, PenTool, Zap, Star } from './Icons';

interface LandingPageProps {
  lang: Language;
  setView: (view: View) => void;
  onCheckout?: (items: Product[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-serif';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';

  // Helper to map Tier ID to actual Product in catalog
  const handleTierSelect = (tierId: string) => {
      let product: Product | undefined;
      
      switch(tierId) {
          case 'essential':
              product = PRODUCTS.find(p => p.id === 'book_digital'); // Fallback to digital book
              break;
          case 'implementation':
              product = PRODUCTS.find(p => p.id === 'tier_implementation_product');
              break;
          case 'architect':
              product = PRODUCTS.find(p => p.id === 'tier_architect_product');
              break;
      }

      if (product && onCheckout) {
          onCheckout([product]);
      } else {
          // If no direct product, go to library/store view
          setView('library');
      }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-[#050505] text-alabaster"
    >
      {/* 1. HERO SECTION (The X-Ray Experience) */}
      <Hero lang={lang} setView={setView} />
      
      {/* 2. THE DIAGNOSIS (The Pain) */}
      <section className="py-24 bg-[#080808] border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Text Side */}
              <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-3 border border-red-900/30 bg-red-900/10 px-4 py-1 mb-6">
                      <AlertTriangle size={14} className="text-red-500" />
                      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-red-400 font-bold">
                          {LANDING_CONTENT.pain.title[lang]}
                      </span>
                  </div>
                  
                  <h2 className={`text-3xl md:text-5xl leading-tight mb-8 text-white ${headingFont}`}>
                      {isAr 
                       ? 'أنت لا تحتاج إلى "تطوير ذات". أنت تحتاج إلى "إعادة هيكلة".' 
                       : 'You don’t need "Self-Improvement". You need "Structural Repair".'}
                  </h2>
                  
                  <p className={`text-lg text-slate leading-relaxed mb-8 ${bodyFont}`}>
                      {LANDING_CONTENT.pain.text[lang]}
                  </p>

                  <div className="p-6 bg-[#111] border-l-4 border-bronze">
                      <p className={`italic text-white/80 ${headingFont}`}>
                          "{isAr 
                            ? 'معظم الناس يحاولون طلاء الجدران في منزل أساساته تنهار. النتيجة؟ يبدو جميلاً ليوم واحد، ثم تعود الشقوق.' 
                            : 'Most people try to paint the walls of a house with a collapsing foundation. The result? It looks nice for a day, then the cracks return.'}"
                      </p>
                  </div>
              </div>

              {/* Visual Side (The Collapse) */}
              <div className="order-1 lg:order-2 relative">
                  <div className="aspect-[4/5] bg-[#111] relative overflow-hidden border border-white/10 group">
                      <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                        alt="Structural Collapse" 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-20 transition-opacity duration-1000"
                      />
                      {/* Architectural Lines Overlay */}
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,0,0,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                              <span className="text-6xl font-bold text-red-600/20 font-mono block">ERROR</span>
                              <span className="text-xs text-red-500 uppercase tracking-[0.5em]">Load Capacity Exceeded</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. THE FRAMEWORK (The Solution - 4 Pillars) */}
      <section className="py-32 bg-[#050505] relative border-b border-white/10">
         <div className="container mx-auto px-6">
            <div className="text-center mb-20">
                <span className="text-bronze text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-4">
                    <Layers size={14} /> {isAr ? 'الحل الهندسي' : 'The Engineering Solution'}
                </span>
                <h2 className={`text-4xl md:text-6xl text-white ${headingFont} mb-6`}>
                    {isAr ? 'كود عمارة الإنسان' : 'The Human Architecture Code'}
                </h2>
                <p className={`text-slate max-w-2xl mx-auto ${bodyFont}`}>
                    {isAr 
                     ? 'كل حياة بشرية تستند على أربعة أعمدة حاملة. عندما يضعف أحدها، ينهار الهيكل بالكامل.' 
                     : 'Every human life rests on four load-bearing pillars. When one weakens, the entire structure collapses.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PILLARS.map((pillar, idx) => (
                    <div key={pillar.id} className="group relative border border-white/10 bg-[#0a0a0a] hover:border-bronze/50 transition-all duration-500 overflow-hidden h-[400px]">
                        <div className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity">
                            <img src={pillar.image} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent">
                            <span className="text-4xl font-serif text-white/10 font-bold absolute top-6 right-6">0{idx+1}</span>
                            <div className="w-8 h-1 bg-bronze mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{pillar.title[lang]}</h3>
                            <p className={`text-slate/70 text-sm ${bodyFont}`}>{pillar.description[lang]}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* 4. THE AUDIT (Interactive Tool Hook) */}
      <div id="assessment-section" className="relative z-10 border-t border-white/10">
        <Assessment lang={lang} setView={setView} />
      </div>

      {/* 5. THE OFFER (3 Tiers) - THE CORE SALES PART */}
      <section id="offer-stack" className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#000]">
          <div className="container mx-auto px-6">
              
              {/* Header */}
              <div className="text-center mb-20">
                  <span className="text-slate text-xs uppercase tracking-[0.3em] mb-4 block">
                      {LANDING_CONTENT.tiers.subtitle[lang]}
                  </span>
                  <h2 className={`text-4xl md:text-6xl text-white ${headingFont}`}>
                      {LANDING_CONTENT.tiers.title[lang]}
                  </h2>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                  
                  {TIERS.map((tier) => (
                      <div 
                        key={tier.id}
                        className={`relative p-8 md:p-10 border transition-all duration-300 flex flex-col
                            ${tier.isPopular 
                                ? 'bg-[#111] border-bronze shadow-[0_0_40px_rgba(197,160,101,0.15)] transform md:-translate-y-4 z-10' 
                                : 'bg-[#0a0a0a] border-white/10 hover:border-white/30'
                            }
                        `}
                      >
                          {/* Popular Badge */}
                          {tier.isPopular && (
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-bronze text-white text-[0.6rem] font-bold px-4 py-1 uppercase tracking-widest -translate-y-1/2">
                                  {isAr ? 'الخيار الموصى به' : 'Most Chosen'}
                              </div>
                          )}

                          {/* Header */}
                          <div className="mb-8 text-center">
                              <h3 className={`text-xl font-bold text-white mb-2 ${headingFont}`}>{tier.title[lang]}</h3>
                              <p className="text-xs text-slate uppercase tracking-widest mb-6">{tier.subtitle[lang]}</p>
                              <div className="text-4xl md:text-5xl font-mono text-white font-bold">
                                  ${tier.price}
                              </div>
                          </div>

                          {/* Description */}
                          <p className={`text-sm text-slate text-center mb-8 h-12 leading-relaxed ${bodyFont}`}>
                              {tier.description[lang]}
                          </p>

                          {/* CTA Button */}
                          <button 
                            onClick={() => handleTierSelect(tier.id)}
                            className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] mb-8 transition-colors
                                ${tier.isPopular 
                                    ? 'bg-bronze text-white hover:bg-white hover:text-charcoal' 
                                    : 'border border-white/20 text-white hover:border-bronze hover:text-bronze'
                                }
                            `}
                          >
                              {tier.cta[lang]}
                          </button>

                          {/* Features List */}
                          <div className="space-y-4 border-t border-white/5 pt-8">
                              {tier.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-start gap-3">
                                      <Check size={14} className={tier.isPopular ? 'text-bronze' : 'text-slate'} />
                                      <span className={`text-sm ${tier.isPopular ? 'text-white' : 'text-slate'} ${bodyFont}`}>
                                          {feature[lang]}
                                      </span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}

              </div>

              {/* Bottom Assurance */}
              <div className="text-center mt-20 opacity-60">
                  <div className="flex justify-center gap-8 text-slate mb-4">
                      <div className="flex items-center gap-2">
                          <Shield size={16} />
                          <span className="text-xs uppercase tracking-widest">{isAr ? 'دفع آمن' : 'Secure Checkout'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Box size={16} />
                          <span className="text-xs uppercase tracking-widest">{isAr ? 'ضمان 30 يوم' : '30-Day Guarantee'}</span>
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* 6. FINAL FINAL CTA (Minimalist) */}
      <section className="py-24 bg-white dark:bg-[#F2F0EB] text-[#050505] text-center">
          <div className="container mx-auto px-6">
              <h2 className={`text-3xl md:text-5xl mb-6 ${headingFont}`}>
                  {isAr 
                   ? 'أنت لا تحتاج لتغيير شخصيتك. أنت تحتاج لهيكل يحملها.' 
                   : 'You don’t need to change who you are. You need a structure that can hold who you’re becoming.'}
              </h2>
              <button 
                onClick={() => document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-bronze pb-1 hover:text-bronze transition-colors"
              >
                  {isAr ? 'ابدأ الفحص الآن' : 'Begin The Audit Now'}
              </button>
          </div>
      </section>

    </motion.div>
  );
};

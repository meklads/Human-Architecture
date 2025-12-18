
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Layers, PenTool, Activity, Check, Shield, Lock, Play, ArrowRight, Star, AlertTriangle, Zap, Target, Users, BookOpen, ShoppingBag, Box } from './Icons';
import { Magnetic } from './Magnetic';

interface LibraryPageProps {
  lang: Language;
  onCheckout?: (items: Product[]) => void;
}

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

  // --- SUB-COMPONENTS FOR THE FUNNEL ---

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
      
      {/* =====================================================================================
          1. HERO SECTION: THE GRAND SLAM HOOK
      ===================================================================================== */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 border-b border-white/5 overflow-hidden">
         <div className="absolute inset-0 pointer-events-none architectural-grid opacity-[0.05]" style={{ backgroundSize: '40px 40px' }}></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-bronze/5 rounded-full blur-[150px] pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
             <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-block border border-bronze/30 px-6 py-2 mb-8 bg-bronze/10 rounded-full backdrop-blur-md"
             >
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bronze font-bold flex items-center gap-2">
                    <AlertTriangle size={14} /> 
                    {isAr ? 'تحذير: هذا ليس كتاب تطوير ذات تقليدي' : 'WARNING: NOT TRADITIONAL SELF-HELP'}
                </span>
             </motion.div>

             <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className={`text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 ${headingFont} text-white font-bold tracking-tight`}
             >
                 {isAr ? 'توقف عن ترميم الشقوق.' : 'Stop Fixing Cracks.'} <br/>
                 <span className="text-bronze">{isAr ? 'أعد صب الأساسات.' : 'Re-Pour The Foundation.'}</span>
             </motion.h1>

             <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className={`text-xl md:text-2xl leading-relaxed text-slate mb-12 max-w-3xl mx-auto ${bodyFont}`}
             >
                 {isAr 
                  ? 'النظام الهندسي الوحيد الذي يعيد هيكلة عقلك، جسدك، وروحك في 58 يوماً باستخدام بروتوكولات العمارة البشرية، وليس التنمية البشرية.'
                  : 'The only engineering-grade system to restructure your mind, body, and soul in 58 days using Human Architecture protocols, not self-help motivation.'}
             </motion.p>

             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                className="relative w-full max-w-4xl mx-auto aspect-video bg-[#111] border-2 border-bronze/20 shadow-[0_0_50px_rgba(197,160,101,0.1)] rounded-lg overflow-hidden group cursor-pointer mb-12"
             >
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-bronze/90 rounded-full flex items-center justify-center pl-2 shadow-2xl group-hover:scale-110 transition-transform">
                     <Play size={40} fill="white" className="text-white" />
                 </div>
                 <div className="absolute bottom-8 left-8 text-left">
                     <span className="text-white font-bold text-lg block mb-1">{isAr ? 'شاهد: كيف يعمل نظام "عمارة الإنسان"' : 'WATCH: How The Architecture System Works'}</span>
                     <span className="text-bronze text-sm font-mono uppercase tracking-widest">{isAr ? 'المدة: 03:45' : 'Duration: 03:45'}</span>
                 </div>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
             >
                <button 
                    onClick={() => document.getElementById('offer-stack')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-bronze text-white px-12 py-6 text-lg uppercase tracking-[0.1em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(197,160,101,0.4)] rounded-sm flex items-center gap-4 mx-auto animate-pulse"
                >
                    {isAr ? 'نعم، أريد إعادة بناء حياتي الآن' : 'YES! I WANT TO REBUILD MY LIFE NOW'} <ArrowRight size={20} />
                </button>
                <p className="mt-4 text-xs text-slate/50 uppercase tracking-widest">
                    {isAr ? 'ضمان استرجاع الأموال لمدة 30 يوماً' : '30-Day 100% Money Back Guarantee'}
                </p>
             </motion.div>
         </div>
      </section>

      {/* =====================================================================================
          2. THE PROBLEM (The Diagnosis)
      ===================================================================================== */}
      <section className="py-32 bg-[#080808] border-b border-white/5">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-bronze"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-bronze"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1597113366853-fea190b6cd82?q=80&w=2070&auto=format&fit=crop" 
                    alt="Cracked Foundation" 
                    className="w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent"></div>
              </div>
              <div className="order-1 lg:order-2">
                  <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4 block flex items-center gap-2">
                      <AlertTriangle size={16} /> {isAr ? 'لماذا تفشل؟' : 'THE DIAGNOSIS'}
                  </span>
                  <h2 className={`text-4xl md:text-5xl text-white mb-8 ${headingFont}`}>
                      {isAr ? 'أنت تحاول "تزيين" مبنى ينهار.' : 'You Are Decorating a Collapsing Building.'}
                  </h2>
                  <p className={`text-slate text-lg leading-relaxed mb-6 ${bodyFont}`}>
                      {isAr 
                       ? 'التفكير الإيجابي، التوكيدات، وتنظيم الوقت... كلها مثل طلاء الجدران أو تغيير الستائر في منزل أساساته متآكلة. تبدو جميلة ليوم واحد، ثم تعود الشقوق للظهور.'
                       : 'Positive thinking, affirmations, and time management hacks are like painting the walls of a house with a rotting foundation. It looks good for a day, but the cracks always come back.'}
                  </p>
                  
                  <div className="p-6 bg-red-900/10 border-l-4 border-red-900">
                      <p className="text-red-200 italic">
                          "{isAr ? 'إذا لم تصلح الأساس، فكل ما تبنيه فوقه سيزيد من سرعة الانهيار.' : 'If you do not fix the foundation, everything you build on top only accelerates the collapse.'}"
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* =====================================================================================
          3. THE SOLUTION (The 3-Part System)
      ===================================================================================== */}
      <section id="system" className="py-32 bg-[#050505]">
          <div className="container mx-auto px-6">
              <SectionHeader 
                title={isAr ? 'نظام إعادة البناء المتكامل' : 'The Complete Rebuild System'}
                subtitle={isAr ? 'الحل الهندسي' : 'THE ARCHITECTURAL SOLUTION'}
              />

              {/* STEP 1: THE BLUEPRINT (BOOK) */}
              <div className="flex flex-col lg:flex-row gap-12 items-center mb-24 border border-white/5 p-8 md:p-12 bg-[#0a0a0a] relative overflow-hidden group hover:border-bronze/30 transition-colors">
                  <div className="absolute top-0 right-0 bg-bronze text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
                      {isAr ? 'الخطوة 1: النظرية' : 'STEP 1: THE THEORY'}
                  </div>
                  <div className="w-full lg:w-1/3 flex justify-center">
                      <div className="w-48 h-64 bg-[#151515] border-2 border-white/10 flex items-center justify-center shadow-2xl rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                          <Layers size={64} className="text-bronze" />
                          <span className="absolute bottom-4 text-xs tracking-widest text-slate">BOOK</span>
                      </div>
                  </div>
                  <div className="w-full lg:w-2/3">
                      <h3 className={`text-3xl text-white mb-2 ${headingFont}`}>{isAr ? 'الكتاب: المخطط الأصلي' : 'The Book: The Master Blueprint'}</h3>
                      <div className="flex gap-4 mb-4 text-xs font-mono uppercase tracking-widest text-slate/60">
                          <span className="border border-slate/20 px-2 py-1">{isAr ? 'متاح ديجيتال' : 'Digital Available'}</span>
                          <span className="border border-slate/20 px-2 py-1">{isAr ? 'متاح مطبوع' : 'Print Available'}</span>
                      </div>
                      <p className={`text-slate mb-6 ${bodyFont}`}>
                          {isAr 
                           ? 'ليس مجرد كتاب للقراءة، بل هو "دليل تشغيل" لنفسك. ستفهم فيزياء الانهيار، وقوانين الأحمال النفسية، وكيف ترسم خريطة "الشمال الحقيقي" الخاصة بك.' 
                           : 'Not just a book to read, but an "Owner\'s Manual" for your self. Understand the physics of collapse, laws of psychological load-bearing, and how to map your True North.'}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <BenefitBullet text={isAr ? 'فهم الأعمدة الأربعة (عقل، جسد، روح، علاقات)' : 'Decode the 4 Pillars (Mind, Body, Spirit, Social)'} />
                          <BenefitBullet text={isAr ? 'تحليل ميكانيكا الانهيار النفسي' : 'Analyze mechanics of psychological collapse'} />
                      </ul>
                  </div>
              </div>

              {/* STEP 2: THE WORKBOOK (28 DAYS) */}
              <div className="flex flex-col lg:flex-row gap-12 items-center mb-24 border border-white/5 p-8 md:p-12 bg-[#0a0a0a] relative overflow-hidden group hover:border-bronze/30 transition-colors">
                  <div className="absolute top-0 right-0 bg-bronze text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
                      {isAr ? 'الخطوة 2: التطبيق' : 'STEP 2: THE PRACTICE'}
                  </div>
                  <div className="w-full lg:w-1/3 flex justify-center order-1 lg:order-2">
                      <div className="w-48 h-64 bg-[#151515] border-2 border-white/10 flex items-center justify-center shadow-2xl rotate-[5deg] group-hover:rotate-0 transition-transform duration-500">
                          <PenTool size={64} className="text-white" />
                          <span className="absolute bottom-4 text-xs tracking-widest text-slate">WORKBOOK</span>
                      </div>
                  </div>
                  <div className="w-full lg:w-2/3 order-2 lg:order-1">
                      <h3 className={`text-3xl text-white mb-2 ${headingFont}`}>{isAr ? 'الوورك بوك: 28 يوماً من الحفر' : 'The Workbook: 28 Days of Excavation'}</h3>
                      <div className="flex gap-4 mb-4 text-xs font-mono uppercase tracking-widest">
                          <span className="bg-green-900/30 text-green-400 border border-green-700 px-2 py-1">{isAr ? 'ديجيتال: مجاناً' : 'Digital: FREE'}</span>
                          <span className="text-slate/60 border border-slate/20 px-2 py-1">{isAr ? 'مطبوع: متوفر' : 'Print: Available'}</span>
                      </div>
                      <p className={`text-slate mb-6 ${bodyFont}`}>
                          {isAr 
                           ? 'المعرفة بلا تطبيق مجرد معلومات. هذا الوورك بوك يحتوي على 28 تمرين عملي لهدم المعتقدات القديمة وصب القواعد الجديدة.' 
                           : 'Knowledge without action is data. This workbook contains 28 practical drills to demolish old beliefs and pour new concrete foundations.'}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <BenefitBullet text={isAr ? 'تمارين يومية صباحية ومسائية' : 'Daily AM/PM Structural Drills'} />
                          <BenefitBullet text={isAr ? 'سجلات تتبع العادات والهدم' : 'Habit Tracking & Demolition Logs'} />
                      </ul>
                  </div>
              </div>

              {/* STEP 3: THE INTERACTIVE SYSTEM (THE CORE) */}
              <div className="flex flex-col lg:flex-row gap-12 items-center mb-24 border-2 border-bronze p-8 md:p-12 bg-[#0f0f0f] relative overflow-hidden group shadow-[0_0_60px_rgba(197,160,101,0.15)]">
                  <div className="absolute top-0 right-0 bg-bronze text-white text-xs font-bold px-4 py-2 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} fill="currentColor" />
                      {isAr ? 'الخطوة 3: النظام الهجين (الأقوى)' : 'STEP 3: THE HYBRID SYSTEM (CORE)'}
                  </div>
                  <div className="w-full lg:w-1/3 flex justify-center">
                      <div className="relative w-64 h-40 bg-[#151515] border-2 border-bronze rounded-lg flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                          <Activity size={48} className="text-bronze animate-pulse" />
                          <div className="absolute inset-0 bg-bronze/5 animate-scan"></div>
                          <span className="absolute bottom-2 text-[0.5rem] tracking-[0.3em] text-bronze uppercase">Hybrid: Print + Digital</span>
                      </div>
                  </div>
                  <div className="w-full lg:w-2/3">
                      <h3 className={`text-3xl text-white mb-4 ${headingFont}`}>{isAr ? 'النظام المتكامل (30 يوماً)' : 'The 30-Day Hybrid System'}</h3>
                      <p className={`text-slate mb-6 ${bodyFont}`}>
                          {isAr 
                           ? 'أقوى ما في المنصة. ستحصل على الكتاب المطبوع + الكتاب الرقمي + تفعيل البرنامج التفاعلي (Dashboard) لمدة 30 يوماً لتتبع تقدمك مع النقابة.' 
                           : 'The core of the platform. You get the Printed Book + Digital Book + 30-Day Interactive Dashboard Access to track progress with The Guild.'}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <BenefitBullet text={isAr ? 'كتاب مطبوع + نسخة رقمية' : 'Physical Book + Digital Copy'} />
                          <BenefitBullet text={isAr ? 'لوحة تحكم (Dashboard) لتتبع التقدم' : 'Interactive Dashboard Access'} />
                          <BenefitBullet text={isAr ? 'مجتمع خاص (The Guild) للمراجعة' : 'Private Community (The Guild) Access'} />
                          <BenefitBullet text={isAr ? 'نظام أوسمة ورتب هندسية' : 'Gamified Rank & Badge System'} />
                      </ul>
                  </div>
              </div>

          </div>
      </section>

      {/* =====================================================================================
          4. THE OFFER STACK (THE BUNDLE)
      ===================================================================================== */}
      <section id="offer-stack" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#000]">
          <div className="container mx-auto px-6 max-w-4xl">
              
              <div className="border-4 border-bronze bg-[#111] p-8 md:p-16 relative shadow-2xl">
                  {/* Absolute Badge */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-3 uppercase tracking-widest font-bold text-lg shadow-lg rotate-[-2deg] border-2 border-white">
                      {isAr ? 'حزمة الترسانة الكاملة' : 'THE COMPLETE ARSENAL'}
                  </div>

                  <h2 className={`text-4xl md:text-5xl text-center text-white mb-12 ${headingFont}`}>
                      {isAr ? 'إليك ما ستحصل عليه:' : 'Here Is What You Get:'}
                  </h2>

                  {/* The List */}
                  <div className="space-y-6 mb-12">
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <div className="flex items-center gap-4">
                              <BookOpen className="text-bronze shrink-0" />
                              <div>
                                  <span className={`text-xl md:text-2xl text-white block ${headingFont}`}>{isAr ? 'كتاب "المخطط" (مطبوع + PDF)' : 'The Blueprint Book (Print + PDF)'}</span>
                                  <span className="text-xs text-slate">{isAr ? 'شحن لباب البيت' : 'Shipped to your door'}</span>
                              </div>
                          </div>
                          <span className="text-slate line-through decoration-red-500 font-mono text-lg">$49</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <div className="flex items-center gap-4">
                              <PenTool className="text-bronze shrink-0" />
                              <div>
                                  <span className={`text-xl md:text-2xl text-white block ${headingFont}`}>{isAr ? 'الوورك بوك 28 يوماً (PDF)' : '28-Day Workbook (PDF)'}</span>
                                  <span className="text-xs text-slate">{isAr ? 'هدية مع الباقة' : 'Free Bonus'}</span>
                              </div>
                          </div>
                          <span className="text-slate line-through decoration-red-500 font-mono text-lg">$27</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <div className="flex items-center gap-4">
                              <Activity className="text-bronze shrink-0" />
                              <div>
                                  <span className={`text-xl md:text-2xl text-white block ${headingFont}`}>{isAr ? 'نظام الـ 30 يوم الهجين' : '30-Day Hybrid System'}</span>
                                  <span className="text-xs text-slate">{isAr ? 'كتاب + داشبورد' : 'Book + Dashboard'}</span>
                              </div>
                          </div>
                          <span className="text-slate line-through decoration-red-500 font-mono text-lg">$297</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <div className="flex items-center gap-4">
                              <Users className="text-bronze shrink-0" />
                              <span className={`text-xl md:text-2xl text-white ${headingFont}`}>{isAr ? 'عضوية النقابة (مدى الحياة)' : 'Lifetime Guild Access'}</span>
                          </div>
                          <span className="text-slate line-through decoration-red-500 font-mono text-lg">$197</span>
                      </div>
                  </div>

                  {/* Total Value vs Price */}
                  <div className="text-center">
                      <div className="text-slate uppercase tracking-widest text-sm mb-2">{isAr ? 'القيمة الإجمالية' : 'TOTAL VALUE'}</div>
                      <div className="text-4xl text-slate line-through decoration-red-600 decoration-4 font-mono opacity-50 mb-6">$570</div>
                      
                      <div className="text-bronze uppercase tracking-widest text-lg font-bold mb-2 animate-pulse">{isAr ? 'استثمار المهندس' : 'ARCHITECT INVESTMENT'}</div>
                      <div className="text-7xl md:text-8xl text-white font-bold font-mono mb-8">$397</div>

                      <button 
                        onClick={() => handlePurchase(completeRebuild)}
                        className="w-full py-6 bg-bronze text-white text-xl md:text-2xl uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(197,160,101,0.5)] rounded-sm flex items-center justify-center gap-4"
                      >
                          {isAr ? 'استلام العدة الكاملة الآن' : 'ACQUIRE FULL TOOLKIT'} <ArrowRight size={24} strokeWidth={3} />
                      </button>
                      <p className="mt-4 text-xs text-slate uppercase tracking-widest">
                          {isAr ? 'وصول فوري للديجيتال - شحن للكتاب - ضمان 30 يوم' : 'Instant Digital Access - Book Shipping - 30 Day Guarantee'}
                      </p>
                  </div>
              </div>

          </div>
      </section>

      {/* =====================================================================================
          5. A LA CARTE (Individual Items) - NEW SECTION
      ===================================================================================== */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <span className="text-slate text-xs uppercase tracking-[0.3em] font-bold mb-4 block flex items-center justify-center gap-2">
                      <ShoppingBag size={14} /> {isAr ? 'مخططات فردية' : 'INDIVIDUAL SCHEMATICS'}
                  </span>
                  <h3 className={`text-3xl text-white ${headingFont}`}>{isAr ? 'مخزن المواد الفردية' : 'Material Depot'}</h3>
                  <p className="text-slate mt-2 text-sm">{isAr ? 'احصل على ما تحتاجه فقط من أدوات.' : 'Acquire only the specific tools you require.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  
                  {/* Item 1: Blueprint Digital */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col hover:border-bronze/50 transition-colors group">
                      <div className="h-40 bg-[#050505] flex items-center justify-center mb-4 relative overflow-hidden">
                          <BookOpen size={48} className="text-slate group-hover:text-white transition-colors" />
                          <div className="absolute top-2 right-2 bg-slate/20 text-slate text-[0.6rem] px-2 py-1 uppercase font-bold">Digital</div>
                      </div>
                      <h4 className={`text-lg text-white mb-1 ${headingFont}`}>{bookDigital?.name[lang]}</h4>
                      <p className="text-xs text-slate mb-4 flex-1">{bookDigital?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                          <span className="text-white font-mono font-bold">${bookDigital?.price}</span>
                          <button onClick={() => handlePurchase(bookDigital)} className="text-xs uppercase tracking-widest text-bronze hover:text-white">{isAr ? 'إضافة للعدة' : 'Add to Kit'}</button>
                      </div>
                  </div>

                  {/* Item 2: Blueprint Print */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col hover:border-bronze/50 transition-colors group">
                      <div className="h-40 bg-[#050505] flex items-center justify-center mb-4 relative overflow-hidden">
                          <Box size={48} className="text-bronze group-hover:text-white transition-colors" />
                          <div className="absolute top-2 right-2 bg-bronze/20 text-bronze text-[0.6rem] px-2 py-1 uppercase font-bold">Print</div>
                      </div>
                      <h4 className={`text-lg text-white mb-1 ${headingFont}`}>{bookPrint?.name[lang]}</h4>
                      <p className="text-xs text-slate mb-4 flex-1">{bookPrint?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                          <span className="text-white font-mono font-bold">${bookPrint?.price}</span>
                          <button onClick={() => handlePurchase(bookPrint)} className="text-xs uppercase tracking-widest text-bronze hover:text-white">{isAr ? 'إضافة للعدة' : 'Add to Kit'}</button>
                      </div>
                  </div>

                  {/* Item 3: Workbook Print */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col hover:border-bronze/50 transition-colors group">
                      <div className="h-40 bg-[#050505] flex items-center justify-center mb-4 relative overflow-hidden">
                          <PenTool size={48} className="text-bronze group-hover:text-white transition-colors" />
                          <div className="absolute top-2 right-2 bg-bronze/20 text-bronze text-[0.6rem] px-2 py-1 uppercase font-bold">Print</div>
                      </div>
                      <h4 className={`text-lg text-white mb-1 ${headingFont}`}>{workbookPrint?.name[lang]}</h4>
                      <p className="text-xs text-slate mb-4 flex-1">{workbookPrint?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                          <span className="text-white font-mono font-bold">${workbookPrint?.price}</span>
                          <button onClick={() => handlePurchase(workbookPrint)} className="text-xs uppercase tracking-widest text-bronze hover:text-white">{isAr ? 'إضافة للعدة' : 'Add to Kit'}</button>
                      </div>
                  </div>

                  {/* Item 4: System Hybrid */}
                  <div className="bg-[#151515] border border-bronze/30 p-6 flex flex-col hover:border-bronze transition-colors group relative">
                      <div className="absolute -top-3 -right-3 bg-bronze text-white text-[0.6rem] px-2 py-1 font-bold">CORE</div>
                      <div className="h-40 bg-[#050505] flex items-center justify-center mb-4 relative overflow-hidden">
                          <Activity size={48} className="text-bronze group-hover:text-white transition-colors" />
                          <div className="absolute top-2 left-2 bg-blue-900/50 text-blue-300 text-[0.6rem] px-2 py-1 uppercase font-bold">Hybrid</div>
                      </div>
                      <h4 className={`text-lg text-white mb-1 ${headingFont}`}>{systemHybrid?.name[lang]}</h4>
                      <p className="text-xs text-slate mb-4 flex-1">{systemHybrid?.description?.[lang]}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                          <span className="text-white font-mono font-bold">${systemHybrid?.price}</span>
                          <button onClick={() => handlePurchase(systemHybrid)} className="text-xs uppercase tracking-widest text-bronze hover:text-white">{isAr ? 'إضافة للعدة' : 'Add to Kit'}</button>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* =====================================================================================
          6. SOCIAL PROOF (Testimonials)
      ===================================================================================== */}
      <section className="py-24 bg-[#050505]">
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

      {/* =====================================================================================
          7. GUARANTEE & FINAL CTA
      ===================================================================================== */}
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
                  {/* Logos placeholder */}
                  <span className="font-serif font-bold text-xl">VISA</span>
                  <span className="font-serif font-bold text-xl">Mastercard</span>
                  <span className="font-serif font-bold text-xl">PayPal</span>
              </div>
          </div>
      </section>

    </div>
  );
};

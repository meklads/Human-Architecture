
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, Product } from '../types';
import { PRODUCTS, LANDING_CONTENT, ABOUT_CONTENT } from '../constants';
import { Layers, PenTool, Activity, Check, Shield, Lock, Play, ArrowRight, Star, AlertTriangle, Zap, Target, Users, BookOpen, ShoppingBag, Box, Compass, HelpCircle, ChevronDown, Hammer, Anchor } from './Icons';
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
  const completeRebuild = PRODUCTS.find(p => p.id === 'bundle_master') || PRODUCTS[0]; // Fallback
  
  // Individual items for "A La Carte"
  const bookDigital = PRODUCTS.find(p => p.id === 'book_digital');
  const bookPrint = PRODUCTS.find(p => p.id === 'book_print');
  const workbookPrint = PRODUCTS.find(p => p.id === 'workbook_print');
  const systemHybrid = PRODUCTS.find(p => p.id === 'tier_architect_product');

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

  const FaqItem = ({ q, a }: { q: string, a: string }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
          <div className="border-b border-white/10">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-start focus:outline-none group"
              >
                  <span className={`text-lg text-slate-200 group-hover:text-bronze transition-colors ${headingFont}`}>{q}</span>
                  <ChevronDown size={20} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                  <p className={`text-slate/70 ${bodyFont}`}>{a}</p>
              </div>
          </div>
      )
  };

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
                className="flex flex-col sm:flex-row justify-center gap-6"
             >
                <button 
                    onClick={() => document.getElementById('offer-stack')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-bronze text-white px-8 md:px-12 py-5 text-sm md:text-lg uppercase tracking-[0.1em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(197,160,101,0.4)] rounded-sm flex items-center justify-center gap-4 animate-pulse"
                >
                    {isAr ? 'نعم، أعد بناء حياتي' : 'YES! REBUILD MY LIFE'} <ArrowRight size={20} />
                </button>
                <button 
                    onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 md:px-12 py-5 border border-white/20 text-slate hover:text-white hover:border-white transition-all text-sm md:text-lg uppercase tracking-[0.1em] font-bold rounded-sm flex items-center justify-center gap-2"
                >
                    <Layers size={18} />
                    {isAr ? 'كيف يعمل النظام؟' : 'See The Protocol'}
                </button>
             </motion.div>
             <p className="mt-6 text-xs text-slate/50 uppercase tracking-widest">
                {isAr ? 'ضمان استرجاع الأموال لمدة 30 يوماً' : '30-Day 100% Money Back Guarantee'}
            </p>
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
          3. HOW IT WORKS (The Protocol) - NEW SECTION FOR CLARITY
      ===================================================================================== */}
      <section id="methodology" className="py-32 bg-[#050505] relative overflow-hidden">
          {/* Schematic Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="container mx-auto px-6">
              <SectionHeader 
                title={isAr ? 'المنهجية الهندسية' : 'The Engineering Protocol'}
                subtitle={isAr ? 'كيف يعمل؟' : 'HOW IT WORKS'}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-white/10 z-0"></div>

                  {/* Phase 1 */}
                  <div className="bg-[#111] p-8 border border-white/10 relative z-10 hover:border-bronze transition-colors group">
                      <div className="w-24 h-24 bg-[#050505] border-2 border-slate-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:border-bronze transition-colors relative">
                          <Hammer size={32} className="text-slate-500 group-hover:text-bronze" />
                          <div className="absolute -top-3 bg-[#050505] px-2 text-xs font-mono text-slate-500">PHASE 01</div>
                      </div>
                      <h3 className={`text-2xl text-white text-center mb-4 ${headingFont}`}>{isAr ? 'الحفر والهدم' : 'Excavation & Demolition'}</h3>
                      <p className={`text-slate text-center text-sm leading-relaxed ${bodyFont}`}>
                          {isAr 
                           ? 'قبل البناء، يجب إزالة الأنقاض. نتخلص من المعتقدات المعيقة وعادات الهروب باستخدام تمارين "التفكيك النفسي".' 
                           : 'Before building, we must clear the rubble. We remove limiting beliefs and escapist habits using "Psych-Deconstruction" drills.'}
                      </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="bg-[#111] p-8 border border-white/10 relative z-10 hover:border-bronze transition-colors group">
                      <div className="w-24 h-24 bg-[#050505] border-2 border-slate-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:border-bronze transition-colors relative">
                          <Anchor size={32} className="text-slate-500 group-hover:text-bronze" />
                          <div className="absolute -top-3 bg-[#050505] px-2 text-xs font-mono text-slate-500">PHASE 02</div>
                      </div>
                      <h3 className={`text-2xl text-white text-center mb-4 ${headingFont}`}>{isAr ? 'صب الأساسات' : 'Pouring The Foundation'}</h3>
                      <p className={`text-slate text-center text-sm leading-relaxed ${bodyFont}`}>
                          {isAr 
                           ? 'تطبيق بروتوكولات النوم، التغذية، والروتين الصباحي الصارم. الجسد هو الأرضية التي يحمل عليها العقل.' 
                           : 'Implementing strict sleep, nutrition, and morning protocols. The body is the bedrock upon which the mind sits.'}
                      </p>
                  </div>

                  {/* Phase 3 */}
                  <div className="bg-[#111] p-8 border border-white/10 relative z-10 hover:border-bronze transition-colors group">
                      <div className="w-24 h-24 bg-[#050505] border-2 border-slate-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:border-bronze transition-colors relative">
                          <Compass size={32} className="text-slate-500 group-hover:text-bronze" />
                          <div className="absolute -top-3 bg-[#050505] px-2 text-xs font-mono text-slate-500">PHASE 03</div>
                      </div>
                      <h3 className={`text-2xl text-white text-center mb-4 ${headingFont}`}>{isAr ? 'رفع الهيكل' : 'Structural Elevation'}</h3>
                      <p className={`text-slate text-center text-sm leading-relaxed ${bodyFont}`}>
                          {isAr 
                           ? 'الآن فقط نبدأ في بناء الأهداف والطموحات. مع أساس متين، يمكنك بناء ناطحة سحاب دون خوف من الانهيار.' 
                           : 'Only now do we build goals. With a solid foundation, you can erect a skyscraper without fear of collapse.'}
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* =====================================================================================
          4. THE ARCHITECT (Credibility) - NEW SECTION
      ===================================================================================== */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="w-full lg:w-1/2">
                      <div className="relative aspect-square max-w-md mx-auto border-8 border-double border-white/5 shadow-2xl">
                          <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                            alt="The Architect" 
                            className="w-full h-full object-cover grayscale contrast-125"
                          />
                          <div className="absolute bottom-0 left-0 bg-bronze text-white px-6 py-2 text-xs font-bold uppercase tracking-widest">
                              {ABOUT_CONTENT.name[lang]}
                          </div>
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                      <span className="text-bronze text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
                          {isAr ? 'عن المؤسس' : 'THE ARCHITECT'}
                      </span>
                      <h2 className={`text-4xl text-white mb-6 ${headingFont}`}>
                          {isAr ? 'لماذا تثق بمعماري لبناء ذاتك؟' : 'Why trust an Architect with your Psychology?'}
                      </h2>
                      <p className={`text-slate text-lg leading-relaxed mb-6 ${bodyFont}`}>
                          {isAr 
                           ? 'لأن النفس البشرية ليست غيمة عشوائية، بل هي "بنية" لها قواعد وقوانين وقدرة تحمل. قضيت حياتي المهنية في دمج صرامة الهندسة المعمارية مع علوم النفس.'
                           : 'Because the human self is not a random cloud; it is a "structure" with laws, loads, and breaking points. I spent my career merging the rigor of Architecture with Psychology.'}
                      </p>
                      <p className={`text-slate text-lg leading-relaxed mb-8 ${bodyFont}`}>
                          {isAr
                           ? 'أنا لا أقدم لك كلمات لطيفة لتشعر بتحسن، بل أقدم لك "مخططات تنفيذية" لتعمل بشكل أفضل.'
                           : 'I do not offer you nice words to make you feel better. I offer you "Execution Blueprints" to make you function better.'}
                      </p>
                      <div className="flex gap-4">
                          <div className="border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate/60">
                              Founder of Graphics House
                          </div>
                          <div className="border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate/60">
                              Systems Engineer
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* =====================================================================================
          5. SOCIAL PROOF ("FIELD REPORTS") - UPGRADED
      ===================================================================================== */}
      <section className="py-24 bg-[#050505]">
          <div className="container mx-auto px-6">
              <SectionHeader title={isAr ? 'تقارير ميدانية' : 'Field Reports'} subtitle={isAr ? 'من موقع العمل' : 'FROM THE SITE'} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { 
                          name: "Sarah Jenkins", 
                          role: "CEO, TechStart", 
                          text: "I thought I needed a vacation. I discovered I needed to redesign my day. The Architect System changed the rules completely. My stress capacity doubled in 30 days.",
                          status: "Restored" 
                      },
                      { 
                          name: "Ahmed Kamal", 
                          role: "Senior Surgeon", 
                          text: "In medicine, we follow protocols. This is the first time I've seen a protocol for life. No fluff, just pure structural logic. It saved my marriage.",
                          status: "Stable" 
                      },
                      { 
                          name: "Liam O'Connor", 
                          role: "Creative Director", 
                          text: "I was creative but chaotic. The 'Chaos Under Construction' concept resonated with me. Now, my creativity has a frame to hold it. Highly recommended.",
                          status: "Optimized" 
                      }
                  ].map((review, i) => (
                      <div key={i} className="bg-[#111] p-8 border border-white/10 hover:border-bronze/30 transition-colors relative">
                          <div className="absolute top-4 right-4 opacity-10">
                              <Shield size={40} />
                          </div>
                          <div className="flex gap-1 text-bronze mb-4">
                              {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={14} />)}
                          </div>
                          <p className={`text-slate mb-6 leading-relaxed ${bodyFont} text-sm`}>
                              "{review.text}"
                          </p>
                          <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                  {review.name.charAt(0)}
                              </div>
                              <div>
                                  <div className="text-white font-bold text-sm">{review.name}</div>
                                  <div className="text-slate/50 text-xs uppercase">{review.role}</div>
                              </div>
                              <div className="ml-auto px-2 py-1 bg-green-900/20 text-green-500 text-[0.6rem] uppercase tracking-widest border border-green-900/50">
                                  {review.status}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* =====================================================================================
          6. THE SYSTEM (Offer Details)
      ===================================================================================== */}
      <section id="system" className="py-32 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
              <SectionHeader 
                title={isAr ? 'اختر مستوى البناء' : 'Choose Your Build Level'}
                subtitle={isAr ? 'الأدوات المتاحة' : 'AVAILABLE TOOLS'}
              />

              {/* STEP 1: THE BLUEPRINT (BOOK) */}
              <div className="flex flex-col lg:flex-row gap-12 items-center mb-12 border border-white/5 p-8 md:p-12 bg-[#050505] relative overflow-hidden group hover:border-bronze/30 transition-colors">
                  <div className="w-full lg:w-2/3 order-2 lg:order-1">
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
                      <button onClick={() => handlePurchase(bookDigital)} className="text-bronze underline text-sm uppercase tracking-widest font-bold hover:text-white transition-colors">
                          {isAr ? 'شراء الكتاب فقط ($29)' : 'Buy Book Only ($29)'}
                      </button>
                  </div>
                  <div className="w-full lg:w-1/3 flex justify-center order-1 lg:order-2">
                      <BookOpen size={80} className="text-white/20 group-hover:text-bronze transition-colors" strokeWidth={1} />
                  </div>
              </div>

              {/* STEP 3: THE INTERACTIVE SYSTEM (THE CORE) */}
              <div className="flex flex-col lg:flex-row gap-12 items-center mb-24 border-2 border-bronze p-8 md:p-12 bg-[#0f0f0f] relative overflow-hidden group shadow-[0_0_60px_rgba(197,160,101,0.15)]">
                  <div className="absolute top-0 right-0 bg-bronze text-white text-xs font-bold px-4 py-2 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} fill="currentColor" />
                      {isAr ? 'النظام المتكامل' : 'THE COMPLETE SYSTEM'}
                  </div>
                  <div className="w-full lg:w-1/3 flex justify-center">
                      <div className="relative w-64 h-40 bg-[#151515] border-2 border-bronze rounded-lg flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                          <Activity size={48} className="text-bronze animate-pulse" />
                          <div className="absolute inset-0 bg-bronze/5 animate-scan"></div>
                          <span className="absolute bottom-2 text-[0.5rem] tracking-[0.3em] text-bronze uppercase">Dashboard Access</span>
                      </div>
                  </div>
                  <div className="w-full lg:w-2/3">
                      <h3 className={`text-3xl text-white mb-4 ${headingFont}`}>{isAr ? 'نظام الـ 30 يوماً (باقة المعماري)' : 'The 30-Day Architect System'}</h3>
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
          7. THE OFFER STACK (THE BUNDLE)
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
          8. FAQ SECTION - NEW SECTION
      ===================================================================================== */}
      <section className="py-24 bg-[#080808] border-t border-white/5">
          <div className="container mx-auto px-6 max-w-3xl">
              <div className="text-center mb-16">
                  <HelpCircle size={40} className="mx-auto text-slate-600 mb-4" />
                  <h3 className={`text-3xl text-white ${headingFont}`}>{isAr ? 'أسئلة إنشائية (FAQ)' : 'Structural Queries'}</h3>
              </div>
              <div className="space-y-2">
                  <FaqItem 
                    q={isAr ? "هل هذا الكتاب بديل للعلاج النفسي؟" : "Is this book a replacement for therapy?"}
                    a={isAr ? "لا. هذا نظام لبناء 'الهيكل' (Structure) لزيادة قدرة التحمل. إذا كان لديك 'كسور' حادة (Trauma)، ننصح بالمساعدة المختصة. نحن نبني ناطحات سحاب، لا نعالج الجرحى." : "No. This is a system for building 'Structure' to increase load capacity. If you have acute Trauma, seek professional help. We build skyscrapers; we don't triage the wounded."}
                  />
                  <FaqItem 
                    q={isAr ? "كم من الوقت أحتاج يومياً؟" : "How much time does it take daily?"}
                    a={isAr ? "يحتاج البرنامج 20-30 دقيقة يومياً. 10 دقائق صباحاً (Foundation) و 20 دقيقة مساءً (Review). إنه ليس وقتاً إضافياً، بل هو وقت 'صيانة' يحميك من الانهيار لاحقاً." : "The program requires 20-30 minutes daily. 10 mins AM (Foundation) and 20 mins PM (Review). It's not 'extra' time; it's 'maintenance' time that prevents collapse later."}
                  />
                  <FaqItem 
                    q={isAr ? "ماذا لو لم يعجبني النظام؟" : "What if I don't like the system?"}
                    a={isAr ? "لديك ضمان 30 يوماً. إذا طبقت التمارين ولم تشعر بفرق في ثباتك النفسي، سنعيد لك أموالك بالكامل. نحن نبيع نتائج." : "You have a 30-day guarantee. If you execute the drills and don't feel a shift in stability, we refund you fully. We sell results."}
                  />
              </div>
          </div>
      </section>

      {/* =====================================================================================
          9. GUARANTEE & FINAL CTA
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

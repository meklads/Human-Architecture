
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View, Product } from '../types';
import { LANDING_CONTENT, PRODUCTS } from '../constants';
import { 
  ArrowRight, Play, Check, AlertTriangle, Layers, Shield, Zap, Target, 
  ArrowLeft, Layout, FileText, Plus, X, Maximize2, Box, CreditCard, 
  Star, Gift, Users, ChevronDown, Activity, Clock, ShieldCheck,
  // Added missing social icons for the footer section
  Instagram, Twitter, Linkedin
} from './Icons';

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
  const [isPlaying, setIsPlaying] = useState(false);

  const getTxt = useCallback((obj: any): string => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[lang] || obj['en'] || obj['ar'] || '';
  }, [lang]);

  const handleBuyProduct = (productId: string) => {
    if (!onCheckout) return;
    const product = PRODUCTS.find(p => p.id === productId);
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

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05, margin: "0px 0px -60px 0px" },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  return (
    <div dir={dir} className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-bronze selection:text-black font-sans scroll-smooth">
      
      {/* 1️⃣ ARCHITECTURAL NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 md:px-12 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
          <button onClick={() => setView('home')} className="flex items-center gap-3 group">
             <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-bronze transition-all">
                 <Box size={14} className="group-hover:text-bronze" />
             </div>
             <span className={`text-[0.6rem] uppercase tracking-[0.3em] font-bold ${bodyFont}`}>
                 {getTxt(content.header.left)}
             </span>
          </button>
          
          <div className="flex gap-4 md:gap-8 items-center">
              <button onClick={() => setView('home')} className="hidden md:block text-[0.6rem] uppercase tracking-widest text-slate hover:text-white transition-colors">
                  {getTxt(content.header.right)}
              </button>
              <button 
                onClick={scrollToOffer}
                className="text-[0.6rem] uppercase tracking-[0.2em] font-bold bg-bronze text-white px-6 py-2 rounded-sm shadow-lg hover:bg-white hover:text-black transition-all"
              >
                  {isAr ? 'احصل على المخطط' : 'GET THE BLUEPRINT'}
              </button>
          </div>
      </nav>

      {/* 2️⃣ HERO SECTION: THE AUTHORITY HOOK */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
           {/* Background Grid & Particles */}
           <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>
           <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none"></div>

           <div className="container mx-auto text-center relative z-10">
               <motion.div 
                 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 bg-red-900/10 border border-red-900/30 px-4 py-2 rounded-full mb-12"
               >
                   <AlertTriangle size={12} className="text-red-500" />
                   <span className="text-[0.6rem] text-red-400 uppercase tracking-widest font-bold">
                       {getTxt(content.warning)}
                   </span>
               </motion.div>

               <motion.h1 
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                 className={`text-5xl md:text-8xl lg:text-9xl leading-[1] font-bold text-white mb-10 ${headingFont} tracking-tighter`}
               >
                   {getTxt(content.hero.headline)}
               </motion.h1>
               
               <motion.p 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                 className={`text-lg md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12 ${bodyFont} font-light`}
               >
                   {getTxt(content.hero.subheadline)}
               </motion.p>

               {/* Video/Preview Interface */}
               <motion.div 
                 {...fadeInUp}
                 className="relative max-w-5xl mx-auto aspect-video bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-sm overflow-hidden mb-16 group"
               >
                    <AnimatePresence mode="wait">
                        {!isPlaying ? (
                            <motion.div 
                                key="cover"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 cursor-pointer z-10"
                                onClick={() => setIsPlaying(true)}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2070&auto=format&fit=crop" 
                                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-50" 
                                    alt="Construction Site" 
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-xl group-hover:scale-110 group-hover:border-bronze transition-all">
                                        <Play size={32} className="text-bronze ml-1.5" fill="currentColor" />
                                    </div>
                                    <div className="mt-8">
                                        <span className={`block text-white text-sm uppercase tracking-[0.4em] font-bold ${bodyFont}`}>
                                            {getTxt(content.hero.videoLabel)}
                                        </span>
                                    </div>
                                </div>
                                {/* Scanning Laser Animation */}
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-bronze/50 shadow-[0_0_15px_rgba(197,160,101,0.5)] animate-scan"></div>
                            </motion.div>
                        ) : (
                            <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black z-20">
                                <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/xoDURQ-jqow?autoplay=1&mute=1" frameBorder="0" allowFullScreen></iframe>
                                <button onClick={() => setIsPlaying(false)} className="absolute top-6 right-6 bg-black/80 text-white p-2 hover:bg-bronze transition-all rounded-sm border border-white/10"><X size={20}/></button>
                            </motion.div>
                        )}
                    </AnimatePresence>
               </motion.div>

               <button 
                  onClick={scrollToOffer}
                  className="bg-bronze text-white px-12 py-6 text-sm md:text-base font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-2xl mb-6 rounded-sm"
               >
                   {getTxt(content.hero.cta)}
               </button>
               <div className="flex items-center justify-center gap-3 text-slate-500 text-[0.6rem] uppercase tracking-widest font-bold">
                   <Shield size={12} className="text-bronze/50" /> 
                   {getTxt(content.hero.guarantee)}
               </div>
           </div>
      </section>

      {/* 3️⃣ THE PROBLEM: THE DEEP DIAGNOSIS */}
      <section className="py-32 bg-[#080808] border-y border-white/5 relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-bronze/[0.02] -skew-x-12 transform origin-top"></div>
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <motion.div {...fadeInUp} className="lg:col-span-7">
                      <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold mb-6 block flex items-center gap-2">
                          <Activity size={14} /> {isAr ? 'تحليل هندسي للأعطال' : 'STRUCTURAL FAILURE ANALYSIS'}
                      </span>
                      <h2 className={`text-4xl md:text-6xl text-white mb-8 ${headingFont} leading-tight`}>
                          {getTxt(content.problem.headline)}
                      </h2>
                      <p className={`text-xl text-slate-400 leading-relaxed mb-8 ${bodyFont}`}>
                          {getTxt(content.problem.body)}
                      </p>
                      <div className="border-l-4 border-bronze pl-8 py-2 bg-bronze/5">
                          <p className={`text-2xl text-white italic ${headingFont}`}>
                              "{getTxt(content.problem.emphasis)}"
                          </p>
                      </div>
                  </motion.div>
                  <div className="lg:col-span-5 relative hidden lg:block">
                      <div className="aspect-[3/4] border border-white/10 p-4">
                          <img src="https://images.unsplash.com/photo-1597113366853-fea190b6cd82?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-40 shadow-2xl" alt="Broken Structure" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-bronze/30"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 4️⃣ WHY TRADITIONAL HELP FAILS (THE TRUTH) */}
      <section className="py-32 bg-[#050505]">
          <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className={`text-3xl md:text-5xl text-white mb-16 ${headingFont}`}>{getTxt(content.failure.headline)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {content.failure.bullets.map((bullet, i) => (
                      <motion.div 
                        key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}
                        className="p-8 border border-white/5 bg-white/[0.02] group hover:border-red-900/40 transition-all"
                      >
                          <X size={24} className="text-red-900/40 mb-6 mx-auto group-hover:text-red-500 transition-colors" />
                          <p className={`text-white text-sm uppercase tracking-widest font-bold leading-relaxed`}>{getTxt(bullet)}</p>
                      </motion.div>
                  ))}
              </div>
              <div className="inline-block px-10 py-6 bg-white/5 border border-white/10 rounded-sm">
                  <p className={`text-xl md:text-2xl text-bronze uppercase tracking-[0.2em] font-bold`}>{getTxt(content.failure.closing)}</p>
              </div>
          </div>
      </section>

      {/* 5️⃣ THE PILLARS (CORE OF THE PHILOSOPHY) */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-20">
                  <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold mb-4 block">{isAr ? 'منظومة الاستقرار' : 'STABILITY SYSTEM'}</span>
                  <h2 className={`text-4xl md:text-6xl text-white ${headingFont}`}>{getTxt(content.pillars.title)}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.pillars.items.map((item, i) => (
                      <motion.div 
                        key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}
                        className="bg-black/40 border border-white/5 p-10 relative group overflow-hidden"
                      >
                          <div className="absolute inset-0 bg-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative z-10">
                              <span className="text-4xl font-serif text-white/5 block mb-6 group-hover:text-bronze/10 transition-colors">0{i+1}</span>
                              <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{getTxt(item.title)}</h3>
                              <p className="text-xs text-slate-500 uppercase tracking-widest">{getTxt(item.desc)}</p>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                      </motion.div>
                  ))}
              </div>
              <p className="text-center mt-12 text-slate-500 text-sm italic font-light italic">
                  "{getTxt(content.pillars.insight)}"
              </p>
          </div>
      </section>

      {/* 6️⃣ THE ROADMAP: THE EXECUTION STEPS */}
      <section className="py-32 bg-[#050505]">
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-24">
                  <h2 className={`text-4xl md:text-6xl text-white mb-6 ${headingFont}`}>{getTxt(content.journey.title)}</h2>
                  <p className="text-slate-500 uppercase tracking-[0.3em] text-xs">{getTxt(content.journey.intro)}</p>
              </div>
              
              <div className="relative space-y-24">
                  {/* Vertical Roadmap Line */}
                  <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none"></div>

                  {content.journey.steps.map((step, i) => (
                      <motion.div 
                        key={i} {...fadeInUp}
                        className={`flex flex-col md:flex-row items-center gap-12 relative ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                      >
                          {/* Circle Marker */}
                          <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#050505] border border-bronze flex items-center justify-center text-bronze text-xs font-mono z-10">
                              {step.step}
                          </div>

                          <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 text-center md:text-start">
                              <span className="text-bronze text-[0.6rem] uppercase tracking-widest font-bold mb-2 block">{getTxt(step.product)}</span>
                              <h3 className={`text-3xl text-white mb-4 ${headingFont}`}>{getTxt(step.name)}</h3>
                              <p className="text-slate-400 text-sm leading-relaxed">{getTxt(step.why)}</p>
                          </div>
                          
                          <div className="w-full md:w-1/2 flex justify-center">
                              <div className="p-8 border border-white/5 bg-white/[0.01] rounded-sm w-full max-w-sm">
                                  <span className="text-[0.5rem] uppercase tracking-widest text-slate-600 block mb-2">{isAr ? 'النتيجة النهائية' : 'DELIVERABLE'}</span>
                                  <div className="flex items-center gap-3 text-white font-bold text-sm">
                                      <Check size={14} className="text-green-500" />
                                      {getTxt(step.outcome)}
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 7️⃣ PRICING & CALL TO ACTION — 4-Tier Product Ladder */}

      {/* 💌 EMAIL CAPTURE: FREE CHAPTER */}
      <section className="py-20 bg-[#070707] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div {...fadeInUp}>
            <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              {isAr ? '📐 هدية مجانية' : '📐 FREE RESOURCE'}
            </span>
            <h3 className={`text-2xl md:text-4xl text-white mb-4 ${headingFont}`}>
              {isAr ? 'احصل على الفصل الأول مجاناً' : 'Get The First Chapter Free'}
            </h3>
            <p className={`text-slate-400 mb-8 ${bodyFont}`}>
              {isAr
                ? 'أدخل بريدك الإلكتروني واحصل فوراً على "الفصل صفر: تشخيص الأساس" — 22 صفحة من بروتوكول العمارة البشرية.'
                : 'Enter your email and receive "Chapter Zero: Foundation Diagnosis" instantly — 22 pages of the Human Architecture protocol.'}
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value; if(email) { alert(isAr ? 'شكراً! تحقق من بريدك.' : 'Thank you! Check your inbox.'); } }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                name="email"
                required
                placeholder={isAr ? 'بريدك الإلكتروني...' : 'your@email.com'}
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-600 px-5 py-4 text-sm focus:outline-none focus:border-bronze transition-colors"
                dir="ltr"
              />
              <button
                type="submit"
                className="bg-bronze text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all whitespace-nowrap"
              >
                {isAr ? 'أرسل لي المجاني' : 'SEND ME FREE CHAPTER'}
              </button>
            </form>
            <p className="text-slate-600 text-xs mt-4">
              {isAr ? '🔒 لا spam. لا مشاركة بيانات. يمكنك الإلغاء في أي وقت.' : '🔒 No spam. No data sharing. Unsubscribe anytime.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="pricing-table" className="py-32 bg-[#0a0a0a] border-t border-white/5">
           <div className="container mx-auto px-6 text-center">
                {/* Urgency Bar */}
                <div className="inline-flex items-center gap-3 bg-red-900/20 border border-red-900/40 px-6 py-3 rounded-sm mb-12">
                    <Clock size={14} className="text-red-400 animate-pulse" />
                    <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
                        {isAr ? '⚡ عرض الإطلاق — أسعار مؤقتة قبل الارتفاع الرسمي' : '⚡ LAUNCH PRICING — Rates increase at full release'}
                    </span>
                </div>

                <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold mb-4 block flex items-center justify-center gap-2">
                    <CreditCard size={14} /> {isAr ? 'سلّم المنتجات الهندسية' : 'ENGINEERING PRODUCT LADDER'}
                </span>
                <h2 className={`text-4xl md:text-6xl text-white mb-6 ${headingFont}`}>{isAr ? 'ابدأ من أي مستوى' : 'Start From Any Level'}</h2>
                <p className="text-slate-500 mb-16 max-w-xl mx-auto">{isAr ? 'كل منتج يبني على السابق — يمكنك الترقية في أي وقت.' : 'Each product builds on the last — upgrade anytime.'}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-7xl mx-auto items-start">
                    
                    {/* TIER 1: Phase 0 — Entry */}
                    <motion.div {...fadeInUp} className="bg-[#111] border border-white/10 p-8 text-left group hover:border-white/30 transition-all flex flex-col">
                        <div className="text-[0.5rem] uppercase tracking-[0.3em] text-slate-500 mb-3 font-mono">LEVEL 01</div>
                        <h3 className={`text-xl text-white mb-2 ${headingFont}`}>{isAr ? 'المرحلة صفر' : 'Phase 0: Foundation'}</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1">{isAr ? '10 أيام لتثبيت قدرة النظام قبل الانطلاق' : '10 days to install system capacity before acceleration'}</p>
                        <div className="text-4xl font-mono text-white mb-6">$27</div>
                        <ul className="space-y-2 mb-8 text-xs text-slate-400">
                            <li className="flex items-center gap-2"><Check size={12} className="text-bronze"/>{isAr ? 'بروتوكول 10 أيام كامل' : 'Full 10-Day Protocol'}</li>
                            <li className="flex items-center gap-2"><Check size={12} className="text-bronze"/>{isAr ? 'تسليم رقمي فوري' : 'Instant Digital Delivery'}</li>
                            <li className="flex items-center gap-2"><Check size={12} className="text-bronze"/>{isAr ? 'يُحسب عند الترقية' : 'Credit toward upgrade'}</li>
                        </ul>
                        <button onClick={() => handleBuyProduct('phase0_foundation')} className="w-full py-3 border border-white/20 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                            {isAr ? 'ابدأ هنا' : 'Start Here'}
                        </button>
                    </motion.div>

                    {/* TIER 2: Workbook — Builder */}
                    <motion.div {...fadeInUp} transition={{delay:0.1, duration:0.7, ease:"easeOut"}} className="bg-[#111] border border-white/10 p-8 text-left group hover:border-bronze/30 transition-all flex flex-col">
                        <div className="text-[0.5rem] uppercase tracking-[0.3em] text-slate-500 mb-3 font-mono">LEVEL 02</div>
                        <h3 className={`text-xl text-white mb-2 ${headingFont}`}>{isAr ? 'الكتاب + وورك بوك' : 'Blueprint + Workbook'}</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1">{isAr ? 'النظرية والتطبيق معاً — 28 تمرين عملي' : 'Theory + Application — 28 hands-on drills'}</p>
                        <div className="text-4xl font-mono text-white mb-6">$97</div>
                        <ul className="space-y-2 mb-8 text-xs text-slate-400">
                            <li className="flex items-center gap-2"><Check size={12} className="text-bronze"/>{isAr ? 'الكتاب الأصلي (PDF)' : 'Original Blueprint (PDF)'}</li>
                            <li className="flex items-center gap-2"><Check size={12} className="text-bronze"/>{isAr ? 'الوورك بوك 28 يوماً' : '28-Day Workbook (PDF)'}</li>
                            <li className="flex items-center gap-2"><Check size={12} className="text-bronze"/>{isAr ? 'يُحسب عند الترقية' : 'Credit toward upgrade'}</li>
                        </ul>
                        <button onClick={() => handleBuyProduct('book_digital')} className="w-full py-3 border border-white/20 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                            {isAr ? 'اقتناء الكتاب' : 'Get Blueprint'}
                        </button>
                    </motion.div>

                    {/* TIER 3: 30-Day Accelerator — HIGHLIGHTED */}
                    <motion.div {...fadeInUp} transition={{delay:0.2, duration:0.7, ease:"easeOut"}} className="bg-[#151515] border-2 border-bronze p-8 text-left relative shadow-[0_0_60px_rgba(197,160,101,0.15)] flex flex-col xl:scale-105">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bronze text-black text-[0.55rem] font-bold px-4 py-1 uppercase tracking-[0.3em] whitespace-nowrap">
                            {isAr ? '⚡ الأكثر مبيعاً' : '⚡ MOST POPULAR'}
                        </div>
                        <div className="text-[0.5rem] uppercase tracking-[0.3em] text-bronze mb-3 font-mono">LEVEL 03</div>
                        <h3 className={`text-xl text-white mb-2 ${headingFont}`}>{isAr ? 'المسرّع 30 يوماً' : '30-Day Accelerator'}</h3>
                        <p className="text-xs text-slate-400 mb-6 flex-1">{isAr ? 'البروتوكول الطبي المتكامل — 850+ صفحة علم وتطبيق' : 'Medical-grade protocol — 850+ pages of science & execution'}</p>
                        <div className="text-4xl font-mono text-white mb-1">$297</div>
                        <div className="text-slate-500 line-through text-xs font-mono mb-6">$497</div>
                        <ul className="space-y-2 mb-8 text-xs text-slate-300">
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-bronze"/>{isAr ? 'البروتوكول الطبي الكامل' : 'Full Medical-Grade Protocol'}</li>
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-bronze"/>{isAr ? 'الكتاب + الوورك بوك' : 'Book + Workbook Included'}</li>
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-bronze"/>{isAr ? 'وصول للداشبورد التفاعلي' : 'Interactive Dashboard Access'}</li>
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-bronze"/>{isAr ? 'عضوية النقابة 30 يوماً' : "30-Day Guild Access"}</li>
                        </ul>
                        <button onClick={() => handleBuyProduct('accelerator_30day')} className="w-full py-4 bg-bronze text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(197,160,101,0.4)]">
                            {isAr ? 'ابدأ المسرّع' : 'Launch Accelerator'}
                        </button>
                    </motion.div>

                    {/* TIER 4: Master Bundle — Everything */}
                    <motion.div {...fadeInUp} transition={{delay:0.3, duration:0.7, ease:"easeOut"}} className="bg-[#0d0d0d] border border-white/20 p-8 text-left group hover:border-white/40 transition-all flex flex-col">
                        <div className="text-[0.5rem] uppercase tracking-[0.3em] text-slate-500 mb-3 font-mono">LEVEL 04</div>
                        <h3 className={`text-xl text-white mb-2 ${headingFont}`}>{isAr ? 'ترسانة المعماري الكاملة' : 'Master Architect Bundle'}</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1">{isAr ? 'كل شيء + كتاب مطبوع + جلسة مراجعة شخصية' : 'Everything + Hardcover + Personal Review Session'}</p>
                        <div className="text-4xl font-mono text-white mb-1">$397</div>
                        <div className="text-slate-500 line-through text-xs font-mono mb-6">$700</div>
                        <ul className="space-y-2 mb-8 text-xs text-slate-400">
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-white"/>{isAr ? 'كتاب مطبوع فاخر (يدوي)' : 'Premium Handcrafted Hardcover'}</li>
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-white"/>{isAr ? 'المسرّع 30 يوماً كاملاً' : 'Full 30-Day Accelerator'}</li>
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-white"/>{isAr ? 'عضوية النقابة مدى الحياة' : 'Lifetime Guild Membership'}</li>
                            <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-white"/>{isAr ? 'جلسة مراجعة مع المعماري' : 'One-on-One Review Session'}</li>
                        </ul>
                        <button onClick={handleBuyMasterPlan} className="w-full py-4 border-2 border-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all">
                            {isAr ? 'اقتناء الترسانة الكاملة' : 'Acquire Full Arsenal'}
                        </button>
                    </motion.div>
                </div>

                {/* Guarantee Bar */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-500 text-xs">
                    <div className="flex items-center gap-2"><Shield size={14} className="text-bronze"/>{isAr ? 'ضمان استرداد 30 يوم' : '30-Day Money Back Guarantee'}</div>
                    <div className="flex items-center gap-2"><Zap size={14} className="text-bronze"/>{isAr ? 'تسليم رقمي فوري' : 'Instant Digital Delivery'}</div>
                    <div className="flex items-center gap-2"><Users size={14} className="text-bronze"/>{isAr ? 'انضم لأكثر من 500 بنّاء' : 'Join 500+ Active Builders'}</div>
                </div>
           </div>
      </section>

      {/* 8️⃣ FAQ SECTION: TECHNICAL SPECS */}
      <section className="py-32 bg-[#050505]">
           <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <span className="text-bronze text-xs uppercase tracking-[0.4em] font-bold mb-4 block">{isAr ? 'المواصفات الفنية' : 'TECHNICAL SPECS'}</span>
                    <h2 className={`text-3xl md:text-5xl text-white ${headingFont}`}>{getTxt(content.faq.headline)}</h2>
                </div>
                <div className="space-y-4">
                    {content.faq.items.map((item, i) => (
                        <div key={i} className="border border-white/5 bg-white/[0.01]">
                            <button 
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                className="w-full p-6 flex justify-between items-center text-start group"
                            >
                                <span className={`text-white font-bold text-sm tracking-wide ${bodyFont}`}>{getTxt(item.q)}</span>
                                <ChevronDown size={18} className={`text-slate-500 group-hover:text-bronze transition-transform ${activeFaq === i ? 'rotate-180 text-bronze' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeFaq === i && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                                            {getTxt(item.a)}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
           </div>
      </section>

      {/* 9️⃣ FINAL CALL & QUALIFIERS */}
      <section className="py-32 bg-bronze text-white text-center">
           <div className="container mx-auto px-6 max-w-4xl">
               <h2 className={`text-4xl md:text-6xl mb-12 ${headingFont} leading-tight`}>
                   {isAr ? 'هل أنت مستعد لتكون المعماري؟' : 'Ready to Become the Architect?'}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-start mb-16">
                   <div className="bg-black/10 p-8 rounded-sm">
                       <h4 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2"><Check size={16}/> {getTxt(content.qualifiers.forYou.title)}</h4>
                       <ul className="space-y-3 opacity-90 text-sm">
                           {content.qualifiers.forYou.items.map((item, i) => <li key={i}>• {getTxt(item)}</li>)}
                       </ul>
                   </div>
                   <div className="bg-white/10 p-8 rounded-sm">
                       <h4 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2"><X size={16}/> {getTxt(content.qualifiers.notForYou.title)}</h4>
                       <ul className="space-y-3 opacity-90 text-sm">
                           {content.qualifiers.notForYou.items.map((item, i) => <li key={i}>• {getTxt(item)}</li>)}
                       </ul>
                   </div>
               </div>
               <button 
                  onClick={scrollToOffer}
                  className="bg-black text-white border-2 border-black px-16 py-6 text-base font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl"
               >
                   {getTxt(content.hero.cta)}
               </button>
           </div>
      </section>

      <footer className="bg-[#050505] py-16 text-center border-t border-white/5">
           <div className="flex justify-center gap-8 mb-8 opacity-40">
               <Instagram size={18} /> <Twitter size={18} /> <Linkedin size={18} />
           </div>
           <div className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-600 font-mono">
               © HUMAN ARCHITECTURE™ • PROJECT_OWNER: A. MEKLAD • SEC_PROTO_42 • ALL RIGHTS RESERVED
           </div>
      </footer>
    </div>
  );
};

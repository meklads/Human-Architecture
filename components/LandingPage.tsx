
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Product, View } from '../types';
import { TRANSLATIONS, PRODUCTS, LANDING_CONTENT } from '../constants';
import { ShoppingBag, Check, X, ArrowRight, Activity, Layers, Shield, Star, Box, Layout, PenTool, Database, Lock } from './Icons';
import { BookCover } from './BookCover';

interface LandingPageProps {
  lang: Language;
  setView: (view: View) => void;
  onCheckout?: (items: Product[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  const dir = isAr ? 'rtl' : 'ltr';

  const [selectedBundle, setSelectedBundle] = useState<string>('bundle_master');
  const [scarcityCount, setScarcityCount] = useState(142);
  
  // Products
  const masterBundle = PRODUCTS.find(p => p.id === 'bundle_master');
  const basicBook = PRODUCTS.find(p => p.id === 'book_only');

  // Scarcity Effect
  useEffect(() => {
    const timer = setInterval(() => {
        setScarcityCount(prev => Math.max(12, prev - Math.floor(Math.random() * 2)));
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const handlePurchase = (product: Product) => {
    if (onCheckout) {
        onCheckout([product]);
    } else {
        setView('checkout');
    }
  };

  const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
      <div className="flex items-start gap-3 mb-3">
          <div className="mt-1 w-4 h-4 rounded-full bg-bronze/20 border border-bronze flex items-center justify-center flex-shrink-0">
              <Check size={10} className="text-bronze" />
          </div>
          <span className={`text-sm text-slate/80 ${bodyFont}`}>{text}</span>
      </div>
  );

  return (
    <div dir={dir} className="bg-[#050505] min-h-screen text-concrete overflow-x-hidden selection:bg-bronze selection:text-white">
      
      {/* 1. TOP NAV - AUTHORITY BAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2 text-bronze">
              <Layout size={20} />
              <span className={`text-lg font-bold tracking-widest ${headingFont}`}>HUMAN ARCH.</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-slate">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {isAr ? 'باب القبول مفتوح' : 'INTAKE OPEN'}
              </div>
              <button onClick={() => setView('home')} className="text-xs uppercase tracking-widest hover:text-white text-slate transition-colors">
                  {isAr ? 'الخروج' : 'Exit'}
              </button>
          </div>
      </nav>

      {/* 2. HERO SECTION - THE BLUEPRINT REVEAL */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
         {/* Animated Background Grid */}
         <div className="absolute inset-0 opacity-[0.07] pointer-events-none architectural-grid animate-scan"></div>
         
         <div className="container mx-auto max-w-7xl relative z-10">
             <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                 
                 {/* COPY SIDE */}
                 <div className="w-full lg:w-1/2 text-center lg:text-start">
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 border border-bronze/30 bg-bronze/10 px-3 py-1 mb-8"
                     >
                         <Shield size={12} className="text-bronze" />
                         <span className="text-[0.6rem] uppercase tracking-[0.25em] text-bronze font-bold">
                             {LANDING_CONTENT.hero.badge[lang]}
                         </span>
                     </motion.div>

                     <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className={`text-5xl md:text-7xl lg:text-8xl leading-[1] mb-8 text-white ${headingFont}`}
                     >
                         {isAr ? 'توقف عن التطوير.' : 'STOP IMPROVING.'}
                         <br />
                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze via-yellow-200 to-bronze">
                             {isAr ? 'ابدأ الهندسة.' : 'START ENGINEERING.'}
                         </span>
                     </motion.h1>

                     <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className={`text-lg md:text-xl text-slate mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 ${bodyFont}`}
                     >
                         {LANDING_CONTENT.hero.subheadline[lang]}
                     </motion.p>

                     <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                     >
                         <button 
                            onClick={() => document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-bronze text-white px-10 py-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(197,160,101,0.2)] flex items-center justify-center gap-3"
                         >
                             <Layers size={18} />
                             {isAr ? 'استلام العدة الكاملة' : 'ACQUIRE TOOLKIT'}
                         </button>
                         <div className="flex items-center justify-center gap-3 px-8 py-5 border border-white/10 text-slate hover:text-white transition-colors cursor-default">
                             <div className="flex -space-x-2">
                                 {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-black"></div>)}
                             </div>
                             <span className="text-[0.6rem] uppercase tracking-widest font-bold">
                                 {isAr ? '+1400 مهندس انضموا' : '1,400+ Architects Joined'}
                             </span>
                         </div>
                     </motion.div>
                 </div>

                 {/* VISUAL SIDE - THE COMPOSITE */}
                 <div className="w-full lg:w-1/2 relative perspective-1000">
                     <motion.div 
                        initial={{ rotateY: 10, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 1 }}
                        className="relative"
                     >
                         {/* Glow effect */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-bronze/10 blur-[100px] rounded-full pointer-events-none"></div>
                         
                         {/* Stacked Elements: Book + Workbook + Tablet */}
                         <div className="relative z-10">
                            {/* The Workbook (Back) */}
                            <div className="absolute top-0 right-0 w-[80%] transform translate-x-8 -translate-y-8 -rotate-6 opacity-60 grayscale blur-[1px]">
                                 <div className="aspect-[3/4] bg-slate-800 border border-white/20"></div>
                            </div>
                            
                            {/* The Main Book (Front) */}
                            <div className="relative z-20 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <BookCover className="w-full max-w-md mx-auto" />
                                {/* Digital Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-[#1a1a1a] border border-bronze p-4 shadow-xl z-30 flex items-center gap-4 max-w-[200px]">
                                    <div className="w-10 h-10 bg-bronze text-white flex items-center justify-center font-bold text-lg">30</div>
                                    <div className="text-[0.6rem] uppercase tracking-widest text-slate leading-tight text-left">
                                        Day Digital<br/>Accelerator<br/><span className="text-green-500">INCLUDED</span>
                                    </div>
                                </div>
                            </div>
                         </div>
                     </motion.div>
                 </div>

             </div>
         </div>
      </header>

      {/* 3. THE DIAGNOSIS (Problem Agitation) */}
      <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                  <div className="md:col-span-1">
                      <h2 className={`text-4xl text-white mb-6 ${headingFont}`}>
                          {LANDING_CONTENT.problem.title[lang]}
                      </h2>
                      <div className="w-12 h-1 bg-bronze mb-6 md:mx-0 mx-auto"></div>
                  </div>
                  <div className="md:col-span-2">
                      <p className={`text-xl text-slate leading-loose ${bodyFont}`}>
                          {LANDING_CONTENT.problem.text[lang]}
                      </p>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                  {[
                      { icon: Activity, title: { en: 'Foundation Failure', ar: 'انهيار الأساسات' }, desc: { en: 'Physical burnout, chronic fatigue, sleep disruption.', ar: 'احتراق جسدي، تعب مزمن، اضطراب نوم.' } },
                      { icon: Lock, title: { en: 'Structural Stress', ar: 'إجهاد الهيكل' }, desc: { en: 'Anxiety, overthinking, inability to focus.', ar: 'قلق، تفكير مفرط، تشتت انتباه.' } },
                      { icon: Database, title: { en: 'System Overload', ar: 'زيادة أحمال' }, desc: { en: 'Emotional reactivity, boundary collapse.', ar: 'انفجار عاطفي، انهيار الحدود الشخصية.' } }
                  ].map((item, i) => (
                      <div key={i} className="bg-white/5 p-8 border border-white/5 hover:border-bronze/30 transition-colors group">
                          <div className="mb-6 text-slate group-hover:text-bronze transition-colors">
                              <item.icon size={32} strokeWidth={1} />
                          </div>
                          <h3 className={`text-xl text-white mb-3 ${headingFont}`}>{item.title[lang]}</h3>
                          <p className={`text-sm text-slate ${bodyFont}`}>{item.desc[lang]}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. THE SOLUTION (Bundle Selection) */}
      <section id="bundles" className="py-32 bg-[#111] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                  <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-4 block">
                      {isAr ? 'التسعير المعماري' : 'Architectural Pricing'}
                  </span>
                  <h2 className={`text-4xl md:text-6xl text-white ${headingFont}`}>
                      {LANDING_CONTENT.bundles.title[lang]}
                  </h2>
              </div>

              <div className="flex flex-col lg:flex-row justify-center gap-8 items-stretch max-w-5xl mx-auto">
                  
                  {/* OPTION 1: Book Only */}
                  <div 
                    onClick={() => setSelectedBundle('book_only')}
                    className={`w-full lg:w-1/3 border p-8 relative cursor-pointer transition-all duration-300 flex flex-col ${selectedBundle === 'book_only' ? 'bg-[#1a1a1a] border-white/20 opacity-100' : 'bg-transparent border-white/5 opacity-50 hover:opacity-100'}`}
                  >
                      <div className="mb-8">
                          <h3 className={`text-2xl text-white mb-2 ${headingFont}`}>{isAr ? 'المخطط فقط' : 'The Blueprint'}</h3>
                          <div className="text-3xl font-mono text-slate">$35</div>
                      </div>
                      
                      <div className="flex-1 space-y-4 mb-8">
                           {basicBook?.features?.map((f, i) => (
                               <FeatureItem key={i} text={f[lang]} />
                           ))}
                      </div>

                      <button className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                          {isAr ? 'اختيار' : 'Select'}
                      </button>
                  </div>

                  {/* OPTION 2: THE MASTER BUNDLE (Hero) */}
                  <div 
                    onClick={() => setSelectedBundle('bundle_master')}
                    className={`w-full lg:w-1/2 border-2 p-10 relative cursor-pointer transition-all duration-300 transform scale-105 shadow-2xl flex flex-col ${selectedBundle === 'bundle_master' ? 'bg-[#151515] border-bronze' : 'bg-[#1a1a1a] border-white/10'}`}
                  >
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bronze text-white px-6 py-2 text-[0.6rem] uppercase tracking-[0.2em] font-bold shadow-lg whitespace-nowrap">
                          {isAr ? 'الأكثر مبيعاً للمحترفين' : 'RECOMMENDED FOR PROS'}
                      </div>

                      <div className="mb-10 text-center border-b border-white/5 pb-8">
                          <h3 className={`text-3xl md:text-4xl text-white mb-2 ${headingFont}`}>{isAr ? 'حزمة كبير المهندسين' : 'The Master Architect'}</h3>
                          <div className="flex items-center justify-center gap-4">
                              <span className="text-4xl font-mono text-bronze">$67</span>
                              <span className="text-lg text-slate/40 line-through decoration-red-500 decoration-2">$99</span>
                          </div>
                          <p className="text-green-500 text-xs uppercase tracking-widest mt-2 font-bold">{isAr ? 'توفير 32$' : 'Save $32'}</p>
                      </div>

                      <div className="flex-1 space-y-4 mb-10">
                          {masterBundle?.features?.map((f, i) => (
                               <FeatureItem key={i} text={f[lang]} />
                           ))}
                           <div className="p-4 bg-bronze/10 border border-bronze/20 mt-6">
                               <h4 className="text-bronze text-xs font-bold uppercase mb-2 flex items-center gap-2"><Star size={12} /> {isAr ? 'مكافأة خاصة' : 'BONUS'}</h4>
                               <p className={`text-xs text-slate ${bodyFont}`}>
                                   {isAr ? 'دخول مجاني لمجتمع البنائين + تحديثات مدى الحياة.' : 'Free entry to Builders Guild + Lifetime updates.'}
                               </p>
                           </div>
                      </div>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePurchase(masterBundle!); }}
                        className="w-full py-5 bg-bronze text-white text-sm uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(197,160,101,0.4)] flex items-center justify-center gap-3"
                      >
                          <ShoppingBag size={18} /> {isAr ? 'استحواذ فوري' : 'INSTANT ACQUISITION'}
                      </button>
                      
                      <div className="mt-4 text-center">
                          <span className="text-[0.6rem] text-slate/50 uppercase tracking-widest">
                              {scarcityCount} {isAr ? 'نسخة متبقية من هذا العرض' : 'sets remaining at this price'}
                          </span>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* 5. THE 30-DAY ACCELERATOR PREVIEW */}
      <section className="py-24 bg-alabaster dark:bg-[#e6e2dd] text-charcoal">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                   <div className="w-full lg:w-1/2">
                       <span className="text-charcoal/50 text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
                           {isAr ? 'البرنامج الرقمي' : 'The Digital Accelerator'}
                       </span>
                       <h2 className={`text-4xl md:text-5xl mb-6 ${headingFont}`}>
                           {isAr ? 'غرفة العمليات الخاصة بك' : 'Your Digital Ops Room'}
                       </h2>
                       <p className={`text-lg text-charcoal/80 mb-8 leading-relaxed ${bodyFont}`}>
                           {isAr 
                            ? 'لا تترك التنفيذ للصدفة. عند شراء الحزمة، تحصل على لوحة تحكم رقمية تتابع تقدمك يوماً بيوم. مهام محددة، أدوات تتبع، ومحتوى صوتي.' 
                            : 'Don\'t leave execution to chance. When you buy the bundle, you get a digital dashboard tracking your progress day by day. Specific tasks, trackers, and audio briefs.'}
                       </p>
                       <ul className="space-y-4 mb-8">
                           {[
                               isAr ? 'لوحة تحكم تفاعلية' : 'Interactive Dashboard',
                               isAr ? 'توجيهات صوتية يومية' : 'Daily Audio Briefs',
                               isAr ? 'مكتبة الأدوات (PDF)' : 'Downloadable Tool Library'
                           ].map((item, i) => (
                               <li key={i} className="flex items-center gap-3 font-bold text-sm uppercase tracking-wide">
                                   <div className="w-6 h-6 bg-charcoal text-white flex items-center justify-center rounded-full"><Check size={12} /></div>
                                   {item}
                               </li>
                           ))}
                       </ul>
                   </div>
                   <div className="w-full lg:w-1/2">
                       <div className="bg-charcoal p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                           <div className="bg-[#111] aspect-video w-full flex items-center justify-center border border-white/10 relative overflow-hidden">
                               {/* Mock UI for Dashboard */}
                               <div className="absolute top-4 left-4 w-32 h-2 bg-white/20 rounded"></div>
                               <div className="absolute top-4 right-4 flex gap-2">
                                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                               </div>
                               <div className="text-center">
                                   <Activity size={48} className="text-bronze mx-auto mb-4 animate-pulse" />
                                   <span className="text-white/50 font-mono text-xs uppercase tracking-widest">System Online</span>
                               </div>
                           </div>
                       </div>
                   </div>
              </div>
          </div>
      </section>

      {/* 6. TECHNICAL SPECS (Trust Factors) */}
      <section className="py-20 bg-[#050505] border-t border-white/10">
          <div className="container mx-auto px-6 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                      { label: 'Pages', val: '340' },
                      { label: 'Weight', val: '1.2kg' },
                      { label: 'Paper', val: 'Munken Pure' },
                      { label: 'Binding', val: 'Smyth Sewn' }
                  ].map((spec, i) => (
                      <div key={i} className="border-r border-white/10 last:border-0">
                          <div className="text-3xl text-white font-serif font-bold mb-1">{spec.val}</div>
                          <div className="text-[0.6rem] text-slate uppercase tracking-widest">{spec.label}</div>
                      </div>
                  ))}
              </div>
              <div className="mt-16 flex justify-center">
                  <div className="flex items-center gap-2 text-slate/60 text-xs">
                      <Shield size={14} />
                      {isAr ? 'شحن دولي آمن | ضمان استرجاع 30 يوماً' : 'Secure Worldwide Shipping | 30-Day Money Back Guarantee'}
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

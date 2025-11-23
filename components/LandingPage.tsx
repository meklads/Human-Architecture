
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Product } from '../types';
import { TRANSLATIONS, BOOK_CHAPTERS, PRODUCTS, LANDING_CONTENT } from '../constants';
import { ShoppingBag, Check, X, ArrowRight, Activity, Layers, Bell, Wifi, BookOpen, Eye, Compass, Shield, Wand2, QrCode } from './Icons';
import { BookCover } from './BookCover';

interface LandingPageProps {
  lang: Language;
  setView: (view: any) => void;
  onCheckout?: (items: Product[]) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  const [copiesLeft, setCopiesLeft] = useState(42);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [stickyPermitVisible, setStickyPermitVisible] = useState(false);

  // Fake Scarcity Engine
  useEffect(() => {
    const interval = setInterval(() => {
        setCopiesLeft(prev => Math.max(7, prev - 1));
    }, 15000); // Reduce count every 15s

    const handleScroll = () => {
        if (window.scrollY > 600) setStickyPermitVisible(true);
        else setStickyPermitVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        clearInterval(interval);
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const cardProduct = PRODUCTS.find(p => p.id === 'kit_cards_30');
  const bookProduct = PRODUCTS.find(p => p.id === 'book_1');

  const handleBuyBook = () => setShowUpsell(true);

  const finalizePurchase = (withUpsell: boolean) => {
      if (!bookProduct) return;

      const items = [bookProduct];
      if (withUpsell && cardProduct) {
          // Discounted Cards
          items.push({ ...cardProduct, price: 17 });
      }

      if (onCheckout) {
          setShowUpsell(false);
          onCheckout(items);
      } else {
        // Fallback
        setCartNotification(withUpsell ? (isAr ? 'تمت إضافة الحزمة الكاملة' : 'Full Architecture Bundle Added') : (isAr ? 'تمت إضافة المخطط' : 'Blueprint Added'));
        setTimeout(() => {
            setCartNotification(null);
            setShowUpsell(false);
            setView('library');
        }, 2000);
      }
  };

  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden selection:bg-bronze selection:text-white">
      
      {/* 1. STICKY "CONSTRUCTION PERMIT" (High Conversion Element) */}
      <AnimatePresence>
        {stickyPermitVisible && (
            <motion.div 
                initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                className="fixed bottom-0 left-0 w-full bg-[#111] border-t border-bronze/50 z-[90] p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
            >
                <div className="container mx-auto flex justify-between items-center">
                    <div className="hidden md:flex items-center gap-4">
                        <div className="bg-bronze/10 text-bronze p-2 rounded">
                            <Layers size={20} />
                        </div>
                        <div>
                            <span className="text-[0.6rem] text-slate uppercase tracking-widest block">Project: Human Restoration</span>
                            <span className="text-white font-bold text-sm">{isAr ? 'المخطط الأصلي + العدة' : 'Master Blueprint + Toolkit'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="hidden md:block text-right">
                            <span className="text-[0.6rem] text-red-400 uppercase tracking-widest block font-bold animate-pulse">{copiesLeft} {isAr ? 'نسخة متبقية' : 'Copies Left'}</span>
                            <span className="text-white font-bold">$45.00</span>
                        </div>
                        <button 
                            onClick={handleBuyBook}
                            className="w-full md:w-auto bg-bronze hover:bg-white hover:text-charcoal text-white px-8 py-3 uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_15px_rgba(197,160,101,0.4)]"
                        >
                            {isAr ? 'تأكيد الطلب' : 'SECURE PERMIT'}
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-6 py-4">
          <button onClick={() => setView('home')} className={`text-xl font-bold text-white ${headingFont}`}>
            {isAr ? 'عمارة الإنسان' : 'HUMAN ARCH.'}
          </button>
          <div className="flex items-center gap-4">
             <button onClick={() => setView('philosophy')} className="hidden md:block text-xs uppercase tracking-widest text-slate hover:text-white transition-colors">
                {isAr ? 'استكشاف الفلسفة' : 'Explore Philosophy'}
             </button>
             <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-[0.6rem] text-red-400 uppercase tracking-widest font-bold">{copiesLeft} {isAr ? 'نسخ متبقية من الطبعة الأولى' : 'LEFT IN FIRST BATCH'}</span>
             </div>
             <button onClick={handleBuyBook} className="bg-bronze text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors font-bold">
                {isAr ? 'احجز نسختك' : 'Claim Yours'}
             </button>
          </div>
      </nav>

      {/* HERO SECTION - Sales Focus */}
      <header className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[#0a0a0a]">
         <div className="absolute inset-0 z-0">
             {/* Dynamic Noise */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10 mix-blend-overlay"></div>
            {/* Spotlight */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-bronze/10 blur-[150px] rounded-full pointer-events-none"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Copy Side */}
             <div className="text-center lg:text-start">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="inline-block border border-bronze text-bronze px-4 py-1 text-[0.6rem] uppercase tracking-[0.3em] font-bold mb-6"
                 >
                     {isAr ? 'ليس مجرد كتاب، بل وثيقة هندسية' : 'NOT A BOOK. A BLUEPRINT.'}
                 </motion.div>
                 
                 <h1 className={`text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9] tracking-tighter ${headingFont}`}>
                    {isAr ? 'توقف عن الترميم.' : 'STOP REPAIRING.'} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze to-white">
                        {isAr ? 'أعد البناء.' : 'REBUILD.'}
                    </span>
                 </h1>

                 <p className={`text-lg md:text-xl text-slate/70 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 ${bodyFont}`}>
                    {LANDING_CONTENT.hero.subheadline[lang]}
                 </p>

                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button 
                        onClick={handleBuyBook}
                        className="bg-bronze text-white px-10 py-5 text-sm uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(197,160,101,0.3)]"
                    >
                        {isAr ? 'بدء البناء (45$)' : 'START BUILD ($45)'}
                    </button>
                    <div className="flex items-center gap-4 px-6 py-5 border border-white/10 text-slate">
                        <Activity size={18} className="text-green-500" />
                        <span className="text-xs uppercase tracking-widest">{isAr ? 'أكثر من 1200 موقع قيد الإنشاء' : '1,200+ Active Sites'}</span>
                    </div>
                 </div>
             </div>

             {/* Visual Side: The Native BookCover Component */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                className="relative group"
             >
                 <div className="absolute inset-0 bg-bronze/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                 <div className="relative z-10 transform transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-1">
                    
                    {/* Replaced generic Image with Native BookCover */}
                    <div className="w-full max-w-md mx-auto shadow-2xl">
                         <BookCover />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -right-8 top-20 bg-[#1a1a1a] border border-white/20 p-4 shadow-xl backdrop-blur-md hidden lg:block">
                        <div className="text-[0.6rem] uppercase tracking-widest text-slate mb-1">Density</div>
                        <div className="text-xl text-white font-bold font-serif">340 Pages</div>
                    </div>
                    <div className="absolute -left-8 bottom-20 bg-[#1a1a1a] border border-white/20 p-4 shadow-xl backdrop-blur-md hidden lg:block">
                        <div className="text-[0.6rem] uppercase tracking-widest text-slate mb-1">Material</div>
                        <div className="text-xl text-white font-bold font-serif">Hardcover</div>
                    </div>
                 </div>
             </motion.div>

         </div>
      </header>

      {/* THE PROBLEM - "THE CRACK" */}
      <section className="py-32 bg-[#0a0a0a] relative border-t border-white/5">
         <div className="container mx-auto px-6 max-w-4xl text-center">
             <div className="w-px h-20 bg-gradient-to-b from-transparent via-bronze to-transparent mx-auto mb-8"></div>
             <h2 className={`text-3xl md:text-5xl text-white mb-8 ${headingFont}`}>
                {isAr ? 'لماذا تتهاوى المباني البشرية؟' : 'Why Human Structures Collapse'}
             </h2>
             <p className={`text-xl text-slate leading-relaxed ${bodyFont}`}>
                {LANDING_CONTENT.problem.text[lang]}
             </p>
         </div>
      </section>

      {/* UPSELL SECTION (The Toolkit) */}
      <section className="py-32 bg-[#111] border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-bronze/5 skew-x-12"></div>
          <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="w-full lg:w-1/2">
                      <div className="relative p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                          <div className="absolute top-0 left-0 w-full h-1 bg-bronze"></div>
                          <img 
                            src={cardProduct?.image} 
                            alt="Cards" 
                            className="relative z-10 w-full shadow-2xl grayscale group-hover:grayscale-0 transition-all" 
                          />
                          <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                              {isAr ? 'أداة تنفيذية' : 'Execution Tool'}
                          </div>
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                      <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-4">
                          {LANDING_CONTENT.upsell.title[lang]}
                      </span>
                      <h2 className={`text-4xl md:text-5xl mb-6 text-white ${headingFont}`}>
                          {cardProduct?.name[lang]}
                      </h2>
                      <p className={`text-lg text-slate mb-8 leading-relaxed ${bodyFont}`}>
                          {LANDING_CONTENT.upsell.desc[lang]}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                          {[
                              isAr ? 'بطاقات صلبة' : 'Heavy-Duty Stock',
                              isAr ? 'مهام يومية' : 'Daily Protocols',
                              isAr ? 'علبة فاخرة' : 'Archival Box',
                              isAr ? 'ضمان الالتزام' : 'Compliance Tool'
                          ].map((item, i) => (
                              <div key={i} className="flex items-center gap-3 text-slate">
                                  <Check size={16} className="text-bronze" />
                                  <span className="text-sm uppercase tracking-wider">{item}</span>
                              </div>
                          ))}
                      </div>

                      <div className="flex items-center gap-6">
                          <div className="text-3xl text-white font-serif">$17 <span className="text-sm text-slate line-through opacity-50">$29</span></div>
                          <button onClick={handleBuyBook} className="bg-white text-black px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-bronze hover:text-white transition-colors">
                              {isAr ? 'إضافة للطلب' : 'ADD TO ORDER'}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* UPSELL MODAL */}
      <AnimatePresence>
          {showUpsell && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} 
                    className="bg-[#1a1a1a] max-w-2xl w-full shadow-2xl border border-white/10 relative overflow-hidden"
                  >
                      {/* Top Bar */}
                      <div className="bg-bronze px-6 py-2 flex justify-between items-center">
                          <span className="text-white text-[0.6rem] uppercase tracking-[0.2em] font-bold">{isAr ? 'عرض خاص محدود' : 'LIMITED ONE-TIME OFFER'}</span>
                          <button onClick={() => setShowUpsell(false)} className="text-white hover:text-black"><X size={18} /></button>
                      </div>

                      <div className="p-8 md:p-12 text-center relative z-10">
                          <h3 className={`text-3xl mb-4 text-white ${headingFont}`}>
                              {isAr ? 'اكتملت 80% من عملية الطلب...' : 'Order 80% Complete...'}
                          </h3>
                          <p className={`text-slate mb-8 ${bodyFont}`}>
                              {isAr 
                               ? 'المهندسون المحترفون لا يذهبون للموقع بدون عدتهم. أضف بطاقات المهام لضمان عدم التكاسل.'
                               : 'Professional architects don\'t go to site without tools. Add the Task Cards to ensure zero slack.'}
                          </p>
                          
                          <div className="bg-black/30 p-6 border border-white/5 mb-8 flex items-center gap-6 text-left">
                              <img src={cardProduct?.image} className="w-20 h-20 object-cover border border-white/10" />
                              <div>
                                  <div className="text-white font-bold uppercase tracking-wider text-sm">{cardProduct?.name['en']}</div>
                                  <div className="text-bronze font-mono">$17.00 <span className="text-slate line-through text-xs">$29.00</span></div>
                              </div>
                              <div className="ml-auto">
                                  <div className="text-green-500 text-xs font-bold uppercase tracking-widest border border-green-500/30 px-2 py-1 bg-green-500/10">Save 40%</div>
                              </div>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                              <button 
                                onClick={() => finalizePurchase(true)}
                                className="w-full py-5 bg-bronze text-white uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors shadow-lg animate-pulse"
                              >
                                  {isAr ? 'نعم، أكمل عدتي (+$17)' : 'YES, COMPLETE MY TOOLKIT (+$17)'}
                              </button>
                              <button 
                                onClick={() => finalizePurchase(false)}
                                className="w-full py-3 text-slate hover:text-white uppercase tracking-widest text-[0.65rem] transition-colors"
                              >
                                  {isAr ? 'لا شكراً، سأكتفي بالكتاب فقط' : 'No thanks, I will risk it with just the book'}
                              </button>
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>
      
      {/* FINAL FOOTER */}
      <footer className="bg-black text-white py-12 border-t border-white/10 text-center">
          <div className="opacity-30 hover:opacity-100 transition-opacity">
              <p className="text-[0.6rem] uppercase tracking-[0.2em] mb-2">Architectural Engineering for the Soul</p>
              <p className="text-[0.5rem] text-slate">© 2024 HUMAN ARCHITECTURE. ALL RIGHTS RESERVED.</p>
              <div className="flex justify-center gap-4 mt-4">
                  <button onClick={() => setView('home')} className="text-[0.5rem] uppercase hover:text-bronze">Home</button>
                  <button onClick={() => setView('philosophy')} className="text-[0.5rem] uppercase hover:text-bronze">Philosophy</button>
                  <button onClick={() => setView('contact')} className="text-[0.5rem] uppercase hover:text-bronze">Contact</button>
              </div>
          </div>
      </footer>

    </div>
  );
};

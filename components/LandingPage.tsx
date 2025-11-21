
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Language, Product } from '../types';
import { TRANSLATIONS, BOOK_CHAPTERS, RESTORATION_LOGS, PRODUCTS, LANDING_CONTENT, BLOG_POSTS } from '../constants';
import { ShoppingBag, Check, Star, ArrowRight, Quote, Compass, Shield, Layers, ArrowLeft, BookOpen, Box, ScanLine, QrCode, X } from './Icons';
import { BookCover } from './BookCover';

interface LandingPageProps {
  lang: Language;
  setView: (view: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setView }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [qrItem, setQrItem] = useState<{id: string, title: string, desc: string, linkedName?: string, linkedType?: string} | null>(null);

  const bookProduct = PRODUCTS.find(p => p.category === 'book');
  const cardProduct = PRODUCTS.find(p => p.id === 'kit_cards_30');

  const handleBuyBook = () => {
    setShowUpsell(true);
  };

  const finalizePurchase = (withUpsell: boolean) => {
      setCartNotification(withUpsell ? (isAr ? 'تمت إضافة الكتاب + البطاقات' : 'Book + Cards Added') : (isAr ? 'تمت إضافة الكتاب' : 'Book Added'));
      setTimeout(() => {
          setCartNotification(null);
          setShowUpsell(false);
      }, 3000);
  };
  
  const generateQrUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=2B2B2B&bgcolor=F2F0EB`;
  };

  return (
    <div className="bg-alabaster dark:bg-[#050505] min-h-screen overflow-x-hidden selection:bg-bronze selection:text-white">
      
      {/* Minimal Landing Nav */}
      <nav className="fixed top-0 w-full z-50 bg-alabaster/90 dark:bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-6 py-4">
          <button onClick={() => setView('home')} className={`text-xl font-bold text-charcoal dark:text-concrete ${headingFont}`}>
            {isAr ? 'عمارة الإنسان' : 'HUMAN ARCH.'}
          </button>
          <div className="flex items-center gap-4">
             <span className="hidden md:block text-xs text-slate uppercase tracking-widest">{isAr ? 'النسخة الأولى' : 'First Edition'}</span>
             <button onClick={handleBuyBook} className="bg-bronze text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors font-bold">
                {isAr ? 'شراء' : 'Buy'}
             </button>
          </div>
      </nav>

      {/* RE-ARCHITECTED HERO SECTION */}
      <header className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-[#0a0a0a]">
         
         {/* Ambient Background */}
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent"></div>
            {/* Architectural Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
                 
                 {/* Left Column: The Argument (Copy) */}
                 <motion.div 
                    initial={{ opacity: 0, x: isAr ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full lg:w-1/2 text-center lg:text-start"
                 >
                     <div className={`inline-flex items-center gap-2 border border-bronze/30 bg-bronze/10 px-3 py-1 mb-6 backdrop-blur-sm ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
                         <span className="w-2 h-2 bg-bronze rounded-full animate-pulse"></span>
                         <span className="text-bronze text-[0.6rem] uppercase tracking-[0.2em] font-bold">
                            {LANDING_CONTENT.hero.badge[lang]}
                         </span>
                     </div>
                     
                     <h1 className={`text-5xl md:text-7xl text-alabaster mb-6 leading-tight ${headingFont}`}>
                        {LANDING_CONTENT.hero.headline[lang]}
                     </h1>

                     <p className={`text-lg text-slate/60 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed ${bodyFont}`}>
                        {LANDING_CONTENT.hero.subheadline[lang]}
                     </p>

                     {/* Pricing & CTA */}
                     <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                         <div className="text-center sm:text-start">
                             <span className="block text-xs text-slate uppercase tracking-widest line-through opacity-50">$65.00</span>
                             <span className="block text-3xl text-white font-serif">$45.00</span>
                         </div>
                         <button 
                            onClick={handleBuyBook}
                            className="group relative px-8 py-4 bg-white text-charcoal overflow-hidden transition-all hover:bg-bronze hover:text-white min-w-[200px]"
                         >
                            <span className={`relative z-10 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3`}>
                               {isAr ? 'اقتناء المخطط' : 'Acquire Blueprint'} <ShoppingBag size={16} />
                            </span>
                         </button>
                     </div>

                     {/* Trust Indicators */}
                     <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate/40">
                         <div className="flex items-center gap-2">
                             <Shield size={14} />
                             <span className="text-[0.6rem] uppercase tracking-widest">{isAr ? 'ضمان ٣٠ يوم' : '30-Day Guarantee'}</span>
                         </div>
                         <div className="w-px h-4 bg-white/10"></div>
                         <div className="flex items-center gap-2">
                             <Box size={14} />
                             <span className="text-[0.6rem] uppercase tracking-widest">{isAr ? 'شحن دولي' : 'Worldwide Shipping'}</span>
                         </div>
                     </div>
                 </motion.div>

                 {/* Right Column: The Artifact (Book Visual) */}
                 <motion.div 
                    style={{ y: yParallax }}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full lg:w-1/2 perspective-1000"
                 >
                    <div className="relative w-full max-w-md mx-auto lg:mr-0 group">
                        
                        {/* Glow Effect Behind Book */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-bronze/10 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        {/* The Book Container */}
                        <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-4">
                            <BookCover className="w-full shadow-[20px_30px_50px_rgba(0,0,0,0.8)] rounded-sm" />
                            
                            {/* Reflection/Sheen */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        </div>

                        {/* Floating Specs Labels */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className={`absolute top-10 ${isAr ? 'right-[-20px]' : 'left-[-40px]'} bg-[#1a1a1a]/90 backdrop-blur border border-white/10 p-3 shadow-xl hidden md:block`}
                        >
                            <div className="flex items-center gap-3">
                                <Layers size={16} className="text-bronze" />
                                <div>
                                    <span className="block text-[0.5rem] uppercase tracking-widest text-slate">Material</span>
                                    <span className={`block text-xs text-white ${headingFont}`}>Premium Linen</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className={`absolute bottom-20 ${isAr ? 'left-[-20px]' : 'right-[-40px]'} bg-[#1a1a1a]/90 backdrop-blur border border-white/10 p-3 shadow-xl hidden md:block`}
                        >
                            <div className="flex items-center gap-3">
                                <ScanLine size={16} className="text-bronze" />
                                <div>
                                    <span className="block text-[0.5rem] uppercase tracking-widest text-slate">Pages</span>
                                    <span className={`block text-xs text-white ${headingFont}`}>340 Structural Pages</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                 </motion.div>
             </div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
             <span className="text-[0.5rem] uppercase tracking-[0.3em] text-white">Scroll to Inspect</span>
             <div className="w-px h-8 bg-white"></div>
         </div>
      </header>

      {/* THE PROBLEM (THE CRACK) */}
      <section className="py-32 bg-alabaster dark:bg-[#161616] relative border-t border-white/5">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none architectural-grid"></div>
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
               <div className="w-full md:w-1/2">
                  <div className="relative border-l-4 border-bronze pl-8 py-4">
                     <h2 className={`text-4xl md:text-5xl text-charcoal dark:text-concrete mb-6 ${headingFont}`}>
                        {LANDING_CONTENT.problem.title[lang]}
                     </h2>
                     <p className={`text-xl text-slate leading-relaxed ${bodyFont}`}>
                        {LANDING_CONTENT.problem.text[lang]}
                     </p>
                  </div>
               </div>
               <div className="w-full md:w-1/2">
                  {/* Abstract Visualization of a Crack */}
                  <div className="aspect-square bg-white dark:bg-black border border-slate/10 relative overflow-hidden shadow-2xl p-8 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cracked-concrete.png')] opacity-20"></div>
                      <motion.div 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="w-full h-full relative"
                      >
                          <svg viewBox="0 0 200 200" className="w-full h-full stroke-bronze fill-none stroke-[1]">
                              <path d="M100,0 L110,40 L90,60 L120,100 L80,130 L100,200" />
                          </svg>
                      </motion.div>
                      <div className="absolute bottom-4 text-center w-full">
                          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-slate">Fig 1. Structural Failure</span>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* THE INDEX (Interactive Blueprints) */}
      <section className="py-32 bg-white dark:bg-[#111] border-t border-slate/10">
         <div className="container mx-auto px-6">
            <div className="text-center mb-20">
               <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-4">The Specification</span>
               <h2 className={`text-4xl md:text-6xl text-charcoal dark:text-concrete ${headingFont}`}>
                  {isAr ? 'فهرس المخطط' : 'Blueprint Index'}
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
               {BOOK_CHAPTERS.map((chapter, idx) => (
                  <motion.div 
                    key={chapter.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`border border-slate/10 p-6 cursor-pointer transition-all duration-300 hover:border-bronze group ${expandedChapter === chapter.id ? 'bg-alabaster dark:bg-[#1a1a1a] border-bronze' : 'bg-transparent'}`}
                    onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                  >
                     <div className="flex justify-between items-start">
                        <div>
                           <span className="text-bronze text-xs font-bold tracking-widest block mb-2">CH.{chapter.number}</span>
                           <h3 className={`text-xl ${headingFont} text-charcoal dark:text-concrete mb-2`}>{chapter.title[lang]}</h3>
                        </div>
                        <div className={`transform transition-transform duration-300 ${expandedChapter === chapter.id ? 'rotate-90 text-bronze' : 'text-slate'}`}>
                           <ArrowRight size={18} />
                        </div>
                     </div>
                     
                     <AnimatePresence>
                        {expandedChapter === chapter.id && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden"
                           >
                              <p className={`mt-4 text-slate text-sm leading-relaxed ${bodyFont} border-t border-slate/10 pt-4`}>
                                 {chapter.desc[lang]} 
                                 <br/><br/>
                                 <span className="italic opacity-70">
                                    {isAr ? '"هذا الفصل يعيد تعريف المفهوم الهندسي لـ..."' : '"This chapter redefines the structural concept of..."'}
                                 </span>
                              </p>

                              {/* QR CODE SECTION for Book Integration */}
                              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate/10 bg-bronze/5 -mx-6 -mb-6 p-4">
                                 <div 
                                    className="bg-white p-2 border border-slate/10 shadow-sm cursor-zoom-in"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const relatedArt = PRODUCTS.find(p => p.id === chapter.relatedArtId);
                                        const relatedBlog = BLOG_POSTS.find(b => b.id === chapter.relatedBlogId);
                                        
                                        setQrItem({
                                            id: chapter.id,
                                            title: chapter.title['en'],
                                            desc: isAr 
                                             ? `مسح للوصول إلى المحتوى الرقمي المرتبط.` 
                                             : `Scan to access linked digital content.`,
                                            linkedName: relatedArt?.name[lang] || relatedBlog?.title[lang],
                                            linkedType: relatedArt ? (isAr ? 'عمل فني' : 'Art Piece') : (isAr ? 'مقال' : 'Journal Entry')
                                        });
                                    }}
                                 >
                                     <img 
                                        src={generateQrUrl(`https://humanarchitecture.com/ch/${chapter.id}`)} 
                                        alt="QR" 
                                        className="w-12 h-12 mix-blend-multiply" 
                                     />
                                 </div>
                                 <div>
                                     <div className="flex items-center gap-2 text-bronze text-[0.6rem] uppercase tracking-widest font-bold mb-1">
                                         <QrCode size={12} />
                                         <span>{isAr ? 'ملحق رقمي' : 'Digital Extension'}</span>
                                     </div>
                                     <p className="text-xs text-slate max-w-xs">
                                         {chapter.relatedArtId 
                                            ? (isAr ? 'امسح للوصول للعمل الفني المرتبط بهذا الفصل.' : 'Scan to view the architectural art for this chapter.') 
                                            : (chapter.relatedBlogId 
                                                ? (isAr ? 'امسح لقراءة مقالات تفصيلية.' : 'Scan to read detailed journal entries.') 
                                                : (isAr ? 'امسح للوصول للشرح الصوتي.' : 'Scan for audio commentary.'))
                                         }
                                     </p>
                                 </div>
                                 <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const relatedArt = PRODUCTS.find(p => p.id === chapter.relatedArtId);
                                        const relatedBlog = BLOG_POSTS.find(b => b.id === chapter.relatedBlogId);
                                        
                                        setQrItem({
                                            id: chapter.id,
                                            title: chapter.title['en'],
                                            desc: isAr 
                                             ? `مسح للوصول إلى المحتوى الرقمي المرتبط.` 
                                             : `Scan to access linked digital content.`,
                                            linkedName: relatedArt?.name[lang] || relatedBlog?.title[lang],
                                            linkedType: relatedArt ? (isAr ? 'عمل فني' : 'Art Piece') : (isAr ? 'مقال' : 'Journal Entry')
                                        });
                                    }}
                                    className="ml-auto w-8 h-8 flex items-center justify-center text-slate hover:text-bronze transition-colors"
                                 >
                                     <ScanLine size={16} />
                                 </button>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* TESTIMONIALS (Site Inspections) */}
      <section className="py-32 bg-charcoal text-alabaster relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
             <div className="flex items-center gap-4 mb-16">
                 <div className="w-12 h-1 bg-bronze"></div>
                 <span className="text-xs tracking-[0.3em] uppercase">Site Inspections</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {RESTORATION_LOGS.map((log, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors">
                         <div className="flex gap-1 text-bronze mb-6">
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                         </div>
                         <p className={`text-lg italic mb-8 leading-relaxed opacity-90 ${bodyFont}`}>
                             "{log.report[lang]}"
                         </p>
                         <div>
                             <div className={`font-bold text-xl ${headingFont}`}>{log.name[lang]}</div>
                             <div className="text-xs uppercase tracking-widest opacity-50 mt-1">{log.role[lang]}</div>
                         </div>
                     </div>
                 ))}
                 {/* Static Review */}
                  <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors">
                         <div className="flex gap-1 text-bronze mb-6">
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                             <Star size={14} fill="currentColor" />
                         </div>
                         <p className={`text-lg italic mb-8 leading-relaxed opacity-90 ${bodyFont}`}>
                             {isAr 
                              ? '"لم أكن أقرأ كتاباً، كنت أقرأ خارطة لنفسي. لأول مرة أفهم لماذا أشعر بالثقل. التمارين عملية وقاسية لكنها حقيقية."'
                              : '"I wasn\'t reading a book, I was reading a map of myself. For the first time, I understand why I feel the weight. The exercises are practical, brutal, but real."'}
                         </p>
                         <div>
                             <div className={`font-bold text-xl ${headingFont}`}>{isAr ? 'سارة م.' : 'Sarah M.'}</div>
                             <div className="text-xs uppercase tracking-widest opacity-50 mt-1">{isAr ? 'مهندسة ديكور' : 'Interior Designer'}</div>
                         </div>
                     </div>
             </div>
         </div>
      </section>

      {/* UPSELL SECTION (The Toolkit) */}
      <section className="py-32 bg-[#f8f8f8] dark:bg-[#0a0a0a] border-t border-slate/10">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="w-full lg:w-1/2">
                      <div className="relative">
                          <div className="absolute top-0 left-0 w-full h-full bg-bronze/20 blur-3xl rounded-full"></div>
                          <img 
                            src={cardProduct?.image} 
                            alt="Cards" 
                            className="relative z-10 w-full shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700" 
                          />
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                      <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-4">
                          {LANDING_CONTENT.upsell.title[lang]}
                      </span>
                      <h2 className={`text-4xl md:text-5xl mb-6 text-charcoal dark:text-concrete ${headingFont}`}>
                          {cardProduct?.name[lang]}
                      </h2>
                      <p className={`text-xl text-slate mb-8 leading-relaxed ${bodyFont}`}>
                          {LANDING_CONTENT.upsell.desc[lang]}
                      </p>
                      
                      <ul className="space-y-4 mb-12">
                          {[
                              isAr ? '٣٠ بطاقة مهام يومية صلبة' : '30 Heavy-Duty Daily Task Cards',
                              isAr ? 'توجيهات بصرية معمارية' : 'Architectural Visual Prompts',
                              isAr ? 'صندوق فاخر للحفظ' : 'Premium Archival Box'
                          ].map((item, i) => (
                              <li key={i} className="flex items-center gap-4 text-charcoal dark:text-concrete">
                                  <div className="w-6 h-6 rounded-full bg-bronze/20 text-bronze flex items-center justify-center">
                                      <Check size={14} />
                                  </div>
                                  <span className={`text-sm uppercase tracking-wider ${bodyFont}`}>{item}</span>
                              </li>
                          ))}
                      </ul>

                      <div className="p-6 border border-bronze bg-bronze/5">
                          <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold uppercase tracking-widest text-bronze">{LANDING_CONTENT.upsell.offer[lang]}</span>
                              <span className="line-through text-slate opacity-50">$29</span>
                          </div>
                          <div className="text-3xl font-serif text-charcoal dark:text-concrete">$17 <span className="text-sm font-sans text-slate opacity-60">/ {isAr ? 'مع الكتاب' : 'with book'}</span></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* FOOTER / FINAL CTA */}
      <footer className="bg-[#111] text-white py-24 text-center relative">
          <div className="container mx-auto px-6">
              <h2 className={`text-4xl md:text-6xl mb-8 ${headingFont}`}>
                  {isAr ? 'هل أنت جاهز لاستلام الموقع؟' : 'Ready to Take Over the Site?'}
              </h2>
              <p className={`text-slate max-w-2xl mx-auto mb-12 text-lg ${bodyFont}`}>
                  {isAr ? 'التصميم جاهز. المواد متوفرة. القرار بيدك.' : 'The design is ready. The materials are available. The decision is yours.'}
              </p>
              <button 
                onClick={handleBuyBook}
                className="px-16 py-6 bg-bronze hover:bg-white hover:text-charcoal transition-colors uppercase tracking-[0.2em] font-bold text-sm mb-16"
              >
                  {isAr ? 'اقتناء المخطط (45$)' : 'Acquire Blueprint ($45)'}
              </button>
              
              <div className="text-xs text-slate/30 uppercase tracking-widest">
                  {TRANSLATIONS.footer.copyright[lang]}
              </div>
          </div>
      </footer>

      {/* UPSELL MODAL */}
      <AnimatePresence>
          {showUpsell && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              >
                  <motion.div 
                    initial={{ y: 50 }} animate={{ y: 0 }} 
                    className="bg-alabaster dark:bg-[#1a1a1a] max-w-2xl w-full overflow-hidden shadow-2xl border-t-4 border-bronze relative"
                  >
                      <button 
                        onClick={() => setShowUpsell(false)} 
                        className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-charcoal dark:text-white hover:bg-bronze hover:text-white rounded-full p-2 z-50 transition-all shadow-lg"
                      >
                        <X size={24} />
                      </button>

                      <div className="p-8 md:p-12 text-center">
                          <h3 className={`text-3xl mb-4 text-charcoal dark:text-concrete ${headingFont}`}>
                              {isAr ? 'قبل إتمام الطلب...' : 'Before You Finalize...'}
                          </h3>
                          <p className={`text-slate mb-8 ${bodyFont}`}>
                              {isAr 
                               ? 'معظم البنائين يضيفون صندوق الأدوات (الكروت) لضمان الالتزام بالتنفيذ اليومي.'
                               : 'Most architects add the Toolkit (Cards) to ensure daily execution compliance.'}
                          </p>
                          
                          <div className="flex flex-col gap-4">
                              <button 
                                onClick={() => finalizePurchase(true)}
                                className="w-full py-4 bg-bronze text-white uppercase tracking-widest font-bold hover:bg-charcoal transition-colors flex items-center justify-center gap-4"
                              >
                                  <span>{isAr ? 'نعم، أضف الكروت' : 'Yes, Add the Cards'}</span>
                                  <span className="bg-black/20 px-2 py-1 text-xs rounded">+$17</span>
                              </button>
                              <button 
                                onClick={() => finalizePurchase(false)}
                                className="w-full py-4 border border-slate/20 text-slate hover:text-charcoal dark:hover:text-white uppercase tracking-widest text-xs transition-colors"
                              >
                                  {isAr ? 'لا، أريد الكتاب فقط' : 'No, I only need the Book'}
                              </button>
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* CART TOAST */}
      <AnimatePresence>
        {cartNotification && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                className="fixed bottom-8 right-8 z-[200] bg-charcoal text-white px-6 py-4 shadow-2xl border-l-4 border-bronze flex items-center gap-4"
            >
                <div className="w-8 h-8 rounded-full bg-bronze/20 flex items-center justify-center text-bronze">
                    <Check size={16} />
                </div>
                <div>
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${headingFont}`}>
                        {cartNotification}
                    </h4>
                    <p className="text-[0.65rem] uppercase tracking-widest opacity-60">Redirecting to checkout...</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* QR MODAL */}
      <AnimatePresence>
        {qrItem && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                onClick={() => setQrItem(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                    className="bg-alabaster relative max-w-sm w-full p-8 border-4 border-bronze text-center shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-charcoal border-4 border-bronze shadow-md"></div>
                    <button onClick={() => setQrItem(null)} className="absolute top-2 right-2 text-charcoal/50 hover:text-charcoal"><X /></button>

                    <span className="text-charcoal/40 text-[0.6rem] uppercase tracking-[0.3em] font-mono mb-6 block">
                        PAGE ID: {qrItem.id.toUpperCase()}
                    </span>

                    <div className="bg-white p-4 border border-charcoal/10 inline-block mb-6 shadow-inner">
                        <img 
                            src={generateQrUrl(`https://humanarchitecture.com/link/chapter/${qrItem.id}`)} 
                            alt="QR Code" 
                            className="w-48 h-48 mix-blend-multiply"
                        />
                    </div>

                    <h3 className={`text-xl mb-2 text-charcoal ${headingFont}`}>{qrItem.title}</h3>
                    
                    {qrItem.linkedName && (
                         <div className="mb-4 p-3 bg-bronze/5 border border-bronze/20">
                             <span className="text-[0.5rem] text-bronze uppercase tracking-widest block mb-1">
                                {isAr ? 'روابط' : 'Links To'}: {qrItem.linkedType}
                             </span>
                             <span className={`text-sm font-bold text-charcoal ${headingFont}`}>{qrItem.linkedName}</span>
                         </div>
                    )}

                    <p className={`text-sm text-slate mb-6 ${bodyFont}`}>{qrItem.desc}</p>

                    <div className="flex justify-center gap-4 border-t border-charcoal/10 pt-4">
                         <button className="text-xs text-bronze uppercase tracking-widest font-bold hover:underline">
                             {isAr ? 'فتح المحتوى' : 'Open Content'}
                         </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

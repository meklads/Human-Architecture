
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Product, DayPlan } from '../types';
import { PRODUCTS, TRANSLATIONS, THIRTY_DAY_PROGRAM, BOOK_CHAPTERS, THEORY_CARDS } from '../constants';
import { ShoppingBag, Shield, Box, X, Compass, ScanLine, QrCode, ArrowLeft, ArrowRight, Check, Eye, ChevronDown } from './Icons';
import { BookCover } from './BookCover';

interface LibraryPageProps {
  lang: Language;
  onCheckout?: (items: Product[]) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ lang, onCheckout }) => {
  const [selectedArt, setSelectedArt] = useState<Product | null>(null);
  const [bookFormat, setBookFormat] = useState<'hardcover' | 'digital' | 'audio'>('hardcover');
  
  // Cart State - Now used to trigger Checkout
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  // QR Modal State
  const [qrItem, setQrItem] = useState<{id: string, title: string, type: 'chapter' | 'art', desc: string} | null>(null);

  // Card Deck Modal State
  const [showDeck, setShowDeck] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeDeck, setActiveDeck] = useState<DayPlan[]>([]);
  const [deckTitle, setDeckTitle] = useState('');

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  const artProducts = PRODUCTS.filter(p => p.category === 'art');
  const bookProduct = PRODUCTS.find(p => p.category === 'book');
  const toolProducts = PRODUCTS.filter(p => p.category === 'tool');

  // Flatten the week plan into a single array of days for the deck viewer
  const thirtyDayDeck: DayPlan[] = THIRTY_DAY_PROGRAM.flatMap(week => week.days);

  // Open Deck Handler
  const openDeck = (productId: string) => {
      if (productId === 'kit_cards_30') {
          setActiveDeck(thirtyDayDeck);
          setDeckTitle(isAr ? 'برنامج ٣٠ يوماً' : '30-Day Program');
      } else if (productId === 'kit_cards_theory') {
          setActiveDeck(THEORY_CARDS);
          setDeckTitle(isAr ? 'الفلسفة المعمارية' : 'Architectural Philosophy');
      }
      setCurrentCardIndex(0);
      setShowDeck(true);
  };

  // Handle Purchase -> Redirect to Checkout
  const handlePurchase = (product: Product) => {
    // Modify product based on selected format if it's the book
    let finalProduct = { ...product };
    if (product.id === 'book_1') {
       if (bookFormat === 'digital') finalProduct = { ...product, price: 25, name: { ...product.name, en: `${product.name['en']} (Digital)`, ar: `${product.name['ar']} (رقمي)` } };
       if (bookFormat === 'audio') finalProduct = { ...product, price: 30, name: { ...product.name, en: `${product.name['en']} (Audio)`, ar: `${product.name['ar']} (صوتي)` } };
    }

    if (onCheckout) {
        onCheckout([finalProduct]);
    } else {
        // Fallback for demo
        setCartNotification(product.name[lang]);
        setTimeout(() => setCartNotification(null), 3500);
    }
  };

  const generateQrUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=2B2B2B&bgcolor=F2F0EB`;
  };

  // Navigation for Deck
  const nextCard = () => setCurrentCardIndex(prev => (prev + 1) % activeDeck.length);
  const prevCard = () => setCurrentCardIndex(prev => (prev - 1 + activeDeck.length) % activeDeck.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-alabaster dark:bg-[#111] text-charcoal dark:text-concrete"
    >
      <div className="container mx-auto px-6">
        
        {/* Store Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto border-b border-slate/10 pb-12">
          <span className="text-bronze text-xs tracking-[0.5em] uppercase block mb-4">The Human Architecture Archive™</span>
          <h1 className={`text-5xl md:text-7xl mb-6 ${headingFont}`}>
            {isAr ? 'معرض المخططات' : 'Blueprint Gallery'}
          </h1>
          <p className={`text-slate ${bodyFont} text-lg`}>
            {isAr 
             ? 'أعمال فنية معمارية مستوحاة من الأعمدة الأربعة. صممت لتكون تذكيراً دائماً في مساحتك الخاصة.' 
             : 'Premium wall-art printables inspired by the Four Pillars. Designed to elevate your space and strengthen your inner architecture.'}
          </p>
        </div>

        {/* FEATURED: THE BOOK */}
        {bookProduct && (
        <div className="mb-32 bg-white dark:bg-white/5 border border-slate/10 hover:border-bronze/40 p-8 md:p-12 relative overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(197,160,101,0.15)] transition-all duration-700">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none architectural-grid"></div>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="w-full lg:w-1/3">
                    <div 
                        className="relative shadow-2xl border-4 border-white dark:border-charcoal/50 group cursor-zoom-in"
                        onClick={() => setSelectedArt(bookProduct)}
                    >
                        <BookCover className="w-full shadow-2xl transform group-hover:scale-105 transition-transform duration-700" />
                        
                        {/* Book Badge */}
                         <div className="absolute top-4 right-4 bg-bronze text-white text-xs px-3 py-1 tracking-widest font-bold shadow-lg z-20">
                            BESTSELLER
                        </div>
                        
                        {/* Zoom Hint */}
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] z-30">
                             <div className="bg-alabaster text-charcoal rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
                                 <Eye size={20} />
                             </div>
                         </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3">
                    <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-2">The Manual</span>
                    <h2 className={`text-4xl md:text-5xl mb-6 ${headingFont}`}>{bookProduct.name[lang]}</h2>
                    <p className={`text-lg text-slate mb-8 leading-relaxed ${bodyFont}`}>
                        {bookProduct.description?.[lang]}
                    </p>
                    
                    {/* Format Selection */}
                    <div className="flex flex-wrap gap-4 mb-8 border-b border-slate/10 pb-8">
                        <button 
                            onClick={() => setBookFormat('hardcover')}
                            className={`flex-1 min-w-[120px] p-4 border transition-all ${bookFormat === 'hardcover' ? 'border-bronze bg-bronze/5' : 'border-slate/20 opacity-60 hover:opacity-100'}`}
                        >
                            <span className="block text-xs uppercase tracking-widest text-slate mb-1">{isAr ? 'مطبوع فاخر' : 'Hardcover'}</span>
                            <span className={`block text-xl ${headingFont}`}>$45</span>
                        </button>
                        <button 
                            onClick={() => setBookFormat('digital')}
                            className={`flex-1 min-w-[120px] p-4 border transition-all ${bookFormat === 'digital' ? 'border-bronze bg-bronze/5' : 'border-slate/20 opacity-60 hover:opacity-100'}`}
                        >
                            <span className="block text-xs uppercase tracking-widest text-slate mb-1">{isAr ? 'رقمي (PDF)' : 'Digital (PDF)'}</span>
                            <span className={`block text-xl ${headingFont}`}>$25</span>
                        </button>
                         <button 
                            onClick={() => setBookFormat('audio')}
                            className={`flex-1 min-w-[120px] p-4 border transition-all ${bookFormat === 'audio' ? 'border-bronze bg-bronze/5' : 'border-slate/20 opacity-60 hover:opacity-100'}`}
                        >
                            <span className="block text-xs uppercase tracking-widest text-slate mb-1">{isAr ? 'صوتي' : 'Audiobook'}</span>
                            <span className={`block text-xl ${headingFont}`}>$30</span>
                        </button>
                    </div>

                    <div className="flex gap-4 mb-12">
                        <button 
                            onClick={() => handlePurchase(bookProduct)}
                            className="px-12 py-5 bg-charcoal dark:bg-alabaster text-white dark:text-charcoal uppercase tracking-[0.2em] text-sm font-bold hover:bg-bronze dark:hover:bg-bronze hover:text-white transition-all shadow-xl flex-1 md:flex-none"
                        >
                            {isAr ? 'شراء المخطط' : 'Acquire Blueprint'}
                        </button>
                    </div>

                    {/* Chapter Preview */}
                    <div>
                        <h4 className={`text-xl mb-6 border-b border-slate/10 pb-2 ${headingFont} flex items-center gap-2`}>
                            <Compass size={20} className="text-bronze" />
                            {isAr ? 'مخطط المحتوى' : 'Chapter Blueprints'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {BOOK_CHAPTERS.map((chapter) => (
                                <div key={chapter.id} className={`p-4 border ${chapter.isLocked ? 'border-slate/10 opacity-60' : 'border-bronze/30 bg-bronze/5'} transition-colors relative group hover:border-bronze`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-bold tracking-widest ${chapter.isLocked ? 'text-slate' : 'text-bronze'}`}>CH.{chapter.number}</span>
                                        <div className="flex gap-2">
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setQrItem({ 
                                                id: chapter.id, 
                                                title: `${isAr ? 'الفصل' : 'Chapter'} ${chapter.number}: ${chapter.title['en']}`, 
                                                type: 'chapter',
                                                desc: isAr 
                                                  ? `مسح للوصول إلى الشرح الصوتي والمصادر.` 
                                                  : `Scan to access Audio Commentary & Resources.`
                                              });
                                            }}
                                            className="text-slate hover:text-bronze transition-colors"
                                          >
                                            <QrCode size={14} />
                                          </button>
                                          {chapter.isLocked && <Shield size={12} className="text-slate/40" />}
                                        </div>
                                    </div>
                                    <h5 className={`text-lg mb-1 ${headingFont}`}>{chapter.title[lang]}</h5>
                                    <p className="text-xs text-slate line-clamp-1">{chapter.desc[lang]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}

        {/* ART GALLERY */}
        <div className="mb-32">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate/10 pb-6">
                 <div>
                    <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-4">
                        {isAr ? 'المجموعة الفنية' : 'The Art Collection'}
                    </span>
                    <h3 className={`text-4xl ${headingFont}`}>
                        {isAr ? 'لوحات الحائط المعمارية' : 'Architectural Wall Art'}
                    </h3>
                 </div>
                 <div className="text-slate text-sm max-w-md text-right mt-4 md:mt-0 italic opacity-60">
                    {isAr ? 'لوحات مجزّأة (Triptych/Quadriptych) بجودة متاحف.' : 'Museum-grade split-panel sets (Triptych/Quadriptych).'}
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {artProducts.map((art) => (
                    <div key={art.id} className="group flex flex-col h-full bg-white dark:bg-[#1a1a1a] border border-slate/5 hover:border-bronze/40 shadow-lg hover:shadow-[0_0_30px_rgba(197,160,101,0.15)] transition-all duration-500 relative">
                        <div className="relative mb-6 p-4 border-b border-slate/10">
                            
                            {/* Render Panels Simulation */}
                            <div 
                                className={`w-full h-64 flex gap-[2px] bg-[#e5e5e5] dark:bg-[#0a0a0a] shadow-inner relative cursor-pointer overflow-hidden`}
                                onClick={() => setSelectedArt(art)}
                            >
                                {Array.from({ length: art.panels || 1 }).map((_, idx) => (
                                    <div key={idx} className="flex-1 h-full relative overflow-hidden bg-white dark:bg-black shadow-sm first:ml-0 last:mr-0">
                                        <img 
                                            src={art.image} 
                                            alt={`${art.name[lang]} panel ${idx+1}`} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.1] group-hover:scale-100" 
                                            style={{ objectPosition: art.panels && art.panels > 1 ? `${(idx / (art.panels - 1)) * 100}% center` : 'center' }}
                                        />
                                        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                                    </div>
                                ))}
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setQrItem({
                                            id: art.id,
                                            title: art.name['en'],
                                            type: 'art',
                                            desc: isAr ? 'امسح للاستماع لقصة اللوحة.' : 'Scan to hear the story of this structure.'
                                        })}}
                                        className="w-10 h-10 rounded-full bg-alabaster text-charcoal flex items-center justify-center hover:bg-bronze hover:text-white transition-colors transform scale-0 group-hover:scale-100 delay-100 duration-300"
                                    >
                                        <QrCode size={18} />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedArt(art); }}
                                        className="w-10 h-10 rounded-full bg-alabaster text-charcoal flex items-center justify-center hover:bg-bronze hover:text-white transition-colors transform scale-0 group-hover:scale-100 duration-300"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className={`text-xl ${headingFont} group-hover:text-bronze transition-colors cursor-pointer`} onClick={() => setSelectedArt(art)}>{art.name[lang]}</h4>
                                <span className="text-bronze font-serif text-xl">${art.price}</span>
                            </div>
                            <p className={`text-sm text-slate mb-8 line-clamp-2 ${bodyFont}`}>{art.description?.[lang]}</p>
                            
                            <button 
                                onClick={() => handlePurchase(art)}
                                className="w-full py-4 mt-auto bg-charcoal text-white hover:bg-bronze transition-colors duration-300 uppercase text-xs tracking-[0.2em] font-bold flex items-center justify-center gap-3 shadow-md"
                            >
                                <ShoppingBag size={16} />
                                {isAr ? 'اقتناء اللوحة' : 'Acquire'}
                            </button>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* TOOLS & CARDS */}
        <div className="mb-24 border-t border-slate/10 pt-24">
             <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto">
                 {toolProducts.map((tool) => (
                    <div key={tool.id} className="w-full md:w-1/2">
                        <div className="bg-charcoal text-alabaster p-8 md:p-12 shadow-2xl relative overflow-hidden group border border-slate/20 hover:border-bronze/50 transition-colors h-full flex flex-col">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="absolute bottom-0 right-0 w-32 h-40 bg-white/5 rotate-12 translate-y-10 translate-x-10 border border-white/10"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-40 bg-white/5 rotate-6 translate-y-6 translate-x-6 border border-white/10"></div>

                            <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-4">{isAr ? 'أدوات' : 'Tools'}</span>
                            <h3 className={`text-3xl mb-4 ${headingFont}`}>{tool.name[lang]}</h3>
                            <p className={`text-slate/60 mb-8 ${bodyFont}`}>{tool.description?.[lang]}</p>
                            <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                                <button 
                                onClick={() => openDeck(tool.id)}
                                className="px-6 py-3 bg-white text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-bronze hover:text-white transition-colors flex-1"
                                >
                                    {isAr ? 'عرض رقمي' : 'View Deck'}
                                </button>
                                <button 
                                onClick={() => handlePurchase(tool)}
                                className="px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:border-bronze transition-colors"
                                >
                                    {isAr ? 'شراء' : 'Buy'}
                                </button>
                            </div>
                        </div>
                    </div>
                 ))}
             </div>
        </div>

      </div>

      {/* --- MODALS --- */}
      
      <AnimatePresence>
        {cartNotification && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                className="fixed bottom-8 right-8 z-[200] bg-charcoal text-white px-6 py-4 shadow-2xl border-l-4 border-bronze flex items-center gap-4"
            >
                <div className="w-8 h-8 rounded-full bg-bronze/20 flex items-center justify-center text-bronze"><Check size={16} /></div>
                <div>
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${headingFont}`}>{isAr ? 'تمت الإضافة للسلة' : 'Added to Cart'}</h4>
                    <p className={`text-xs text-white/70 ${bodyFont}`}>{cartNotification}</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {qrItem && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                onClick={() => setQrItem(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                    className="bg-alabaster relative max-w-sm w-full p-8 border-4 border-bronze text-center shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setQrItem(null)} className="absolute top-2 right-2 text-charcoal/50 hover:text-charcoal"><X /></button>
                    <span className="text-charcoal/40 text-[0.6rem] uppercase tracking-[0.3em] font-mono mb-6 block">TAG ID: {qrItem.id.toUpperCase()}</span>
                    <div className="bg-white p-4 border border-charcoal/10 inline-block mb-6 shadow-inner">
                        <img src={generateQrUrl(`https://humanarchitecture.com/link/${qrItem.type}/${qrItem.id}`)} alt="QR Code" className="w-48 h-48 mix-blend-multiply" />
                    </div>
                    <h3 className={`text-xl mb-2 text-charcoal ${headingFont}`}>{qrItem.title}</h3>
                    <div className="flex justify-center gap-4 border-t border-charcoal/10 pt-4">
                         <button className="text-xs text-bronze uppercase tracking-widest font-bold">{isAr ? 'فتح' : 'Open'}</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* ROOM MOCKUP MODAL - With Native BookCover */}
      <AnimatePresence>
        {selectedArt && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
                onClick={() => setSelectedArt(null)}
            >
                <div className="relative w-full max-w-6xl h-[80vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedArt(null)} className="absolute top-0 right-0 text-white/50 hover:text-white p-4 z-50"><X size={32} /></button>
                    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none"></div>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            className="relative z-10 max-w-[90%] md:max-w-[80%] max-h-[60%] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
                        >
                            {selectedArt.category === 'book' ? (
                                <div className="bg-transparent p-1 md:p-2 shadow-2xl h-[50vh] aspect-[2/3]">
                                    <BookCover className="w-full h-full transform scale-110" />
                                </div>
                            ) : (
                                <img src={selectedArt.image} className="h-[25vh] md:h-[50vh] object-cover" />
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* CARD DECK VIEWER MODAL */}
      <AnimatePresence>
          {showDeck && activeDeck.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col items-center justify-center p-4"
              >
                  <button onClick={() => setShowDeck(false)} className="absolute top-6 right-6 text-white/50 hover:text-white"><X size={32} /></button>
                  <div className="text-center mb-8">
                      <span className="text-bronze text-xs uppercase tracking-[0.3em]">{deckTitle}</span>
                      <div className="text-slate text-[0.6rem] font-mono mt-2">CARD {currentCardIndex + 1} / {activeDeck.length}</div>
                  </div>

                  <div className="relative w-full max-w-sm aspect-[3/4]">
                      <AnimatePresence mode='wait'>
                          <motion.div 
                            key={currentCardIndex}
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: -90 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-alabaster text-charcoal p-8 border-[12px] border-white shadow-2xl flex flex-col items-center text-center justify-between"
                          >
                              <div className="w-16 h-16 bg-charcoal text-bronze rounded-full flex items-center justify-center text-xl font-bold font-serif mb-4">
                                  {activeDeck[currentCardIndex].day}
                              </div>
                              <div>
                                  <h3 className={`text-2xl mb-4 ${headingFont}`}>{activeDeck[currentCardIndex].title[lang]}</h3>
                                  <div className="w-8 h-1 bg-bronze mx-auto mb-4"></div>
                                  <p className={`text-sm leading-relaxed ${bodyFont}`}>
                                      {activeDeck[currentCardIndex].task[lang]}
                                  </p>
                              </div>
                              <div className="border-t border-slate/20 pt-4 w-full">
                                  <span className="text-[0.5rem] uppercase tracking-widest text-slate block mb-1">Visual Concept</span>
                                  <div className="text-xs font-bold text-bronze">{activeDeck[currentCardIndex].visualConcept?.[lang]}</div>
                              </div>
                          </motion.div>
                      </AnimatePresence>
                      
                      {/* Navigation Arrows */}
                      <button onClick={prevCard} className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"><ArrowLeft size={40} /></button>
                      <button onClick={nextCard} className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"><ArrowRight size={40} /></button>
                  </div>

                  <div className="mt-8 text-white/30 text-xs uppercase tracking-widest flex gap-8">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-bronze rounded-full"></div> Flip Card</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-500 rounded-full"></div> Next</span>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

    </motion.div>
  );
};

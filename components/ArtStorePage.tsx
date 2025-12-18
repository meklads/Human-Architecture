
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Language, Product } from '../types';
import { ART_PRODUCTS } from '../constants';
import { ShoppingBag, X, Check, Maximize2, Compass, Sparkles, Loader2, Wand2 } from './Icons';

interface ArtStorePageProps {
  lang: Language;
  onCheckout?: (items: Product[]) => void;
}

// Helper: Convert URL to Base64 for Gemini with robust error handling
async function urlToBase64(url: string): Promise<string> {
  try {
    // Attempt to fetch with CORS mode enabled
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Strip the data:image/xyz;base64, prefix
        const cleanBase64 = base64data.split(',')[1];
        resolve(cleanBase64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Image load failed (likely CORS), falling back to text description generation.", e);
    return "";
  }
}

// 🏛️ UPDATED: Museum Piece - Dark Mode Only, No White Frames
const MuseumPiece = ({ art, onClick, lang }: { art: Product, onClick: () => void, lang: Language }) => {
    return (
        <div 
            onClick={onClick}
            className="group relative cursor-pointer flex flex-col items-center"
        >
            {/* 1. LIGHTING EFFECT (The Spotlight) */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,rgba(197,160,101,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>

            {/* 2. THE MASTERPIECE CONTAINER - Floating Dark Style */}
            <motion.div 
                layoutId={art.id}
                className="relative z-10 w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Frameless / Floating Effect */}
                <div className="relative bg-[#050505]">
                    <img 
                        src={art.image} 
                        alt={art.name[lang]} 
                        className="w-full h-auto object-cover filter contrast-[1.1] brightness-[0.85] group-hover:brightness-100 transition-all duration-1000" 
                    />
                    
                    {/* Dark Side Borders to simulate depth */}
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10 opacity-50"></div>
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-black opacity-80"></div>
                    
                    {/* Varnish Reflection (Subtle Sheen) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                </div>
            </motion.div>

            {/* 3. THE DARK LABEL */}
            <div className="mt-8 relative z-10 flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex flex-col items-center">
                    <span className="w-[1px] h-8 bg-gradient-to-b from-[#222] to-transparent mb-2"></span>
                    <h3 className="text-white/80 text-sm tracking-[0.2em] uppercase font-serif mb-1">{art.name[lang]}</h3>
                    <div className="flex gap-3 text-[0.6rem] text-bronze font-mono uppercase">
                        <span>1/1 Unique</span>
                        <span>•</span>
                        <span>${art.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ArtStorePage: React.FC<ArtStorePageProps> = ({ lang, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';
  
  const [selectedArt, setSelectedArt] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('Gallery (100x150cm)'); 
  const [selectedMaterial, setSelectedMaterial] = useState('Museum Canvas');
  
  // AI Mockup State
  const [generatedMockup, setGeneratedMockup] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>("");

  const sizes = ['Estate (70x100cm)', 'Gallery (100x150cm)', 'Palace (150x200cm)'];
  const materials = ['Museum Canvas', 'Brushed Aluminum', 'Acrylic Glass'];

  // Handle AI Generation using gemini-2.5-flash-image
  const generateLuxuryMockup = async () => {
      if (!selectedArt) return;
      setIsGenerating(true);
      setGeneratedMockup(null);
      setGenerationStep(isAr ? "تحميل البيانات..." : "Loading Assets...");

      try {
          // Attempt to load image for editing context
          const base64Image = await urlToBase64(selectedArt.image);
          
          setGenerationStep(isAr ? "تصميم الغرفة..." : "Architecting Room...");

          // Initialize GenAI
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          // Contextual Decor Prompt
          let contextPrompt = "";
          switch(selectedArt.id) {
              case 'art-new-01': 
                  contextPrompt = "a minimalist, dark Japanese Zen luxury living room with a low beige linen sofa and a bonsai tree.";
                  break;
              case 'art-new-02': 
                  contextPrompt = "a high-tech modern executive office with a black leather Corbusier armchair and concrete walls.";
                  break;
              case 'art-new-03': 
                  contextPrompt = "a moody, sophisticated reading corner with a burgundy velvet wingback chair and dark stone walls.";
                  break;
              case 'art-new-04': 
                  contextPrompt = "a classic private library with a Chesterfield leather sofa and dark wood paneling.";
                  break;
              case 'art-new-05': 
                  contextPrompt = "a hyper-modern penthouse living room with a white curved sofa and storm clouds visible through floor-to-ceiling windows.";
                  break;
              default:
                  contextPrompt = "an ultra-luxury palace salon with velvet armchairs and a crystal chandelier.";
          }

          let response;
          
          // STRATEGY A: IMAGE + PROMPT (If we successfully got the base64)
          if (base64Image) {
              const fullPrompt = `A photorealistic interior design photograph. The specific art piece provided in the input image is hanging on the central wall of ${contextPrompt} The lighting is cinematic and dramatic. 8k resolution.`;
              
              response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash-image',
                  contents: {
                      parts: [
                          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
                          { text: fullPrompt }
                      ]
                  }
              });
          } 
          // STRATEGY B: TEXT ONLY FALLBACK (If CORS blocked image load)
          else {
              console.log("Using Text-Only Fallback for Mockup");
              // Use the rich AI Prompt stored in constants plus the decor context
              const artDescription = selectedArt.aiPrompt || selectedArt.description?.en || "Abstract architectural art";
              const fullPrompt = `A photorealistic interior design photograph of ${contextPrompt} On the main wall hangs a large framed art piece described as: "${artDescription}". The lighting is cinematic. 8k resolution.`;
              
              response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash-image',
                  contents: {
                      parts: [
                          { text: fullPrompt }
                      ]
                  }
              });
          }

          // Extract image from response
          if (response.candidates && response.candidates[0].content.parts) {
              for (const part of response.candidates[0].content.parts) {
                  if (part.inlineData) {
                      setGeneratedMockup(`data:image/png;base64,${part.inlineData.data}`);
                      break;
                  }
              }
          }
      } catch (error) {
          console.error("AI Generation Failed", error);
          // Optional: Set an error state to show a toast
      } finally {
          setIsGenerating(false);
          setGenerationStep("");
      }
  };

  const handlePurchase = () => {
      if (onCheckout && selectedArt) {
          const customizedProduct = {
              ...selectedArt,
              name: {
                  ar: `${selectedArt.name.ar} - ${selectedSize} - ${selectedMaterial}`,
                  en: `${selectedArt.name.en} - ${selectedSize} - ${selectedMaterial}`,
                  fr: selectedArt.name.fr
              },
              price: selectedArt.price + (sizes.indexOf(selectedSize) * 300) + (materials.indexOf(selectedMaterial) * 150)
          };
          onCheckout([customizedProduct]);
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-32 min-h-screen bg-[#020202] text-alabaster overflow-x-hidden"
    >
      {/* Atmosphere: Dark Ambient Light */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.3)_0%,rgba(0,0,0,1)_100%)] pointer-events-none"></div>

      {/* Header: Minimalist & Grand */}
      <div className="container mx-auto px-6 mb-24 text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-4 mb-6 opacity-50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-bronze"></div>
              <span className="text-bronze text-[0.5rem] uppercase tracking-[0.4em] font-serif">
                  {isAr ? 'المجموعة الخاصة' : 'PRIVATE COLLECTION'}
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-bronze"></div>
          </div>
          <h1 className={`text-5xl md:text-7xl ${headingFont} text-white/90 tracking-tight leading-tight`}>
              {isAr ? 'متحف البنيان' : 'The Structure Museum'}
          </h1>
          <p className={`text-slate/60 mt-6 max-w-xl mx-auto ${bodyFont} text-sm leading-relaxed tracking-wide`}>
              {isAr 
                ? 'أعمال فنية نادرة، صُممت لتكون حجر الزاوية في مساحتك الخاصة. ليست مجرد لوحات، بل بوابات للعمق.' 
                : 'Rare artifacts designed to be the cornerstone of your sanctuary. Not just paintings, but portals to depth.'}
          </p>
      </div>

      {/* Gallery Hall */}
      <div className="container mx-auto px-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40 max-w-6xl mx-auto">
              {ART_PRODUCTS.map((art, idx) => (
                  <div key={art.id} className={`${idx % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
                      <MuseumPiece 
                        art={art} 
                        lang={lang}
                        onClick={() => { setSelectedArt(art); setGeneratedMockup(null); }} 
                      />
                  </div>
              ))}
          </div>
      </div>

      {/* Luxury Detail Modal (The Viewing Room) */}
      <AnimatePresence>
          {selectedArt && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                // UPDATED: Fixed position outer container with scroll enabled
                className="fixed inset-0 z-[100] bg-black/98 flex justify-center items-start lg:items-center overflow-y-auto"
                onClick={() => setSelectedArt(null)}
              >
                  {/* FIXED CLOSE BUTTON - Ensures accessibility on mobile scroll */}
                  <button 
                    onClick={() => setSelectedArt(null)} 
                    className="fixed top-4 right-4 z-[120] text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg"
                  >
                      <X size={24} strokeWidth={1} />
                  </button>

                  <motion.div 
                    layoutId={selectedArt.id}
                    // UPDATED: min-h-screen for mobile (to push content), windowed height for desktop
                    className="bg-[#050505] w-full max-w-7xl min-h-screen lg:min-h-0 lg:h-[90vh] border border-[#222] shadow-2xl relative flex flex-col lg:flex-row lg:overflow-hidden my-0 lg:my-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                      {/* Left: The Art (Immersion / AI Mockup) */}
                      <div className="w-full lg:w-2/3 bg-[#020202] relative h-[50vh] lg:h-full flex items-center justify-center p-0 lg:p-8 overflow-hidden group shrink-0 border-b border-[#222] lg:border-b-0 lg:border-r">
                          
                          {/* VIEW SWITCHER: Original vs AI - Repositioned for mobile thumb access */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:top-6 lg:left-6 lg:bottom-auto z-50 flex gap-3 p-1 bg-black/60 backdrop-blur rounded-full border border-white/10 w-max max-w-[90%] overflow-x-auto no-scrollbar">
                              <button 
                                onClick={() => setGeneratedMockup(null)}
                                className={`text-[0.6rem] uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap transition-colors ${!generatedMockup ? 'bg-bronze text-white font-bold' : 'text-slate/60 hover:text-white'}`}
                              >
                                  {isAr ? 'الأصل' : 'Original'}
                              </button>
                              <button 
                                onClick={generateLuxuryMockup}
                                disabled={isGenerating}
                                className={`text-[0.6rem] uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 transition-colors ${generatedMockup ? 'bg-bronze text-white font-bold' : 'text-slate/60 hover:text-white hover:bg-white/5'}`}
                              >
                                  <Sparkles size={10} />
                                  {isAr ? 'محاكاة الديكور' : 'Visualize in Room'}
                              </button>
                          </div>

                          {/* CONTENT */}
                          {isGenerating ? (
                              <div className="flex flex-col items-center gap-4 text-bronze animate-pulse">
                                  <Loader2 size={48} className="animate-spin" />
                                  <span className="text-xs uppercase tracking-widest">{generationStep || (isAr ? 'جاري بناء المحاكاة...' : 'Constructing Simulation...')}</span>
                              </div>
                          ) : generatedMockup ? (
                              // AI MOCKUP DISPLAY
                              <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="w-full h-full relative"
                              >
                                  <img 
                                    src={generatedMockup} 
                                    className="w-full h-full object-cover filter contrast-110" 
                                    alt="AI Mockup" 
                                  />
                                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 text-[0.5rem] text-white/70 border border-white/10 uppercase tracking-widest rounded-full">
                                      AI Generation
                                  </div>
                              </motion.div>
                          ) : (
                              // ORIGINAL DISPLAY (Floating Dark)
                              <div className="relative shadow-[0_50px_100px_-20px_black] max-h-full max-w-full p-4 lg:p-0">
                                  <img 
                                    src={selectedArt.image} 
                                    alt="Detail" 
                                    className="w-auto h-auto max-h-[45vh] lg:max-h-[70vh] object-contain block filter contrast-110 brightness-90 shadow-2xl"
                                  />
                                  {/* Texture */}
                                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                              </div>
                          )}
                      </div>

                      {/* Right: Acquisition Config (Concierge Style) */}
                      <div className="w-full lg:w-1/3 flex flex-col h-auto lg:h-full bg-[#0a0a0a] lg:overflow-y-auto pb-32 lg:pb-0">
                          
                          <div className="p-8 lg:p-12">
                              <div className="mb-10">
                                  <div className="text-bronze text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                      <Compass size={14} /> {isAr ? 'فلسفة العمل' : 'Artifact Philosophy'}
                                  </div>
                                  <h2 className={`text-3xl lg:text-4xl text-white mb-6 ${headingFont} leading-tight`}>{selectedArt.name[lang]}</h2>
                                  <p className={`text-slate/70 leading-loose ${bodyFont} text-sm`}>
                                      {selectedArt.description?.[lang]}
                                  </p>
                              </div>

                              {/* Options */}
                              <div className="space-y-8 mb-8">
                                  <div>
                                      <label className="text-[0.6rem] uppercase tracking-[0.2em] text-slate/50 block mb-4">{isAr ? 'اختر الحجم' : 'Select Scale'}</label>
                                      <div className="space-y-2">
                                          {sizes.map(size => (
                                              <button 
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-full py-4 px-6 text-left border transition-all duration-300 flex justify-between items-center ${selectedSize === size ? 'border-bronze bg-bronze/5 text-white' : 'border-[#222] text-slate/50 hover:border-slate/50'}`}
                                              >
                                                  <span className={`text-sm ${bodyFont}`}>{size}</span>
                                                  {selectedSize === size && <div className="w-1.5 h-1.5 bg-bronze rounded-full shadow-[0_0_10px_#C5A065]"></div>}
                                              </button>
                                          ))}
                                      </div>
                                  </div>

                                  <div>
                                      <label className="text-[0.6rem] uppercase tracking-[0.2em] text-slate/50 block mb-4">{isAr ? 'الخامة' : 'Medium'}</label>
                                      <div className="grid grid-cols-3 gap-2">
                                          {materials.map(mat => (
                                              <button 
                                                key={mat}
                                                onClick={() => setSelectedMaterial(mat)}
                                                className={`py-3 px-1 text-center border text-[0.6rem] uppercase tracking-wider transition-all duration-300 ${selectedMaterial === mat ? 'border-bronze text-white bg-bronze/5' : 'border-[#222] text-slate/50 hover:text-slate/80'}`}
                                              >
                                                  {mat}
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              </div>

                              {/* DESKTOP Footer (Hidden on Mobile) */}
                              <div className="hidden lg:block mt-8 pt-8 border-t border-[#222]">
                                  <div className="flex justify-between items-end mb-6">
                                      <span className="text-slate/50 text-xs uppercase tracking-widest">{isAr ? 'قيمة الاستثمار' : 'Investment Value'}</span>
                                      <span className="text-3xl text-bronze font-serif">${selectedArt.price + (sizes.indexOf(selectedSize) * 300)}.00</span>
                                  </div>
                                  <button 
                                    onClick={handlePurchase}
                                    className="w-full py-5 bg-white text-black text-sm uppercase tracking-[0.25em] font-bold hover:bg-bronze hover:text-white transition-all duration-500 flex items-center justify-center gap-4"
                                  >
                                      {isAr ? 'طلب اقتناء' : 'Request Acquisition'} <ShoppingBag size={16} />
                                  </button>
                                  <div className="text-center mt-4">
                                      <span className="text-[0.5rem] text-slate/30 uppercase tracking-[0.2em]">
                                          {isAr ? 'يتم الشحن في صندوق خشبي مؤمن' : 'Shipped in Secure Wooden Crate'}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* MOBILE STICKY FOOTER (Fixed to bottom of screen) */}
                      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#222] p-4 lg:hidden z-[110] flex items-center justify-between gap-4 safe-area-pb">
                          <div className="flex flex-col">
                              <span className="text-[0.5rem] text-slate/50 uppercase tracking-widest mb-1">{isAr ? 'القيمة' : 'Total'}</span>
                              <span className="text-xl text-bronze font-serif font-bold leading-none">${selectedArt.price + (sizes.indexOf(selectedSize) * 300)}</span>
                          </div>
                          <button 
                            onClick={handlePurchase}
                            className="bg-white text-black px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-bronze hover:text-white transition-colors rounded-sm flex items-center gap-2"
                          >
                              {isAr ? 'اقتناء' : 'Acquire'} <ShoppingBag size={14} />
                          </button>
                      </div>

                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
};

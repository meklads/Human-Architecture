
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Language, Product } from '../types';
import { ART_PRODUCTS } from '../constants';
import { ShoppingBag, X, Check, Maximize2, Compass, Sparkles, Loader2, Wand2, AlertTriangle, Key, Image as ImageIcon, Layout } from './Icons';

interface ArtStorePageProps {
  lang: Language;
  onCheckout?: (items: Product[]) => void;
}

async function urlToBase64(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, { 
      mode: 'cors',
      signal: controller.signal,
      headers: { 'Accept': 'image/*' }
    });
    clearTimeout(timeoutId);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
}

const MuseumPiece = ({ art, onClick, lang }: { art: Product, onClick: () => void, lang: Language }) => (
    <div onClick={onClick} className="group relative cursor-pointer flex flex-col items-center">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,rgba(197,160,101,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>
        <motion.div layoutId={art.id} className="relative z-10 w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]" whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="relative bg-[#050505]">
                <img src={art.image} alt={art.name[lang]} className="w-full h-auto object-cover filter contrast-[1.1] brightness-[0.85] group-hover:brightness-100 transition-all duration-1000" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10 opacity-50"></div>
                <div className="absolute inset-y-0 right-0 w-[1px] bg-black opacity-80"></div>
            </div>
        </motion.div>
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

export const ArtStorePage: React.FC<ArtStorePageProps> = ({ lang, onCheckout }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';
  
  const [selectedArt, setSelectedArt] = useState<Product | null>(null);
  const [activeView, setActiveView] = useState<'original' | 'ai_mockup'>('original');
  
  const [selectedSize, setSelectedSize] = useState('Gallery (100x150cm)'); 
  const [selectedMaterial, setSelectedMaterial] = useState('Museum Canvas');
  
  // AI State - Store generated images per product ID to avoid re-generating
  const [generatedMockups, setGeneratedMockups] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>("");
  const [genError, setGenError] = useState<{message: string, code?: string} | null>(null);

  const sizes = ['Estate (70x100cm)', 'Gallery (100x150cm)', 'Palace (150x200cm)'];
  const materials = ['Museum Canvas', 'Brushed Aluminum', 'Acrylic Glass'];

  const handleOpenArt = (art: Product) => {
    setSelectedArt(art);
    setActiveView('original');
    setGenError(null);
  };

  const handleKeySelection = async () => {
    try {
      await window.aistudio.openSelectKey();
      initiateAiGeneration(true); 
    } catch (e) {
      console.error("Key selection UI failed", e);
    }
  };

  const initiateAiGeneration = async (forceBypassKeyCheck = false) => {
      if (!selectedArt) return;
      setIsGenerating(true);
      setGenError(null);
      setGenerationStep(isAr ? "جاري تحضير المحرك..." : "INITIALIZING...");

      try {
          const hasSelectedKey = await window.aistudio.hasSelectedApiKey();
          const hasEnvKey = !!process.env.API_KEY;

          if (!forceBypassKeyCheck && !hasSelectedKey && !hasEnvKey) {
            setGenError({ 
                message: isAr ? "يرجى تحديد مفتاح API للمتابعة." : "PLEASE SELECT A VALID API KEY TO PROCEED.",
                code: "KEY_REQUIRED" 
            });
            setIsGenerating(false);
            return;
          }

          setGenerationStep(isAr ? "تحليل القطعة الفنية..." : "ANALYZING ARTWORK...");
          const base64Image = await urlToBase64(selectedArt.image);
          setGenerationStep(isAr ? "توليد المحاكاة المعمارية..." : "GENERATING ARCHITECTURAL MOCKUP...");

          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          let response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: {
                  parts: [
                      base64Image ? { inlineData: { mimeType: 'image/jpeg', data: base64Image } } : { text: selectedArt.name.en },
                      { text: `Create a professional architectural interior design mockup. The artwork should be elegantly framed and hung on a minimalist concrete or high-end gallery wall in a luxury modern room. Ensure the art is the focus and looks perfectly installed. Cinematic lighting, 8k.` }
                  ]
              }
          });

          let foundImage = false;
          if (response.candidates?.[0]?.content?.parts) {
              for (const part of response.candidates[0].content.parts) {
                  if (part.inlineData) {
                      const newImageUrl = `data:image/png;base64,${part.inlineData.data}`;
                      setGeneratedMockups(prev => ({ ...prev, [selectedArt.id]: newImageUrl }));
                      setActiveView('ai_mockup');
                      foundImage = true;
                      break;
                  }
              }
          }
          if (!foundImage) throw new Error("API_REJECTED");

      } catch (error: any) {
          const errorMsg = error.message || "";
          if (errorMsg.includes("Requested entity was not found")) {
              setGenError({ 
                message: isAr ? "خطأ في المفتاح. يرجى إعادة الاختيار." : "API KEY ERROR. PLEASE RE-SELECT.",
                code: "KEY_REQUIRED"
              });
          } else {
              setGenError({ 
                message: isAr ? "فشلت عملية التوليد." : "GENERATION FAILED."
              });
          }
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
                  ar: `${selectedArt.name.ar} - ${selectedSize}`,
                  en: `${selectedArt.name.en} - ${selectedSize}`,
                  fr: selectedArt.name.fr
              },
              price: selectedArt.price + (sizes.indexOf(selectedSize) * 300)
          };
          onCheckout([customizedProduct]);
      }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 min-h-screen bg-[#020202] text-alabaster overflow-x-hidden">
      <div className="container mx-auto px-6 mb-24 text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-4 mb-6 opacity-50"><div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-bronze"></div><span className="text-bronze text-[0.5rem] uppercase tracking-[0.4em] font-serif">{isAr ? 'المجموعة الخاصة' : 'PRIVATE COLLECTION'}</span><div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-bronze"></div></div>
          <h1 className={`text-5xl md:text-7xl ${headingFont} text-white/90 tracking-tight`}>{isAr ? 'متحف البنيان' : 'The Structure Museum'}</h1>
      </div>
      
      <div className="container mx-auto px-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40 max-w-6xl mx-auto">
              {ART_PRODUCTS.map((art, idx) => (
                <div key={art.id} className={`${idx % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
                    <MuseumPiece art={art} lang={lang} onClick={() => handleOpenArt(art)} />
                </div>
              ))}
          </div>
      </div>

      <AnimatePresence>
          {selectedArt && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/98 flex justify-center items-start lg:items-center overflow-y-auto p-0 md:p-4" onClick={() => setSelectedArt(null)}>
                  <button onClick={() => setSelectedArt(null)} className="fixed top-4 right-4 z-[120] text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10"><X size={24} strokeWidth={1} /></button>
                  
                  <motion.div layoutId={selectedArt.id} className="bg-[#050505] w-full max-w-7xl min-h-screen lg:min-h-0 lg:h-[90vh] border border-[#222] shadow-2xl relative flex flex-col lg:flex-row lg:overflow-hidden" onClick={(e) => e.stopPropagation()}>
                      
                      {/* --- LEFT: MAIN VIEWER AREA --- */}
                      <div className="w-full lg:w-2/3 bg-[#020202] relative h-[60vh] lg:h-full flex items-center justify-center overflow-hidden border-b border-[#222] lg:border-b-0 lg:border-r">
                          
                          {/* 🖼️ THUMBNAIL REEL (Beside main photo) */}
                          <div className={`absolute ${isAr ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-2 bg-black/40 backdrop-blur-md border border-white/5 rounded-sm`}>
                              {/* Original Thumbnail */}
                              <button 
                                onClick={() => setActiveView('original')}
                                className={`group relative w-16 h-20 border-2 transition-all overflow-hidden ${activeView === 'original' ? 'border-bronze scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                              >
                                  <img src={selectedArt.image} className="w-full h-full object-cover" alt="Original" />
                                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <ImageIcon size={14} className="text-white" />
                                      <span className="text-[0.4rem] uppercase text-white font-bold mt-1">Art</span>
                                  </div>
                              </button>

                              {/* AI Mockup Thumbnail / Trigger */}
                              <button 
                                onClick={() => generatedMockups[selectedArt.id] ? setActiveView('ai_mockup') : initiateAiGeneration()}
                                disabled={isGenerating}
                                className={`group relative w-16 h-20 border-2 transition-all overflow-hidden flex flex-col items-center justify-center ${activeView === 'ai_mockup' ? 'border-bronze scale-105' : 'border-white/10 opacity-50 hover:opacity-100'} ${isGenerating ? 'cursor-wait' : ''}`}
                              >
                                  {isGenerating ? (
                                      <Loader2 size={16} className="animate-spin text-bronze" />
                                  ) : generatedMockups[selectedArt.id] ? (
                                      <>
                                          <img src={generatedMockups[selectedArt.id]} className="w-full h-full object-cover" alt="Mockup" />
                                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <Layout size={14} className="text-white" />
                                              <span className="text-[0.4rem] uppercase text-white font-bold mt-1">Mockup</span>
                                          </div>
                                      </>
                                  ) : (
                                      <div className="flex flex-col items-center gap-1">
                                          <Sparkles size={16} className="text-bronze animate-pulse" />
                                          <span className="text-[0.35rem] uppercase text-slate-400 font-bold text-center px-1">Generate Mockup</span>
                                      </div>
                                  )}
                              </button>
                          </div>

                          {/* LARGE MAIN IMAGE DISPLAY */}
                          <div className="w-full h-full flex items-center justify-center bg-black">
                            <AnimatePresence mode="wait">
                                {isGenerating ? (
                                    <motion.div 
                                        key="loader"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="flex flex-col items-center gap-4 text-bronze text-center"
                                    >
                                        <Loader2 size={64} className="animate-spin" />
                                        <span className="text-xs uppercase tracking-widest font-mono animate-pulse">{generationStep}</span>
                                    </motion.div>
                                ) : genError ? (
                                    <motion.div 
                                        key="error"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="flex flex-col items-center gap-4 text-red-500/80 px-6 text-center max-w-md"
                                    >
                                        <AlertTriangle size={48} />
                                        <span className="text-sm font-bold uppercase tracking-widest leading-relaxed">{genError.message}</span>
                                        {genError.code === "KEY_REQUIRED" && (
                                            <button onClick={handleKeySelection} className="px-8 py-3 bg-white text-black text-[0.6rem] uppercase tracking-[0.2em] font-bold hover:bg-bronze transition-all">SELECT API KEY</button>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key={activeView}
                                        initial={{ opacity: 0, scale: 0.98 }} 
                                        animate={{ opacity: 1, scale: 1 }} 
                                        className="w-full h-full flex items-center justify-center p-4 md:p-12"
                                    >
                                        <img 
                                            src={activeView === 'ai_mockup' ? generatedMockups[selectedArt.id] : selectedArt.image} 
                                            className="max-w-full max-h-full object-contain shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)]" 
                                            alt="Enlarged View" 
                                        />
                                        
                                        {/* Status Tag */}
                                        <div className="absolute top-8 right-8 bg-black/60 backdrop-blur px-3 py-1 text-[0.5rem] text-white/50 border border-white/10 uppercase tracking-[0.2em] font-mono">
                                            {activeView === 'original' ? 'Artifact: Raw' : 'Architectural Projection'}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                      </div>

                      {/* --- RIGHT: PURCHASE & INFO --- */}
                      <div className="w-full lg:w-1/3 bg-[#0a0a0a] p-8 lg:p-12 overflow-y-auto flex flex-col">
                          <div className="flex-1">
                              <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2"><Compass size={14} /> {isAr ? 'فلسفة العمل' : 'Philosophy'}</span>
                              <h2 className={`text-3xl text-white mb-6 ${headingFont} leading-tight`}>{selectedArt.name[lang]}</h2>
                              <p className={`text-slate/70 leading-loose ${bodyFont} text-sm mb-10`}>{selectedArt.description?.[lang]}</p>

                              <div className="space-y-8">
                                  <div>
                                      <label className="text-[0.6rem] uppercase tracking-widest text-slate/50 block mb-4">{isAr ? 'الحجم الهندسي' : 'Scale Selection'}</label>
                                      {sizes.map(size => (
                                          <button key={size} onClick={() => setSelectedSize(size)} className={`w-full py-3 px-4 text-left border mb-2 transition-all ${selectedSize === size ? 'border-bronze bg-bronze/5 text-white' : 'border-[#222] text-slate/50 hover:border-slate/80'}`}>
                                              <span className="text-xs uppercase tracking-widest">{size}</span>
                                          </button>
                                      ))}
                                  </div>
                                  <div>
                                      <label className="text-[0.6rem] uppercase tracking-widest text-slate/50 block mb-4">{isAr ? 'الخامة' : 'Material'}</label>
                                      <div className="grid grid-cols-2 gap-2">
                                          {materials.map(mat => (
                                              <button key={mat} onClick={() => setSelectedMaterial(mat)} className={`py-2 px-3 text-center border text-[0.6rem] uppercase tracking-widest transition-all ${selectedMaterial === mat ? 'border-bronze bg-bronze/5 text-white' : 'border-[#222] text-slate/50'}`}>
                                                  {mat}
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="mt-8 pt-8 border-t border-[#222]">
                              <div className="flex justify-between items-end mb-6">
                                  <span className="text-slate/50 text-xs uppercase tracking-widest">{isAr ? 'قيمة الاستثمار' : 'Investment'}</span>
                                  <span className="text-3xl text-bronze font-serif font-bold">${selectedArt.price + (sizes.indexOf(selectedSize) * 300)}</span>
                              </div>
                              <button onClick={handlePurchase} className="w-full py-5 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-bronze hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg">
                                  {isAr ? 'طلب اقتناء قطعة فنية' : 'Acquire Piece'} <ShoppingBag size={14} />
                              </button>
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
};

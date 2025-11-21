


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality } from "@google/genai";
import { Language, Product, BookChapterPreview, DayPlan } from '../types';
import { PRODUCTS, TRANSLATIONS, THIRTY_DAY_PROGRAM, BOOK_CHAPTERS, THEORY_CARDS } from '../constants';
import { ShoppingBag, BookOpen, Shield, Layers, Box, X, Compass, ScanLine, Wand2, Image as ImageIcon, Video, Upload, Loader2, Play, RefreshCw, QrCode, ArrowLeft, ArrowRight, Check, Eye, Sparkles } from './Icons';
import { BookCover } from './BookCover';

interface LibraryPageProps {
  lang: Language;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ lang }) => {
  const [selectedArt, setSelectedArt] = useState<Product | null>(null);
  const [bookFormat, setBookFormat] = useState<'hardcover' | 'digital' | 'audio'>('hardcover');
  
  // Cart State
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  // AI Studio State
  const [studioTab, setStudioTab] = useState<'edit' | 'video' | 'affirmation'>('edit');
  const [studioImage, setStudioImage] = useState<string | null>(null);
  const [studioPrompt, setStudioPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Affirmation State
  const [affirmationPillar, setAffirmationPillar] = useState('Structure (Mind)');
  const [affirmationMood, setAffirmationMood] = useState('Resilience');
  const [generatedCard, setGeneratedCard] = useState<{text: string, imageUrl: string} | null>(null);

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

  // Handle Purchase Simulation
  const handlePurchase = (product: Product) => {
    // In a real app, this would add to cart context or redirect to stripe
    setCartNotification(product.name[lang]);
    setTimeout(() => setCartNotification(null), 3500);
  };

  // Helper to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudioImage(reader.result as string);
        setGeneratedImage(null);
        setGeneratedVideo(null);
        setStatusMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate Affirmation Card (Text + Image)
  const handleGenerateAffirmation = async () => {
    setIsGenerating(true);
    setGeneratedCard(null);
    setStatusMessage(isAr ? 'صياغة المخطط اللفظي...' : 'Drafting verbal blueprint...');

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // 1. Generate Text Affirmation
        const textPrompt = isAr 
            ? `اكتب توكيداً فلسفياً معمارياً قصيراً جداً (أقل من ١٥ كلمة) يركز على عمود "${affirmationPillar}" وشعور "${affirmationMood}". استخدم مصطلحات البناء (أساس، خرسانة، عمود، سقف). كن عميقاً وقوياً.`
            : `Write a very short (max 15 words), deep, architectural philosophical affirmation focusing on the "${affirmationPillar}" pillar and the mood of "${affirmationMood}". Use construction metaphors (foundation, concrete, pillar, roof).`;

        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: textPrompt,
        });
        const affirmationText = textResponse.text.trim().replace(/"/g, '');

        setStatusMessage(isAr ? 'بناء الصورة المعمارية...' : 'Rendering architectural visual...');

        // 2. Generate Image
        const imagePrompt = `Minimalist fine art architectural photography, abstract representation of ${affirmationPillar} and ${affirmationMood}, focusing on materials like concrete, bronze, and light. Cinematic lighting, high contrast, photorealistic, 8k.`;
        
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '3:4',
                outputMimeType: 'image/jpeg',
            },
        });

        const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

        setGeneratedCard({
            text: affirmationText,
            imageUrl: imageUrl
        });
        setStatusMessage(isAr ? 'تم بناء البطاقة.' : 'Card constructed.');

    } catch (e) {
        console.error(e);
        setStatusMessage(isAr ? 'فشل البناء.' : 'Construction failed.');
    } finally {
        setIsGenerating(false);
    }
  };

  // Gemini 2.5 Flash Image Editing
  const handleGenerateEdit = async () => {
    if (!studioImage || !studioPrompt) return;
    
    setIsGenerating(true);
    setStatusMessage(isAr ? 'جاري تحليل الهيكل...' : 'Analyzing structure...');
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = studioImage.split(',')[1];
      const mimeType = studioImage.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: studioPrompt }
          ]
        },
        config: { responseModalities: [Modality.IMAGE] }
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part?.inlineData) {
        const url = `data:image/png;base64,${part.inlineData.data}`;
        setGeneratedImage(url);
        setStatusMessage(isAr ? 'تم التعديل بنجاح.' : 'Modification complete.');
      } else {
        throw new Error('No image returned');
      }
    } catch (e) {
      console.error(e);
      setStatusMessage(isAr ? 'حدث خطأ في المعالجة.' : 'Processing error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Veo Video Generation
  const handleGenerateVideo = async () => {
    if (!studioImage) return;

    // API Key Check for Veo
    const w = window as any;
    if (w.aistudio && !await w.aistudio.hasSelectedApiKey()) {
        try {
            await w.aistudio.openSelectKey();
        } catch (e) {
            console.error("API Key selection failed", e);
            setStatusMessage(isAr ? 'مفتاح API مطلوب.' : 'API Key required.');
            return;
        }
    }

    setIsGenerating(true);
    setStatusMessage(isAr ? 'بدء المحاكاة الزمنية (Veo)...' : 'Initiating temporal simulation (Veo)...');
    setGeneratedVideo(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = studioImage.split(',')[1];
      const mimeType = studioImage.split(';')[0].split(':')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: studioPrompt || 'Animate this architecturally', 
        image: { imageBytes: base64Data, mimeType },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatusMessage(isAr ? 'جاري التصيير... قد يستغرق دقيقة.' : 'Rendering simulation... this may take a moment.');

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (videoUri) {
        const videoUrl = `${videoUri}&key=${process.env.API_KEY}`;
        setGeneratedVideo(videoUrl);
        setStatusMessage(isAr ? 'اكتملت المحاكاة.' : 'Simulation complete.');
      }
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes('Requested entity was not found') && w.aistudio) {
          await w.aistudio.openSelectKey();
          setStatusMessage(isAr ? 'الرجاء اختيار مفتاح API.' : 'Please select API Key.');
      } else {
          setStatusMessage(isAr ? 'فشل في إنشاء الفيديو.' : 'Video generation failed.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateQrUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=2B2B2B&bgcolor=F2F0EB`;
  };

  // Navigation for Deck
  const nextCard = () => setCurrentCardIndex(prev => (prev + 1) % activeDeck.length);
  const prevCard = () => setCurrentCardIndex(prev => (prev - 1 + activeDeck.length) % activeDeck.length);

  const copyPrompt = () => {
     const prompt = activeDeck[currentCardIndex].aiPrompt;
     if (prompt) {
        navigator.clipboard.writeText(prompt);
        setStatusMessage(isAr ? 'تم نسخ النص' : 'Prompt Copied');
        setTimeout(() => setStatusMessage(''), 2000);
     }
  };
  
  const copyArtPrompt = (prompt: string) => {
      navigator.clipboard.writeText(prompt);
      setStatusMessage(isAr ? 'تم نسخ النص' : 'Prompt Copied');
      setTimeout(() => setStatusMessage(''), 2000);
  };

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
                        <BookCover className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        {/* Book Badge */}
                         <div className="absolute top-4 right-4 bg-bronze text-white text-xs px-3 py-1 tracking-widest font-bold shadow-lg">
                            BESTSELLER
                        </div>
                        
                        {/* Zoom Hint */}
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
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

                    {/* Chapter Preview (Blueprints) */}
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
                                              const artLink = chapter.relatedArtId ? ` (See Art: ${chapter.relatedArtId})` : '';
                                              const blogLink = chapter.relatedBlogId ? ` (Read: ${chapter.relatedBlogId})` : '';
                                              setQrItem({ 
                                                id: chapter.id, 
                                                title: `${isAr ? 'الفصل' : 'Chapter'} ${chapter.number}: ${chapter.title['en']}`, 
                                                type: 'chapter',
                                                desc: isAr 
                                                  ? `مسح للوصول إلى الشرح الصوتي والمصادر.${chapter.relatedArtId ? ' يشمل لوحة فنية.' : ''}` 
                                                  : `Scan to access Audio Commentary & Resources.${artLink}${blogLink}`
                                              });
                                            }}
                                            className="text-slate hover:text-bronze transition-colors"
                                            title={isAr ? "الوصول الرقمي" : "Digital Access"}
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

        {/* ART GALLERY SECTION */}
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
                                        {/* Panel Shadow/Depth overlay */}
                                        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                                    </div>
                                ))}
                                
                                {/* Hover Actions Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setQrItem({
                                            id: art.id,
                                            title: art.name['en'],
                                            type: 'art',
                                            desc: isAr ? 'امسح للاستماع لقصة اللوحة.' : 'Scan to hear the story of this structure.'
                                        })}}
                                        className="w-10 h-10 rounded-full bg-alabaster text-charcoal flex items-center justify-center hover:bg-bronze hover:text-white transition-colors transform scale-0 group-hover:scale-100 delay-100 duration-300"
                                        title="QR Code"
                                    >
                                        <QrCode size={18} />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedArt(art); }}
                                        className="w-10 h-10 rounded-full bg-alabaster text-charcoal flex items-center justify-center hover:bg-bronze hover:text-white transition-colors transform scale-0 group-hover:scale-100 duration-300"
                                        title="View in Room"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Badge */}
                            <div className="absolute top-2 right-2 flex flex-col items-end gap-1 pointer-events-none">
                                {art.category === 'art' && (
                                    <span className="bg-charcoal text-white text-[0.55rem] px-2 py-1 uppercase tracking-widest shadow-sm">
                                        {art.panels && art.panels > 1 ? `${art.panels}-Panel` : 'Single'}
                                    </span>
                                )}
                                <span className="bg-bronze text-white text-[0.55rem] px-2 py-1 uppercase tracking-widest shadow-sm">
                                    Museum
                                </span>
                            </div>
                        </div>

                        <div className="px-6 pb-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className={`text-xl ${headingFont} group-hover:text-bronze transition-colors cursor-pointer`} onClick={() => setSelectedArt(art)}>{art.name[lang]}</h4>
                                <span className="text-bronze font-serif text-xl">${art.price}</span>
                            </div>
                            <p className={`text-sm text-slate mb-8 line-clamp-2 ${bodyFont}`}>{art.description?.[lang]}</p>
                            
                            {/* PROMINENT BUY BUTTON */}
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

        {/* AI VISUALIZATION STUDIO */}
        <div className="mb-24 border-t border-slate/10 pt-24">
           <div className="text-center mb-16">
              <span className="text-bronze text-xs tracking-[0.5em] uppercase block mb-4 flex items-center justify-center gap-2">
                 <Wand2 size={14} /> {isAr ? 'غرفة المحاكاة' : 'Simulation Room'}
              </span>
              <h2 className={`text-4xl md:text-5xl mb-6 ${headingFont}`}>
                 {isAr ? 'حـدد مستقبلك المعماري' : 'Visualize Your Reconstruction'}
              </h2>
              <p className={`text-slate ${bodyFont} text-lg max-w-2xl mx-auto`}>
                 {isAr 
                  ? 'الأداة الأكثر أهمية في البناء هي "الرؤية". استخدم مختبر المحاكاة لرؤية نسختك المرممة قبل أن تضع أول حجر.' 
                  : 'The most critical tool in construction is "Vision". Use our Simulation Room to render your restored self before laying the first stone.'}
              </p>
           </div>

           <div className="bg-white dark:bg-white/5 border border-slate/10 shadow-2xl max-w-5xl mx-auto overflow-hidden flex flex-col md:flex-row min-h-[600px]">
              {/* Controls Panel */}
              <div className="w-full md:w-1/3 border-r border-slate/10 p-8 bg-alabaster/50 dark:bg-black/20">
                 <div className="flex gap-1 mb-8 p-1 bg-slate/10 rounded-none">
                    <button 
                      onClick={() => setStudioTab('edit')}
                      className={`flex-1 py-2 text-[0.6rem] uppercase tracking-widest flex items-center justify-center gap-1 transition-all ${studioTab === 'edit' ? 'bg-white dark:bg-charcoal shadow-sm text-bronze' : 'text-slate hover:text-charcoal dark:hover:text-white'}`}
                    >
                      <ImageIcon size={12} /> {isAr ? 'تعديل' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => setStudioTab('video')}
                      className={`flex-1 py-2 text-[0.6rem] uppercase tracking-widest flex items-center justify-center gap-1 transition-all ${studioTab === 'video' ? 'bg-white dark:bg-charcoal shadow-sm text-bronze' : 'text-slate hover:text-charcoal dark:hover:text-white'}`}
                    >
                      <Video size={12} /> {isAr ? 'محاكاة' : 'Veo'}
                    </button>
                     <button 
                      onClick={() => setStudioTab('affirmation')}
                      className={`flex-1 py-2 text-[0.6rem] uppercase tracking-widest flex items-center justify-center gap-1 transition-all ${studioTab === 'affirmation' ? 'bg-white dark:bg-charcoal shadow-sm text-bronze' : 'text-slate hover:text-charcoal dark:hover:text-white'}`}
                    >
                      <Sparkles size={12} /> {isAr ? 'توكيد' : 'Affirm'}
                    </button>
                 </div>

                 <div className="space-y-6">
                    {/* --- EDIT & VIDEO MODE INPUTS --- */}
                    {(studioTab === 'edit' || studioTab === 'video') && (
                        <>
                            <div className="relative group">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-slate/30 p-8 text-center group-hover:border-bronze transition-colors bg-white dark:bg-transparent">
                                    <Upload size={24} className="mx-auto text-slate mb-2 group-hover:text-bronze" />
                                    <span className="text-xs uppercase tracking-widest text-slate block">{isAr ? 'رفع المخطط الحالي' : 'Upload Current State'}</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate mb-2 block">{isAr ? 'أمر الترميم' : 'Reconstruction Prompt'}</label>
                                <textarea 
                                    value={studioPrompt}
                                    onChange={(e) => setStudioPrompt(e.target.value)}
                                    placeholder={studioTab === 'edit' ? (isAr ? 'صف النتيجة النهائية المطلوبة...' : 'Describe the desired architectural outcome...') : (isAr ? 'صف الحركة والتغيير...' : 'Describe the motion of restoration...')}
                                    className="w-full bg-white dark:bg-black/50 border border-slate/20 p-4 text-sm focus:border-bronze outline-none resize-none h-32 font-mono"
                                ></textarea>
                            </div>
                             {/* Action Button */}
                            <button 
                                onClick={studioTab === 'edit' ? handleGenerateEdit : handleGenerateVideo}
                                disabled={isGenerating || !studioImage}
                                className={`w-full py-4 text-white uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${isGenerating || !studioImage ? 'bg-slate cursor-not-allowed opacity-50' : 'bg-bronze hover:bg-charcoal'}`}
                            >
                                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : (studioTab === 'edit' ? <Wand2 size={16} /> : <Play size={16} />)}
                                {isGenerating ? (isAr ? 'جاري المعالجة...' : 'Processing...') : (isAr ? 'بدء المحاكاة' : 'Start Simulation')}
                            </button>
                        </>
                    )}

                    {/* --- AFFIRMATION CARD MODE INPUTS --- */}
                    {studioTab === 'affirmation' && (
                        <>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate mb-2 block">{isAr ? 'اختر العمود (Pillar)' : 'Select Focus Pillar'}</label>
                                <select 
                                    value={affirmationPillar} 
                                    onChange={(e) => setAffirmationPillar(e.target.value)}
                                    className="w-full bg-white dark:bg-black/50 border border-slate/20 p-3 text-sm focus:border-bronze outline-none appearance-none rounded-none"
                                >
                                    <option>Foundation (Body)</option>
                                    <option>Structure (Mind)</option>
                                    <option>Interior (Spirit)</option>
                                    <option>Facade (Social)</option>
                                </select>
                            </div>
                             <div>
                                <label className="text-xs uppercase tracking-widest text-slate mb-2 block">{isAr ? 'اختر الحالة (Mood)' : 'Desired Architectural State'}</label>
                                <select 
                                    value={affirmationMood} 
                                    onChange={(e) => setAffirmationMood(e.target.value)}
                                    className="w-full bg-white dark:bg-black/50 border border-slate/20 p-3 text-sm focus:border-bronze outline-none appearance-none rounded-none"
                                >
                                    <option>Resilience</option>
                                    <option>Clarity</option>
                                    <option>Peace</option>
                                    <option>Strength</option>
                                    <option>Balance</option>
                                    <option>Restoration</option>
                                </select>
                            </div>
                             <div className="bg-bronze/5 border border-bronze/20 p-4 text-xs text-slate italic">
                                {isAr 
                                 ? 'سيقوم المهندس الذكي (AI) بصياغة بطاقة يومية فريدة لك، تجمع بين الفلسفة والهندسة.'
                                 : 'The AI Architect will construct a unique daily card combining philosophy and structural imagery.'}
                            </div>
                             <button 
                                onClick={handleGenerateAffirmation}
                                disabled={isGenerating}
                                className={`w-full py-4 text-white uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${isGenerating ? 'bg-slate cursor-not-allowed opacity-50' : 'bg-bronze hover:bg-charcoal'}`}
                            >
                                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                {isGenerating ? (isAr ? 'جاري البناء...' : 'Constructing...') : (isAr ? 'بناء البطاقة' : 'Construct Card')}
                            </button>
                        </>
                    )}

                    {/* Status */}
                    <div className="h-8 flex items-center justify-center">
                       <span className="text-[0.65rem] uppercase tracking-widest text-slate animate-pulse">{statusMessage}</span>
                    </div>
                 </div>
              </div>

              {/* Viewport Panel */}
              <div className="w-full md:w-2/3 bg-[#1a1a1a] relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-20 pointer-events-none architectural-grid"></div>
                 
                 {/* Default State */}
                 {!studioImage && !generatedImage && !generatedVideo && !generatedCard && (
                    <div className="text-center text-white/20">
                       <Compass size={48} className="mx-auto mb-4 opacity-50" />
                       <span className="uppercase tracking-[0.3em] text-xs block">Simulation Inactive</span>
                    </div>
                 )}

                 {/* Input Image (Edit/Video Mode) */}
                 {studioImage && !generatedImage && !generatedVideo && !isGenerating && (
                    <img src={studioImage} alt="Input" className="max-w-[90%] max-h-[90%] object-contain shadow-2xl border border-white/10" />
                 )}

                 {/* Loading State */}
                 {isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                       <div className="w-16 h-1 bg-white/20 mb-4 overflow-hidden relative">
                          <motion.div 
                            animate={{ x: ['-100%', '100%'] }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-full bg-bronze"
                          />
                       </div>
                       <span className="text-bronze text-xs uppercase tracking-widest">{isAr ? 'جاري البناء...' : 'Constructing...'}</span>
                    </div>
                 )}

                 {/* Result Image (Edit Mode) */}
                 {generatedImage && (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                       <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                       <div className="absolute bottom-4 right-4 flex gap-2">
                          <a href={generatedImage} download="blueprint_mod.png" className="bg-white text-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-bronze transition-colors">
                             {isAr ? 'حفظ' : 'Save'}
                          </a>
                          <button onClick={() => setGeneratedImage(null)} className="bg-black border border-white/20 text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                             <RefreshCw size={14} />
                          </button>
                       </div>
                    </div>
                 )}

                 {/* Result Video (Veo Mode) */}
                 {generatedVideo && (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                       <video controls autoPlay loop className="max-w-full max-h-full shadow-2xl">
                          <source src={generatedVideo} type="video/mp4" />
                       </video>
                       <div className="absolute top-4 left-4 bg-bronze/90 text-white px-3 py-1 text-[0.6rem] uppercase tracking-widest">
                          Veo Simulation
                       </div>
                       <button onClick={() => setGeneratedVideo(null)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                          <X size={24} />
                       </button>
                    </div>
                 )}

                 {/* Result Affirmation Card */}
                 {generatedCard && (
                    <div className="relative w-full h-full flex items-center justify-center bg-black/50 p-8">
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-alabaster relative max-w-sm w-full shadow-2xl overflow-hidden border-4 border-white/10"
                       >
                           {/* Image Top */}
                           <div className="w-full aspect-square relative">
                                <img src={generatedCard.imageUrl} alt="Generated Art" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 shadow-inner pointer-events-none border-b border-charcoal"></div>
                                <div className="absolute top-4 right-4 bg-bronze text-white text-[0.5rem] px-2 py-1 uppercase tracking-widest">
                                    {affirmationPillar}
                                </div>
                           </div>
                           
                           {/* Text Bottom */}
                           <div className="p-8 text-center bg-[#F2F0EB]">
                               <span className="text-[0.6rem] text-bronze uppercase tracking-[0.3em] block mb-4">Daily Architect Note</span>
                               <p className={`text-xl font-serif text-charcoal leading-relaxed mb-6`}>
                                   "{generatedCard.text}"
                               </p>
                               <div className="w-8 h-px bg-charcoal/20 mx-auto"></div>
                           </div>

                           <div className="absolute bottom-2 right-2 opacity-30">
                               <Sparkles size={12} className="text-charcoal" />
                           </div>
                       </motion.div>

                       <div className="absolute bottom-4 right-4 flex gap-2">
                          <button onClick={() => setGeneratedCard(null)} className="bg-black border border-white/20 text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                             <RefreshCw size={14} />
                          </button>
                       </div>
                    </div>
                 )}

              </div>
           </div>
        </div>

        {/* TOOLS & CARDS */}
        <div className="mb-24 border-t border-slate/10 pt-24">
             <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto">
                 {toolProducts.map((tool) => (
                    <div key={tool.id} className="w-full md:w-1/2">
                        <div className="bg-charcoal text-alabaster p-8 md:p-12 shadow-2xl relative overflow-hidden group border border-slate/20 hover:border-bronze/50 transition-colors h-full flex flex-col">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            {/* Card Deck Visual */}
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
                                <span className="text-xl font-serif text-white/50">${tool.price}</span>
                            </div>
                        </div>
                    </div>
                 ))}
             </div>
        </div>

      </div>

      {/* --- MODALS --- */}
      
      {/* CART TOAST NOTIFICATION */}
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
                        {isAr ? 'تمت الإضافة للسلة' : 'Added to Cart'}
                    </h4>
                    <p className={`text-xs text-white/70 ${bodyFont}`}>{cartNotification}</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* QR CODE MODAL */}
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
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-charcoal border-4 border-bronze shadow-md"></div>
                    <button onClick={() => setQrItem(null)} className="absolute top-2 right-2 text-charcoal/50 hover:text-charcoal"><X /></button>

                    <span className="text-charcoal/40 text-[0.6rem] uppercase tracking-[0.3em] font-mono mb-6 block">
                        ARCHIVAL TAG ID: {qrItem.id.toUpperCase()}
                    </span>

                    <div className="bg-white p-4 border border-charcoal/10 inline-block mb-6 shadow-inner">
                        <img 
                            src={generateQrUrl(`https://humanarchitecture.com/link/${qrItem.type}/${qrItem.id}`)} 
                            alt="QR Code" 
                            className="w-48 h-48 mix-blend-multiply"
                        />
                    </div>

                    <h3 className={`text-xl mb-2 text-charcoal ${headingFont}`}>{qrItem.title}</h3>
                    <p className={`text-sm text-slate mb-6 ${bodyFont}`}>{qrItem.desc}</p>

                    <div className="flex justify-center gap-4 border-t border-charcoal/10 pt-4">
                         <button className="text-xs text-bronze uppercase tracking-widest font-bold hover:underline">
                             {isAr ? 'فتح الرابط' : 'Open Link'}
                         </button>
                         <div className="w-px bg-charcoal/10 h-4"></div>
                         <button className="text-xs text-slate uppercase tracking-widest hover:text-charcoal transition-colors">
                             {isAr ? 'طباعة' : 'Print Tag'}
                         </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* ROOM MOCKUP MODAL - ADAPTED FOR BOOK COVER ZOOM */}
      <AnimatePresence>
        {selectedArt && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
                onClick={() => setSelectedArt(null)}
            >
                <div className="relative w-full max-w-6xl h-[80vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <button 
                        onClick={() => setSelectedArt(null)} 
                        className="absolute top-0 right-0 text-white/50 hover:text-white p-4 z-50"
                    >
                        <X size={32} />
                    </button>

                    {/* The Room Simulation */}
                    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center pb-16 md:pb-0">
                        {/* Room Background - Luxury Wall Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none"></div>
                        
                        {/* Ambient Light Source */}
                        <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-white/10 to-transparent transform -skew-x-12 blur-3xl pointer-events-none"></div>

                        {/* The Artwork OR Book Cover on Wall */}
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10 max-w-[90%] md:max-w-[80%] max-h-[60%] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] mb-8 md:mb-0"
                        >
                            {/* CONDITIONAL RENDERING: BOOK COVER VS ART IMAGE */}
                            {selectedArt.category === 'book' ? (
                                <div className="bg-transparent p-1 md:p-2 shadow-2xl h-[50vh] aspect-[2/3]">
                                    <BookCover className="w-full h-full transform scale-110" />
                                </div>
                            ) : (
                                <div className="flex gap-4 p-2">
                                    {Array.from({ length: selectedArt.panels || 1 }).map((_, idx) => (
                                        <div key={idx} className="bg-white p-1 md:p-2 shadow-2xl">
                                            <img 
                                                src={selectedArt.image} 
                                                className="h-[25vh] md:h-[50vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                                style={{ objectPosition: selectedArt.panels && selectedArt.panels > 1 ? `${(idx / (selectedArt.panels - 1)) * 100}% center` : 'center' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Museum Plaque with Brand & QR Hint */}
                            <div className="absolute -bottom-14 md:-bottom-16 left-1/2 transform -translate-x-1/2 bg-[#0a0a0a] border border-bronze/30 px-4 md:px-6 py-2 md:py-3 text-center shadow-2xl min-w-[180px] md:min-w-[200px] z-20">
                                <h3 className={`text-white text-xs md:text-md ${headingFont} tracking-widest mb-1`}>HUMAN ARCHITECTURE™</h3>
                                <p className={`text-bronze text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] ${bodyFont}`}>{selectedArt.name['en']}</p>
                                <div className="flex justify-center items-center gap-2 mt-2 pt-2 border-t border-white/10 cursor-pointer hover:text-white transition-colors" onClick={() => setQrItem({
                                    id: selectedArt.id,
                                    title: selectedArt.name['en'],
                                    type: 'art',
                                    desc: 'Scan for Deep Structural Analysis'
                                })}>
                                    <ScanLine size={10} className="text-slate/40" />
                                    <p className="text-white/30 text-[0.4rem] md:text-[0.5rem] uppercase tracking-widest">Scan for Depth</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floor Reflection Hint */}
                        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    </div>

                    {/* Controls / CTA */}
                    <div className="absolute bottom-4 md:bottom-8 flex flex-wrap justify-center gap-4 md:gap-6 z-[60] w-full px-4">
                        <button 
                            onClick={() => handlePurchase(selectedArt)}
                            className="px-6 md:px-8 py-3 bg-white text-black uppercase tracking-widest text-xs font-bold hover:bg-bronze transition-colors shadow-lg"
                        >
                            {isAr ? 'اقتناء اللوحة' : 'Acquire Blueprint'}
                        </button>
                        {selectedArt.aiPrompt && (
                             <button 
                                onClick={() => copyArtPrompt(selectedArt.aiPrompt!)}
                                className="px-6 md:px-8 py-3 border border-white/20 text-white uppercase tracking-widest text-xs hover:border-white transition-colors flex items-center gap-2 backdrop-blur-sm"
                             >
                                <ImageIcon size={14} />
                                {isAr ? 'نسخ البرومبت' : 'Copy AI Prompt'}
                             </button>
                        )}
                        <button 
                           className="px-6 md:px-8 py-3 border border-white/20 text-white uppercase tracking-widest text-xs hover:border-white transition-colors backdrop-blur-sm"
                           onClick={() => {
                             setCartNotification(isAr ? 'جاري تنزيل الكتالوج...' : 'Downloading Catalog...');
                             setTimeout(() => setCartNotification(null), 3000);
                           }}
                        >
                            {isAr ? 'تحميل الكتالوج' : 'Download Catalog'}
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

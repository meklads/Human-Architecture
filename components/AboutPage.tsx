
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import { Language } from '../types';
import { ABOUT_CONTENT } from '../constants';
import { Layers, Compass, PenTool, Layout, Box } from './Icons';

interface AboutPageProps {
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  const dir = isAr ? 'rtl' : 'ltr';

  // Parallax Setup for Text Only
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // --- X-RAY SCANNER LOGIC (Copied from Hero) ---
  const scannerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(200); // Default center
  const y = useMotionValue(250); // Default center
  const [isHovering, setIsHovering] = useState(false);

  // Smooth mouse movement for the lens
  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Lens Size logic
  const radius = useMotionValue(0);
  const springRadius = useSpring(radius, { damping: 20, stiffness: 150 });

  useEffect(() => {
    if (isHovering) {
        radius.set(125); 
    } else {
        // Mobile Auto-Scan Logic
        const isTouch = window.matchMedia("(max-width: 1024px)").matches;
        if (isTouch) {
            radius.set(100);
            const controlsX = animate(x, [100, 300, 100], { duration: 8, repeat: Infinity, ease: "easeInOut" });
            const controlsY = animate(y, [150, 350, 150], { duration: 10, repeat: Infinity, ease: "easeInOut" });
            return () => {
                controlsX.stop();
                controlsY.stop();
            };
        } else {
            radius.set(0);
        }
    }
  }, [isHovering]);

  const clipPath = useMotionTemplate`circle(${springRadius}px at ${springX}px ${springY}px)`;
  const reticleX = useTransform(springX, (val) => val - 125); // Center 250px div
  const reticleY = useTransform(springY, (val) => val - 125);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scannerRef.current) return;
    const rect = scannerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  // ----------------------------------------------

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050505] text-alabaster overflow-hidden"
      dir={dir}
    >
        {/* Background Grids */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none architectural-grid fixed"></div>

        <div className="container mx-auto px-6 py-32 md:py-48 relative z-10">
            
            {/* 1. HERO PROFILE SECTION */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-32">
                
                {/* Visual Side (Interactive Scanner) */}
                <div className="w-full lg:w-5/12 relative group perspective-1000">
                    {/* Frame Elements */}
                    <div className="absolute -top-4 -left-4 w-full h-full border border-bronze/30 z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                    <div className="absolute -bottom-4 -right-4 w-full h-full border border-slate/10 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    
                    {/* Main Interactive Container */}
                    <motion.div 
                        ref={scannerRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="relative z-10 aspect-[3/4] bg-[#020202] overflow-hidden cursor-crosshair shadow-2xl border border-white/5"
                    >
                         {/* 1. IDLE STATE: Zaha Hadid (Dark & Moody) */}
                         <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                             <img 
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80" 
                                alt="Zaha Hadid Architecture - Surface" 
                                className="w-full h-full object-cover grayscale-[50%] contrast-[1.1] brightness-[0.6]" 
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                             
                             {/* Static Signature Overlay */}
                             <div className="absolute bottom-8 right-8 mix-blend-difference opacity-50">
                                 <span className="font-playfair italic text-3xl">A. Meklad</span>
                             </div>
                         </div>

                         {/* 2. REVEAL STATE: Blueprint/Technical (Inside Lens) */}
                         <motion.div 
                            className="absolute inset-0 w-full h-full z-20 pointer-events-none bg-black"
                            style={{ clipPath: clipPath }}
                         >
                             {/* Image Base - High Contrast / Inverted / Technical */}
                             <div className="absolute inset-0 w-full h-full z-0">
                                 <img 
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80" 
                                    alt="Structure Blueprint"
                                    className="w-full h-full object-cover filter contrast-[1.5] brightness-125 grayscale sepia-[100%] hue-rotate-[170deg] saturate-[400%]" 
                                 />
                             </div>

                             {/* Blue Technical Tint & Grid */}
                             <div className="absolute inset-0 bg-cyan-900/30 mix-blend-hard-light z-10"></div>
                             <div className="absolute inset-0 opacity-40 architectural-grid z-20 mix-blend-overlay"></div>

                             {/* Scanning Laser Line */}
                             <motion.div 
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-cyan-400 z-30 shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                             ></motion.div>

                             {/* Vector Graphics (Measurements) */}
                             <svg className="absolute inset-0 w-full h-full z-30 opacity-70" viewBox="0 0 400 600" preserveAspectRatio="none">
                                <g stroke="cyan" strokeWidth="0.5" fill="none">
                                     <line x1="50" y1="0" x2="50" y2="600" strokeDasharray="10 5" opacity="0.5" />
                                     <line x1="350" y1="0" x2="350" y2="600" strokeDasharray="10 5" opacity="0.5" />
                                     <circle cx="200" cy="300" r="100" strokeDasharray="2 2" />
                                     <path d="M100,200 L300,200 L300,400 L100,400 Z" strokeDasharray="5 5" />
                                     <text x="60" y="50" fill="cyan" fontSize="10" fontFamily="monospace">STRUCTURAL ANALYSIS</text>
                                     <text x="60" y="550" fill="cyan" fontSize="10" fontFamily="monospace">INTEGRITY: 98%</text>
                                </g>
                             </svg>
                         </motion.div>

                         {/* 3. THE LENS UI (Rotating Ring) */}
                         <motion.div 
                            className="absolute z-50 pointer-events-none w-[250px] h-[250px] rounded-full border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                            style={{ x: reticleX, y: reticleY }}
                         >
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border border-dashed border-cyan-500/20"
                            ></motion.div>
                            
                            {/* Inner HUD Elements */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[100px] h-[100px] border border-cyan-500/10"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>
                            </motion.div>

                            {/* Label */}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-cyan-400 border border-cyan-500/30 text-[0.5rem] font-mono px-2 py-1 uppercase tracking-widest whitespace-nowrap">
                                {isAr ? 'مسح: الهيكل' : 'SCAN: STRUCTURE'}
                            </div>
                         </motion.div>

                    </motion.div>
                </div>

                {/* Text Side (Bio) */}
                <motion.div 
                    style={{ y: yText }}
                    className="w-full lg:w-7/12 pt-8"
                >
                    <div className="flex items-center gap-3 mb-6 opacity-60">
                         <span className="w-12 h-[1px] bg-bronze"></span>
                         <span className="text-xs uppercase tracking-[0.3em] text-bronze">{ABOUT_CONTENT.title[lang]}</span>
                    </div>

                    <h1 className={`text-5xl md:text-7xl mb-4 ${headingFont} leading-tight`}>
                        {ABOUT_CONTENT.name[lang]}
                    </h1>
                    
                    <div className="text-sm md:text-base text-bronze uppercase tracking-widest mb-10 font-mono border-b border-white/10 pb-6 inline-block">
                        {ABOUT_CONTENT.titles[lang]}
                    </div>

                    <p className={`text-xl text-slate leading-relaxed mb-12 ${bodyFont} max-w-2xl`}>
                        {ABOUT_CONTENT.bio[lang]}
                    </p>

                    {/* Graphics House Badge */}
                    <a href="https://3dgraphicshouse.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 p-6 border border-white/10 max-w-md hover:border-bronze transition-colors group cursor-pointer">
                        <div className="bg-charcoal p-3 border border-slate/30 group-hover:border-bronze transition-colors">
                            <PenTool size={24} className="text-white group-hover:text-bronze transition-colors" />
                        </div>
                        <div>
                            <span className="block text-[0.6rem] uppercase tracking-widest text-slate mb-1">Founder & CEO</span>
                            <span className="block text-lg font-bold font-playfair tracking-wide group-hover:text-white transition-colors">GRAPHICS HOUSE</span>
                        </div>
                    </a>
                </motion.div>

            </div>

            {/* 2. PHILOSOPHY SECTION */}
            <div className="relative border-t border-white/10 pt-24">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-bronze to-transparent"></div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <Layers size={48} className="mx-auto text-bronze/50 mb-6" strokeWidth={1} />
                        <h2 className={`text-4xl md:text-5xl mb-8 ${headingFont}`}>
                            {ABOUT_CONTENT.philosophyTitle[lang]}
                        </h2>
                        <p className={`text-lg md:text-2xl text-slate/80 leading-loose ${bodyFont}`}>
                            "{ABOUT_CONTENT.philosophy[lang]}"
                        </p>
                    </div>

                    {/* Philosophy Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
                        <div className="p-8 border border-white/5 hover:border-bronze/30 transition-colors group">
                            <span className="text-4xl font-serif text-white/10 group-hover:text-bronze/20 block mb-4">I</span>
                            <h3 className={`text-xl mb-2 text-white ${headingFont}`}>{isAr ? 'المتانة' : 'Firmitas'}</h3>
                            <p className="text-xs text-slate uppercase tracking-widest">{isAr ? 'قوة الأساس' : 'Structural Strength'}</p>
                        </div>
                        <div className="p-8 border border-white/5 hover:border-bronze/30 transition-colors group">
                            <span className="text-4xl font-serif text-white/10 group-hover:text-bronze/20 block mb-4">II</span>
                            <h3 className={`text-xl mb-2 text-white ${headingFont}`}>{isAr ? 'المنفعة' : 'Utilitas'}</h3>
                            <p className="text-xs text-slate uppercase tracking-widest">{isAr ? 'كفاءة الوظيفة' : 'Functional Utility'}</p>
                        </div>
                        <div className="p-8 border border-white/5 hover:border-bronze/30 transition-colors group">
                            <span className="text-4xl font-serif text-white/10 group-hover:text-bronze/20 block mb-4">III</span>
                            <h3 className={`text-xl mb-2 text-white ${headingFont}`}>{isAr ? 'الجمال' : 'Venustas'}</h3>
                            <p className="text-xs text-slate uppercase tracking-widest">{isAr ? 'تناغم التصميم' : 'Aesthetic Harmony'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. SIGNATURE FOOTER */}
            <div className="mt-32 flex justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full border border-dashed border-slate/30 flex items-center justify-center mx-auto mb-6 animate-spin-slow">
                        <Compass size={32} className="text-bronze" />
                    </div>
                    <span className="text-[0.6rem] uppercase tracking-[0.4em] text-slate block mb-2">
                        {isAr ? 'رئيس المعماريين' : 'CHIEF ARCHITECT'}
                    </span>
                    <span className={`text-2xl ${headingFont}`}>Abraham Meklad</span>
                </div>
            </div>

        </div>
    </motion.div>
  );
};

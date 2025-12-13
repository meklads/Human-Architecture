
import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { TRANSLATIONS } from '../constants';
import { Language, View } from '../types';
import { ArrowRight, ScanLine, Grid, MousePointer, Layers, Activity } from './Icons';

interface HeroProps {
  lang: Language;
  setView: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, setView }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const isAr = lang === 'ar';

  // X-Ray Logic
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth mouse movement for the lens
  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Lens Size: 0 when hidden, 250px when hovering (Large scanner)
  const radius = useMotionValue(0);
  const springRadius = useSpring(radius, { damping: 20, stiffness: 150 });

  useEffect(() => {
    radius.set(isHovering ? 250 : 0);
  }, [isHovering]);

  // Dynamic Clip Path
  const clipPath = useMotionTemplate`circle(${springRadius}px at ${springX}px ${springY}px)`;

  // Reticle movement (Center the 500px reticle on the mouse)
  const reticleX = useTransform(springX, (val) => val - 250);
  const reticleY = useTransform(springY, (val) => val - 250);
  
  // Parallax for the texture inside (Subtle movement for depth)
  const texX = useTransform(springX, (val) => val / -30);
  const texY = useTransform(springY, (val) => val / -30);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505] pt-20 lg:pt-0">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[#080808]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10"></div>
         {/* Faint Architectural Lines */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(197,160,101,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,101,0.3) 1px, transparent 1px)', 
                backgroundSize: '100px 100px' 
            }}>
         </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="lg:col-span-7 text-center lg:text-start order-2 lg:order-1">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 border-l-2 border-bronze pl-4 mb-8"
            >
                <Activity size={16} className="text-bronze animate-pulse" />
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bronze font-mono">
                    {isAr ? 'بروتوكول إعادة التأسيس' : 'RE-FOUNDATION PROTOCOL'}
                </span>
            </motion.div>

            <h1 className={`text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-alabaster mb-10 ${lang === 'ar' ? 'font-amiri' : 'font-playfair'} tracking-tight`}>
                <div className="opacity-90 font-light text-slate">
                    <Typewriter 
                    text={TRANSLATIONS.hero.line1[lang]} 
                    onComplete={() => setShowSecondLine(true)} 
                    />
                </div>
                <div className="text-white font-bold mt-2 pb-4 relative inline-block">
                    {showSecondLine && (
                    <Typewriter 
                        text={TRANSLATIONS.hero.line2[lang]} 
                        delay={50}
                        onComplete={() => setShowButton(true)}
                    />
                    )}
                </div>
            </h1>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
                <button 
                    onClick={() => setView('landing')}
                    className="px-10 py-5 bg-bronze text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-all shadow-[0_0_20px_rgba(197,160,101,0.2)]"
                >
                   {TRANSLATIONS.hero.cta[lang]}
                </button>
                
                <button 
                    onClick={() => document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-5 border border-white/10 text-slate hover:text-white hover:border-white/50 transition-colors uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-3"
                >
                    <ScanLine size={16} />
                    {isAr ? 'فحص الحالة' : 'Run Diagnostics'}
                </button>
            </motion.div>
        </div>

        {/* VISUAL: THE ARCHITECTURAL SCANNER */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center perspective-1000">
            <motion.div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-md aspect-[3/4] bg-[#020202] overflow-hidden cursor-crosshair group shadow-2xl border border-white/5"
            >
                {/* 1. IDLE STATE: High Quality Portrait */}
                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                     <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                        alt="Human Surface"
                        className="w-full h-full object-cover grayscale-[10%] contrast-[1.1] brightness-[0.9]" 
                     />
                     {/* Gradient Vignette */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* 2. REVEAL STATE: The Architectural Hybrid (Inside Lens) */}
                <motion.div 
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none bg-black"
                    style={{
                        clipPath: clipPath
                    }}
                >
                    {/* A. The Structure Texture (Concrete) - BLENDED */}
                    <motion.div 
                        className="absolute inset-[-60px] w-[150%] h-[150%] z-10 opacity-60 mix-blend-overlay"
                        style={{ x: texX, y: texY }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop"
                            alt="Concrete Texture"
                            className="w-full h-full object-cover contrast-150"
                        />
                    </motion.div>
                    
                    {/* B. The High-Contrast Face (The Blueprint Base) */}
                    <div className="absolute inset-0 w-full h-full z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                            alt="Structure Base"
                            className="w-full h-full object-cover grayscale contrast-125 brightness-125 sepia-[0.3]" 
                         />
                    </div>

                    {/* C. Technical Overlay (Blueprint Grid) */}
                    <div className="absolute inset-0 w-full h-full z-20 opacity-40 mix-blend-screen">
                        <div className="w-full h-full" 
                             style={{ 
                                backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)', 
                                backgroundSize: '40px 40px' 
                             }}>
                        </div>
                    </div>

                    {/* D. Scanning Laser Line (Animation) */}
                    <motion.div 
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] bg-cyan-400 z-30 shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                    ></motion.div>

                    {/* E. Vector Graphics (Measurements) */}
                    <svg className="absolute inset-0 w-full h-full z-30 opacity-80" viewBox="0 0 400 600" preserveAspectRatio="none">
                        <g stroke="cyan" strokeWidth="0.5" fill="none">
                             {/* Face Geometry */}
                             <path d="M100,200 L120,250 L280,250 L300,200" strokeDasharray="5 5" />
                             <circle cx="200" cy="280" r="80" strokeDasharray="2 2" />
                             
                             {/* Vertical Axis */}
                             <line x1="200" y1="0" x2="200" y2="600" strokeDasharray="10 5" opacity="0.5" />
                             
                             {/* Data Points */}
                             <circle cx="150" cy="320" r="2" fill="cyan" />
                             <line x1="150" y1="320" x2="100" y2="350" />
                             <text x="50" y="360" fill="cyan" fontSize="8" fontFamily="monospace" opacity="0.8">LOAD: 85%</text>

                             <circle cx="250" cy="320" r="2" fill="cyan" />
                             <line x1="250" y1="320" x2="300" y2="350" />
                             <text x="280" y="360" fill="cyan" fontSize="8" fontFamily="monospace" opacity="0.8">INTEGRITY: OK</text>
                        </g>
                    </svg>

                </motion.div>

                {/* 3. THE LENS UI (Ring) */}
                <motion.div 
                    className="absolute z-50 pointer-events-none w-[500px] h-[500px] rounded-full border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                    style={{ 
                        x: reticleX, 
                        y: reticleY,
                        opacity: isHovering ? 1 : 0
                    }}
                >
                    {/* Rotating Rings */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 rounded-full border border-dashed border-cyan-500/20"
                    ></motion.div>
                     <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-10 rounded-full border border-dotted border-cyan-500/20"
                    ></motion.div>

                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-cyan-400 border border-cyan-500/50 text-[0.6rem] font-mono px-3 py-1 uppercase tracking-widest shadow-lg">
                        {isAr ? 'ماسح طبوغرافي' : 'TOPOGRAPHIC SCAN'}
                    </div>
                </motion.div>

                {/* HINT */}
                <div className={`absolute bottom-8 left-0 w-full text-center z-40 transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-full animate-pulse">
                        <Layers size={14} className="text-bronze" />
                        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/80">
                            {isAr ? 'تحليل البنية التحتية' : 'ANALYZE INFRASTRUCTURE'}
                        </span>
                    </div>
                </div>

            </motion.div>
        </div>

      </div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[0.5rem] uppercase tracking-[0.3em] text-slate">{isAr ? 'بدء التحليل' : 'INITIALIZE'}</span>
        <div className="w-px h-8 bg-gradient-to-b from-bronze to-transparent"></div>
      </motion.div>
    </section>
  );
};

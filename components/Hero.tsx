
import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { TRANSLATIONS } from '../constants';
import { Language, View } from '../types';
import { ArrowRight, Compass, MousePointer, ScanLine, Activity } from './Icons';

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

  // Radius animation for the X-Ray circle (0 when not hovering, 120 when hovering)
  const radius = useMotionValue(0);
  const springRadius = useSpring(radius, { damping: 20, stiffness: 150 });

  useEffect(() => {
    radius.set(isHovering ? 120 : 0);
  }, [isHovering]);

  // Create the dynamic clip-path string at the top level
  const clipPath = useMotionTemplate`circle(${springRadius}px at ${springX}px ${springY}px)`;

  // Reticle movement (Center the 240px reticle on the mouse)
  const reticleX = useTransform(springX, (val) => val - 120);
  const reticleY = useTransform(springY, (val) => val - 120);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a] pt-20 lg:pt-0">
      
      {/* BACKGROUND: Living Architecture Pulse */}
      <div className="absolute inset-0 z-0">
         {/* Base Dark Texture */}
         <div className="absolute inset-0 bg-[#0F0F0F] opacity-90"></div>
         
         {/* The "Breathing" Grid */}
         <motion.div 
            animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"
         ></motion.div>

         {/* Cinematic Light Beams */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bronze/10 to-transparent blur-3xl transform skew-x-12"></div>
         <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-charcoal/50 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="lg:col-span-7 text-center lg:text-start order-2 lg:order-1">
            {/* Status Badge */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1 mb-8 rounded-full backdrop-blur-sm"
            >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-slate font-mono">
                    {isAr ? 'النظام جاهز للترميم' : 'SYSTEM READY FOR RECONSTRUCTION'}
                </span>
            </motion.div>

            <h1 className={`text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-alabaster mb-10 ${lang === 'ar' ? 'font-amiri' : 'font-playfair'} tracking-tight`}>
                <div className="opacity-80 font-light">
                    <Typewriter 
                    text={TRANSLATIONS.hero.line1[lang]} 
                    onComplete={() => setShowSecondLine(true)} 
                    />
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-bronze to-white font-bold mt-2 pb-4">
                    {showSecondLine && (
                    <Typewriter 
                        text={TRANSLATIONS.hero.line2[lang]} 
                        delay={60}
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
                    className="group relative px-8 py-5 bg-bronze text-white overflow-hidden shadow-[0_0_30px_rgba(197,160,101,0.3)] hover:shadow-[0_0_50px_rgba(197,160,101,0.5)] transition-all"
                >
                    <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out mix-blend-overlay"></span>
                    <span className={`relative flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-bold`}>
                       {TRANSLATIONS.hero.cta[lang]} <ArrowRight size={16} />
                    </span>
                </button>
                
                <button 
                    onClick={() => document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-5 border border-white/20 text-slate hover:text-white hover:border-white transition-colors text-sm uppercase tracking-[0.2em] flex items-center gap-2"
                >
                    <ScanLine size={16} />
                    {isAr ? 'فحص الحالة' : 'Run Diagnostics'}
                </button>
            </motion.div>
        </div>

        {/* VISUAL: THE INTERACTIVE X-RAY SCANNER */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center perspective-1000">
            <motion.div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-md aspect-[3/4] border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-crosshair group shadow-2xl"
            >
                {/* HUD OVERLAY */}
                <div className="absolute top-4 left-4 z-30 text-[0.6rem] font-mono text-slate/50 pointer-events-none">
                    <div className="flex items-center gap-2 text-bronze mb-1">
                        <Activity size={10} className="animate-pulse" />
                        <span>BIO-SCANNER: ONLINE</span>
                    </div>
                    <div>SUBJECT: HUMAN_01</div>
                </div>

                {/* LAYER 1: THE SURFACE (Human Appearance) */}
                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                     <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                        alt="Human Surface"
                        className="w-full h-full object-cover grayscale opacity-60 contrast-125"
                     />
                     {/* Dark gradient to blend with bg */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>

                {/* LAYER 2: THE BLUEPRINT (X-Ray Reveal) */}
                {/* We use a mask on this layer that follows the mouse using useMotionTemplate */}
                <motion.div 
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none bg-[#001a33]"
                    style={{
                        clipPath: clipPath
                    }}
                >
                    {/* The "Blueprint" version of the image */}
                    <div className="absolute inset-0 w-full h-full opacity-100 mix-blend-screen">
                        {/* 1. The Image processed to look like a blueprint (Inverted, Blue-tinted) */}
                         <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                            alt="Blueprint Internal"
                            className="w-full h-full object-cover"
                            style={{ 
                                filter: 'invert(1) sepia(1) saturate(5) hue-rotate(190deg) contrast(1.5) brightness(0.8)',
                            }}
                         />
                    </div>
                    
                    {/* 2. Technical Grid Overlay inside the X-Ray */}
                    <div className="absolute inset-0 architectural-grid opacity-30"></div>
                    
                    {/* 3. Data Points inside X-Ray */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#64ffda] w-32 h-32 rounded-full opacity-50 animate-spin-slow"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-[1px] bg-[#64ffda] opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-[1px] bg-[#64ffda] opacity-50"></div>
                </motion.div>

                {/* SCANNER LINE (Idle Animation when not hovering) */}
                {!isHovering && (
                    <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-[2px] bg-bronze/50 z-20 shadow-[0_0_20px_rgba(197,160,101,0.8)]"
                    >
                        <div className="absolute right-2 -top-6 text-[0.5rem] text-bronze uppercase tracking-widest bg-black/50 px-1">Scanning...</div>
                    </motion.div>
                )}

                {/* MOUSE FOLLOWER RETICLE */}
                {/* We render this always but hide it via opacity if needed, 
                    using top-level transforms to avoid hook violations */}
                <motion.div 
                    className="absolute z-50 pointer-events-none w-60 h-60 border border-bronze/30 rounded-full flex items-center justify-center"
                    style={{ 
                        x: reticleX, 
                        y: reticleY,
                        opacity: isHovering ? 1 : 0
                    }}
                >
                    <div className="absolute top-0 w-[1px] h-4 bg-bronze"></div>
                    <div className="absolute bottom-0 w-[1px] h-4 bg-bronze"></div>
                    <div className="absolute left-0 h-[1px] w-4 bg-bronze"></div>
                    <div className="absolute right-0 h-[1px] w-4 bg-bronze"></div>
                    
                    <div className="absolute -bottom-8 text-center w-full">
                        <span className="text-[0.5rem] bg-bronze text-black px-2 py-1 uppercase font-bold tracking-widest">
                            {isAr ? 'كشف الهيكل' : 'STRUCTURAL X-RAY'}
                        </span>
                    </div>
                </motion.div>
                
                {/* Hint Text */}
                <div className={`absolute bottom-6 left-0 w-full text-center z-40 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
                        <MousePointer size={12} className="text-bronze animate-bounce" />
                        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white">
                            {isAr ? 'مرر الماوس للكشف' : 'HOVER TO REVEAL STRUCTURE'}
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
        <span className="text-[0.5rem] uppercase tracking-[0.3em] text-slate">{isAr ? 'ابدأ الفحص' : 'Initialize Scan'}</span>
        <MousePointer size={16} className="text-bronze" />
      </motion.div>
    </section>
  );
};

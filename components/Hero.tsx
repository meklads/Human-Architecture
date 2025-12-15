
import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useMotionTemplate, animate } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { TRANSLATIONS } from '../constants';
import { Language, View } from '../types';
import { ArrowRight, ScanLine, Grid, MousePointer, Layers, Activity } from './Icons';
import { Magnetic } from './Magnetic';

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
  const x = useMotionValue(250); // Default center
  const y = useMotionValue(300); // Default center
  const [isHovering, setIsHovering] = useState(false);

  // Smooth mouse movement for the lens
  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Lens Size: 0 when hidden, 125px (Half Size) when hovering
  const radius = useMotionValue(0);
  const springRadius = useSpring(radius, { damping: 20, stiffness: 150 });

  useEffect(() => {
    // If hovering (mouse usage), show lens.
    // IF NOT hovering, check if it's likely a touch device to run auto-scan.
    if (isHovering) {
        radius.set(125); // Reduced from 250 to 125
    } else {
        // MOBILE AUTO-SCAN LOGIC
        // We set radius to open up on mobile load
        const isTouch = window.matchMedia("(max-width: 1024px)").matches;
        if (isTouch) {
            // Smaller radius for mobile
            radius.set(100);
            
            // Much slower, smoother animation loop
            // Constrain movement to be more central to avoid jarring edges
            const controlsX = animate(x, [120, 220, 120], { duration: 12, repeat: Infinity, ease: "easeInOut" });
            const controlsY = animate(y, [200, 300, 200], { duration: 15, repeat: Infinity, ease: "easeInOut" });
            
            return () => {
                controlsX.stop();
                controlsY.stop();
            };
        } else {
            radius.set(0);
        }
    }
  }, [isHovering]);

  // Dynamic Clip Path
  const clipPath = useMotionTemplate`circle(${springRadius}px at ${springX}px ${springY}px)`;

  // Reticle movement (Center the 250px reticle on the mouse) - Adjusted offset to 125
  const reticleX = useTransform(springX, (val) => val - 125);
  const reticleY = useTransform(springY, (val) => val - 125);
  
  // Parallax for the texture inside (Subtle movement for depth)
  const texX = useTransform(springX, (val) => val / -20);
  const texY = useTransform(springY, (val) => val / -20);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleCtaClick = () => {
      const assessmentSection = document.getElementById('assessment-section');
      if (assessmentSection) {
          assessmentSection.scrollIntoView({ behavior: 'smooth' });
      } else {
          setView('landing');
          // Try to scroll after a brief delay if switching views
          setTimeout(() => {
              const el = document.getElementById('assessment-section');
              el?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
      }
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
                <Magnetic strength={0.4}>
                    <button 
                        onClick={handleCtaClick}
                        className="px-10 py-5 bg-bronze text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-all shadow-[0_0_20px_rgba(197,160,101,0.2)]"
                    >
                    {TRANSLATIONS.hero.cta[lang]}
                    </button>
                </Magnetic>
                
                <Magnetic strength={0.2}>
                    <button 
                        onClick={handleCtaClick}
                        className="px-10 py-5 border border-white/10 text-slate hover:text-white hover:border-white/50 transition-colors uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-3"
                    >
                        <ScanLine size={16} />
                        {isAr ? 'فحص الحالة' : 'Run Diagnostics'}
                    </button>
                </Magnetic>
            </motion.div>
        </div>

        {/* VISUAL: THE DOUBLE EXPOSURE SCANNER */}
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
                {/* 1. IDLE STATE: High Quality Portrait (THE DARK ONE) */}
                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                     <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                        alt="Human Surface"
                        className="w-full h-full object-cover grayscale-[10%] contrast-[1.1] brightness-[0.9]" 
                     />
                     {/* Gradient Vignette */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* 2. REVEAL STATE: 50% Double Exposure (Inside Lens) */}
                <motion.div 
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none bg-black"
                    style={{
                        clipPath: clipPath
                    }}
                >
                    {/* A. Base Face Layer (Inside Lens) - High Contrast */}
                    <div className="absolute inset-0 w-full h-full z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                            alt="Structure Base"
                            className="w-full h-full object-cover grayscale contrast-125 brightness-110" 
                         />
                    </div>

                    {/* B. The Building Structure - 50% Opacity + Blending */}
                    <motion.div 
                        className="absolute inset-[-60px] w-[150%] h-[150%] z-10 opacity-50 mix-blend-hard-light"
                        style={{ x: texX, y: texY }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                            alt="Building Overlay"
                            className="w-full h-full object-cover grayscale contrast-150"
                        />
                    </motion.div>
                    
                    {/* C. Blue Technical Tint */}
                    <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-20"></div>

                    {/* D. Scanning Laser Line (Animation) */}
                    <motion.div 
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[1px] bg-cyan-400/50 z-30 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                    ></motion.div>

                    {/* E. Vector Graphics (Measurements) */}
                    <svg className="absolute inset-0 w-full h-full z-30 opacity-60" viewBox="0 0 400 600" preserveAspectRatio="none">
                        <g stroke="cyan" strokeWidth="0.5" fill="none">
                             {/* Face Geometry */}
                             <path d="M100,200 L120,250 L280,250 L300,200" strokeDasharray="5 5" />
                             <circle cx="200" cy="280" r="80" strokeDasharray="2 2" />
                             
                             {/* Vertical Axis */}
                             <line x1="200" y1="0" x2="200" y2="600" strokeDasharray="10 5" opacity="0.3" />
                             
                             {/* Data Points */}
                             <circle cx="150" cy="320" r="1.5" fill="cyan" />
                             <line x1="150" y1="320" x2="100" y2="350" />
                             <text x="50" y="360" fill="cyan" fontSize="8" fontFamily="monospace" opacity="0.8">LOAD: 85%</text>

                             <circle cx="250" cy="320" r="1.5" fill="cyan" />
                             <line x1="250" y1="320" x2="300" y2="350" />
                             <text x="280" y="360" fill="cyan" fontSize="8" fontFamily="monospace" opacity="0.8">INTEGRITY: OK</text>
                        </g>
                    </svg>

                </motion.div>

                {/* 3. THE LENS UI (Ring + Geometric Shapes) */}
                {/* REDUCED SIZE: Width/Height 250px (was 500px) */}
                <motion.div 
                    className="absolute z-50 pointer-events-none w-[250px] h-[250px] rounded-full border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                    style={{ 
                        x: reticleX, 
                        y: reticleY,
                        opacity: 1 // Always visible, controlled by clipPath validity
                    }}
                >
                    {/* A. Outer Rotating Rings */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-dashed border-cyan-500/10"
                    ></motion.div>

                    {/* B. Rotating Square HUD (New Addition) - Scaled Down */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[120px] h-[120px] border border-cyan-500/10"
                    >
                         {/* Corners for Tech Feel */}
                         <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
                         <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
                         <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
                         <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
                    </motion.div>

                    {/* C. Pulsing Inner Circle (New Addition) - Scaled Down */}
                    <motion.div
                         animate={{ scale: [0.8, 1, 0.8], opacity: [0.1, 0.4, 0.1] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                         className="absolute w-[60px] h-[60px] rounded-full border border-cyan-500/30 bg-cyan-500/5"
                    ></motion.div>

                    {/* D. Center Crosshair (New Addition) */}
                    <div className="absolute w-4 h-4 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-cyan-500/80"></div>
                        <div className="h-full w-[1px] bg-cyan-500/80 absolute"></div>
                    </div>

                    {/* Label */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-cyan-400 border border-cyan-500/50 text-[0.6rem] font-mono px-3 py-1 uppercase tracking-widest shadow-lg whitespace-nowrap">
                        {isAr ? 'دمج: إنسان/بنيان' : 'MERGE: HUMAN/STRUCT'}
                    </div>
                </motion.div>

                {/* HINT - Hide on Mobile/Touch as it auto scans */}
                <div className={`absolute bottom-8 left-0 w-full text-center z-40 transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'} hidden lg:block`}>
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
        onClick={handleCtaClick}
      >
        <span className="text-[0.5rem] uppercase tracking-[0.3em] text-slate">{isAr ? 'بدء التحليل' : 'INITIALIZE'}</span>
        <div className="w-px h-8 bg-gradient-to-b from-bronze to-transparent"></div>
      </motion.div>
    </section>
  );
};

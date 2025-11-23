
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { TRANSLATIONS } from '../constants';
import { Language, View } from '../types';
import { ArrowRight, Compass, MousePointer } from './Icons';

interface HeroProps {
  lang: Language;
  setView: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, setView }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const isAr = lang === 'ar';

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      
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
        <div className="lg:col-span-8 text-center lg:text-start">
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

            <h1 className={`text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-alabaster mb-10 ${lang === 'ar' ? 'font-amiri' : 'font-playfair'} tracking-tight`}>
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
                    className="px-8 py-5 border border-white/20 text-slate hover:text-white hover:border-white transition-colors text-sm uppercase tracking-[0.2em]"
                >
                    {isAr ? 'فحص الحالة' : 'Run Diagnostics'}
                </button>
            </motion.div>
        </div>

        {/* VISUAL: THE GYROSCOPIC CORE (Replaced Broken Image) */}
        <div className="lg:col-span-4 hidden lg:block perspective-1000">
            <motion.div 
                initial={{ rotateY: -30, rotateX: 10, opacity: 0 }}
                animate={{ rotateY: [-30, -20, -30], rotateX: [10, 5, 10], opacity: 1 }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", opacity: { duration: 2 } }}
                className="relative w-full aspect-[3/4] border-2 border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-between transform-style-3d shadow-2xl"
            >
                {/* Simulated HUD Overlay */}
                <div className="absolute top-4 left-4 text-[0.5rem] font-mono text-bronze">
                    ID: HUMAN_01<br/>
                    STR: 68%<br/>
                    CORE: STABLE
                </div>
                <div className="absolute top-4 right-4">
                    <Compass size={24} className="text-white/20 animate-spin-slow" />
                </div>
                
                {/* Center Graphic: THE GYROSCOPE */}
                <div className="flex-1 flex items-center justify-center relative">
                    {/* Outer Ring */}
                    <div className="w-48 h-48 rounded-full border border-white/10 absolute animate-[spin_10s_linear_infinite]"></div>
                    <div className="w-48 h-48 rounded-full border-t border-b border-bronze/30 absolute animate-[spin_15s_linear_infinite_reverse]"></div>
                    
                    {/* Middle Ring */}
                    <div className="w-32 h-32 rounded-full border border-white/20 absolute animate-[spin_8s_linear_infinite] border-dashed"></div>
                    
                    {/* Inner Ring (3D Tilt) */}
                    <div className="w-24 h-24 rounded-full border-2 border-bronze absolute animate-[spin_5s_linear_infinite] shadow-[0_0_20px_rgba(197,160,101,0.5)]"></div>
                    
                    {/* The Core Point */}
                    <div className="w-4 h-4 bg-white rounded-full absolute shadow-[0_0_10px_white] animate-pulse"></div>
                </div>

                {/* Bottom Lines */}
                <div className="space-y-2">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="flex justify-between text-[0.5rem] uppercase tracking-widest text-slate/50 font-mono">
                        <span>Balance Logic</span>
                        <span>Active</span>
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

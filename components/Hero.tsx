
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-concrete">
      {/* Background Video Simulation (Using Image with overlay for performance/demo) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/architecture/1920/1080?grayscale&blur=2" 
          alt="Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-alabaster/60 dark:bg-darkBg/80 mix-blend-multiply transition-colors duration-700"></div>
        
        {/* Light beam effect */}
        <div className="absolute top-0 right-1/4 w-[20%] h-full bg-gradient-to-b from-white/20 to-transparent transform -skew-x-12 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h1 className={`text-4xl md:text-6xl lg:text-7xl leading-tight text-charcoal dark:text-alabaster mb-12 ${lang === 'ar' ? 'font-amiri' : 'font-playfair'}`}>
          <div className="mb-6 min-h-[1.2em] font-light tracking-wide">
            <Typewriter 
              text={TRANSLATIONS.hero.line1[lang]} 
              onComplete={() => setShowSecondLine(true)} 
            />
          </div>
          <div className="text-bronze min-h-[1.2em] font-bold drop-shadow-lg">
            {showSecondLine && (
              <Typewriter 
                text={TRANSLATIONS.hero.line2[lang]} 
                delay={80}
                onComplete={() => setShowButton(true)}
              />
            )}
          </div>
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
          transition={{ duration: 1 }}
        >
          <button className="group relative px-10 py-5 border-2 border-charcoal dark:border-concrete overflow-hidden transition-all hover:border-bronze shadow-xl">
            <span className="absolute inset-0 w-full h-full bg-bronze transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className={`relative group-hover:text-white text-charcoal dark:text-concrete text-lg uppercase tracking-[0.25em] ${lang === 'ar' ? 'font-ibm font-bold' : 'font-montserrat font-semibold'}`}>
              {TRANSLATIONS.hero.cta[lang]}
            </span>
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate dark:text-slate/50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BlueprintOverlay = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden mix-blend-screen text-[#89cff0]">
      {/* 1. Global Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
            backgroundImage: 'linear-gradient(rgba(137, 207, 240, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(137, 207, 240, 0.3) 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
        }}
      ></div>

      {/* 2. Crosshairs following mouse (X and Y Axis) */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[1px] bg-cyan-400/30"
        style={{ left: mousePos.x }}
      />
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-cyan-400/30"
        style={{ top: mousePos.y }}
      />
      
      {/* 3. Mouse Coordinates Label */}
      <motion.div 
        className="absolute text-[0.5rem] font-mono text-cyan-400 bg-black/50 px-1 border border-cyan-400/50"
        style={{ left: mousePos.x + 10, top: mousePos.y + 10 }}
      >
        X:{mousePos.x.toFixed(0)} Y:{mousePos.y.toFixed(0)}
      </motion.div>

      {/* 4. Corner Markers */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50"></div>

      {/* 5. Random Technical Data (Decorations) */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-8 opacity-60">
          <div className="text-[0.4rem] font-mono uppercase tracking-widest writing-vertical-lr rotate-180">
              Structural Integrity Check
          </div>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
          <div className="text-[0.4rem] font-mono">
              SEC-01<br/>SEC-02<br/>SEC-03
          </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-12 opacity-60">
           <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-cyan-500 animate-pulse"></div>
               <span className="text-[0.5rem] uppercase tracking-widest font-mono">Live Feed</span>
           </div>
           <div className="flex items-center gap-2">
               <div className="w-full h-[1px] bg-cyan-500 w-12"></div>
               <span className="text-[0.5rem] uppercase tracking-widest font-mono">Scale 1:1</span>
           </div>
      </div>
      
      {/* 6. Scanning Bar Animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.2)] animate-scan opacity-30"></div>

    </div>
  );
};

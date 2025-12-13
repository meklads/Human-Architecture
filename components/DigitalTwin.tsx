
import React from 'react';
import { motion } from 'framer-motion';

interface DigitalTwinProps {
  foundation: number; // 0-100 (Body)
  structure: number;  // 0-100 (Mind - Inverse: High is stable)
  energy: number;     // 0-100 (Soul)
  isAr: boolean;
}

export const DigitalTwin: React.FC<DigitalTwinProps> = ({ foundation, structure, energy, isAr }) => {
  
  // Determine Colors based on status
  const foundationColor = foundation < 50 ? '#ef4444' : foundation < 80 ? '#C5A065' : '#10b981'; // Red -> Bronze -> Green
  const structureColor = structure < 50 ? '#ef4444' : '#60a5fa'; // Red (Stress) -> Blue (Calm)
  const energyColor = energy < 40 ? '#525252' : '#fbbf24'; // Dim -> Bright Gold

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-[#050505] overflow-hidden border border-white/10 shadow-inner group">
      
      {/* 1. Holographic Grid Floor */}
      <div className="absolute bottom-0 w-full h-[150px] bg-[linear-gradient(to_top,rgba(197,160,101,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(197,160,101,0.1)_1px,transparent_1px)] bg-[size:40px_20px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-50"></div>

      {/* 2. THE BUILDING SVG */}
      <svg viewBox="0 0 200 400" className="h-[80%] z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          
          {/* A. FOUNDATION (Body) */}
          <motion.g animate={{ filter: foundation < 40 ? ["blur(1px)", "blur(0px)"] : "blur(0px)" }}>
            {/* Concrete Base */}
            <path d="M40,350 L160,350 L180,390 L20,390 Z" fill={foundationColor} opacity="0.2" stroke={foundationColor} strokeWidth="2" />
            
            {/* Cracks (Visible if health low) */}
            {foundation < 50 && (
                <path d="M60,390 L70,370 L65,360 M140,390 L130,360" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-pulse" />
            )}
            
            {/* Status Label */}
            <text x="100" y="380" textAnchor="middle" fontSize="8" fill={foundationColor} fontFamily="monospace" letterSpacing="2">
                SEC-B: {foundation}%
            </text>
          </motion.g>

          {/* B. STRUCTURE (Mind) */}
          <motion.g>
              {/* Main Tower Body */}
              <rect x="60" y="100" width="80" height="250" fill={structureColor} fillOpacity="0.1" stroke={structureColor} strokeWidth="1" />
              
              {/* Internal Grid / Windows */}
              <pattern id="windows" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="10" height="10" fill={structureColor} fillOpacity={structure > 60 ? "0.3" : "0.1"} />
              </pattern>
              <rect x="60" y="100" width="80" height="250" fill="url(#windows)" />

              {/* Stress Glitch Effect (If structure low) */}
              {structure < 50 && (
                  <motion.rect 
                    x="55" y="150" width="90" height="10" fill="red" opacity="0.5"
                    animate={{ y: [150, 250, 150], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                  />
              )}
          </motion.g>

          {/* C. PENTHOUSE / LIGHT (Soul) */}
          <motion.g>
              <path d="M60,100 L100,60 L140,100 Z" fill={energyColor} fillOpacity="0.2" stroke={energyColor} strokeWidth="2" />
              {/* The Light Beacon */}
              <circle cx="100" cy="85" r="5" fill={energyColor}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={`${energy > 50 ? '4s' : '0.5s'}`} repeatCount="indefinite" />
              </circle>
              {/* Beam of light */}
              <path d="M100,85 L100,0" stroke={energyColor} strokeWidth="20" strokeOpacity={energy / 200} style={{ filter: 'blur(8px)' }} />
          </motion.g>

      </svg>

      {/* 3. DIAGNOSTIC OVERLAY */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${foundation > 50 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
              <span className="text-[0.5rem] uppercase tracking-widest text-slate font-mono">
                  {isAr ? 'الأساسات' : 'BASE'}: {foundation > 50 ? 'STABLE' : 'CRITICAL'}
              </span>
          </div>
          <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${structure > 50 ? 'bg-blue-500' : 'bg-red-500 animate-pulse'}`}></div>
              <span className="text-[0.5rem] uppercase tracking-widest text-slate font-mono">
                  {isAr ? 'العقل' : 'CORE'}: {structure}% LOAD
              </span>
          </div>
          <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${energy > 50 ? 'bg-yellow-500' : 'bg-slate-500'}`}></div>
              <span className="text-[0.5rem] uppercase tracking-widest text-slate font-mono">
                  {isAr ? 'الطاقة' : 'PWR'}: {energy}%
              </span>
          </div>
      </div>

      {/* 4. SCANNING EFFECT */}
      <motion.div 
        className="absolute top-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.8)] opacity-50 pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
    </div>
  );
};

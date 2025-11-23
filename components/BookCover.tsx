import React from 'react';
import { Compass } from './Icons';

interface BookCoverProps {
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ className }) => {
  return (
    <div className={`relative aspect-[2/3] bg-[#F2F0EB] shadow-2xl overflow-hidden flex flex-col ${className}`}>
       {/* --- LAYERS OF TEXTURE --- */}
       
       {/* 1. Base Concrete Noise */}
       <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] pointer-events-none mix-blend-multiply contrast-125"></div>
       
       {/* 2. Architectural Grid System (Blueprint Style) */}
       <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(#2B2B2B 0.5px, transparent 0.5px), linear-gradient(90deg, #2B2B2B 0.5px, transparent 0.5px)', 
                backgroundSize: '40px 40px' 
            }}>
       </div>
       <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(#2B2B2B 0.5px, transparent 0.5px), linear-gradient(90deg, #2B2B2B 0.5px, transparent 0.5px)', 
                backgroundSize: '10px 10px' 
            }}>
       </div>

       {/* 3. Spine Shadow (Left Binding Effect) */}
       <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 to-transparent z-20"></div>
       <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/50 z-20"></div>

       {/* --- CONTENT LAYOUT --- */}
       <div className="relative h-full flex flex-col p-6 md:p-10 z-10 border-[16px] border-double border-[#2B2B2B]/5 mx-2 my-1">
          
          {/* HEADER: Technical Specs */}
          <div className="flex justify-between items-start border-b border-[#2B2B2B] pb-4 mb-8 relative z-20">
             <div className="flex flex-col">
                <span className="text-[0.45rem] uppercase tracking-[0.3em] text-[#8C9598] font-montserrat">Project No.</span>
                <span className="text-xs font-bold text-[#2B2B2B] font-mono">ARCH-HUMAN-01</span>
             </div>
             <div className="flex items-center gap-2">
                 <Compass size={18} className="text-[#C5A065]" />
                 <div className="h-4 w-[1px] bg-[#2B2B2B]/20"></div>
                 <span className="text-[0.45rem] uppercase tracking-[0.2em] text-[#2B2B2B] font-bold">Original<br/>Blueprint</span>
             </div>
          </div>

          {/* CENTER: The Structural Art & Title */}
          <div className="flex-1 relative flex flex-col justify-center">
             
             {/* The "Kintsugi" Crack Line - Golden Repair */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" viewBox="0 0 300 400">
                 <path d="M100,0 Q120,100 90,150 T140,250 Q110,350 150,400" fill="none" stroke="#C5A065" strokeWidth="1.5" />
                 <path d="M102,0 Q122,100 92,150 T142,250 Q112,350 152,400" fill="none" stroke="#C5A065" strokeWidth="0.5" opacity="0.5" />
                 {/* Golden Splatter/Dust */}
                 <circle cx="90" cy="150" r="1.5" fill="#C5A065" />
                 <circle cx="145" cy="250" r="2" fill="#C5A065" />
                 <circle cx="130" cy="220" r="1" fill="#C5A065" />
             </svg>

             {/* NEW: THE FOUR PILLARS SCHEMATIC */}
             <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[180px] h-[180px] z-0 opacity-30 pointer-events-none mix-blend-multiply">
                {/* Axis Lines */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2B2B2B] border-t border-dashed border-[#2B2B2B]/50"></div>
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#2B2B2B] border-l border-dashed border-[#2B2B2B]/50"></div>
                
                {/* Pillars Plan */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-8 p-6">
                    <div className="border-2 border-[#2B2B2B] relative flex items-center justify-center">
                         <span className="absolute -top-3 -left-2 text-[0.5rem] font-mono font-bold text-[#2B2B2B]">m</span>
                    </div>
                    <div className="border-2 border-[#2B2B2B] relative flex items-center justify-center">
                         <span className="absolute -top-3 -right-2 text-[0.5rem] font-mono font-bold text-[#2B2B2B]">b</span>
                    </div>
                    <div className="border-2 border-[#2B2B2B] bg-[#C5A065]/20 relative flex items-center justify-center">
                         <span className="absolute -bottom-3 -left-2 text-[0.5rem] font-mono font-bold text-[#2B2B2B]">s</span>
                    </div>
                    <div className="border-2 border-[#2B2B2B] relative flex items-center justify-center">
                         <span className="absolute -bottom-3 -right-2 text-[0.5rem] font-mono font-bold text-[#2B2B2B]">f</span>
                    </div>
                </div>
                
                {/* Circular Dome Radius */}
                <div className="absolute inset-0 border border-[#2B2B2B] rounded-full m-2 opacity-50"></div>
             </div>

             {/* Main Typography Block */}
             <div className="relative z-10 mix-blend-darken mt-[-20px]">
                 <div className="flex flex-col items-center">
                     {/* HUMAN */}
                     <div className="relative">
                         <h1 className="text-5xl md:text-7xl font-playfair font-bold text-[#2B2B2B] tracking-tighter leading-[0.85]">
                             HUMAN
                         </h1>
                         {/* Architectural dimension lines */}
                         <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-[#2B2B2B] flex flex-col justify-between">
                             <div className="w-2 h-[1px] bg-[#2B2B2B]"></div>
                             <div className="w-2 h-[1px] bg-[#2B2B2B]"></div>
                         </div>
                     </div>

                     {/* SEPARATOR */}
                     <div className="w-full h-[2px] bg-[#2B2B2B] my-4 flex items-center justify-center gap-4">
                        <div className="w-2 h-2 bg-[#2B2B2B] rounded-full"></div>
                        <span className="text-[0.5rem] uppercase tracking-[0.5em] bg-[#F2F0EB] px-2 text-[#8C9598]">As Structure</span>
                        <div className="w-2 h-2 bg-[#2B2B2B] rounded-full"></div>
                     </div>

                     {/* ARCHITECTURE */}
                     <h1 className="text-3xl md:text-[2.75rem] font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#2B2B2B] to-[#555] tracking-[0.15em] leading-[0.85] text-justify w-full flex justify-between">
                        <span>A</span><span>R</span><span>C</span><span>H</span><span>I</span><span>T</span><span>E</span><span>C</span><span>T</span><span>U</span><span>R</span><span>E</span>
                     </h1>
                 </div>
             </div>
          </div>

          {/* FOOTER: Authority & Scale */}
          <div className="mt-auto pt-6 border-t-2 border-[#2B2B2B] relative z-20 bg-[#F2F0EB]/80 backdrop-blur-[1px]">
             <div className="flex justify-between items-end">
                 <div>
                    <p className="text-[0.5rem] font-montserrat tracking-[0.2em] text-[#8C9598] uppercase mb-1">
                       The Architect
                    </p>
                    <p className="text-sm font-bold font-playfair tracking-wide text-[#2B2B2B]">
                       ABRAHAM MEKLAD
                    </p>
                 </div>
                 
                 {/* Seal Graphic */}
                 <div className="relative w-12 h-12 border border-[#2B2B2B] rounded-full flex items-center justify-center p-1">
                    <div className="w-full h-full border border-[#2B2B2B] rounded-full border-dashed flex items-center justify-center animate-spin-slow">
                        <span className="text-[0.3rem] font-bold text-[#2B2B2B]">IHAM</span>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#C5A065] text-white text-[0.35rem] font-bold px-1 shadow-sm">
                        APPVD
                    </div>
                 </div>
             </div>
             
             <div className="flex justify-between items-end mt-4">
                {/* Scale Bar */}
                <div className="flex items-center gap-1 w-1/3">
                    <div className="h-1 flex-1 bg-[#2B2B2B]"></div>
                    <div className="h-1 flex-1 bg-[#8C9598]"></div>
                    <div className="h-1 flex-1 bg-[#C5A065]"></div>
                    <span className="text-[0.4rem] uppercase tracking-widest ml-2 text-[#8C9598]">1:1</span>
                </div>

                {/* QR Digital Twin Stamp */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="flex flex-col items-end text-right">
                        <span className="text-[0.35rem] uppercase tracking-widest font-bold text-[#2B2B2B] leading-none">Digital Twin</span>
                        <span className="text-[0.25rem] uppercase tracking-wider text-[#C5A065] leading-none mt-[2px]">Scan for Audio</span>
                    </div>
                    <div className="w-8 h-8 bg-white border border-[#2B2B2B] p-[3px] shadow-sm group-hover:scale-105 transition-transform">
                        {/* Architectural QR Representation */}
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#2B2B2B]">
                            <rect x="0" y="0" width="40" height="40" fill="#2B2B2B" />
                            <rect x="5" y="5" width="30" height="30" fill="white" />
                            <rect x="10" y="10" width="20" height="20" fill="#2B2B2B" />
                            
                            <rect x="60" y="0" width="40" height="40" fill="#2B2B2B" />
                            <rect x="65" y="5" width="30" height="30" fill="white" />
                            <rect x="70" y="10" width="20" height="20" fill="#2B2B2B" />
                            
                            <rect x="0" y="60" width="40" height="40" fill="#2B2B2B" />
                            <rect x="5" y="65" width="30" height="30" fill="white" />
                            <rect x="10" y="70" width="20" height="20" fill="#2B2B2B" />
                            
                            <rect x="50" y="50" width="10" height="10" />
                            <rect x="70" y="50" width="10" height="10" />
                            <rect x="50" y="70" width="10" height="10" />
                            <rect x="80" y="80" width="20" height="20" />
                            <rect x="60" y="60" width="10" height="10" />
                        </svg>
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Activity } from './Icons';
import { motion } from 'framer-motion';

interface AudioBriefProps {
  title: string;
  duration?: string;
  src?: string; // In a real app, this would be the MP3 URL
}

export const AudioBrief: React.FC<AudioBriefProps> = ({ title, duration = "03:45" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Mock progress interval
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#0f0f0f] border border-white/10 p-6 relative overflow-hidden group">
      {/* Background Tech Lines */}
      <div className="absolute top-0 right-0 p-2 flex gap-1">
          <div className="w-1 h-1 bg-bronze/50 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
      </div>

      <div className="flex items-center gap-6">
        {/* Play/Pause Button - Tactical Style */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 relative z-10 
            ${isPlaying 
              ? 'border-bronze text-bronze shadow-[0_0_15px_rgba(197,160,101,0.3)]' 
              : 'border-white/20 text-white hover:border-white hover:bg-white/5'
            }`}
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>

        {/* Track Info & Visualizer */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-sm font-bold text-white tracking-widest uppercase">{title}</h4>
            <span className="text-[0.6rem] font-mono text-bronze">{isPlaying ? 'TRANSMITTING...' : 'READY'}</span>
          </div>

          {/* Custom Progress Bar */}
          <div className="h-8 bg-black border border-white/10 relative flex items-center px-1 overflow-hidden">
            {/* The Visualizer Bars */}
            <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-30">
                {[...Array(40)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="w-1 bg-bronze"
                        animate={{ 
                            height: isPlaying ? [5, Math.random() * 20 + 5, 5] : 2,
                            opacity: progress > (i * 2.5) ? 1 : 0.2
                        }}
                        transition={{ duration: 0.2, repeat: isPlaying ? Infinity : 0 }}
                    />
                ))}
            </div>

            {/* The Progress Fill */}
            <div 
                className="absolute left-0 top-0 bottom-0 bg-bronze/10 border-r border-bronze transition-all duration-100"
                style={{ width: `${progress}%` }}
            ></div>
            
            {/* Time Display */}
            <div className="absolute right-2 text-[0.6rem] font-mono text-white/60">
                {Math.floor((progress/100) * 3)}:{Math.floor(((progress/100) * 180) % 60).toString().padStart(2, '0')} / {duration}
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white transition-colors">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
};

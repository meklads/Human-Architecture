
import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from './Icons';

export const SoundController = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on first interaction
  const initAudio = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    
    // Ambient sound logic removed to ensure silence as requested.
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();
  };

  // Click Sound Effect (Mechanical Click) - Minimal UI feedback
  const playClickSound = () => {
      if (isMuted || !audioContextRef.current) return;
      const ctx = audioContextRef.current;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    const handleClick = () => {
        if (!hasInteracted) {
            initAudio();
        } else {
            playClickSound();
        }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [hasInteracted, isMuted]);

  useEffect(() => {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended' && !isMuted) {
          audioContextRef.current.resume();
      }
  }, [isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        className="w-10 h-10 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-slate hover:text-white hover:border-bronze transition-all shadow-lg"
        aria-label={isMuted ? "Unmute UI sounds" : "Mute UI sounds"}
      >
        {isMuted ? <VolumeX size={16} /> : <div className="relative"><Volume2 size={16} /><span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span></div>}
      </button>
    </div>
  );
};

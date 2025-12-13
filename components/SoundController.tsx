
import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from './Icons';

export const SoundController = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Audio Context on first interaction
  const initAudio = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    setIsMuted(false);

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    // Create Ambient Drone (Low Frequency Hum)
    // Using simple oscillator for performance instead of loading large mp3s
    playAmbientDrone();
  };

  const playAmbientDrone = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // 1. Low Drone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(50, ctx.currentTime); // 50Hz Low hum
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime); // Very low volume
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    
    ambientNodeRef.current = osc;
    gainNodeRef.current = gain;

    // 2. Brown Noise (Atmosphere) - Simulated via buffer
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; 
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.01; // Subtle air sound
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
  };

  let lastOut = 0;

  // Click Sound Effect (Mechanical Click)
  const playClickSound = () => {
      if (isMuted || !audioContextRef.current) return;
      const ctx = audioContextRef.current;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    // Attach click listener to document to trigger sound effects
    const handleClick = () => {
        if (!hasInteracted) initAudio();
        else playClickSound();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [hasInteracted, isMuted]);

  // Toggle Mute
  useEffect(() => {
      if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(isMuted ? 0 : 0.02, audioContextRef.current.currentTime, 0.5);
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended' && !isMuted) {
          audioContextRef.current.resume();
      }
  }, [isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        className="w-10 h-10 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-slate hover:text-white hover:border-bronze transition-all shadow-lg"
      >
        {isMuted ? <VolumeX size={16} /> : <div className="relative"><Volume2 size={16} /><span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span></div>}
      </button>
    </div>
  );
};

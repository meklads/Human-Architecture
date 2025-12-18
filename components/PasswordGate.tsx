
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Key, ArrowRight, Shield, AlertTriangle, Loader2 } from './Icons';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- CONFIGURATION ---
  const PASSWORD = "ARCHITECT"; 
  // ---------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim().toUpperCase();
    
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (cleanInput === PASSWORD) {
        // Save to session storage so refresh doesn't lock them out again immediately
        sessionStorage.setItem('site_access_token', 'granted');
        onUnlock();
      } else {
        setError(true);
        setLoading(false);
        setInput('');
      }
    }, 800); // Fake processing delay for effect
  };

  return (
    <div className="fixed inset-0 bg-[#020202] text-alabaster z-[99999] flex flex-col items-center justify-center p-6">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none architectural-grid"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        {/* Decorative Borders */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-bronze opacity-50"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-bronze opacity-50"></div>

        <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Status Bar */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-bronze">
                    <Shield size={12} />
                    <span>Secure Area</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                </div>
            </div>

            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Lock size={24} className="text-white/60" />
                </div>
                <h1 className="text-2xl font-serif text-white mb-2">Restricted Access</h1>
                <p className="text-slate text-xs uppercase tracking-widest">
                    Construction Phase in Progress
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40">
                        <Key size={14} />
                    </div>
                    <input 
                        type="password" 
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setError(false); }}
                        className={`w-full bg-[#050505] border ${error ? 'border-red-900 text-red-500' : 'border-white/10 focus:border-bronze'} text-center py-4 px-10 text-lg tracking-[0.5em] uppercase font-mono outline-none transition-colors placeholder-slate/20`}
                        placeholder="ACCESS CODE"
                        autoFocus
                    />
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-[0.6rem] uppercase tracking-widest text-center flex items-center justify-center gap-2"
                    >
                        <AlertTriangle size={10} /> Invalid Clearance Code
                    </motion.div>
                )}

                <button 
                    type="submit" 
                    disabled={loading || !input}
                    className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-bronze hover:text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={14} /> : <>Enter Site <ArrowRight size={14} /></>}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-[0.5rem] text-slate/30 uppercase tracking-widest font-mono">
                    System ID: IHAM-SECURE-V1
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

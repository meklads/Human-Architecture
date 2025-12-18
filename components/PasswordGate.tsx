
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, ArrowRight, AlertTriangle, Key, Compass } from './Icons';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // THE MASTER KEY
    if (password.toUpperCase() === 'ARCHITECT') {
      sessionStorage.setItem('site_access_token', 'granted');
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setTimeout(() => {
        setError(true);
        setIsSubmitting(false);
        setPassword('');
      }, 500);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bronze/5 rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        {/* Decorative Frame */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-bronze/50"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-bronze/50"></div>

        <div className="bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-bronze/20 animate-scan pointer-events-none"></div>

          <div className="text-center mb-10">
            <motion.div 
              animate={isSubmitting ? { rotateY: 360 } : {}}
              transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
              className="w-20 h-20 bg-bronze/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-bronze/30 shadow-[0_0_20px_rgba(197,160,101,0.1)]"
            >
              <Key size={32} className="text-bronze" />
            </motion.div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-widest uppercase mb-2">Restricted Access</h1>
            <p className="text-[0.6rem] text-slate uppercase tracking-[0.3em] font-mono">Input Execution Authorization Key</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input 
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="AUTHORIZATION_CODE"
                className={`w-full bg-[#050505] border-b-2 ${error ? 'border-red-500' : 'border-bronze/30 focus:border-bronze'} p-4 text-center text-white tracking-[0.5em] font-mono outline-none transition-all placeholder:text-slate/20 placeholder:tracking-widest uppercase`}
              />
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-0 w-full text-center text-red-500 text-[0.6rem] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <AlertTriangle size={10} /> Access Denied / Invalid Schematic Key
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-bronze text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-charcoal transition-all shadow-lg flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Authenticate Access'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 flex justify-between items-center opacity-30">
            <div className="text-[0.4rem] font-mono text-slate">
              SEC_PROTOCOL_V4<br/>
              EST_1994_MEKLAD
            </div>
            <div className="flex gap-2">
              <Compass size={16} className="text-slate animate-spin-slow" />
              <Shield size={16} className="text-slate" />
              <Lock size={16} className="text-slate" />
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[0.5rem] text-slate/20 uppercase tracking-[0.5em]">
          Identity Verification Required for Site Entry
        </p>
      </motion.div>
    </div>
  );
};

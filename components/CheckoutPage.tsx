
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View, Product } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft, ArrowRight, Check, Shield, Lock, CreditCard, Box, Loader2 } from './Icons';

interface CheckoutPageProps {
  lang: Language;
  items: Product[];
  onBack: () => void;
  onComplete: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ lang, items, onBack, onComplete }) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS.checkout;
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Simulation of PayPal processing
  const handlePayPalClick = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        // Redirect after success animation
        setTimeout(() => {
            onComplete();
        }, 3000);
    }, 2500);
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-[#050505] text-alabaster flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
        {/* Background Grids */}
        <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bronze/5 rounded-full blur-[100px] pointer-events-none"></div>

        {!success ? (
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                
                {/* LEFT: ORDER SUMMARY (The "Material List") */}
                <motion.div 
                    initial={{ x: isAr ? 20 : -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="bg-[#111] border border-white/10 p-8 md:p-12 relative"
                >
                    <button onClick={onBack} className="flex items-center gap-2 text-slate hover:text-white mb-8 text-xs uppercase tracking-widest transition-colors">
                        {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                        {isAr ? 'العودة' : 'Back'}
                    </button>

                    <div className="mb-8 pb-8 border-b border-white/10">
                        <span className="text-bronze text-xs tracking-[0.3em] uppercase block mb-2">{t.title[lang]}</span>
                        <h1 className={`text-4xl ${headingFont}`}>{t.summary[lang]}</h1>
                    </div>

                    <div className="space-y-6 mb-8">
                        {items.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex gap-4">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 flex-shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover grayscale opacity-80" />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-bold text-white mb-1 ${headingFont}`}>{item.name[lang]}</h4>
                                    <div className="text-xs text-slate uppercase tracking-wider">{item.category}</div>
                                </div>
                                <div className="text-bronze font-mono">${item.price}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        <span className="text-slate uppercase tracking-widest text-xs">{t.total[lang]}</span>
                        <span className={`text-3xl text-white ${headingFont}`}>${total}.00</span>
                    </div>
                </motion.div>

                {/* RIGHT: PAYMENT (The "Permit") */}
                <motion.div 
                    initial={{ x: isAr ? -20 : 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="bg-alabaster text-charcoal p-8 md:p-12 border-4 border-bronze relative shadow-2xl flex flex-col"
                >
                    <div className="absolute top-4 right-4 text-bronze/20 pointer-events-none">
                        <Shield size={64} strokeWidth={1} />
                    </div>

                    <div className="mb-8">
                        <h2 className={`text-2xl mb-2 ${headingFont}`}>{t.client[lang]}</h2>
                        <p className="text-slate text-xs uppercase tracking-widest">Secure Transmission</p>
                    </div>

                    <form className="space-y-6 mb-8 flex-1">
                        <div>
                            <label className="block text-[0.6rem] uppercase tracking-widest text-slate mb-1">Full Name</label>
                            <input type="text" className="w-full bg-white border-b border-slate/20 p-3 focus:border-bronze outline-none transition-colors" placeholder="Architect Name" />
                        </div>
                        <div>
                            <label className="block text-[0.6rem] uppercase tracking-widest text-slate mb-1">Email Address</label>
                            <input type="email" className="w-full bg-white border-b border-slate/20 p-3 focus:border-bronze outline-none transition-colors" placeholder="arch@example.com" />
                        </div>
                    </form>

                    <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-4 text-[0.65rem] uppercase tracking-widest text-slate justify-center">
                            <Lock size={12} /> {t.secure[lang]}
                        </div>
                        
                        {/* PAYPAL SIMULATION BUTTON */}
                        <button 
                            onClick={handlePayPalClick}
                            disabled={loading}
                            className="w-full group relative h-16 bg-[#FFC439] hover:bg-[#F4B400] transition-all rounded-sm flex items-center justify-center shadow-lg overflow-hidden"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin text-charcoal" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    {/* PayPal Logo Text Simulation for Demo */}
                                    <span className={`text-blue-900 font-bold italic text-xl pr-1`}>Pay</span>
                                    <span className={`text-blue-500 font-bold italic text-xl`}>Pal</span>
                                </div>
                            )}
                            
                            {/* Shiny Effect */}
                            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
                        </button>

                        <div className="mt-4 text-center">
                            <span className="text-[0.5rem] text-slate/60 block">
                                By clicking above, you agree to the Architectural Terms of Service.
                            </span>
                        </div>
                    </div>
                </motion.div>

            </div>
        ) : (
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-alabaster p-12 max-w-lg w-full text-center border-4 border-bronze shadow-2xl relative"
            >
                {/* Stamp Animation */}
                <motion.div 
                    initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                    className="w-24 h-24 rounded-full border-4 border-green-700 text-green-700 flex items-center justify-center mx-auto mb-6 transform -rotate-12 opacity-80"
                >
                    <Check size={48} strokeWidth={4} />
                </motion.div>
                
                <h2 className={`text-3xl text-charcoal mb-4 ${headingFont}`}>{t.success[lang]}</h2>
                <p className={`text-slate mb-8 ${bodyFont}`}>
                    {t.redirect[lang]}
                </p>
                <Loader2 className="animate-spin mx-auto text-bronze" />
            </motion.div>
        )}
    </motion.div>
  );
};

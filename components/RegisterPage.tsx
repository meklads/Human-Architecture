
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, View, UserProfile } from '../types';
import { Shield, Lock, Users, ArrowRight, ArrowLeft, Check, Loader2, AlertTriangle, Layers, Key, RefreshCw } from './Icons';

// =====================================================================
// 👇 إعدادات الاتصال بقاعدة البيانات (Google Sheets)
// =====================================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzVHtff-qSt3Gx1lw8r0eQwourNQD4_IqPrZ51m1KQsARIwsqAPvOSz3uc-FULDVCmm/exec';
// =====================================================================

interface RegisterPageProps {
  lang: Language;
  setView: (view: View) => void;
  onRegisterSuccess: (profile: UserProfile) => void;
}

type AuthMode = 'register' | 'login' | 'forgot_password';

export const RegisterPage: React.FC<RegisterPageProps> = ({ lang, setView, onRegisterSuccess }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  // State
  const [authMode, setAuthMode] = useState<AuthMode>('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    challengePath: 'Performance',
    newPassword: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActionSwitch = (mode: AuthMode) => {
      setAuthMode(mode);
      setStatus('idle');
      setErrorMessage('');
      setSuccessMessage('');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '', newPassword: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    // ---------------- REGISTER FLOW ----------------
    if (authMode === 'register') {
        if (formData.password !== formData.confirmPassword) {
            setStatus('error');
            setErrorMessage(isAr ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('action', 'register');
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('path', formData.challengePath);
            formDataToSend.append('password', formData.password); 

            await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formDataToSend, mode: 'no-cors' });

            // Create Profile locally
            const newProfile: UserProfile = {
                name: formData.fullName,
                handle: formData.fullName.split(' ')[0].toLowerCase(),
                email: formData.email,
                rank: isAr ? 'مهندس مبتدئ' : 'Novice Architect',
                level: 1,
                xp: 0,
                projects: 0,
                endorsed: 0,
                joinedDate: new Date().toISOString().split('T')[0],
                avatarChar: formData.fullName.charAt(0).toUpperCase()
            };
            
            setSuccessMessage(isAr ? 'تم إنشاء ملفك الشخصي بنجاح.' : 'Profile created successfully.');
            setStatus('success');
            
            setTimeout(() => {
                onRegisterSuccess(newProfile);
                setView('community');
            }, 2000);

        } catch (error) {
            setStatus('error');
            setErrorMessage(isAr ? 'خطأ في الاتصال' : 'Connection error');
        }
    } 
    
    // ---------------- LOGIN FLOW ----------------
    else if (authMode === 'login') {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('action', 'login');
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formDataToSend, mode: 'no-cors' });

            // SIMULATE SUCCESS (Since no-cors doesn't return body)
            // In a real app, we would validate the response here.
            
            // Mock Profile for Login
            const mockProfile: UserProfile = {
                name: "Architect", // Ideally we get this from DB
                handle: "arch_user",
                email: formData.email,
                rank: isAr ? 'مهندس' : 'Architect',
                level: 2,
                xp: 150,
                projects: 3,
                endorsed: 5,
                joinedDate: "2023-01-01",
                avatarChar: formData.email.charAt(0).toUpperCase()
            };

            setSuccessMessage(isAr ? 'تم التحقق من الهوية.' : 'Identity Verified.');
            setStatus('success');
            
            setTimeout(() => {
                onRegisterSuccess(mockProfile);
                setView('community');
            }, 1500);

        } catch (error) {
             setStatus('error');
             setErrorMessage(isAr ? 'بيانات الدخول غير صحيحة' : 'Invalid Credentials');
        }
    }

    // ---------------- FORGOT PASSWORD FLOW ----------------
    else if (authMode === 'forgot_password') {
        if (formData.newPassword.length < 6) {
             setStatus('error');
             setErrorMessage(isAr ? 'كلمة المرور قصيرة جداً' : 'Password too short');
             return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('action', 'reset_password');
            formDataToSend.append('email', formData.email);
            formDataToSend.append('newPassword', formData.newPassword);

            await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formDataToSend, mode: 'no-cors' });

            setSuccessMessage(isAr ? 'تم تحديث كلمة المرور.' : 'Password updated successfully.');
            setStatus('success');
            
            // Return to login after success
            setTimeout(() => {
                handleActionSwitch('login');
            }, 2000);

        } catch (error) {
             setStatus('error');
             setErrorMessage(isAr ? 'فشل التحديث' : 'Update Failed');
        }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-[#050505] text-alabaster flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 border border-bronze/30 bg-bronze/10 px-4 py-1 mb-6 rounded-full">
                <Shield size={14} className="text-bronze" />
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-bronze font-bold">
                    {authMode === 'register' ? (isAr ? 'تسجيل جديد' : 'NEW CONTRACT') : (isAr ? 'دخول الأعضاء' : 'MEMBER ACCESS')}
                </span>
            </div>
            <h1 className={`text-4xl md:text-5xl mb-4 ${headingFont}`}>
                {authMode === 'register' ? (isAr ? 'الانضمام للنقابة' : 'Join The Guild') : (isAr ? 'بوابة الدخول' : 'Access Site')}
            </h1>
        </div>

        {/* Form Container */}
        <div className="bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl relative group transition-all duration-500">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-bronze opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-bronze opacity-50"></div>

            {/* TAB SWITCHER */}
            {authMode !== 'forgot_password' && (
                <div className="flex border-b border-white/10 mb-8">
                    <button 
                        onClick={() => handleActionSwitch('register')}
                        className={`flex-1 pb-4 text-xs uppercase tracking-widest font-bold transition-colors ${authMode === 'register' ? 'text-bronze border-b-2 border-bronze' : 'text-slate hover:text-white'}`}
                    >
                        {isAr ? 'عضوية جديدة' : 'New ID'}
                    </button>
                    <button 
                        onClick={() => handleActionSwitch('login')}
                        className={`flex-1 pb-4 text-xs uppercase tracking-widest font-bold transition-colors ${authMode === 'login' ? 'text-bronze border-b-2 border-bronze' : 'text-slate hover:text-white'}`}
                    >
                        {isAr ? 'تسجيل دخول' : 'Login'}
                    </button>
                </div>
            )}

            {/* SUCCESS STATE */}
            {status === 'success' ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                        <Check size={40} />
                    </div>
                    <h2 className={`text-2xl mb-4 text-white ${headingFont}`}>{successMessage}</h2>
                    <Loader2 className="animate-spin mx-auto text-bronze mt-4" size={24} />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Common Field: Email */}
                    <div className="space-y-2">
                        <label className="text-[0.6rem] uppercase tracking-widest text-slate flex items-center gap-2">
                            <span className="font-mono">@</span> {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b ${formData.email ? 'border-bronze' : 'border-slate/30'} py-3 text-lg focus:border-bronze focus:outline-none transition-colors text-white placeholder-slate/20`}
                            placeholder="arch@example.com"
                        />
                    </div>

                    {/* REGISTER ONLY FIELDS */}
                    <AnimatePresence>
                        {authMode === 'register' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-6 overflow-hidden">
                                <div className="space-y-2">
                                    <label className="text-[0.6rem] uppercase tracking-widest text-slate flex items-center gap-2">
                                        <Users size={12} /> {isAr ? 'الاسم الكامل' : 'Full Name'}
                                    </label>
                                    <input 
                                        type="text" 
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-slate/30 py-3 text-lg focus:border-bronze focus:outline-none transition-colors text-white"
                                        placeholder={isAr ? "الاسم المعماري" : "Architect Name"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[0.6rem] uppercase tracking-widest text-slate flex items-center gap-2">
                                        <Shield size={12} /> {isAr ? 'مسار التحدي' : 'Challenge Path'}
                                    </label>
                                    <select 
                                        name="challengePath"
                                        value={formData.challengePath}
                                        onChange={handleChange}
                                        className="w-full bg-[#0a0a0a] border-b border-slate/30 py-3 text-lg focus:border-bronze focus:outline-none transition-colors text-white appearance-none rounded-none cursor-pointer"
                                    >
                                        <option value="Performance">Performance (الأداء العالي)</option>
                                        <option value="Balance">Balance (التوازن الهيكلي)</option>
                                        <option value="Restoration">Restoration (الترميم النفسي)</option>
                                    </select>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* PASSWORD FIELDS */}
                    {authMode !== 'forgot_password' && (
                        <div className="space-y-2">
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate flex items-center gap-2">
                                <Lock size={12} /> {isAr ? 'كلمة المرور' : 'Password'}
                            </label>
                            <input 
                                type="password" 
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-slate/30 py-3 text-lg focus:border-bronze focus:outline-none transition-colors text-white"
                            />
                        </div>
                    )}

                    {authMode === 'register' && (
                        <div className="space-y-2">
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate">
                                {isAr ? 'تأكيد الرمز' : 'Confirm'}
                            </label>
                            <input 
                                type="password" 
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-slate/30 py-3 text-lg focus:border-bronze focus:outline-none transition-colors text-white"
                            />
                        </div>
                    )}

                    {/* FORGOT PASSWORD FIELDS */}
                    {authMode === 'forgot_password' && (
                         <div className="space-y-2">
                             <div className="bg-bronze/10 border border-bronze/30 p-3 mb-4 text-xs text-bronze">
                                 {isAr ? 'أدخل كلمة المرور الجديدة المطلوبة.' : 'Enter your desired new password.'}
                             </div>
                             <label className="text-[0.6rem] uppercase tracking-widest text-slate flex items-center gap-2">
                                 <Key size={12} /> {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
                             </label>
                             <input 
                                 type="password" 
                                 name="newPassword"
                                 required
                                 value={formData.newPassword}
                                 onChange={handleChange}
                                 className="w-full bg-transparent border-b border-slate/30 py-3 text-lg focus:border-bronze focus:outline-none transition-colors text-white"
                             />
                         </div>
                    )}

                    {/* Actions & Links */}
                    <div className="flex justify-between items-center text-xs">
                        {authMode === 'login' && (
                            <button type="button" onClick={() => handleActionSwitch('forgot_password')} className="text-slate hover:text-bronze underline decoration-dotted">
                                {isAr ? 'نسيت كلمة المرور؟' : 'Lost Access Key?'}
                            </button>
                        )}
                        {authMode === 'forgot_password' && (
                            <button type="button" onClick={() => handleActionSwitch('login')} className="text-slate hover:text-white flex items-center gap-1">
                                <ArrowLeft size={12} /> {isAr ? 'عودة للدخول' : 'Back to Login'}
                            </button>
                        )}
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-xs bg-red-900/10 p-3 border border-red-900/30">
                            <AlertTriangle size={14} />
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="w-full py-5 bg-bronze text-white text-sm uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(197,160,101,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    {authMode === 'register' && (isAr ? 'توقيع العقد' : 'SIGN CONTRACT')}
                                    {authMode === 'login' && (isAr ? 'الدخول للموقع' : 'ENTER SITE')}
                                    {authMode === 'forgot_password' && (isAr ? 'تحديث الرمز' : 'UPDATE KEY')}
                                    
                                    {authMode === 'forgot_password' ? <RefreshCw size={16} /> : (isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />)}
                                </>
                            )}
                        </button>
                    </div>

                </form>
            )}
        </div>
      </div>
    </motion.div>
  );
};

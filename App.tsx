import React, { useState, useEffect, useCallback } from 'react';
import { Language, View, Product, UserProfile } from './types';
import { TRANSLATIONS } from './constants';
import { Menu, X, Instagram, Twitter, Linkedin } from './components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './components/HomePage';
import { PhilosophyPage } from './components/PhilosophyPage';
import { JournalPage } from './components/JournalPage';
import { LibraryPage } from './components/LibraryPage';
import { ArtStorePage } from './components/ArtStorePage';
import { ContactPage } from './components/ContactPage';
import { LandingPage } from './components/LandingPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CommunityPage } from './components/CommunityPage';
import { RegisterPage } from './components/RegisterPage'; 
import { ProgramDashboard } from './components/ProgramDashboard';
import { AboutPage } from './components/AboutPage';
import { CustomCursor } from './components/CustomCursor';
import { SoundController } from './components/SoundController';
import { PasswordGate } from './components/PasswordGate';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Safe Translation Utility
  const t = useCallback((path: string): string => {
    try {
      const keys = path.split('.');
      let result: any = TRANSLATIONS;
      for (const key of keys) {
        if (!result || typeof result !== 'object' || !result[key]) return path;
        result = result[key];
      }
      if (typeof result === 'string') return result;
      return result[lang] || result['en'] || result['ar'] || path;
    } catch (e) {
      return path;
    }
  }, [lang]);

  const LOAD_PHASES = [
    { ar: 'جاري فحص التربة والأساسات...', en: 'ANALYZING SOIL CONDITIONS...' },
    { ar: 'رفع الأعمدة الإنشائية...', en: 'ERECTING PILLARS...' },
    { ar: 'المبنى جاهز للإشغال.', en: 'READY FOR OCCUPANCY.' }
  ];

  useEffect(() => {
    // Ensure dark class is applied to html element
    document.documentElement.classList.add('dark');
    
    const authorized = sessionStorage.getItem('site_access_token');
    if (authorized === 'granted') {
      setIsAuthorized(true);
    }

    if (isAuthorized) {
        const phaseInterval = setInterval(() => {
            setLoadingPhase(prev => (prev < LOAD_PHASES.length - 1 ? prev + 1 : prev));
        }, 600);
        const bootTimeout = setTimeout(() => {
            setLoading(false);
            clearInterval(phaseInterval);
        }, 2200);
        return () => {
            clearInterval(phaseInterval);
            clearTimeout(bootTimeout);
        };
    }

    const params = new URLSearchParams(window.location.search);
    const viewFromUrl = params.get('view') as View;
    if (viewFromUrl) setCurrentView(viewFromUrl);

    const savedUser = localStorage.getItem('iham_user_profile');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }
  }, [isAuthorized]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setMenuOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.pushState({ view }, '', url.toString());
    window.scrollTo(0, 0);
  };

  if (!isAuthorized) {
    return (
      <div className="bg-[#050505] min-h-screen">
        <CustomCursor />
        <PasswordGate onUnlock={() => setIsAuthorized(true)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] text-bronze flex flex-col items-center justify-center z-[9999]">
         <div className="w-64 h-1 bg-white/10 mb-8 rounded-full overflow-hidden relative">
             <motion.div className="absolute top-0 left-0 h-full bg-bronze" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.2, ease: "easeInOut" }} />
         </div>
         <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
             {LOAD_PHASES[loadingPhase]?.[lang] || 'LOADING...'}
         </div>
      </div>
    );
  }

  const isFunnelMode = currentView === 'landing';

  return (
    <div className="min-h-screen w-full bg-darkBg text-concrete antialiased" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CustomCursor />
      <SoundController />
      
      {!isFunnelMode && (
      <header className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer shrink-0" onClick={() => navigateTo('home')}>
             <span className={`text-xl font-bold tracking-tight ${lang === 'ar' ? 'font-amiri' : 'font-serif'}`}>HUMAN ARCHITECTURE</span>
          </div>

          <nav className="hidden xl:flex items-center gap-6">
             {(['home', 'about', 'philosophy', 'journal', 'community', 'art-store', 'contact'] as View[]).map(v => (
                 <button key={v} onClick={() => navigateTo(v)} className={`text-[0.65rem] uppercase tracking-widest transition-colors ${currentView === v ? 'text-white font-bold border-b border-bronze' : 'text-slate hover:text-white'}`}>
                     {t(`nav.${v === 'art-store' ? 'gallery' : v === 'about' ? 'architect' : v}`)}
                 </button>
             ))}
          </nav>

          <div className="flex items-center gap-3">
              {currentUser ? (
                  <button onClick={() => navigateTo('dashboard')} className="hidden md:block bg-bronze text-white px-4 py-2 text-[0.65rem] uppercase font-bold rounded-sm shadow-md transition-all hover:brightness-110">DASHBOARD</button>
              ) : (
                  <button onClick={() => navigateTo('register')} className="hidden md:block bg-bronze text-white px-6 py-2 text-[0.65rem] uppercase font-bold rounded-sm shadow-md transition-all hover:brightness-110">JOIN</button>
              )}
              
              <button 
                onClick={() => navigateTo('landing')}
                className={`hidden md:block px-4 py-1.5 text-[0.65rem] uppercase font-bold border rounded-sm transition-all ${currentView === 'landing' ? 'bg-white text-black border-white' : 'text-white border-white/20 hover:border-white'}`}
              >
                {t('nav.blueprint')}
              </button>

              <button onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')} className="text-[0.65rem] font-bold hover:text-bronze uppercase text-slate ml-2">{lang === 'en' ? 'AR' : 'EN'}</button>
              
              <button onClick={() => setMenuOpen(true)} className="xl:hidden text-white"><Menu size={24} /></button>
          </div>
        </div>
      </header>
      )}

      <AnimatePresence>
        {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col items-center justify-center xl:hidden">
                <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-slate"><X size={32} /></button>
                <nav className="space-y-8 text-center">
                    {['home', 'about', 'philosophy', 'journal', 'community', 'art-store', 'contact', 'landing'].map(v => (
                        <button key={v} onClick={() => navigateTo(v as View)} className="block text-2xl font-serif">
                          {t(`nav.${v === 'art-store' ? 'gallery' : v === 'about' ? 'architect' : v === 'landing' ? 'blueprint' : v}`)}
                        </button>
                    ))}
                </nav>
            </motion.div>
        )}
      </AnimatePresence>

      <main className={`relative z-10 ${isFunnelMode ? 'pt-0' : 'pt-20'}`}>
        <AnimatePresence mode='wait'>
            {currentView === 'home' && <HomePage key="home" lang={lang} setView={navigateTo} />}
            {currentView === 'philosophy' && <PhilosophyPage key="philosophy" lang={lang} setView={navigateTo} />}
            {currentView === 'about' && <AboutPage key="about" lang={lang} />}
            {currentView === 'journal' && <JournalPage key="journal" lang={lang} />}
            {currentView === 'library' && <LibraryPage key="library" lang={lang} onCheckout={(items) => { setCheckoutItems(items); navigateTo('checkout'); }} />}
            {currentView === 'art-store' && <ArtStorePage key="art-store" lang={lang} onCheckout={(items) => { setCheckoutItems(items); navigateTo('checkout'); }} />}
            {currentView === 'community' && <CommunityPage key="community" lang={lang} setView={navigateTo} currentUser={currentUser} />}
            {currentView === 'contact' && <ContactPage key="contact" lang={lang} />}
            {currentView === 'register' && <RegisterPage key="register" lang={lang} setView={navigateTo} onRegisterSuccess={(p) => { setCurrentUser(p); navigateTo('dashboard'); }} />}
            {currentView === 'dashboard' && <ProgramDashboard key="dashboard" lang={lang} currentUser={currentUser} />}
            {currentView === 'landing' && <LandingPage key="landing" lang={lang} setView={navigateTo} onCheckout={(items) => { setCheckoutItems(items); navigateTo('checkout'); }} />}
            {currentView === 'checkout' && <CheckoutPage key="checkout" lang={lang} items={checkoutItems} onBack={() => navigateTo('art-store')} onComplete={(u) => { const p = { name: u.name, email: u.email, handle: u.name, level: 1, xp: 50, projects: 0, endorsed: 0, joinedDate: '', avatarChar: u.name[0] || 'A', rank: 'Builder' } as UserProfile; setCurrentUser(p); navigateTo('dashboard'); }} />}
        </AnimatePresence>
      </main>

      {!isFunnelMode && (
      <footer className="bg-[#050505] text-slate-400 py-12 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[0.6rem] uppercase tracking-widest text-slate">{t('footer.copyright')}</div>
              <div className="flex items-center gap-8 opacity-50"><Instagram size={16} /><Twitter size={16} /><Linkedin size={16} /></div>
          </div>
      </footer>
      )}
    </div>
  );
}

export default App;
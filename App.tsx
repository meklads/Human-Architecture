
import React, { useState, useEffect, useCallback } from 'react';
import { Language, View, Product, UserProfile } from './types';
import { TRANSLATIONS } from './constants';
import { Menu, X, Instagram, Twitter, Linkedin, Moon, Sun, Box } from './components/Icons';
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

type Theme = 'dark' | 'light' | 'blueprint';

const VALID_VIEWS: View[] = [
  'home', 'philosophy', 'journal', 'library', 'art-store', 
  'contact', 'landing', 'checkout', 'community', 
  'register', 'dashboard', 'about'
];

function App() {
  const [lang, setLang] = useState<Language>('en');
  
  // تفعيل التوجيه اللحظي عند تحميل المكون لأول مرة
  const [currentView, setCurrentView] = useState<View>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const mainPath = path.split('/')[0] || 'home';
    return VALID_VIEWS.includes(mainPath as View) ? (mainPath as View) : 'home';
  });

  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useCallback((path: string): string => {
    try {
      if (!path) return '';
      const keys = path.split('.');
      let result: any = TRANSLATIONS;
      for (const key of keys) {
        if (!result || typeof result !== 'object' || !result[key]) {
            return path;
        }
        result = result[key];
      }
      if (typeof result === 'string') return result;
      if (!result) return path;
      return result[lang] || result['en'] || result['ar'] || path;
    } catch (e) {
      return path;
    }
  }, [lang]);

  const LOAD_PHASES = [
    { ar: 'جاري فحص التربة والأساسات...', en: 'ANALYZING SOIL CONDITIONS...', fr: 'ANALYSE DU SOL...' },
    { ar: 'رفع الأعمدة الإنشائية...', en: 'ERECTING PILIERS...', fr: 'ÉRECTION DES PILIERS...' },
    { ar: 'المبنى جاهز للإشغال.', en: 'READY FOR OCCUPANCY.', fr: 'PRÊT POUR OCCUPATION.' }
  ];

  useEffect(() => {
    // تحديث الثيم
    document.documentElement.classList.remove('dark', 'light', 'blueprint-mode');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
    } else if (theme === 'blueprint') {
      document.body.classList.add('blueprint-mode');
      document.body.style.backgroundColor = '#002b4d';
    } else {
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#F2F0EB';
    }

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

    // مزامنة العنوان مع الحالة
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const mainPath = path.split('/')[0] || 'home';
      setCurrentView(VALID_VIEWS.includes(mainPath as View) ? (mainPath as View) : 'home');
    };

    window.addEventListener('popstate', handlePopState);

    const savedUser = localStorage.getItem('iham_user_profile');
    if (savedUser) {
      try { 
        const parsed = JSON.parse(savedUser);
        if (parsed) setCurrentUser(parsed);
      } catch (e) { 
        console.error("Profile load failed", e); 
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthorized, theme]);

  const navigateTo = (view: View) => {
    if (!VALID_VIEWS.includes(view)) view = 'home';
    setCurrentView(view);
    setMenuOpen(false);
    
    const newPath = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({ view }, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Landing page is public — no password required
  if (!isAuthorized && currentView !== 'landing') {
    return (
      <div className="bg-[#050505] min-h-screen">
        <CustomCursor />
        <PasswordGate onUnlock={() => setIsAuthorized(true)} />
      </div>
    );
  }

  if (loading && isAuthorized) {
    const currentPhase = LOAD_PHASES[loadingPhase] || LOAD_PHASES[0];
    return (
      <div className="fixed inset-0 bg-[#050505] text-bronze flex flex-col items-center justify-center z-[9999]">
         <div className="w-64 h-1 bg-white/10 mb-8 rounded-full overflow-hidden relative">
             <motion.div className="absolute top-0 left-0 h-full bg-bronze" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.2, ease: "easeInOut" }} />
         </div>
         <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
             {(currentPhase as any)?.[lang] || (currentPhase as any)?.['en'] || 'LOADING...'}
         </div>
      </div>
    );
  }

  const isFunnelMode = currentView === 'landing';

  return (
    <div className="min-h-screen w-full transition-colors duration-500 text-concrete antialiased" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CustomCursor />
      <SoundController />
      
      {!isFunnelMode && (
      <header className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer shrink-0" onClick={() => navigateTo('home')}>
             <span className={`text-xl font-bold tracking-tight ${lang === 'ar' ? 'font-amiri' : 'font-serif'} hover:text-bronze transition-colors`}>HUMAN ARCHITECTURE</span>
          </div>

          <nav className="hidden xl:flex items-center gap-6">
             {(['about', 'philosophy', 'journal', 'library', 'community', 'art-store', 'contact'] as View[]).map(v => (
                 <button key={v} onClick={() => navigateTo(v)} className={`text-[0.65rem] uppercase tracking-widest transition-all duration-300 ${currentView === v ? 'text-white font-bold border-b border-bronze pb-1' : 'text-slate hover:text-white'}`}>
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

              <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                  <div className="hidden lg:flex items-center gap-1.5">
                    <button onClick={() => setTheme('dark')} className={`p-1.5 transition-all ${theme === 'dark' ? 'text-bronze' : 'text-slate hover:text-white'}`} title="Dark Mode"><Moon size={14} /></button>
                    <button onClick={() => setTheme('light')} className={`p-1.5 transition-all ${theme === 'light' ? 'text-bronze' : 'text-slate hover:text-white'}`} title="Light Mode"><Sun size={14} /></button>
                    <button onClick={() => setTheme('blueprint')} className={`p-1.5 transition-all ${theme === 'blueprint' ? 'text-bronze' : 'text-slate hover:text-white'}`} title="Arch Mode"><Box size={14} /></button>
                  </div>
                  <button onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')} className="text-[0.65rem] font-bold hover:text-bronze uppercase text-slate ml-2 transition-colors">{lang === 'en' ? 'AR' : 'EN'}</button>
              </div>
              
              <button onClick={() => setMenuOpen(true)} className="xl:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"><Menu size={24} /></button>
          </div>
        </div>
      </header>
      )}

      <AnimatePresence>
        {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col items-center justify-center xl:hidden overflow-hidden">
                <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>
                <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-slate hover:text-white transition-colors"><X size={32} /></button>
                <nav className="space-y-8 text-center relative z-10">
                    <div className="flex justify-center gap-6 mb-8 pb-8 border-b border-white/5">
                        <button onClick={() => { setTheme('dark'); setMenuOpen(false); }} className={`flex flex-col items-center gap-2 ${theme === 'dark' ? 'text-bronze' : 'text-slate'}`}><Moon size={24} /><span className="text-[0.5rem] uppercase tracking-widest">Dark</span></button>
                        <button onClick={() => { setTheme('light'); setMenuOpen(false); }} className={`flex flex-col items-center gap-2 ${theme === 'light' ? 'text-bronze' : 'text-slate'}`}><Sun size={24} /><span className="text-[0.5rem] uppercase tracking-widest">Light</span></button>
                        <button onClick={() => { setTheme('blueprint'); setMenuOpen(false); }} className={`flex flex-col items-center gap-2 ${theme === 'blueprint' ? 'text-bronze' : 'text-slate'}`}><Box size={24} /><span className="text-[0.5rem] uppercase tracking-widest">Arch</span></button>
                    </div>
                    {(['home', 'about', 'philosophy', 'journal', 'library', 'community', 'art-store', 'contact', 'landing'] as View[]).map(v => (
                        <button key={v} onClick={() => navigateTo(v)} className={`block text-2xl font-serif transition-colors ${currentView === v ? 'text-bronze' : 'text-white hover:text-bronze'}`}>
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
            {currentView === 'checkout' && <CheckoutPage key="checkout" lang={lang} items={checkoutItems} onBack={() => navigateTo('art-store')} onComplete={(u) => { const p = { name: u?.name || 'Architect', email: u?.email || '', handle: u?.name || 'architect', level: 1, xp: 50, projects: 0, endorsed: 0, joinedDate: new Date().toISOString().split('T')[0], avatarChar: (u?.name && u.name.length > 0 ? u.name[0] : 'A'), rank: 'Builder' } as UserProfile; setCurrentUser(p); localStorage.setItem('iham_user_profile', JSON.stringify(p)); navigateTo('dashboard'); }} />}
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



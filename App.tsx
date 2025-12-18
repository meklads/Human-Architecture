
import React, { useState, useEffect } from 'react';
import { Language, View, Product, UserProfile } from './types';
import { TRANSLATIONS } from './constants';
import { Menu, X, Moon, Sun, Grid, Layers, Users, Shield, Layout, LogOut, Instagram, Twitter, Linkedin } from './components/Icons';
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
import { Magnetic } from './components/Magnetic';
import { BlueprintOverlay } from './components/BlueprintOverlay';
import { PasswordGate } from './components/PasswordGate';
import { SoundController } from './components/SoundController';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);

  const LOAD_PHASES = [
    { ar: 'جاري فحص التربة والأساسات...', en: 'ANALYZING SOIL CONDITIONS...' },
    { ar: 'صب الخرسانة المسلحة...', en: 'POURING REINFORCED CONCRETE...' },
    { ar: 'رفع الأعمدة الإنشائية...', en: 'ERECTING STRUCTURAL PILLARS...' },
    { ar: 'تركيب الأنظمة الداخلية...', en: 'INSTALLING INTERNAL SYSTEMS...' },
    { ar: 'طلاء الواجهة الخارجية...', en: 'FINISHING EXTERIOR FACADE...' },
    { ar: 'المبنى جاهز للإشغال.', en: 'STRUCTURE READY FOR OCCUPANCY.' }
  ];

  // --- نظام التوجيه الديناميكي (ROUTING ENGINE) ---
  
  // دالة لتحديث الرابط وعنوان الصفحة
  const navigateTo = (view: View, replace = false) => {
    setCurrentView(view);
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    
    if (replace) {
        window.history.replaceState({ view }, '', url.toString());
    } else {
        window.history.pushState({ view }, '', url.toString());
    }
    updatePageTitle(view, lang);
  };

  const updatePageTitle = (view: View, currentLang: Language) => {
      const siteName = currentLang === 'ar' ? 'عمارة الإنسان' : 'Human Architecture';
      let pageName = '';
      
      switch(view) {
          case 'philosophy': pageName = TRANSLATIONS.nav.philosophy[currentLang]; break;
          case 'journal': pageName = TRANSLATIONS.nav.journal[currentLang]; break;
          case 'community': pageName = TRANSLATIONS.nav.community[currentLang]; break;
          case 'art-store': pageName = TRANSLATIONS.nav.gallery[currentLang]; break;
          case 'contact': pageName = TRANSLATIONS.nav.contact[currentLang]; break;
          case 'about': pageName = TRANSLATIONS.nav.architect[currentLang]; break;
          case 'landing': pageName = currentLang === 'ar' ? 'المخطط' : 'The Blueprint'; break;
          case 'dashboard': pageName = currentLang === 'ar' ? 'لوحة التحكم' : 'Dashboard'; break;
          default: pageName = TRANSLATIONS.nav.home[currentLang];
      }
      
      document.title = `${siteName} | ${pageName}`;
  };

  useEffect(() => {
    // 0. فحص التصريح
    const authorized = sessionStorage.getItem('site_access_token');
    if (authorized === 'granted') {
        setIsAuthorized(true);
    }

    // 1. تسلسل التحميل
    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => (prev < LOAD_PHASES.length - 1 ? prev + 1 : prev));
    }, 400);

    const bootTimeout = setTimeout(() => {
      setLoading(false);
      clearInterval(phaseInterval);
    }, 2800);

    // 2. معالجة الرابط عند الدخول الأول (Deep Linking)
    const params = new URLSearchParams(window.location.search);
    const initialView = params.get('view') as View;
    if (initialView && ['home', 'philosophy', 'journal', 'library', 'store', 'art-store', 'contact', 'landing', 'community', 'register', 'dashboard', 'about'].includes(initialView)) {
        setCurrentView(initialView);
        updatePageTitle(initialView, lang);
    } else {
        updatePageTitle('home', lang);
    }

    // 3. مستمع لزر الرجوع في المتصفح
    const handlePopState = (event: PopStateEvent) => {
        if (event.state && event.state.view) {
            setCurrentView(event.state.view);
            updatePageTitle(event.state.view, lang);
        } else {
            // الرجوع للرئيسية إذا لم يوجد حالة
            const params = new URLSearchParams(window.location.search);
            const v = params.get('view') as View;
            if (v) {
                setCurrentView(v);
                updatePageTitle(v, lang);
            }
        }
    };
    window.addEventListener('popstate', handlePopState);

    // 4. استعادة جلسة المستخدم
    const savedUser = localStorage.getItem('iham_user_profile');
    if (savedUser) {
        try { setCurrentUser(JSON.parse(savedUser)); } catch (e) { console.error('Session restore failed'); }
    }

    return () => {
      clearTimeout(bootTimeout);
      clearInterval(phaseInterval);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // تحديث العنوان عند تغيير اللغة
  useEffect(() => {
      updatePageTitle(currentView, lang);
  }, [lang]);

  useEffect(() => {
    const body = document.body;
    if (darkMode) body.classList.add('dark'); else body.classList.remove('dark');
    if (blueprintMode) body.classList.add('blueprint-mode'); else body.classList.remove('blueprint-mode');
  }, [darkMode, blueprintMode]);

  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);

  const handleAddToCart = (items: Product[]) => {
      setCheckoutItems(items);
      navigateTo('checkout');
  };

  const handlePurchaseComplete = (userData: { name: string; email: string }) => {
      const newProfile: UserProfile = {
          name: userData.name,
          handle: userData.name.split(' ')[0].toLowerCase(),
          email: userData.email,
          rank: lang === 'ar' ? 'مهندس مبتدئ' : 'Novice Architect',
          level: 1,
          xp: 50,
          projects: 0,
          endorsed: 0,
          joinedDate: new Date().toISOString().split('T')[0],
          avatarChar: userData.name.charAt(0).toUpperCase()
      };
      setCurrentUser(newProfile);
      localStorage.setItem('iham_user_profile', JSON.stringify(newProfile));
      const hasBundle = checkoutItems.some(i => i.category === 'bundle');
      navigateTo(hasBundle ? 'dashboard' : 'home');
      setCheckoutItems([]);
  };

  const handleRegisterSuccess = (profile: UserProfile) => {
      setCurrentUser(profile);
      localStorage.setItem('iham_user_profile', JSON.stringify(profile));
      navigateTo('dashboard');
  };

  const handleLogout = () => {
      setCurrentUser(null);
      localStorage.removeItem('iham_user_profile');
      navigateTo('landing');
  };

  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: TRANSLATIONS.nav.home[lang] }, 
    { id: 'about', label: TRANSLATIONS.nav.architect[lang] }, 
    { id: 'philosophy', label: TRANSLATIONS.nav.philosophy[lang] },
    { id: 'journal', label: TRANSLATIONS.nav.journal[lang] },
    { id: 'community', label: TRANSLATIONS.nav.community[lang] },
    { id: 'art-store', label: TRANSLATIONS.nav.gallery[lang] }, 
    { id: 'contact', label: TRANSLATIONS.nav.contact[lang] },
  ];

  if (!isAuthorized) {
      return (
          <>
            <CustomCursor />
            <PasswordGate onUnlock={() => setIsAuthorized(true)} />
          </>
      );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] text-bronze flex flex-col items-center justify-center z-[9999]">
         <div className="w-64 h-1 bg-white/10 mb-8 rounded-full overflow-hidden relative">
             <motion.div className="absolute top-0 left-0 h-full bg-bronze" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.5, ease: "easeInOut" }}></motion.div>
         </div>
         <div className="font-mono text-xs uppercase tracking-[0.2em] animate-pulse">{LOAD_PHASES[loadingPhase][lang]}</div>
      </div>
    );
  }

  const isFunnelMode = currentView === 'landing';

  return (
    <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-700 bg-darkBg text-concrete`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CustomCursor />
      <SoundController />
      
      <AnimatePresence>
        {blueprintMode && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[40] pointer-events-none">
              <BlueprintOverlay />
           </motion.div>
        )}
      </AnimatePresence>
      
      {!isFunnelMode && (
      <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigateTo('home')}>
             <div className="hidden lg:block text-alabaster group-hover:text-bronze transition-colors">
                 <span className={`block text-xl font-bold tracking-tight ${lang === 'ar' ? 'font-amiri' : 'font-serif'}`}>HUMAN ARCHITECTURE</span>
             </div>
             <div className="lg:hidden text-white font-bold text-xl">HA</div>
          </div>

          <nav className="hidden xl:flex items-center gap-6">
             {navItems.map((item) => (
                 <button key={item.id} onClick={() => navigateTo(item.id)} className={`text-[0.65rem] uppercase tracking-[0.15em] hover:text-bronze transition-colors py-2 ${currentView === item.id ? 'text-white font-bold border-b border-bronze' : 'text-slate'}`}>{item.label}</button>
             ))}
          </nav>

          <div className="flex items-center gap-4">
              {currentUser ? (
                  <button onClick={() => navigateTo('dashboard')} className="bg-bronze text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-charcoal transition-colors rounded-sm shadow-[0_0_10px_rgba(197,160,101,0.3)]">{lang === 'ar' ? 'لوحة التحكم' : 'DASHBOARD'}</button>
              ) : (
                  <button onClick={() => navigateTo('register')} className="bg-bronze text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-charcoal transition-colors rounded-sm shadow-[0_0_10px_rgba(197,160,101,0.3)]">{lang === 'ar' ? 'انضمام' : 'JOIN'}</button>
              )}

              <button onClick={() => navigateTo('landing')} className="hidden md:flex border border-white/20 text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:border-bronze hover:text-bronze transition-colors rounded-sm">{lang === 'ar' ? 'المخطط' : 'THE BLUEPRINT'}</button>
              
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="text-xs font-bold hover:text-bronze transition-colors uppercase text-slate">{lang === 'en' ? 'AR' : 'EN'}</button>

              <button onClick={() => setMenuOpen(true)} className="xl:hidden group flex items-center gap-2 text-white hover:text-bronze transition-colors">
                  <Menu size={24} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </button>
          </div>
        </div>
      </header>
      )}

      <AnimatePresence>
        {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col items-center justify-center xl:hidden">
                <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-slate hover:text-bronze transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">{lang === 'ar' ? 'إغلاق' : 'CLOSE'} <X size={32} /></button>
                <nav className="space-y-6 text-center">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                         <button onClick={() => { navigateTo('landing'); setMenuOpen(false); }} className={`text-2xl ${lang === 'ar' ? 'font-amiri' : 'font-serif'} hover:text-bronze transition-all duration-300 ${currentView === 'landing' ? 'text-white' : 'text-slate-600'}`}>{TRANSLATIONS.nav.blueprint[lang]}</button>
                    </motion.div>
                    {navItems.map((item, idx) => (
                        <motion.div key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: (idx + 1) * 0.1 }}>
                            <button onClick={() => { navigateTo(item.id); setMenuOpen(false); }} className={`text-2xl ${lang === 'ar' ? 'font-amiri' : 'font-serif'} hover:text-bronze transition-all duration-300 ${currentView === item.id ? 'text-white' : 'text-slate-600'}`}>{item.label}</button>
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        )}
      </AnimatePresence>

      <main className={`relative z-10 ${isFunnelMode ? 'pt-0' : ''}`}>
        <AnimatePresence mode='wait'>
            {currentView === 'landing' && <LandingPage key="landing" lang={lang} setView={navigateTo} onCheckout={handleAddToCart} />}
            {currentView === 'home' && <HomePage key="home" lang={lang} setView={navigateTo} />}
            {currentView === 'philosophy' && <PhilosophyPage key="philosophy" lang={lang} setView={navigateTo} />}
            {currentView === 'about' && <AboutPage key="about" lang={lang} />}
            {currentView === 'journal' && <JournalPage key="journal" lang={lang} />}
            {currentView === 'library' && <LibraryPage key="library" lang={lang} onCheckout={handleAddToCart} />}
            {currentView === 'store' && <LibraryPage key="store" lang={lang} onCheckout={handleAddToCart} />}
            {currentView === 'art-store' && <ArtStorePage key="art-store" lang={lang} onCheckout={handleAddToCart} />}
            {currentView === 'contact' && <ContactPage key="contact" lang={lang} />}
            {currentView === 'community' && <CommunityPage key="community" lang={lang} setView={navigateTo} currentUser={currentUser} />}
            {currentView === 'register' && <RegisterPage key="register" lang={lang} setView={navigateTo} onRegisterSuccess={handleRegisterSuccess} />}
            {currentView === 'dashboard' && <ProgramDashboard key="dashboard" lang={lang} currentUser={currentUser} />}
            {currentView === 'checkout' && <CheckoutPage key="checkout" lang={lang} items={checkoutItems} onBack={() => navigateTo('library')} onComplete={handlePurchaseComplete} />}
        </AnimatePresence>
      </main>

      {!isFunnelMode && currentView !== 'checkout' && (
      <footer className="bg-[#050505] text-slate-400 py-12 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[0.6rem] uppercase tracking-widest text-slate">{TRANSLATIONS.footer.copyright[lang]}</div>
              <div className="flex items-center gap-8">
                  <a href="#" className="hover:text-bronze transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="hover:text-bronze transition-colors"><Twitter size={18} /></a>
                  <a href="#" className="hover:text-bronze transition-colors"><Linkedin size={18} /></a>
              </div>
          </div>
      </footer>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Language, View, Product } from './types';
import { TRANSLATIONS } from './constants';
import { Menu, X, Moon, Sun, Grid, Activity, Wifi, Battery, Layers, ShoppingBag } from './components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './components/HomePage';
import { PhilosophyPage } from './components/PhilosophyPage';
import { JournalPage } from './components/JournalPage';
import { LibraryPage } from './components/LibraryPage';
import { ContactPage } from './components/ContactPage';
import { CommunityPage } from './components/CommunityPage';
import { LandingPage } from './components/LandingPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentView, setCurrentView] = useState<View>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
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

  const VALID_VIEWS: View[] = ['home', 'philosophy', 'journal', 'library', 'contact', 'community', 'landing', 'checkout'];

  // --- ROUTING SYSTEM (Source of Truth: Window Hash) ---
  const navigateTo = (view: View) => {
    window.location.hash = `#${view}`;
  };

  useEffect(() => {
    const handleHashChange = () => {
      // Extract clean view name from hash (e.g., #library?id=123 -> library)
      const rawHash = window.location.hash.replace('#', '');
      const viewName = rawHash.split('?')[0] as View;

      if (VALID_VIEWS.includes(viewName)) {
        setCurrentView(viewName);
        window.scrollTo(0, 0);
      } else {
        // Fallback for empty or invalid hash
        if (rawHash === '' || rawHash === '/') {
           if (window.location.hash !== '#home') {
               window.location.hash = '#home';
           }
        } else {
           // Invalid route -> Redirect home
           window.location.hash = '#home';
        }
      }
    };

    // Initial Load Check
    if (!window.location.hash) {
        window.location.hash = '#home';
    } else {
        handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  // -----------------------------------------------------

  useEffect(() => {
    // Boot Sequence Simulation
    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => {
        if (prev < LOAD_PHASES.length - 1) return prev + 1;
        return prev;
      });
    }, 400);

    const bootTimeout = setTimeout(() => {
      setLoading(false);
      clearInterval(phaseInterval);
    }, 2800);

    return () => {
      clearTimeout(bootTimeout);
      clearInterval(phaseInterval);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (darkMode) body.classList.add('dark');
    else body.classList.remove('dark');
    
    if (blueprintMode) body.classList.add('blueprint-mode');
    else body.classList.remove('blueprint-mode');
  }, [darkMode, blueprintMode]);

  const headingFont = lang === 'ar' ? 'font-amiri' : 'font-playfair';
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  const handleAddToCart = (items: Product[]) => {
      setCheckoutItems(items);
      navigateTo('checkout');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 text-bronze">
        <div className="w-64 h-[1px] bg-white/10 mb-8 relative overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-bronze blur-[2px]"
          />
        </div>
        
        <div className="flex flex-col items-center gap-4 h-16">
            <motion.span 
              key={loadingPhase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-sm tracking-[0.2em] uppercase ${lang === 'ar' ? 'font-ibm' : 'font-mono'}`}
            >
                {lang === 'ar' ? LOAD_PHASES[loadingPhase].ar : LOAD_PHASES[loadingPhase].en}
            </motion.span>
            
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full transition-colors duration-300 ${i <= loadingPhase ? 'bg-bronze' : 'bg-white/10'}`} 
                />
              ))}
            </div>
        </div>
        
        <span className="absolute bottom-10 text-[0.5rem] font-mono text-slate/50">V.2.1.2 // STABLE BUILD</span>
      </div>
    );
  }

  return (
    <div dir={direction} className={`min-h-screen selection:bg-bronze selection:text-white architectural-grid transition-colors duration-700 ${blueprintMode ? '' : 'bg-alabaster dark:bg-darkBg'}`}>
      
      <div className="noise-overlay"></div>
      <div className="hidden md:block"><CustomCursor /></div>

      {currentView !== 'landing' && currentView !== 'checkout' && (
        <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-700 backdrop-blur-md ${blueprintMode ? 'bg-[#0a192f]/90 border-blue-500/30' : 'bg-alabaster/90 dark:bg-darkBg/90 border-slate/10'}`}>
          
          <div className="h-8 border-b border-white/5 flex items-center justify-between px-6 text-[0.6rem] font-mono uppercase tracking-widest text-slate/60">
             <div className="flex gap-4">
                <span className="flex items-center gap-1"><Wifi size={10} /> {lang === 'ar' ? 'متصل' : 'ONLINE'}</span>
                <span className="flex items-center gap-1"><Activity size={10} /> {lang === 'ar' ? 'النظام مستقر' : 'SYSTEM STABLE'}</span>
             </div>
             <div className="flex gap-4">
                 <span>LOC: 30.0444° N, 31.2357° E</span>
                 <span className="flex items-center gap-1"><Battery size={10} /> 100%</span>
             </div>
          </div>

          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            
            <button 
              onClick={() => navigateTo('home')} 
              className={`text-xl md:text-2xl font-bold tracking-wider hover:text-bronze transition-colors cursor-pointer flex items-center gap-2 ${blueprintMode ? 'text-[#64ffda]' : 'text-charcoal dark:text-concrete'} ${headingFont}`}
            >
              <Grid size={20} className={blueprintMode ? 'text-[#64ffda]' : 'text-bronze'} />
              {lang === 'ar' ? 'عمارة الإنسان' : 'HUMAN ARCH.'}
            </button>

            <div className="hidden md:flex items-center gap-6">
              {['philosophy', 'journal', 'library', 'community'].map((view) => (
                  <button 
                    key={view}
                    onClick={() => navigateTo(view as View)} 
                    className={`text-[0.7rem] uppercase tracking-[0.15em] hover:text-bronze transition-all cursor-pointer relative group ${currentView === view ? 'text-bronze font-bold' : 'text-slate'}`}
                  >
                      {TRANSLATIONS.nav[view as keyof typeof TRANSLATIONS.nav][lang]}
                      <span className={`absolute -bottom-6 left-0 w-full h-[2px] bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform ${currentView === view ? 'scale-x-100' : ''}`}></span>
                  </button>
              ))}

              <button 
                onClick={() => navigateTo('landing')} 
                className={`ml-4 text-xs font-bold border px-5 py-2 uppercase tracking-widest transition-all flex items-center gap-2 ${blueprintMode ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10' : 'border-bronze text-bronze hover:bg-bronze hover:text-white'}`}
              >
                 <ShoppingBag size={14} />
                 {lang === 'ar' ? 'المخطط' : 'Blueprint'}
              </button>

              <div className="h-8 w-px bg-slate/20 mx-2"></div>

              <div className="flex items-center gap-3 bg-slate/5 px-3 py-1 rounded-full border border-slate/10">
                  <button 
                    onClick={() => setBlueprintMode(!blueprintMode)}
                    className={`p-2 rounded-full transition-all ${blueprintMode ? 'text-[#64ffda] bg-[#64ffda]/10' : 'text-slate hover:text-bronze'}`}
                    title="CAD Mode"
                  >
                      <Layers size={16} />
                  </button>

                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full transition-all ${darkMode ? 'text-white' : 'text-charcoal'} hover:text-bronze`}
                    title={darkMode ? (lang === 'ar' ? 'الوضع المضيء' : 'Light Mode') : (lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
                    aria-label="Toggle Dark Mode"
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </button>

                  <div className="w-px h-4 bg-slate/20"></div>

                  <button 
                    onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                    className="text-xs font-mono text-slate hover:text-bronze px-2"
                  >
                    {lang === 'en' ? 'AR' : 'EN'}
                  </button>
              </div>

            </div>

            <div className="flex items-center gap-4 md:hidden">
                 <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`${blueprintMode ? 'text-[#64ffda]' : 'text-charcoal dark:text-concrete'} p-2`}
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>

                <button className={`${blueprintMode ? 'text-[#64ffda]' : 'text-charcoal dark:text-concrete'}`} onClick={() => setMenuOpen(true)}>
                  <Menu size={24} strokeWidth={1} />
                </button>
            </div>
          </div>
        </nav>
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: direction === 'rtl' ? '100%' : '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'rtl' ? '100%' : '-100%' }}
            transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
            className={`fixed inset-0 z-[60] flex flex-col items-center justify-center ${blueprintMode ? 'bg-[#0a192f] text-[#64ffda]' : 'bg-alabaster dark:bg-darkBg'}`}
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 opacity-70">
              <X size={32} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-8 text-center text-xl">
               <button onClick={() => { navigateTo('home'); setMenuOpen(false); }} className={headingFont}>{TRANSLATIONS.nav.home[lang]}</button>
               <button onClick={() => { navigateTo('landing'); setMenuOpen(false); }} className={`text-bronze ${headingFont} text-2xl`}>{lang === 'ar' ? 'شراء الكتاب' : 'Buy The Book'}</button>
               <button onClick={() => { navigateTo('philosophy'); setMenuOpen(false); }} className={headingFont}>{TRANSLATIONS.nav.philosophy[lang]}</button>
               <button onClick={() => { navigateTo('library'); setMenuOpen(false); }} className={headingFont}>{TRANSLATIONS.nav.library[lang]}</button>
               <button onClick={() => { navigateTo('community'); setMenuOpen(false); }} className={headingFont}>{TRANSLATIONS.nav.community[lang]}</button>
               
               <div className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-current/10 w-48 mx-auto">
                 <button onClick={() => setBlueprintMode(!blueprintMode)} className="flex items-center gap-2 text-sm uppercase tracking-widest px-4 py-2">
                    <Layers size={14} /> {blueprintMode ? 'Disable CAD' : 'Enable CAD'}
                 </button>
                 
                 <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false); }} className="uppercase text-sm tracking-widest opacity-50">
                   Change Language ({lang === 'en' ? 'AR' : 'EN'})
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div 
            key={currentView} 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
          {currentView === 'home' && <HomePage lang={lang} setView={navigateTo} />}
          {currentView === 'philosophy' && <PhilosophyPage lang={lang} setView={navigateTo} />}
          {currentView === 'journal' && <JournalPage lang={lang} />}
          {currentView === 'library' && <LibraryPage lang={lang} onCheckout={handleAddToCart} />}
          {currentView === 'community' && <CommunityPage lang={lang} />}
          {currentView === 'contact' && <ContactPage lang={lang} />}
          {currentView === 'landing' && <LandingPage lang={lang} setView={navigateTo} onCheckout={handleAddToCart} />}
          {currentView === 'checkout' && (
              <CheckoutPage 
                lang={lang} 
                items={checkoutItems} 
                onBack={() => navigateTo('library')}
                onComplete={() => navigateTo('home')} 
              />
          )}
        </motion.div>
      </AnimatePresence>
      
      {blueprintMode && (
          <div className="fixed inset-0 pointer-events-none z-[9999] border-[20px] border-[#64ffda]/10 flex items-center justify-center">
              <div className="absolute top-4 left-4 text-[#64ffda] text-[0.6rem] font-mono">CAM_01 [REC]</div>
              <div className="absolute bottom-4 right-4 text-[#64ffda] text-[0.6rem] font-mono">ARCH_MODE: ACTIVE</div>
              <div className="w-8 h-8 border-l border-t border-[#64ffda] absolute top-4 left-4"></div>
              <div className="w-8 h-8 border-r border-t border-[#64ffda] absolute top-4 right-4"></div>
              <div className="w-8 h-8 border-l border-b border-[#64ffda] absolute bottom-4 left-4"></div>
              <div className="w-8 h-8 border-r border-b border-[#64ffda] absolute bottom-4 right-4"></div>
              <div className="w-[1px] h-10 bg-[#64ffda]/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="h-[1px] w-10 bg-[#64ffda]/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
      )}

    </div>
  );
}

export default App;
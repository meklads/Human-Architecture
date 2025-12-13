
import React, { useState, useEffect } from 'react';
import { Language, View, Product } from './types';
import { TRANSLATIONS } from './constants';
import { Menu, X, Moon, Sun, Grid, Layers } from './components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './components/HomePage';
import { PhilosophyPage } from './components/PhilosophyPage';
import { JournalPage } from './components/JournalPage';
import { LibraryPage } from './components/LibraryPage';
import { ContactPage } from './components/ContactPage';
import { LandingPage } from './components/LandingPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CommunityPage } from './components/CommunityPage';
import { CustomCursor } from './components/CustomCursor';
import { Magnetic } from './components/Magnetic';
import { BlueprintOverlay } from './components/BlueprintOverlay';
import { SoundController } from './components/SoundController';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Architectural Loading State
  const [loadingPhase, setLoadingPhase] = useState(0);
  
  // Blueprint Mode State
  const [blueprintMode, setBlueprintMode] = useState(false);

  // Cart State for Checkout
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);

  // Construction Phases for Loader
  const LOAD_PHASES = [
    { ar: 'جاري فحص التربة والأساسات...', en: 'ANALYZING SOIL CONDITIONS...' },
    { ar: 'صب الخرسانة المسلحة...', en: 'POURING REINFORCED CONCRETE...' },
    { ar: 'رفع الأعمدة الإنشائية...', en: 'ERECTING STRUCTURAL PILLARS...' },
    { ar: 'تركيب الأنظمة الداخلية...', en: 'INSTALLING INTERNAL SYSTEMS...' },
    { ar: 'طلاء الواجهة الخارجية...', en: 'FINISHING EXTERIOR FACADE...' },
    { ar: 'المبنى جاهز للإشغال.', en: 'STRUCTURE READY FOR OCCUPANCY.' }
  ];

  // Initial Load Simulation & Deep Link Handler
  useEffect(() => {
    // 1. Architectural Boot Sequence
    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => {
        if (prev < LOAD_PHASES.length - 1) return prev + 1;
        return prev;
      });
    }, 400); // Cycle through phases

    const bootTimeout = setTimeout(() => {
      setLoading(false);
      clearInterval(phaseInterval);
    }, 2800);

    // 2. Handle Incoming QR Links (Query Params)
    const params = new URLSearchParams(window.location.search);
    const targetView = params.get('view') as View;
    
    // Validate view before switching
    if (targetView && ['home', 'philosophy', 'journal', 'library', 'contact', 'landing', 'community'].includes(targetView)) {
        setCurrentView(targetView);
    }

    return () => {
      clearTimeout(bootTimeout);
      clearInterval(phaseInterval);
    };
  }, []);

  // Effect to toggle body classes
  useEffect(() => {
    const body = document.body;
    if (darkMode) body.classList.add('dark');
    else body.classList.remove('dark');
    
    if (blueprintMode) body.classList.add('blueprint-mode');
    else body.classList.remove('blueprint-mode');
  }, [darkMode, blueprintMode]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const headingFont = lang === 'ar' ? 'font-amiri' : 'font-playfair';
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  const handleAddToCart = (items: Product[]) => {
      setCheckoutItems(items);
      setCurrentView('checkout');
  };

  // After checkout success
  const handlePurchaseComplete = () => {
      // If they bought the bundle, send to dashboard. Otherwise home.
      const hasBundle = checkoutItems.some(i => i.category === 'bundle');
      if (hasBundle) {
          // Note: In a real app we would unlock content here
          setCurrentView('community'); // Assuming community/dashboard access
      } else {
          setCurrentView('home');
      }
      setCheckoutItems([]);
  };

  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: TRANSLATIONS.nav.home[lang] },
    { id: 'philosophy', label: TRANSLATIONS.nav.philosophy[lang] },
    { id: 'library', label: TRANSLATIONS.nav.library[lang] },
    { id: 'journal', label: TRANSLATIONS.nav.journal[lang] },
    { id: 'community', label: TRANSLATIONS.nav.community[lang] },
    { id: 'contact', label: TRANSLATIONS.nav.contact[lang] },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] text-bronze flex flex-col items-center justify-center z-[9999]">
         <div className="w-64 h-1 bg-white/10 mb-8 rounded-full overflow-hidden relative">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-bronze"
               initial={{ width: 0 }}
               animate={{ width: '100%' }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
             ></motion.div>
         </div>
         <div className="font-mono text-xs uppercase tracking-[0.2em] animate-pulse">
             {LOAD_PHASES[loadingPhase][lang]}
         </div>
         <div className="mt-4 flex gap-2">
             <span className="w-1 h-1 bg-bronze rounded-full animate-bounce" style={{ animationDelay: '0s'}}></span>
             <span className="w-1 h-1 bg-bronze rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></span>
             <span className="w-1 h-1 bg-bronze rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></span>
         </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'dark' : ''}`} dir={direction}>
      <CustomCursor />
      
      {/* GLOBAL AUDIO SYSTEM */}
      <SoundController />
      
      {/* GLOBAL BLUEPRINT OVERLAY */}
      <AnimatePresence>
        {blueprintMode && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[40] pointer-events-none"
           >
              <BlueprintOverlay />
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- NAVIGATION BAR --- */}
      <header className="fixed top-0 w-full z-50 mix-blend-difference text-white">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          
          {/* Logo Area */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentView('home')}>
             <div className={`w-12 h-12 border-2 border-white flex items-center justify-center font-bold text-xl group-hover:rotate-45 transition-transform duration-500 bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]`}>
                 H
             </div>
             <div className="hidden lg:block">
                 <span className={`block text-xs uppercase tracking-[0.4em] font-bold ${headingFont}`}>Human</span>
                 <span className="block text-[0.5rem] uppercase tracking-[0.4em] opacity-80">Architecture</span>
             </div>
          </div>

          {/* Center Navigation (Desktop) - Restored */}
          <nav className="hidden md:flex items-center gap-8">
             {navItems.map((item) => (
                 <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`text-xs uppercase tracking-widest hover:text-bronze transition-colors ${currentView === item.id ? 'text-bronze font-bold border-b border-bronze pb-1' : 'text-slate'}`}
                 >
                     {item.label}
                 </button>
             ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="text-xs font-bold hover:text-bronze transition-colors uppercase"
              >
                  {lang === 'en' ? 'AR' : 'EN'}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMenuOpen(true)}
                className="md:hidden group flex items-center gap-2 hover:text-bronze transition-colors"
              >
                  <Menu size={24} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </button>

              {/* Blueprint CTA */}
              <Magnetic strength={0.3}>
                  <button 
                    onClick={() => setCurrentView('landing')}
                    className="hidden lg:flex bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-bronze hover:text-white transition-colors items-center gap-2"
                  >
                      <Layers size={14} />
                      {lang === 'ar' ? 'المخطط' : 'The Blueprint'}
                  </button>
              </Magnetic>
          </div>
        </div>
      </header>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-[#0a0a0a]/98 backdrop-blur-xl text-alabaster flex flex-col items-center justify-center md:hidden"
            >
                {/* Close Button */}
                <button 
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-8 right-8 text-slate hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                    {lang === 'ar' ? 'إغلاق' : 'CLOSE'} <X size={32} />
                </button>

                {/* Navigation Links */}
                <nav className="space-y-8 text-center">
                    {navItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <button 
                                onClick={() => { setCurrentView(item.id); setMenuOpen(false); }}
                                className={`text-4xl ${headingFont} hover:text-bronze transition-all duration-300 group flex items-center justify-center gap-6 ${currentView === item.id ? 'text-bronze' : 'text-slate'}`}
                            >
                                <span className="text-xs font-mono opacity-30 group-hover:opacity-100 transition-opacity -mt-4">0{idx+1}</span>
                                {item.label}
                            </button>
                        </motion.div>
                    ))}
                </nav>

                {/* Footer Controls */}
                <div className="mt-20 flex gap-12 text-slate">
                        <button onClick={() => setDarkMode(!darkMode)} className="hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? 'Light' : 'Dark'}
                        </button>
                        <button 
                        onClick={() => setBlueprintMode(!blueprintMode)} 
                        className={`hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest ${blueprintMode ? 'text-cyan-400' : ''}`}
                        >
                            <Grid size={18} /> {blueprintMode ? 'Blueprint' : 'Blueprint'}
                        </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10">
        <AnimatePresence mode='wait'>
            {currentView === 'home' && <HomePage key="home" lang={lang} setView={setCurrentView} />}
            {currentView === 'philosophy' && <PhilosophyPage key="philosophy" lang={lang} setView={setCurrentView} />}
            {currentView === 'journal' && <JournalPage key="journal" lang={lang} />}
            {currentView === 'library' && <LibraryPage key="library" lang={lang} onCheckout={handleAddToCart} />}
            {currentView === 'contact' && <ContactPage key="contact" lang={lang} />}
            {currentView === 'landing' && <LandingPage key="landing" lang={lang} setView={setCurrentView} onCheckout={handleAddToCart} />}
            {currentView === 'community' && <CommunityPage key="community" lang={lang} />}
            {currentView === 'checkout' && (
                <CheckoutPage 
                    key="checkout" 
                    lang={lang} 
                    items={checkoutItems} 
                    onBack={() => setCurrentView('library')}
                    onComplete={handlePurchaseComplete}
                />
            )}
        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      {currentView !== 'checkout' && (
      <footer className="bg-[#050505] text-slate/40 py-12 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[0.6rem] uppercase tracking-widest">
                  {TRANSLATIONS.footer.copyright[lang]}
              </div>
              
              {/* Desktop Footer Controls - Moved here from Menu */}
              <div className="hidden md:flex gap-8">
                   <button onClick={() => setDarkMode(!darkMode)} className="hover:text-white transition-colors flex items-center gap-2 text-[0.6rem] uppercase tracking-widest">
                        {darkMode ? <Sun size={12} /> : <Moon size={12} />} {darkMode ? 'Light Mode' : 'Dark Mode'}
                   </button>
                   <button 
                        onClick={() => setBlueprintMode(!blueprintMode)} 
                        className={`hover:text-white transition-colors flex items-center gap-2 text-[0.6rem] uppercase tracking-widest ${blueprintMode ? 'text-cyan-400' : ''}`}
                   >
                        <Grid size={12} /> {blueprintMode ? 'Blueprint ON' : 'Blueprint Mode'}
                   </button>
              </div>

              <div className="flex items-center gap-8">
                  <a href="#" className="hover:text-bronze transition-colors"><span className="sr-only">Instagram</span>IG</a>
                  <a href="#" className="hover:text-bronze transition-colors"><span className="sr-only">Twitter</span>TW</a>
                  <a href="#" className="hover:text-bronze transition-colors"><span className="sr-only">LinkedIn</span>LI</a>
              </div>
          </div>
      </footer>
      )}
      
    </div>
  );
}

export default App;

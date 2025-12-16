
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

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('landing'); // Default to Landing Page
  const [darkMode, setDarkMode] = useState(true); // Default to Dark Mode (The Beautiful One)
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

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

  // Initial Load Simulation & Deep Link Handler & User Restore
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
    if (targetView && ['home', 'philosophy', 'journal', 'library', 'store', 'art-store', 'contact', 'landing', 'community', 'register', 'dashboard', 'about'].includes(targetView)) {
        setCurrentView(targetView);
    }

    // 3. Restore User Session
    const savedUser = localStorage.getItem('iham_user_profile');
    if (savedUser) {
        try {
            setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
            console.error('Failed to restore user session');
        }
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

  const headingFont = lang === 'ar' ? 'font-amiri' : 'font-serif';
  const navFont = lang === 'ar' ? 'font-ibm' : 'font-sans';
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
          setCurrentView('dashboard'); // Assuming dashboard access
      } else {
          setCurrentView('home');
      }
      setCheckoutItems([]);
  };

  const handleRegisterSuccess = (profile: UserProfile) => {
      setCurrentUser(profile);
      localStorage.setItem('iham_user_profile', JSON.stringify(profile));
      setCurrentView('dashboard'); // Redirect to Dashboard after login/register
  };

  const handleLogout = () => {
      setCurrentUser(null);
      localStorage.removeItem('iham_user_profile');
      setCurrentView('landing');
  };

  const navItems: { id: View; label: string }[] = [
    { id: 'about', label: TRANSLATIONS.nav.architect[lang] }, 
    { id: 'philosophy', label: TRANSLATIONS.nav.philosophy[lang] },
    { id: 'journal', label: TRANSLATIONS.nav.journal[lang] },
    { id: 'community', label: TRANSLATIONS.nav.community[lang] },
    { id: 'library', label: TRANSLATIONS.nav.library[lang] },
    { id: 'art-store', label: TRANSLATIONS.nav.gallery[lang] }, // Moved to end
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
    <div className={`min-h-screen transition-colors duration-700 bg-darkBg text-concrete`} dir={direction}>
      <CustomCursor />
      
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
      
      {/* --- STICKY DARK HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo Area */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentView('landing')}>
             <div className="hidden lg:block text-alabaster group-hover:text-bronze transition-colors">
                 <span className={`block text-xl font-bold tracking-tight ${headingFont}`}>HUMAN ARCHITECTURE</span>
             </div>
             {/* Mobile Logo Fallback */}
             <div className="lg:hidden text-white font-bold text-xl">HA</div>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6">
             {navItems.map((item) => (
                 <button
                    key={item.id} 
                    onClick={() => setCurrentView(item.id)}
                    className={`text-[0.65rem] uppercase tracking-[0.15em] hover:text-bronze transition-colors py-2 ${currentView === item.id ? 'text-white font-bold border-b border-bronze' : 'text-slate'}`}
                 >
                     {item.label}
                 </button>
             ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
              
              {/* JOIN Button */}
              {currentUser ? (
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="bg-bronze text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-charcoal transition-colors rounded-sm shadow-[0_0_10px_rgba(197,160,101,0.3)]"
                  >
                      {lang === 'ar' ? 'لوحة التحكم' : 'DASHBOARD'}
                  </button>
              ) : (
                  <button 
                    onClick={() => setCurrentView('register')}
                    className="bg-bronze text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-charcoal transition-colors rounded-sm shadow-[0_0_10px_rgba(197,160,101,0.3)]"
                  >
                      {lang === 'ar' ? 'انضمام' : 'JOIN'}
                  </button>
              )}

              {/* BLUEPRINT Button (Luxury Style) */}
              <button 
                onClick={() => setCurrentView('library')}
                className="hidden md:flex border border-white/20 text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:border-bronze hover:text-bronze transition-colors rounded-sm"
              >
                  {lang === 'ar' ? 'المخطط' : 'THE BLUEPRINT'}
              </button>
              
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="text-xs font-bold hover:text-bronze transition-colors uppercase text-slate"
              >
                  {lang === 'en' ? 'AR' : 'EN'}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMenuOpen(true)}
                className="xl:hidden group flex items-center gap-2 text-white hover:text-bronze transition-colors"
              >
                  <Menu size={24} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col items-center justify-center xl:hidden"
            >
                {/* Close Button */}
                <button 
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-8 right-8 text-slate hover:text-bronze transition-colors flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                    {lang === 'ar' ? 'إغلاق' : 'CLOSE'} <X size={32} />
                </button>

                {/* Navigation Links */}
                <nav className="space-y-6 text-center">
                    {/* Explicitly adding The Blueprint for Mobile since we removed it from navItems to clean desktop */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0 }}
                    >
                         <button 
                            onClick={() => { setCurrentView('library'); setMenuOpen(false); }}
                            className={`text-2xl ${headingFont} hover:text-bronze transition-all duration-300 group flex items-center justify-center gap-6 ${currentView === 'library' ? 'text-white' : 'text-slate-600'}`}
                        >
                            {TRANSLATIONS.nav.blueprint[lang]}
                        </button>
                    </motion.div>

                    {navItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: (idx + 1) * 0.1 }}
                        >
                            <button 
                                onClick={() => { setCurrentView(item.id); setMenuOpen(false); }}
                                className={`text-2xl ${headingFont} hover:text-bronze transition-all duration-300 group flex items-center justify-center gap-6 ${currentView === item.id ? 'text-white' : 'text-slate-600'}`}
                            >
                                {item.label}
                            </button>
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10">
        <AnimatePresence mode='wait'>
            {currentView === 'landing' && <LandingPage key="landing" lang={lang} setView={setCurrentView} onCheckout={handleAddToCart} />}
            {currentView === 'home' && <HomePage key="home" lang={lang} setView={setCurrentView} />}
            {currentView === 'philosophy' && <PhilosophyPage key="philosophy" lang={lang} setView={setCurrentView} />}
            {currentView === 'about' && <AboutPage key="about" lang={lang} />}
            {currentView === 'journal' && <JournalPage key="journal" lang={lang} />}
            {currentView === 'library' && <LibraryPage key="library" lang={lang} onCheckout={handleAddToCart} />}
            {/* Store renders the LibraryPage but keeps the 'store' ID active in nav logic if accessed via deep link */}
            {currentView === 'store' && <LibraryPage key="store" lang={lang} onCheckout={handleAddToCart} />}
            {currentView === 'art-store' && <ArtStorePage key="art-store" lang={lang} onCheckout={handleAddToCart} />}
            {currentView === 'contact' && <ContactPage key="contact" lang={lang} />}
            {currentView === 'community' && <CommunityPage key="community" lang={lang} setView={setCurrentView} currentUser={currentUser} />}
            {currentView === 'register' && (
                <RegisterPage 
                    key="register" 
                    lang={lang} 
                    setView={setCurrentView} 
                    onRegisterSuccess={handleRegisterSuccess} 
                />
            )}
            {currentView === 'dashboard' && (
                <ProgramDashboard 
                    key="dashboard" 
                    lang={lang} 
                    currentUser={currentUser}
                />
            )}
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
      <footer className="bg-[#050505] text-slate-400 py-12 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[0.6rem] uppercase tracking-widest text-slate">
                  {TRANSLATIONS.footer.copyright[lang]}
              </div>
              
              <div className="flex items-center gap-8">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors"><span className="sr-only">Instagram</span><Instagram size={18} /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors"><span className="sr-only">Twitter</span><Twitter size={18} /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors"><span className="sr-only">LinkedIn</span><Linkedin size={18} /></a>
              </div>
          </div>
      </footer>
      )}
      
    </div>
  );
}

export default App;

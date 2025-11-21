
import React, { useState, useEffect } from 'react';
import { Language, View } from './types';
import { TRANSLATIONS } from './constants';
import { Menu, X, Moon, Sun } from './components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './components/HomePage';
import { PhilosophyPage } from './components/PhilosophyPage';
import { JournalPage } from './components/JournalPage';
import { LibraryPage } from './components/LibraryPage';
import { ContactPage } from './components/ContactPage';
import { CommunityPage } from './components/CommunityPage';
import { LandingPage } from './components/LandingPage';
import { CustomCursor } from './components/CustomCursor';

function App() {
  // Updated Defaults: English and Dark Mode
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial Load Simulation with "Construction" theme
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  // Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const headingFont = lang === 'ar' ? 'font-amiri' : 'font-playfair';
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  if (loading) {
    return (
      <div className="fixed inset-0 bg-alabaster dark:bg-darkBg flex flex-col items-center justify-center z-50 transition-colors duration-700">
        <div className="w-64 h-1 bg-slate/20 mb-4 overflow-hidden relative">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-charcoal dark:bg-bronze"
          />
        </div>
        <div className={`text-xs tracking-[0.5em] uppercase text-charcoal dark:text-concrete ${lang === 'ar' ? 'font-ibm' : 'font-montserrat'}`}>
             {lang === 'ar' ? 'جاري تحميل المخططات' : 'LOADING SCHEMATICS'}
        </div>
      </div>
    );
  }

  return (
    <div dir={direction} className={`min-h-screen selection:bg-bronze selection:text-white architectural-grid bg-alabaster dark:bg-darkBg transition-colors duration-700`}>
      
      {/* Experience Enhancements */}
      <div className="noise-overlay"></div>
      <div className="hidden md:block"><CustomCursor /></div>

      {/* Navigation - Hiden on Landing Page */}
      {currentView !== 'landing' && (
        <nav className="fixed top-0 w-full z-50 bg-alabaster/90 dark:bg-darkBg/90 backdrop-blur-sm border-b border-slate/10 transition-colors duration-700">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('home')} 
              className={`text-2xl font-bold text-charcoal dark:text-concrete ${headingFont} tracking-wider hover:text-bronze transition-colors cursor-pointer`}
            >
              {lang === 'ar' ? 'عمارة الإنسان' : 'HUMAN ARCH.'}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setCurrentView('philosophy')} className={`text-sm uppercase tracking-widest hover:text-bronze transition-colors cursor-pointer ${currentView === 'philosophy' ? 'text-bronze' : 'text-slate'}`}>
                  {TRANSLATIONS.nav.philosophy[lang]}
              </button>
              <button onClick={() => setCurrentView('journal')} className={`text-sm uppercase tracking-widest hover:text-bronze transition-colors cursor-pointer ${currentView === 'journal' ? 'text-bronze' : 'text-slate'}`}>
                  {TRANSLATIONS.nav.journal[lang]}
              </button>
              <button onClick={() => setCurrentView('library')} className={`text-sm uppercase tracking-widest hover:text-bronze transition-colors cursor-pointer ${currentView === 'library' ? 'text-bronze' : 'text-slate'}`}>
                  {TRANSLATIONS.nav.library[lang]}
              </button>
              <button onClick={() => setCurrentView('community')} className={`text-sm uppercase tracking-widest hover:text-bronze transition-colors cursor-pointer ${currentView === 'community' ? 'text-bronze' : 'text-slate'}`}>
                  {TRANSLATIONS.nav.community[lang]}
              </button>
              <button onClick={() => setCurrentView('contact')} className={`text-sm uppercase tracking-widest hover:text-bronze transition-colors cursor-pointer ${currentView === 'contact' ? 'text-bronze' : 'text-slate'}`}>
                  {TRANSLATIONS.nav.contact[lang]}
              </button>
              
              <div className="h-4 w-px bg-slate/30"></div>

              {/* CTA to Landing Page */}
              <button onClick={() => setCurrentView('landing')} className="text-xs font-bold text-bronze border border-bronze px-3 py-1 uppercase tracking-widest hover:bg-bronze hover:text-white transition-all">
                 {lang === 'ar' ? 'الكتاب' : 'The Book'}
              </button>

              <button onClick={() => setDarkMode(!darkMode)} className="text-slate hover:text-bronze cursor-pointer">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <div className="flex gap-2 text-xs font-bold tracking-widest">
                {(['en', 'ar', 'fr'] as Language[]).map((l) => (
                  <button 
                    key={l} 
                    onClick={() => setLang(l)}
                    className={`cursor-pointer ${lang === l ? 'text-charcoal dark:text-alabaster underline decoration-bronze decoration-2 underline-offset-4' : 'text-slate/50 hover:text-slate'}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-charcoal dark:text-concrete" onClick={() => setMenuOpen(true)}>
              <Menu size={24} strokeWidth={1} />
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: direction === 'rtl' ? '100%' : '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'rtl' ? '100%' : '-100%' }}
            transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-alabaster dark:bg-darkBg flex flex-col items-center justify-center"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-charcoal dark:text-concrete">
              <X size={32} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-8 text-center text-xl">
               <button onClick={() => { setCurrentView('home'); setMenuOpen(false); }} className={`text-charcoal dark:text-concrete ${headingFont}`}>{TRANSLATIONS.nav.home[lang]}</button>
               <button onClick={() => { setCurrentView('landing'); setMenuOpen(false); }} className={`text-bronze ${headingFont} text-2xl`}>{lang === 'ar' ? 'الكتاب (شراء)' : 'The Book (Buy)'}</button>
               <button onClick={() => { setCurrentView('philosophy'); setMenuOpen(false); }} className={`text-charcoal dark:text-concrete ${headingFont}`}>{TRANSLATIONS.nav.philosophy[lang]}</button>
               <button onClick={() => { setCurrentView('journal'); setMenuOpen(false); }} className={`text-charcoal dark:text-concrete ${headingFont}`}>{TRANSLATIONS.nav.journal[lang]}</button>
               <button onClick={() => { setCurrentView('library'); setMenuOpen(false); }} className={`text-charcoal dark:text-concrete ${headingFont}`}>{TRANSLATIONS.nav.library[lang]}</button>
               <button onClick={() => { setCurrentView('community'); setMenuOpen(false); }} className={`text-charcoal dark:text-concrete ${headingFont}`}>{TRANSLATIONS.nav.community[lang]}</button>
               <button onClick={() => { setCurrentView('contact'); setMenuOpen(false); }} className={`text-charcoal dark:text-concrete ${headingFont}`}>{TRANSLATIONS.nav.contact[lang]}</button>
               
               <div className="flex justify-center gap-6 mt-8">
                 <button onClick={() => setDarkMode(!darkMode)} className="text-slate">
                    {darkMode ? <Sun /> : <Moon />}
                 </button>
               </div>
               <div className="flex justify-center gap-4">
                {(['en', 'ar', 'fr'] as Language[]).map((l) => (
                  <button key={l} onClick={() => { setLang(l); setMenuOpen(false); }} className="uppercase text-sm tracking-widest text-slate">
                    {l}
                  </button>
                ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Routing */}
      <AnimatePresence mode="wait">
        <div key={currentView} className="w-full">
          {currentView === 'home' && <HomePage lang={lang} setView={setCurrentView} />}
          {currentView === 'philosophy' && <PhilosophyPage lang={lang} />}
          {currentView === 'journal' && <JournalPage lang={lang} />}
          {currentView === 'library' && <LibraryPage lang={lang} />}
          {currentView === 'community' && <CommunityPage lang={lang} />}
          {currentView === 'contact' && <ContactPage lang={lang} />}
          {currentView === 'landing' && <LandingPage lang={lang} setView={setCurrentView} />}
        </div>
      </AnimatePresence>

      {/* Footer - Hidden on landing page to keep focus */}
      {currentView !== 'landing' && (
        <footer className="bg-charcoal text-alabaster py-20 border-t-4 border-bronze">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <h2 className={`text-3xl mb-6 ${headingFont}`}>{lang === 'ar' ? 'عمارة الإنسان' : 'Human Architecture'}</h2>
                <p className={`text-slate max-w-md ${lang === 'ar' ? 'font-ibm' : 'font-montserrat'}`}>
                  {lang === 'ar' 
                    ? 'مساحة لاستعادة التصميم الأصلي للروح البشرية، وترميم ما أفسده الزمن.' 
                    : 'A space to restore the original design of the human spirit, and repair what time has corrupted.'}
                </p>
              </div>
              <div>
                <h4 className="text-bronze uppercase tracking-widest text-sm mb-6">Social</h4>
                <ul className="space-y-4 text-slate">
                  <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Twitter</a></li>
                </ul>
              </div>
              <div>
                 <h4 className="text-bronze uppercase tracking-widest text-sm mb-6">Menu</h4>
                 <ul className="space-y-4 text-slate cursor-pointer">
                  <li onClick={() => setCurrentView('philosophy')} className="hover:text-white transition-colors cursor-pointer">{TRANSLATIONS.nav.philosophy[lang]}</li>
                  <li onClick={() => setCurrentView('library')} className="hover:text-white transition-colors cursor-pointer">{TRANSLATIONS.nav.library[lang]}</li>
                  <li onClick={() => setCurrentView('community')} className="hover:text-white transition-colors cursor-pointer">{TRANSLATIONS.nav.community[lang]}</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate tracking-widest uppercase border-t border-white/5">
              <p>{TRANSLATIONS.footer.copyright[lang]}</p>
              <p>Designed as a Sanctuary</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;

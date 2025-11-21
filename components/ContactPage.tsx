import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS.contact;
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-concrete/30 dark:bg-darkBg text-charcoal dark:text-concrete flex items-center"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-alabaster dark:bg-white/5 p-8 md:p-16 shadow-2xl border-t-4 border-bronze relative overflow-hidden">
          
          {/* Architectural Grid BG inside form */}
          <div className="absolute inset-0 opacity-5 pointer-events-none architectural-grid"></div>

          <div className="relative z-10">
            <h1 className={`text-4xl md:text-5xl mb-4 text-center ${headingFont}`}>{t.title[lang]}</h1>
            <p className={`text-center text-slate mb-12 ${bodyFont}`}>{t.desc[lang]}</p>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.name[lang]}</label>
                  <input type="text" className="w-full bg-transparent border-b border-slate/40 py-2 focus:border-bronze focus:outline-none transition-colors text-lg" />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.email[lang]}</label>
                  <input type="email" className="w-full bg-transparent border-b border-slate/40 py-2 focus:border-bronze focus:outline-none transition-colors text-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.type[lang]}</label>
                <select className="w-full bg-transparent border-b border-slate/40 py-2 focus:border-bronze focus:outline-none transition-colors text-lg appearance-none rounded-none">
                  <option className="dark:bg-charcoal">{isAr ? 'استشارة شخصية' : 'Personal Consultation'}</option>
                  <option className="dark:bg-charcoal">{isAr ? 'محاضرة / ورشة عمل' : 'Speaking / Workshop'}</option>
                  <option className="dark:bg-charcoal">{isAr ? 'سؤال عام' : 'General Inquiry'}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.message[lang]}</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-slate/40 py-2 focus:border-bronze focus:outline-none transition-colors text-lg resize-none"></textarea>
              </div>

              <div className="pt-8 text-center">
                <button type="button" className="px-12 py-4 border border-charcoal dark:border-concrete hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-charcoal transition-all duration-300 uppercase tracking-widest text-sm">
                  {t.form.submit[lang]}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
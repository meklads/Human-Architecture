
import React, { useState } from 'react';
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: isAr ? 'استشارة شخصية' : 'Personal Consultation',
    message: ''
  });

  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: {name?: string, email?: string, message?: string} = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = isAr ? 'الاسم مطلوب' : 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = isAr ? 'البريد الإلكتروني مطلوب' : 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = isAr ? 'صيغة البريد غير صحيحة' : 'Invalid email format';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = isAr ? 'الرسالة مطلوبة' : 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = isAr ? 'الرسالة قصيرة جداً' : 'Message is too short';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', type: isAr ? 'استشارة شخصية' : 'Personal Consultation', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }, 1500);
    }
  };

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

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.name[lang]}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-slate/40'} py-2 focus:border-bronze focus:outline-none transition-colors text-lg`} 
                  />
                  {errors.name && <span className="text-red-500 text-[0.6rem] uppercase tracking-widest">{errors.name}</span>}
                </div>
                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.email[lang]}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-slate/40'} py-2 focus:border-bronze focus:outline-none transition-colors text-lg`} 
                  />
                  {errors.email && <span className="text-red-500 text-[0.6rem] uppercase tracking-widest">{errors.email}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.type[lang]}</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-slate/40 py-2 focus:border-bronze focus:outline-none transition-colors text-lg appearance-none rounded-none"
                >
                  <option className="dark:bg-charcoal">{isAr ? 'استشارة شخصية' : 'Personal Consultation'}</option>
                  <option className="dark:bg-charcoal">{isAr ? 'محاضرة / ورشة عمل' : 'Speaking / Workshop'}</option>
                  <option className="dark:bg-charcoal">{isAr ? 'سؤال عام' : 'General Inquiry'}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest text-slate ${bodyFont}`}>{t.form.message[lang]}</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-slate/40'} py-2 focus:border-bronze focus:outline-none transition-colors text-lg resize-none`}
                ></textarea>
                {errors.message && <span className="text-red-500 text-[0.6rem] uppercase tracking-widest">{errors.message}</span>}
              </div>

              <div className="pt-8 text-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`px-12 py-4 border border-charcoal dark:border-concrete transition-all duration-300 uppercase tracking-widest text-sm ${submitted ? 'bg-green-600 text-white border-green-600' : 'hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-charcoal'}`}
                >
                  {isSubmitting ? '...' : submitted ? (isAr ? 'تم الإرسال' : 'Sent') : t.form.submit[lang]}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

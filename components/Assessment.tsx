import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Language, AssessmentCategory, View } from '../types';
import { TRANSLATIONS, REPAIR_PROTOCOLS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Activity, Shield, AlertTriangle, Check, RefreshCw } from './Icons';

interface AssessmentProps {
  lang: Language;
  setView: (view: View) => void;
}

const QUESTIONS = [
  { id: 1, category: AssessmentCategory.FOUNDATION, text: { ar: 'هل تشعر بالإرهاق الجسدي دون سبب واضح؟', en: 'Do you feel physical exhaustion without clear cause?', fr: 'Ressentez-vous un épuisement physique sans cause claire ?' } },
  { id: 2, category: AssessmentCategory.STRUCTURE, text: { ar: 'هل تجد صعوبة في تركيز أفكارك؟', en: 'Do you find it hard to focus your thoughts?', fr: 'Avez-vous du mal à concentrer vos pensées ?' } },
  { id: 3, category: AssessmentCategory.INTERIOR, text: { ar: 'هل فقدت شغفك بالأشياء التي كنت تحبها؟', en: 'Have you lost passion for things you loved?', fr: 'Avez-vous perdu la passion pour les choses que vous aimiez ?' } },
  { id: 4, category: AssessmentCategory.EXTERIOR, text: { ar: 'هل تتجنب التواصل الاجتماعي؟', en: 'Do you avoid social interaction?', fr: 'Évitez-vous les interactions sociales ?' } },
  { id: 5, category: AssessmentCategory.FOUNDATION, text: { ar: 'هل نومك مضطرب؟', en: 'Is your sleep disturbed?', fr: 'Votre sommeil est-il perturbé ?' } },
  { id: 6, category: AssessmentCategory.STRUCTURE, text: { ar: 'هل تعاني من التفكير الزائد (Overthinking)؟', en: 'Do you suffer from Overthinking?', fr: 'Souffrez-vous de trop penser ?' } },
];

export const Assessment: React.FC<AssessmentProps> = ({ lang, setView }) => {
  const isAr = lang === 'ar';
  const [step, setStep] = useState(0); // 0 = intro, 1-N = questions, N+1 = processing, N+2 = result
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  const handleStart = () => setStep(1);

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [QUESTIONS[step - 1].id]: value };
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1); // Go to processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(step + 2); // Show result
      }, 2000);
    }
  };

  // Aggregate results
  const calculateData = () => {
    const dataMap: Record<string, number> = {
      [AssessmentCategory.FOUNDATION]: 0,
      [AssessmentCategory.STRUCTURE]: 0,
      [AssessmentCategory.INTERIOR]: 0,
      [AssessmentCategory.EXTERIOR]: 0,
    };

    // Max score per category
    const maxMap: Record<string, number> = {
      [AssessmentCategory.FOUNDATION]: 0,
      [AssessmentCategory.STRUCTURE]: 0,
      [AssessmentCategory.INTERIOR]: 0,
      [AssessmentCategory.EXTERIOR]: 0,
    };

    QUESTIONS.forEach((q) => {
      const score = answers[q.id] || 0;
      dataMap[q.category] += score;
      maxMap[q.category] += 5;
    });

    // Convert to "Health" score (Inverse of questions which ask about problems)
    // High score in questions = High Problems = Low Health
    return Object.keys(dataMap).map(key => ({
      subject: key,
      A: 100 - ((dataMap[key] / maxMap[key]) * 100), // Invert to show Health
      fullMark: 100,
      rawValue: (dataMap[key] / maxMap[key]) * 100 // Raw problem score for diagnosis
    }));
  };

  const renderIntro = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="text-center py-24 px-4 border-t border-b border-slate/20 bg-alabaster dark:bg-darkBg relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
      <Activity size={48} className="mx-auto mb-6 text-bronze opacity-80" />
      <h3 className={`text-4xl md:text-5xl mb-6 ${headingFont} text-charcoal dark:text-concrete`}>
        {TRANSLATIONS.assessment.title[lang]}
      </h3>
      <p className={`max-w-2xl mx-auto mb-10 text-slate text-lg ${bodyFont}`}>
        {isAr 
          ? 'اختبار هندسي دقيق لقياس متانة بنيانك الإنساني. لن نعطيك مجرد أرقام، بل سنصدر لك "تقرير حالة" يحدد الشروخ بدقة ويصف العلاج.' 
          : 'A precise architectural audit to measure the structural integrity of your self. We won\'t just give you numbers; we will issue a "Condition Report" identifying cracks and prescribing the cure.'}
      </p>
      <button 
        onClick={handleStart}
        className="px-10 py-4 bg-charcoal dark:bg-concrete text-white dark:text-charcoal hover:bg-bronze dark:hover:bg-bronze hover:text-white transition-all duration-300 tracking-[0.2em] uppercase text-sm font-bold shadow-lg"
      >
        {TRANSLATIONS.assessment.start[lang]}
      </button>
    </motion.div>
  );

  const renderQuestion = () => {
    const q = QUESTIONS[step - 1];
    return (
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-3xl mx-auto py-32 px-6 min-h-[60vh] flex flex-col justify-center"
      >
        <div className="mb-12 flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-bronze/50"></div>
             <span className="text-bronze text-xs tracking-widest font-mono">Q.{step < 10 ? `0${step}` : step}</span>
             <div className="h-px w-12 bg-bronze/50"></div>
        </div>
        
        <h4 className={`text-3xl md:text-5xl text-center mb-16 leading-tight ${headingFont} text-charcoal dark:text-concrete`}>
          {q.text[lang]}
        </h4>
        
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              onClick={() => handleAnswer(val)}
              className="w-14 h-14 md:w-20 md:h-20 border border-slate/20 rounded-none hover:border-bronze hover:bg-bronze hover:text-white transition-all text-xl md:text-2xl font-serif flex items-center justify-center group"
            >
              <span className="group-hover:scale-110 transition-transform">{val}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-12 px-4 md:px-12 text-xs text-slate uppercase tracking-widest">
            <span>{isAr ? 'لا أبداً' : 'Never'}</span>
            <span>{isAr ? 'دائماً' : 'Always'}</span>
        </div>
      </motion.div>
    );
  };

  const renderProcessing = () => (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-slate/20 border-t-bronze rounded-full mb-8"
          />
          <div className="text-center">
              <h4 className={`text-xl mb-2 ${headingFont}`}>{isAr ? 'جاري تحليل البيانات الإنشائية...' : 'Analyzing Structural Data...'}</h4>
              <div className="space-y-1 text-xs text-slate uppercase tracking-widest font-mono">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Checking Foundation Load...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>Scanning Emotional Beams...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Generating Renovation Plan...</motion.div>
              </div>
          </div>
      </div>
  );

  const renderResult = () => {
    const data = calculateData();
    // Identify weakest pillars (Health score < 60)
    const criticalIssues = data.filter(d => d.A < 60);

    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="py-16 px-4 max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
            <div className="inline-block border border-bronze text-bronze px-4 py-1 text-xs uppercase tracking-[0.3em] mb-4">
                {isAr ? 'تقرير رسمي' : 'Official Report'}
            </div>
            <h3 className={`text-4xl md:text-6xl mb-4 ${headingFont} text-charcoal dark:text-concrete`}>
            {TRANSLATIONS.assessment.resultTitle[lang]}
            </h3>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Visual Chart */}
            <div className="w-full lg:w-1/2 bg-white dark:bg-white/5 p-8 border border-slate/10 shadow-xl relative">
                <div className="absolute top-4 left-4 text-xs text-slate font-mono">FIG-1: INTEGRITY SCAN</div>
                <div className="h-[300px] md:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid gridType="polygon" stroke="#8C9598" strokeOpacity={0.3} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#8C9598', fontSize: 10, letterSpacing: '1px' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Structure Health"
                            dataKey="A"
                            stroke="#C5A065"
                            strokeWidth={2}
                            fill="#C5A065"
                            fillOpacity={0.4}
                        />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                    <div className="text-3xl font-bold text-charcoal dark:text-concrete font-mono">
                        {Math.round(data.reduce((acc, curr) => acc + curr.A, 0) / 4)}%
                    </div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-slate">
                        {isAr ? 'نسبة السلامة العامة' : 'Overall Integrity'}
                    </div>
                </div>
            </div>

            {/* Right: The Diagnosis & Prescription */}
            <div className="w-full lg:w-1/2">
                <div className="mb-8 pb-6 border-b border-slate/20">
                    <h4 className={`text-2xl mb-6 flex items-center gap-3 ${headingFont}`}>
                        <AlertTriangle className="text-bronze" />
                        {isAr ? 'المناطق الحرجة' : 'Critical Zones'}
                    </h4>
                    
                    {criticalIssues.length > 0 ? (
                        <div className="space-y-6">
                            {criticalIssues.map((issue) => {
                                const protocol = REPAIR_PROTOCOLS[issue.subject as AssessmentCategory];
                                return (
                                    <div key={issue.subject} className="bg-red-500/5 border-l-4 border-red-500 p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-bold text-red-500 uppercase tracking-wider text-sm">{issue.subject} ({Math.round(issue.A)}%)</h5>
                                            <span className="text-[0.6rem] bg-red-500 text-white px-2 py-1 uppercase">{isAr ? 'خطر' : 'Risk'}</span>
                                        </div>
                                        <p className={`text-sm text-slate mb-3 ${bodyFont}`}>{protocol?.prescription[lang]}</p>
                                        <div className="bg-white dark:bg-charcoal p-3 border border-slate/10 flex items-start gap-3">
                                            <Check className="text-bronze mt-1 flex-shrink-0" size={14} />
                                            <div>
                                                <span className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">{isAr ? 'بروتوكول العلاج:' : 'Repair Protocol:'}</span>
                                                <span className={`text-sm font-bold text-charcoal dark:text-concrete ${headingFont}`}>{protocol?.action[lang]}</span>
                                                <span className="text-[0.6rem] text-bronze block mt-1">{protocol?.ref}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-6 bg-green-500/10 border border-green-500/20 text-center">
                            <Shield className="mx-auto text-green-600 mb-3" />
                            <p className={`text-green-800 dark:text-green-400 ${bodyFont}`}>
                                {isAr ? 'الهيكل مستقر. استمر في الصيانة الدورية.' : 'Structure is stable. Continue routine maintenance.'}
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <h4 className={`text-xl mb-4 ${headingFont}`}>{isAr ? 'الخطوة التالية' : 'Next Step'}</h4>
                    <p className={`text-slate mb-6 ${bodyFont}`}>
                        {isAr 
                         ? 'هذا التقرير هو مجرد تشخيص. الحل الجذري يكمن في استلام "المخطط الأصلي" والبدء في التنفيذ.'
                         : 'This report is just a diagnosis. The radical solution lies in acquiring the "Master Blueprint" and starting execution.'}
                    </p>
                    <button 
                        onClick={() => setView('landing')}
                        className="w-full py-4 bg-bronze text-white uppercase tracking-[0.2em] font-bold hover:bg-charcoal transition-colors shadow-lg flex items-center justify-center gap-3"
                    >
                         {isAr ? 'استلام خطة العمل (الكتاب)' : 'Get Action Plan (The Book)'} <ArrowRight size={16} />
                    </button>
                    <div className="mt-4 text-center">
                         <button 
                            onClick={() => setStep(0)}
                            className="text-slate hover:text-bronze transition-colors underline text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
                        >
                            <RefreshCw size={12} /> {isAr ? 'إعادة الفحص' : 'Re-Audit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="min-h-[80vh] bg-white dark:bg-[#222] transition-colors duration-500 flex flex-col justify-center relative">
        <AnimatePresence mode='wait'>
            {step === 0 && renderIntro()}
            {step > 0 && step <= QUESTIONS.length && renderQuestion()}
            {isProcessing && renderProcessing()}
            {step > QUESTIONS.length && !isProcessing && renderResult()}
        </AnimatePresence>
    </section>
  );
};
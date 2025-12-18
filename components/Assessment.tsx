
import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Language, AssessmentCategory, View } from '../types';
import { TRANSLATIONS, REPAIR_PROTOCOLS } from '../constants';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, Activity, Shield, AlertTriangle, Check, RefreshCw, Layers, Gauge } from './Icons';
import { Magnetic } from './Magnetic';

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
  const [pressure, setPressure] = useState(0); // 0 to 100
  
  const containerControls = useAnimation();

  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  const handleStart = () => setStep(1);

  const handleAnswer = async (value: number) => {
    if (isProcessing) return;

    const shakeIntensity = value * 2;
    containerControls.start({
        x: [0, -shakeIntensity, shakeIntensity, -shakeIntensity, shakeIntensity, 0],
        transition: { duration: 0.3 }
    });

    const pressureIncrease = (value / 30) * 100;
    setPressure(prev => Math.min(prev + pressureIncrease, 100));

    const newAnswers = { ...answers, [QUESTIONS[step - 1].id]: value };
    setAnswers(newAnswers);
    
    await new Promise(r => setTimeout(r, 400));

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1); 
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(step + 2); 
      }, 2500);
    }
  };

  const calculateData = () => {
    const dataMap: Record<string, number> = {
      [AssessmentCategory.FOUNDATION]: 0,
      [AssessmentCategory.STRUCTURE]: 0,
      [AssessmentCategory.INTERIOR]: 0,
      [AssessmentCategory.EXTERIOR]: 0,
    };

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

    return Object.keys(dataMap).map(key => ({
      subject: key,
      A: 100 - ((dataMap[key] / maxMap[key]) * 100), 
      fullMark: 100,
      rawValue: (dataMap[key] / maxMap[key]) * 100 
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
      <Magnetic strength={0.3}>
        <button 
            onClick={handleStart}
            className="px-10 py-4 bg-charcoal dark:bg-concrete text-white dark:text-charcoal hover:bg-bronze dark:hover:bg-bronze hover:text-white transition-all duration-300 tracking-[0.2em] uppercase text-sm font-bold shadow-lg"
        >
            {TRANSLATIONS.assessment.start[lang]}
        </button>
      </Magnetic>
    </motion.div>
  );

  const PressureGauge = () => {
      const rotation = -90 + (pressure * 1.8);
      return (
          <div className="absolute top-8 right-8 w-24 h-24 hidden md:block">
              <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full border-4 border-slate/10 border-b-transparent rotate-45"></div>
                  <div className="absolute inset-2 rounded-full border border-dashed border-slate/20"></div>
                  <div 
                    className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-bronze origin-left transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-charcoal rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 w-full text-center text-[0.6rem] font-mono text-bronze uppercase tracking-widest">
                      System Load
                  </div>
              </div>
          </div>
      );
  };

  const renderQuestion = () => {
    const q = QUESTIONS[step - 1];
    return (
      <motion.div 
        key={step}
        animate={containerControls}
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto py-24 px-6 min-h-[60vh] flex flex-col justify-center relative"
      >
        <PressureGauge />
        
        <div className="mb-12 flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-bronze/50"></div>
             <span className="text-bronze text-xs tracking-widest font-mono">
                 TEST {step < 10 ? `0${step}` : step} / {QUESTIONS.length < 10 ? `0${QUESTIONS.length}` : QUESTIONS.length}
             </span>
             <div className="h-px w-12 bg-bronze/50"></div>
        </div>
        
        <h4 className={`text-3xl md:text-5xl text-center mb-16 leading-tight ${headingFont} text-charcoal dark:text-concrete`}>
          {q.text[lang]}
        </h4>
        
        <div className="grid grid-cols-5 gap-4 md:gap-8 max-w-2xl mx-auto w-full">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              onClick={() => handleAnswer(val)}
              disabled={isProcessing}
              className="group relative flex flex-col items-center gap-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="w-16 h-24 bg-white/5 border border-slate/20 rounded-sm relative overflow-hidden group-hover:border-bronze transition-colors shadow-inner">
                    <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                        <span className="w-full h-px bg-slate/10"></span>
                        <span className="w-full h-px bg-slate/10"></span>
                        <span className="w-full h-px bg-slate/10"></span>
                        <span className="w-full h-px bg-slate/10"></span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-bronze transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-mono text-slate/50 group-hover:text-white transition-colors">
                        {val}
                    </div>
                </div>
                <span className="text-[0.6rem] uppercase tracking-widest text-slate/40 group-hover:text-bronze transition-colors">
                    {val === 1 ? (isAr ? 'منعدم' : 'None') : val === 5 ? (isAr ? 'شديد' : 'Critical') : ''}
                </span>
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderProcessing = () => (
      <div className="min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan pointer-events-none"></div>
          
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5, repeat: Infinity } }}
            className="w-24 h-24 border-t-4 border-l-4 border-bronze rounded-full mb-8 relative"
          >
              <div className="absolute inset-2 border-r-4 border-b-4 border-slate/20 rounded-full"></div>
          </motion.div>
          
          <div className="text-center relative z-10 bg-darkBg/80 p-6 backdrop-blur-sm border border-white/5">
              <h4 className={`text-2xl mb-2 ${headingFont} text-white`}>{isAr ? 'جاري محاكاة الأحمال...' : 'Simulating Structural Loads...'}</h4>
          </div>
      </div>
  );

  const renderResult = () => {
    const data = calculateData();
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
            </div>

            <div className="w-full lg:w-1/2">
                <div className="mb-8 pb-6 border-b border-slate/20">
                    <h4 className={`text-2xl mb-6 flex items-center gap-3 ${headingFont}`}>
                        <AlertTriangle className="text-bronze" />
                        {isAr ? 'المناطق الحرجة' : 'Critical Zones'}
                    </h4>
                    
                    {criticalIssues.length > 0 ? (
                        <div className="space-y-6">
                            {criticalIssues.map((issue) => {
                                // Added optional chaining to prevent undefined access
                                const protocol = (REPAIR_PROTOCOLS as any)[issue.subject];
                                return (
                                    <div key={issue.subject} className="bg-red-500/5 border-l-4 border-red-500 p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-bold text-red-500 uppercase tracking-wider text-sm">{issue.subject} ({Math.round(issue.A)}%)</h5>
                                            <span className="text-[0.6rem] bg-red-500 text-white px-2 py-1 uppercase">{isAr ? 'خطر' : 'Risk'}</span>
                                        </div>
                                        <p className={`text-sm text-slate mb-3 ${bodyFont}`}>{protocol?.prescription?.[lang] || ''}</p>
                                        <div className="bg-white dark:bg-charcoal p-3 border border-slate/10 flex items-start gap-3">
                                            <Check className="text-bronze mt-1 flex-shrink-0" size={14} />
                                            <div>
                                                <span className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">{isAr ? 'بروتوكول العلاج:' : 'Repair Protocol:'}</span>
                                                <span className={`text-sm font-bold text-charcoal dark:text-concrete ${headingFont}`}>{protocol?.action?.[lang] || ''}</span>
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
            </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="min-h-[80vh] bg-white dark:bg-[#222] transition-colors duration-500 flex flex-col justify-center relative border-t border-slate/10">
        <AnimatePresence mode='wait'>
            {step === 0 && renderIntro()}
            {step > 0 && step <= QUESTIONS.length && renderQuestion()}
            {isProcessing && renderProcessing()}
            {step > QUESTIONS.length && !isProcessing && renderResult()}
        </AnimatePresence>
    </section>
  );
};

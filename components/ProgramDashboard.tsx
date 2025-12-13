
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, DayPlan, WeekPlan } from '../types';
import { THIRTY_DAY_PROGRAM, TRANSLATIONS } from '../constants';
import { Check, Lock, Play, FileText, Activity, Shield, Layers, Box, ArrowRight, X, Save, RotateCcw, PenTool, Battery, Zap, Brain, Moon } from './Icons';
import { AudioBrief } from './AudioBrief';
import { DigitalTwin } from './DigitalTwin';

interface DashboardProps {
  lang: Language;
}

export const ProgramDashboard: React.FC<DashboardProps> = ({ lang }) => {
  const [activeDay, setActiveDay] = useState<DayPlan | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]); 
  const [journalEntries, setJournalEntries] = useState<Record<number, string>>({});
  const [currentEntry, setCurrentEntry] = useState('');
  
  // DIGITAL TWIN STATE (Simulated Health Stats)
  const [twinStats, setTwinStats] = useState({
      foundation: 45, // Starts low/damaged
      structure: 60,  // Moderate stress
      energy: 30      // Low spiritual energy
  });

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  // LOAD STATE FROM LOCAL STORAGE
  useEffect(() => {
    const savedCompleted = localStorage.getItem('iham_completed_days');
    const savedJournal = localStorage.getItem('iham_journal');
    
    if (savedCompleted) {
        setCompletedDays(JSON.parse(savedCompleted));
        // Improve stats based on progress
        const completedCount = JSON.parse(savedCompleted).length;
        setTwinStats(prev => ({
            ...prev,
            foundation: Math.min(100, 45 + (completedCount * 2)),
            structure: Math.min(100, 60 + completedCount),
            energy: Math.min(100, 30 + (completedCount * 1.5))
        }));
    } else {
        setCompletedDays([1]); // Default to day 1 done mock
    }

    if (savedJournal) {
        setJournalEntries(JSON.parse(savedJournal));
    }
  }, []);

  // Sync Current Entry when opening a day
  useEffect(() => {
      if (activeDay) {
          setCurrentEntry(journalEntries[activeDay.day] || '');
      }
  }, [activeDay, journalEntries]);

  const toggleDayCompletion = (dayNum: number) => {
    let newCompleted;
    if (completedDays.includes(dayNum)) {
        newCompleted = completedDays.filter(d => d !== dayNum);
    } else {
        newCompleted = [...completedDays, dayNum];
    }
    setCompletedDays(newCompleted);
    localStorage.setItem('iham_completed_days', JSON.stringify(newCompleted));
    
    // Simulate Building Repair
    setTwinStats(prev => ({
        foundation: Math.min(100, prev.foundation + 5),
        structure: Math.min(100, prev.structure + 3),
        energy: Math.min(100, prev.energy + 3)
    }));
  };

  const saveJournalEntry = (dayNum: number) => {
      const updatedEntries = { ...journalEntries, [dayNum]: currentEntry };
      setJournalEntries(updatedEntries);
      localStorage.setItem('iham_journal', JSON.stringify(updatedEntries));
  };

  // Maintenance Actions (Simulate Interactions)
  const performMaintenance = (type: 'sleep' | 'mind' | 'spirit') => {
      setTwinStats(prev => {
          if (type === 'sleep') return { ...prev, foundation: Math.min(100, prev.foundation + 15) };
          if (type === 'mind') return { ...prev, structure: Math.min(100, prev.structure + 15) };
          if (type === 'spirit') return { ...prev, energy: Math.min(100, prev.energy + 20) };
          return prev;
      });
  };

  return (
    <div className="pt-24 min-h-screen bg-[#050505] text-alabaster pb-20">
      
      {/* 1. DIGITAL TWIN DASHBOARD (Replaces simple header) */}
      <div className="container mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/10 bg-[#111] p-1">
              
              {/* Left: The Visual Twin */}
              <div className="lg:col-span-4 relative">
                  <div className="absolute top-0 left-0 bg-bronze text-black text-[0.6rem] uppercase tracking-widest px-2 py-1 z-20 font-bold">
                      {isAr ? 'محاكاة حية' : 'LIVE TWIN'}
                  </div>
                  <DigitalTwin 
                    foundation={twinStats.foundation}
                    structure={twinStats.structure}
                    energy={twinStats.energy}
                    isAr={isAr}
                  />
              </div>

              {/* Right: Controls & Data */}
              <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                      <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
                          <div>
                              <h1 className={`text-3xl md:text-4xl mb-2 ${headingFont}`}>
                                  {isAr ? 'غرفة العمليات المركزية' : 'Central Ops Room'}
                              </h1>
                              <p className="text-slate text-sm font-mono">ID: ARCH-8821 // STATUS: {twinStats.foundation < 50 ? 'UNSTABLE' : 'STABLE'}</p>
                          </div>
                          <div className="text-right hidden md:block">
                              <div className="text-[0.6rem] uppercase tracking-widest text-slate mb-1">{isAr ? 'إنجاز المشروع' : 'Project Completion'}</div>
                              <div className="text-3xl font-bold text-bronze">{Math.round((completedDays.length / 30) * 100)}%</div>
                          </div>
                      </div>

                      {/* Maintenance Console */}
                      <div className="mb-8">
                          <span className="text-[0.6rem] uppercase tracking-widest text-slate block mb-4 flex items-center gap-2">
                              <RotateCcw size={12} /> {isAr ? 'أوامر الصيانة اليومية' : 'Daily Maintenance Orders'}
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <button 
                                onClick={() => performMaintenance('sleep')}
                                className="group bg-white/5 hover:bg-white/10 border border-white/10 p-4 flex items-center gap-4 transition-all"
                              >
                                  <div className="w-10 h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform">
                                      <Moon size={18} />
                                  </div>
                                  <div className="text-start">
                                      <span className="block text-xs font-bold text-white">{isAr ? 'ترميم الأساسات' : 'Reinforce Base'}</span>
                                      <span className="block text-[0.5rem] uppercase text-slate tracking-wider">+ SLEEP LOG</span>
                                  </div>
                              </button>

                              <button 
                                onClick={() => performMaintenance('mind')}
                                className="group bg-white/5 hover:bg-white/10 border border-white/10 p-4 flex items-center gap-4 transition-all"
                              >
                                  <div className="w-10 h-10 rounded-full bg-blue-900/20 text-blue-500 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform">
                                      <Brain size={18} />
                                  </div>
                                  <div className="text-start">
                                      <span className="block text-xs font-bold text-white">{isAr ? 'تبريد النظام' : 'Cool System'}</span>
                                      <span className="block text-[0.5rem] uppercase text-slate tracking-wider">+ MEDITATE</span>
                                  </div>
                              </button>

                              <button 
                                onClick={() => performMaintenance('spirit')}
                                className="group bg-white/5 hover:bg-white/10 border border-white/10 p-4 flex items-center gap-4 transition-all"
                              >
                                  <div className="w-10 h-10 rounded-full bg-yellow-900/20 text-yellow-500 flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform">
                                      <Zap size={18} />
                                  </div>
                                  <div className="text-start">
                                      <span className="block text-xs font-bold text-white">{isAr ? 'شحن الطاقة' : 'Power Up'}</span>
                                      <span className="block text-[0.5rem] uppercase text-slate tracking-wider">+ PURPOSE</span>
                                  </div>
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="grid grid-cols-4 gap-4 border-t border-white/10 pt-6">
                      {[
                          { label: 'Sleep', val: '6.5h' },
                          { label: 'Focus', val: '4h' },
                          { label: 'Steps', val: '8k' },
                          { label: 'Mood', val: 'Stable' }
                      ].map((stat, i) => (
                          <div key={i}>
                              <div className="text-[0.6rem] uppercase tracking-widest text-slate mb-1">{stat.label}</div>
                              <div className="text-sm font-mono text-white">{stat.val}</div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* 2. THE BLUEPRINT GRID (Weeks & Days) */}
      <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-12">
              {THIRTY_DAY_PROGRAM.map((week, wIdx) => (
                  <div key={week.id} className="relative">
                      {/* Week Connector Line */}
                      {wIdx !== THIRTY_DAY_PROGRAM.length - 1 && (
                          <div className="absolute left-[19px] top-10 bottom-[-48px] w-[2px] bg-white/5 md:left-6"></div>
                      )}

                      <div className="flex items-start gap-6 md:gap-12">
                          {/* Week Marker */}
                          <div className="flex-shrink-0 flex flex-col items-center">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-charcoal border border-white/20 rounded-full flex items-center justify-center font-bold text-slate shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 relative">
                                  {week.id}
                              </div>
                          </div>

                          <div className="flex-1">
                              <div className="mb-6 pt-2">
                                  <span className="text-xs text-slate uppercase tracking-widest">{isAr ? 'المرحلة' : 'Phase'} 0{week.id}</span>
                                  <h3 className={`text-2xl text-white ${headingFont}`}>{week.title[lang]} — <span className="text-bronze">{week.focus[lang]}</span></h3>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                  {week.days.map((day) => {
                                      const isCompleted = completedDays.includes(day.day);
                                      const isCurrent = !isCompleted && (day.day === Math.max(...completedDays) + 1);
                                      // If no days completed, unlock day 1
                                      const effectivelyLocked = completedDays.length === 0 ? day.day !== 1 : (!isCompleted && !isCurrent);
                                      const isLocked = day.isLocked && effectivelyLocked;

                                      return (
                                          <motion.button
                                              key={day.day}
                                              whileHover={!isLocked ? { scale: 1.02 } : {}}
                                              onClick={() => !isLocked && setActiveDay(day)}
                                              className={`relative text-start p-6 border transition-all h-full min-h-[160px] flex flex-col justify-between group
                                                ${isCompleted 
                                                    ? 'bg-green-900/10 border-green-900/30' 
                                                    : isCurrent 
                                                        ? 'bg-bronze/10 border-bronze shadow-[0_0_30px_rgba(197,160,101,0.1)]' 
                                                        : 'bg-white/5 border-white/5 opacity-60 cursor-not-allowed'
                                                }
                                              `}
                                          >
                                              {/* Status Icon */}
                                              <div className="flex justify-between items-start mb-4">
                                                  <span className={`text-[0.6rem] font-mono uppercase tracking-widest px-2 py-1 ${isCurrent ? 'bg-bronze text-black font-bold' : 'bg-white/10 text-slate'}`}>
                                                      DAY {day.day < 10 ? `0${day.day}` : day.day}
                                                  </span>
                                                  {isCompleted ? <Check size={16} className="text-green-500" /> : isLocked ? <Lock size={14} className="text-slate/30" /> : <Play size={14} className="text-bronze animate-pulse" />}
                                              </div>

                                              <div>
                                                  <h4 className={`text-lg mb-2 leading-tight ${headingFont} ${isCurrent ? 'text-white' : 'text-slate'}`}>
                                                      {day.title[lang]}
                                                  </h4>
                                              </div>

                                              {!isLocked && (
                                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[0.6rem] uppercase tracking-wider text-slate/50 group-hover:text-bronze transition-colors">
                                                    <FileText size={10} /> {isAr ? 'فتح الملف' : 'Open File'}
                                                </div>
                                              )}
                                          </motion.button>
                                      )
                                  })}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 3. DAY DETAIL MODAL (The Job Card) */}
      <AnimatePresence>
          {activeDay && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex justify-end"
                onClick={() => setActiveDay(null)}
              >
                  <motion.div 
                    initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="w-full md:w-2/3 lg:w-1/2 h-full bg-[#151515] border-l border-bronze/30 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                      {/* Header */}
                      <div className="sticky top-0 bg-[#151515]/95 backdrop-blur-xl border-b border-white/10 p-8 flex justify-between items-start z-10">
                          <div>
                              <span className="text-bronze text-xs uppercase tracking-[0.3em] mb-2 block">
                                  {isAr ? 'أمر عمل: يوم' : 'Work Order: Day'} {activeDay.day}
                              </span>
                              <h2 className={`text-3xl md:text-4xl text-white ${headingFont}`}>{activeDay.title[lang]}</h2>
                          </div>
                          <button onClick={() => setActiveDay(null)} className="text-slate hover:text-white p-2">
                              <X size={24} />
                          </button>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-12 space-y-12">
                          
                          {/* NEW: AUDIO PLAYER */}
                          <div>
                              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-slate">
                                  <Activity size={14} className="text-bronze" /> {isAr ? 'الإحاطة الصوتية' : 'Audio Briefing'}
                              </div>
                              <AudioBrief title={isAr ? `توجيهات اليوم ${activeDay.day}` : `Day ${activeDay.day} Briefing`} />
                          </div>

                          {/* Section 1: The Concept */}
                          <div>
                              <h3 className={`text-xl text-white mb-4 flex items-center gap-3 ${headingFont}`}>
                                  <Layers size={20} className="text-bronze" />
                                  {isAr ? 'النظرية الهندسية' : 'Engineering Theory'}
                              </h3>
                              <div className="bg-white/5 border-l-2 border-white/20 p-6 text-slate leading-loose text-lg">
                                  {isAr ? 'النص النظري لهذا اليوم سيظهر هنا...' : 'The theoretical content for this day goes here. Explaining the architectural principle behind the task.'}
                              </div>
                          </div>

                          {/* Section 2: Visual Concept */}
                          {activeDay.visualConcept && (
                              <div className="bg-[#0a0a0a] border border-white/10 p-8 text-center relative overflow-hidden group">
                                  <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
                                  <Box size={40} className="mx-auto text-slate mb-4 group-hover:text-bronze transition-colors" strokeWidth={1} />
                                  <span className="text-[0.6rem] uppercase tracking-widest text-slate mb-2 block">{isAr ? 'المفهوم البصري' : 'Visual Concept'}</span>
                                  <h4 className={`text-2xl text-white ${headingFont}`}>{activeDay.visualConcept[lang]}</h4>
                              </div>
                          )}

                          {/* Section 3: The Protocol (Task) */}
                          <div>
                              <h3 className={`text-xl text-white mb-6 flex items-center gap-3 ${headingFont}`}>
                                  <Shield size={20} className="text-bronze" />
                                  {isAr ? 'بروتوكول التنفيذ' : 'Execution Protocol'}
                              </h3>
                              
                              <div className="bg-bronze/10 border border-bronze/30 p-8 mb-8">
                                  <p className={`text-xl text-white ${bodyFont} leading-relaxed`}>
                                      {activeDay.task[lang]}
                                  </p>
                              </div>

                              {/* NEW: SITE LOG INPUT (The Workbook) */}
                              <div className="bg-[#0a0a0a] border border-white/10 p-6 relative group focus-within:border-bronze transition-colors">
                                  <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100">
                                      <PenTool size={16} className="text-slate" />
                                  </div>
                                  <label className="text-[0.6rem] uppercase tracking-widest text-bronze block mb-4">
                                      {isAr ? 'تقرير الموقع (ملاحظاتك)' : 'Site Report (Your Log)'}
                                  </label>
                                  <textarea 
                                    value={currentEntry}
                                    onChange={(e) => setCurrentEntry(e.target.value)}
                                    placeholder={isAr ? "سجل ملاحظاتك حول تنفيذ مهمة اليوم..." : "Log your observations regarding today's execution..."}
                                    className="w-full bg-transparent text-slate text-sm font-mono focus:outline-none min-h-[150px] resize-none"
                                  ></textarea>
                                  <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                                      <span className="text-[0.5rem] text-slate/40 uppercase tracking-widest">
                                          {currentEntry.length > 0 ? (isAr ? 'جاري التسجيل...' : 'Recording...') : (isAr ? 'بانتظار الإدخال' : 'Awaiting Input')}
                                      </span>
                                      <button 
                                        onClick={() => saveJournalEntry(activeDay.day)}
                                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-bronze transition-colors"
                                      >
                                          <Save size={14} /> {isAr ? 'حفظ في السجل' : 'Save to Log'}
                                      </button>
                                  </div>
                              </div>
                          </div>

                          {/* Final Action Button */}
                          <div className="sticky bottom-0 bg-[#151515] pt-4 pb-8 border-t border-white/10">
                            <button 
                                onClick={() => { toggleDayCompletion(activeDay.day); setActiveDay(null); }}
                                className={`w-full py-5 text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg
                                    ${completedDays.includes(activeDay.day) 
                                        ? 'bg-green-600 text-white hover:bg-green-700' 
                                        : 'bg-bronze text-black hover:bg-white'
                                    }
                                `}
                            >
                                {completedDays.includes(activeDay.day) 
                                    ? (isAr ? 'تم تنفيذ الأمر' : 'PROTOCOL EXECUTED') 
                                    : (isAr ? 'تأكيد التنفيذ' : 'MARK COMPLETE')
                                }
                                {completedDays.includes(activeDay.day) ? <Check size={18} /> : <ArrowRight size={18} />}
                            </button>
                          </div>

                      </div>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>

    </div>
  );
};

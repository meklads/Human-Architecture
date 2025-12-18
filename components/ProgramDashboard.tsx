
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, UserProfile, SiteLogEntry } from '../types';
import { Check, Lock, ArrowRight, Shield, Award, Activity, MessageCircle, Send, Clock, Calendar, Target, Zap, BookOpen } from './Icons';
import { THIRTY_DAY_PROGRAM } from '../constants';

interface ProgramDashboardProps {
  lang: Language;
  currentUser: UserProfile | null;
}

// --- RANK LOGIC ---
const calculateRank = (completedCount: number) => {
    if (completedCount >= 24) return { title: { ar: 'أسطورة', en: 'Legend', fr: 'Légende' }, color: '#FFD700', icon: '👑' }; 
    if (completedCount >= 16) return { title: { ar: 'كبير البنائين', en: 'Master Builder', fr: 'Maître Bâtisseur' }, color: '#C0C0C0', icon: '🏗️' }; 
    if (completedCount >= 8) return { title: { ar: 'مهندس', en: 'Architect', fr: 'Architecte' }, color: '#C5A065', icon: '📐' }; 
    return { title: { ar: 'بناء', en: 'Builder', fr: 'Bâtisseur' }, color: '#4da6ff', icon: '🔨' }; 
};

export const ProgramDashboard: React.FC<ProgramDashboardProps> = ({ lang, currentUser }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [feed, setFeed] = useState<SiteLogEntry[]>([]);
  const [newLogContent, setNewLogContent] = useState('');
  const [activeDay, setActiveDay] = useState<number>(1);
  
  const totalDays = 30;
  
  useEffect(() => {
      // 1. Load Progress Safely
      const savedProgress = localStorage.getItem('iham_progress');
      if (savedProgress) {
          try {
              const parsed = JSON.parse(savedProgress);
              if (Array.isArray(parsed)) {
                  const numericProgress = parsed.map(n => Number(n)).filter(n => !isNaN(n));
                  setCompletedDays(numericProgress);
                  const maxCompleted = numericProgress.length > 0 ? Math.max(...numericProgress) : 0;
                  setActiveDay(Math.min(maxCompleted + 1, totalDays));
              }
          } catch (e) {
              console.error("Failed to parse progress log", e);
          }
      }

      // 2. Load Local Feed Safely
      const savedFeed = localStorage.getItem('iham_site_logs');
      if (savedFeed) {
          try {
              const parsedFeed = JSON.parse(savedFeed);
              if (Array.isArray(parsedFeed)) setFeed(parsedFeed);
          } catch (e) {
              console.error("Failed to parse site logs", e);
          }
      } else {
          setFeed([
              { id: '1', author: 'Sarah A.', authorChar: 'S', dayNumber: 7, content: 'Finally completed the Foundation week. Sleeping better already.', timestamp: '2h ago', likes: 5 },
              { id: '2', author: 'Karim M.', authorChar: 'K', dayNumber: 3, content: 'Struggling with the digital detox task, but pushing through.', timestamp: '5h ago', likes: 2 }
          ]);
      }
  }, []);

  const completedCount = completedDays.length;
  const progressPercentage = Math.round((completedCount / totalDays) * 100);
  const rankInfo = calculateRank(completedCount);

  const getTaskForDay = (dayNum: number) => {
      if (THIRTY_DAY_PROGRAM && Array.isArray(THIRTY_DAY_PROGRAM)) {
          for (const week of THIRTY_DAY_PROGRAM) {
              if (week && week.days && Array.isArray(week.days)) {
                const found = week.days.find(d => d.day === dayNum);
                if (found) return found;
              }
          }
      }
      return { 
        title: { ar: 'يوم راحة', en: 'Rest Day', fr: 'Jour de Repos' }, 
        task: { ar: 'استرح وراجع ما سبق.', en: 'Rest and review.', fr: 'Reposez-vous et révisez.' }, 
        bookPageRef: 0 
      };
  };

  const activeTaskData = getTaskForDay(activeDay);

  const handleDayClick = (day: number) => {
      if (day > activeDay) return; 
      if (day === activeDay && !completedDays.includes(day)) {
          handleCompleteDay(day);
      }
  };

  const handleCompleteDay = (day: number) => {
      if (!completedDays.includes(day)) {
          const newCompleted = [...completedDays, day];
          setCompletedDays(newCompleted);
          localStorage.setItem('iham_progress', JSON.stringify(newCompleted));
          const nextDay = Math.min(day + 1, totalDays);
          setActiveDay(nextDay);
      }
  };

  const handlePostLog = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLogContent.trim() || !currentUser) return;

      const newPost: SiteLogEntry = {
          id: Date.now().toString(),
          author: currentUser.name || "Architect",
          authorAvatar: currentUser.avatarImage,
          authorChar: currentUser.avatarChar || (currentUser.name ? currentUser.name[0].toUpperCase() : "A"),
          dayNumber: activeDay, 
          content: newLogContent,
          timestamp: isAr ? 'الآن' : 'Just now',
          likes: 0
      };

      const updatedFeed = [newPost, ...feed];
      setFeed(updatedFeed);
      setNewLogContent('');
      localStorage.setItem('iham_site_logs', JSON.stringify(updatedFeed));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-[#f4f6f8] dark:bg-[#050505] text-charcoal dark:text-concrete pb-20 flex justify-center"
    >
      <div className="w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-blueprint text-white rounded-xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-start">
                    <div className="w-24 h-24 bg-bronze text-white rounded-full flex items-center justify-center text-4xl font-serif border-4 border-white/20 shadow-lg overflow-hidden relative">
                        {currentUser?.avatarImage ? (
                            <img src={currentUser.avatarImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            currentUser?.avatarChar || (currentUser?.name ? currentUser.name[0].toUpperCase() : 'A')
                        )}
                        <div className="absolute bottom-0 right-0 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-bronze">
                           {rankInfo.icon}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${headingFont}`}>
                            {currentUser?.name || (isAr ? 'المهندس المعماري' : 'Architect')}
                        </h1>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center">
                            <span 
                                className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold border"
                                style={{ 
                                    backgroundColor: `${rankInfo.color}20`,
                                    borderColor: rankInfo.color,
                                    color: rankInfo.color 
                                }}
                            >
                                {rankInfo.title?.[lang] || rankInfo.title?.['en'] || 'Builder'}
                            </span>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs uppercase tracking-widest text-slate-300">
                                {isAr ? `المرحلة الحالية: يوم ${activeDay}` : `Current Phase: Day ${activeDay}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#111] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/5">
                <div className="flex justify-between mb-3 font-bold text-blueprint dark:text-blue-300 text-sm uppercase tracking-wider">
                    <span>{isAr ? 'نسبة الإنجاز' : 'Completion Rate'}</span>
                    <span>{progressPercentage}% ({completedCount}/{totalDays})</span>
                </div>
                <div className="h-4 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-bronze relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-scan opacity-50"></div>
                    </motion.div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-xl border border-bronze/30 shadow-lg overflow-hidden relative group">
                <div className="bg-bronze/10 border-b border-bronze/20 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-bronze font-bold uppercase tracking-widest text-xs">
                        <Target size={16} />
                        {isAr ? 'أمر العمل اليومي' : 'DAILY WORK ORDER'}
                    </div>
                    <div className="bg-bronze text-white text-xs font-mono px-2 py-0.5 rounded-sm">
                        DAY {activeDay < 10 ? `0${activeDay}` : activeDay}
                    </div>
                </div>
                
                <div className="p-8">
                    <h2 className={`text-3xl mb-4 ${headingFont} text-charcoal dark:text-white`}>
                        {activeTaskData.title?.[lang] || activeTaskData.title?.['en'] || ''}
                    </h2>
                    <p className={`text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 ${bodyFont}`}>
                        {activeTaskData.task?.[lang] || activeTaskData.task?.['en'] || ''}
                    </p>
                    
                    {activeTaskData.bookPageRef ? (
                        <div className="mb-8 inline-flex items-center gap-3 bg-alabaster dark:bg-white/5 px-4 py-2 rounded border border-slate/20">
                            <BookOpen size={16} className="text-bronze" />
                            <span className="text-xs uppercase tracking-widest text-slate">
                                {isAr ? `المرجع: الكتاب صفحة ${activeTaskData.bookPageRef}` : `Ref: Book Page ${activeTaskData.bookPageRef}`}
                            </span>
                        </div>
                    ) : null}
                    
                    <div className="mt-2">
                        {!completedDays.includes(activeDay) ? (
                            <button 
                                onClick={() => handleCompleteDay(activeDay)}
                                className="w-full md:w-auto px-8 py-4 bg-charcoal dark:bg-blueprint text-white text-sm uppercase tracking-[0.2em] font-bold hover:bg-bronze transition-colors shadow-lg flex items-center justify-center gap-3"
                            >
                                <Zap size={18} fill="currentColor" />
                                {isAr ? 'إتمام المهمة & فتح اليوم التالي' : 'COMPLETE & UNLOCK NEXT DAY'}
                            </button>
                        ) : (
                            <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-600 flex items-center gap-3 rounded-lg">
                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center"><Check size={16} /></div>
                                <div>
                                    <span className="block font-bold uppercase text-xs tracking-widest">{isAr ? 'تم الإنجاز' : 'MISSION ACCOMPLISHED'}</span>
                                    <span className="text-xs opacity-80">{isAr ? 'جاري تحميل بروتوكول اليوم التالي...' : 'Next day protocol loading...'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h3 className={`text-xl text-blueprint dark:text-blue-300 mb-6 border-b-2 border-bronze inline-block pb-2 ${headingFont}`}>
                    {isAr ? 'سجل الإنجاز' : 'Construction Log'}
                </h3>
                <div className="grid grid-cols-5 md:grid-cols-6 gap-3">
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                        const isCompleted = completedDays.includes(day);
                        const isCurrent = day === activeDay;
                        const isLocked = day > activeDay;
                        
                        return (
                            <motion.div
                                key={day}
                                whileHover={!isLocked ? { scale: 1.05 } : {}}
                                onClick={() => handleDayClick(day)}
                                className={`
                                    aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-bold cursor-pointer transition-all border
                                    ${isCompleted 
                                        ? 'bg-blueprint text-white border-blueprint shadow-md' 
                                        : isCurrent 
                                            ? 'bg-amber-50 dark:bg-bronze/10 text-blueprint dark:text-bronze border-bronze border-2 shadow-lg scale-105' 
                                            : 'bg-white dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10'
                                    }
                                    ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <span>{day}</span>
                                <span className="text-[0.6rem] mt-1">
                                    {isCompleted && <Check size={10} />}
                                    {isLocked && <Lock size={10} />}
                                    {isCurrent && <Activity size={10} className="animate-pulse" />}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

          </div>

          <div className="lg:col-span-1">
             <div className="sticky top-24">
                 <div className="bg-[#003366] text-white p-4 rounded-t-xl flex justify-between items-center">
                     <h3 className={`text-lg font-bold ${headingFont}`}>
                         {isAr ? 'سجل الموقع اليومي' : 'Daily Site Log'}
                     </h3>
                     <Activity size={18} className="text-bronze animate-pulse" />
                 </div>

                 <div className="bg-white dark:bg-[#1a1a1a] p-4 border-x border-b border-slate/20 dark:border-white/10 mb-4">
                     <form onSubmit={handlePostLog}>
                         <div className="flex gap-3 mb-3">
                             <div className="w-8 h-8 bg-bronze rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 overflow-hidden">
                                {currentUser?.avatarImage ? <img src={currentUser.avatarImage} className="w-full h-full object-cover" alt="avatar"/> : (currentUser?.avatarChar || (currentUser?.name ? currentUser.name[0].toUpperCase() : 'ME'))}
                             </div>
                             <textarea 
                                value={newLogContent}
                                onChange={(e) => setNewLogContent(e.target.value)}
                                maxLength={280}
                                placeholder={isAr ? `وثّق إنجاز اليوم ${activeDay}...` : `Log progress for Day ${activeDay}...`}
                                className="w-full bg-transparent text-sm resize-none outline-none text-charcoal dark:text-concrete placeholder-slate/40 h-20"
                             />
                         </div>
                         <div className="flex justify-between items-center pt-2 border-t border-slate/10">
                             <span className="text-[0.6rem] text-slate/50">{newLogContent.length}/280</span>
                             <button 
                                type="submit"
                                disabled={!newLogContent.trim()}
                                className="bg-[#C5A065] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#b08d55] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                             >
                                 {isAr ? 'مشاركة' : 'Share'} <Send size={12} />
                             </button>
                         </div>
                     </form>
                 </div>

                 <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                     <AnimatePresence>
                         {feed.map((post) => (
                             <motion.div 
                                key={post.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-[#151515] p-4 rounded-lg shadow-sm border border-slate/10 relative overflow-hidden"
                             >
                                 <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#003366] to-[#C5A065]"></div>
                                 <div className="pl-3">
                                     <div className="flex justify-between items-start mb-2">
                                         <div className="flex items-center gap-2">
                                             <div className="w-6 h-6 bg-slate-200 dark:bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-charcoal dark:text-white overflow-hidden">
                                                 {post.authorAvatar ? <img src={post.authorAvatar} className="w-full h-full object-cover" alt="author"/> : (post.authorChar || "A")}
                                             </div>
                                             <span className={`text-sm font-bold text-[#003366] dark:text-blue-300 ${headingFont}`}>{post.author}</span>
                                         </div>
                                         <span className="text-[0.6rem] text-slate/50 flex items-center gap-1">
                                             <Clock size={10} /> {post.timestamp}
                                         </span>
                                     </div>
                                     <div className="mb-2">
                                         <span className="inline-block bg-[#C5A065]/10 text-[#C5A065] text-[0.6rem] px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold mb-1">
                                             Day {post.dayNumber}
                                         </span>
                                         <p className={`text-sm text-charcoal dark:text-concrete leading-relaxed ${bodyFont}`}>
                                             {post.content}
                                         </p>
                                     </div>
                                 </div>
                             </motion.div>
                         ))}
                     </AnimatePresence>
                     {feed.length === 0 && (
                         <div className="text-center py-8 text-slate/40 text-xs">
                             {isAr ? 'كن أول من يوثق إنجازه اليوم.' : 'Be the first to log progress today.'}
                         </div>
                     )}
                 </div>
             </div>
          </div>
      </div>
    </motion.div>
  );
};

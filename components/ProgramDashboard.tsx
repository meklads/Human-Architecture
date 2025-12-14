
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, UserProfile, SiteLogEntry } from '../types';
import { Check, Lock, Play, ArrowRight, Shield, Award, Activity, MessageCircle, Send, Clock, Calendar } from './Icons';

interface ProgramDashboardProps {
  lang: Language;
  currentUser: UserProfile | null;
}

// --- RANK LOGIC ---
const calculateRank = (completedCount: number) => {
    if (completedCount >= 24) return { title: { ar: 'أسطورة', en: 'Legend' }, color: '#FFD700', icon: '👑' }; // Gold
    if (completedCount >= 16) return { title: { ar: 'كبير البنائين', en: 'Master Builder' }, color: '#C0C0C0', icon: '🏗️' }; // Silver
    if (completedCount >= 8) return { title: { ar: 'مهندس', en: 'Architect' }, color: '#C5A065', icon: '📐' }; // Bronze
    return { title: { ar: 'بناء', en: 'Builder' }, color: '#4da6ff', icon: '🔨' }; // Blue
};

export const ProgramDashboard: React.FC<ProgramDashboardProps> = ({ lang, currentUser }) => {
  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';

  // --- STATE ---
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [feed, setFeed] = useState<SiteLogEntry[]>([]);
  const [newLogContent, setNewLogContent] = useState('');
  
  const totalDays = 30;
  
  // Load Data
  useEffect(() => {
      // 1. Load Progress
      const savedProgress = localStorage.getItem('iham_progress');
      if (savedProgress) {
          setCompletedDays(JSON.parse(savedProgress));
      } else {
          setCompletedDays([]); 
      }

      // 2. Load Local Feed (Simulation of Database)
      const savedFeed = localStorage.getItem('iham_site_logs');
      if (savedFeed) {
          setFeed(JSON.parse(savedFeed));
      } else {
          // Dummy Initial Data
          setFeed([
              { id: '1', author: 'Sarah A.', authorChar: 'S', dayNumber: 7, content: 'Finally completed the Foundation week. Sleeping better already.', timestamp: '2h ago', likes: 5 },
              { id: '2', author: 'Karim M.', authorChar: 'K', dayNumber: 3, content: 'Struggling with the digital detox task, but pushing through.', timestamp: '5h ago', likes: 2 }
          ]);
      }
  }, []);

  // Calculate Progress & Rank
  const completedCount = completedDays.length;
  const progressPercentage = Math.round((completedCount / totalDays) * 100);
  // Current day is the first uncompleted day (e.g. if 1,2 done, current is 3)
  // BUT: user can replay old days. The "Active" day is max completed + 1.
  const currentDay = completedCount + 1;
  const rankInfo = calculateRank(completedCount);

  // --- HANDLERS ---

  const handleDayClick = (day: number) => {
      // Logic: Can only toggle completion if it's the current day (to unlock) or previous days (to toggle off/on)
      // We want to force sequential progress? Or allow jumping?
      // Strict Mode: Can only complete `currentDay`.
      if (day > currentDay) return; // Locked

      let newCompleted;
      if (completedDays.includes(day)) {
          // Uncheck (only if it's the last completed day to maintain sequence, strictly speaking, but flexible for now)
          newCompleted = completedDays.filter(d => d !== day);
      } else {
          // Check
          newCompleted = [...completedDays, day];
      }
      
      // Update State & LocalStorage
      setCompletedDays(newCompleted);
      localStorage.setItem('iham_progress', JSON.stringify(newCompleted));
  };

  const handleCompleteToday = () => {
      if (!completedDays.includes(currentDay)) {
          const newCompleted = [...completedDays, currentDay];
          setCompletedDays(newCompleted);
          localStorage.setItem('iham_progress', JSON.stringify(newCompleted));
          
          // Optional: Trigger celebration animation here
      }
  };

  const handlePostLog = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLogContent.trim() || !currentUser) return;

      const newPost: SiteLogEntry = {
          id: Date.now().toString(),
          author: currentUser.name,
          authorAvatar: currentUser.avatarImage,
          authorChar: currentUser.avatarChar,
          dayNumber: currentDay, // Stamped with their current progress
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
          
          {/* --- LEFT COLUMN: DASHBOARD MAIN --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. HEADER CARD (Dynamic Rank) */}
            <div className="bg-blueprint text-white rounded-xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-start">
                    
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-bronze text-white rounded-full flex items-center justify-center text-4xl font-serif border-4 border-white/20 shadow-lg overflow-hidden relative">
                        {currentUser?.avatarImage ? (
                            <img src={currentUser.avatarImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            currentUser?.avatarChar || 'A'
                        )}
                        {/* Rank Icon Overlay */}
                        <div className="absolute bottom-0 right-0 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-bronze" title={rankInfo.title[lang]}>
                           {rankInfo.icon}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${headingFont}`}>
                            {currentUser ? currentUser.name : (isAr ? 'المهندس المعماري' : 'Architect')}
                        </h1>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center">
                            {/* DYNAMIC RANK BADGE */}
                            <span 
                                className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold border"
                                style={{ 
                                    backgroundColor: `${rankInfo.color}20`, // 20% opacity
                                    borderColor: rankInfo.color,
                                    color: rankInfo.color 
                                }}
                            >
                                {rankInfo.title[lang]}
                            </span>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs uppercase tracking-widest text-slate-300">
                                {isAr ? `يوم ${currentDay}` : `Day ${currentDay}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. PROGRESS BAR */}
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

            {/* 3. CTA BUTTON (Complete Today) */}
            <div className="text-center bg-white dark:bg-[#111] p-8 rounded-xl border border-dashed border-slate-300 dark:border-white/10">
                <span className="block text-bronze font-bold uppercase tracking-[0.2em] text-xs mb-4">
                    {isAr ? `المهمة الحالية: يوم ${currentDay}` : `Current Task: Day ${currentDay}`}
                </span>
                
                {!completedDays.includes(currentDay) ? (
                    <button 
                        onClick={handleCompleteToday}
                        className="inline-flex items-center gap-3 bg-blueprint text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-900 transition-all shadow-lg hover:shadow-blue-900/30 transform hover:-translate-y-1"
                    >
                        <Check size={20} />
                        {isAr ? 'إكمال مهمة اليوم' : 'Complete Daily Protocol'}
                    </button>
                ) : (
                    <div className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg cursor-default">
                         <Check size={20} />
                         {isAr ? 'تم الإنجاز! اليوم التالي متاح' : 'Done! Next Day Unlocked'}
                    </div>
                )}
            </div>

            {/* 4. DAYS GRID */}
            <div>
                <h3 className={`text-xl text-blueprint dark:text-blue-300 mb-6 border-b-2 border-bronze inline-block pb-2 ${headingFont}`}>
                    {isAr ? 'سجل الإنجاز' : 'Construction Log'}
                </h3>
                <div className="grid grid-cols-5 md:grid-cols-6 gap-3">
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                        const isCompleted = completedDays.includes(day);
                        const isCurrent = day === currentDay;
                        const isLocked = day > currentDay;
                        
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

          {/* --- RIGHT COLUMN: SITE LOG FEED --- */}
          <div className="lg:col-span-1">
             <div className="sticky top-24">
                 
                 {/* FEED HEADER */}
                 <div className="bg-[#003366] text-white p-4 rounded-t-xl flex justify-between items-center">
                     <h3 className={`text-lg font-bold ${headingFont}`}>
                         {isAr ? 'سجل الموقع اليومي' : 'Daily Site Log'}
                     </h3>
                     <Activity size={18} className="text-bronze animate-pulse" />
                 </div>

                 {/* FEED INPUT */}
                 <div className="bg-white dark:bg-[#1a1a1a] p-4 border-x border-b border-slate/20 dark:border-white/10 mb-4">
                     <form onSubmit={handlePostLog}>
                         <div className="flex gap-3 mb-3">
                             <div className="w-8 h-8 bg-bronze rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 overflow-hidden">
                                {currentUser?.avatarImage ? <img src={currentUser.avatarImage} className="w-full h-full object-cover"/> : (currentUser?.avatarChar || 'ME')}
                             </div>
                             <textarea 
                                value={newLogContent}
                                onChange={(e) => setNewLogContent(e.target.value)}
                                maxLength={280}
                                placeholder={isAr ? `وثّق إنجاز اليوم ${currentDay}...` : `Log progress for Day ${currentDay}...`}
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

                 {/* FEED LIST */}
                 <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                     <AnimatePresence>
                         {feed.map((post) => (
                             <motion.div 
                                key={post.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-[#151515] p-4 rounded-lg shadow-sm border border-slate/10 relative overflow-hidden"
                             >
                                 {/* Left Colored Line based on day? Or just bronze */}
                                 <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#003366] to-[#C5A065]"></div>
                                 
                                 <div className="pl-3">
                                     <div className="flex justify-between items-start mb-2">
                                         <div className="flex items-center gap-2">
                                             <div className="w-6 h-6 bg-slate-200 dark:bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-charcoal dark:text-white overflow-hidden">
                                                 {post.authorAvatar ? <img src={post.authorAvatar} className="w-full h-full object-cover"/> : post.authorChar}
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

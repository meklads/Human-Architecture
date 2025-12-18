
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, CommunityPost, View, UserProfile } from '../types';
import { COMMUNITY_POSTS, TRANSLATIONS } from '../constants';
import { Plus, X, Users, Activity, Award, ArrowRight, Zap, Loader2, Send, Filter, Grid } from './Icons';

interface CommunityPageProps {
  lang: Language;
  setView: (view: View) => void;
  currentUser: UserProfile | null;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ lang, setView, currentUser }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [activeTab, setActiveTab] = useState<'log' | 'sos'>('log'); 
  const [user, setUser] = useState<UserProfile | null>(currentUser);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  useEffect(() => { setUser(currentUser); }, [currentUser]);

  // Modals
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  
  // New Post Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-sans';
  
  // Robust translation selector to prevent "Uncaught TypeError: Cannot read properties of undefined (reading 'ar')"
  const getTxt = useCallback((obj: any): string => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      // Added safety check for the language property
      return obj[lang] || obj['en'] || obj['ar'] || '';
  }, [lang]);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));

  const LiveTicker = () => {
      const messages = isAr 
        ? ['تم ترميم أساس جديد بواسطة أحمد', 'سارة حصلت على رتبة مهندس أول', 'تم اكتشاف تسريب طاقة في القطاع B', 'مشروع جديد قيد الإنشاء: الوعي الذاتي']
        : ['New foundation repaired by Ahmed', 'Sarah promoted to Senior Architect', 'Energy leak detected in Sector B', 'New project under construction: Self-Awareness'];
      const [idx, setIdx] = useState(0);
      useEffect(() => {
          const interval = setInterval(() => { setIdx(prev => (prev + 1) % messages.length); }, 4500);
          return () => clearInterval(interval);
      }, [messages.length]);
      return (
          <div className="bg-bronze text-white text-[0.6rem] uppercase tracking-widest py-1.5 px-4 flex items-center gap-4 overflow-hidden">
              <span className="flex-shrink-0 font-bold flex items-center gap-1.5"><Activity size={10} /> {isAr ? 'نشاط الموقع' : 'SITE ACTIVITY'}:</span>
              <AnimatePresence mode='wait'>
                  <motion.span 
                    key={idx} 
                    initial={{ y: 10, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    exit={{ y: -10, opacity: 0 }}
                    className="truncate"
                  >
                    {messages[idx]}
                  </motion.span>
              </AnimatePresence>
          </div>
      );
  };

  const SidebarStats = () => (
    <div className="space-y-4">
        {/* Guild Stats */}
        <div className="bg-[#111] border border-white/5 p-5 rounded-sm">
            <div className="flex justify-between items-center mb-3 text-slate">
                <span className="text-[0.6rem] uppercase tracking-widest">{isAr ? 'إحصائيات النقابة' : 'GUILD STATS'}</span>
                <Users size={12} className="text-bronze" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="block text-xl font-bold text-white font-mono">1,242</span>
                    <span className="text-[0.5rem] text-slate uppercase">{isAr ? 'بناء نشط' : 'Active Builders'}</span>
                </div>
                <div>
                    <span className="block text-xl font-bold text-white font-mono">4.8k</span>
                    <span className="text-[0.5rem] text-slate uppercase">{isAr ? 'تم الترميم' : 'Restored'}</span>
                </div>
            </div>
        </div>

        {/* Global Health */}
        <div className="bg-[#111] border border-white/5 p-5 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-bronze/5 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
                <span className="text-[0.6rem] text-slate uppercase tracking-widest block mb-2">{isAr ? 'سلامة الهيكل العامة' : 'GLOBAL STRUCTURAL HEALTH'}</span>
                <div className="flex items-end gap-2 mb-1">
                    <span className="text-2xl font-bold text-bronze font-mono">82%</span>
                    <Activity size={14} className="text-bronze mb-1 animate-pulse" />
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-bronze w-[82%]"></div>
                </div>
            </div>
        </div>

        {/* Trending Projects Widget */}
        <div className="bg-[#111] border border-white/5 p-5 rounded-sm">
            <span className="text-[0.6rem] text-slate uppercase tracking-widest block mb-4">{isAr ? 'مشاريع رائجة' : 'TRENDING BLUEPRINTS'}</span>
            <div className="space-y-3">
                {[
                  { title: isAr ? 'نظام عزل الضوضاء الرقمية' : 'Digital Noise Isolation', meta: 'SEC-A' },
                  { title: isAr ? 'تدعيم خرسانة النوم' : 'Sleep Concrete Reinf.', meta: 'SEC-B' }
                ].map((proj, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-xs text-white group-hover:text-bronze transition-colors">{proj.title}</span>
                            <span className="text-[0.5rem] text-slate uppercase font-mono">{proj.meta}</span>
                        </div>
                        <ArrowRight size={10} className="text-slate group-hover:text-white" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const handleSubmitPost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;
      setIsSubmitting(true);
      
      setTimeout(() => {
          const newPost: CommunityPost = {
              id: `cp-${Date.now()}`,
              author: user.name,
              role: user.rank,
              rankLevel: user.level,
              phase: 'Foundation',
              title: newPostTitle,
              content: newPostContent,
              endorsements: 0,
              reviews: [],
              tags: [newPostCategory],
              timestamp: isAr ? 'الآن' : 'Just now',
              type: 'standard',
              status: 'approved'
          };
          setPosts([newPost, ...posts]);
          setIsSubmitting(false);
          setShowPostModal(false);
          setNewPostTitle('');
          setNewPostContent('');
      }, 1000);
  };

  const filteredPosts = posts.filter(p => {
      if (activeTab === 'sos' && p.type !== 'emergency') return false;
      if (activeTab === 'log' && p.type === 'emergency') return false;
      if (activeTag && !(p.tags || []).includes(activeTag)) return false;
      return true;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20 min-h-screen bg-[#050505] text-concrete">
      {/* Community Subheader */}
      <div className="border-b border-white/5 bg-[#0a0a0a] sticky top-20 z-40 backdrop-blur-md">
          <LiveTicker />
          <div className="container mx-auto px-6 py-2.5 flex justify-between items-center text-[0.6rem] uppercase tracking-[0.2em] text-slate font-mono">
              <span className="flex items-center gap-2"><Zap size={10} className="text-bronze" /> SECURE_CONN: ESTABLISHED</span>
              <span className="hidden md:block">ENCRYPTION: 256-BIT • HUB: BUILDERS_GUILD</span>
          </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-[1400px] mx-auto">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
             <div className="lg:sticky lg:top-40 space-y-8">
                {/* User Status */}
                <div className="bg-[#111] border border-white/5 p-8 text-center relative group">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bronze/30"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bronze/30"></div>
                    {user ? (
                        <>
                            <div className="w-24 h-24 bg-bronze text-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-serif shadow-2xl relative overflow-hidden">
                                {user.avatarChar}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                            <h3 className={`text-xl font-bold text-white mb-1 ${headingFont}`}>{user.name}</h3>
                            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bronze font-mono">{user.rank}</span>
                            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-2">
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-white">DAY {user.level}</span>
                                    <span className="text-[0.5rem] text-slate uppercase">{isAr ? 'المستوى' : 'Level'}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-white">{user.xp}</span>
                                    <span className="text-[0.5rem] text-slate uppercase">XP</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-4">
                            <span className="text-slate text-xs uppercase tracking-widest block mb-4">{isAr ? 'عضوية غير مفعلة' : 'UNAUTHORIZED ACCESS'}</span>
                            <button onClick={() => setView('register')} className="w-full py-3 bg-bronze text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors">
                                {isAr ? 'تفعيل الهوية' : 'ACTIVATE ID'}
                            </button>
                        </div>
                    )}
                </div>

                <SidebarStats />

                <button 
                  onClick={() => user ? setShowPostModal(true) : setView('register')} 
                  className="w-full py-5 bg-white text-black uppercase tracking-[0.2em] text-xs font-bold transition-all hover:bg-bronze hover:text-white flex items-center justify-center gap-3 shadow-lg"
                >
                    <Plus size={16} /> {isAr ? 'تدوين ملاحظة' : 'NEW LOG ENTRY'}
                </button>

                {/* Tags Filter */}
                <div className="bg-[#111] border border-white/5 p-6 rounded-sm">
                    <div className="flex items-center gap-2 mb-4 text-[0.6rem] text-slate uppercase tracking-widest">
                        <Filter size={10} /> {isAr ? 'تصفية البيانات' : 'DATA FILTER'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => setActiveTag(null)}
                          className={`px-3 py-1 text-[0.5rem] uppercase tracking-widest border transition-all ${!activeTag ? 'bg-white text-black border-white' : 'border-white/10 text-slate hover:text-white'}`}
                        >
                            {isAr ? 'الكل' : 'ALL'}
                        </button>
                        {allTags.map(tag => (
                            <button 
                              key={tag}
                              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                              className={`px-3 py-1 text-[0.5rem] uppercase tracking-widest border transition-all ${activeTag === tag ? 'bg-bronze text-white border-bronze' : 'border-white/10 text-slate hover:text-white'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Site Radar Decoration */}
                <div className="bg-[#111] border border-white/5 p-6 rounded-sm">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[0.6rem] text-slate uppercase tracking-widest font-mono">SITE_RADAR</span>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="aspect-square relative rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-black/40">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,101,0.05)_0%,transparent_70%)]"></div>
                         <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-r border-bronze/30 origin-center"
                         ></motion.div>
                         <div className="absolute w-full h-[1px] bg-white/5"></div>
                         <div className="absolute h-full w-[1px] bg-white/5"></div>
                         <div className="w-2 h-2 bg-bronze rounded-full animate-pulse"></div>
                         <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full"></div>
                         <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-bronze rounded-full"></div>
                    </div>
                </div>
             </div>
          </div>

          {/* Feed Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex border-b border-white/10 mb-10 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setActiveTab('log')} 
                    className={`flex-1 min-w-[120px] py-5 text-center text-xs uppercase tracking-[0.2em] font-bold transition-all relative ${activeTab === 'log' ? 'text-bronze' : 'text-slate hover:text-white'}`}
                >
                    {isAr ? 'السجل العام' : 'PUBLIC LOG'}
                    {activeTab === 'log' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-bronze" />}
                </button>
                <button 
                    onClick={() => setActiveTab('sos')} 
                    className={`flex-1 min-w-[120px] py-5 text-center text-xs uppercase tracking-[0.2em] font-bold transition-all relative ${activeTab === 'sos' ? 'text-red-500' : 'text-slate hover:text-white'}`}
                >
                    {isAr ? 'نداءات الترميم' : 'SOS / REPAIRS'}
                    {activeTab === 'sos' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />}
                </button>
            </div>

            <div className="space-y-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        key={post.id} 
                        className={`bg-[#111] border p-8 hover:border-bronze/30 transition-all cursor-pointer relative group ${post.type === 'emergency' ? 'border-red-900/20 shadow-[0_0_30px_rgba(153,27,27,0.05)]' : 'border-white/5'}`}
                        onClick={() => setSelectedPost(post)}
                    >
                        {/* Status Stamp */}
                        {post.type === 'emergency' && (
                            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[0.5rem] font-bold px-2 py-1 uppercase tracking-widest shadow-lg">
                                SOS
                            </div>
                        )}

                        <div className="absolute top-4 right-8 text-[0.5rem] font-mono text-slate/30 group-hover:text-bronze/50 transition-colors uppercase tracking-widest">
                            Ref: {post.id}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center font-serif text-white group-hover:border-bronze transition-colors overflow-hidden text-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className={`text-base font-bold text-white group-hover:text-bronze transition-colors ${headingFont}`}>{post.author}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-[0.6rem] text-bronze uppercase tracking-widest font-mono">
                                        {getTxt(post.role) || 'Builder'}
                                    </span>
                                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                                    <span className="text-[0.6rem] text-slate font-mono">{post.timestamp}</span>
                                </div>
                            </div>
                        </div>

                        <h3 className={`text-2xl mb-4 ${headingFont} text-white group-hover:pl-2 transition-all leading-tight`}>
                            {getTxt(post.title)}
                        </h3>
                        
                        <p className={`text-sm text-slate/70 line-clamp-3 mb-8 ${bodyFont} leading-relaxed`}>
                            {getTxt(post.content)}
                        </p>

                        {/* Display Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[0.5rem] uppercase tracking-widest text-slate/50 bg-white/5 px-2 py-0.5 rounded-sm">#{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-6 border-t border-white/5">
                            <div className="flex gap-6">
                                <button className="text-[0.6rem] uppercase tracking-widest font-bold text-slate hover:text-bronze flex items-center gap-2 transition-colors">
                                    <Award size={14} /> {post.endorsements} {isAr ? 'مصادقة' : 'ENDORSEMENTS'}
                                </button>
                                <button className="text-[0.6rem] uppercase tracking-widest font-bold text-slate hover:text-white flex items-center gap-2 transition-colors">
                                    <Send size={14} /> {post.reviews.length} {isAr ? 'تعليق' : 'REVIEW'}
                                </button>
                            </div>
                            <div className={`px-3 py-1 text-[0.5rem] uppercase font-bold tracking-widest ${post.type === 'emergency' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-white/5 text-slate border border-white/10'}`}>
                                {post.type === 'emergency' ? (isAr ? 'حالة طارئة' : 'EMERGENCY') : (isAr ? 'تقرير بناء' : 'LOG')}
                            </div>
                        </div>
                    </motion.div>
                ))
              ) : (
                <div className="py-40 text-center border border-dashed border-white/5 bg-[#0a0a0a]">
                    <Activity size={48} className="mx-auto text-slate/20 mb-4" />
                    <span className="text-slate/40 uppercase tracking-widest text-xs font-mono">No telemetry data detected in this sector</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPostModal && (
            <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6 overflow-y-auto">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#111] w-full max-w-xl border border-bronze/30 shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-bronze/20 animate-scan"></div>
                    <button onClick={() => setShowPostModal(false)} className="absolute top-4 right-4 text-slate hover:text-white transition-colors"><X size={24} /></button>
                    
                    <div className="p-8 md:p-12">
                        <div className="mb-10 text-center">
                            <span className="text-[0.6rem] text-bronze uppercase tracking-[0.4em] font-mono mb-2 block">IHAM-X-LOG-FORM</span>
                            <h2 className={`text-3xl text-white ${headingFont}`}>{isAr ? 'إنشاء تدوينة بناء' : 'Create Construction Log'}</h2>
                        </div>

                        <form onSubmit={handleSubmitPost} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[0.6rem] uppercase tracking-widest text-slate font-mono">Log Title</label>
                                <input 
                                    required
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                    className="w-full bg-black border-b border-white/10 py-3 text-white focus:border-bronze outline-none transition-all"
                                    placeholder={isAr ? "عنوان التقرير" : "Log title"}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[0.6rem] uppercase tracking-widest text-slate font-mono">System Sector</label>
                                <select 
                                    value={newPostCategory}
                                    onChange={(e) => setNewPostCategory(e.target.value)}
                                    className="w-full bg-black border-b border-white/10 py-3 text-white focus:border-bronze outline-none appearance-none rounded-none cursor-pointer"
                                >
                                    <option value="Foundation">SECTOR-B: FOUNDATION (Body)</option>
                                    <option value="Structure">SECTOR-A: STRUCTURE (Mind)</option>
                                    <option value="Interiors">SECTOR-C: INTERIORS (Spirit)</option>
                                    <option value="General">SECTOR-G: GENERAL</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[0.6rem] uppercase tracking-widest text-slate font-mono">Telemetric Data (Content)</label>
                                <textarea 
                                    required
                                    rows={5}
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    className="w-full bg-black border border-white/5 p-4 text-white focus:border-bronze outline-none transition-all resize-none text-sm"
                                    placeholder={isAr ? "ماذا وثقت اليوم في رحلة بناءك؟" : "Describe your structural findings or progress..."}
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-bronze text-white uppercase tracking-[0.3em] font-bold text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /> {isAr ? 'بث التقرير' : 'TRANSMIT LOG'}</>}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        )}

        {selectedPost && (
            <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedPost(null)}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#0a0a0a] w-full max-w-3xl border border-white/10 shadow-2xl relative overflow-hidden" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                    <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 text-slate hover:text-white z-10 transition-colors"><X size={28} /></button>
                    
                    <div className="p-10 md:p-16">
                        <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-8">
                            <div className="w-16 h-16 bg-bronze/20 text-bronze border border-bronze/30 rounded-full flex items-center justify-center text-3xl font-serif">
                                {selectedPost.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className={`text-2xl font-bold text-white ${headingFont}`}>{selectedPost.author}</h4>
                                <span className="text-xs text-bronze uppercase tracking-[0.2em] font-mono">
                                    {getTxt(selectedPost.role) || 'Builder'}
                                </span>
                            </div>
                        </div>

                        <h2 className={`text-3xl md:text-5xl mb-8 leading-tight text-white ${headingFont}`}>
                            {getTxt(selectedPost.title)}
                        </h2>
                        
                        <div className={`prose prose-invert prose-lg max-w-none mb-12 text-slate/80 leading-loose ${bodyFont}`}>
                            {getTxt(selectedPost.content)}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
                            <button className="px-6 py-3 bg-white/5 hover:bg-bronze transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                                <Award size={16} /> {isAr ? 'ختم المصادقة' : 'STAMP APPROVAL'}
                            </button>
                            <button className="px-6 py-3 border border-white/10 hover:border-white transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                                <Send size={16} /> {isAr ? 'إضافة مراجعة' : 'PEER REVIEW'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, CommunityPost, PeerReview, View, UserProfile } from '../types';
import { COMMUNITY_POSTS, TRANSLATIONS, PILLARS, TOP_BUILDERS, THIRTY_DAY_PROGRAM } from '../constants';
import { MessageCircle, ThumbsUp, Share2, Plus, Filter, Shield, Compass, X, Check, Users, Star, Activity, Award, Lock, ArrowRight, Quote, Loader2, Calendar, Radio, Target, Zap, AlertTriangle, FileText, Upload, Camera } from './Icons';

interface CommunityPageProps {
  lang: Language;
  setView: (view: View) => void;
  currentUser: UserProfile | null;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ lang, setView, currentUser }) => {
  // -- STATE --
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'log' | 'sos'>('log'); 
  
  // User System
  const [user, setUser] = useState<UserProfile | null>(currentUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
      setUser(currentUser);
  }, [currentUser]);

  const [showPostModal, setShowPostModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Interaction State
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [reviewContent, setReviewContent] = useState('');
  
  // Loading State
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);

  // Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState(PILLARS[0].channelId || 'General');
  const [postType, setPostType] = useState<'standard' | 'emergency'>('standard');
  const [postErrors, setPostErrors] = useState<{title?: string, content?: string}>({});

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  const t = TRANSLATIONS.community;

  // -- SUB-COMPONENTS --

  const LiveTicker = () => {
      const messages = isAr 
        ? ['تم ترميم أساس جديد بواسطة أحمد', 'سارة حصلت على رتبة مهندس أول', 'طلب استغاثة جديد في القطاع C']
        : ['New foundation repaired by Ahmed', 'Sarah promoted to Senior Architect', 'New SOS Request in Sector C'];
      
      const [idx, setIdx] = useState(0);

      useEffect(() => {
          const interval = setInterval(() => {
              setIdx(prev => (prev + 1) % messages.length);
          }, 4000);
          return () => clearInterval(interval);
      }, []);

      return (
          <div className="bg-bronze text-white text-[0.6rem] uppercase tracking-widest py-1 px-4 flex items-center gap-4 overflow-hidden">
              <span className="flex-shrink-0 font-bold flex items-center gap-1"><Activity size={10} /> {isAr ? 'نشاط الموقع' : 'SITE ACTIVITY'}:</span>
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

  const DailyWorkOrder = () => {
      const currentTask = THIRTY_DAY_PROGRAM[0].days[0]; 
      return (
          <div className="bg-[#1a1a1a] border border-bronze/30 p-6 mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-20">
                  <Target size={64} className="text-bronze" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-[0.6rem] uppercase tracking-widest text-slate">{isAr ? 'أمر عمل نشط' : 'ACTIVE WORK ORDER'}</span>
                      </div>
                      <span className="text-bronze font-mono text-xs border border-bronze px-2 py-1">DAY 01</span>
                  </div>
                  <h3 className={`text-xl text-white mb-2 ${headingFont}`}>{currentTask.title[lang]}</h3>
                  <p className={`text-sm text-slate mb-6 ${bodyFont} line-clamp-2`}>
                      {currentTask.task[lang]}
                  </p>
                  <div className="flex gap-4">
                      {/* ACTION FIX: Redirect to Dashboard */}
                      <button 
                          onClick={() => setView('dashboard')}
                          className="flex-1 py-3 bg-bronze text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                      >
                          {isAr ? 'تنفيذ المهمة' : 'EXECUTE'} <ArrowRight size={14} />
                      </button>
                      <button className="px-4 py-3 border border-white/20 text-slate hover:text-white transition-colors" title="Mark Complete">
                          <Check size={16} />
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  const RadarWidget = () => {
      return (
          <div className="bg-white dark:bg-white/5 border border-slate/10 p-6 mb-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xs uppercase tracking-widest text-slate flex items-center gap-2 font-bold`}>
                      <Radio size={14} className="text-bronze" /> {isAr ? 'رادار الموقع' : 'Site Radar'}
                  </h3>
                  <span className="text-[0.6rem] text-slate/50 font-mono">LIVE</span>
              </div>
              <div className="aspect-square w-full relative bg-[#050505] rounded-full border border-slate/20 overflow-hidden flex items-center justify-center">
                  <div className="absolute w-1/2 h-1/2 bg-gradient-to-l from-green-500/20 to-transparent top-0 right-0 origin-bottom-left animate-spin-slow" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute inset-4 rounded-full border border-slate/10 border-dashed"></div>
                  <div className="absolute inset-12 rounded-full border border-slate/10 border-dashed"></div>
                  <div className="absolute w-full h-[1px] bg-slate/10"></div>
                  <div className="absolute h-full w-[1px] bg-slate/10"></div>
                  <span className="absolute top-1/4 right-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                  <div className="w-3 h-3 bg-bronze rounded-full border-2 border-black z-10 relative"></div>
              </div>
              <div className="mt-4 flex justify-between text-[0.6rem] uppercase tracking-wider text-slate">
                  <span>{isAr ? 'متصل:' : 'Online:'} 1,242</span>
                  <span>{isAr ? 'المنطقة:' : 'Sector:'} A-1</span>
              </div>
          </div>
      );
  };

  // -- HANDLERS --

  const handleNewPostClick = () => {
    if (user) {
        setShowPostModal(true);
        setPostErrors({});
    } else {
        setView('register');
    }
  };

  // --- IMAGE UPLOAD LOGIC ---
  const handleAvatarClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && user) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              
              // Update User State
              const updatedUser = { ...user, avatarImage: base64String };
              setUser(updatedUser);
              
              // Persist to Local Storage
              localStorage.setItem('iham_user_profile', JSON.stringify(updatedUser));
          };
          reader.readAsDataURL(file);
      }
  };
  
  const validatePost = () => {
      const errors: {title?: string, content?: string} = {};
      let isValid = true;

      if (!newPostTitle.trim()) {
          errors.title = isAr ? 'العنوان مطلوب' : 'Title is required';
          isValid = false;
      } else if (newPostTitle.length < 5) {
          errors.title = isAr ? 'العنوان قصير جداً' : 'Title too short (min 5 chars)';
          isValid = false;
      }

      if (!newPostContent.trim()) {
          errors.content = isAr ? 'التفاصيل مطلوبة' : 'Content is required';
          isValid = false;
      } else if (newPostContent.length < 20) {
          errors.content = isAr ? 'التفاصيل غير كافية' : 'Details too short (min 20 chars)';
          isValid = false;
      }

      setPostErrors(errors);
      return isValid;
  };

  const handleSubmitPost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;
      if (!validatePost()) return;

      const newPost: CommunityPost = {
          id: `cp-${Date.now()}`,
          author: user.name,
          role: { ar: user.rank, en: user.rank, fr: user.rank },
          rankLevel: user.level,
          phase: 'Foundation',
          title: { ar: newPostTitle, en: newPostTitle, fr: newPostTitle },
          content: { ar: newPostContent, en: newPostContent, fr: newPostContent },
          endorsements: 0,
          reviews: [],
          tags: [newPostCategory],
          timestamp: 'Just now',
          type: postType,
          isSolved: false,
          status: 'pending' // MODERATION FIX: Set new posts to pending
      };

      setPosts([newPost, ...posts]);
      setUser(prev => prev ? ({ ...prev, xp: prev.xp + 20, projects: prev.projects + 1 }) : null);
      setShowPostModal(false);
      setNewPostTitle('');
      setNewPostContent('');
      setPostType('standard');
      setPostErrors({});
      
      if (postType === 'emergency') setActiveTab('sos');
      else setActiveTab('log');
  };

  const handleEndorse = (e: React.MouseEvent, postId: string) => {
      e.stopPropagation();
      if (!user) {
          setView('register');
          return;
      }
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, endorsements: p.endorsements + 1 } : p));
      if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => prev ? { ...prev, endorsements: prev.endorsements + 1 } : null);
      }
      setUser(prev => prev ? ({ ...prev, xp: prev.xp + 5 }) : null);
  };

  const handleSubmitReview = () => {
      if (!user || !selectedPost || !reviewContent.trim()) return;
      const newReview: PeerReview = {
          id: `r-${Date.now()}`,
          author: user.name,
          role: { ar: 'زميل', en: 'Peer', fr: 'Pair' },
          content: { ar: reviewContent, en: reviewContent, fr: reviewContent },
          timestamp: 'Just now',
          isHelpful: 0
      };
      
      const updatedPost = { 
          ...selectedPost, 
          reviews: [newReview, ...selectedPost.reviews],
      };
      
      setSelectedPost(updatedPost);
      setPosts(prev => prev.map(p => p.id === selectedPost.id ? updatedPost : p));
      setUser(prev => prev ? ({ ...prev, xp: prev.xp + 10, endorsed: prev.endorsed + 1 }) : null);
      setReviewContent('');
  };

  const getRankIcon = (rank: number) => {
      switch(rank) {
          case 3: return <Star size={14} fill="currentColor" className="text-bronze" />;
          case 2: return <Shield size={14} fill="currentColor" className="text-charcoal dark:text-concrete" />;
          default: return <Compass size={14} className="text-slate" />;
      }
  };

  // Advanced Filtering
  const filteredPosts = posts.filter(p => {
      // 1. Tab Filter
      if (activeTab === 'sos' && p.type !== 'emergency') return false;
      if (activeTab === 'log' && p.type === 'emergency') return false;

      // 2. Channel Filter
      if (activeFilter !== 'All' && !p.tags?.includes(activeFilter) && PILLARS.find(pil => pil.channelId === activeFilter)?.id !== p.id) return false;

      // 3. Moderation Filter (Simulated)
      // Only show pending posts if they belong to the current user
      if (p.status === 'pending' && p.author !== user?.name) return false;

      return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete"
    >
      {/* Hidden Input for Image Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />

      {/* Top Stats Bar */}
      <div className="border-b border-slate/10 bg-white dark:bg-white/5 sticky top-20 z-40 backdrop-blur-sm shadow-sm">
          <LiveTicker />
          <div className="container mx-auto px-6 py-3 flex justify-between items-center text-[0.6rem] uppercase tracking-widest text-slate">
              <div className="flex gap-6">
                  <span className="flex items-center gap-2"><Users size={12} /> {isAr ? 'البناؤون النشطون' : 'Active Builders'}: 1,242</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {isAr ? 'حالة النقابة: نشطة' : 'Guild Status: ACTIVE'}
              </div>
          </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
          
          {/* LEFT COLUMN: ID Card & Channels */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1">
             <div className="sticky top-40 space-y-8">
                
                {/* ARCHITECT ID CARD */}
                <div 
                    onClick={() => { if(user) handleAvatarClick() }}
                    className={`bg-white dark:bg-[#1a1a1a] border-2 ${user ? 'border-bronze/50 cursor-pointer hover:shadow-[0_0_20px_rgba(197,160,101,0.15)]' : 'border-slate/20'} p-1 relative overflow-hidden shadow-xl group transition-all duration-500`}
                >
                    <div className={`absolute top-0 left-0 w-full h-1 ${user ? 'bg-bronze' : 'bg-slate/30'}`}></div>
                    
                    {/* Hover Overlay for Upload */}
                    {user && (
                        <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-white text-xs uppercase tracking-widest flex items-center gap-2 font-bold">
                                <Camera size={16} /> {isAr ? 'تحديث الصورة' : 'Update Photo'}
                            </span>
                        </div>
                    )}

                    <div className="p-6 border border-slate/10 relative z-10 bg-alabaster/50 dark:bg-transparent">
                         <div className="flex justify-between items-start mb-6">
                             <Shield size={32} className={`${user ? 'text-bronze' : 'text-charcoal dark:text-concrete'} opacity-20`} />
                             <span className="text-[0.5rem] font-mono uppercase tracking-[0.2em] text-slate">{user ? `#${user.handle.toUpperCase().slice(1)}` : 'UNREGISTERED'}</span>
                         </div>
                         
                         <div className="text-center mb-6">
                            {user ? (
                                <>
                                    <div className="w-20 h-20 bg-charcoal text-alabaster rounded-full flex items-center justify-center mx-auto mb-3 text-3xl font-serif border-4 border-double border-bronze relative group-hover:scale-110 transition-transform overflow-hidden">
                                        {user.avatarImage ? (
                                            <img src={user.avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            user.avatarChar
                                        )}
                                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-bronze text-white text-[0.5rem] flex items-center justify-center rounded-full border-2 border-white dark:border-[#1a1a1a]">
                                            {user.level}
                                        </div>
                                    </div>
                                    <h3 className={`text-lg font-bold ${headingFont}`}>{user.name}</h3>
                                    <span className="text-[0.6rem] uppercase tracking-widest text-bronze block mt-1">{user.rank}</span>
                                    
                                    <div className="mt-4 w-full h-1 bg-slate/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-bronze" style={{ width: `${Math.min(100, (user.xp % 100))}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[0.5rem] text-slate mt-1 font-mono">
                                        <span>XP</span>
                                        <span>{user.xp} / 100</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-slate/20 text-slate rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-dashed border-slate/30">?</div>
                                    <h3 className={`text-lg font-bold text-slate ${headingFont}`}>{isAr ? 'زائر' : 'Guest Visitor'}</h3>
                                    <button onClick={() => setView('register')} className="text-[0.6rem] uppercase tracking-widest text-bronze underline block mt-2 hover:text-charcoal dark:hover:text-white">
                                        {isAr ? 'تفعيل الهوية' : 'Activate ID'}
                                    </button>
                                </>
                            )}
                         </div>

                         <div className="grid grid-cols-2 gap-2 border-t border-slate/10 pt-4">
                             <div className="text-center border-r border-slate/10">
                                 <span className={`block text-xl font-mono font-bold ${user ? 'text-bronze' : 'text-slate'}`}>{user ? user.projects : '0'}</span>
                                 <span className="text-[0.5rem] uppercase tracking-wider text-slate">{isAr ? 'مشاريع' : 'Projects'}</span>
                             </div>
                             <div className="text-center">
                                 <span className={`block text-xl font-mono font-bold ${user ? 'text-bronze' : 'text-slate'}`}>{user ? user.endorsed : '0'}</span>
                                 <span className="text-[0.5rem] uppercase tracking-wider text-slate">{isAr ? 'تفاعلات' : 'Engaged'}</span>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Navigation / Channels */}
                <div className="bg-white dark:bg-white/5 border border-slate/10 p-6">
                    <div className="mt-2 pt-2 border-t border-slate/10">
                        <button 
                            onClick={handleNewPostClick}
                            className="w-full py-4 bg-charcoal dark:bg-concrete text-alabaster dark:text-charcoal uppercase tracking-widest text-xs font-bold hover:bg-bronze dark:hover:bg-bronze hover:text-white transition-colors flex items-center justify-center gap-2 shadow-md group"
                        >
                            <Plus size={14} className="group-hover:rotate-90 transition-transform" /> {t.newPost[lang]}
                        </button>
                    </div>
                </div>

             </div>
          </div>

          {/* MIDDLE COLUMN: Feed */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            
            {/* NEW: DAILY WORK ORDER WIDGET */}
            {user && <DailyWorkOrder />}

            {/* TAB SYSTEM: LOG vs SOS */}
            <div className="flex border-b border-slate/20 mb-8">
                <button 
                    onClick={() => setActiveTab('log')}
                    className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-bold transition-colors relative ${activeTab === 'log' ? 'text-bronze' : 'text-slate hover:text-white'}`}
                >
                    {isAr ? 'السجل العام' : 'Public Log'}
                    {activeTab === 'log' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[2px] bg-bronze" />}
                </button>
                <button 
                    onClick={() => setActiveTab('sos')}
                    className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-bold transition-colors relative ${activeTab === 'sos' ? 'text-red-500' : 'text-slate hover:text-red-400'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <AlertTriangle size={14} className={activeTab === 'sos' ? 'animate-pulse' : ''} />
                        {isAr ? 'نداءات الترميم' : 'SOS / Repairs'}
                    </div>
                    {activeTab === 'sos' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500" />}
                </button>
            </div>

            {/* Sub Filters */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               <button onClick={() => setActiveFilter('All')} className={`px-3 py-1 text-[0.6rem] uppercase tracking-widest whitespace-nowrap border rounded-full ${activeFilter === 'All' ? 'bg-white/10 text-white border-white/20' : 'border-transparent text-slate'}`}>All</button>
               {PILLARS.map(p => (
                   <button key={p.id} onClick={() => setActiveFilter(p.channelId || '')} className={`px-3 py-1 text-[0.6rem] uppercase tracking-widest whitespace-nowrap border rounded-full ${activeFilter === p.channelId ? 'bg-white/10 text-white border-white/20' : 'border-transparent text-slate'}`}>{p.channelId}</button>
               ))}
            </div>

            {/* FEED CONTENT */}
            <div className="space-y-6 min-h-[50vh]">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <motion.div 
                        key={post.id} 
                        layoutId={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-white dark:bg-white/5 border hover:border-bronze/50 transition-colors group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md ${post.type === 'emergency' ? 'border-red-900/30 bg-red-900/5' : 'border-slate/10'}`}
                        onClick={() => setSelectedPost(post)}
                    >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
                    
                    <div className="p-6 md:p-8 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            {/* Badges Area */}
                            <div className="absolute top-0 right-0 flex">
                                {post.status === 'pending' && (
                                    <div className="bg-yellow-600/90 text-white text-[0.5rem] uppercase tracking-widest px-3 py-1 font-bold flex items-center gap-1">
                                        <Lock size={8} /> {isAr ? 'قيد المراجعة' : 'UNDER REVIEW'}
                                    </div>
                                )}
                                {post.type === 'emergency' && (
                                    <div className="bg-red-500 text-white text-[0.5rem] uppercase tracking-widest px-3 py-1 font-bold">
                                        {isAr ? 'طلب استغاثة' : 'SOS REQUEST'}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate/10 dark:bg-white/10 rounded-full flex items-center justify-center text-charcoal dark:text-concrete font-serif border border-slate/20 relative">
                                {post.author.charAt(0)}
                                <div className="absolute -bottom-1 -right-1 bg-alabaster dark:bg-darkBg rounded-full p-[2px] border border-slate/10">
                                    {getRankIcon(post.rankLevel)}
                                </div>
                                </div>
                                <div>
                                <h4 className={`text-sm font-bold ${headingFont} flex items-center gap-2`}>
                                    {post.author}
                                    {user?.name === post.author && <span className="text-[0.5rem] uppercase bg-bronze text-white px-1 rounded-sm">YOU</span>}
                                </h4>
                                <span className="text-[0.6rem] text-bronze uppercase tracking-widest">{typeof post.role === 'string' ? post.role : post.role[lang]}</span>
                                </div>
                            </div>
                            <div className="text-[0.6rem] text-slate uppercase tracking-widest bg-slate/5 px-2 py-1 border border-slate/10 rounded-sm mt-6 mr-6">
                                {post.phase}
                            </div>
                        </div>

                        <h3 className={`text-xl mb-3 ${headingFont} group-hover:text-bronze transition-colors`}>{typeof post.title === 'string' ? post.title : post.title[lang]}</h3>
                        <p className={`text-sm text-slate dark:text-slate/80 leading-relaxed mb-6 ${bodyFont} line-clamp-3`}>
                            {typeof post.content === 'string' ? post.content : post.content[lang]}
                        </p>

                        <div className="flex items-center gap-6 border-t border-slate/10 pt-4">
                            <button 
                                onClick={(e) => handleEndorse(e, post.id)}
                                className="flex items-center gap-2 text-slate hover:text-bronze transition-colors text-[0.65rem] uppercase tracking-widest font-bold group/btn"
                            >
                                <Award size={14} className="group-hover/btn:scale-110 transition-transform" />
                                <span>{post.type === 'emergency' ? (isAr ? 'دعم' : 'Support') : t.actions.endorse[lang]} ({post.endorsements})</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate hover:text-bronze transition-colors text-[0.65rem] uppercase tracking-widest font-bold">
                                <MessageCircle size={14} />
                                <span>{post.type === 'emergency' ? (isAr ? 'تقديم حل' : 'Propose Fix') : t.actions.review[lang]} ({post.reviews.length})</span>
                            </button>
                            <span className="ml-auto text-[0.6rem] text-slate/40 font-mono">{post.timestamp}</span>
                        </div>
                    </div>
                    {/* Status Bar for Emergency */}
                    {post.type === 'emergency' && (
                        <div className={`h-1 w-full ${post.isSolved ? 'bg-green-500' : 'bg-red-500/50'}`}></div>
                    )}
                    </motion.div>
                ))
              ) : (
                  <div className="py-20 text-center border-2 border-dashed border-slate/10 bg-slate/5">
                      <Compass size={48} className="mx-auto text-slate/20 mb-4" />
                      <h3 className="text-slate/50 text-sm uppercase tracking-widest">
                          {activeTab === 'sos' 
                             ? (isAr ? 'جميع المواقع مستقرة.' : 'All sites are stable.')
                             : (isAr ? 'لا توجد مخططات في هذا القسم' : 'No Blueprints in this Sector')
                          }
                      </h3>
                  </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Radar & Protocols */}
          <div className="hidden lg:block w-1/4 order-3">
             <div className="sticky top-40">
                 
                 <RadarWidget />

                 <div className="bg-[#111] border border-slate/10 p-6 mb-6">
                    <h3 className={`text-xs uppercase tracking-widest text-slate mb-4 flex items-center gap-2 font-bold`}>
                        <Shield size={14} className="text-bronze" /> {isAr ? 'ميثاق الشرف' : 'Guild Protocols'}
                    </h3>
                    <ul className="space-y-3 text-[0.65rem] text-slate/80 uppercase tracking-wide font-mono">
                        <li className="flex gap-2">
                            <span className="text-bronze">01.</span>
                            {isAr ? 'نحن نبني هياكل، لا نبني أوهاماً.' : 'We build structures, not illusions.'}
                        </li>
                        <li className="flex gap-2">
                            <span className="text-bronze">02.</span>
                            {isAr ? 'النقد البناء هو أساس الترميم.' : 'Constructive critique is the basis of repair.'}
                        </li>
                        <li className="flex gap-2">
                            <span className="text-bronze">03.</span>
                            {isAr ? 'لا تترك زميلاً تحت الأنقاض.' : 'Never leave a builder under rubble.'}
                        </li>
                    </ul>
                </div>

                 <div className="bg-white dark:bg-white/5 border border-slate/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-xs uppercase tracking-widest text-slate flex items-center gap-2 font-bold`}>
                            <Award size={14} /> {isAr ? 'كبار البنائين' : 'Top Architects'}
                        </h3>
                        <span className="w-2 h-2 bg-bronze rounded-full animate-pulse"></span>
                    </div>
                    
                    <div className="space-y-6">
                        {TOP_BUILDERS.map((member, i) => (
                            <div key={member.id} className="flex items-center gap-3 group cursor-pointer p-2 hover:bg-alabaster dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate/10">
                                <div className="relative">
                                    <div className={`w-10 h-10 bg-alabaster dark:bg-charcoal border rounded-full flex items-center justify-center font-serif text-sm text-charcoal dark:text-concrete transition-colors ${i === 0 ? 'border-bronze text-bronze' : 'border-slate/10'}`}>
                                        {member.avatarChar}
                                    </div>
                                    {i === 0 && <div className="absolute -top-2 -right-1 text-bronze drop-shadow-sm"><Star size={12} fill="currentColor" /></div>}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-charcoal dark:bg-white text-white dark:text-charcoal text-[0.5rem] flex items-center justify-center rounded-full border border-slate/20">{i+1}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm font-bold ${headingFont}`}>{member.name}</span>
                                        <span className="text-[0.6rem] font-mono text-slate/50">{member.projectsCompleted} XP</span>
                                    </div>
                                    <span className="text-[0.6rem] text-slate uppercase tracking-wider block">{member.rank[lang]}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate/10 text-center">
                        <p className="text-[0.6rem] text-slate leading-relaxed">
                            {isAr 
                             ? 'يتم ترقية الرتب بناءً على جودة المخططات ومساعدة الآخرين.' 
                             : 'Ranks are awarded based on blueprint quality and peer support.'}
                        </p>
                    </div>
                 </div>
             </div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {selectedPost && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-darkBg/95 backdrop-blur-sm flex items-center justify-center p-0 md:p-8"
                onClick={() => setSelectedPost(null)}
            >
                <motion.div 
                    layoutId={selectedPost.id}
                    className="bg-alabaster dark:bg-[#151515] w-full max-w-3xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto border border-bronze/30 shadow-2xl relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`sticky top-0 z-10 bg-alabaster/95 dark:bg-[#151515]/95 backdrop-blur border-b p-6 flex justify-between items-center ${selectedPost.type === 'emergency' ? 'border-red-900/50' : 'border-slate/10'}`}>
                        <div className="flex items-center gap-3">
                            {selectedPost.type === 'emergency' && (
                                <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                            )}
                            <div className="text-[0.6rem] text-bronze uppercase tracking-widest border border-bronze/30 px-2 py-1">{selectedPost.phase} Phase</div>
                            <span className="text-slate/30 text-xs">|</span>
                            <span className="text-[0.6rem] text-slate uppercase tracking-widest">Log #{selectedPost.id.toUpperCase()}</span>
                        </div>
                        <button onClick={() => setSelectedPost(null)} className="text-slate hover:text-charcoal dark:hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Status Warning in Modal */}
                        {selectedPost.status === 'pending' && (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 mb-6 text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
                                <Lock size={14} />
                                {isAr ? 'هذا المنشور قيد المراجعة ولا يظهر للعامة بعد.' : 'This post is under review and not yet public.'}
                            </div>
                        )}

                        <div className="mb-12">
                            <h2 className={`text-3xl md:text-4xl mb-6 ${headingFont}`}>{typeof selectedPost.title === 'string' ? selectedPost.title : selectedPost.title[lang]}</h2>
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate/10">
                                <div className="w-12 h-12 bg-charcoal text-alabaster rounded-full flex items-center justify-center font-serif text-xl border-2 border-slate/10 overflow-hidden">
                                     {/* Simplified avatar check for list view, full check for profile */}
                                    {selectedPost.author.charAt(0)}
                                </div>
                                <div>
                                    <div className={`text-lg font-bold ${headingFont}`}>{selectedPost.author}</div>
                                    <div className="text-xs text-slate uppercase tracking-widest">{typeof selectedPost.role === 'string' ? selectedPost.role : selectedPost.role[lang]}</div>
                                </div>
                            </div>
                            <div className={`prose dark:prose-invert max-w-none text-lg leading-relaxed ${bodyFont}`}>
                                {typeof selectedPost.content === 'string' ? selectedPost.content : selectedPost.content[lang]}
                            </div>
                        </div>
                        
                        {/* Comments section... */}
                        <div className="bg-white dark:bg-white/5 border border-slate/10 p-8">
                            <h3 className={`text-xl mb-6 flex items-center gap-2 ${headingFont}`}>
                                <MessageCircle size={20} className="text-bronze" />
                                {selectedPost.type === 'emergency' ? (isAr ? 'الحلول المقترحة' : 'Proposed Solutions') : (isAr ? 'مراجعات الأقران' : 'Peer Reviews')}
                            </h3>
                            
                            <div className="space-y-6 mb-8">
                                {selectedPost.reviews.length > 0 ? (
                                    selectedPost.reviews.map(review => (
                                        <div key={review.id} className="border-l-2 border-slate/20 pl-4 py-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-bold text-charcoal dark:text-concrete">{review.author}</span>
                                                <span className="text-[0.6rem] text-slate">{review.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-slate">{typeof review.content === 'string' ? review.content : review.content[lang]}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-slate/40 text-sm italic">
                                        {isAr ? 'لا توجد مراجعات بعد. كن أول من يصحح.' : 'No reviews yet. Be the first to audit.'}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 bg-bronze text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs overflow-hidden">
                                    {user && user.avatarImage ? <img src={user.avatarImage} className="w-full h-full object-cover" /> : (user ? user.avatarChar : '?')}
                                </div>
                                <div className="flex-1">
                                    <textarea 
                                        value={reviewContent}
                                        onChange={(e) => setReviewContent(e.target.value)}
                                        placeholder={user ? (isAr ? "أضف ملاحظتك الهندسية..." : "Add your structural note...") : (isAr ? "سجل الدخول للمشاركة..." : "Log in to review...")}
                                        disabled={!user}
                                        className="w-full bg-transparent border-b border-slate/20 focus:border-bronze outline-none min-h-[80px] text-sm py-2 resize-none"
                                    ></textarea>
                                    <div className="flex justify-end mt-2">
                                        <button 
                                            onClick={handleSubmitReview}
                                            disabled={!user || !reviewContent.trim()}
                                            className="px-6 py-2 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-bronze disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isAr ? 'إرسال' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}

        {showPostModal && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                onClick={() => setShowPostModal(false)}
            >
                <motion.div 
                    initial={{ y: 50 }} animate={{ y: 0 }}
                    className="bg-alabaster dark:bg-[#1a1a1a] p-8 max-w-lg w-full border-t-4 border-bronze shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                     <button onClick={() => setShowPostModal(false)} className="absolute top-4 right-4 text-slate hover:text-charcoal"><X size={20}/></button>
                     <h2 className={`text-xl mb-6 ${headingFont}`}>{isAr ? 'إضافة سجل جديد' : 'New Log Entry'}</h2>
                     
                     <form onSubmit={handleSubmitPost} className="space-y-6">
                        {/* Form contents same as before */}
                        <div className="flex gap-4 mb-4">
                            <button
                                type="button" 
                                onClick={() => setPostType('standard')}
                                className={`flex-1 py-3 text-xs uppercase tracking-widest border ${postType === 'standard' ? 'bg-bronze text-white border-bronze' : 'border-slate/30 text-slate'}`}
                            >
                                <FileText size={14} className="inline mr-2" />
                                {isAr ? 'سجل عادي' : 'Standard Log'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => setPostType('emergency')}
                                className={`flex-1 py-3 text-xs uppercase tracking-widest border ${postType === 'emergency' ? 'bg-red-600 text-white border-red-600' : 'border-slate/30 text-slate'}`}
                            >
                                <AlertTriangle size={14} className="inline mr-2" />
                                {isAr ? 'نداء ترميم' : 'SOS / Help'}
                            </button>
                        </div>

                        <div>
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">Sector (Channel)</label>
                            <select 
                                value={newPostCategory}
                                onChange={(e) => setNewPostCategory(e.target.value)}
                                className="w-full bg-transparent border-b border-slate/30 py-2 focus:border-bronze outline-none text-sm"
                            >
                                {PILLARS.map(p => <option key={p.id} value={p.channelId} className="dark:bg-[#1a1a1a]">{p.channelId}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">Title</label>
                            <input 
                                type="text" 
                                required
                                value={newPostTitle}
                                onChange={(e) => {
                                    setNewPostTitle(e.target.value);
                                    if(postErrors.title) setPostErrors(prev => ({...prev, title: ''}));
                                }}
                                className={`w-full bg-transparent border-b ${postErrors.title ? 'border-red-500' : 'border-slate/30'} py-2 focus:border-bronze outline-none font-bold`}
                                placeholder={postType === 'standard' ? "e.g., Structural Failure in Sleep Routine" : "e.g., URGENT: Collapse in Motivation"}
                            />
                            {postErrors.title && <span className="text-red-500 text-[0.6rem] uppercase tracking-widest">{postErrors.title}</span>}
                        </div>
                         <div>
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">Report Details</label>
                            <textarea 
                                required
                                rows={4}
                                value={newPostContent}
                                onChange={(e) => {
                                    setNewPostContent(e.target.value);
                                    if(postErrors.content) setPostErrors(prev => ({...prev, content: ''}));
                                }}
                                className={`w-full bg-transparent border-b ${postErrors.content ? 'border-red-500' : 'border-slate/30'} py-2 focus:border-bronze outline-none text-sm resize-none`}
                                placeholder={postType === 'standard' ? "Describe the architectural issue..." : "Describe the problem. Other architects will advise."}
                            />
                            {postErrors.content && <span className="text-red-500 text-[0.6rem] uppercase tracking-widest">{postErrors.content}</span>}
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 p-3 flex gap-2 items-start">
                            <Shield size={14} className="text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-[0.65rem] text-slate/70">
                                {isAr 
                                ? 'سيتم مراجعة هذا المنشور من قبل المشرفين قبل نشره للعامة. ستراه أنت فقط مع علامة "قيد المراجعة".' 
                                : 'This post will be moderated before going public. You will see it marked as "Pending Review".'}
                            </p>
                        </div>
                        <button 
                            type="submit" 
                            className={`w-full py-4 text-white uppercase tracking-widest text-xs font-bold transition-colors ${postType === 'emergency' ? 'bg-red-600 hover:bg-red-700' : 'bg-charcoal hover:bg-bronze'}`}
                        >
                            {postType === 'emergency' ? (isAr ? 'إطلاق نداء الاستغاثة' : 'BROADCAST SOS') : (isAr ? 'نشر في السجل' : 'Publish to Log')}
                        </button>
                     </form>
                </motion.div>
            </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

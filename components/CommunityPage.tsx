
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, CommunityPost, PeerReview } from '../types';
import { COMMUNITY_POSTS, TRANSLATIONS, PILLARS, TOP_BUILDERS } from '../constants';
import { MessageCircle, ThumbsUp, Share2, Plus, Filter, Shield, Compass, X, Check, Users, Star, Activity, Award, Lock, ArrowRight, Quote, Loader2 } from './Icons';

interface CommunityPageProps {
  lang: Language;
}

interface UserProfile {
  name: string;
  handle: string;
  email: string;
  rank: string;
  level: number;
  xp: number;
  projects: number;
  endorsed: number;
  joinedDate: string;
  avatarChar: string;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ lang }) => {
  // -- STATE --
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  // User System
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Interaction State
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [reviewContent, setReviewContent] = useState('');
  
  // Loading State for Archive
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);

  // Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState(PILLARS[0].channelId || 'General');

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  const t = TRANSLATIONS.community;

  // -- HANDLERS --

  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      // Mock Registration
      const newUser: UserProfile = {
          name: regName,
          handle: `@${regName.toLowerCase().replace(/\s/g, '_')}`,
          email: regEmail,
          rank: isAr ? 'بناء مبتدئ' : 'Novice Builder',
          level: 1,
          xp: 0,
          projects: 0,
          endorsed: 0,
          joinedDate: new Date().toLocaleDateString(),
          avatarChar: regName.charAt(0).toUpperCase()
      };
      setUser(newUser);
      setShowRegisterModal(false);
  };

  const handleNewPostClick = () => {
    if (user) {
        setShowPostModal(true);
    } else {
        setShowRegisterModal(true);
    }
  };
  
  const loadArchivedLogs = () => {
      setLoadingArchive(true);
      // Simulate API call delay
      setTimeout(() => {
          // Mock Data Append
          const archived: CommunityPost[] = [
              {
                id: 'arch-001',
                author: 'Master Arch. Ziad',
                role: { ar: 'مستشار', en: 'Advisor', fr: 'Conseiller' },
                rankLevel: 3,
                phase: 'Maintenance',
                title: { ar: 'سجل قديم: أهمية الصيانة الدورية', en: 'Archived: Importance of Routine Maintenance', fr: '' },
                content: { ar: 'تذكروا دائماً: الترميم ليس حدثاً، بل أسلوب حياة. الجدران تتشقق دائماً، السر في سرعة الاستجابة.', en: 'Remember: Restoration is not an event, but a lifestyle. Walls always crack; the secret is in response time.', fr: '' },
                endorsements: 890,
                reviews: [],
                tags: ['History', 'Wisdom'],
                timestamp: '2 years ago'
              },
               {
                id: 'arch-002',
                author: 'Builder Sara',
                role: { ar: 'بناء', en: 'Builder', fr: 'Bâtisseur' },
                rankLevel: 2,
                phase: 'Foundation',
                title: { ar: 'يوميات البدايات', en: 'Early Days Diary', fr: '' },
                content: { ar: 'في البداية ظننت أنني لن أستطيع النوم مبكراً. الآن لا أستطيع السهر.', en: 'At first I thought I could not sleep early. Now I cannot stay up late.', fr: '' },
                endorsements: 120,
                reviews: [],
                tags: ['Sleep', 'Foundation'],
                timestamp: '2 years ago'
              }
          ];
          setPosts([...posts, ...archived]);
          setLoadingArchive(false);
          setArchiveLoaded(true);
      }, 1500);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;

      const newPost: CommunityPost = {
          id: `cp-${Date.now()}`,
          author: user.name,
          role: { ar: user.rank, en: user.rank, fr: user.rank }, // simplified
          rankLevel: 1,
          phase: 'Foundation', // Default for novice
          title: { ar: newPostTitle, en: newPostTitle, fr: newPostTitle },
          content: { ar: newPostContent, en: newPostContent, fr: newPostContent },
          endorsements: 0,
          reviews: [],
          tags: [newPostCategory],
          timestamp: 'Just now'
      };

      setPosts([newPost, ...posts]);
      setUser({ ...user, xp: user.xp + 20, projects: user.projects + 1 }); // XP Reward
      setShowPostModal(false);
      setNewPostTitle('');
      setNewPostContent('');
  };

  const handleEndorse = (e: React.MouseEvent, postId: string) => {
      e.stopPropagation();
      if (!user) {
          setShowRegisterModal(true);
          return;
      }
      
      setPosts(prev => prev.map(p => 
          p.id === postId ? { ...p, endorsements: p.endorsements + 1 } : p
      ));

      if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => prev ? { ...prev, endorsements: prev.endorsements + 1 } : null);
      }
      
      // XP Reward for interaction
      setUser({ ...user, xp: user.xp + 5 });
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
          reviews: [newReview, ...selectedPost.reviews]
      };

      // Update local selected post
      setSelectedPost(updatedPost);

      // Update main list
      setPosts(prev => prev.map(p => p.id === selectedPost.id ? updatedPost : p));

      // XP Reward
      setUser({ ...user, xp: user.xp + 10, endorsed: user.endorsed + 1 });
      setReviewContent('');
  };

  const getRankIcon = (rank: number) => {
      switch(rank) {
          case 3: return <Star size={14} fill="currentColor" className="text-bronze" />;
          case 2: return <Shield size={14} fill="currentColor" className="text-charcoal dark:text-concrete" />;
          default: return <Compass size={14} className="text-slate" />;
      }
  };

  // Filter Logic
  const filteredPosts = activeFilter === 'All' 
    ? posts 
    : posts.filter(p => p.tags?.includes(activeFilter) || PILLARS.find(pil => pil.channelId === activeFilter)?.id === p.id); 

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete"
    >
      {/* Top Stats Bar */}
      <div className="border-b border-slate/10 bg-white dark:bg-white/5 sticky top-20 z-40 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center text-[0.6rem] uppercase tracking-widest text-slate">
              <div className="flex gap-6">
                  <span className="flex items-center gap-2"><Users size={12} /> {isAr ? 'البناؤون النشطون' : 'Active Builders'}: 1,242</span>
                  <span className="flex items-center gap-2 hidden md:flex"><Activity size={12} /> {isAr ? 'مشاريع جارية' : 'Sites Underway'}: {856 + (user?.projects || 0)}</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {isAr ? 'حالة النقابة: نشطة' : 'Guild Status: ACTIVE'}
              </div>
          </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        
        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
          
          {/* LEFT COLUMN: ID Card & Filters */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1">
             <div className="sticky top-40 space-y-8">
                
                {/* ARCHITECT ID CARD - Interactive */}
                <div 
                    onClick={() => user && setShowProfileModal(true)}
                    className={`bg-white dark:bg-[#1a1a1a] border-2 ${user ? 'border-bronze/50 cursor-pointer hover:shadow-[0_0_20px_rgba(197,160,101,0.15)]' : 'border-slate/20'} p-1 relative overflow-hidden shadow-xl group transition-all duration-500`}
                >
                    <div className={`absolute top-0 left-0 w-full h-1 ${user ? 'bg-bronze' : 'bg-slate/30'}`}></div>
                    <div className="p-6 border border-slate/10 relative z-10 bg-alabaster/50 dark:bg-transparent">
                         <div className="flex justify-between items-start mb-6">
                             <Shield size={32} className={`${user ? 'text-bronze' : 'text-charcoal dark:text-concrete'} opacity-20`} />
                             <span className="text-[0.5rem] font-mono uppercase tracking-[0.2em] text-slate">{user ? `#${user.handle.toUpperCase().slice(1)}` : 'UNREGISTERED'}</span>
                         </div>
                         
                         <div className="text-center mb-6">
                            {user ? (
                                <>
                                    <div className="w-20 h-20 bg-charcoal text-alabaster rounded-full flex items-center justify-center mx-auto mb-3 text-3xl font-serif border-4 border-double border-bronze relative group-hover:scale-110 transition-transform">
                                        {user.avatarChar}
                                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-bronze text-white text-[0.5rem] flex items-center justify-center rounded-full border-2 border-white dark:border-[#1a1a1a]">
                                            {user.level}
                                        </div>
                                    </div>
                                    <h3 className={`text-lg font-bold ${headingFont}`}>{user.name}</h3>
                                    <span className="text-[0.6rem] uppercase tracking-widest text-bronze block mt-1">{user.rank}</span>
                                    
                                    {/* XP Bar */}
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
                                    <button onClick={() => setShowRegisterModal(true)} className="text-[0.6rem] uppercase tracking-widest text-bronze underline block mt-2 hover:text-charcoal dark:hover:text-white">
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
                    {/* Holographic Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"></div>
                </div>

                {/* Navigation / Channels */}
                <div className="bg-white dark:bg-white/5 border border-slate/10 p-6">
                    <h3 className={`text-xs uppercase tracking-widest text-slate mb-6 flex items-center gap-2 font-bold`}>
                        <Compass size={14} /> {t.channels[lang]}
                    </h3>
                    <div className="space-y-1">
                        <button 
                            onClick={() => setActiveFilter('All')}
                            className={`w-full text-start px-4 py-3 text-xs uppercase tracking-wider transition-colors border-l-2 ${activeFilter === 'All' ? 'border-bronze bg-bronze/5 text-charcoal dark:text-white font-bold' : 'border-transparent text-slate hover:text-bronze hover:bg-slate/5'}`}
                        >
                            {t.feed[lang]}
                        </button>
                        {PILLARS.map(pillar => (
                            <button 
                                key={pillar.id}
                                onClick={() => setActiveFilter(pillar.channelId || '')}
                                className={`w-full text-start px-4 py-3 text-xs uppercase tracking-wider transition-colors border-l-2 ${activeFilter === pillar.channelId ? 'border-bronze bg-bronze/5 text-charcoal dark:text-white font-bold' : 'border-transparent text-slate hover:text-bronze hover:bg-slate/5'}`}
                            >
                                {pillar.channelId}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate/10">
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
            
            {/* Mobile Filters */}
            <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               <button onClick={() => setActiveFilter('All')} className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap border ${activeFilter === 'All' ? 'bg-bronze text-white border-bronze' : 'border-slate/20 text-slate'}`}>All</button>
               {PILLARS.map(p => (
                   <button key={p.id} onClick={() => setActiveFilter(p.channelId || '')} className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap border ${activeFilter === p.channelId ? 'bg-bronze text-white border-bronze' : 'border-slate/20 text-slate'}`}>{p.channelId}</button>
               ))}
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className={`text-3xl ${headingFont}`}>{isAr ? 'سجل الموقع العام' : 'Site Log Feed'}</h2>
                    <p className="text-xs text-slate mt-1">{isAr ? 'تحديثات حية من البنائين' : 'Live updates from fellow architects'}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate bg-white dark:bg-white/5 px-3 py-1 border border-slate/10">
                    <Filter size={12} />
                    <span className="uppercase tracking-widest font-bold">{activeFilter}</span>
                </div>
            </div>

            <div className="space-y-6 min-h-[50vh]">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <motion.div 
                        key={post.id} 
                        layoutId={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-white/5 border border-slate/10 hover:border-bronze/50 transition-colors group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
                        onClick={() => setSelectedPost(post)}
                    >
                    {/* Blueprint Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
                    
                    <div className="p-6 md:p-8 relative z-10">
                        {/* Post Header */}
                        <div className="flex justify-between items-start mb-4">
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
                            <div className="text-[0.6rem] text-slate uppercase tracking-widest bg-slate/5 px-2 py-1 border border-slate/10 rounded-sm">
                                {post.phase}
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className={`text-xl mb-3 ${headingFont} group-hover:text-bronze transition-colors`}>{typeof post.title === 'string' ? post.title : post.title[lang]}</h3>
                        <p className={`text-sm text-slate dark:text-slate/80 leading-relaxed mb-6 ${bodyFont} line-clamp-3`}>
                            {typeof post.content === 'string' ? post.content : post.content[lang]}
                        </p>

                        {/* Tags */}
                        {post.tags && (
                            <div className="flex gap-2 mb-6">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[0.55rem] uppercase tracking-wider text-slate/60 bg-slate/5 px-2 py-1">#{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* Action Bar */}
                        <div className="flex items-center gap-6 border-t border-slate/10 pt-4">
                            <button 
                                onClick={(e) => handleEndorse(e, post.id)}
                                className="flex items-center gap-2 text-slate hover:text-bronze transition-colors text-[0.65rem] uppercase tracking-widest font-bold group/btn"
                            >
                                <Award size={14} className="group-hover/btn:scale-110 transition-transform" />
                                <span>{t.actions.endorse[lang]} ({post.endorsements})</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate hover:text-bronze transition-colors text-[0.65rem] uppercase tracking-widest font-bold">
                                <MessageCircle size={14} />
                                <span>{t.actions.review[lang]} ({post.reviews.length})</span>
                            </button>
                            <span className="ml-auto text-[0.6rem] text-slate/40 font-mono">{post.timestamp}</span>
                        </div>
                    </div>
                    {/* Hover Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-bronze transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </motion.div>
                ))
              ) : (
                  <div className="py-20 text-center border-2 border-dashed border-slate/10 bg-slate/5">
                      <Compass size={48} className="mx-auto text-slate/20 mb-4" />
                      <h3 className="text-slate/50 text-sm uppercase tracking-widest">{isAr ? 'لا توجد مخططات في هذا القسم' : 'No Blueprints in this Sector'}</h3>
                  </div>
              )}
              
              {!archiveLoaded && (
                <div className="py-8 text-center border-t border-dashed border-slate/20">
                    <button 
                        onClick={loadArchivedLogs}
                        disabled={loadingArchive}
                        className="text-xs text-slate hover:text-bronze uppercase tracking-widest flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                    >
                        {loadingArchive ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
                        {loadingArchive 
                            ? (isAr ? 'جاري استرجاع الأرشيف...' : 'Retrieving Archive...') 
                            : (isAr ? 'تحميل سجلات أقدم' : 'Load Archived Logs')
                        }
                    </button>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Top Builders (Desktop Only) */}
          <div className="hidden lg:block w-1/4 order-3">
             <div className="sticky top-40">
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
        
        {/* POST DETAIL / PEER REVIEW MODAL */}
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
                    {/* Modal Header */}
                    <div className="sticky top-0 z-10 bg-alabaster/95 dark:bg-[#151515]/95 backdrop-blur border-b border-slate/10 p-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="text-[0.6rem] text-bronze uppercase tracking-widest border border-bronze/30 px-2 py-1">{selectedPost.phase} Phase</div>
                            <span className="text-slate/30 text-xs">|</span>
                            <span className="text-[0.6rem] text-slate uppercase tracking-widest">Log #{selectedPost.id.toUpperCase()}</span>
                        </div>
                        <button onClick={() => setSelectedPost(null)} className="text-slate hover:text-charcoal dark:hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Original Post */}
                        <div className="mb-12">
                            <h2 className={`text-3xl md:text-4xl mb-6 ${headingFont}`}>{typeof selectedPost.title === 'string' ? selectedPost.title : selectedPost.title[lang]}</h2>
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate/10">
                                <div className="w-12 h-12 bg-charcoal text-alabaster rounded-full flex items-center justify-center font-serif text-xl border-2 border-slate/10">
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

                        {/* Reviews Section */}
                        <div className="bg-white dark:bg-white/5 border border-slate/10 p-8">
                            <h3 className={`text-xl mb-6 flex items-center gap-2 ${headingFont}`}>
                                <MessageCircle size={20} className="text-bronze" />
                                {isAr ? 'مراجعات الأقران' : 'Peer Reviews'}
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

                            {/* Add Review Box */}
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 bg-bronze text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                                    {user ? user.avatarChar : '?'}
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
                                            {isAr ? 'إرسال المراجعة' : 'Submit Review'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}

        {/* REGISTER MODAL */}
        {showRegisterModal && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                onClick={() => setShowRegisterModal(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className="bg-alabaster dark:bg-[#1a1a1a] p-8 max-w-md w-full border border-bronze shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 text-slate hover:text-charcoal"><X size={20}/></button>
                    <div className="text-center mb-8">
                        <Shield size={40} className="mx-auto text-bronze mb-4" />
                        <h2 className={`text-2xl ${headingFont}`}>{isAr ? 'الانضمام للنقابة' : 'Join The Guild'}</h2>
                        <p className="text-xs text-slate mt-2 uppercase tracking-widest">{isAr ? 'اصدر هويتك الهندسية' : 'Issue Your Architectural ID'}</p>
                    </div>
                    
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">Name / Alias</label>
                            <input 
                                type="text" 
                                required
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                className="w-full bg-transparent border-b border-slate/30 py-2 focus:border-bronze outline-none"
                                placeholder="Architect Name"
                            />
                        </div>
                        <div>
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">Email (For ID Recovery)</label>
                            <input 
                                type="email" 
                                required
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-slate/30 py-2 focus:border-bronze outline-none"
                                placeholder="arch@example.com"
                            />
                        </div>
                        <button type="submit" className="w-full py-4 bg-bronze text-white uppercase tracking-widest text-xs font-bold hover:bg-charcoal transition-colors">
                            {isAr ? 'توقيع العقد' : 'Sign Contract'}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        )}

        {/* NEW POST MODAL */}
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
                     <h2 className={`text-xl mb-6 ${headingFont}`}>{isAr ? 'طرح مخطط جديد' : 'Submit New Blueprint'}</h2>
                     
                     <form onSubmit={handleSubmitPost} className="space-y-6">
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
                                onChange={(e) => setNewPostTitle(e.target.value)}
                                className="w-full bg-transparent border-b border-slate/30 py-2 focus:border-bronze outline-none font-bold"
                                placeholder="e.g., Structural Failure in Sleep Routine"
                            />
                        </div>
                         <div>
                            <label className="text-[0.6rem] uppercase tracking-widest text-slate block mb-1">Report Details</label>
                            <textarea 
                                required
                                rows={4}
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                className="w-full bg-transparent border-b border-slate/30 py-2 focus:border-bronze outline-none text-sm resize-none"
                                placeholder="Describe the architectural issue..."
                            />
                        </div>
                        <button type="submit" className="w-full py-4 bg-charcoal text-white uppercase tracking-widest text-xs font-bold hover:bg-bronze transition-colors">
                            {isAr ? 'نشر في السجل' : 'Publish to Log'}
                        </button>
                     </form>
                </motion.div>
            </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, CommunityPost, PeerReview } from '../types';
import { COMMUNITY_POSTS, TRANSLATIONS, PILLARS, TOP_BUILDERS } from '../constants';
import { MessageCircle, ThumbsUp, Share2, Plus, Filter, Shield, Compass, X, Check, Users, Star, Activity, Award } from './Icons';

interface CommunityPageProps {
  lang: Language;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isMember, setIsMember] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  const isAr = lang === 'ar';
  const headingFont = isAr ? 'font-amiri' : 'font-playfair';
  const bodyFont = isAr ? 'font-ibm' : 'font-montserrat';
  const t = TRANSLATIONS.community;

  const handleNewPostClick = () => {
    if (isMember) {
        setShowPostModal(true);
    } else {
        setShowRegisterModal(true);
    }
  };

  const getRankIcon = (rank: number) => {
      switch(rank) {
          case 3: return <Star size={14} fill="currentColor" className="text-bronze" />;
          case 2: return <Shield size={14} fill="currentColor" className="text-charcoal dark:text-concrete" />;
          default: return <Compass size={14} className="text-slate" />;
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-28 min-h-screen bg-alabaster dark:bg-darkBg text-charcoal dark:text-concrete"
    >
      {/* Top Stats Bar */}
      <div className="border-b border-slate/10 bg-white dark:bg-white/5">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center text-[0.6rem] uppercase tracking-widest text-slate">
              <div className="flex gap-6">
                  <span className="flex items-center gap-2"><Users size={12} /> {isAr ? 'البناؤون النشطون' : 'Active Builders'}: 1,242</span>
                  <span className="flex items-center gap-2 hidden md:flex"><Activity size={12} /> {isAr ? 'مشاريع جارية' : 'Sites Underway'}: 856</span>
              </div>
              <div>
                  {isAr ? 'حالة النقابة: نشطة' : 'Guild Status: ACTIVE'}
              </div>
          </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        
        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
          
          {/* LEFT COLUMN: ID Card & Filters */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1">
             <div className="sticky top-32 space-y-8">
                
                {/* Architect ID Card */}
                <div className="bg-white dark:bg-[#1a1a1a] border-2 border-slate/20 p-1 relative overflow-hidden shadow-xl group hover:border-bronze transition-colors duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-bronze"></div>
                    <div className="p-6 border border-slate/10 relative z-10 bg-alabaster/50 dark:bg-transparent">
                         <div className="flex justify-between items-start mb-6">
                             <Shield size={32} className="text-charcoal dark:text-concrete opacity-20" />
                             <span className="text-[0.5rem] font-mono uppercase tracking-[0.2em] text-slate">{isMember ? '#ID-8842' : 'UNREGISTERED'}</span>
                         </div>
                         
                         <div className="text-center mb-6">
                            {isMember ? (
                                <>
                                    <div className="w-20 h-20 bg-charcoal text-alabaster rounded-full flex items-center justify-center mx-auto mb-3 text-3xl font-serif border-4 border-double border-bronze">M</div>
                                    <h3 className={`text-lg font-bold ${headingFont}`}>{isAr ? 'معماري عضو' : 'Member Architect'}</h3>
                                    <span className="text-[0.6rem] uppercase tracking-widest text-bronze block mt-1">Level 1 Clearance</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-slate/20 text-slate rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-dashed border-slate/30">?</div>
                                    <h3 className={`text-lg font-bold text-slate ${headingFont}`}>{isAr ? 'زائر' : 'Guest Visitor'}</h3>
                                    <button onClick={handleNewPostClick} className="text-[0.6rem] uppercase tracking-widest text-bronze underline block mt-2 hover:text-charcoal dark:hover:text-white">
                                        {isAr ? 'تفعيل الهوية' : 'Activate ID'}
                                    </button>
                                </>
                            )}
                         </div>

                         <div className="grid grid-cols-2 gap-2 border-t border-slate/10 pt-4">
                             <div className="text-center border-r border-slate/10">
                                 <span className="block text-xl font-mono font-bold text-charcoal dark:text-concrete">{isMember ? '12' : '0'}</span>
                                 <span className="text-[0.5rem] uppercase tracking-wider text-slate">{isAr ? 'مشاريع' : 'Projects'}</span>
                             </div>
                             <div className="text-center">
                                 <span className="block text-xl font-mono font-bold text-charcoal dark:text-concrete">{isMember ? '5' : '0'}</span>
                                 <span className="text-[0.5rem] uppercase tracking-wider text-slate">{isAr ? 'اعتمادات' : 'Endorsed'}</span>
                             </div>
                         </div>
                    </div>
                    {/* Holographic Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"></div>
                </div>

                {/* Navigation */}
                <div className="bg-white dark:bg-white/5 border border-slate/10 p-6">
                    <h3 className={`text-xs uppercase tracking-widest text-slate mb-6 flex items-center gap-2 font-bold`}>
                        <Compass size={14} /> {t.channels[lang]}
                    </h3>
                    <div className="space-y-1">
                        <button 
                            onClick={() => setActiveFilter('All')}
                            className={`w-full text-start px-4 py-3 text-xs uppercase tracking-wider transition-colors border-l-2 ${activeFilter === 'All' ? 'border-bronze bg-bronze/5 text-charcoal dark:text-white' : 'border-transparent text-slate hover:text-bronze hover:bg-slate/5'}`}
                        >
                            {t.feed[lang]}
                        </button>
                        {PILLARS.map(pillar => (
                            <button 
                                key={pillar.id}
                                onClick={() => setActiveFilter(pillar.channelId || '')}
                                className={`w-full text-start px-4 py-3 text-xs uppercase tracking-wider transition-colors border-l-2 ${activeFilter === pillar.channelId ? 'border-bronze bg-bronze/5 text-charcoal dark:text-white' : 'border-transparent text-slate hover:text-bronze hover:bg-slate/5'}`}
                            >
                                {pillar.channelId}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate/10">
                        <button 
                            onClick={handleNewPostClick}
                            className="w-full py-4 bg-charcoal dark:bg-concrete text-alabaster dark:text-charcoal uppercase tracking-widest text-xs font-bold hover:bg-bronze dark:hover:bg-bronze hover:text-white transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                            <Plus size={14} /> {t.newPost[lang]}
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
                <h2 className={`text-3xl ${headingFont}`}>{isAr ? 'سجل الموقع العام' : 'General Site Log'}</h2>
                <div className="flex items-center gap-2 text-xs text-slate">
                    <Filter size={12} />
                    <span className="uppercase tracking-widest">{activeFilter}</span>
                </div>
            </div>

            <div className="space-y-6">
              {COMMUNITY_POSTS.map((post) => (
                <motion.div 
                    key={post.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-white/5 border border-slate/10 hover:border-bronze/50 transition-colors group relative overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                >
                   {/* Blueprint Grid Background */}
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none architectural-grid"></div>
                   
                   <div className="p-6 md:p-8">
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
                                   <span className="text-[0.5rem] text-slate/50 font-mono px-1 border border-slate/20 rounded">#{post.id.toUpperCase()}</span>
                               </h4>
                               <span className="text-[0.6rem] text-bronze uppercase tracking-widest">{post.role[lang]}</span>
                            </div>
                         </div>
                         <div className="text-[0.6rem] text-slate uppercase tracking-widest bg-slate/5 px-2 py-1 border border-slate/10">
                            {post.phase}
                         </div>
                      </div>

                      {/* Content */}
                      <h3 className={`text-xl mb-3 ${headingFont} group-hover:text-bronze transition-colors`}>{post.title[lang]}</h3>
                      <p className={`text-sm text-slate dark:text-slate/80 leading-relaxed mb-6 ${bodyFont} line-clamp-3`}>
                         {post.content[lang]}
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
                         <button className="flex items-center gap-2 text-slate hover:text-bronze transition-colors text-[0.65rem] uppercase tracking-widest font-bold">
                            <Award size={14} />
                            <span>{t.actions.endorse[lang]} ({post.endorsements})</span>
                         </button>
                         <button className="flex items-center gap-2 text-slate hover:text-bronze transition-colors text-[0.65rem] uppercase tracking-widest font-bold">
                            <MessageCircle size={14} />
                            <span>{t.actions.review[lang]} ({post.reviews.length})</span>
                         </button>
                         <span className="ml-auto text-[0.6rem] text-slate/40">{post.timestamp}</span>
                      </div>
                   </div>
                   {/* Hover Indicator */}
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-bronze transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </motion.div>
              ))}
              
              <div className="py-8 text-center border-t border-dashed border-slate/20">
                  <button className="text-xs text-slate hover:text-bronze uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
                      <Activity size={14} />
                      {isAr ? 'تحميل سجلات أقدم' : 'Load Archived Logs'}
                  </button>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Top Builders (Desktop Only) */}
          <div className="hidden lg:block w-1/4 order-3">
             <div className="sticky top-32">
                 <div className="bg-white dark:bg-white/5 border border-slate/10 p-6">
                    <h3 className={`text-xs uppercase tracking-widest text-slate mb-6 flex items-center gap-2 font-bold`}>
                        <Award size={14} /> {isAr ? 'كبار البنائين' : 'Top Architects'}
                    </h3>
                    
                    <div className="space-y-6">
                        {TOP_BUILDERS.map((member, i) => (
                            <div key={member.id} className="flex items-center gap-3 group cursor-pointer">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-alabaster dark:bg-charcoal border border-slate/10 rounded-full flex items-center justify-center font-serif text-sm text-charcoal dark:text-concrete group-hover:border-bronze transition-colors">
                                        {member.avatarChar}
                                    </div>
                                    {i === 0 && <div className="absolute -top-1 -right-1 text-bronze"><Star size={10} fill="currentColor" /></div>}
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
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
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
                            <h2 className={`text-3xl md:text-4xl mb-6 ${headingFont}`}>{selectedPost.title[lang]}</h2>
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate/10">
                                <div className="w-12 h-12 bg-charcoal text-alabaster rounded-full flex items-center justify-center font-serif text-xl">
                                    {selectedPost.author.charAt(0)}
                                </div>
                                <div>
                                    <div className={`text-lg font-bold ${headingFont}`}>{selectedPost.author}</div>
                                    <div className="text-xs text-slate uppercase tracking-widest">{selectedPost.role[lang]}</div>
                                </div>
                            </div>
                            <p className={`text-lg text-charcoal dark:text-concrete leading-relaxed mb-8 ${bodyFont}`}>
                                {selectedPost.content[lang]}
                            </p>
                            
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-bronze/10 text-bronze hover:bg-bronze hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Award size={16} /> {t.actions.endorse[lang]} ({selectedPost.endorsements})
                                </button>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white dark:bg-white/5 border border-slate/10 p-8">
                            <h3 className={`text-sm uppercase tracking-widest text-slate mb-8 flex items-center gap-2 font-bold`}>
                                <MessageCircle size={16} /> {isAr ? 'مراجعات الأقران (التعليقات)' : 'Peer Reviews'}
                            </h3>
                            
                            {selectedPost.reviews.length > 0 ? (
                                <div className="space-y-8">
                                    {selectedPost.reviews.map(review => (
                                        <div key={review.id} className="flex gap-4">
                                            <div className="w-8 h-8 bg-slate/10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-serif border border-slate/20">
                                                {review.author.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-sm font-bold ${headingFont}`}>{review.author}</span>
                                                    <span className="text-[0.6rem] text-slate uppercase tracking-widest">{review.timestamp}</span>
                                                </div>
                                                <p className={`text-sm text-slate dark:text-slate/80 leading-relaxed mb-2 ${bodyFont}`}>
                                                    {review.content[lang]}
                                                </p>
                                                <button className="text-[0.6rem] text-bronze hover:underline flex items-center gap-1">
                                                    <Check size={10} /> Helpful ({review.isHelpful})
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate/40 text-sm italic">
                                    {isAr ? 'لا توجد مراجعات بعد. كن أول من يقدم النصيحة الهندسية.' : 'No peer reviews yet. Be the first to offer structural advice.'}
                                </div>
                            )}

                            {/* Comment Input Mock */}
                            <div className="mt-8 pt-8 border-t border-slate/10 flex gap-4">
                                <div className="w-8 h-8 bg-charcoal text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-serif">
                                    {isMember ? 'M' : '?'}
                                </div>
                                <div className="flex-1">
                                    <textarea 
                                        placeholder={isAr ? 'اكتب ملاحظاتك الفنية هنا...' : 'Submit your technical review here...'} 
                                        rows={3}
                                        className="w-full bg-transparent border border-slate/20 p-3 text-sm focus:border-bronze outline-none transition-colors resize-none mb-2"
                                    ></textarea>
                                    <button className="float-right px-6 py-2 bg-charcoal dark:bg-concrete text-white dark:text-charcoal text-xs uppercase tracking-widest font-bold hover:opacity-80">
                                        {isAr ? 'إرسال المراجعة' : 'Submit Review'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}

        {/* Registration Modal */}
        {showRegisterModal && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-darkBg/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-alabaster dark:bg-[#1A1A1A] w-full max-w-lg border border-bronze/50 shadow-2xl relative"
                >
                    <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 text-slate hover:text-bronze"><X /></button>
                    
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <span className="text-bronze text-[0.6rem] uppercase tracking-[0.3em] block mb-2">Guild Protocol 1.0</span>
                            <h2 className={`text-3xl ${headingFont} text-charcoal dark:text-concrete`}>{isAr ? 'طلب عضوية' : 'Membership Application'}</h2>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsMember(true); setShowRegisterModal(false); }}>
                            <div>
                                <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'الاسم الهندسي' : 'Codename / Name'}</label>
                                <input required type="text" className="w-full bg-transparent border-b border-slate/30 py-2 text-charcoal dark:text-concrete focus:border-bronze outline-none transition-colors" />
                            </div>
                            <div>
                                <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'البريد الإلكتروني' : 'Secure Frequency (Email)'}</label>
                                <input required type="email" className="w-full bg-transparent border-b border-slate/30 py-2 text-charcoal dark:text-concrete focus:border-bronze outline-none transition-colors" />
                            </div>
                            <div>
                                <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'الرتبة الحالية' : 'Current Status'}</label>
                                <select className="w-full bg-transparent border-b border-slate/30 py-2 text-charcoal dark:text-concrete focus:border-bronze outline-none transition-colors appearance-none rounded-none">
                                    <option className="bg-alabaster dark:bg-darkBg">{isAr ? 'مبتدئ (مرحلة الحفر)' : 'Novice (Excavation Phase)'}</option>
                                    <option className="bg-alabaster dark:bg-darkBg">{isAr ? 'بناء (مرحلة الهيكل)' : 'Builder (Structure Phase)'}</option>
                                    <option className="bg-alabaster dark:bg-darkBg">{isAr ? 'معماري (مرحلة التصميم)' : 'Architect (Design Phase)'}</option>
                                </select>
                            </div>
                            <div className="flex items-start gap-3 pt-4">
                                <input type="checkbox" required id="oath" className="mt-1 accent-bronze" />
                                <label htmlFor="oath" className={`text-xs text-slate leading-relaxed ${bodyFont}`}>
                                    {isAr 
                                     ? 'أقر بأنني سأحترم قوانين البناء، وأنني أسعى لترميم ذاتي ومساعدة الآخرين بصدق.'
                                     : 'I solemnly swear to uphold the laws of construction, to seek self-restoration, and to assist others with integrity.'}
                                </label>
                            </div>
                            <button type="submit" className="w-full py-4 bg-charcoal dark:bg-bronze text-white uppercase tracking-widest text-sm hover:bg-black dark:hover:bg-bronze/80 transition-colors mt-4">
                                {isAr ? 'تقديم الطلب' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        )}

        {/* New Post Modal */}
        {showPostModal && (
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-darkBg/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-alabaster dark:bg-[#1A1A1A] w-full max-w-2xl border border-bronze/50 shadow-2xl relative"
                >
                    <button onClick={() => setShowPostModal(false)} className="absolute top-4 right-4 text-slate hover:text-bronze"><X /></button>
                    
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <span className="text-bronze text-[0.6rem] uppercase tracking-[0.3em] block mb-2">Schematic Submission</span>
                            <h2 className={`text-3xl ${headingFont} text-charcoal dark:text-concrete`}>{isAr ? 'طرح مخطط جديد' : 'New Blueprint'}</h2>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowPostModal(false); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'القسم' : 'Sector'}</label>
                                    <select className="w-full bg-transparent border-b border-slate/30 py-2 text-charcoal dark:text-concrete focus:border-bronze outline-none transition-colors appearance-none rounded-none">
                                        {PILLARS.map(p => <option key={p.id} className="bg-alabaster dark:bg-darkBg">{p.channelId}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'نوع المخطط' : 'Blueprint Type'}</label>
                                    <select className="w-full bg-transparent border-b border-slate/30 py-2 text-charcoal dark:text-concrete focus:border-bronze outline-none transition-colors appearance-none rounded-none">
                                        <option className="bg-alabaster dark:bg-darkBg">{isAr ? 'طلب استشارة' : 'Consultation Request'}</option>
                                        <option className="bg-alabaster dark:bg-darkBg">{isAr ? 'مشاركة تجربة' : 'Experience Share'}</option>
                                        <option className="bg-alabaster dark:bg-darkBg">{isAr ? 'تقرير تقدم' : 'Progress Report'}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'عنوان المخطط' : 'Subject'}</label>
                                <input required type="text" placeholder={isAr ? 'مثال: تصدعات في جدار الثقة...' : 'Ex: Cracks in confidence wall...'} className="w-full bg-transparent border-b border-slate/30 py-2 text-charcoal dark:text-concrete focus:border-bronze outline-none transition-colors" />
                            </div>
                            
                            <div>
                                <label className={`block text-xs uppercase tracking-widest text-slate mb-2 ${bodyFont}`}>{isAr ? 'تفاصيل الحالة' : 'Technical Details'}</label>
                                <textarea required rows={5} className="w-full bg-slate/5 dark:bg-white/5 p-4 text-charcoal dark:text-concrete focus:border focus:border-bronze outline-none transition-colors resize-none" placeholder={isAr ? 'اشرح المشكلة الهندسية التي تواجهها...' : 'Describe the architectural issue you are facing...'}></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-charcoal dark:bg-bronze text-white uppercase tracking-widest text-sm hover:bg-black dark:hover:bg-bronze/80 transition-colors mt-4">
                                {isAr ? 'نشر المخطط' : 'Publish Blueprint'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};


export type Language = 'ar' | 'en' | 'fr';

export type View = 'home' | 'philosophy' | 'journal' | 'library' | 'contact' | 'landing' | 'checkout' | 'community' | 'register' | 'dashboard' | 'about';

export interface ContentText {
  ar: string;
  en: string;
  fr: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  rank: string; // Dynamic Rank Title
  rankColor?: string; // Hex Code for Badge
  level: number; // Current Day Level
  xp: number;
  projects: number;
  endorsed: number;
  joinedDate: string;
  avatarChar: string;
  avatarImage?: string; 
}

// New Interface for the Feed
export interface SiteLogEntry {
    id: string;
    author: string;
    authorAvatar?: string;
    authorChar: string;
    dayNumber: number; // Which day they are on
    content: string;
    timestamp: string;
    likes: number;
}

export interface PillarData {
  id: string;
  title: ContentText;
  description: ContentText;
  fullContent?: ContentText;
  image: string;
  blueprintImage?: string; 
  channelId?: string;
}

export interface BlogPost {
  id: string;
  category: 'mind' | 'body' | 'spirit';
  title: ContentText;
  date: string;
  excerpt: ContentText;
  content?: ContentText; 
  image: string;
}

export interface Product {
  id: string;
  category: 'book' | 'art' | 'tool' | 'course' | 'bundle';
  name: ContentText;
  description?: ContentText;
  price: number;
  originalPrice?: number; 
  type: 'physical' | 'digital' | 'hybrid';
  image: string;
  specs?: { label: ContentText; value: ContentText }[];
  status?: 'available' | 'coming_soon' | 'in_dev';
  panels?: number; 
  aiPrompt?: string; 
  features?: ContentText[]; 
  isBestSeller?: boolean;
}

export enum AssessmentCategory {
  FOUNDATION = 'Foundation', 
  STRUCTURE = 'Structure', 
  INTERIOR = 'Interior', 
  EXTERIOR = 'Exterior', 
}

export interface DayPlan {
  day: number;
  title: ContentText;
  task: ContentText;
  visualConcept?: ContentText;
  aiPrompt?: string;
  isLocked: boolean;
}

export interface WeekPlan {
  id: number;
  title: ContentText;
  focus: ContentText;
  days: DayPlan[];
}

export interface BookChapterPreview {
    id: string;
    number: string;
    title: ContentText;
    desc: ContentText;
    isLocked: boolean;
    relatedArtId?: string;
    relatedBlogId?: string;
}

export interface PeerReview {
  id: string;
  author: string;
  role: ContentText | string;
  content: ContentText | string;
  timestamp: string;
  isHelpful?: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: ContentText | string;
  rankLevel: number;
  phase: string;
  title: ContentText | string;
  content: ContentText | string;
  endorsements: number;
  reviews: PeerReview[];
  tags?: string[];
  timestamp: string;
  type?: 'standard' | 'emergency'; 
  isSolved?: boolean; 
  status?: 'approved' | 'pending' | 'rejected'; 
}

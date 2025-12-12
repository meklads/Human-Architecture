

export type Language = 'ar' | 'en' | 'fr';

export type View = 'home' | 'philosophy' | 'journal' | 'library' | 'contact' | 'landing' | 'checkout' | 'community';

export interface ContentText {
  ar: string;
  en: string;
  fr: string;
}

export interface PillarData {
  id: string;
  title: ContentText;
  description: ContentText;
  fullContent?: ContentText;
  image: string;
  channelId?: string;
}

export interface BlogPost {
  id: string;
  category: 'mind' | 'body' | 'spirit';
  title: ContentText;
  date: string;
  excerpt: ContentText;
  content?: ContentText; // Full content for the internal page
  image: string;
}

export interface Product {
  id: string;
  category: 'book' | 'art' | 'tool' | 'course';
  name: ContentText;
  description?: ContentText;
  price: number;
  type: 'physical' | 'digital';
  image: string;
  specs?: { label: ContentText; value: ContentText }[];
  status?: 'available' | 'coming_soon' | 'in_dev';
  panels?: number; // 1 = single, 3 = triptych, 4 = quadriptych
  aiPrompt?: string; // For Art/Tools generative reproduction
}

export enum AssessmentCategory {
  FOUNDATION = 'Foundation', // Basics/Body
  STRUCTURE = 'Structure', // Mind/Mental
  INTERIOR = 'Interior', // Soul/Spirit
  EXTERIOR = 'Exterior', // Social
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
}

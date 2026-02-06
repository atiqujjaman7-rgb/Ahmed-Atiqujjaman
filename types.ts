
export enum AppTab {
  FEED = 'FEED',
  HUB = 'HUB',
  SHOP = 'SHOP',
  SOCIAL = 'SOCIAL',
  CLUB = 'CLUB'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  membershipDate: string;
  isVerified: boolean;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  category: 'Match' | 'Update' | 'Blog' | 'RSS';
  imageUrl: string;
  source?: string;
}

export interface OpinionPost {
  id: string;
  userName: string;
  userId: string;
  content: string;
  timestamp: string;
  isVerified: boolean;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  socialLink: string;
  rank: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  event: string;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GameState {
  score: number;
  questionsAnswered: number;
  isGameOver: boolean;
}


import { NewsItem, Product, Event, CommitteeMember, HistoryEvent, GalleryImage } from './types';

export const COLORS = {
  deepGreen: '#012e1f',
  brightGreen: '#006a4e',
  ukbuRed: '#da291c',
  white: '#ffffff',
  accent: '#f7f7f7'
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'rss-1',
    title: 'Bangladesh to face England in friendly match?',
    summary: 'Rumors are swirling about a potential high-profile friendly in London.',
    content: 'Reports from Dhaka suggest that the Bangladesh Football Federation is in talks with English counterparts for a friendly match at a London stadium in 2025. This would be a historic moment for the diaspora community.',
    date: 'Oct 20, 2023',
    category: 'RSS',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    source: 'The Daily Star'
  },
  {
    id: '1',
    title: 'Match Day: UKBU vs North Eagles',
    summary: 'The biggest rivalry of the season is here. Kickoff at 3 PM this Saturday.',
    date: 'Oct 14, 2023',
    category: 'Match',
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'From Dhaka to London: Our Journey',
    summary: 'A deep dive into how UKBU became the leading supporters group in the UK.',
    content: 'It started in a small cafe in East London with five fans. Today, we have thousands across the country.',
    date: 'Oct 10, 2023',
    category: 'Blog',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_HISTORY: HistoryEvent[] = [
  { year: '2018', title: 'The Founding', description: 'Five friends gathered in East London to support the Bangladesh national team during their UK tour.' },
  { year: '2020', title: 'Official Recognition', description: 'Received official status as a recognized supporters group by the BFF.' },
  { year: '2022', title: 'The First Ultras Match', description: 'Hosted our first organized amateur tournament with over 200 participants.' },
  { year: '2024', title: 'Digital Era', description: 'Launched the official UKBU digital membership platform.' }
];

export const MOCK_OPINIONS = [
  { id: 'op1', userName: 'Kazi Ahmed', userId: 'UBU-772', content: 'The defense was rock solid today! We need to keep this momentum.', timestamp: '2h ago', isVerified: true },
  { id: 'op2', userName: 'Sabina Khan', userId: 'UBU-102', content: 'When is the next scarf drop? I missed the last one!', timestamp: '5h ago', isVerified: true }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Official 24/25 Home Jersey', price: 45.00, image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=400&auto=format&fit=crop', category: 'Apparel' },
  { id: 'p2', name: 'Supporters Scarf - "Heritage"', price: 15.00, image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=400&auto=format&fit=crop', category: 'Accessories' }
];

export const MOCK_EVENTS: Event[] = [
  { id: 'e1', title: 'Monthly Community Meetup', date: '2023-11-05', time: '18:00', location: 'East Ham Community Center', description: 'Tea, snacks, and planning for the winter season.' }
];

export const MOCK_COMMITTEE: CommitteeMember[] = [
  { id: 'c1', name: 'Faisal Ahmed', role: 'President', imageUrl: 'https://i.pravatar.cc/150?u=faisal', bio: 'Life-long supporter bridging gaps through sports.', socialLink: '#', rank: 1 },
  { id: 'c2', name: 'Shamim Hussain', role: 'General Secretary', imageUrl: 'https://i.pravatar.cc/150?u=shamim', bio: 'Dedicated to organizational excellence.', socialLink: '#', rank: 2 }
];

export const MOCK_GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop', caption: 'Flare Show at the London Stadium', event: 'UK Tour 2024' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop', caption: 'The Red Sea in East Ham', event: 'Matchday Live' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800&auto=format&fit=crop', caption: 'Pre-match huddle at community cup', event: 'Community Cup' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800&auto=format&fit=crop', caption: 'Young Ultras representing at the park', event: 'Training Session' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop', caption: 'Community Outreach Program', event: 'Winter Aid 2023' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1511406384665-271c70e791e5?q=80&w=800&auto=format&fit=crop', caption: 'The flags flying high in Stratford', event: 'Parade Day' }
];

export const MOCK_SOCIAL_POSTS = [
  "Twitter: Incredible atmosphere today at the Emirates! #UKBU squad was out in full force.",
  "Instagram: Check out our new training session highlights from East London.",
  "Facebook: Meeting with the Bangladesh Football Federation confirmed for next month."
];

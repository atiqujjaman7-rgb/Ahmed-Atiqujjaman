
import React, { useState, useEffect } from 'react';
import { UserProfile, OpinionPost } from '../types';
import DigitalCard from './DigitalCard';
import GameCenter from './GameCenter';
import { getAISocialSummary, moderateContent } from '../services/geminiService';
import { MOCK_SOCIAL_POSTS, MOCK_OPINIONS } from '../constants';
import { UserPlus, ShieldCheck, LogOut, Youtube, MessageCircle, Music, Radio, Sparkles, Send, AlertCircle, Gamepad2, Lock, Wallet } from 'lucide-react';

const MembershipHub: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [socialRecap, setSocialRecap] = useState<string>('Syncing community activity...');
  const [loadingSocial, setLoadingSocial] = useState(true);
  const [opinions, setOpinions] = useState<OpinionPost[]>(MOCK_OPINIONS);
  const [newOpinion, setNewOpinion] = useState('');
  const [moderating, setModerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ukbu_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) {
      const fetchRecap = async () => {
        const recap = await getAISocialSummary(MOCK_SOCIAL_POSTS);
        setSocialRecap(recap || '');
        setLoadingSocial(false);
      };
      fetchRecap();
    }
  }, [user]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `UKBU-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      email: formData.email,
      membershipDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      isVerified: true // Mocking verification for demo
    };
    setUser(newUser);
    localStorage.setItem('ukbu_user', JSON.stringify(newUser));
  };

  const handleSubmitOpinion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpinion.trim() || !user) return;

    setModerating(true);
    setError(null);
    const moderationResult = await moderateContent(newOpinion);

    if (moderationResult === "SAFE") {
      const post: OpinionPost = {
        id: Math.random().toString(),
        userName: user.name,
        userId: user.id,
        content: newOpinion,
        timestamp: 'Just now',
        isVerified: user.isVerified
      };
      setOpinions([post, ...opinions]);
      setNewOpinion('');
    } else {
      setError("Your post was flagged by our moderation tool for community standards.");
    }
    setModerating(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('ukbu_user');
    setUser(null);
  };

  if (user) {
    return (
      <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Wallet Section */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
            <Wallet className="w-3 h-3 text-[#da291c]" />
            <span className="text-[9px] font-black uppercase text-white/50 tracking-[0.2em]">Digital Credentials</span>
          </div>
          <DigitalCard user={user} />
        </div>

        {/* AI Game Center Section */}
        {user.isVerified ? (
          <section>
            <div className="bg-gradient-to-br from-[#da291c] to-[#911b12] rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                <Gamepad2 className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white">AI Powered</span>
                  </div>
                </div>
                <h3 className="heading-font text-2xl font-black text-white mb-2 uppercase">The Game Center</h3>
                <p className="text-white/80 text-xs font-medium mb-6 max-w-[200px]">Prove your knowledge. Earn bragging rights. Beat the AI.</p>
                <button 
                  onClick={() => setShowGame(true)}
                  className="bg-white text-[#da291c] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2"
                >
                  Play Terrace Trivia <Gamepad2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-white/5 border border-dashed border-white/20 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
            <Lock className="w-8 h-8 text-white/20 mb-4" />
            <h3 className="heading-font text-white/40 text-lg font-black uppercase">Game Center Locked</h3>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">Verification Required</p>
          </section>
        )}

        {/* Community Wall Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#da291c] animate-pulse" />
              <h3 className="heading-font text-xl font-black text-white">The Opinion Terrace</h3>
            </div>
            <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Verified Only</span>
          </div>

          {/* AI Recap */}
          <div className="bg-emerald-900/30 border border-white/5 p-6 rounded-[2rem] relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">AI Social Recap</span>
            </div>
            <p className="text-white/80 text-sm italic font-medium">
              {loadingSocial ? 'Scanning social channels...' : `"${socialRecap}"`}
            </p>
          </div>

          {/* Post Form */}
          <form onSubmit={handleSubmitOpinion} className="space-y-3">
            <div className="relative">
              <textarea 
                placeholder="Share your thoughts with the squad..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#da291c] min-h-[100px] resize-none"
                value={newOpinion}
                onChange={(e) => setNewOpinion(e.target.value)}
              />
              <button 
                type="submit"
                disabled={moderating || !newOpinion.trim()}
                className="absolute bottom-4 right-4 bg-[#da291c] p-2 rounded-xl text-white shadow-lg active:scale-95 disabled:opacity-50 transition-all"
              >
                {moderating ? <Radio className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-[#da291c] text-[10px] font-bold uppercase px-2 animate-bounce">
                <AlertCircle className="w-3 h-3" /> {error}
              </div>
            )}
          </form>

          {/* Opinions Feed */}
          <div className="space-y-4">
            {opinions.map(opinion => (
              <div key={opinion.id} className="bg-white/5 border border-white/5 p-5 rounded-3xl hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#da291c]/20 flex items-center justify-center text-[#da291c] font-black text-xs">
                      {opinion.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-xs">{opinion.userName}</span>
                        {opinion.isVerified && <ShieldCheck className="w-3 h-3 text-[#da291c]" />}
                      </div>
                      <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest">{opinion.userId}</span>
                    </div>
                  </div>
                  <span className="text-white/20 text-[8px] font-bold uppercase">{opinion.timestamp}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{opinion.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links Hub */}
        <div className="grid grid-cols-2 gap-3">
          <a href="#" className="bg-[#FF0000]/10 border border-[#FF0000]/20 p-4 rounded-2xl flex flex-col items-center text-center gap-2 group">
             <Youtube className="w-6 h-6 text-[#FF0000]" />
             <span className="text-[9px] font-black uppercase text-white/50 tracking-widest group-hover:text-white transition-colors">Highlights</span>
          </a>
          <a href="#" className="bg-[#25D366]/10 border border-[#25D366]/20 p-4 rounded-2xl flex flex-col items-center text-center gap-2 group">
             <MessageCircle className="w-6 h-6 text-[#25D366]" />
             <span className="text-[9px] font-black uppercase text-white/50 tracking-widest group-hover:text-white transition-colors">WhatsApp</span>
          </a>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full py-4 border border-white/5 rounded-2xl text-white/20 hover:text-white/60 text-[10px] uppercase font-black tracking-[0.2em] transition-all"
        >
          Logout of Profile
        </button>

        {/* Game Center Modal */}
        {showGame && <GameCenter onClose={() => setShowGame(false)} />}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-xs mx-auto">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
           <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="heading-font text-3xl font-extrabold text-white mb-3 tracking-tighter">Enlist with the Ultras</h2>
        <p className="text-white/40 text-xs font-medium leading-relaxed uppercase tracking-widest">Digital credentials await the loyal.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
          <div className="relative">
            <input 
              required
              type="text" 
              className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#da291c] transition-all"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <label className="absolute left-0 top-0 text-white/30 text-[10px] uppercase font-black tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#da291c]">Full Name</label>
          </div>
          <div className="relative">
            <input 
              required
              type="email" 
              className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#da291c] transition-all"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <label className="absolute left-0 top-0 text-white/30 text-[10px] uppercase font-black tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#da291c]">Email Address</label>
          </div>
        </div>
        <button 
          type="submit"
          className="w-full py-6 bg-[#da291c] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-[#c02418] transition-all active:scale-95"
        >
          Generate Member ID
        </button>
      </form>
    </div>
  );
};

export default MembershipHub;

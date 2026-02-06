
import React, { useState } from 'react';
import { AppTab } from './types';
import Feed from './components/Feed';
import MembershipHub from './components/MembershipHub';
import Shop from './components/Shop';
import Terrace from './components/Terrace';
import SocialMedia from './components/SocialMedia';
import Chatbot from './components/Chatbot';
import { Home, User, ShoppingBag, Shield, Share2, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.FEED);
  const [showChat, setShowChat] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.FEED: return <Feed />;
      case AppTab.HUB: return <MembershipHub />;
      case AppTab.SHOP: return <Shop />;
      case AppTab.SOCIAL: return <SocialMedia />;
      case AppTab.CLUB: return <Terrace />;
      default: return <Feed />;
    }
  };

  return (
    <div className="min-h-screen pb-32 max-w-lg mx-auto bg-emerald-950 text-white selection:bg-[#da291c] selection:text-white">
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="heading-font text-2xl font-black tracking-tighter text-white">
                UKBU
              </h1>
              <span className="w-1.5 h-1.5 bg-[#da291c] rounded-full animate-pulse shadow-[0_0_8px_rgba(218,41,28,0.8)]"></span>
            </div>
            <p className="text-[9px] text-white/40 uppercase tracking-[0.25em] font-black">Official Supporter Hub</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/60">London</span>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 relative pt-4">
        {renderContent()}
      </main>

      {/* Floating Action Button for Chat */}
      {!showChat && (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-32 right-6 z-[60] w-14 h-14 bg-[#da291c] text-white rounded-2xl shadow-[0_15px_30px_-10px_rgba(218,41,28,0.6)] flex items-center justify-center animate-in zoom-in-50 duration-300 hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chatbot Interface */}
      {showChat && <Chatbot onClose={() => setShowChat(false)} />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-emerald-950/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex justify-between items-center shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
        <NavButton 
          active={activeTab === AppTab.FEED} 
          onClick={() => setActiveTab(AppTab.FEED)}
          icon={<Home className="w-5 h-5" />}
          label="Feed"
        />
        <NavButton 
          active={activeTab === AppTab.HUB} 
          onClick={() => setActiveTab(AppTab.HUB)}
          icon={<User className="w-5 h-5" />}
          label="Hub"
        />
        <NavButton 
          active={activeTab === AppTab.SHOP} 
          onClick={() => setActiveTab(AppTab.SHOP)}
          icon={<ShoppingBag className="w-5 h-5" />}
          label="Shop"
        />
        <NavButton 
          active={activeTab === AppTab.SOCIAL} 
          onClick={() => setActiveTab(AppTab.SOCIAL)}
          icon={<Share2 className="w-5 h-5" />}
          label="Social"
        />
        <NavButton 
          active={activeTab === AppTab.CLUB} 
          onClick={() => setActiveTab(AppTab.CLUB)}
          icon={<Shield className="w-5 h-5" />}
          label="Club"
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button 
      onClick={onClick}
      className={`group flex flex-col items-center justify-center flex-1 py-3 relative rounded-[2rem] transition-all duration-300 ${
        active ? 'text-white' : 'text-white/30 hover:text-white/50'
      }`}
    >
      {/* Background Pill */}
      <div className={`absolute inset-1 rounded-[1.8rem] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        active 
          ? 'bg-white/10 opacity-100 scale-100' 
          : 'bg-white/0 opacity-0 scale-75'
      }`}></div>

      <div className={`relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        active ? '-translate-y-1' : 'translate-y-0'
      } ${active ? 'animate-nav-active' : ''}`}>
        {icon}
      </div>
      
      <span className={`relative z-10 text-[7px] uppercase font-black tracking-widest mt-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        {label}
      </span>

      {/* Active Indicator Dot */}
      <div className={`absolute bottom-2 w-1 h-1 bg-[#da291c] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(218, 41, 28, 1)] ${
        active ? 'scale-100 opacity-100 glow-pulse' : 'scale-0 opacity-0'
      }`}></div>
    </button>
  );
};

export default App;

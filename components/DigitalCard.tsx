
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { Share2, Download, ShieldCheck, Copy, Check, QrCode, RefreshCw } from 'lucide-react';

interface DigitalCardProps {
  user: UserProfile;
}

const DigitalCard: React.FC<DigitalCardProps> = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const copyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm perspective-1000 group">
      {/* 3D Wrapper */}
      <div 
        ref={cardRef}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          transform: `rotateY(${isFlipped ? 180 : rotate.y}deg) rotateX(${isFlipped ? 0 : rotate.x}deg)`,
          transition: isFlipped ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.1s ease-out'
        }}
        className="relative aspect-[1.6/1] w-full preserve-3d cursor-pointer"
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden rounded-[2.5rem] p-1 bg-gradient-to-br from-white/20 to-transparent shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[#012e1f] rounded-[2.4rem] overflow-hidden">
            {/* Jersey Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* Holographic Flash */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ transform: `translateX(${(rotate.y * 10)}%)` }}
            ></div>

            {/* Red Sun Decorative Element */}
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#da291c] rounded-full opacity-40 blur-[80px] group-hover:scale-125 transition-transform duration-1000"></div>
            
            <div className="relative h-full flex flex-col justify-between p-7 z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#da291c] rounded-2xl flex items-center justify-center border border-white/20 shadow-lg relative">
                    <span className="heading-font font-black text-white text-2xl">U</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#012e1f] animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="heading-font font-black text-2xl tracking-tighter text-white">UKBU</h2>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5 text-[#da291c]" />
                      <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/50">Verified Ultra</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-2xl">
                  <RefreshCw className="w-4 h-4 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
                </div>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-black">Membership Name</p>
                <p className="heading-font text-2xl font-black tracking-tight text-white uppercase">{user.name}</p>
              </div>

              <div className="flex justify-between items-end">
                <button 
                  onClick={copyId}
                  className="group/btn flex flex-col items-start transition-all active:scale-95"
                >
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-black flex items-center gap-1 group-hover/btn:text-[#da291c]">
                    Member ID {copied ? <Check className="w-2 h-2" /> : <Copy className="w-2 h-2" />}
                  </p>
                  <p className="font-mono text-xl font-black tracking-widest text-[#da291c] flex items-center gap-2">
                    {user.id}
                  </p>
                </button>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-black">Since</p>
                  <p className="text-sm font-black text-white">{user.membershipDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rounded-[2.5rem] p-1 bg-gradient-to-tr from-[#da291c] to-[#012e1f] shadow-2xl transform rotateY-180 overflow-hidden">
          <div className="absolute inset-0 bg-[#011a11] rounded-[2.4rem] flex flex-col items-center justify-center p-8 gap-6">
            <div className="absolute top-0 inset-x-0 h-16 bg-[#da291c]/10 flex items-center justify-center border-b border-white/5">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Official Match Entry</span>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500">
               <QrCode className="w-32 h-32 text-black" />
            </div>

            <div className="text-center space-y-1">
              <p className="text-white font-black text-xs uppercase tracking-widest">Digital Pass</p>
              <p className="text-white/40 text-[9px] max-w-[180px] leading-relaxed">Present this code at any UKBU affiliated venue or stadium gate for exclusive entry.</p>
            </div>

            <div className="absolute bottom-6 flex gap-4">
              <div className="w-1.5 h-1.5 bg-[#da291c] rounded-full animate-ping"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping delay-75"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping delay-150"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Controls */}
      <div className="flex gap-3 mt-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 group hover:bg-white/10 transition-all">
          <Download className="w-4 h-4 text-white/40 group-hover:text-white" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">To Wallet</span>
        </button>
        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 group hover:bg-white/10 transition-all">
          <Share2 className="w-4 h-4 text-white/40 group-hover:text-[#da291c]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">Brag Rights</span>
        </button>
      </div>

      {/* Interactive Helper */}
      <div className="text-center mt-4">
        <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
          <RefreshCw className="w-2.5 h-2.5" /> Tap to flip card
        </p>
      </div>
    </div>
  );
};

export default DigitalCard;

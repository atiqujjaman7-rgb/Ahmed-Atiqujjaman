
import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Globe, 
  ExternalLink,
  Share2
} from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    handle: '@ukbd_ultras',
    icon: <Instagram className="w-6 h-6" />,
    color: '#E1306C',
    link: 'https://instagram.com/ukbd_ultras',
    description: 'Latest photos from the terrace'
  },
  {
    name: 'Facebook',
    handle: '@ukbdultras',
    icon: <Facebook className="w-6 h-6" />,
    color: '#4267B2',
    link: 'https://facebook.com/ukbdultras',
    description: 'Community events & discussions'
  },
  {
    name: 'YouTube',
    handle: '@UkBangladeshUltras',
    icon: <Youtube className="w-6 h-6" />,
    color: '#FF0000',
    link: 'https://www.youtube.com/@UkBangladeshUltras',
    description: 'Highlights & match vlogs'
  },
  {
    name: 'WhatsApp',
    handle: 'The Squad Chat',
    icon: <MessageCircle className="w-6 h-6" />,
    color: '#25D366',
    link: 'https://whatsapp.com',
    description: 'Direct community access'
  },
  {
    name: 'Official Site',
    handle: 'ukultras.wordpress.com',
    icon: <Globe className="w-6 h-6" />,
    color: '#006a4e',
    link: 'https://ukultras.wordpress.com',
    description: 'Official announcements'
  }
];

const SocialMedia: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10 mb-4">
          <Share2 className="w-6 h-6 text-[#da291c]" />
        </div>
        <h2 className="heading-font text-3xl font-black text-white tracking-tighter uppercase">The Network</h2>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">United Across Every Platform</p>
      </div>

      <div className="grid gap-4">
        {SOCIAL_LINKS.map((social) => (
          <a 
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center justify-between transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${social.color}20`, color: social.color }}
              >
                {social.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-none mb-1">{social.name}</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{social.handle}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#da291c] group-hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span className="text-[8px] text-white/20 uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                {social.description}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-[#da291c] to-[#9a1a14] rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="heading-font text-xl font-black text-white mb-2 uppercase">Hashtag The Squad</h3>
          <p className="text-white/70 text-sm font-medium mb-6">Use <span className="text-white font-bold">#UKBU</span> and <span className="text-white font-bold">#UltrasBD</span> to get featured on our live terrace wall.</p>
          <div className="flex justify-center gap-2">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-widest uppercase">#UKBU</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-widest uppercase">#UltrasBD</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Share2 className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;

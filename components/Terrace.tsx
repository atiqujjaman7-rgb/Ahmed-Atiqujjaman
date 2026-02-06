
import React, { useState } from 'react';
import { MOCK_EVENTS, MOCK_COMMITTEE, MOCK_HISTORY, MOCK_GALLERY } from '../constants';
import { CommitteeMember, GalleryImage } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Mail, 
  Globe, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  History, 
  Image as ImageIcon, 
  Camera,
  Award,
  ChevronRight,
  Linkedin,
  Instagram
} from 'lucide-react';

const Terrace: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Separate leadership for different styling
  const sortedCommittee = [...MOCK_COMMITTEE].sort((a, b) => a.rank - b.rank);
  const executives = sortedCommittee.filter(m => m.rank <= 2);
  const boardMembers = sortedCommittee.filter(m => m.rank > 2);

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-12">
      {/* Top Section: About UBU */}
      <section className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <ShieldCheck className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-[#da291c] rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <span className="heading-font font-black text-white text-2xl">U</span>
            </div>
            <div>
              <h2 className="heading-font text-xs uppercase tracking-[0.3em] font-black text-[#da291c]">Our Creed</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Heritage & Heart</p>
            </div>
          </div>
          
          <h3 className="heading-font text-3xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
            Elevating the diaspora's voice on the global terrace.
          </h3>
          <p className="text-white/70 text-base leading-relaxed mb-6 font-medium">
            United Kingdom Bangladesh Ultras (UBU) is a mission-driven community focused on supporting Bangladesh's footballing future while fostering deep roots for the British-Bangladeshi youth.
          </p>
          <p className="text-white/40 text-sm leading-relaxed italic border-l-2 border-[#da291c] pl-4">
            "Identity is carved in 90 minutes. Passion lasts a lifetime."
          </p>
        </div>
      </section>

      {/* The Gallery Section */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
           <div className="flex items-center gap-3">
             <Camera className="w-5 h-5 text-[#da291c]" />
             <h2 className="heading-font text-2xl font-black text-white">The Gallery</h2>
           </div>
           <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Moments Captured</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MOCK_GALLERY.map((img) => (
            <button 
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative aspect-square rounded-2xl overflow-hidden group border border-white/5"
            >
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                <span className="text-[8px] font-black uppercase text-[#da291c] mb-1">{img.event}</span>
                <p className="text-white text-[10px] font-bold leading-tight">{img.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Executive Committee Section */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#da291c]" />
              <h2 className="heading-font text-2xl font-black text-white">The Board</h2>
            </div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Leadership</p>
        </div>

        <div className="space-y-6">
          {/* Executive Tier */}
          <div className="grid grid-cols-1 gap-4">
            {executives.map((member) => (
              <div 
                key={member.id}
                className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-[#da291c]/30"
              >
                <div className="flex items-center gap-6 p-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#da291c] to-emerald-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-24 h-24 rounded-full border-2 border-white/20 p-1">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-[#da291c] p-1.5 rounded-full shadow-lg">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#da291c] bg-[#da291c]/10 px-2 py-0.5 rounded-full">
                        Executive Board
                      </span>
                    </div>
                    <h4 className="heading-font text-xl font-black text-white leading-tight mb-0.5">{member.name}</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{member.role}</p>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSelectedMember(member)}
                        className="text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        Read Bio <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a 
                      href={`mailto:committee@ukbu.com?subject=Contact Enquiry: ${member.name}`}
                      className="p-2.5 bg-white/5 rounded-xl text-white/40 hover:text-[#da291c] hover:bg-white/10 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a 
                      href={member.socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2.5 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regular Board Members (Grid) */}
          {boardMembers.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {boardMembers.map((member) => (
                <button 
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] text-center group hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col items-center"
                >
                  <div className="relative mb-4 w-20 h-20 p-1 rounded-full border border-white/10">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-white font-black text-sm leading-tight mb-1">{member.name}</h4>
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">{member.role}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* History Timeline */}
      <section>
        <div className="flex items-center gap-3 mb-8 px-2">
           <History className="w-5 h-5 text-[#da291c]" />
           <h2 className="heading-font text-2xl font-black text-white">The Journey</h2>
        </div>
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {MOCK_HISTORY.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-emerald-950 text-white font-black text-[10px] shadow-xl relative z-10 group-hover:border-[#da291c] transition-colors">
                {item.year.slice(-2)}
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-black text-white text-base">{item.title}</div>
                  <time className="font-mono text-[10px] text-[#da291c] font-black uppercase tracking-widest">{item.year}</time>
                </div>
                <div className="text-white/40 text-xs leading-relaxed font-medium">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div className="flex flex-col items-center gap-6 pt-4">
        <div className="flex gap-4">
          <a href="mailto:committee@ukbu.com" className="p-4 bg-white/5 rounded-2xl border border-white/5 text-white/40 hover:text-white transition-all">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://ukultras.wordpress.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl border border-white/5 text-white/40 hover:text-white transition-all">
            <Globe className="w-5 h-5" />
          </a>
        </div>
        <p className="text-[8px] text-white/20 uppercase tracking-[0.5em] font-black">United by Passion</p>
      </div>

      {/* Bio Modal - STYLISED */}
      {selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl" onClick={() => setSelectedMember(null)}></div>
          <div className="relative w-full max-w-sm bg-[#012e1f] border border-white/10 rounded-[3rem] p-10 animate-in slide-in-from-bottom-full duration-500 shadow-2xl overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#da291c]/20 rounded-full blur-3xl"></div>
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full"></div>
            <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-28 h-28 rounded-full border-4 border-[#da291c] p-1 mb-6 shadow-2xl">
                <img src={selectedMember.imageUrl} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="mb-8">
                <h3 className="heading-font text-3xl font-black text-white mb-1 tracking-tighter">{selectedMember.name}</h3>
                <p className="text-[#da291c] text-xs font-black uppercase tracking-[0.2em]">{selectedMember.role}</p>
              </div>
              
              <div className="bg-white/5 rounded-[2rem] p-8 mb-8 text-left border border-white/5">
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  {selectedMember.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <a 
                  href={`mailto:committee@ukbu.com?subject=Enquiry for ${selectedMember.name}`} 
                  className="py-4 bg-[#da291c] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-[#c02418] transition-colors"
                >
                  Contact <Mail className="w-3 h-3" />
                </a>
                <a 
                  href={selectedMember.socialLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 hover:bg-white/20 transition-colors"
                >
                  Socials <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}></div>
          <button 
            onClick={() => setSelectedImage(null)} 
            className="absolute top-8 right-8 z-[70] p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img src={selectedImage.url} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
               <span className="px-3 py-1 bg-[#da291c] rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-2 inline-block">
                 {selectedImage.event}
               </span>
               <h3 className="heading-font text-2xl font-black text-white">{selectedImage.caption}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terrace;

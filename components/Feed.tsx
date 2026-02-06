
import React, { useState, useEffect } from 'react';
import { MOCK_NEWS } from '../constants';
import { getAIFeedSummary, getAINewsAnalysis } from '../services/geminiService';
import { Zap, Calendar, Globe, FileText, ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { NewsItem } from '../types';

const Feed: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('Analyzing latest group activity...');
  const [loadingAi, setLoadingAi] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newsAnalysis, setNewsAnalysis] = useState<Record<string, string>>({});
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await getAIFeedSummary(MOCK_NEWS.map(n => n.title));
      setAiSummary(summary || '');
      setLoadingAi(false);
    };
    fetchSummary();
  }, []);

  const handleAnalyze = async (news: NewsItem) => {
    if (newsAnalysis[news.id]) return;
    setAnalyzingId(news.id);
    const analysis = await getAINewsAnalysis(news.title, news.content || news.summary);
    setNewsAnalysis(prev => ({ ...prev, [news.id]: analysis || '' }));
    setAnalyzingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* AI Summary Banner */}
      <div className="bg-[#da291c]/10 rounded-3xl p-6 border border-[#da291c]/20 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
           <Zap className="w-24 h-24 text-[#da291c]" />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#da291c] fill-[#da291c]" />
          <h2 className="heading-font font-black text-white uppercase tracking-widest text-[10px]">Terrace Report</h2>
        </div>
        <p className="text-white font-medium text-sm leading-relaxed relative z-10">
          {loadingAi ? 'Scouting the latest news...' : `"${aiSummary}"`}
        </p>
      </div>

      {/* Main Feed */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="heading-font text-xl font-black text-white">Live Sports Wire</h3>
           <span className="text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> RSS Live
           </span>
        </div>
        
        {MOCK_NEWS.map((news) => (
          <div key={news.id} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-300">
            <div className="relative h-44 overflow-hidden">
              <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white ${
                  news.category === 'RSS' ? 'bg-[#006a4e]' : 'bg-[#da291c]'
                }`}>
                  {news.category}
                </span>
              </div>
              {news.source && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white/70 font-bold uppercase">
                  via {news.source}
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-white/30 text-[9px] uppercase font-bold tracking-widest mb-3">
                <Calendar className="w-3 h-3" />
                {news.date}
              </div>
              <h3 className="heading-font text-lg font-black text-white mb-3 leading-tight">{news.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">{news.summary}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setExpandedId(expandedId === news.id ? null : news.id)}
                  className="flex-1 bg-white text-emerald-950 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {expandedId === news.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {expandedId === news.id ? 'Close Story' : 'Read Full Story'}
                </button>
                <button 
                  onClick={() => handleAnalyze(news)}
                  disabled={analyzingId === news.id}
                  className="bg-[#da291c] p-3 rounded-xl text-white disabled:opacity-50"
                >
                  {analyzingId === news.id ? <Languages className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                </button>
              </div>

              {expandedId === news.id && (
                <div className="mt-6 pt-6 border-t border-white/10 animate-in slide-in-from-top-2">
                  <p className="text-white/80 text-sm leading-relaxed mb-6">{news.content || news.summary}</p>
                  
                  {newsAnalysis[news.id] ? (
                    <div className="bg-emerald-900/40 p-5 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">AI Deep Dive</span>
                      </div>
                      <div className="text-white/90 text-xs leading-relaxed whitespace-pre-line font-medium">
                        {newsAnalysis[news.id]}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-white/20 uppercase font-black tracking-widest text-center py-4">
                      Tap the Globe for AI Summary & Translation
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;

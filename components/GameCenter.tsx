
import React, { useState, useEffect } from 'react';
import { generateTriviaQuestion, getGameFeedback } from '../services/geminiService';
import { TriviaQuestion } from '../types';
import { Trophy, RefreshCcw, Zap, Target, X, ChevronRight, MessageSquareQuote } from 'lucide-react';

interface GameCenterProps {
  onClose: () => void;
}

const GameCenter: React.FC<GameCenterProps> = ({ onClose }) => {
  const [question, setQuestion] = useState<TriviaQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const fetchQuestion = async () => {
    setLoading(true);
    setAnswered(false);
    setSelectedIndex(null);
    setFeedback('');
    const newQuestion = await generateTriviaQuestion();
    if (newQuestion) {
      setQuestion(newQuestion);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = async (index: number) => {
    if (answered || !question) return;
    
    setSelectedIndex(index);
    setAnswered(true);
    const isCorrect = index === question.correctIndex;
    
    if (isCorrect) {
      setScore(s => s + 10);
    }

    const aiFeedback = await getGameFeedback(isCorrect, score + (isCorrect ? 10 : 0));
    setFeedback(aiFeedback || '');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-emerald-950 flex flex-col p-6 animate-in slide-in-from-bottom-full duration-500 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#da291c] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(218,41,28,0.4)]">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="heading-font text-xl font-black text-white leading-none">TERRACE TRIVIA</h2>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">AI-Powered Challenge</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center justify-between">
          <Zap className="w-4 h-4 text-yellow-400" />
          <div className="text-right">
            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Score</p>
            <p className="heading-font text-xl font-black text-white">{score}</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center justify-between">
          <Target className="w-4 h-4 text-[#da291c]" />
          <div className="text-right">
            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Rank</p>
            <p className="heading-font text-xl font-black text-white">
              {score > 50 ? 'Ultra' : score > 20 ? 'Supporter' : 'Rookie'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#da291c] rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Gemini is scouting a question...</p>
          </div>
        ) : question ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Trophy className="w-32 h-32" />
               </div>
               <h3 className="heading-font text-2xl font-black text-white leading-tight mb-8 relative z-10">
                 {question.question}
               </h3>
               
               <div className="grid gap-3 relative z-10">
                 {question.options.map((option, idx) => (
                   <button
                     key={idx}
                     disabled={answered}
                     onClick={() => handleAnswer(idx)}
                     className={`w-full p-5 rounded-2xl text-left font-bold text-sm transition-all flex items-center justify-between group ${
                       answered 
                         ? idx === question.correctIndex 
                           ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                           : idx === selectedIndex 
                             ? 'bg-[#da291c]/20 border-[#da291c] text-[#da291c]'
                             : 'bg-white/5 border-white/10 text-white/20'
                         : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-[0.98]'
                     }`}
                   >
                     {option}
                     {answered && idx === question.correctIndex && <Zap className="w-4 h-4 fill-emerald-500" />}
                   </button>
                 ))}
               </div>
            </div>

            {/* AI Feedback Section */}
            {answered && (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="bg-[#da291c]/10 border border-[#da291c]/20 p-6 rounded-3xl mb-6">
                   <div className="flex items-center gap-2 mb-2">
                     <MessageSquareQuote className="w-3 h-3 text-[#da291c]" />
                     <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">AI Commentary</span>
                   </div>
                   <p className="text-white font-bold italic">"{feedback}"</p>
                   <p className="mt-4 text-white/50 text-[11px] leading-relaxed">
                     <span className="text-white font-black uppercase text-[9px] block mb-1">Knowledge Drop:</span>
                     {question.explanation}
                   </p>
                </div>
                
                <button 
                  onClick={fetchQuestion}
                  className="w-full py-5 bg-[#da291c] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl flex items-center justify-center gap-2 hover:bg-[#c02418] transition-all"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-white/40">Stadium lights failed. Try again.</p>
            <button onClick={fetchQuestion} className="p-4 bg-white/5 rounded-full text-white mx-auto block">
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-12 text-center pb-6">
         <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">UKBU Neural Network Game Engine</p>
      </div>
    </div>
  );
};

export default GameCenter;

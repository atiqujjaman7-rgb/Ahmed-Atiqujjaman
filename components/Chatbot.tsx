
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, MessageSquare, Loader2, Zap } from 'lucide-react';
import { startUKBUChat } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the terrace! I am your UKBU AI Assistant. How can I help the squad today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await startUKBUChat(history, userMessage);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "I've lost my voice! Try asking again." }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-24 z-[100] md:max-w-md md:left-auto md:right-6 animate-in slide-in-from-bottom-8 duration-300">
      <div className="bg-[#012e1f] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[500px]">
        {/* Header */}
        <div className="bg-[#da291c] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="heading-font text-lg font-black text-white leading-none">UKBU ASSISTANT</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Live from the terrace</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#012e1f] to-[#012217]"
        >
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#da291c] text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                <Loader2 className="w-4 h-4 text-[#da291c] animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 bg-emerald-950/50 border-t border-white/5">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the squad..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#da291c] transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 p-2.5 bg-[#da291c] text-white rounded-xl shadow-lg active:scale-90 disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 opacity-30">
            <Zap className="w-3 h-3 text-[#da291c]" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white">Powered by Gemini AI</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

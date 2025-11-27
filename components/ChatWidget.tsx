import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Strategy } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface Props {
  strategies: Strategy[];
  onUpdateStrategies: (newStrategies: Strategy[]) => void;
}

export const ChatWidget: React.FC<Props> = ({ strategies, onUpdateStrategies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Привет! Я ваш бренд-ассистент. Я могу помочь уточнить стратегии или изменить их под новые цели. Что бы вы хотели улучшить?'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Prevent background scrolling when chat is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing and logic
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let responseText = '';
      let updatedStrategies = [...strategies];

      // Simple mock logic to demonstrate functionality
      if (lowerInput.includes('молодеж') || lowerInput.includes('зумер') || lowerInput.includes('дерзк')) {
        responseText = 'Понял! Обновляю стратегию "Вкус как творчество" (Стратегия 2), чтобы сделать её более дерзкой и ориентированной на Gen Z. Меняю tone of voice и слоганы.';
        
        updatedStrategies[1] = {
          ...updatedStrategies[1],
          title: "Вкус Бунтарей (Gen Z Edition)",
          focus: "Яркий самовыражение, тик-ток формат, смелые эксперименты",
          details: {
            ...updatedStrategies[1].details,
            target_audience: "Gen Z (18-25), TikTok-креаторы, экспериментаторы, ищущие 'хайповые' вкусы.",
            communication_style: "Дерзкий, сленговый, энергичный, 'на ты', с юмором и мемами.",
            slogans: ["Вкус — это хайп.", "Айдиго: краш твоего ужина.", "Не будь пресным."]
          }
        };
        onUpdateStrategies(updatedStrategies);
      } else if (lowerInput.includes('премиум') || lowerInput.includes('люкс') || lowerInput.includes('дорого')) {
        responseText = 'Отличная идея. Усиливаю премиальность в первой стратегии "Эталон вкуса". Делаем акцент на эксклюзивность и высокую кухню.';
         updatedStrategies[0] = {
          ...updatedStrategies[0],
          title: "Aidigo Private Selection",
          focus: "Бескомпромиссный люкс, редкие ингредиенты, закрытый клуб",
          details: {
            ...updatedStrategies[0].details,
            target_audience: "Шеф-повара Michelin, гурманы с высоким доходом, коллекционеры вкусов.",
            visual_clues: "Черный бархат, золотое тиснение, стеклянные колбы, минимализм высокой моды.",
            slogans: ["Искусство избранных.", "Вкус, который нельзя купить — можно только ощутить.", "Aidigo. Excellence."]
          }
        };
        onUpdateStrategies(updatedStrategies);
      } else if (lowerInput.includes('семь') || lowerInput.includes('дет')) {
         responseText = 'Акцентирую внимание на безопасности и традициях в стратегии "Забота". Добавляю больше тепла в коммуникацию.';
         updatedStrategies[2] = {
          ...updatedStrategies[2],
          title: "Семейные традиции и Уют",
          details: {
            ...updatedStrategies[2].details,
            slogans: ["Как у мамы, только проще.", "Специи, которым доверяют поколения.", "Главный ингредиент — любовь."]
          }
         };
         onUpdateStrategies(updatedStrategies);
      } else {
        responseText = 'Интересная мысль. Я могу переписать стратегии под этот запрос. Попробуйте попросить меня сделать стратегию более "молодежной" или "премиальной", чтобы увидеть магию в действии!';
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`fixed z-50 ${isOpen ? 'inset-0 md:inset-auto md:bottom-6 md:right-6' : 'bottom-6 right-6'}`}>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-full h-full md:w-96 md:h-[500px] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Brand AI Assistant</h3>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Bot size={16} />
                 </div>
                 <div className="bg-white shadow-sm border border-slate-100 rounded-2xl rounded-bl-none p-4 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <form onSubmit={handleSend} className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Предложи идею..."
                className="flex-1 bg-slate-100 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button - Hidden when chat is open on mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline font-semibold pr-2">AI Помощник</span>
        </button>
      )}
    </div>
  );
};
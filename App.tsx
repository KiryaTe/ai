import React, { useState, useEffect } from 'react';
import { analysisData as initialData } from './data';
import { AnalysisChart } from './components/AnalysisChart';
import { StrategyCard } from './components/StrategyCard';
import { InsightBadge } from './components/InsightBadge';
import { ChatWidget } from './components/ChatWidget';
import { Brain, FileText, LayoutDashboard, Lightbulb, Search, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Strategy } from './types';

type AppState = 'landing' | 'analyzing' | 'dashboard';

function App() {
  const [data, setData] = useState(initialData);
  const { reasoning, analysis, insights, strategies, chat_summary } = data;
  
  const [appState, setAppState] = useState<AppState>('landing');
  const [url, setUrl] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Подключение к сайту...",
    "Сканирование контента...",
    "Анализ Tone of Voice...",
    "Определение архетипов...",
    "Формирование стратегии..."
  ];

  useEffect(() => {
    if (appState === 'analyzing') {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setAppState('dashboard'), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [appState]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setAppState('analyzing');
    // В реальном приложении здесь был бы вызов API к Gemini/OpenAI
    // const response = await ai.models.generateContent(...)
  };

  const handleUpdateStrategies = (newStrategies: Strategy[]) => {
    setData(prev => ({
      ...prev,
      strategies: newStrategies
    }));
  };

  if (appState === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
               <Brain size={40} />
               <span className="text-xl font-bold uppercase tracking-wider">Brand AI Analyst</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Раскрой ДНК <br/>своего бренда
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Искусственный интеллект проанализирует ваш сайт, определит архетипы и предложит стратегию развития за считанные секунды.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="w-full max-w-xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex p-2 bg-white rounded-lg shadow-xl ring-1 ring-slate-900/5">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-slate-400 mr-3" size={20} />
                <input 
                  type="url" 
                  placeholder="https://example.com" 
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 text-lg outline-none"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 active:scale-95"
              >
                <span>Анализ</span>
                <Sparkles size={18} />
              </button>
            </div>
          </form>

          <div className="mt-12 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 flex items-end justify-center pb-8">
                <p className="text-white/80 text-sm font-medium">Пример анализа визуальной коммуникации</p>
             </div>
             <img 
               src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
               alt="Analytics Dashboard Preview" 
               className="w-full h-64 md:h-80 object-cover object-center transform hover:scale-105 transition-transform duration-700"
             />
          </div>

        </div>
      </div>
    );
  }

  if (appState === 'analyzing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
           <div className="mb-8 relative inline-block">
             <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
             <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10 mx-auto" />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 mb-2">Анализ {new URL(url).hostname}</h2>
           <p className="text-slate-500 mb-8">Пожалуйста, подождите. ИИ обрабатывает данные.</p>
           
           <div className="space-y-3">
             {loadingSteps.map((step, index) => (
               <div key={index} className={`flex items-center gap-3 transition-all duration-300 ${index <= loadingStep ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                 <div className={`w-2 h-2 rounded-full ${index < loadingStep ? 'bg-emerald-500' : index === loadingStep ? 'bg-blue-500 animate-ping' : 'bg-slate-300'}`}></div>
                 <span className={`text-sm ${index === loadingStep ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{step}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 animate-fade-in relative">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Brain size={120} />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-blue-400 mb-4">
                <LayoutDashboard size={24} />
                <span className="font-semibold tracking-wider uppercase text-sm">Отчет об анализе</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Aidigo: Стратегия Архетипов</h1>
              <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
                {reasoning.goals.analyze_brand}
              </p>
            </div>
            <button 
              onClick={() => { setAppState('landing'); setUrl(''); }}
              className="self-start md:self-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
            >
              Новый анализ
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
          {/* Chart Section */}
          <div className="lg:col-span-2 h-full">
             <AnalysisChart archetypes={analysis.archetypes} />
          </div>

          {/* Archetype List */}
          <div className="h-full bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Текущий профиль</h3>
              <div className="space-y-4">
                {Object.entries(analysis.archetypes)
                  .sort(([, a], [, b]) => b.score - a.score)
                  .map(([name, data]) => (
                    <div key={name} className="group relative">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-slate-700 capitalize">{name}</span>
                          <span className="text-sm font-bold text-slate-500">{data.score * 10}%</span>
                       </div>
                       
                       <div className="relative">
                         {/* Сокращенный текст (виден по умолчанию) */}
                         <p className="text-xs text-slate-500 line-clamp-2 cursor-help underline decoration-dashed decoration-slate-300 underline-offset-2 transition-colors group-hover:text-slate-800">
                           {data.description}
                         </p>
                         
                         {/* Всплывающий полный текст (виден при наведении) */}
                         <div className="absolute top-0 left-0 w-[calc(100%+1rem)] -ml-2 -mt-2 p-3 bg-white rounded-lg shadow-xl border border-slate-200 text-xs text-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                            {data.description}
                         </div>
                       </div>
                    </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 italic">
                "{analysis.summary}"
              </p>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-amber-500" />
            <h2 className="text-2xl font-bold text-slate-800">Инсайты и Анализ</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 uppercase tracking-wide text-sm">Сильные стороны</h3>
              {insights.strengths.map((text, i) => (
                <InsightBadge key={i} type="strength" text={text} />
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 uppercase tracking-wide text-sm">Точки роста</h3>
              {insights.weaknesses.map((text, i) => (
                <InsightBadge key={i} type="weakness" text={text} />
              ))}
            </div>
          </div>

          <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
             <h3 className="font-semibold text-slate-800 mb-2">Общее резюме</h3>
             <p className="text-slate-600 leading-relaxed">{insights.overall_comment}</p>
          </div>
        </div>

        {/* Strategies Section */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Brain className="text-indigo-500" />
            <h2 className="text-2xl font-bold text-slate-800">Стратегические сценарии</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
             {strategies.map((strategy, index) => (
               <StrategyCard key={index} strategy={strategy} index={index} />
             ))}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex gap-6 items-start">
           <FileText className="text-slate-400 shrink-0" size={32} />
           <div>
             <h3 className="text-lg font-bold text-slate-800 mb-2">Заключение</h3>
             <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
               {chat_summary}
             </p>
           </div>
        </div>
      </main>

      {/* AI Chat Widget */}
      <ChatWidget strategies={strategies} onUpdateStrategies={handleUpdateStrategies} />
    </div>
  );
}

export default App;
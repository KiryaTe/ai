import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Users, Zap, Palette, MessageSquare } from 'lucide-react';
import { Strategy } from '../types';

interface Props {
  strategy: Strategy;
  index: number;
}

export const StrategyCard: React.FC<Props> = ({ strategy, index }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const colors = [
    'border-blue-500 bg-blue-50/50',
    'border-violet-500 bg-violet-50/50',
    'border-emerald-500 bg-emerald-50/50',
  ];
  
  const accentColor = colors[index % colors.length];
  const titleColor = ['text-blue-700', 'text-violet-700', 'text-emerald-700'][index % 3];
  const badgeColor = ['bg-blue-100 text-blue-800', 'bg-violet-100 text-violet-800', 'bg-emerald-100 text-emerald-800'][index % 3];

  return (
    <div className={`rounded-xl border-l-4 ${accentColor} bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md`}>
      <div 
        className="p-6 cursor-pointer flex justify-between items-start"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
              Стратегия {index + 1}
            </span>
            <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
              <Zap size={14} />
              {strategy.main_archetype}
            </span>
          </div>
          <h3 className={`text-2xl font-bold ${titleColor} mb-2`}>{strategy.title}</h3>
          <p className="text-slate-600 font-medium">{strategy.focus}</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors mt-1">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-slate-100">
           {/* Supporting Archetypes */}
           <div className="mt-4 flex gap-2">
            {strategy.supporting_archetypes.map(arch => (
              <span key={arch} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                + {arch}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
                <Target size={18} className="text-slate-500" />
                Цель и результат
              </h4>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                {strategy.what_it_improves}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium bg-white/50 p-2 rounded border border-slate-100">
                Результат: {strategy.expected_outcome}
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
                <Users size={18} className="text-slate-500" />
                Аудитория
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {strategy.details.target_audience}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100/50">
             <h4 className="font-semibold text-slate-800 mb-3">Детали реализации</h4>
             <div className="space-y-4">
                <div className="flex gap-3 items-start">
                   <div className="mt-1 min-w-[20px]"><Palette size={16} className="text-slate-400"/></div>
                   <div>
                      <span className="text-sm font-semibold text-slate-700 block">Визуальный стиль</span>
                      <span className="text-sm text-slate-600">{strategy.details.visual_clues}</span>
                   </div>
                </div>
                <div className="flex gap-3 items-start">
                   <div className="mt-1 min-w-[20px]"><MessageSquare size={16} className="text-slate-400"/></div>
                   <div>
                      <span className="text-sm font-semibold text-slate-700 block">Слоганы</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {strategy.details.slogans.map((slogan, i) => (
                          <span key={i} className="text-xs italic bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded">
                            "{slogan}"
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
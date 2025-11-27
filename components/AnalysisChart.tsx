import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Archetypes, ArchetypeData } from '../types';

interface Props {
  archetypes: Archetypes;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']; // Blue, Violet, Emerald, Amber

export const AnalysisChart: React.FC<Props> = ({ archetypes }) => {
  const data = Object.entries(archetypes).map(([name, details]) => {
    const d = details as ArchetypeData;
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      score: d.score * 10, // Convert to percentage
      fullDescription: d.description
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="h-full min-h-[400px] w-full bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Распределение архетипов</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 50, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100} 
              tick={{ fill: '#475569', fontSize: 14, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`${value}%`, 'Score']}
            />
            <Bar 
              dataKey="score" 
              radius={[0, 4, 4, 0]} 
              barSize={32}
              label={{ position: 'right', formatter: (val: number) => `${val}%`, fill: '#64748b', fontSize: 12, fontWeight: 600 }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
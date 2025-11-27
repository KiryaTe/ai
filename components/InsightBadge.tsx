import React from 'react';
import { CheckCircle, XCircle, ArrowUpCircle } from 'lucide-react';

interface Props {
  type: 'strength' | 'weakness' | 'recommendation';
  text: string;
}

export const InsightBadge: React.FC<Props> = ({ type, text }) => {
  const styles = {
    strength: {
      icon: <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={18} />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-900'
    },
    weakness: {
      icon: <XCircle className="text-rose-500 mt-0.5 shrink-0" size={18} />,
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      text: 'text-rose-900'
    },
    recommendation: {
      icon: <ArrowUpCircle className="text-blue-500 mt-0.5 shrink-0" size={18} />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-900'
    }
  };

  const style = styles[type];

  return (
    <div className={`flex gap-3 p-3 rounded-lg border ${style.bg} ${style.border}`}>
      {style.icon}
      <span className={`text-sm ${style.text} leading-snug`}>{text}</span>
    </div>
  );
};

import React from 'react';
import { GuestSubmission, DrinkStats } from '../types';

interface SummaryCountersProps {
  submissions: GuestSubmission[];
}

export const SummaryCounters: React.FC<SummaryCountersProps> = ({ submissions }) => {
  const stats: DrinkStats = {
    "Водка": 0,
    "Уиски": 0,
    "Бяло Вино": 0,
    "Просеко": 0
  };

  submissions.forEach(s => {
    if (stats[s.drink] !== undefined) {
      stats[s.drink]++;
    }
  });

  const items = [
    { label: "Водка", count: stats["Водка"], color: "text-blue-400", bg: "bg-blue-500/5" },
    { label: "Уиски", count: stats["Уиски"], color: "text-orange-400", bg: "bg-orange-500/5" },
    { label: "Бяло Вино", count: stats["Бяло Вино"], color: "text-green-400", bg: "bg-green-500/5" },
    { label: "Просеко", count: stats["Просеко"], color: "text-pink-400", bg: "bg-pink-500/5" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {items.map(item => (
        <div 
          key={item.label} 
          className={`${item.bg} border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center transition-all hover:border-gray-700`}
        >
          <span className={`text-2xl font-black mb-1 ${item.color}`}>{item.count}</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-center">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

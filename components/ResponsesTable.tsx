
import React from 'react';
import { GuestSubmission } from '../types';

interface ResponsesTableProps {
  submissions: GuestSubmission[];
}

export const ResponsesTable: React.FC<ResponsesTableProps> = ({ submissions }) => {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900/40 rounded-3xl border-2 border-dashed border-gray-800">
        <p className="text-gray-500 font-medium">Все още няма записани отговори.</p>
      </div>
    );
  }

  const sortedSubmissions = [...submissions].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      {/* Table header for larger screens */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-800/30 rounded-t-2xl text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <div>Име</div>
        <div>Алкохол</div>
        <div>Безалкохолно</div>
        <div className="text-right">Време</div>
      </div>

      <div className="space-y-3">
        {sortedSubmissions.map((sub) => {
          const date = new Date(sub.createdAt);
          const timeStr = date.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' });
          const dateStr = date.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' });

          return (
            <div 
              key={sub.id} 
              className="group bg-gray-900/60 hover:bg-gray-900 border border-gray-800 p-4 md:p-0 md:px-6 md:py-4 rounded-2xl md:grid md:grid-cols-4 md:items-center gap-4 transition-all"
            >
              {/* Mobile Layout */}
              <div className="flex justify-between items-start md:block">
                <div className="font-bold text-white text-base md:text-sm truncate mr-2">
                  {sub.name}
                </div>
                <div className="text-[10px] text-gray-500 md:hidden whitespace-nowrap">
                  {dateStr}, {timeStr}
                </div>
              </div>

              <div className="mt-3 md:mt-0">
                <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                  sub.drink === 'Водка' ? 'bg-blue-500/10 text-blue-400' :
                  sub.drink === 'Уиски' ? 'bg-orange-500/10 text-orange-400' :
                  sub.drink === 'Бяло Вино' ? 'bg-green-500/10 text-green-400' :
                  'bg-pink-500/10 text-pink-400'
                }`}>
                  {sub.drink}
                </span>
              </div>

              <div className="mt-2 md:mt-0 text-sm text-gray-400 truncate md:pr-4">
                {sub.softDrink ? (
                  <span className="flex items-center">
                    <span className="md:hidden text-gray-600 mr-2 text-xs">Безалкохолно:</span>
                    {sub.softDrink}
                  </span>
                ) : (
                  <span className="text-gray-700 italic text-xs">Без безалкохолно</span>
                )}
              </div>

              <div className="hidden md:block text-right text-xs text-gray-500 font-medium">
                {dateStr} <span className="mx-1 text-gray-700">•</span> {timeStr}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

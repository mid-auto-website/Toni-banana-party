
import React, { useState, useEffect, useCallback } from 'react';
import { DrinkForm } from './components/DrinkForm';
import { SummaryCounters } from './components/SummaryCounters';
import { ResponsesTable } from './components/ResponsesTable';
import { GuestSubmission } from './types';
import { storageService } from './services/storageService';
import { fetchSubmissions, postSubmission } from './api';

const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<GuestSubmission[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const syncWithAPI = useCallback(async () => {
    setIsRefreshing(true);
    const apiData = await fetchSubmissions();
    if (apiData.length > 0) {
      setSubmissions(apiData);
      storageService.saveSubmissions(apiData);
    }
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const cachedData = storageService.loadSubmissions();
    setSubmissions(cachedData);
    syncWithAPI();
  }, [syncWithAPI]);

  const handleFormSubmit = useCallback(async (data: Omit<GuestSubmission, 'id' | 'createdAt'>) => {
    setIsSubmitting(true);

    const newSubmission: GuestSubmission = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedSubmissions = [newSubmission, ...submissions];
    setSubmissions(updatedSubmissions);
    storageService.saveSubmissions(updatedSubmissions);

    postSubmission(newSubmission).finally(() => {
      setIsSubmitting(false);
    });
    
  }, [submissions]);

  return (
    <div className="min-h-screen pb-12 px-4 sm:px-6 md:px-8 bg-gray-950 text-white selection:bg-yellow-500/30 overflow-x-hidden">
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-yellow-500/10 -z-10 rounded-full blur-[100px] pointer-events-none" />

      <header className="pt-10 pb-8 md:pt-16 md:pb-12 text-center max-w-2xl mx-auto">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-yellow-400/10 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-yellow-400/20">
          🍌 ПАРТИ ГЕСТЛИСТ
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
          Какво ще пиеш за рождения ден на <span className="text-yellow-400">Тони Банана?</span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 font-medium max-w-md mx-auto px-4">
          Попълни формата, за да сме сигурни, че няма да останеш жаден.
        </p>
      </header>

      <main className="max-w-2xl mx-auto space-y-12 md:space-y-16">
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <DrinkForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </section>

        <section className="pt-8 border-t border-gray-900">
          <div className="flex items-end justify-between mb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-black text-white flex items-center">
                <span className="mr-3 text-2xl">🥂</span> Отговори
              </h2>
              <p className="text-sm text-gray-500">Виж кой какво е избрал.</p>
            </div>
            
            <button 
              onClick={syncWithAPI}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs font-bold text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all active:scale-95 disabled:opacity-50"
            >
              <svg 
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isRefreshing ? 'Опресняване...' : 'Опресни'}
            </button>
          </div>

          <SummaryCounters submissions={submissions} />
          
          <ResponsesTable submissions={submissions} />
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-600 text-[10px] uppercase tracking-widest pb-8">
        <p>© 2024 Тони Банана Surprise Party • Направено с 💛</p>
      </footer>
    </div>
  );
};

export default App;

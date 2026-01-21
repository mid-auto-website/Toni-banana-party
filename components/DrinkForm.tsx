
import React, { useState } from 'react';
import { DrinkType, GuestSubmission } from '../types';

interface DrinkFormProps {
  onSubmit: (submission: Omit<GuestSubmission, 'id' | 'createdAt'>) => void;
  isSubmitting: boolean;
}

const DRINK_OPTIONS: DrinkType[] = ["Водка", "Уиски", "Бяло Вино", "Просеко"];

export const DrinkForm: React.FC<DrinkFormProps> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [drink, setDrink] = useState<DrinkType | ''>('');
  const [softDrink, setSoftDrink] = useState('');
  
  const [errors, setErrors] = useState<{ name?: string; drink?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; drink?: string } = {};
    if (!name.trim()) newErrors.name = 'Моля, въведи своето име.';
    if (!drink) newErrors.drink = 'Моля, избери какво ще пиеш.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name,
        drink: drink as DrinkType,
        softDrink
      });
      
      setName('');
      setDrink('');
      setSoftDrink('');
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-800 p-5 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Име и фамилия <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Напиши името си"
            className={`w-full px-4 py-4 rounded-2xl bg-gray-800/50 border text-white text-base placeholder-gray-600 focus:outline-none transition-all ${
              errors.name ? 'border-red-500/50 ring-2 ring-red-500/10' : 'border-gray-700 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10'
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400 font-medium px-1">{errors.name}</p>}
        </div>

        {/* Drink Selection */}
        <div>
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Какво ще пиеш? <span className="text-red-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            {DRINK_OPTIONS.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all active:scale-[0.97] ${
                  drink === option
                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 ring-2 ring-yellow-400/20'
                    : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="drink"
                  value={option}
                  checked={drink === option}
                  onChange={() => setDrink(option)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                  drink === option ? 'border-yellow-400' : 'border-gray-600'
                }`}>
                  {drink === option && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />}
                </div>
                <span className="font-bold text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.drink && <p className="mt-2 text-xs text-red-400 font-medium px-1">{errors.drink}</p>}
        </div>

        {/* Soft Drink Field */}
        <div>
          <label htmlFor="softDrink" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Безалкохолно предпочитание
          </label>
          <input
            id="softDrink"
            type="text"
            value={softDrink}
            onChange={(e) => setSoftDrink(e.target.value)}
            placeholder="Кола, тоник, сок..."
            className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 border border-gray-700 text-white text-base placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-800 disabled:text-gray-600 text-gray-950 font-black py-5 rounded-2xl shadow-xl shadow-yellow-400/10 transition-all active:scale-[0.98] text-center text-base uppercase tracking-widest"
        >
          {isSubmitting ? 'Изпращане...' : 'Изпрати'}
        </button>

        {/* Success Alert */}
        {showSuccess && (
          <div className="bg-green-500/10 text-green-400 p-4 rounded-2xl border border-green-500/20 flex items-center justify-center animate-in zoom-in duration-300">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-sm">Готово! Записахме избора ти.</span>
          </div>
        )}
      </form>
    </div>
  );
};

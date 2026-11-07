'use client';

import { useState } from 'react';
import { CATEGORIES, todayISO } from '@/lib/categories';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100';

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [date, setDate] = useState(todayISO);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(String(amount).replace(',', '.'));
    if (!Number.isFinite(value) || value <= 0) {
      setError('Введите сумму больше нуля');
      return;
    }
    if (!date) {
      setError('Укажите дату');
      return;
    }
    onAdd({
      amount: Math.round(value * 100) / 100,
      category,
      date,
      description: description.trim(),
    });
    setAmount('');
    setDescription('');
    setError('');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Новая трата</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Сумма, ₽</span>
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Дата</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium text-slate-500">Категория</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
                    active
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="mr-1">{c.emoji}</span>
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Описание</span>
          <input
            type="text"
            placeholder="Например, обед в кафе"
            maxLength={120}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </label>

        {error && <p className="animate-fade-in text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 active:scale-[0.98] ${
            justAdded ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-700'
          }`}
        >
          {justAdded ? 'Добавлено ✓' : 'Добавить трату'}
        </button>
      </form>
    </section>
  );
}

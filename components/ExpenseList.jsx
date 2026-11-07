'use client';

import { useState } from 'react';
import { CATEGORIES, formatMoney, getCategory } from '@/lib/categories';

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-all duration-200 ${
        active ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  );
}

export default function ExpenseList({
  expenses,
  loaded,
  totalCount,
  filter,
  onFilterChange,
  sortDesc,
  onToggleSort,
  onRemove,
}) {
  const [removing, setRemoving] = useState(null);
  const filteredTotal = expenses.reduce((s, e) => s + e.amount, 0);

  // Let the slide-out transition play before the item leaves the list.
  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => {
      onRemove(id);
      setRemoving(null);
    }, 250);
  };

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">Все траты</h2>
        <button
          type="button"
          onClick={onToggleSort}
          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          {sortDesc ? 'Сначала новые ↓' : 'Сначала старые ↑'}
        </button>
      </div>

      <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
        <Chip active={filter === 'all'} onClick={() => onFilterChange('all')}>
          Все
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => onFilterChange(c.id)}>
            <span className="mr-1">{c.emoji}</span>
            {c.name}
          </Chip>
        ))}
      </div>

      {filter !== 'all' && expenses.length > 0 && (
        <p className="mb-3 animate-fade-in text-sm text-slate-500">
          Всего в категории:{' '}
          <span className="font-medium text-slate-900">{formatMoney(filteredTotal)}</span>
        </p>
      )}

      {!loaded ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : expenses.length === 0 ? (
        <div className="animate-fade-in py-12 text-center">
          <p className="text-3xl">🧾</p>
          <p className="mt-2 text-sm text-slate-500">
            {totalCount === 0 ? 'Пока нет ни одной траты' : 'В этой категории трат нет'}
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {expenses.map((e) => {
            const c = getCategory(e.category);
            const isRemoving = removing === e.id;
            return (
              <li
                key={e.id}
                className={`group flex animate-fade-in items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 ${
                  isRemoving ? 'translate-x-4 opacity-0' : ''
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${c.soft}`}
                >
                  {c.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {e.description || c.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {c.name} · {formatDate(e.date)}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                  {formatMoney(e.amount)}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemove(e.id)}
                  aria-label="Удалить трату"
                  title="Удалить"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:focus:opacity-100 sm:group-hover:opacity-100"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                    <path
                      d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2 0-.6 9.1A2 2 0 0 1 11.4 17H8.6a2 2 0 0 1-2-1.9L6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

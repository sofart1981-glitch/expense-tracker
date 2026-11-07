'use client';

import { useMemo, useState } from 'react';
import { useExpenses } from '@/lib/useExpenses';
import ExpenseForm from './ExpenseForm';
import MonthSummary from './MonthSummary';
import ExpenseList from './ExpenseList';

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function ExpenseTracker() {
  const { expenses, loaded, addExpense, removeExpense } = useExpenses();
  const [month, setMonth] = useState(currentMonth);
  const [filter, setFilter] = useState('all');
  const [sortDesc, setSortDesc] = useState(true);

  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date.startsWith(month)),
    [expenses, month],
  );

  const visible = useMemo(() => {
    const list = filter === 'all' ? expenses : expenses.filter((e) => e.category === filter);
    return [...list].sort((a, b) => {
      const byDate = a.date.localeCompare(b.date) || a.createdAt - b.createdAt;
      return sortDesc ? -byDate : byDate;
    });
  }, [expenses, filter, sortDesc]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Трекер расходов
        </h1>
        <p className="mt-1 text-sm text-slate-500">Записывайте траты и следите за бюджетом</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="space-y-6">
          <ExpenseForm onAdd={addExpense} />
          <MonthSummary month={month} onMonthChange={setMonth} expenses={monthExpenses} />
        </div>

        <ExpenseList
          expenses={visible}
          loaded={loaded}
          totalCount={expenses.length}
          filter={filter}
          onFilterChange={setFilter}
          sortDesc={sortDesc}
          onToggleSort={() => setSortDesc((v) => !v)}
          onRemove={removeExpense}
        />
      </div>
    </main>
  );
}

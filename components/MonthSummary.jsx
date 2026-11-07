'use client';

import { CATEGORIES, formatMoney, plural } from '@/lib/categories';

function shiftMonth(month, delta) {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(month) {
  const [y, m] = month.split('-').map(Number);
  const name = new Date(y, m - 1, 1).toLocaleDateString('ru-RU', { month: 'long' });
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${y}`;
}

function NavButton({ onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </button>
  );
}

export default function MonthSummary({ month, onMonthChange, expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = CATEGORIES.map((c) => ({
    ...c,
    sum: expenses.filter((e) => e.category === c.id).reduce((s, e) => s + e.amount, 0),
  })).sort((a, b) => b.sum - a.sum);

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <NavButton onClick={() => onMonthChange(shiftMonth(month, -1))} label="Предыдущий месяц">
          ‹
        </NavButton>
        <h2 className="text-sm font-medium text-slate-600">{monthLabel(month)}</h2>
        <NavButton onClick={() => onMonthChange(shiftMonth(month, 1))} label="Следующий месяц">
          ›
        </NavButton>
      </div>

      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-slate-400">Потрачено за месяц</p>
        <p
          key={`${month}-${total}`}
          className="mt-1 animate-fade-in text-3xl font-semibold tabular-nums text-slate-900 sm:text-4xl"
        >
          {formatMoney(total)}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {expenses.length} {plural(expenses.length, ['трата', 'траты', 'трат'])}
        </p>
      </div>

      <ul className="space-y-3">
        {byCategory.map((c) => {
          const percent = total > 0 ? (c.sum / total) * 100 : 0;
          return (
            <li key={c.id}>
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="text-slate-600">
                  <span className="mr-1.5">{c.emoji}</span>
                  {c.name}
                </span>
                <span className="tabular-nums text-slate-900">
                  {formatMoney(c.sum)}
                  {total > 0 && (
                    <span className="ml-2 inline-block w-9 text-right text-xs text-slate-400">
                      {Math.round(percent)}%
                    </span>
                  )}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${c.color} transition-all duration-500 ease-out`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

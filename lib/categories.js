export const CATEGORIES = [
  { id: 'food', name: 'Еда', emoji: '🍎', color: 'bg-emerald-500', soft: 'bg-emerald-50 text-emerald-700' },
  { id: 'transport', name: 'Транспорт', emoji: '🚌', color: 'bg-sky-500', soft: 'bg-sky-50 text-sky-700' },
  { id: 'fun', name: 'Развлечения', emoji: '🎬', color: 'bg-violet-500', soft: 'bg-violet-50 text-violet-700' },
  { id: 'health', name: 'Здоровье', emoji: '💊', color: 'bg-rose-500', soft: 'bg-rose-50 text-rose-700' },
  { id: 'other', name: 'Другое', emoji: '📦', color: 'bg-slate-400', soft: 'bg-slate-100 text-slate-700' },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}

const money = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 2,
});

export function formatMoney(value) {
  return money.format(value);
}

export function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d - offset).toISOString().slice(0, 10);
}

export function plural(n, forms) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

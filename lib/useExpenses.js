'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'expense-tracker:expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Read once on mount: localStorage is unavailable during server rendering.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch {
      // Corrupted or blocked storage: start with an empty list.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // Storage full or blocked: keep working in memory.
    }
  }, [expenses, loaded]);

  const addExpense = (expense) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setExpenses((prev) => [{ ...expense, id, createdAt: Date.now() }, ...prev]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return { expenses, loaded, addExpense, removeExpense };
}

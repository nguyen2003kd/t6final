import { create } from "zustand";
import {ExpenseState} from '@/src/lib/types/store-type'
export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],

  setExpenses: (items) => set({ expenses: items }),

  addExpense: (item) =>
    set((state) => ({
      expenses: [...state.expenses, item],
    })),


  updateExpense: (item) =>
    set((state) => ({
      expenses: state.expenses.map((exp) =>
        exp._id === item._id ? item : exp
      ),
    })),

  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((exp) => exp._id !== id),
    })),

  clearExpenses: () => set({ expenses: [] }),
}));

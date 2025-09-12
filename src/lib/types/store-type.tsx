export interface Expense {
  _id: string;
  title: string;
  amount: number;
  categoryId: {
    name: string;
    _id: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseState {
  expenses: Expense[];
  setExpenses: (items: Expense[]) => void;
  addExpense: (item: Expense) => void;
  updateExpense: (item: Expense) => void;
  removeExpense: (id: string) => void;
  clearExpenses: () => void;
}
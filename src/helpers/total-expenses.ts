import { Expense } from '@/src/lib/types/store-type'

export const total = (list: Expense[]): number => {

  return list
    .reduce((sum, exp) => sum + exp.amount, 0);
};


export const totalThisMonth = (list: Expense[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();

  return list
    .filter(exp => {
      const expDate = new Date(exp.updatedAt);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);
};


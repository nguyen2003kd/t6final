import { Expense } from '@/src/lib/types/store-type'
export function transformMonthlyData(expenses: Expense[]) {
  const grouped: Record<string, number> = {};
  expenses.forEach((e) => {
    const date = new Date(e.createdAt);
    const key = date.toLocaleString("en-US", { month: "short", year: "numeric" }); // VD: "Sep 2025"
    grouped[key] = (grouped[key] || 0) + e.amount;
  });

  return Object.entries(grouped).map(([month, expenses]) => ({ month, expenses }));
}

export function transformCategoryData(expenses: Expense[]) {
  const grouped: Record<string, number> = {};
  expenses.forEach((e) => {
    const category = e.categoryId?.name || "Unknown";
    grouped[category] = (grouped[category] || 0) + e.amount;
  });

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

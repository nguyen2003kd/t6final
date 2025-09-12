export interface Expense {
  id: string;
  title: string;
  amount: number;
  categoryId: {
    name:string;
    _id:string
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ExpenseRespont {
  success: boolean;
  data: Expense[];
  pagination: Pagination;
}

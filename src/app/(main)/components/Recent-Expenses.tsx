import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useExpenses } from "@/api/endpoints/useItem";
import { useDeleteExpense } from "@/api/endpoints/useDeleteExpense";
import { Expense } from "@/api/types/Expense";
export default function RecentExpenses() {
  const [page] = useState(1);
  const { data, isLoading, isError } = useExpenses(page);
  console.log("data", data?.data);
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Header */}
      <div className="flex flex-row items-center justify-between space-y-0 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Recent Expenses
        </h3>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
          ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
          bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Table */}
      <div className="p-6 pt-0">
        <div className="overflow-x-auto">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {data?.data.map((item) => (
                  <Itemcard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    amount={item.amount}
                    categoryId={item.categoryId}
                    userId={item.userId}
                    createdAt={item.createdAt}
                    updatedAt={item.updatedAt}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const Itemcard = ({
  id,
  title,
  amount,
  categoryId,
  userId,
  createdAt,
  updatedAt,
}: Expense) => {
  const { mutate: deleteExpense, isPending } = useDeleteExpense();
  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      deleteExpense(id);
    }
  };
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 font-medium">{createdAt}</td>
      <td className="p-4">
        <div
          className="inline-flex items-center rounded-full border border-transparent bg-blue-100 text-blue-800 
                      px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary/80"
        >
          {categoryId.name}
        </div>
      </td>
      <td className="p-4 max-w-xs truncate">{title}</td>
      <td className="p-4 text-right font-semibold text-expense">{`$${amount}`}</td>
      <td className="p-4 text-right">
        <div className="flex justify-end space-x-1">
          <button
            className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium 
                        hover:bg-accent hover:text-accent-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            disabled={isPending}
            onClick={() => handleDelete(id)}
            className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium 
                        hover:bg-accent hover:text-accent-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

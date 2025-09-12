import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useExpenses } from "@/api/endpoints/useItem";
import { useDeleteExpense } from "@/api/endpoints/useDeleteExpense";
import { Expense } from "@/api/types/Expense";
import AddExpensePopup from "@/app/(main)/components/popupadd";
import { CircleAlert  } from 'lucide-react'
import EditExpensePopup from "@/app/(main)/components/popupedit";
import { useExpenseStore } from "@/stores/list-expenses";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export default function RecentExpenses() {
const { setExpenses } = useExpenseStore();
const [page] = useState(1);
const [open, setOpen] = useState(false);
const { data, isLoading, refetch } = useExpenses(page);

useEffect(() => {
  if (data) {
    setExpenses(data.data);
  }
}, [data, setExpenses]);
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Header */}
      <div className="flex flex-row items-center justify-between space-y-0 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Recent Expenses
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
          ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
          bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </button>
      </div>

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
                    key={item._id}
                    _id={item._id}
                    title={item.title}
                    amount={item.amount}
                    categoryId={item.categoryId}
                    userId={item.userId}
                    createdAt={item.createdAt}
                    updatedAt={item.updatedAt}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
            {open == true ? (
              <AddExpensePopup setOpen={setOpen} refetch={refetch} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
interface ItemcardProps extends Expense {
  refetch: () => void;
}
const Itemcard = ({
  _id,
  title,
  amount,
  categoryId,
  userId,
  createdAt,
  updatedAt,
  refetch,
}: ItemcardProps) => {
  const [openedit, setOpentedit] = useState(false);
  const [opendelete, setOpendelete] = useState(false);
  const { mutate: deleteExpense, isPending } = useDeleteExpense();
  const handleDelete = (_id: string) => {
      deleteExpense(_id);
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
            onClick={() => setOpentedit(true)}
            className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium 
                        hover:bg-accent hover:text-accent-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            disabled={isPending}
            onClick={() => setOpendelete(true)}
            className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium 
                        hover:bg-accent hover:text-accent-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {openedit == true ? (
            <EditExpensePopup
              setOpen={setOpentedit}
              refetch={refetch}
              id={_id}
            />
          ) : null}
          <Warning_message
            handleDelete={handleDelete}
            id={_id}
            setOpendelete={setOpendelete}
            opendelete={opendelete}
          />
        </div>
      </td>
    </tr>
  );
};
interface Warning {
  handleDelete: (id: string) => void;
  id: string;
  setOpendelete: React.Dispatch<React.SetStateAction<boolean>>;
  opendelete: boolean;
}
const Warning_message = ({
  handleDelete,
  id,
  setOpendelete,
  opendelete,
}: Warning) => {
  return (
    <div className="">
<Dialog open={opendelete} onOpenChange={setOpendelete} modal={false}>
  <DialogContent className="sm:max-w-md sm:rounded-xl sm:[&>button.absolute.top-4.right-4]:hidden">
    <DialogHeader>
      <DialogTitle>Xác nhận</DialogTitle>
    </DialogHeader>
    <DialogDescription className="flex flex-rows justify-center items-center gap-2 text-center">
      <CircleAlert className="text-red-700" />
      Bạn có muốn chắc chắn xóa
    </DialogDescription>
    <DialogFooter className="flex justify-end gap-2 pt-4">
      <DialogClose asChild>
        <Button variant="outline">Đóng</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button
          variant="destructive"
          type="submit"
          onClick={() => handleDelete(id)}
        >
          Xóa
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
};

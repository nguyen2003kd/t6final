"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCategory } from "@/api/endpoints/usegerCategory";
import { useState, useEffect } from "react";
import { useUpdateExpense } from "@/api/endpoints/useUpdateExpense";
import { useGetExpenseById } from "@/api/endpoints/useGetExpenseById";
interface EditExpensePopupProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  id: string;
}

export default function EditExpensePopup({
  setOpen,
  refetch,
  id,
}: EditExpensePopupProps) {
  const [page] = useState(1);
  const updateExpense  = useUpdateExpense();
  const { data: categories } = useCategory(page);

  const { data: expense, isLoading: isExpenseLoading } = useGetExpenseById(id);

  const expenseSchema = z.object({
    amount: z.number().min(1, { message: "Số tiền phải lớn hơn 0" }),
    category: z.string().min(1, "Danh mục là bắt buộc"),
    date: z.string().min(1, "Ngày là bắt buộc"),
    description: z.string().optional(),
  });

  type ExpenseFormData = z.infer<typeof expenseSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    },
  });

useEffect(() => {
  console.log("expense data:", expense)
  if (expense && expense.data !== undefined) {
    reset({
      amount: expense.data.amount ?? 0,
      category: typeof expense.data.categoryId._id,
      date: expense.data.updatedAt
        ? new Date(expense.data.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      description: expense.data.title ?? "",
    })
  }
}, [expense, reset])

  const onSubmit = (formData: ExpenseFormData) => {
    updateExpense.mutate(
      {
        id,
        title: formData.description || "Không có tiêu đề",
        amount: formData.amount,
        categoryId: formData.category,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
          refetch();
        },
        onError: (error) => {
          console.error("Update thất bại:", error.message);
        },
      }
    );
  };

  if (isExpenseLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Chỉnh sửa chi tiêu
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-left mb-1">Số tiền (VNĐ)</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-left mb-1">Danh mục</label>
            <select
              {...register("category")}
              className="w-full border p-2 rounded"
            >
              <option value="">Chọn danh mục</option>
              {categories?.data.categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-left mb-1">Ngày</label>
            <input
              type="date"
              {...register("date")}
              className="w-full border p-2 rounded"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-left mb-1">
              Mô tả (không bắt buộc)
            </label>
            <textarea
              {...register("description")}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={updateExpense .isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {updateExpense .isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

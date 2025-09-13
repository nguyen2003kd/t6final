"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCategory } from "@/api/endpoints/usegerCategory";
import { useState } from "react";
import { useAddExpense } from "@/api/endpoints/useaddExpense";
import { toast } from "sonner";
interface AddExpensePopupProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:()=>void
}

export default function AddExpensePopup({ setOpen,refetch }: AddExpensePopupProps) {
  const [page] = useState(1);
  const addExpense = useAddExpense();
  const { data, isLoading, isError } = useCategory(page);

  const expenseSchema = z.object({
    amount: z
      .number()
      .min(0.01, { message: "Số tiền phải lớn hơn 0" })
      .refine((val) => !isNaN(val), {
        message: "Số tiền phải là một con số",
      }),
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

  const onSubmit = (formData: ExpenseFormData) => {
    addExpense.mutate(
      {
        title: formData.description || "Không có tiêu đề",
        amount: formData.amount,
        categoryId: formData.category,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
          refetch()
          toast.success("Thêm Chi tiêu thành công")
        },
        onError: (error) => {
          toast.error(error.message)
          console.error("Thêm chi tiêu thất bại:", error.message);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Thêm chi tiêu mới</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Số tiền (VNĐ)</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Danh mục</label>
            <select
              {...register("category")}
              className="w-full border p-2 rounded"
            >
              <option value="">Chọn danh mục</option>
              {data?.data.categories.map((item) => (
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
            <label className="block mb-1">Ngày</label>
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
            <label className="block mb-1">Mô tả (không bắt buộc)</label>
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
              disabled={addExpense.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {addExpense.isPending ? "Đang lưu..." : "Thêm chi tiêu"}
            </button>
          </div>

          {addExpense.isError && (
            <p className="text-red-500 text-sm">
              {addExpense.error?.message || "Có lỗi xảy ra"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

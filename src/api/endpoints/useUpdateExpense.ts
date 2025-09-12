import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import links from "@/lib/link"
import { ExpenseRespont, ExpensePayload } from "@/api/types/Expense"
import { User } from "@/app/(main)/layout/libs/typeuser"

interface UpdateExpensePayload extends ExpensePayload {
  id: string
}

export function useUpdateExpense() {
  return useMutation<ExpenseRespont, Error, UpdateExpensePayload>({
    mutationFn: async (data: UpdateExpensePayload) => {
      const user = JSON.parse(localStorage.getItem("user") || "null") as User | null
      if (!user) throw new Error("Token chưa có, vui lòng đăng nhập")

      const { id, ...rest } = data

      const res = await axios.put<ExpenseRespont>(
        `${links.backendHost}/expenses/${id}`,
        rest,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      return res.data
    },
  })
}

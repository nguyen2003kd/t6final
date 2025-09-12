import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import links from "@/lib/link"
import { ExpensePayload, ExpenseRespont } from "@/api/types/Expense"
import { User } from "@/app/(main)/layout/libs/typeuser"

export function useAddExpense() {
  return useMutation<ExpenseRespont, Error, ExpensePayload>({
    mutationFn: async (data: ExpensePayload) => {
      const user = JSON.parse(localStorage.getItem("user") || "null") as User | null
      if (!user) throw new Error("Token chưa có, vui lòng đăng nhập")

      const res = await axios.post<ExpenseRespont>(
        `${links.backendHost}/expenses`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      return res.data
    },
  })
}

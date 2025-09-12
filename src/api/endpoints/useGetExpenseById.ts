
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import links from "@/lib/link";
import { User } from "@/app/(main)/layout/libs/typeuser";
import { Expensedata } from "@/api/types/Expense"

export function useGetExpenseById(id: string) {
  return useQuery<Expensedata>({
    queryKey: ["expense", id],
    queryFn: async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;
      if (!user) throw new Error("Token chưa có, vui lòng đăng nhập");

      const res = await axios.get<Expensedata>(
        `${links.backendHost}/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            Accept: "application/json",
          },
        }
      );
      return res.data;
    },
    enabled: !!id, // chỉ chạy khi có id
    staleTime: 1000 * 60,
  });
}

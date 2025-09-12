import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import links from "@/lib/link";
import { ExpenseRespont } from "@/api/types/Expense";
import { User } from "@/app/(main)/layout/libs/typeuser";

export const useExpenses = (page: number = 1, limit: number = 10) => {
  return useQuery<ExpenseRespont>({
    queryKey: ["expenses", page, limit],
    queryFn: async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;
      if (!user) throw new Error("Token chưa có, vui lòng đăng nhập");

      const res = await axios.get<ExpenseRespont>(
        `${links.backendHost}/expenses?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            Accept: "application/json",
          },
        }
      );
      return res.data; 
    },
    staleTime: 1000 * 60,
  });
};

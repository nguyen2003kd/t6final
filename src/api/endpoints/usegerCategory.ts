import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import links from "@/lib/link";
import { User } from "@/app/(main)/layout/libs/typeuser";
import { CategoryResponse } from "@/api/types/category"
export const useCategory = (page: number = 1, limit: number = 999) => {
  return useQuery<CategoryResponse>({
    queryKey: ["expenses", page, limit],
    queryFn: async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;
      if (!user) throw new Error("Token chưa có, vui lòng đăng nhập");

      const res = await axios.get<CategoryResponse>(
        `${links.backendHost}/categories?page=${page}&limit=${limit}`,
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

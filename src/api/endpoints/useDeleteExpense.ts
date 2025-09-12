import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import links from "@/lib/link";
import { User } from "@/app/(main)/layout/libs/typeuser";

const deleteExpense = async (id: string): Promise<void> => {
  const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;
  if (!user) throw new Error("Token chưa có, vui lòng đăng nhập");
  await axios.delete(`${links.backendHost}/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
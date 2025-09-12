import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UsergetPayload } from "@/api/types/register";
import links from "@/lib/link";
import {User} from '@/app/(main)/layout/libs/typeuser'
export function useGetUser() {
  return useQuery<UsergetPayload>({
    queryKey: ["user"],
    queryFn: async () => {
     const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;

      const res = await axios.get<UsergetPayload>(
        `${links.backendHost}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return res.data;
    },
  });
}

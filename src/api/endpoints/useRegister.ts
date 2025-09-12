import { useMutation } from "@tanstack/react-query";
import axios ,{ AxiosError }from "axios";
import {RegisterPayload,RegisterResponse} from '@/api/types/register'
import { ApiError } from "@/app/(main)/auth/libs/type";
import links from "@/lib/link";
export function useRegister() {
  return useMutation<RegisterResponse, AxiosError<ApiError>, RegisterPayload>({
    mutationFn: async (data: RegisterPayload) => {
      const res = await axios.post(
        `${links.backendHost}/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res.data;
    },
  });
}

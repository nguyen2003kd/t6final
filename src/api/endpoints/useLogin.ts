import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {LoginPayload,LoginResponse } from '@/api/types/register'
import links from "@/lib/link";
export function useLogin() {
  return useMutation<LoginResponse , Error, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      const res = await axios.post(
        `${links.backendHost}/auth/login`,
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

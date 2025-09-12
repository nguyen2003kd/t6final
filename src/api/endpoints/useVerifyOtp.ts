import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import links from "@/lib/link";
import {VerifyOtpPayload,VerifyOtpResponse} from '@/api/types/register'
export function useVerifyOtp() {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpPayload>({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const res = await axios.post(
        `${links.backendHost}/auth/verify-otp`,
        payload,
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

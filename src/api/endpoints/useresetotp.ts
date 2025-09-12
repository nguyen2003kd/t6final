import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import links from "@/lib/link";
import {ResendOtpResponse,ResendOtpPayload} from '@/api/types/register'


export function useResendOtp() {
  return useMutation<ResendOtpResponse, Error, ResendOtpPayload>({
    mutationFn: async (payload: ResendOtpPayload) => {
      const res = await axios.post(
        `${links.backendHost}/auth/resend-otp`,
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

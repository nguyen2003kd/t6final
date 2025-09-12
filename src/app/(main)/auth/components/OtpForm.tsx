"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useVerifyOtp } from "@/api/endpoints/useVerifyOtp";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP phải có 6 số"),
});

type OtpSchema = z.infer<typeof otpSchema>;

export const OtpForm = ({ email, onSuccess }: { email: string; onSuccess: () => void }) => {
  const verifyOtp = useVerifyOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({ resolver: zodResolver(otpSchema) });

  const onVerifyOtp = (data: OtpSchema) => {
    verifyOtp.mutate(
      { email, otp: data.otp },
      {
        onSuccess: () => {
          toast.success("Xác minh OTP thành công!");
          onSuccess();
        },
        onError: () => toast.error("OTP không hợp lệ!"),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onVerifyOtp)} className="space-y-4">
      <div className="space-y-2">
        <Label>OTP</Label>
        <Input placeholder="Nhập mã OTP" {...register("otp")} />
        {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={verifyOtp.isPending}>
        {verifyOtp.isPending ? "Đang xác minh..." : "Xác minh OTP"}
      </Button>
    </form>
  );
};

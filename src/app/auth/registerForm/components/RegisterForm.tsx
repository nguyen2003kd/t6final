"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRegister } from "@/api/endpoints/useRegister";
import { OtpForm } from "@/app/auth/components/OtpForm";
import { useRouter } from "next/navigation";
// schema đăng ký
const registerSchema = z.object({
  name: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirm:z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự")
});

type RegisterSchema = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const registerMutation = useRegister();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
 const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onRegister = (data: RegisterSchema) => {
    if(data.confirm!=data.password)
    {
      toast.error("mật khẩu không khớp !")
      return
    }
    registerMutation.mutate(
      { name: data.name, email: data.email, password: data.password, role: "user" },
      {
        onSuccess: () => {
          toast.success("Đăng ký thành công. Vui lòng nhập OTP để xác thực.");
          setEmail(data.email); 
          setStep("otp");       
        },
        onError: (err) => {
          const message = err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
          toast.error(message);
        },
      }
    );
  };

  if (step === "otp") {
    return <OtpForm email={email}  Success={() => {
      toast.success("Tài khoản đã được xác thực!")
      router.push('/')
    }} />;
  }

  return (
    <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
      <div className="space-y-2">
        <Label>Tên</Label>
        <Input placeholder="Nhập tên" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input placeholder="Nhập email" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Mật khẩu</Label>
        <Input type="password" placeholder="Nhập mật khẩu" {...register("password")} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Xác nhận Mật khẩu</Label>
        <Input placeholder="Xác nhận Mật khẩu" type="password" {...register("confirm")} />
        {errors.confirm && (
          <p className="text-red-500">{errors.confirm.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </form>
  );
};

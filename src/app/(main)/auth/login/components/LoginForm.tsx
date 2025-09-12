"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/api/endpoints/useLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});
type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

const onLogin = (data: LoginSchema) => {
  mutate(
    { email: data.email, password: data.password },
    {
      onSuccess: (res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: res.data.token,
          })
        );

        toast.success("Đăng nhập thành công!");
        router.push("/");
      },
      onError: () => toast.error("Tài khoản hoặc mật khẩu không đúng"),
    }
  );
};

  return (
    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
      <div>
        <Label>Email</Label>
        <Input type="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label>Mật khẩu</Label>
        <Input type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
      <Link className="text-sm" href="/auth/registerForm"> Dont have an account? Sign up</Link>
      <Toaster richColors />
    </form>
  );
}

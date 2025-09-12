"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";


//Schema login
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

//Schema register
const registerSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Xác nhận mật khẩu ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

const Auth = () => {
  // Form login
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  // Form register
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: z.infer<typeof loginSchema>) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "User", email: data.email, avatar: "/placeholder.svg" })
    );
    toast.success("Đăng nhập thành công!");
  };

  const onRegister = (data: z.infer<typeof registerSchema>) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.name, email: data.email, avatar: "/placeholder.svg" })
    );
    toast.success("Đăng ký thành công!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary">
            <div className="relative">
              <DollarSign className="h-8 w-8" />
              <TrendingUp className="h-4 w-4 absolute -top-1 -right-1 text-success" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-[#37D39A] font-bold bg-gradient-to-r from-primary to-success bg-clip-text">
              Expense Tracker
            </h1>
            <p className="text-muted-foreground mt-2">
              Quản lý chi tiêu thông minh
            </p>
          </div>
        </div>
        <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-muted/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Chào mừng</CardTitle>
            <CardDescription className="text-center">
              Đăng nhập hoặc tạo tài khoản để bắt đầu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Đăng Nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng Ký</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="your@email.com" {...loginRegister("email")} />
                    {loginErrors.email && (
                      <p className="text-sm text-red-500">{loginErrors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Mật khẩu</Label>
                    <Input type="password" {...loginRegister("password")} />
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                    Đăng Nhập
                  </Button>
                </form>
              </TabsContent>

              {/* REGISTER */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Họ tên</Label>
                    <Input placeholder="Nguyễn Văn A" {...registerRegister("name")} />
                    {registerErrors.name && (
                      <p className="text-sm text-red-500">{registerErrors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="your@email.com" {...registerRegister("email")} />
                    {registerErrors.email && (
                      <p className="text-sm text-red-500">{registerErrors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Mật khẩu</Label>
                    <Input type="password" {...registerRegister("password")} />
                    {registerErrors.password && (
                      <p className="text-sm text-red-500">{registerErrors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Xác nhận mật khẩu</Label>
                    <Input type="password" {...registerRegister("confirmPassword")} />
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-red-500">{registerErrors.confirmPassword.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                    Đăng Ký
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

import { RegisterForm } from "./components/RegisterForm";
import { DollarSign, TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo + Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary">
            <div className="relative">
              <DollarSign className="h-8 w-8" />
              <TrendingUp className="h-4 w-4 absolute -top-1 -right-1 text-success" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-[#37D39A] font-bold">
              Expense Tracker
            </h1>
            <p className="text-muted-foreground mt-2">
              Quản lý chi tiêu thông minh
            </p>
          </div>
        </div>
        <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-muted/20 p-5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Đăng ký</CardTitle>
          </CardHeader>
            <RegisterForm />
        </Card>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, User, LogOut, Settings } from "lucide-react";
import { useGetUser } from "@/api/endpoints/usegetUser";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { data, isLoading, error } = useGetUser();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.replace("/auth/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) return null;

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Expense Tracker
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button className="text-sm font-medium transition-colors hover:text-primary text-primary border-b-2 border-primary">
              Dashboard
            </button>
            <button className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
              Profile
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-muted-foreground">
              {data?.data.user.name}
            </span>
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 relative">
                <User className="h-4 w-4" />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={5}
                  className="absolute right-0 mt-2 bg-card rounded-md shadow-lg p-2 w-48"
                >
                  <DropdownMenu.Item
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    <Settings className="h-4 w-4" /> Profile Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </nav>
  );
}

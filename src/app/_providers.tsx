"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.replace("/auth/login");
    }
  }, [router]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

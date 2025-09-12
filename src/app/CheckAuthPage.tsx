'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      toast.error('Vui lòng đăng nhập trước!')
      router.replace('/auth/login')
    }

    setChecking(false)
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Đang kiểm tra quyền truy cập...</p>
      </div>
    )
  }

  return <>{children}</>
}

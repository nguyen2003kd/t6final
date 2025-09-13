'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { publicRoutes } from '@/config/routes'
interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (publicRoutes.includes(pathname)) {
      setAuthorized(true)
      return
    }

    const userStr = localStorage.getItem('user')

    if (!userStr) {
      toast.error('Vui lòng đăng nhập trước!')
      router.replace('/auth/login')
      return setAuthorized(false)
    }

    try {
      const user = JSON.parse(userStr)
      if (!user?.token) {
        toast.error('Phiên đăng nhập không hợp lệ!')
        router.replace('/auth/login')
        return setAuthorized(false)
      }

      setAuthorized(true)
    } catch (err) {
      console.error('AuthGuard error:', err)
      router.replace('/auth/login')
      setAuthorized(false)
    }
  }, [pathname, router])

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Đang kiểm tra quyền truy cập...</p>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return <>{children}</>
}

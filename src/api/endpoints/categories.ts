'use client' // bắt buộc nếu muốn log trên trình duyệt

import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
import { CategoryResponse } from '../types/category'
import links from '@/lib/link'

export function useCategories(page: number = 1) {
  return useQuery<CategoryResponse>({
    queryKey: ['categories', page],
    queryFn: async () => {
      const { data } = await Axios.get<CategoryResponse>(
        `/api/categories?page=${page}&limit=10`
      )
      console.log('API response:', data)
      return data
    },
  })
}
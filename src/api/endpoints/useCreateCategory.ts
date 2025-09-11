'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from 'axios'
import { CategoryResponse } from '../types/category'

type NewCategory = { name: string; slug: string }

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation<CategoryResponse, unknown, NewCategory>({
    mutationFn: async (newCategory: NewCategory) => {
      const { data } = await Axios.post<CategoryResponse>(
        '/api/categories',
        newCategory
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (err) => {
      console.error('Thêm category thất bại', err)
    }
  })
}

// Thể loại
export interface Category {
  _id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

// Phân trang
export interface Pagination {
  currentPage: number
  totalPages: number
  totalCategories: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

// Response API
export interface CategoryResponse {
  success: boolean
  message: string
  data: {
    categories: Category[]
    pagination: Pagination
  }
}

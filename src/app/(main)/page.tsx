'use client'
import { useCategories } from '@/api/endpoints/categories'
export default function Home() {
  const { data, isLoading, error } = useCategories(1)

if (isLoading) return <p>Đang tải...</p>
if (error) return <p>Có lỗi xảy ra</p>

return (
  <div>
    {data?.data.categories.map(cat => (
      <div key={cat._id}>
        <h3>{cat.name}</h3>
        <p>Slug: {cat.slug}</p>
        <p>Ngày tạo: {cat.createdAt}</p>
      </div>
    ))}

    <p>
      Trang {data?.data.pagination.currentPage} / {data?.data.pagination.totalPages}
    </p>
  </div>
)
}

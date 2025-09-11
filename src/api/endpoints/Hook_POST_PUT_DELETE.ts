// import { useMutation, UseMutationOptions } from '@tanstack/react-query'
// import Axios from 'axios'
// import links from '@/lib/link'
// export function useMutationApi<T = any, D = any>(
//   url: string,
//   method: 'POST' | 'PUT' | 'DELETE' = 'POST',
//   options?: UseMutationOptions<T, unknown, D>
// ) {
//   const axiosInstance = Axios.create({
//     baseURL: links.apiEndpoint,
//     headers: {
//       'Accept-Language': 'vi',
//       // Authorization: 'Bearer token nếu cần'
//     }
//   })

//   return useMutation<T, unknown, D>({
//     mutationFn: async (data: D) => {
//       const response = await axiosInstance.request<T>({
//         url,
//         method,
//         data
//       })
//       return response.data
//     },
//     ...options
//   })
// }

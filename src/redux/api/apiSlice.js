import { createApi } from '@reduxjs/toolkit/query/react'
import qs from 'query-string'
import axiosInstance from '@/utils/axios'
import { API_LIST_PRODUCT} from '@/routes/api'
const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.response?.status || axiosError?.code,
          data:
            axiosError.response?.data || axiosError?.data || axiosError.message,
        },
      }
    }
  }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getListProducts: builder.query({
      query: (queries = {}) => ({
        url: `${API_LIST_PRODUCT}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${API_LIST_PRODUCT}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: (dataForm) => ({
        url: `${API_LIST_PRODUCT}`,
        data:dataForm,
        method: 'POST',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({productId, dataForm}) => ({
        url: `${API_LIST_PRODUCT}/${productId}`,
        data:dataForm,
        method: 'PUT',
      }),
      invalidatesTags: ['Products'],
    }),

  }),
})

export const {useGetListProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation} = apiSlice

import { apiSlice } from "@/redux/api/apiSlice"
import { API_PAYMENT } from "@/routes/api"
import qs from 'query-string'

const apiWithTag = apiSlice.enhanceEndpoints({addTagTypes : ['Orders']})
export const orderApiSlice = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getListOrder: builder.query({
            query: (queries = {}) =>({
                url: `${API_PAYMENT}?${qs.stringify(queries)}`,
                method: 'GET'
            }),
            providesTags: ['Orders']
        }),
        updateOrder: builder.mutation({
            query: ({order_id, data})=>({
                url:`${API_PAYMENT}/${order_id}`,
                data,
                method: 'PUT'
            }),
            invalidatesTags: ['Orders']
        }),
        deleteOrder: builder.mutation({
            query: (order_id) =>({
                url:`${API_PAYMENT}/${order_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const { useGetListOrderQuery, useUpdateOrderMutation, useDeleteOrderMutation } = orderApiSlice
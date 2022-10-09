import { apiSlice } from "@/redux/api/apiSlice"
import { API_LIST_CATEGORY } from "@/routes/api"
import qs from 'query-string'

const apiWithTag = apiSlice.enhanceEndpoints({addTagTypes : ['Categoies']})
export const categoryApiSlice = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getListCategory: builder.query({
            query: (queries = {}) =>({
                url: `${API_LIST_CATEGORY}?${qs.stringify(queries)}`,
                method: 'GET'
            }),
            providesTags: ['Categoies']
        }),
        createCategory: builder.mutation({
            query: (data) =>({
                url:API_LIST_CATEGORY,
                data,
                method: 'POST'
            }),
            invalidatesTags: ['Categoies']
        }),
        updateCategory: builder.mutation({
            query: ({category_id, data})=>({
                url:`${API_LIST_CATEGORY}/${category_id}`,
                data,
                method: 'PUT'
            }),
            invalidatesTags: ['Categoies']
        }),
        deleteCategory: builder.mutation({
            query: (category_id) =>({
                url:`${API_LIST_CATEGORY}/${category_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categoies']
        })
    })
})

export const { useGetListCategoryQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation  } = categoryApiSlice
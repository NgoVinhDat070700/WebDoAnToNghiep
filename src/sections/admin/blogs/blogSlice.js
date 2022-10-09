import { apiSlice } from "@/redux/api/apiSlice"
import { API_NEWS } from "@/routes/api"
import qs from 'query-string'

const apiWithTag = apiSlice.enhanceEndpoints({addTagTypes : ['Blogs']})
export const blogApiSlice = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getListBlog: builder.query({
            query: (queries = {}) =>({
                url: `${API_NEWS}?${qs.stringify(queries)}`,
                method: 'GET'
            }),
            providesTags: ['Blogs']
        }),
        createBlog: builder.mutation({
            query: (data) =>({
                url:API_NEWS,
                data,
                method: 'POST'
            }),
            invalidatesTags: ['Categoies']
        }),
        updateBlog: builder.mutation({
            query: ({category_id, data})=>({
                url:`${API_NEWS}/${category_id}`,
                data,
                method: 'PUT'
            }),
            invalidatesTags: ['Categoies']
        }),
        deleteBlog: builder.mutation({
            query: (category_id) =>({
                url:`${API_NEWS}/${category_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categoies']
        })
    })
})

export const { useGetListBlogQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation   } = blogApiSlice
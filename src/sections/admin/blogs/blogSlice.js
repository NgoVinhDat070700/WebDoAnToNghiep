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
            invalidatesTags: ['Blogs']
        }),
        updateBlog: builder.mutation({
            query: ({blogId, dataForm})=>({
                url:`${API_NEWS}/${blogId}`,
                data: dataForm,
                method: 'PUT'
            }),
            invalidatesTags: ['Blogs']
        }),
        deleteBlog: builder.mutation({
            query: (blog_id) =>({
                url:`${API_NEWS}/${blog_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Blogs']
        })
    })
})

export const { useGetListBlogQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation   } = blogApiSlice
import { apiSlice } from '@/redux/api/apiSlice'
import { API_LIST_USER } from '@/routes/api'
import qs from 'query-string'

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Users'] })
export const UserApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getListUser: builder.query({
      query: (queries = {}) => ({
        url: `${API_LIST_USER}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({ USER_id, data }) => ({
        url: `${API_LIST_USER}/${USER_id}`,
        data,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (USER_id) => ({
        url: `${API_LIST_USER}/${USER_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetListUserQuery, useDeleteUserMutation, useUpdateUserMutation } = UserApiSlice

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
      query: ({ user_id, dataResult }) => ({
        url: `${API_LIST_USER}/${user_id}`,
        data:{role:dataResult},
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (user_id) => ({
        url: `${API_LIST_USER}/${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetListUserQuery, useDeleteUserMutation, useUpdateUserMutation } = UserApiSlice

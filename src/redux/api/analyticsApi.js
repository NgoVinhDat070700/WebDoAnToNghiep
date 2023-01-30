import qs from 'query-string'
import { apiSlice } from './apiSlice'

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });
const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Statistics'] })
export const statisticApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsersStats: builder.query({
      query: (queries = {}) => ({
        url: `/analytics/stats/users?${qs.stringify(queries)}}`,
        providesTags: ['Statistics'],
      }),
    }),
    getIncomeStats: builder.query({
      query: (queries = {}) => ({
        url: `/analytics/stats/income?${qs.stringify(queries)}`,
        providesTags: ['Statistics'],
      }),
    }),
    getStatusStats: builder.query({
      query: (queries = {}) =>({
        url: `/analytics/stats/statuses?${qs.stringify(queries)}`,
        providesTags: ["Statistics"],
      })
    }),
  }),
})
export const { useGetIncomeStatsQuery, useGetUsersStatsQuery, useGetStatusStatsQuery } = statisticApi

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./authQuery";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["PaymentIntent"],
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: `/users/create-payment-intent`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "PaymentIntent" }],
    }),
    refundPayment: builder.mutation({
      query: (orderId) => ({
        url: `/users/refund/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "PaymentIntent" }],
    }),
  }),
});
export const { useCreatePaymentIntentMutation, useRefundPaymentMutation } = stripeApi;

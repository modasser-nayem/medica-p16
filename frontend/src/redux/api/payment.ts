import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { API_ENDPOINTS, API_METHODS } from "@/constant";
import { IGetPaymentFilters, IPayment } from "@/types";

export const paymentApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      // success payment handler
      successPaymentHandler: builder.mutation<
         SuccessResponse<{ amount: string; currency: string }>,
         string
      >({
         query: (sessionId) => ({
            url: API_ENDPOINTS.PAYMENT.SUCCESS_HANDLER(sessionId),
            method: API_METHODS.POST,
         }),
         invalidatesTags: ["appointment"],
         extraOptions: { disableToast: true },
      }),

      // retry payment process
      retryPaymentProcess: builder.mutation<
         SuccessResponse<any>,
         { sessionId: string }
      >({
         query: (data) => ({
            url: API_ENDPOINTS.PAYMENT.RETRY_PAYMENT_PROCESS,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["appointment"],
         extraOptions: { disableToast: true },
      }),

      // repayment
      repayment: builder.mutation<
         SuccessResponse<any>,
         { appointmentId: string }
      >({
         query: (data) => ({
            url: API_ENDPOINTS.PAYMENT.REPAYMENT,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["appointment"],
         extraOptions: { disableToast: true },
      }),

      // get all payments
      getAllPayments: builder.query<
         SuccessResponse<IPayment[]>,
         IGetPaymentFilters
      >({
         query: (filters?) => ({
            url: API_ENDPOINTS.PAYMENT.GET_PAYMENTS,
            method: API_METHODS.GET,
            params: filters,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["appointment"],
      }),
   }),
});

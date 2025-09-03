import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { IAuthUser, IForgotPassword, ILoginUser, IRegisterUser } from "@/types";
import { API_ENDPOINTS, API_METHODS } from "@/constant";

export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<SuccessResponse<null>, any>({
         query: (data: IRegisterUser) => ({
            url: API_ENDPOINTS.AUTH.REGISTER,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["users"],
      }),
      login: builder.mutation<SuccessResponse<IAuthUser>, any>({
         query: (data: ILoginUser) => ({
            url: API_ENDPOINTS.AUTH.LOGIN,
            method: API_METHODS.POST,
            body: data,
         }),
      }),
      logout: builder.mutation<SuccessResponse<null>, void>({
         query: () => ({
            url: API_ENDPOINTS.AUTH.LOGOUT,
            method: API_METHODS.POST,
         }),
      }),
      refresh: builder.mutation<SuccessResponse<IAuthUser>, any>({
         query: () => ({
            url: API_ENDPOINTS.AUTH.REFRESH,
            method: API_METHODS.POST,
         }),
      }),
      forgotPassword: builder.mutation({
         query: (data: IForgotPassword) => ({
            url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
            method: API_METHODS.POST,
            body: data,
         }),
      }),
      resetPassword: builder.mutation({
         query: (data: ILoginUser) => ({
            url: API_ENDPOINTS.AUTH.LOGIN,
            method: API_METHODS.PUT,
            body: data,
         }),
      }),
      getMe: builder.query<SuccessResponse<IAuthUser>, void>({
         query: () => API_ENDPOINTS.AUTH.AUTH_USER,
         extraOptions: { disableToast: true },
      }),
   }),
});

import {
   IChangePassword,
   IUpdateDoctorProfile,
   IUpdatePatientProfile,
   IUpdateUserProfile,
   SuccessResponse,
} from "@/types";
import { baseApi } from "./base";
import { API_ENDPOINTS, API_METHODS } from "@/constant";

export const userApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getProfile: builder.query<SuccessResponse<any>, void>({
         query: () => API_ENDPOINTS.USER.PROFILE,
         extraOptions: { disableToast: true },
         providesTags: ["users"],
      }),

      updateUserInformation: builder.mutation({
         query: (data: IUpdateUserProfile) => ({
            url: API_ENDPOINTS.USER.UPDATE_USER_PROFILE,
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["users"],
      }),

      updatePatientProfile: builder.mutation({
         query: (data: IUpdatePatientProfile) => ({
            url: API_ENDPOINTS.USER.UPDATE_PATIENT_PROFILE,
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["users"],
      }),
      updateDoctorProfile: builder.mutation({
         query: (data: IUpdateDoctorProfile) => ({
            url: API_ENDPOINTS.USER.UPDATE_DOCTOR_PROFILE,
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["users"],
      }),
      getUsers: builder.query<SuccessResponse<any>, void>({
         query: () => API_ENDPOINTS.USER.GET_LIST,
         extraOptions: { disableToast: true },
         providesTags: ["users"],
      }),
      updateUserStatus: builder.mutation({
         query: (userId: string) => ({
            url: API_ENDPOINTS.USER.UPDATE_STATUS(userId),
            method: API_METHODS.PATCH,
         }),
         invalidatesTags: ["users"],
      }),
      deleteUser: builder.mutation({
         query: (userId: string) => ({
            url: API_ENDPOINTS.USER.DELETE(userId),
            method: API_METHODS.DELETE,
         }),
         invalidatesTags: ["users"],
      }),
      changePassword: builder.mutation({
         query: (data: IChangePassword) => ({
            url: API_ENDPOINTS.USER.CHANGE_PASSWORD,
            method: API_METHODS.PUT,
            body: data,
         }),
      }),
   }),
});

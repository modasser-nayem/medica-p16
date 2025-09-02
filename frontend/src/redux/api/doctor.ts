import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { API_ENDPOINTS, API_METHODS } from "@/constant";
import {
   IConsultationFee,
   ICreateOrUpdateFees,
   IDoctor,
   IDoctorDetails,
   IGetDoctorsFilter,
   IScheduleSlot,
} from "@/types/doctor";

export const doctorApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getDoctors: builder.query<SuccessResponse<IDoctor[]>, IGetDoctorsFilter>({
         query: (params?) => ({
            url: API_ENDPOINTS.DOCTOR.GET_LIST,
            method: API_METHODS.GET,
            params,
         }),
         extraOptions: { disableToast: true },
      }),
      getDoctorDetails: builder.query<SuccessResponse<IDoctorDetails>, string>({
         query: (doctorId) => ({
            url: API_ENDPOINTS.DOCTOR.DETAILS(doctorId),
            method: API_METHODS.GET,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["fees"],
      }),
      getDoctorSlots: builder.query<SuccessResponse<IScheduleSlot[]>, string>({
         query: (doctorId) => ({
            url: API_ENDPOINTS.DOCTOR.SLOTS(doctorId),
            method: API_METHODS.GET,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["slots", "schedule"],
      }),
      createOrUpdateFees: builder.mutation<SuccessResponse<any>, any>({
         query: (data: ICreateOrUpdateFees) => ({
            url: API_ENDPOINTS.DOCTOR.CREATE_FEES,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["fees"],
      }),
      getFees: builder.query<SuccessResponse<IConsultationFee[]>, string>({
         query: (doctorId) => ({
            url: API_ENDPOINTS.DOCTOR.GET_FEES(doctorId),
            method: API_METHODS.GET,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["fees"],
      }),
      updateFeeActivation: builder.mutation<SuccessResponse<any>, string>({
         query: (feeId) => ({
            url: API_ENDPOINTS.DOCTOR.UPDATE_FEES(feeId),
            method: API_METHODS.PATCH,
         }),
         invalidatesTags: ["fees"],
      }),
   }),
});

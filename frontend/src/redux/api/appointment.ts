import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { API_ENDPOINTS, API_METHODS } from "@/constant";
import {
   ICancelAppointment,
   IGetAppointmentsFilters,
   IRescheduleAppointment,
} from "@/types";

export interface ICreateAppointment {
   doctorId: string;
   patientId: string;
   startsAt: string;
   consultType: "CHAT" | "VOICE" | "VIDEO";
}

export const appointmentApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      createAppointment: builder.mutation<SuccessResponse<any>, any>({
         query: (data: ICreateAppointment) => ({
            url: API_ENDPOINTS.APPOINTMENT.CREATE,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["appointment"],
      }),

      getAppointments: builder.query<SuccessResponse<any>, any>({
         query: (filters?: IGetAppointmentsFilters) => ({
            url: API_ENDPOINTS.APPOINTMENT.GET_LIST,
            method: API_METHODS.GET,
            params: filters,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["appointment"],
      }),

      getAppointmentDetails: builder.query<SuccessResponse<any>, any>({
         query: (id: string) => ({
            url: API_ENDPOINTS.APPOINTMENT.DETAILS(id),
            method: API_METHODS.GET,
         }),
         extraOptions: { disableToast: true },
      }),

      rescheduleAppointment: builder.mutation<SuccessResponse<any>, any>({
         query: ({
            data,
            appointmentId,
         }: {
            data: IRescheduleAppointment;
            appointmentId: string;
         }) => ({
            url: API_ENDPOINTS.APPOINTMENT.RESCHEDULE(appointmentId),
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["appointment"],
      }),

      cancelAppointment: builder.mutation<SuccessResponse<any>, any>({
         query: ({
            data,
            appointmentId,
         }: {
            data: ICancelAppointment;
            appointmentId: string;
         }) => ({
            url: API_ENDPOINTS.APPOINTMENT.CANCEL(appointmentId),
            method: API_METHODS.PATCH,
            body: data,
         }),
         invalidatesTags: ["appointment"],
      }),
   }),
});

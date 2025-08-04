import { api } from "@/lib/axios";
import {
   ApiResponse,
   CreateAppointment,
   IGetAppointmentsFilters,
   RescheduleAppointment,
} from "@/types";

export const appointmentService = {
   createAppointment: (data: CreateAppointment) =>
      api.post<ApiResponse<any>>("/appointments", { data }),

   getAppointments: (query: IGetAppointmentsFilters) =>
      api.get<ApiResponse<any>>("/appointments", { params: query }),

   getAppointmentDetails: (id: string) =>
      api.get<ApiResponse<any>>(`/appointments${id}`),

   rescheduleAppointment: ({
      appointmentId,
      data,
   }: {
      appointmentId: string;
      data: RescheduleAppointment;
   }) => api.put<ApiResponse<any>>(`/appointments/${appointmentId}`, { data }),

   cancelAppointment: (appointmentId: string) =>
      api.patch<ApiResponse<any>>(`/appointments/${appointmentId}`),

   deleteAppointment: (appointmentId: string) =>
      api.delete<ApiResponse<any>>(`/appointments/${appointmentId}`),

   availableTimeSlots: (data: CreateAppointment) =>
      api.get<ApiResponse<any>>("/doctor/available-slots", { data }),
};

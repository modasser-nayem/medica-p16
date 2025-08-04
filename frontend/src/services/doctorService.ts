import { api } from "@/lib/axios";
import { ApiResponse } from "@/types";
import {
   ConsultationFee,
   CreateOrUpdateConsultationFees,
   CreateSchedule,
   ISchedule,
   UpdateSchedule,
} from "@/types/doctor";

export const doctorService = {
   // Doctor Schedules
   createSchedule: ({ doctorId, data }: CreateSchedule) =>
      api.post<ApiResponse<ISchedule>>(`/doctor/${doctorId}/schedules`, {
         data,
      }),

   updateSchedule: ({ doctorId, scheduleId, data }: UpdateSchedule) =>
      api.put<ApiResponse<ISchedule>>(
         `/doctor/${doctorId}/schedules/${scheduleId}`,
         { data }
      ),

   getDoctorSchedules: (doctorId: string) =>
      api.get<ApiResponse<ISchedule[]>>(`/doctor/${doctorId}/schedules`),

   deleteSchedule: (doctorId: string) =>
      api.delete<ApiResponse<null>>(`/doctor/${doctorId}/schedules`),

   // Consultation Fees
   createOrUpdateConsultationFees: (data: CreateOrUpdateConsultationFees) =>
      api.post<ApiResponse<ConsultationFee>>(`/consultations/fees`, {
         data,
      }),

   getConsultationFees: (doctorId: string) =>
      api.get<ApiResponse<ConsultationFee[]>>(
         `/consultations/fees/${doctorId}`
      ),

   deleteConsultationFees: (consultationId: string) =>
      api.delete<ApiResponse<null>>(`/consultations/fees/${consultationId}`),
};

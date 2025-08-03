import { api } from "@/lib/axios";
import {
   ApiResponse,
   IAdminStats,
   IDoctorStats,
   IGetUserActivityFilters,
   IPatientStats,
   IPublicStats,
   IUserActivityLog,
} from "@/types";

export const analyticsService = {
   adminStats: () => api.get<ApiResponse<IAdminStats>>("/admin/stats"),

   doctorStats: () => api.get<ApiResponse<IDoctorStats>>("/doctor/stats"),

   patientStats: () => api.get<ApiResponse<IPatientStats>>("/patient/stats"),

   publicStats: () => api.get<ApiResponse<IPublicStats>>("/users/stats"),

   usersActivity: (filters: IGetUserActivityFilters) =>
      api.get<ApiResponse<IUserActivityLog>>("/users/activity", {
         params: filters,
      }),
};

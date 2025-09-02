import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import {
   IAdminStats,
   IDoctorStats,
   IPatientStats,
   IPublicStats,
   IUserActivityLog,
} from "@/types";
import { API_ENDPOINTS } from "@/constant";

export const analyticsApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      adminStats: builder.query<SuccessResponse<IAdminStats>, void>({
         query: () => API_ENDPOINTS.DASHBOARD.ADMIN_STATS,
         extraOptions: { disableToast: true },
      }),
      doctorStats: builder.query<SuccessResponse<IDoctorStats>, void>({
         query: () => API_ENDPOINTS.DASHBOARD.DOCTOR_STATS,
         extraOptions: { disableToast: true },
      }),
      patientStats: builder.query<SuccessResponse<IPatientStats>, void>({
         query: () => API_ENDPOINTS.DASHBOARD.PATIENT_STATS,
         extraOptions: { disableToast: true },
      }),
      publicStats: builder.query<SuccessResponse<IPublicStats>, void>({
         query: () => API_ENDPOINTS.DASHBOARD.PUBLIC_STATS,
         extraOptions: { disableToast: true },
      }),
      getUserActivity: builder.query<SuccessResponse<IUserActivityLog[]>, void>(
         {
            query: () => API_ENDPOINTS.DASHBOARD.USER_ACTIVITY,
            extraOptions: { disableToast: true },
         }
      ),
   }),
});

export const {
   useAdminStatsQuery,
   useDoctorStatsQuery,
   usePatientStatsQuery,
   usePublicStatsQuery,
   useGetUserActivityQuery,
} = analyticsApi;

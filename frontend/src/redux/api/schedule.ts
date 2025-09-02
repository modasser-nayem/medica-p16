import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { API_ENDPOINTS, API_METHODS } from "@/constant";
import {
   ICreateSchedule,
   ISchedule,
   IScheduleException,
   IUpdateSchedule,
} from "@/types/doctor";

export const scheduleApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getSchedules: builder.query<SuccessResponse<ISchedule[]>, void>({
         query: () => ({
            url: API_ENDPOINTS.SCHEDULE.GET_SCHEDULES,
            method: API_METHODS.GET,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["schedule"],
      }),
      createSchedule: builder.mutation<SuccessResponse<any>, any>({
         query: (data: ICreateSchedule) => ({
            url: API_ENDPOINTS.SCHEDULE.CREATE_SCHEDULE,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["schedule"],
      }),
      updateSchedule: builder.mutation<SuccessResponse<any>, any>({
         query: (data: IUpdateSchedule) => ({
            url: API_ENDPOINTS.SCHEDULE.UPDATE_SCHEDULE,
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["schedule"],
      }),
      deleteSchedule: builder.mutation<SuccessResponse<any>, string>({
         query: (scheduleId: string) => ({
            url: API_ENDPOINTS.SCHEDULE.DELETE_SCHEDULE(scheduleId),
            method: API_METHODS.DELETE,
         }),
         invalidatesTags: ["schedule"],
      }),
      createScheduleException: builder.mutation<SuccessResponse<any>, any>({
         query: (data) => ({
            url: API_ENDPOINTS.SCHEDULE.CREATE_EXCEPTION,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["schedule_exception"],
      }),
      getScheduleExceptions: builder.query<
         SuccessResponse<IScheduleException[]>,
         void
      >({
         query: () => ({
            url: API_ENDPOINTS.SCHEDULE.GET_EXCEPTIONS,
            method: API_METHODS.GET,
         }),
         extraOptions: { disableToast: true },
         providesTags: ["schedule_exception"],
      }),
      deleteScheduleException: builder.mutation<SuccessResponse<any>, any>({
         query: (exceptionId: string) => ({
            url: API_ENDPOINTS.SCHEDULE.DELETE_EXCEPTION(exceptionId),
            method: API_METHODS.DELETE,
         }),
         invalidatesTags: ["schedule_exception"],
      }),
   }),
});

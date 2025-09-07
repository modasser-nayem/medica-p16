import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { ICreateDepartment, IDepartment, IUpdateDepartment } from "@/types";
import { API_ENDPOINTS, API_METHODS } from "@/constant";

export const departmentApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      createDepartment: builder.mutation<
         SuccessResponse<IDepartment>,
         ICreateDepartment
      >({
         query: (data) => ({
            url: API_ENDPOINTS.DEPARTMENT.CREATE,
            method: API_METHODS.POST,
            body: data,
         }),
         invalidatesTags: ["department"],
      }),

      getDepartments: builder.query<SuccessResponse<IDepartment[]>, void>({
         query: () => API_ENDPOINTS.DEPARTMENT.GET_LIST,
         extraOptions: { disableToast: true },
         providesTags: ["department"],
      }),

      getSingleDepartment: builder.query<SuccessResponse<IDepartment>, string>({
         query: (id) => API_ENDPOINTS.DEPARTMENT.DETAILS(id),
         extraOptions: { disableToast: true },
      }),

      updateDepartment: builder.mutation<
         SuccessResponse<IDepartment>,
         { data: IUpdateDepartment; id: string }
      >({
         query: ({ data, id }) => ({
            url: API_ENDPOINTS.DEPARTMENT.UPDATE(id),
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["department"],
      }),

      deleteDepartment: builder.mutation<SuccessResponse<IDepartment>, string>({
         query: (departmentId) => ({
            url: API_ENDPOINTS.DEPARTMENT.DELETE(departmentId),
            method: API_METHODS.DELETE,
         }),
         invalidatesTags: ["department"],
      }),
   }),
});

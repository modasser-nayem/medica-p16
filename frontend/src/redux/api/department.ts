import { SuccessResponse } from "@/types/api";
import { baseApi } from "./base";
import { ICreateDepartment, IDepartment } from "@/types";
import { API_ENDPOINTS, API_METHODS } from "@/constant";

export const departmentApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      createDepartment: builder.mutation<SuccessResponse<IDepartment>, any>({
         query: (data: ICreateDepartment) => ({
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

      getSingleDepartment: builder.query<SuccessResponse<IDepartment>, any>({
         query: (id: string) => API_ENDPOINTS.DEPARTMENT.DETAILS(id),
         extraOptions: { disableToast: true },
      }),

      updateDepartment: builder.mutation<SuccessResponse<IDepartment>, any>({
         query: ({ data, id }: { data: ICreateDepartment; id: string }) => ({
            url: API_ENDPOINTS.DEPARTMENT.UPDATE(id),
            method: API_METHODS.PUT,
            body: data,
         }),
         invalidatesTags: ["department"],
      }),

      deleteDepartment: builder.mutation<SuccessResponse<IDepartment>, any>({
         query: (departmentId: string) => ({
            url: API_ENDPOINTS.DEPARTMENT.DELETE(departmentId),
            method: API_METHODS.DELETE,
         }),
         invalidatesTags: ["department"],
      }),
   }),
});

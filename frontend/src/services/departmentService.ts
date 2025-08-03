import { api } from "@/lib/axios";
import {
   ApiResponse,
   ICreateDepartment,
   IDepartment,
   IGetDepartmentsFilter,
   IUpdateDepartment,
} from "@/types";

export const departmentService = {
   createDepartment: (data: ICreateDepartment) =>
      api.post<ApiResponse<any>>("/departments", data),

   getDepartments: (filters: IGetDepartmentsFilter) =>
      api.get<ApiResponse<IDepartment[]>>("/departments", { params: filters }),

   getDepartmentDetails: (departmentId: string) =>
      api.get<ApiResponse<IDepartment>>(`/departments/${departmentId}`),

   updateDepartment: (departmentId: string, data: IUpdateDepartment) =>
      api.put<ApiResponse<any>>(`/departments/${departmentId}`, { data }),

   deleteDepartment: (departmentId: string) =>
      api.delete<ApiResponse<any>>(`/departments/${departmentId}`),
};

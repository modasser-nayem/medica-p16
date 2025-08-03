import { api } from "@/lib/axios";
import { ApiResponse, ChangePassword, ResetPassword } from "@/types";

export const authService = {
   register: (data: any, role: string) =>
      api.post<ApiResponse<any>>(`/auth/register/${role}`, data),

   login: (data: any) => api.post<ApiResponse<any>>("/auth/login", data),

   refreshToken: () => api.post<ApiResponse<any>>("/refresh-token"),

   forgotPassword: (email: string) =>
      api.post<ApiResponse<any>>("/forgot-password", { email }),

   resetPassword: (data: ResetPassword) =>
      api.put<ApiResponse<any>>("/forgot-password", { data }),

   changePassword: (data: ChangePassword) =>
      api.put<ApiResponse<any>>("/change-password", { data }),
};

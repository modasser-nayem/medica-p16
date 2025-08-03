import { api } from "@/lib/axios";
import { ApiResponse, IFilterUsers, User, UserRole } from "@/types";

export interface UpdatePatientProfile {
   name?: string;
   email?: string;
   phone?: string;
   dateOfBirth?: string;
   gender?: "MALE" | "FEMALE" | "OTHER";
   address?: string;
   bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
   emergencyContact?: string;
   medicalHistory?: string;
   allergies?: string;
}

export interface UpdateDoctorProfile {
   name?: string;
   email?: string;
   phone?: string;
   dateOfBirth?: string;
   gender?: "MALE" | "FEMALE" | "OTHER";
   address?: string;
   departmentId?: string;
   specialization?: string;
   qualifications?: string;
   experience?: number;
   licenseNumber: string;
   isAvailable?: boolean;
}

export interface UpdateAdminProfile {
   name?: string;
   email?: string;
   phone?: string;
   dateOfBirth?: string;
   gender?: "MALE" | "FEMALE" | "OTHER";
   address?: string;
   profileImage?: string;
}

export interface GetDoctorFilters {
   page?: number;
   limit?: number;
   search?: string;
   specialty?: string;
   rating?: number;
   available?: "yes" | "no";
   sortBy?: "rating" | "createdAt";
   orderBy?: "asc" | "desc";
}

export interface GetUsersFilter {
   page?: number;
   limit?: number;
   search?: string;
   active?: "yes" | "no";
   role?: UserRole;
   sortBy?: string;
   orderBy?: "asc" | "desc";
}

export const userService = {
   getProfile: () => api.get<ApiResponse<any>>("/users/profile"),

   getAllUSers: (filters: IFilterUsers) =>
      api.get<ApiResponse<User[]>>("/users", { params: filters }),

   updatePatientProfile: (data: UpdatePatientProfile) =>
      api.patch<ApiResponse<any>>("/users/profile/patient", { data }),

   updateDoctorProfile: (data: UpdateDoctorProfile) =>
      api.patch<ApiResponse<any>>("/users/profile/doctor", { data }),

   updateAdminProfile: (data: UpdateAdminProfile) =>
      api.patch<ApiResponse<any>>("/users/profile/admin", { data }),

   getDoctors: (filters: GetDoctorFilters) =>
      api.get<ApiResponse<any>>("/users/doctors", { params: filters }),

   getDoctorDetails: (doctorId: string) =>
      api.get<ApiResponse<any>>(`/users/doctors/${doctorId}`),

   getUsers: (filters: GetUsersFilter) =>
      api.get<ApiResponse<any>>("/users", { params: filters }),

   updateUserStatus: (userId: string) =>
      api.patch<ApiResponse<any>>(`/users/status/${userId}`),

   deleteUser: (userId: string) =>
      api.delete<ApiResponse<any>>(`/users/${userId}`),
};

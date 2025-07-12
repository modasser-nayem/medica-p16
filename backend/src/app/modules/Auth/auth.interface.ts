import { z } from "zod";
import { authSchemaValidation } from "./auth.validation";

export type TPatentRegistration = z.infer<
  typeof authSchemaValidation.patientRegister
>["body"];

export type TDoctorRegistration = z.infer<
  typeof authSchemaValidation.doctorRegister
>["body"];

export type TAdminRegistration = z.infer<
  typeof authSchemaValidation.adminRegister
>["body"];

export type TChangePassword = z.infer<
  typeof authSchemaValidation.changePassword
>["body"];

export interface TUserLogin {
  email: string;
  password: string;
}

export interface TLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    profileImage: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

export interface TRefreshToken {
  token: string;
}

export type TForgotPassword = {
  email: string;
};

export interface TResetPassword {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUpdateProfile {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  address?: string;
  profileImage?: string;
}

export interface IUpdateDoctorProfile extends IUpdateProfile {
  departmentId?: string;
  specialization?: string;
  qualifications?: string;
  experience?: number;
  licenseNumber?: string;
  consultationFee?: number;
  isAvailable?: boolean;
}

export interface IUpdatePatientProfile extends IUpdateProfile {
  bloodGroup?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  allergies?: string;
}

export interface IUpdateAdminProfile extends IUpdateProfile {
  adminRole?: "SUPER_ADMIN" | "HOSPITAL_ADMIN" | "DEPARTMENT_ADMIN";
}

export interface IUpdateLabTechProfile extends IUpdateProfile {
  license?: string;
}

export interface IUserFilters {
  role?: string;
  isActive?: boolean;
  isVerified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IUserStats {
  total: number;
  byRole: Record<string, number>;
  active: number;
  verified: number;
  online: number;
}

export interface IUserActivity {
  userId: string;
  action: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface ISession {
  id: string;
  userId: string;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface ILogoutRequest {
  refreshToken: string;
}

export interface ILogoutAllRequest {
  userId: string;
}

export interface IUserStatus {
  userId: string;
  status: "ONLINE" | "OFFLINE" | "AWAY" | "BUSY";
  lastSeen: Date;
}

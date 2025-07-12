import { z } from "zod";
import { userSchemaValidation } from "./user.validation";

export type TUpdatePatientProfile = z.infer<
  typeof userSchemaValidation.updatePatientProfile
>["body"];

export type TUpdateDoctorProfile = z.infer<
  typeof userSchemaValidation.updateDoctorProfile
>["body"];

export type TUpdateAdminProfile = z.infer<
  typeof userSchemaValidation.updateAdminProfile
>["body"];

export type TGetUsersFilter = z.infer<
  typeof userSchemaValidation.getUsersQuerySchema
>["query"];

export type TGetDoctorsFilter = z.infer<
  typeof userSchemaValidation.getDoctorsQuery
>["query"];

export interface IUserStats {
  total: number;
  byRole: Record<string, number>;
  active: number;
  online: number;
  newThisMonth: number;
  newThisWeek: number;
}

export interface IUserActivityLog {
  id: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  action: string;
  entity: string;
  entityId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface IGetUserActivityFilters {
  userId?: string;
  action?: string;
  entity?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IUserDashboard {
  user: IUserProfileWithDetails;
  stats: {
    totalAppointments?: number;
    completedAppointments?: number;
    pendingAppointments?: number;
    totalConsultations?: number;
    totalPrescriptions?: number;
    totalLabTests?: number;
    totalPayments?: number;
    totalNotifications?: number;
  };
  recentActivity: IUserActivityLog[];
}

export interface IUserStatus {
  userId: string;
  status: "ONLINE" | "OFFLINE" | "AWAY" | "BUSY";
  lastSeen: Date;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  address: string | null;
  profileImage: string | null;
  role: "PATIENT" | "DOCTOR" | "ADMIN" | "LAB_TECH";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProfileWithDetails extends IUserProfile {
  patientProfile?: {
    id: string;
    bloodGroup: string | null;
    emergencyContact: string | null;
    medicalHistory: string | null;
    allergies: string | null;
  } | null;
  doctorProfile?: {
    id: string;
    department: {
      id: string;
      name: string;
    };
    specialization: string;
    qualifications: string;
    experience: number;
    licenseNumber: string;
    isAvailable: boolean;
  } | null;
  adminProfile?: {
    id: string;
    role: string;
  } | null;
}

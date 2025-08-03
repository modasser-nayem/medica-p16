import { z } from "zod";
import { userSchemaValidation } from "./user.validation";
import { PaginationQuery } from "../../types/pagination";
import { TUserRole } from "../../types/global";

export type TUpdatePatientProfile = z.infer<
  typeof userSchemaValidation.updatePatientProfile
>["body"];

export type TUpdateDoctorProfile = z.infer<
  typeof userSchemaValidation.updateDoctorProfile
>["body"];

export type TUpdateAdminProfile = z.infer<
  typeof userSchemaValidation.updateAdminProfile
>["body"];

export interface TGetUsersFilter extends PaginationQuery {
  search?: string;
  active?: "yes" | "no";
  role?: TUserRole;
}

export interface TGetDoctorsFilter extends PaginationQuery {
  search?: string;
  specialty?: string;
  rating?: number;
  available?: "yes" | "no";
  sortBy?: "rating" | "createdAt";
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

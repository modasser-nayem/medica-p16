import { BLOOD_GROUP_OPTIONS } from "@/constant/index";
import { GENDER_OPTIONS } from "@/constant";
import { IAppointment } from "./appointment";
import { IDepartment } from "./department";
import z from "zod";
import { userValidation } from "@/validation/user";

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";
export type IGender = keyof typeof GENDER_OPTIONS;

export type IBloodGroup = keyof typeof BLOOD_GROUP_OPTIONS;

export interface IFilterUsers {
   search?: string;
   role?: string;
   isActive?: boolean | "";
}

export interface User {
   id: string;
   name: string;
   email: string;
   phone?: string;
   dateOfBirth?: string;
   gender?: typeof GENDER_OPTIONS;
   address?: string;
   profileImage?: string;
   role: UserRole;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
}

export type IPatientProfile = {
   bloodGroup?: IBloodGroup;
   emergencyContact?: string;
   medicalHistory?: string;
   allergies?: string;
};

export type IDoctorProfile = {
   departmentId?: string | undefined;
   specialties?: string | undefined;
   qualification?: string | undefined;
   experience?: number | undefined;
   bio?: string | undefined;
   timeZone?: string | undefined;
};

export type IUpdateUserProfile = z.infer<
   typeof userValidation.updateUserProfile
>;

export type IUpdatePatientProfile = z.infer<
   typeof userValidation.updatePatientProfile
>;

export type IUpdateDoctorProfile = z.infer<
   typeof userValidation.updateDoctorProfile
>;

export interface Doctor extends User {
   role: "DOCTOR";
   specialization: string;
   qualifications: string;
   experience: number;
   licenseNumber: string;
   isAvailable: boolean;
   departmentId: string;
   department: IDepartment;
   rating: number;
   availability: DoctorAvailability[];
   totalConsultations: number;
}

export interface Patient extends User {
   role: "PATIENT";
   bloodGroup: string;
   emergencyContact: string;
   medicalHistory: string;
   allergies: string;
   appointments: IAppointment[];
}

export interface Admin extends User {
   role: "ADMIN";
}

export interface DoctorAvailability {
   id: string;
   doctorId: string;
   dayOfWeek: number; // 0-6 (Sunday-Saturday)
   startTime: string; // HH:mm format
   endTime: string; // HH:mm format
   isAvailable: boolean;
}

export interface Prescription {
   id: string;
   appointmentId: string;
   patientId: string;
   doctorId: string;
   instructions: string;
   diagnosis: string;
   nextVisitDate?: string;
   createdAt: string;
   updatedAt: string;
}

export interface Notification {
   id: string;
   userId: string;
   title: string;
   message: string;
   type: NotificationType;
   isRead: boolean;
   relatedEntity?: {
      type: "APPOINTMENT" | "PRESCRIPTION" | "LAB_TEST" | "PAYMENT";
      id: string;
   };
   createdAt: string;
}

export type NotificationType =
   | "INFO"
   | "SUCCESS"
   | "WARNING"
   | "ERROR"
   | "REMINDER";

export interface Permission {
   id: string;
   name: string;
   description: string;
   resource: string;
   action: string;
}

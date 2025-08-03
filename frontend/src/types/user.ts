import { IAppointment } from "./appointment";
import { IDepartment } from "./department";

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

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
   gender?: "male" | "female" | "other";
   address?: string;
   profileImage?: string;
   role: UserRole;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
}

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

export interface Payment {
   id: string;
   patientId: string;
   patient: Patient;
   appointmentId?: string;
   labRequestId?: string;
   amount: number;
   currency: string;
   status: PaymentStatus;
   paymentMethod: PaymentMethod;
   transactionId?: string;
   description: string;
   createdAt: string;
   updatedAt: string;
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentMethod = "CARD" | "BANK_TRANSFER" | "CASH" | "INSURANCE";

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

export interface LoginCredentials {
   email: string;
   password: string;
}

export interface RegisterData {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
   role: UserRole;
   phone?: string;
   dateOfBirth?: string;
   gender?: "male" | "female" | "other";
}

export interface ResetPassword {
   token: string;
   newPassword: string;
   confirmPassword: string;
}
export interface ChangePassword {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}

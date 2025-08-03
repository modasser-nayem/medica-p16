import { IDepartment } from "./department";
import { Doctor, Patient, Prescription } from "./user";

export interface IAppointment {
   id: string;
   patientId: string;
   patient: Patient;
   doctorId: string;
   doctor: Doctor;
   departmentId: string;
   department: IDepartment;
   appointmentDate: string;
   startTime: string;
   endTime: string;
   status: AppointmentStatus;
   type: AppointmentType;
   consultationType: ConsultationType;
   symptoms?: string;
   diagnosis?: string;
   prescription?: Prescription;
   notes?: string;
   createdAt: string;
   updatedAt: string;
}

export type AppointmentStatus =
   | "SCHEDULED"
   | "CONFIRMED"
   | "IN_PROGRESS"
   | "COMPLETED"
   | "CANCELLED"
   | "NO_SHOW";
export type AppointmentType = "CONSULTATION" | "FOLLOW_UP" | "EMERGENCY";
export type ConsultationType = "VIDEO" | "VOICE" | "CHAT";

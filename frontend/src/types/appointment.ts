import { z } from "zod";
import { IDepartment } from "./department";
import { Doctor, Patient, Prescription } from "./user";
import { appointmentValidation } from "@/validation/appointment";
import { PaginationQuery } from ".";

export type AppointmentStatus =
   | "PENDING"
   | "CONFIRMED"
   | "CANCELLED"
   | "COMPLETED";

export type CreateAppointment = z.infer<
   typeof appointmentValidation.createAppointment
>;

export type RescheduleAppointment = z.infer<
   typeof appointmentValidation.rescheduleAppointment
>;

export type GetTimeSlots = z.infer<
   typeof appointmentValidation.doctorAvailableSlots
>;

export interface IGetAppointmentsFilters extends PaginationQuery {
   date?: string;
   startDate?: string;
   endDate?: string;
   status?: AppointmentStatus;
}

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
   type: ConsultationType;
   symptoms?: string;
   diagnosis?: string;
   prescription?: Prescription;
   notes?: string;
   createdAt: string;
   updatedAt: string;
}

export type ConsultationType = "VIDEO" | "VOICE" | "CHAT";

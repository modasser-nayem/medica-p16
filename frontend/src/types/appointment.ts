import { z } from "zod";
import { IDepartment } from "./department";
import { Doctor, Patient, Prescription } from "./user";
import { appointmentValidation } from "@/validation/appointment";
import { IPaginationQuery } from ".";
import { ConsultationType } from "./doctor";

export type AppointmentStatus =
   | "PENDING"
   | "CONFIRMED"
   | "CANCELLED"
   | "COMPLETED";

export type ICreateAppointment = z.infer<
   typeof appointmentValidation.createAppointment
>;

export type IRescheduleAppointment = z.infer<
   typeof appointmentValidation.rescheduleAppointment
>;

export type ICancelAppointment = z.infer<
   typeof appointmentValidation.cancelAppointment
>;

export interface IGetAppointmentsFilters extends IPaginationQuery {
   status?: AppointmentStatus;
}

export interface IAppointmentList {
   id: string;
   consultType: ConsultationType;
   startsAt: string;
   endsAt: string;
   status: AppointmentStatus;
   patientId: string;
   doctor: {
      id: string;
      name: string;
      profileImage: string;
   };
}

export interface IAppointmentDetails {
   id: string;
   consultType: ConsultationType;
   startsAt: string;
   endsAt: string;
   status: AppointmentStatus;
   patientId: string;
   price: number;
   currency: string;
   doctor: {
      id: string;
      name: string;
      profileImage: string;
   };
   createdAt: string;
   updatedAt: string;
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

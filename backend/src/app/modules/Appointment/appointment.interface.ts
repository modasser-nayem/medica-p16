import { AppointmentStatus } from "@prisma/client";
import { PaginationQuery } from "../../types/pagination";

export interface ICreateAppointment {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: "CHAT" | "VOICE" | "VIDEO";
  notes?: string;
}

export interface IRescheduleAppointment {
  appointmentId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface IGetAppointmentsFilters extends PaginationQuery {
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: AppointmentStatus;
}

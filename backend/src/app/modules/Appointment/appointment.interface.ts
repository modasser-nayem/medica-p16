import { AppointmentStatus } from "@prisma/client";
import { PaginationQuery } from "../../types/pagination";
import { appointmentSchemaValidation } from "./appointment.validation";
import { z } from "zod";

export type TCreateAppointment = z.infer<
  typeof appointmentSchemaValidation.createAppointment
>;

export type TRescheduleAppointment = z.infer<
  typeof appointmentSchemaValidation.rescheduleAppointment
> & { appointmentId: string };

export interface IGetAppointmentsFilters extends PaginationQuery {
  startsAt?: string;
  endsAt?: string;
  status?: AppointmentStatus;
}

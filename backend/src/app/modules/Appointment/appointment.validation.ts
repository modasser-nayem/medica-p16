import { z } from "zod";

const createAppointment = z
  .object({
    patientId: z.string().uuid("Invalid patient ID"),
    doctorId: z.string().uuid("Invalid doctor ID"),
    startsAt: z.string().datetime(),
    consultType: z.enum(["CHAT", "VOICE", "VIDEO"]),
  })
  .refine((data) => new Date(data.startsAt).getTime() > Date.now(), {
    message: "Start time must be in the future (UTC)",
    path: ["startsAt"],
  });

const rescheduleAppointment = z
  .object({
    startsAt: z.string().datetime(),
  })
  .refine((data) => new Date(data.startsAt).getTime() > Date.now(), {
    message: "Start time must be in the future (UTC)",
    path: ["startsAt"],
  });

const cancelAppointment = z.object({
  cancelReason: z
    .string({ required_error: "cancelReason is required" })
    .min(5, { message: "cancel reason min 5 characters" }),
});

export const appointmentSchemaValidation = {
  createAppointment,
  rescheduleAppointment,
  cancelAppointment,
};

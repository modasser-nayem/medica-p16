import { z } from "zod";

const createAppointment = z.object({
  body: z.object({
    patientId: z.string().uuid("Invalid patient ID"),
    doctorId: z.string().uuid("Invalid doctor ID"),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    time: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)",
      ),
    type: z.enum(["CHAT", "VOICE", "VIDEO"]),
    notes: z.string().max(500, "Notes too long").optional(),
  }),
});

const rescheduleAppointment = z.object({
  body: z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    time: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)",
      ),
    notes: z.string().max(500, "Notes too long").optional(),
  }),
});

const doctorAvailableSlots = z.object({
  body: z.object({
    doctorId: z.string({ required_error: "doctorId is required" }).uuid(),
    date: z.string({ required_error: "date is required" }).datetime(),
  }),
});

export const appointmentSchemaValidation = {
  createAppointment,
  rescheduleAppointment,
  doctorAvailableSlots,
};

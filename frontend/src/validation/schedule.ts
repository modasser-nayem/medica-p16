import { z } from "zod";

const createSchedule = z
   .object({
      dayOfWeek: z.string().refine(
         (val) => {
            const num = Number(val);
            return !isNaN(num) && num >= 0 && num <= 6;
         },
         { message: "Day of week must be between 0 (Sunday) and 6 (Saturday)" }
      ),
      startTime: z
         .string()
         .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:MM)"
         ),
      endTime: z
         .string()
         .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:MM)"
         ),
      slotDurationMinutes: z
         .number()
         .min(30, "Duration Can't be less then 30 minutes")
         .optional(),
   })
   .refine(
      (data) => {
         const [sh, sm] = data.startTime.split(":").map(Number);
         const [eh, em] = data.endTime.split(":").map(Number);
         return eh * 60 + em > sh * 60 + sm;
      },
      { message: "End time must be after start time", path: ["endTime"] }
   );

const updateSchedule = z
   .object({
      dayOfWeek: z.string().refine(
         (val) => {
            const num = Number(val);
            return !isNaN(num) && num >= 0 && num <= 6;
         },
         { message: "Day of week must be between 0 (Sunday) and 6 (Saturday)" }
      ),
      startTime: z
         .string()
         .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:MM)"
         ),
      endTime: z
         .string()
         .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:MM)"
         ),
      isActive: z.boolean().optional(),
      slotDurationMinutes: z
         .number()
         .min(30, "Duration Can't be less then 30 minutes")
         .optional(),
   })
   .refine(
      (data) => {
         const [sh, sm] = data.startTime.split(":").map(Number);
         const [eh, em] = data.endTime.split(":").map(Number);
         return eh * 60 + em > sh * 60 + sm;
      },
      { message: "End time must be after start time", path: ["endTime"] }
   );

const createScheduleException = z
   .object({
      date: z.string({ required_error: "date is required" }),
      closed: z.boolean().optional(),
      startTime: z
         .string()
         .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:MM)"
         ),
      endTime: z
         .string()
         .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:MM)"
         ),
      blockedSlots: z.array(z.string()),
      note: z.string().optional(),
   })
   .refine(
      (data) => {
         const [sh, sm] = data.startTime.split(":").map(Number);
         const [eh, em] = data.endTime.split(":").map(Number);
         return eh * 60 + em > sh * 60 + sm;
      },
      { message: "End time must be after start time", path: ["endTime"] }
   );

export const scheduleValidation = {
   createSchedule,
   updateSchedule,
   createScheduleException,
};

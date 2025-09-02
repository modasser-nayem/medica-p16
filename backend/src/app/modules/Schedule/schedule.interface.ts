import { z } from "zod";
import { scheduleSchemaValidation } from "./schedule.validation";

export type TCreateSchedule = z.infer<
  typeof scheduleSchemaValidation.createSchedule
>;

export type TUpdateSchedule = z.infer<
  typeof scheduleSchemaValidation.updateSchedule
>;

export type TCreateScheduleException = z.infer<
  typeof scheduleSchemaValidation.createScheduleException
>;

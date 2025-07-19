import { z } from "zod";
import { doctorSchemaValidation } from "./doctor.validation";

export type TCreateSchedule = z.infer<
  typeof doctorSchemaValidation.createSchedule
>["body"];

export type TUpdateSchedule = z.infer<
  typeof doctorSchemaValidation.updateSchedule
>["body"];

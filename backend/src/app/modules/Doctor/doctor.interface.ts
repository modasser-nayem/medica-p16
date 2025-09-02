import { z } from "zod";
import { PaginationQuery } from "../../types/pagination";
import { doctorSchemaValidation } from "./doctor.validation";

export interface TGetDoctorsFilter extends PaginationQuery {
  search?: string;
  department?: string;
  specialty?: string;
  rating?: number;
  sortBy?: "rating" | "createdAt";
}

export type TCreateOrUpdateConsultationFees = z.infer<
  typeof doctorSchemaValidation.createOrUpdateConsultationFees
>;

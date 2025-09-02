import { z } from "zod";

const createOrUpdateConsultationFees = z.object({
  type: z.enum(["CHAT", "VOICE", "VIDEO"]),
  fee: z
    .number({ required_error: "fee is required" })
    .min(1, { message: "Fee can't be a negative numbers" }),
  currency: z.string({ required_error: "currency is required!" }),
});

export const doctorSchemaValidation = {
  createOrUpdateConsultationFees,
};

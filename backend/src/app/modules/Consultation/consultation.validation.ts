import { z } from "zod";

const createOrUpdateConsultationFees = z.object({
  body: z.object({
    doctorId: z
      .string({ required_error: "doctorId is required" })
      .uuid({ message: "Invalid Id" }),
    type: z.enum(["CHAT", "VOICE", "VIDEO"]),
    fee: z
      .number({ required_error: "fee is required" })
      .min(1, { message: "Fee can't be a negative numbers" }),
  }),
});

export const consultationSchemaValidation = {
  createOrUpdateConsultationFees,
};

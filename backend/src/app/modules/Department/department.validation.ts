import { z } from "zod";

const createDepartment = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Department name is required" })
      .min(3, "Department name must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .optional(),
  }),
});

const updateDepartment = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Department name must be at least 3 characters")
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .optional(),
    isActive: z.boolean().optional(),
  }),
});

export const departmentSchemaValidation = {
  createDepartment,
  updateDepartment,
};

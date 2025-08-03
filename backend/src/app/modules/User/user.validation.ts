import { z } from "zod";

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long")
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  phone: z.string().min(2, "phone can't be empty").optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  address: z.string().min(2, "address can't be empty").optional(),
  profileImage: z.string().url({ message: "invalid url" }).optional(),
});

const updatePatientProfile = z.object({
  body: updateProfileSchema.extend({
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    emergencyContact: z
      .string()
      .min(2, "Emergency Contact can't empty")
      .optional(),
    medicalHistory: z.string().min(2, "Medical History can't empty").optional(),
    allergies: z.string().min(2, "Allergies can't empty").optional(),
  }),
});

const updateDoctorProfile = z.object({
  body: updateProfileSchema.extend({
    departmentId: z.string().uuid("Invalid department ID").optional(),
    specialization: z.string().min(2, "Specialization can't empty").optional(),
    qualifications: z.string().min(2, "Qualifications can't empty").optional(),
    experience: z
      .number()
      .min(0, "Experience must be non-negative")
      .max(50, "Experience too high")
      .optional(),
    licenseNumber: z
      .string()
      .min(5, "License number at least 5 characters")
      .optional(),
    isAvailable: z.boolean().optional(),
  }),
});

const updateAdminProfile = z.object({
  body: updateProfileSchema,
});

export const getDoctorParams = z.object({
  params: z.object({
    id: z
      .string({ required_error: "params doctor id is required" })
      .min(1, { message: "params id can't be empty" }),
  }),
});

export const userSchemaValidation = {
  updatePatientProfile,
  updateDoctorProfile,
  updateAdminProfile,
  getDoctorParams,
};

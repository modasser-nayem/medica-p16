import { z } from "zod";

const baseRegister = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),
  email: z
    .string({ required_error: "email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string({
    required_error: "confirmPassword is required",
  }),
  phone: z.string().optional(),
  dateOfBirth: z
    .string({ required_error: "Date Of Birth is required" })
    .datetime(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  address: z.string().optional(),
});

const patientRegister = z.object({
  body: baseRegister
    .extend({
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      emergencyContact: z.string().optional(),
      medicalHistory: z.string().optional(),
      allergies: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

const doctorRegister = z.object({
  body: baseRegister
    .extend({
      departmentId: z
        .string({ required_error: "departmentId is required" })
        .uuid("Invalid department ID"),
      specialization: z
        .string({ required_error: "specialization is required" })
        .min(2, "Specialization is required"),
      qualifications: z
        .string({ required_error: "qualifications is required" })
        .min(2, "Qualifications are required"),
      experience: z
        .number({ required_error: "experience is required" })
        .min(0, "Experience must be non-negative")
        .max(50, "Experience too high"),
      licenseNumber: z
        .string({ required_error: "licenseNumber is required" })
        .min(5, "License number to be, at least 5 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

const adminRegister = z.object({
  body: baseRegister.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "password is required" })
      .min(1, { message: "password is required" }),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "Invalid email address" }),
  }),
});

const resetPassword = z.object({
  body: z
    .object({
      token: z
        .string({ required_error: "token is required" })
        .min(1, { message: "token is required" }),
      newPassword: z
        .string({ required_error: "newPassword is required" })
        .min(6, "New Password must be at least 6 characters"),
      confirmPassword: z
        .string({ required_error: "confirm password is required" })
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

const changePassword = z.object({
  body: z
    .object({
      currentPassword: z
        .string({ required_error: "currentPassword is required" })
        .min(1, { message: "currentPassword is required" }),
      newPassword: z
        .string({ required_error: "newPassword is required" })
        .min(6, "New Password must be at least 6 characters"),
      confirmPassword: z
        .string({ required_error: "confirm password is required" })
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export const authSchemaValidation = {
  patientRegister,
  doctorRegister,
  adminRegister,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
};

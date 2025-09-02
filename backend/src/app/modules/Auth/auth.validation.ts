import { z } from "zod";

const userRegistration = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name too long"),
    email: z
      .string({ required_error: "email is required" })
      .email("Invalid email address"),
    role: z.enum(["PATIENT", "DOCTOR", "ADMIN"], {
      required_error: "role is required",
    }),
    password: z
      .string({ required_error: "password is required" })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string({
      required_error: "confirmPassword is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loginUser = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .min(1, { message: "password is required" }),
});

const forgotPassword = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
});

const resetPassword = z
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
  });

const changePassword = z
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
  });

export const authSchemaValidation = {
  userRegistration,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
};

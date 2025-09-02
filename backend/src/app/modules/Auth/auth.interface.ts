import { z } from "zod";
import { authSchemaValidation } from "./auth.validation";

export type TUserRegistration = z.infer<
  typeof authSchemaValidation.userRegistration
>;

export type TChangePassword = z.infer<
  typeof authSchemaValidation.changePassword
>;

export interface TUserLogin {
  email: string;
  password: string;
}

export interface TRefreshToken {
  token: string;
}

export type TForgotPassword = {
  email: string;
};

export interface TResetPassword {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUserFilters {
  role?: string;
  isActive?: boolean;
  isVerified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type TAuthUser = {
  id: string;
  name: string;
  role: string;
  profileId?: string;
  profileImage: string | null;
};

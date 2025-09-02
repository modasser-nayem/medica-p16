import z from "zod";

import { authValidation } from "@/validation/auth";
import { UserRole } from "./user";

export type IAuthUser = {
   id: string;
   name: string;
   role: UserRole;
   profileId?: string;
   profileImage: string | null;
};

export type ILoginUser = z.infer<typeof authValidation.loginUser>;

export type IRegisterUser = z.infer<typeof authValidation.registerUser>;

export type IForgotPassword = z.infer<typeof authValidation.forgotPassword>;

export type IResetPassword = z.infer<typeof authValidation.resetPassword>;

export type IChangePassword = z.infer<typeof authValidation.changePassword>;

import { UserRole } from "./user";

export interface LoginCredentials {
   email: string;
   password: string;
}

export interface RegisterData {
   email: string;
   password: string;
   name: string;
   role: UserRole;
   phone?: string;
   dateOfBirth?: string;
   gender?: "male" | "female" | "other";
}

export interface ResetPassword {
   token: string;
   newPassword: string;
   confirmPassword: string;
}
export interface ChangePassword {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}

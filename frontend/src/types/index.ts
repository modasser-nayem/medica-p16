import { User } from "./user";

export * from "./api";
export * from "./auth";
export * from "./user";
export * from "./appointment";
export * from "./analytics";
export * from "./department";
export * from "./doctor";

export interface IAuditLog {
   id: string;
   userId: string;
   user: User;
   action: string;
   ipAddress: string;
   userAgent: string;
   createdAt: string;
}

export interface IPaginationQuery {
   page?: number;
   limit?: number;
   sortBy?: string;
   sortOrder?: "asc" | "desc";
}

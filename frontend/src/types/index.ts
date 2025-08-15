import { User } from "./user";

export * from "./auth";
export * from "./user";
export * from "./appointment";
export * from "./analytics";
export * from "./department";

export interface PaginationResult {
   page: number;
   limit: number;
   total: number;
   totalPages: number;
}

export interface ApiResponse<T> {
   success: boolean;
   message: string;
   data: T;
   pagination?: PaginationResult;
}

export interface ApiFieldError {
   path: string;
   message: string;
}

export interface ApiErrorResponse {
   success: false;
   message: string;
   errors: ApiFieldError[] | null;
}

export interface AuthState {
   user: User | null;
   token: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;
}

export interface AuditLog {
   id: string;
   userId: string;
   user: User;
   action: string;
   entityType: string;
   entityId: string;
   oldValues?: Record<string, any>;
   newValues?: Record<string, any>;
   ipAddress: string;
   userAgent: string;
   createdAt: string;
}

export interface PaginationQuery {
   page?: number;
   limit?: number;
   sortBy?: string;
   sortOrder?: "asc" | "desc";
}

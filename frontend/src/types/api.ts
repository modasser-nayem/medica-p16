export type IPagination = {
   page: number;
   limit: number;
   totalPage: number;
   totalItems: number;
};

// Success response
export type SuccessResponse<T = any> = {
   success: true;
   message: string;
   data: T;
   pagination?: IPagination;
};

export interface IApiFieldError {
   path: string;
   message: string;
}

// Failure response
export type FailedResponse = {
   success: false;
   message: string;
   errors?: IApiFieldError[] | null;
};

// Union type
export type ApiResponse<T = any> = SuccessResponse<T> | FailedResponse;

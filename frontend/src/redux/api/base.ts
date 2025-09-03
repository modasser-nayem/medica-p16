import {
   createApi,
   fetchBaseQuery,
   FetchBaseQueryError,
   BaseQueryFn,
   FetchArgs,
   QueryReturnValue,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";
import { logout } from "../slice/authSlice";
import { FailedResponse, SuccessResponse } from "../../types/api";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: baseUrl,
   credentials: "include",
});

const baseQueryWithInterceptor: BaseQueryFn<
   string | FetchArgs,
   SuccessResponse,
   FetchBaseQueryError,
   { disableToast?: boolean }
> = async (
   args,
   api,
   extraOptions
): Promise<QueryReturnValue<SuccessResponse, FetchBaseQueryError, {}>> => {
   let result = await baseQuery(args, api, extraOptions);

   const isUnauthorize = result.error && result.error.status === 401;

   const disableToast = extraOptions?.disableToast ?? false;

   // Handle expired token (401)
   if (isUnauthorize) {
      if (result.meta?.response?.url !== `${baseUrl}/auth/me`) {
         const refreshResult = await baseQuery(
            { url: "auth/refresh", method: "POST" },
            api,
            extraOptions
         );

         if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
         } else {
            api.dispatch(logout());
            if (!disableToast) {
               toast.error("Session expired. Please log in again.");
            }
         }
      }
   }

   if (result.error) {
      if (isErrorWithData(result.error)) {
         const finalResult = {
            error: result.error.data as FetchBaseQueryError,
            data: undefined,
            meta: result.meta,
         };

         if (!isValidationFailedResponse(result.error.data) && !disableToast) {
            toast.error(
               (result.error.data as any)?.message || "Something went wrong❗"
            );
         }

         return finalResult;
      } else if (result.error.status !== "CUSTOM_ERROR") {
         toast.error("Something went wrong❗");
      }
   }

   if (result.data) {
      const data = result.data as SuccessResponse;

      if (data.success) {
         if (!disableToast) toast.success(data.message);
      }

      return {
         data: result.data,
         meta: result.meta,
         error: result.error,
      } as QueryReturnValue<SuccessResponse, FetchBaseQueryError, {}>;
   }

   // ✅ cast correctly to QueryReturnValue
   return result as QueryReturnValue<SuccessResponse, FetchBaseQueryError, {}>;
};

export const baseApi = createApi({
   baseQuery: baseQueryWithInterceptor,
   tagTypes: [
      "users",
      "fees",
      "department",
      "schedule",
      "schedule_exception",
      "slots",
      "appointment",
   ],
   endpoints: () => ({}),
});

const isErrorWithData = (
   error: unknown
): error is { status: number; data: unknown } => {
   return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as any).status === "number" &&
      "data" in error
   );
};

export function isValidationFailedResponse(
   data: unknown
): data is FailedResponse {
   return (
      typeof data === "object" &&
      data !== null &&
      "success" in data &&
      (data as any).success === false &&
      "message" in data &&
      typeof (data as any).message === "string" &&
      ("errors" in data
         ? Array.isArray((data as any).errors) &&
           (data as any).errors.every(
              (e: any) =>
                 typeof e.path === "string" && typeof e.message === "string"
           )
         : true)
   );
}

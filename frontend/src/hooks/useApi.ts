import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { ApiErrorResponse, ApiFieldError, ApiResponse } from "@/types";

interface UseApiOptions<T extends FieldValues = any> {
   showSuccessToast?: boolean;
   showErrorToast?: boolean;
   successMessage?: string;
   errorMessage?: string;
   setError?: UseFormSetError<T>;
}

interface UseApiReturn<T> {
   data: T | null;
   pagination?: any;
   loading: boolean;
   error: string | null;
   execute: (...args: any[]) => Promise<T | null>;
   reset: () => void;
}

export function useApi<TData = any, TFields extends FieldValues = any>(
   apiFunction: (...args: any[]) => Promise<AxiosResponse<ApiResponse<TData>>>,
   options: UseApiOptions<TFields> = {}
): UseApiReturn<TData> {
   const {
      showSuccessToast,
      showErrorToast = true,
      successMessage,
      errorMessage,
      setError,
   } = options;

   const [data, setData] = useState<TData | null>(null);
   const [pagination, setPagination] = useState<any>(null);
   const [loading, setLoading] = useState(false);
   const [error, setErrorState] = useState<string | null>(null);

   const execute = useCallback(
      async (...args: any[]): Promise<TData | null> => {
         setLoading(true);
         setErrorState(null);

         try {
            const { data: response } = await apiFunction(...args);

            if (response.data) {
               setData(response.data || null);
               if (response.pagination) setPagination(response.pagination);

               if (showSuccessToast) {
                  toast.success(
                     successMessage || response.message || "Success"
                  );
               }

               return response.data || null;
            } else {
               const errMsg =
                  errorMessage || response.message || "Request failed";
               setErrorState(errMsg);
               if (showErrorToast) toast.error(errMsg);
               return null;
            }
         } catch (err) {
            const axiosErr = err as AxiosError<ApiErrorResponse>;
            const resData = axiosErr?.response?.data;

            const fallback = errorMessage || "Something went wrong";
            const msg = resData?.message || fallback;

            setErrorState(msg);
            if (showErrorToast) toast.error(msg);

            if (resData?.errors && Array.isArray(resData.errors)) {
               resData.errors.forEach((fieldErr: ApiFieldError) => {
                  if (setError) {
                     setError(fieldErr.path as Path<TFields>, {
                        type: "manual",
                        message: fieldErr.message,
                     });
                  }
               });
            }

            return null;
         } finally {
            setLoading(false);
         }
      },
      [
         apiFunction,
         showSuccessToast,
         showErrorToast,
         successMessage,
         errorMessage,
         setError,
      ]
   );

   const reset = useCallback(() => {
      setData(null);
      setPagination(null);
      setErrorState(null);
      setLoading(false);
   }, []);

   return {
      data,
      pagination,
      loading,
      error,
      execute,
      reset,
   };
}

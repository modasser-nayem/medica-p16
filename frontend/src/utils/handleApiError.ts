import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { ApiErrorResponse } from "@/types";

export function handleApiError<T extends FieldValues>(
   error: unknown,
   setError?: UseFormSetError<T>
): void {
   const axiosError = error as AxiosError<ApiErrorResponse>;
   const responseData = axiosError?.response?.data;

   if (!responseData) {
      toast.error("Something went wrong");
      return;
   }

   // If there's a general message and no specific errors
   if (responseData.message && !responseData.errors) {
      toast.error(responseData.message);
      return;
   }

   // If there are field-level errors
   if (Array.isArray(responseData.errors)) {
      responseData.errors.forEach((fieldErr) => {
         if (setError) {
            setError(fieldErr.path as Path<T>, {
               type: "manual",
               message: fieldErr.message,
            });
         } else {
            console.error("Please provide setError");
         }
      });
   }
}

// utils/applyServerErrors.ts
import { UseFormSetError } from "react-hook-form";
import { FieldValues } from "react-hook-form";

export function applyServerFiledErrors<T extends FieldValues>(
   errors: { path: string; message: string }[] = [],
   setError: UseFormSetError<T>
) {
   errors.forEach((e) => {
      setError(e.path as any, { type: "server", message: e.message });
   });
}

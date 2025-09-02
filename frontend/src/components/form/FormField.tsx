"use client";

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

type FormFieldProps = {
   name: string;
   label?: string;
   hint?: string | ReactNode;
   required?: boolean;
   className?: string;
   children: ReactNode;
};

export default function FormField({
   name,
   label,
   hint,
   required,
   className,
   children,
}: FormFieldProps) {
   const {
      formState: { errors },
   } = useFormContext();

   const err = (errors as any)[name]?.message as string | undefined;

   return (
      <div className={clsx("space-y-1", className)}>
         {label && (
            <label className="block text-gray-700 text-sm font-semibold">
               {label}{" "}
               {required ? <span className="text-red-500">*</span> : null}
            </label>
         )}

         {/* input/select/custom goes here */}
         {children}

         {hint && !err && <p className="text-sm text-gray-500">{hint}</p>}
         {err && <p className="text-sm text-red-600">{err}</p>}
      </div>
   );
}

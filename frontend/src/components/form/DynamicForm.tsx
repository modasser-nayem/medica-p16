"use client";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodEffects, ZodObject, ZodRawShape } from "zod";
import FormField from "./FormField";
import clsx from "clsx";
import MultiSelect from "./fields/MultiSelect";
import { FieldConfig } from "@/types/form";
import SingleSelect from "./fields/SingleSelect";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type DynamicFormProps = {
   schema: ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>;
   fields: FieldConfig[];
   defaultValues?: Record<string, any>;
   onSubmit: (values: any) => void | Promise<void>;
   className?: string;
   submitLabel?: string;
   grid?: string;
   buttonClass?: string;
   buttonPosition?: "right" | "left" | "center";
   isLoading?: boolean;
};

export default function DynamicForm({
   schema,
   fields,
   defaultValues,
   onSubmit,
   className,
   grid = "grid grid-cols-1 gap-4",
   submitLabel = "Submit",
   buttonClass,
   buttonPosition = "right",
   isLoading = false,
}: DynamicFormProps) {
   const methods = useForm({
      resolver: zodResolver(schema),
      defaultValues,
      mode: "onChange",
   });

   const { control, handleSubmit } = methods;

   return (
      <FormProvider {...methods}>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("", className)}
         >
            <div className={grid}>
               {fields.map((f) => {
                  const baseInputClasses = "input";

                  switch (f.type) {
                     case "text":
                     case "email":
                     case "password":
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <input
                                       {...field}
                                       {...f.props}
                                       value={field.value ?? ""}
                                       type={f.type}
                                       placeholder={f.placeholder}
                                       className={clsx(
                                          baseInputClasses,
                                          f.props?.className
                                       )}
                                    />
                                 </FormField>
                              )}
                           />
                        );
                     case "number":
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <input
                                       {...field}
                                       {...f.props}
                                       value={field.value ?? 0}
                                       onChange={(e) =>
                                          field.onChange(e.target.valueAsNumber)
                                       }
                                       type={f.type}
                                       placeholder={f.placeholder}
                                       className={clsx(
                                          baseInputClasses,
                                          f.props?.className
                                       )}
                                    />
                                 </FormField>
                              )}
                           />
                        );

                     case "textarea":
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <textarea
                                       {...field}
                                       {...f.props}
                                       placeholder={f.placeholder}
                                       className={clsx(
                                          baseInputClasses,
                                          "min-h-[100px]",
                                          f.props?.className
                                       )}
                                    />
                                 </FormField>
                              )}
                           />
                        );

                     case "select":
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <SingleSelect
                                       {...field}
                                       className={clsx(
                                          baseInputClasses,
                                          f.props?.className
                                       )}
                                       options={f.options || []}
                                    />
                                 </FormField>
                              )}
                           />
                        );

                     case "multiselect":
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <MultiSelect
                                       {...field}
                                       options={f.options || []}
                                    />
                                 </FormField>
                              )}
                           />
                        );

                     case "checkbox":
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <input
                                       type="checkbox"
                                       checked={!!field.value}
                                       onChange={(e) =>
                                          field.onChange(e.target.checked)
                                       }
                                       {...f.props}
                                       className={clsx(
                                          "h-5 w-5",
                                          f.props?.className
                                       )}
                                    />
                                 </FormField>
                              )}
                           />
                        );

                     case "custom": {
                        if (!f.component) return null;
                        const Custom = f.component;
                        return (
                           <Controller
                              key={f.name}
                              name={f.name}
                              control={control}
                              render={({ field }) => (
                                 <FormField
                                    name={f.name}
                                    label={f.label}
                                    required={f.required}
                                    hint={f.hint}
                                    className={f.className}
                                 >
                                    <Custom
                                       {...field}
                                       {...f.props}
                                    />
                                 </FormField>
                              )}
                           />
                        );
                     }

                     default:
                        return null;
                  }
               })}
            </div>

            <div
               className={`flex ${
                  buttonPosition === "right"
                     ? "justify-end"
                     : buttonPosition === "center"
                     ? "justify-center"
                     : "justify-start"
               }`}
            >
               <button
                  type="submit"
                  className={`${buttonClass} my-2 cursor-pointer border-none bg-primary-600 px-5 py-3 text-sm text-white font-semibold hover:bg-primary-700 disabled:opacity-60 flex items-center justify-center gap-2`}
                  disabled={isLoading}
               >
                  {isLoading && <LoadingSpinner size={20} />}
                  <span>{submitLabel}</span>
               </button>
            </div>
         </form>
      </FormProvider>
   );
}

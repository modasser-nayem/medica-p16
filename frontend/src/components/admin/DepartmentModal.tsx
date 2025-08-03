"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { IDepartment, ICreateDepartment, IUpdateDepartment } from "../../types";
import { X, Building2 } from "lucide-react";

interface DepartmentModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (data: ICreateDepartment | IUpdateDepartment) => void;
   department?: IDepartment | null;
   loading?: boolean;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
   isOpen,
   onClose,
   onSubmit,
   department,
   loading = false,
}) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ICreateDepartment>({
      defaultValues: {
         name: department?.name || "",
         description: department?.description || "",
      },
   });

   React.useEffect(() => {
      if (department) {
         reset({
            name: department.name,
            description: department.description || "",
         });
      } else {
         reset({
            name: "",
            description: "",
         });
      }
   }, [department, reset]);

   const handleFormSubmit = (data: ICreateDepartment) => {
      onSubmit(data);
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <Card className="w-full max-w-md">
            <CardHeader>
               <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                     <Building2 className="h-5 w-5 mr-2" />
                     {department ? "Edit Department" : "Add Department"}
                  </CardTitle>
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={onClose}
                     className="h-8 w-8 p-0"
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  <div>
                     <Input
                        label="Department Name"
                        placeholder="Enter department name"
                        {...register("name", {
                           required: "Department name is required",
                           minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                           },
                           maxLength: {
                              value: 100,
                              message: "Name must be less than 100 characters",
                           },
                        })}
                        error={errors.name?.message}
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                     </label>
                     <textarea
                        {...register("description", {
                           maxLength: {
                              value: 500,
                              message: "Description must be less than 500 characters",
                           },
                        })}
                        placeholder="Enter department description (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        rows={3}
                     />
                     {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                           {errors.description.message}
                        </p>
                     )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                     <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                     >
                        Cancel
                     </Button>
                     <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                     >
                        {department ? "Update Department" : "Create Department"}
                     </Button>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
};

export default DepartmentModal; 
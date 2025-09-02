"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Edit, Calendar } from "lucide-react";
import Loading from "@/components/ui/loading";
import ErrorState from "@/components/shared/ErrorState";
import { departmentApi } from "@/redux/api/department";

const DepartmentDetailsPage = () => {
   const params = useParams();

   const { data, isLoading, isError, refetch } =
      departmentApi.useGetSingleDepartmentQuery(params.id);

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            title="Unable to load fees"
            description="There was a problem fetching consultation fees."
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const department = data.data;

   const handleEdit = () => {};

   const handleBack = () => {};

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <Button
                  variant="outline"
                  onClick={handleBack}
               >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
               </Button>
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                     {department.name}
                  </h1>
                  <p className="text-gray-600">Department Details</p>
               </div>
            </div>
            <Button onClick={handleEdit}>
               <Edit className="h-4 w-4 mr-1" />
               Edit Department
            </Button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <Building2 className="h-5 w-5 mr-2" />
                     Basic Information
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <label className="text-sm font-medium text-gray-500">
                        Department Name
                     </label>
                     <p className="text-lg font-semibold text-gray-900">
                        {department.name}
                     </p>
                  </div>

                  <div>
                     <label className="text-sm font-medium text-gray-500">
                        Description
                     </label>
                     <p className="text-gray-900">
                        {department.description || "No description provided"}
                     </p>
                  </div>

                  <div>
                     <label className="text-sm font-medium text-gray-500">
                        Status
                     </label>
                     <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                           !department.isDeleted
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                     >
                        {!department.isDeleted ? "Active" : "Inactive"}
                     </span>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     <Calendar className="h-5 w-5 mr-2" />
                     Timestamps
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <label className="text-sm font-medium text-gray-500">
                        Created
                     </label>
                     <p className="text-gray-900">
                        {new Date(department.createdAt).toLocaleDateString()} at{" "}
                        {new Date(department.createdAt).toLocaleTimeString()}
                     </p>
                  </div>

                  <div>
                     <label className="text-sm font-medium text-gray-500">
                        Last Updated
                     </label>
                     <p className="text-gray-900">
                        {new Date(department.updatedAt).toLocaleDateString()} at{" "}
                        {new Date(department.updatedAt).toLocaleTimeString()}
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default DepartmentDetailsPage;

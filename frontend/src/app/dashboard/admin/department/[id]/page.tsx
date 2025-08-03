"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useApi } from "@/hooks/useApi";
import { departmentService } from "@/services";
import { IDepartment } from "@/types";
import { ArrowLeft, Building2, Edit, Calendar, Users } from "lucide-react";

const DepartmentDetailsPage = () => {
   const params = useParams();
   const router = useRouter();
   const [department, setDepartment] = useState<IDepartment | null>(null);

   const { execute: fetchDepartment, loading } = useApi(
      departmentService.getDepartmentDetails,
      { showErrorToast: true, errorMessage: "Failed to load department details" }
   );

   useEffect(() => {
      const loadDepartment = async () => {
         if (params.id) {
            const response = await fetchDepartment(params.id as string);
            if (response !== null) {
               setDepartment(response);
            }
         }
      };

      loadDepartment();
   }, [params.id]);

   const handleEdit = () => {
      router.push(`/dashboard/admin/department/edit/${params.id}`);
   };

   const handleBack = () => {
      router.push("/dashboard/admin/department");
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading department details...</p>
            </div>
         </div>
      );
   }

   if (!department) {
      return (
         <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Department not found</h3>
            <p className="text-gray-600 mb-4">The department you're looking for doesn't exist.</p>
            <Button onClick={handleBack}>
               <ArrowLeft className="h-4 w-4 mr-1" />
               Back to Departments
            </Button>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
               </Button>
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
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
                     <label className="text-sm font-medium text-gray-500">Department Name</label>
                     <p className="text-lg font-semibold text-gray-900">{department.name}</p>
                  </div>
                  
                  <div>
                     <label className="text-sm font-medium text-gray-500">Description</label>
                     <p className="text-gray-900">
                        {department.description || "No description provided"}
                     </p>
                  </div>

                  <div>
                     <label className="text-sm font-medium text-gray-500">Status</label>
                     <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        department.isActive 
                           ? "bg-green-100 text-green-800" 
                           : "bg-red-100 text-red-800"
                     }`}>
                        {department.isActive ? "Active" : "Inactive"}
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
                     <label className="text-sm font-medium text-gray-500">Created</label>
                     <p className="text-gray-900">
                        {new Date(department.createdAt).toLocaleDateString()} at{" "}
                        {new Date(department.createdAt).toLocaleTimeString()}
                     </p>
                  </div>
                  
                  <div>
                     <label className="text-sm font-medium text-gray-500">Last Updated</label>
                     <p className="text-gray-900">
                        {new Date(department.updatedAt).toLocaleDateString()} at{" "}
                        {new Date(department.updatedAt).toLocaleTimeString()}
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Department Statistics
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                     <div className="text-2xl font-bold text-blue-600">0</div>
                     <div className="text-sm text-gray-500">Doctors</div>
                  </div>
                  <div className="text-center">
                     <div className="text-2xl font-bold text-green-600">0</div>
                     <div className="text-sm text-gray-500">Patients</div>
                  </div>
                  <div className="text-center">
                     <div className="text-2xl font-bold text-purple-600">0</div>
                     <div className="text-sm text-gray-500">Appointments</div>
                  </div>
               </div>
               <div className="mt-4 text-center text-sm text-gray-500">
                  Statistics will be available when the backend integration is complete
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default DepartmentDetailsPage;
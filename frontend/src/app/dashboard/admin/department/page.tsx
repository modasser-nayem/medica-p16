"use client";

import CreateDepartment from "@/components/admin/CreateDepartment";
import DepartmentCard from "@/components/admin/DepartmentCard";
import UpdateDepartment from "@/components/admin/UpdateDepartment";
import ErrorState from "@/components/shared/ErrorState";
import NoDataAvailable from "@/components/shared/NoDataAvailable";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { departmentApi } from "@/redux/api/department";
import { Delete, DeleteIcon, Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const DepartmentPage = () => {
   const { data, isLoading, isError, refetch } =
      departmentApi.useGetDepartmentsQuery();

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            title="Unable to load data"
            description="There was a problem fetching data"
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const departments = data.data;

   return (
      <div>
         {/* Header with action button */}
         <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Departments</h2>
            <CreateDepartment>
               <Button
                  size="sm"
                  className="rounded-full"
               >
                  <Plus /> Create New Department
               </Button>
            </CreateDepartment>
         </div>

         {/* Fees Grid */}
         {departments.length === 0 ? (
            <NoDataAvailable>
               <CreateDepartment>
                  <Button
                     size="sm"
                     className="rounded-full"
                  >
                     <Plus /> Create New Department
                  </Button>
               </CreateDepartment>
            </NoDataAvailable>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {departments.map((dept) => (
                  <DepartmentCard
                     key={dept.id}
                     department={dept}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default DepartmentPage;

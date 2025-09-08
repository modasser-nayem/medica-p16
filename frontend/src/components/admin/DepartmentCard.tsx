"use client";

import React, { useState } from "react";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import UpdateDepartment from "@/components/admin/UpdateDepartment";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { IDepartment } from "@/types";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { departmentApi } from "@/redux/api/department";

const DepartmentCard = ({ department: dept }: { department: IDepartment }) => {
   const [openConfirm, setOpenConfirm] = useState<boolean>(false);
   const [deleteDepartment, { isLoading }] =
      departmentApi.useDeleteDepartmentMutation();

   const handleDelete = () => {
      deleteDepartment(dept.id);
   };

   return (
      <Card
         key={dept.id}
         className="group rounded-xl text-center hover:bg-primary-50 hover:shadow-soft transition-all duration-200 border-none shadow-soft"
      >
         <CardHeader className="flex items-center justify-center">
            <Image
               className="w-16 h-16"
               src={dept.icon}
               alt={dept.name}
               width={96}
               height={96}
            />
            <CardTitle className="font-semibold text-gray-900 py-2 group-hover:text-primary-600 transition-colors duration-200">
               {dept.name}
            </CardTitle>
         </CardHeader>
         <CardContent>
            {dept.description && (
               <p className="text-sm text-gray-600">
                  {dept.description.slice(0, 50)}
               </p>
            )}
         </CardContent>
         <CardFooter className="gap-4 items-center justify-center">
            <UpdateDepartment
               defaultValue={{
                  id: dept.id,
                  name: dept.name,
                  icon: dept.icon,
                  description: dept.description,
               }}
            >
               <Button
                  variant={"outline"}
                  size={"sm"}
               >
                  <Edit />
               </Button>
            </UpdateDepartment>
            <Button
               variant={"outline"}
               size={"sm"}
               onClick={() => setOpenConfirm(true)}
            >
               <Trash />
            </Button>
            <ConfirmationDialog
               dialogTitle="Delete Department"
               dialogHint="Are you sure to delete this Department"
               openConfirmDialog={openConfirm}
               setOpenConfirmDialog={setOpenConfirm}
               onConfirmed={handleDelete}
               isLoading={isLoading}
            >
               <p></p>
            </ConfirmationDialog>
         </CardFooter>
      </Card>
   );
};

export default DepartmentCard;

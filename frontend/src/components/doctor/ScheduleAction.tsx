"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { ISchedule } from "@/types";
import UpdateSchedule from "./UpdateSchedule";
import { scheduleApi } from "@/redux/api/schedule";

const ScheduleAction = ({ data }: { data: ISchedule }) => {
   const [deleteSchedule, { isLoading }] =
      scheduleApi.useDeleteScheduleMutation();

   return (
      <>
         <UpdateSchedule data={data}>
            <Button
               size="sm"
               variant="outline"
               color="warning"
            >
               <Pencil size={16} /> Edit
            </Button>
         </UpdateSchedule>
         <Button
            size="sm"
            variant="default"
            disabled={isLoading}
            onClick={() => deleteSchedule(data.id)}
         >
            <Trash size={16} /> Delete
         </Button>
      </>
   );
};

export default ScheduleAction;

"use client";

import CreateSchedule from "@/components/doctor/CreateSchedule";
import ErrorState from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { scheduleApi } from "@/redux/api/schedule";
import { Plus } from "lucide-react";
import React from "react";
import ScheduleTable from "@/components/doctor/ScheduleTable";
import DoctorScheduleSlots from "@/components/doctor/DoctorScheduleSlots";

const page = () => {
   const { data, isLoading, isError, refetch } =
      scheduleApi.useGetSchedulesQuery();

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

   const selectedSlot = () => {};

   return (
      <div>
         {/* Header with action button */}
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Schedules</h2>
            <CreateSchedule>
               <Button
                  size="sm"
                  className="rounded-full"
                  disabled={data.data.length >= 5 ? true : false}
               >
                  <Plus /> Add Schedule
               </Button>
            </CreateSchedule>
         </div>

         {/* Schedule Table */}
         <div>
            <ScheduleTable data={data.data} />
         </div>

         {/* Schedule Slots */}
         {data.data.length >= 1 && (
            <div>
               <h2 className="text-xl font-semibold mt-5 py-5">
                  Schedule Slots
               </h2>
               <DoctorScheduleSlots
                  doctorId={data.data[0].doctorId}
                  onSlotSelect={selectedSlot}
               />
            </div>
         )}
      </div>
   );
};

export default page;

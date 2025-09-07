import { doctorApi } from "@/redux/api/doctor";
import React, { useState } from "react";
import Loading from "@/components/ui/loading";
import ErrorState from "@/components/shared/ErrorState";
import { format, parse } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NoDataAvailable from "@/components/shared/NoDataAvailable";

type DoctorScheduleSlotsProps = {
   doctorId: string;
   onSlotSelect: (value: { slot: string; date: string }) => void;
};

const DoctorScheduleSlots = ({
   doctorId,
   onSlotSelect,
}: DoctorScheduleSlotsProps) => {
   const { data, isLoading, isError, refetch } =
      doctorApi.useGetDoctorSlotsQuery(doctorId);

   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            title="Unable to load slots"
            description="There was a problem fetching schedule slots."
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const schedules = data.data;

   if (schedules.length === 0) {
      return <NoDataAvailable />;
   }

   return (
      <div className="space-y-6">
         {schedules.map((schedule: any, idx: number) => {
            const formattedDate = format(
               new Date(schedule.date),
               "EEEE, MMM d, yyyy"
            ); // Sunday, Sep 7, 2025

            return (
               <Card
                  key={idx}
                  className="shadow-md rounded-2xl border-2 border-gray-300"
               >
                  <CardHeader>
                     <CardTitle className="text-lg font-semibold text-primary-600">
                        {formattedDate}
                     </CardTitle>
                     <p className="text-sm text-gray-500">
                        Duration: {schedule.duration} mins
                     </p>
                  </CardHeader>
                  <CardContent>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {schedule.slots.map((slot: string, i: number) => {
                           const parsed = parse(slot, "HH:mm", new Date());
                           const formattedSlot = format(parsed, "hh:mm a"); // 10:30 AM
                           const isSelected =
                              selectedSlot === `${schedule.date}-${slot}`;
                           return (
                              <Button
                                 key={i}
                                 variant="outline"
                                 className={`rounded-xl border transition-all duration-200 ${
                                    isSelected
                                       ? "bg-primary-600 text-white border-primary-600 shadow-md"
                                       : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-primary-100 hover:text-primary"
                                 }`}
                                 onClick={() => {
                                    setSelectedSlot(`${schedule.date}-${slot}`);
                                    onSlotSelect({ slot, date: schedule.date });
                                 }}
                              >
                                 {formattedSlot}
                              </Button>
                           );
                        })}
                     </div>
                  </CardContent>
               </Card>
            );
         })}
      </div>
   );
};

export default DoctorScheduleSlots;

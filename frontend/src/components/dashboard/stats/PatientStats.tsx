"use client";

import React from "react";
import { CheckCheck, Clock, Timer } from "lucide-react";
import StatsCard from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPatientStats } from "@/types";
import { format } from "date-fns";

const PatientStats: React.FC<{ data: IPatientStats }> = ({ data }) => {
   const patientStats = [
      {
         title: "Complete Appointments",
         value: data.completedAppointments,
         icon: CheckCheck,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Pending Appointments",
         value: data.pendingAppointments,
         icon: Clock,
         color: "text-warning-600",
         bgColor: "bg-warning-100",
      },
      {
         title: "Schedule Appointments",
         value: data.scheduledAppointments,
         icon: Clock,
         color: "text-success-600",
         bgColor: "bg-success-100",
      },
   ];

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {patientStats.map((stat, i) => (
            <StatsCard
               key={i}
               stat={stat}
            />
         ))}
         <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-600">
                  Upcoming Appointment
               </CardTitle>
               <div
                  className={`h-8 w-8 bg-red-200 rounded-full flex items-center justify-center`}
               >
                  <Timer
                     className="h-4 w-4"
                     color="red"
                  />
               </div>
            </CardHeader>
            <CardContent>
               <div className="font-bold text-gray-900">
                  {data.upcomingAppointment ? (
                     <p>
                        {format(
                           new Date(data.upcomingAppointment.startsAt),
                           "EEEE, MMMM d, yyyy"
                        )}
                        ,
                        {format(
                           new Date(data.upcomingAppointment.startsAt),
                           "hh:mm a"
                        )}
                     </p>
                  ) : (
                     <p className="text-lg">Not Available</p>
                  )}
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default PatientStats;

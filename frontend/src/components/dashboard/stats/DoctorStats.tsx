"use client";

import React from "react";
import { Clock, Timer, Calendar, CheckCheck } from "lucide-react";
import { IDoctorStats } from "@/types";
import StatsCard, { IStatCardProps } from "./StatsCard";

const DoctorStats: React.FC<{ data: IDoctorStats }> = ({ data }) => {
   const doctorStats: IStatCardProps[] = [
      {
         title: "Today's Appointments",
         value: data.todaysAppointments,
         icon: Calendar,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Complete Consultation",
         value: data.completedAppointments,
         icon: CheckCheck,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Pending Consultation",
         value: data.pendingAppointments,
         icon: Clock,
         color: "text-warning-600",
         bgColor: "bg-warning-100",
      },
      {
         title: "Upcoming Appointment",
         value: 10,
         icon: Timer,
         color: "text-error-600",
         bgColor: "bg-error-100",
         component: (
            <>
               {data.upcomingAppointment ? (
                  <div>
                     date: {data.upcomingAppointment.date.toISOString()}
                     time: {data.upcomingAppointment.time.toISOString()}
                  </div>
               ) : (
                  <p className="text-base">Not Available</p>
               )}
            </>
         ),
      },
   ];

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {doctorStats.map((stat, i) => (
            <StatsCard
               key={i}
               stat={stat}
            />
         ))}
      </div>
   );
};

export default DoctorStats;

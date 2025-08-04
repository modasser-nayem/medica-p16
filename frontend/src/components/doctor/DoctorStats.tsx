"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Clock, Timer, Calendar, CheckCheck } from "lucide-react";
import { analyticsService } from "@/services";
import { useApi } from "@/hooks/useApi";

const DoctorStats = () => {
   const {
      execute: fetchDoctorStats,
      data: statsData,
      loading: statsIsLoading,
   } = useApi(analyticsService.doctorStats);

   useEffect(() => {
      fetchDoctorStats();
   }, []);

   const doctorStats = [
      {
         title: "Today's Appointments",
         value: statsData?.todaysAppointments,
         icon: Calendar,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Complete Consultation",
         value: statsData?.completedAppointments,
         icon: CheckCheck,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Pending Consultation",
         value: statsData?.pendingAppointments,
         icon: Clock,
         color: "text-yellow-600",
         bgColor: "bg-yellow-100",
      },
   ];

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {doctorStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
               <Card
                  key={index}
                  className="hover:shadow-md transition-shadow"
               >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                     </CardTitle>
                     <div
                        className={`h-8 w-8 ${stat.bgColor} rounded-full flex items-center justify-center`}
                     >
                        <IconComponent className={`h-4 w-4 ${stat.color}`} />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                     </div>
                  </CardContent>
               </Card>
            );
         })}
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
               <div className="text-2xl font-bold text-gray-900">
                  {statsData?.upcomingAppointment ? (
                     <div>
                        date: {statsData.upcomingAppointment.date.toISOString()}
                        time: {statsData.upcomingAppointment.time.toISOString()}
                     </div>
                  ) : (
                     <p className="text-lg">Not Available</p>
                  )}
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default DoctorStats;

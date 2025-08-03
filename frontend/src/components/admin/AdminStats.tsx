"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
   Users,
   CheckCircle,
   Clock,
   DollarSign,
   Users2,
   UserSquare,
   Activity,
} from "lucide-react";
import { IAdminStats } from "@/types";

const AdminStats: React.FC<IAdminStats> = ({
   totalUsers,
   totalDoctor,
   totalPatient,
   activeUsers,
   totalRevenue,
   completedAppointments,
   todaysAppointments,
}) => {
   const stats = [
      {
         title: "Total Users",
         value: totalUsers,
         icon: Users,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Total Doctors",
         value: totalDoctor,
         icon: Users2,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Total Patients",
         value: totalPatient,
         icon: UserSquare,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Active Users",
         value: activeUsers,
         icon: Activity,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Total Revenue",
         value: totalRevenue,
         icon: DollarSign,
         color: "text-purple-600",
         bgColor: "bg-purple-100",
      },
      {
         title: "Completed Appointments",
         value: completedAppointments,
         icon: CheckCircle,
         color: "text-red-600",
         bgColor: "bg-red-100",
      },
      {
         title: "Todays Appointments",
         value: todaysAppointments,
         icon: Clock,
         color: "text-red-600",
         bgColor: "bg-red-100",
      },
   ];

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, index) => {
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
      </div>
   );
};

export default AdminStats;

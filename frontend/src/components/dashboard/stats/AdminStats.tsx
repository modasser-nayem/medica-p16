"use client";

import React from "react";
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
import StatsCard from "./StatsCard";

const AdminStats: React.FC<{ data: IAdminStats }> = ({ data }) => {
   const stats = [
      {
         title: "Total Users",
         value: data.totalUsers,
         icon: Users,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Total Doctors",
         value: data.totalDoctor,
         icon: Users2,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Total Patients",
         value: data.totalPatient,
         icon: UserSquare,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Active Users",
         value: data.activeUsers,
         icon: Activity,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Total Revenue",
         value: data.totalRevenue,
         icon: DollarSign,
         color: "text-purple-600",
         bgColor: "bg-purple-100",
      },
      {
         title: "Completed Appointments",
         value: data.completedAppointments,
         icon: CheckCircle,
         color: "text-red-600",
         bgColor: "bg-red-100",
      },
      {
         title: "Todays Appointments",
         value: data.todaysAppointments,
         icon: Clock,
         color: "text-red-600",
         bgColor: "bg-red-100",
      },
   ];

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <StatsCard
               key={i}
               stat={stat}
            />
         ))}
      </div>
   );
};

export default AdminStats;

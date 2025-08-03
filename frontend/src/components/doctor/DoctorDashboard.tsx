"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { UserCheck, Users, Clock, Activity } from "lucide-react";

const DoctorDashboard = () => {
   const doctorStats = [
      {
         title: "Today's Patients",
         value: 5,
         icon: UserCheck,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Total Patients",
         value: 5,
         icon: Users,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Pending Appointments",
         value: 5,
         icon: Clock,
         color: "text-yellow-600",
         bgColor: "bg-yellow-100",
      },
      {
         title: "Active Consultations",
         value: 5,
         icon: Activity,
         color: "text-purple-600",
         bgColor: "bg-purple-100",
      },
   ];

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">
               Doctor Dashboard
            </h1>
            <p className="text-gray-600">
               Welcome back! Here's your schedule for today.
            </p>
         </div>

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
         </div>
      </div>
   );
};

export default DoctorDashboard;

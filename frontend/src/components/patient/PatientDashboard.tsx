"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Calendar, FileText, Activity, FlaskConical } from "lucide-react";

const PatientDashboard = () => {
   const patientStats = [
      {
         title: "My Appointments",
         value: 5,
         icon: Calendar,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Upcoming Appointments",
         value: 4,
         icon: Calendar,
         color: "text-yellow-600",
         bgColor: "bg-yellow-100",
      },
      {
         title: "Total Doctors",
         value: 3,
         icon: Activity,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Lab Tests",
         value: 8,
         icon: FlaskConical,
         color: "text-purple-600",
         bgColor: "bg-purple-100",
      },
   ];

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">
               Patient Dashboard
            </h1>
            <p className="text-gray-600">
               Welcome back! Here's what's happening today.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {patientStats.map((stat, index) => {
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

export default PatientDashboard;

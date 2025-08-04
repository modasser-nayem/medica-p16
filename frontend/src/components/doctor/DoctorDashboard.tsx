"use client";

import React from "react";

import DoctorStats from "./DoctorStats";

const DoctorDashboard = () => {
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
         <DoctorStats />
      </div>
   );
};

export default DoctorDashboard;

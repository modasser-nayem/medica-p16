"use client";

import React from "react";
import PatientStats from "./PatientStats";

const PatientDashboard = () => {
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

         <PatientStats />
      </div>
   );
};

export default PatientDashboard;

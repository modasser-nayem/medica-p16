"use client";

import React from "react";
import PatientStats from "./stats/PatientStats";
import Loading from "@/components/ui/loading";

import { analyticsApi } from "@/redux/api/analytics";

const PatientDashboard = () => {
   const { data: statsData, isLoading } = analyticsApi.usePatientStatsQuery();

   if (isLoading) {
      return <div>Loading...</div>;
   }

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

         {/* Stats Cards */}
         <div>
            {statsData?.data ? (
               <PatientStats data={statsData.data} />
            ) : (
               <Loading />
            )}
         </div>
      </div>
   );
};

export default PatientDashboard;

"use client";

import React from "react";
import Loading from "@/components/ui/loading";
import DoctorStats from "./stats/DoctorStats";
import { analyticsApi } from "@/redux/api/analytics";

const DoctorDashboard = () => {
   const { data: statsData, isLoading } = analyticsApi.useDoctorStatsQuery();

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">
               Doctor Dashboard
            </h1>
            <p className="text-gray-600">
               Welcome back! Here's what's happening today.
            </p>
         </div>

         {/* Stats Cards */}
         <div>
            {statsData?.data ? (
               <DoctorStats data={statsData.data} />
            ) : (
               <Loading />
            )}
         </div>
      </div>
   );
};

export default DoctorDashboard;

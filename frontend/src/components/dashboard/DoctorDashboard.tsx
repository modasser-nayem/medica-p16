"use client";

import React from "react";
import Loading from "@/components/ui/loading";
import DoctorStats from "./stats/DoctorStats";
import { analyticsApi } from "@/redux/api/analytics";
import ErrorState from "@/components/shared/ErrorState";

const DoctorDashboard = () => {
   const {
      data: statsData,
      isLoading,
      isError,
      refetch,
   } = analyticsApi.useDoctorStatsQuery();

   if (isLoading) return <Loading />;
   if (isError || !statsData?.data) {
      return (
         <ErrorState
            title="Unable to load fees"
            description="There was a problem fetching consultation fees."
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
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
            <DoctorStats data={statsData.data} />
         </div>
      </div>
   );
};

export default DoctorDashboard;

"use client";

import React from "react";
import SystemOverview from "@/components/admin/SystemOverview";
import AdminStats from "./stats/AdminStats";
import Loading from "@/components/ui/loading";
import { analyticsApi } from "@/redux/api/analytics";

const AdminDashboard = () => {
   const { data: statsData, isLoading } = analyticsApi.useAdminStatsQuery();

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">
               Admin Dashboard
            </h1>
            <p className="text-gray-600">System overview and management.</p>
         </div>

         {/* Stats Cards */}
         <div>
            {statsData?.data ? (
               <AdminStats data={statsData.data} />
            ) : (
               <Loading />
            )}
         </div>

         {/*  Filters */}
         {/* <UserFilters
               searchTerm={searchTerm}
               roleFilter={roleFilter}
               statusFilter={statusFilter}
               onSearchChange={setSearchTerm}
               onRoleFilterChange={setRoleFilter}
               onStatusFilterChange={setStatusFilter}
               onClearFilters={handleClearFilters}
            /> */}

         {/* Users Table */}
         {/* <UsersTable users={filteredUsers} /> */}
         {/* System Overview */}
         <SystemOverview />
      </div>
   );
};

export default AdminDashboard;

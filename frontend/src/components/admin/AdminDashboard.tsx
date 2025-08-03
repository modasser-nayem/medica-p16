"use client";

import React, { useEffect } from "react";
import { Users, Activity, DollarSign, FlaskConical } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { analyticsService } from "@/services";
import SystemOverview from "@/components/admin/SystemOverview";
import AdminStats from "./AdminStats";

const AdminDashboard = () => {
   const {
      execute: fetchAdminStats,
      loading,
      data: statsData,
   } = useApi(analyticsService.adminStats);

   useEffect(() => {
      fetchAdminStats();
   }, []);

   const adminStats = [
      {
         title: "Total Users",
         value: statsData?.totalUsers,
         icon: Users,
         color: "text-blue-600",
         bgColor: "bg-blue-100",
      },
      {
         title: "Total Doctors",
         value: statsData?.totalDoctor,
         icon: Activity,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Total Patients",
         value: statsData?.totalPatient,
         icon: Activity,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Active Users",
         value: statsData?.activeUsers,
         icon: Activity,
         color: "text-green-600",
         bgColor: "bg-green-100",
      },
      {
         title: "Total Revenue",
         value: statsData?.totalRevenue,
         icon: DollarSign,
         color: "text-purple-600",
         bgColor: "bg-purple-100",
      },
      {
         title: "Completed Appointments",
         value: statsData?.completedAppointments,
         icon: FlaskConical,
         color: "text-red-600",
         bgColor: "bg-red-100",
      },
      {
         title: "Todays Appointments",
         value: statsData?.todaysAppointments,
         icon: FlaskConical,
         color: "text-red-600",
         bgColor: "bg-red-100",
      },
   ];

   if (loading) {
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
         <AdminStats
            totalUsers={10}
            totalDoctor={5}
            totalPatient={4}
            activeUsers={3}
            totalRevenue={2000}
            completedAppointments={12}
            todaysAppointments={5}
         />

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

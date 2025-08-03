"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";
import DoctorDashboard from "@/components/doctor/DoctorDashboard";
import PatientDashboard from "@/components/patient/PatientDashboard";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

import React from "react";

const DashboardPage = () => {
   const router = useRouter();
   const { loading, user } = useAuth();

   if (loading) {
      return <div>Load Dashboard...</div>;
   }

   if (!user) {
      router.push("/auth/login");
   }

   const renderDashboard = () => {
      switch (user?.role) {
         case "PATIENT":
            return <PatientDashboard />;
         case "DOCTOR":
            return <DoctorDashboard />;
         case "ADMIN":
            return <AdminDashboard />;
         default:
            return <PatientDashboard />;
      }
   };

   return <div className="p-6">{renderDashboard()}</div>;
};

export default DashboardPage;

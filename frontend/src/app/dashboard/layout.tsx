"use client";

import Layout from "@/components/layout/Layout";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
   const { loading, user } = useAuth();
   const router = useRouter();

   if (loading) {
      return (
         <Layout>
            <div>Loading Dashboard...</div>
         </Layout>
      );
   }

   if (!user) {
      router.push("/auth/login");
   }

   return <Layout>{children}</Layout>;
};

export default DashboardPage;

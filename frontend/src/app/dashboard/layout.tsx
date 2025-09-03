"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/constant";
import { useAppSelector } from "@/hooks/redux";
import { selectedUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
   const user = useAppSelector(selectedUser);
   const router = useRouter();

   if (!user) {
      router.push(ROUTES.LOGIN);
   }

   return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;

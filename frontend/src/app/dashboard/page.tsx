"use client";
import { ROUTES } from "@/constant";
import { useAppSelector } from "@/hooks/redux";
import { selectedUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
   const user = useAppSelector(selectedUser);
   const router = useRouter();

   useEffect(() => {
      if (!user) return; // still loading
      router.replace(ROUTES.DASHBOARD(user.role));
   }, [user, router]);

   return <div>Loading dashboard...</div>;
}

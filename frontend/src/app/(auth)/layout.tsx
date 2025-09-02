"use client";

import PublicFooter from "@/components/shared/Footer";
import PublicHeader from "@/components/shared/Header";
import { useAppSelector } from "@/hooks/redux";
import { selectedUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
   const router = useRouter();

   const user = useAppSelector(selectedUser);

   if (user) {
      return router.back();
   }

   return (
      <div className="">
         <PublicHeader />
         <div className="container min-h-screen flex justify-center py-10">
            {children}
         </div>
         <PublicFooter />
      </div>
   );
}

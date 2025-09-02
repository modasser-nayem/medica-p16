"use client";

import React from "react";
import { LogOut, User } from "lucide-react";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout, selectedUser } from "@/redux/slice/authSlice";
import { Button } from "@/components/ui/button";
import { authApi } from "@/redux/api/auth";

const DashboardHeader: React.FC = () => {
   const user = useAppSelector(selectedUser);
   const [logoutUser, { isLoading, isSuccess }] = authApi.useLogoutMutation();
   const dispatch = useAppDispatch();

   const handleLogout = () => {
      logoutUser({});
   };

   if (isSuccess) {
      dispatch(logout());
   }

   return (
      <header className="bg-white shadow-sm border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900">
                     Medica HMS
                  </h1>
               </div>

               <div className="flex items-center gap-4">
                  <Link
                     href="/profile"
                     className="flex items-center gap-2"
                  >
                     <User className="h-4 w-4 text-gray-500" />
                     <span className="text-sm text-gray-700">{user?.name}</span>
                  </Link>
                  <Button
                     variant="default"
                     size="sm"
                     onClick={handleLogout}
                     className="flex items-center gap-2 border border-primary-600"
                     disabled={isLoading}
                  >
                     <LogOut className="h-4 w-4" />
                     Logout
                  </Button>
               </div>
            </div>
         </div>
      </header>
   );
};

export default DashboardHeader;

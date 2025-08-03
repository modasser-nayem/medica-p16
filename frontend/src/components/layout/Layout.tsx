"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "@/provider/AuthProvider";

interface LayoutProps {
   children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   const { user, logout } = useAuth();

   const handleLogout = () => {
      logout();
      // Redirect to login page
      window.location.href = "/auth/login";
   };

   if (!user) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading...</p>
            </div>
         </div>
      );
   }

   return (
      <div className="flex h-screen bg-gray-100">
         <Sidebar />
         <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
               {children}
            </main>
         </div>
      </div>
   );
};

export default Layout;

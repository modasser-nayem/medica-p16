"use client";

import React from "react";
import { LogOut, User } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "@/provider/AuthProvider";
import Link from "next/link";

const Header: React.FC = () => {
   const { user, logout } = useAuth();

   const handleLogout = () => {
      logout();
   };

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
                     variant="outline"
                     size="sm"
                     onClick={handleLogout}
                     className="flex items-center gap-2 hover:bg-red-300"
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

export default Header;

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";
import { UserRole } from "../../types";
import {
   Home,
   Users,
   Calendar,
   Settings,
   User,
   Stethoscope,
   Shield,
   LayoutDashboard,
   Hospital,
} from "lucide-react";

const Sidebar: React.FC = () => {
   const { user } = useAuth();
   const pathname = usePathname();

   const getNavigationItems = (role: UserRole) => {
      const items = [
         { name: "Home", href: "/", icon: Home },
         { name: "Profile", href: "/profile", icon: User },
      ];

      switch (role) {
         case "PATIENT":
            return [
               ...items,
               { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
               { name: "Appointments", href: "/appointments", icon: Calendar },
            ];
         case "DOCTOR":
            return [
               ...items,
               { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
               { name: "Patients", href: "/patients", icon: Users },
               { name: "Appointments", href: "/appointments", icon: Calendar },
            ];
         case "ADMIN":
            return [
               ...items,
               {
                  name: "Dashboard",
                  href: "/dashboard",
                  icon: LayoutDashboard,
               },
               { name: "Users", href: "/dashboard/admin/users", icon: Users },
               {
                  name: "Department",
                  href: "/dashboard/admin/department",
                  icon: Hospital,
               },
               { name: "Settings", href: "/", icon: Settings },
            ];
         default:
            return [...items];
      }
   };

   const navigationItems = user ? getNavigationItems(user.role) : [];

   const getRoleIcon = (role: UserRole) => {
      switch (role) {
         case "PATIENT":
            return User;
         case "DOCTOR":
            return Stethoscope;
         case "ADMIN":
            return Shield;
         default:
            return User;
      }
   };

   const RoleIcon = user ? getRoleIcon(user.role) : User;

   return (
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
         <div className="mb-8">
            <Link
               href="/"
               className="flex items-center gap-3 mb-4"
            >
               <RoleIcon className="h-8 w-8" />
               <h2 className="text-lg font-semibold">Medica HMS</h2>
            </Link>
            {user && (
               <div className="text-sm text-gray-300">
                  {user.name}
                  <div className="text-xs text-gray-400 capitalize">
                     {user.role.toLowerCase()}
                  </div>
               </div>
            )}
         </div>

         <nav className="space-y-2">
            {navigationItems.map((item) => {
               const IconComponent = item.icon;
               const isActive = pathname === item.href;

               return (
                  <Link
                     key={item.name}
                     href={item.href}
                     className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                           ? "bg-blue-600 text-white"
                           : "text-gray-300 hover:bg-gray-700 hover:text-white"
                     }`}
                  >
                     <IconComponent className="h-5 w-5" />
                     {item.name}
                  </Link>
               );
            })}
         </nav>
      </aside>
   );
};

export default Sidebar;

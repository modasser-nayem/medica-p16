"use client";

import {
   Calendar,
   Clock,
   DollarSign,
   Home,
   Hospital,
   LayoutDashboard,
   Settings,
   Shield,
   Stethoscope,
   User,
   Users,
} from "lucide-react";
import React from "react";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { selectedUser } from "@/redux/slice/authSlice";
import { UserRole } from "@/types";
import { useSidebar } from "@/components/ui/sidebar";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfileSetting from "@/components/profile/ProfileSetting";

const AppSidebar = () => {
   const { open } = useSidebar();

   const user = useAppSelector(selectedUser);

   const getNavItems = (role: UserRole) => {
      const items = [
         { name: "Home", href: "/", icon: Home },
         { name: "Profile", href: "/dashboard/profile", icon: User },
      ];

      switch (role) {
         case "PATIENT":
            return [
               ...items,
               {
                  name: "Dashboard",
                  href: "/dashboard/patient",
                  icon: LayoutDashboard,
               },
               {
                  name: "Appointments",
                  href: "/dashboard/appointments",
                  icon: Calendar,
               },
            ];
         case "DOCTOR":
            return [
               ...items,
               {
                  name: "Dashboard",
                  href: "/dashboard/doctor",
                  icon: LayoutDashboard,
               },
               {
                  name: "Appointments",
                  href: "/dashboard/doctor/appointments",
                  icon: Calendar,
               },
               {
                  name: "Fees",
                  href: "/dashboard/doctor/fees",
                  icon: DollarSign,
               },
               {
                  name: "Schedule",
                  href: "/dashboard/doctor/schedule",
                  icon: Clock,
               },
            ];
         case "ADMIN":
            return [
               ...items,
               { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
               { name: "Users", href: "/dashboard/admin/users", icon: Users },
               {
                  name: "Department",
                  href: "/dashboard/admin/department",
                  icon: Hospital,
               },
               { name: "Settings", href: "/dashboard", icon: Settings },
            ];
         default:
            return [...items];
      }
   };

   const navItems = user ? getNavItems(user.role) : [];

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
      <Sidebar
         collapsible="icon"
         className="!bg-primary text-primary-foreground/85 border-primary"
      >
         {/* Header */}
         <SidebarHeader className="px-6 py-5">
            <Link
               href="/"
               className="flex items-center gap-3 mb-3"
            >
               <RoleIcon className="h-7 w-7" />
               {open && <h2 className="text-xl font-bold">Medica</h2>}
            </Link>

            {open && user && (
               <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-200 capitalize">
                     {user.role.toLowerCase()}
                  </p>
               </div>
            )}
         </SidebarHeader>

         {/* Content */}
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider">
                  Application
               </SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {navItems.map((item) => (
                        <SidebarMenuItem
                           key={item.name}
                           className="py-1"
                        >
                           <SidebarMenuButton
                              asChild
                              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors text-base"
                           >
                              <Link
                                 href={item.href}
                                 className="flex items-center gap-4"
                              >
                                 {!open ? (
                                    <Tooltip>
                                       <TooltipContent
                                          className="font-semibold"
                                          side="right"
                                          sideOffset={20}
                                       >
                                          {item.name}
                                       </TooltipContent>
                                       <TooltipTrigger>
                                          <item.icon className="h-6 w-6" />
                                       </TooltipTrigger>
                                    </Tooltip>
                                 ) : (
                                    <>
                                       <item.icon className="h-6 w-6" />
                                       <span>{item.name}</span>
                                    </>
                                 )}
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         {/* Footer */}
         <SidebarFooter className="px-6 py-4 border-t">
            <ProfileSetting withImage={open}>
               {open ? (
                  <div className="flex items-center gap-3 cursor-pointer">
                     Settings <Settings size={20} />
                  </div>
               ) : (
                  <Settings
                     size={24}
                     className="cursor-pointer"
                  />
               )}
            </ProfileSetting>
            {open && <p className="text-xs">© 2025 Medica</p>}
         </SidebarFooter>
      </Sidebar>
   );
};

export default AppSidebar;

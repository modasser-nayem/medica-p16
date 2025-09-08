"use client";

import { ROUTES } from "@/constant";
import React from "react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   ArrowRight,
   Calendar,
   LayoutDashboard,
   LogOut,
   User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout, selectedUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { authApi } from "@/redux/api/auth";
import UserAvatar from "@/components/shared/UserAvatar";

const ProfileSetting = ({
   children,
   withImage = false,
}: {
   children?: React.ReactNode;
   withImage?: boolean;
}) => {
   const user = useAppSelector(selectedUser);
   const dispatch = useAppDispatch();
   const router = useRouter();
   const [serverLogout, { data, isLoading }] = authApi.useLogoutMutation();

   const navItem = [
      {
         title: "Profile",
         icon: User,
         href: ROUTES.PROFILE,
      },
      {
         title: "Dashboard",
         icon: LayoutDashboard,
         href: ROUTES.DASHBOARD(user?.role),
      },
      {
         title: "Appointments",
         icon: Calendar,
         href: user?.role
            ? `/dashboard/${user.role.toLocaleLowerCase()}/appointments`
            : "/appointments",
      },
   ];

   const handleLogout = () => {
      dispatch(logout());
      serverLogout();
   };

   if (data?.success) {
      router.replace("/");
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            {children && withImage ? (
               <div className="flex gap-3">
                  <UserAvatar
                     className="cursor-pointer"
                     src={user?.profileImage}
                     alt={user?.name}
                  />

                  {children}
               </div>
            ) : children ? (
               children
            ) : (
               <div>
                  <UserAvatar
                     className="cursor-pointer"
                     src={user?.profileImage}
                     alt={user?.name}
                  />
               </div>
            )}
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className="w-56 border-none p-4 bg-primary-foreground text-primary"
            align="end"
         >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
               {navItem.map((item, i) => (
                  <Link
                     key={i}
                     href={item.href}
                  >
                     <DropdownMenuItem className="rounded-md mb-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        <item.icon /> {item.title}
                        <DropdownMenuShortcut>
                           <ArrowRight size={16} />
                        </DropdownMenuShortcut>
                     </DropdownMenuItem>
                  </Link>
               ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
               <Button
                  size={"sm"}
                  variant={"outline"}
                  className="w-full"
                  disabled={isLoading}
               >
                  <LogOut />
                  Log out
               </Button>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ProfileSetting;

"use client";

import { PROFILE_IMAGE, ROUTES } from "@/constant";
import Image from "next/image";
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

   const profileImage = PROFILE_IMAGE(1);

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
      router.replace("/");
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            {children && withImage ? (
               <div className="flex gap-3">
                  <Image
                     title="Click"
                     src={user?.profileImage || profileImage}
                     alt="profile"
                     className="h-10 w-10 rounded-full cursor-pointer"
                     width={40}
                     height={40}
                  />
                  {children}
               </div>
            ) : children ? (
               children
            ) : (
               <Image
                  title="Click"
                  src={user?.profileImage || profileImage}
                  alt="profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  width={40}
                  height={40}
               />
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

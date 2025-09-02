"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Menu, X, LayoutDashboard } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { selectedUser } from "@/redux/slice/authSlice";
import { Button } from "@/components/ui/button";
import {
   TooltipProvider,
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";

const PublicHeader = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const user = useAppSelector(selectedUser);
   const pathname = usePathname();

   const navigation = [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Doctors", href: "/doctors" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
   ];

   const isActive = (href: string) => {
      if (href === "/") {
         return pathname === "/";
      }
      return pathname.startsWith(href);
   };

   return (
      <header className="bg-white shadow-sm border-b border-input sticky top-0 z-50">
         <div className="container">
            <div className="flex justify-between items-center h-18">
               {/* Logo */}
               <div className="flex items-center">
                  <Link
                     href="/"
                     className="flex items-center space-x-3"
                  >
                     <Stethoscope className="h-8 w-8 text-primary-600" />
                     <span className="text-2xl font-display font-bold text-gray-900">
                        Medica
                     </span>
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex space-x-8">
                  {navigation.map((item) => (
                     <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                           isActive(item.href)
                              ? "text-primary-600 border-b-[3px]"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                     >
                        {item.name}
                     </Link>
                  ))}
               </nav>

               {/* Desktop CTA Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  {user ? (
                     <Link href={`/dashboard`}>
                        <TooltipProvider>
                           <Tooltip delayDuration={100}>
                              <TooltipContent>Dashboard</TooltipContent>
                              <TooltipTrigger>
                                 <Button
                                    size={"icon"}
                                    variant={"outline"}
                                 >
                                    <LayoutDashboard />
                                 </Button>
                              </TooltipTrigger>
                           </Tooltip>
                        </TooltipProvider>
                     </Link>
                  ) : (
                     <Link href="/login">
                        <button className="btn btn-outline text-sm">
                           Login
                        </button>
                     </Link>
                  )}
                  <Link href="/appointments">
                     <Button>Book Appointment</Button>
                  </Link>
               </div>

               {/* Mobile menu button */}
               <div className="md:hidden">
                  <button
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                     {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                     ) : (
                        <Menu className="h-6 w-6" />
                     )}
                  </button>
               </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
               <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                     {navigation.map((item) => (
                        <Link
                           key={item.name}
                           href={item.href}
                           className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                              isActive(item.href)
                                 ? "text-primary-600 bg-primary-50"
                                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                           }`}
                           onClick={() => setIsMobileMenuOpen(false)}
                        >
                           {item.name}
                        </Link>
                     ))}

                     {/* Mobile CTA Buttons */}
                     <div className="pt-4 space-x-4 space-y-4">
                        {user ? (
                           <Link href="/dashboard">
                              <TooltipProvider>
                                 <Tooltip delayDuration={100}>
                                    <TooltipContent>Dashboard</TooltipContent>
                                    <TooltipTrigger>
                                       <Button
                                          size={"icon"}
                                          variant={"outline"}
                                       >
                                          <LayoutDashboard />
                                       </Button>
                                    </TooltipTrigger>
                                 </Tooltip>
                              </TooltipProvider>
                           </Link>
                        ) : (
                           <Link href="/login">
                              <Button
                                 variant={"outline"}
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 Login
                              </Button>
                           </Link>
                        )}
                        <Link href="/appointments">
                           <Button onClick={() => setIsMobileMenuOpen(false)}>
                              Book Appointment
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </header>
   );
};

export default PublicHeader;

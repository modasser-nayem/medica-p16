"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Menu, X, Phone } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";

const PublicHeader = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { user, loading, logout } = useAuth();
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo */}
               <div className="flex items-center">
                  <Link
                     href="/"
                     className="flex items-center space-x-3"
                  >
                     <Stethoscope className="h-8 w-8 text-primary-600" />
                     <span className="text-2xl font-display font-bold text-gray-900">
                        Medica HMS
                     </span>
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex space-x-8">
                  {navigation.map((item) => (
                     <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                           isActive(item.href)
                              ? "text-primary-600 bg-primary-50"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                     >
                        {item.name}
                     </Link>
                  ))}
               </nav>

               {/* Desktop CTA Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                     <Phone className="h-4 w-4 mr-1" />
                     <span>+1 (555) 123-4567</span>
                  </div>
                  {!loading && user ? (
                     <Link href={`/dashboard/${user.role.toLowerCase()}`}>
                        <button className="btn btn-outline text-sm">
                           Dashboard
                        </button>
                     </Link>
                  ) : (
                     <Link href="/auth/login">
                        <button className="btn btn-outline text-sm">
                           Login
                        </button>
                     </Link>
                  )}
                  <Link href="/appointments">
                     <button className="btn btn-primary text-sm">
                        Book Appointment
                     </button>
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
                     <div className="pt-4 space-y-3">
                        <div className="flex items-center justify-center text-sm text-gray-600">
                           <Phone className="h-4 w-4 mr-1" />
                           <span>+1 (555) 123-4567</span>
                        </div>
                        {!loading && user ? (
                           <Link href="/dashboard">
                              <button className="btn btn-outline text-sm">
                                 Dashboard
                              </button>
                           </Link>
                        ) : (
                           <Link href="/auth/login">
                              <button
                                 className="btn btn-outline w-full"
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 Login
                              </button>
                           </Link>
                        )}
                        <Link href="/appointments">
                           <button
                              className="btn btn-primary w-full"
                              onClick={() => setIsMobileMenuOpen(false)}
                           >
                              Book Appointment
                           </button>
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

"use client";

import { userService } from "@/services/userService";
import {
   ArrowRight,
   Calendar,
   CheckCircle,
   Clock,
   Play,
   Shield,
   Stethoscope,
   TestTube,
   Users,
   Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
   const [users, setUsers] = useState<[] | null>(null);

   const fetchUsers = async () => {
      try {
         const responses = await userService.getAllUSers();
         setUsers(responses.data.data);
      } catch (error) {
         console.log("Server Error, failed to get data");
         console.log(error);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   return (
      <div className="min-h-screen bg-white">
         <main>
            <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
               <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
               <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                  <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                              <Stethoscope className="w-4 h-4 mr-2" />
                              Trusted Healthcare Platform
                           </div>
                           <h1 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-gray-900 leading-tight">
                              Your Health,
                              <span className="text-primary-600 block">
                                 Our Priority
                              </span>
                           </h1>
                           <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                              Experience world-class healthcare with our
                              comprehensive hospital management system. From
                              appointments to prescriptions, we've got you
                              covered.
                           </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                           <Link href="/auth/register">
                              <button className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                 Get Started Today
                                 <ArrowRight className="ml-2 h-5 w-5" />
                              </button>
                           </Link>
                           <button className="btn btn-outline text-lg px-8 py-4 border-2 hover:bg-primary-50">
                              <Play className="mr-2 h-5 w-5" />
                              Watch Demo
                           </button>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
                           <div className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                              <span>HIPAA Compliant</span>
                           </div>
                           <div className="flex items-center">
                              <Shield className="w-5 h-5 text-primary-500 mr-2" />
                              <span>Secure & Private</span>
                           </div>
                           <div className="flex items-center">
                              <Clock className="w-5 h-5 text-warning-500 mr-2" />
                              <span>24/7 Support</span>
                           </div>
                        </div>
                     </div>

                     <div className="mt-12 lg:mt-0 relative">
                        <div className="relative z-10">
                           <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                              <div className="space-y-4">
                                 <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                       <Calendar className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                       <h3 className="font-semibold text-gray-900">
                                          Book Appointment
                                       </h3>
                                       <p className="text-sm text-gray-600">
                                          Quick & Easy Scheduling
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                                       <Video className="w-6 h-6 text-success-600" />
                                    </div>
                                    <div>
                                       <h3 className="font-semibold text-gray-900">
                                          Online Consultation
                                       </h3>
                                       <p className="text-sm text-gray-600">
                                          Video, Voice & Chat
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                                       <TestTube className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <div>
                                       <h3 className="font-semibold text-gray-900">
                                          Lab Results
                                       </h3>
                                       <p className="text-sm text-gray-600">
                                          Instant Access
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                                       <Users className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <div>
                                       <h3 className="font-semibold text-gray-900">
                                          Total Users
                                       </h3>
                                       <p className="text-sm text-gray-600">
                                          {users ? users.length : "No users"}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary-200 rounded-full opacity-20 blur-3xl"></div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}

import {
   Stethoscope,
   ArrowRight,
   Play,
   CheckCircle,
   Shield,
   Clock,
   Calendar,
   Video,
   TestTube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroSection = () => (
   <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative container py-20 lg:py-32">
         <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="space-y-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                     <Stethoscope className="w-4 h-4 mr-2" />
                     Trusted Healthcare Platform
                  </div>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-900 leading-tight">
                     Your Health,
                     <span className="text-primary-600 block">
                        Our Priority
                     </span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                     Experience world-class healthcare with our comprehensive
                     hospital management system. From appointments to
                     prescriptions, we've got you covered.
                  </p>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                     <Button className="px-5 py-7 text-lg font-semibold">
                        Get Started Today
                        <ArrowRight className="ml-2 h-6 w-6" />
                     </Button>
                  </Link>
                  <Button
                     variant={"outline"}
                     className="px-5 py-7 text-lg font-semibold"
                  >
                     <Play className="mr-2 h-6 w-6" />
                     Watch Demo
                  </Button>
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
                     </div>
                  </div>
               </div>
               <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
               <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
         </div>
      </div>
   </section>
);

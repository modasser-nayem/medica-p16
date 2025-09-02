"use client";

import React from "react";
import Link from "next/link";
import {
   Stethoscope,
   Heart,
   Brain,
   Baby,
   Eye,
   Bone,
   TestTube,
   Pill,
   Calendar,
   Video,
   Shield,
   Clock,
   Star,
   ArrowRight,
   ArrowLeft,
   LogIn,
   Phone,
   Mail,
} from "lucide-react";
import PublicHeader from "@/components/shared/Header";
import PublicFooter from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";

const ServicesPage = () => {
   const services = [
      {
         icon: Stethoscope,
         title: "General Consultation",
         description:
            "Comprehensive health check-ups and consultations with experienced physicians.",
         features: [
            "Health assessments",
            "Preventive care",
            "Chronic disease management",
            "Health counseling",
         ],
         color: "text-primary-600",
         bgColor: "bg-primary-50",
         price: "From $50",
      },
      {
         icon: Heart,
         title: "Cardiology",
         description:
            "Specialized heart care with advanced diagnostic and treatment facilities.",
         features: [
            "ECG & EKG",
            "Echocardiogram",
            "Stress tests",
            "Cardiac rehabilitation",
         ],
         color: "text-error-600",
         bgColor: "bg-error-50",
         price: "From $150",
      },
      {
         icon: Brain,
         title: "Neurology",
         description:
            "Expert neurological care for brain and nervous system disorders.",
         features: [
            "MRI & CT scans",
            "EEG testing",
            "Neurological exams",
            "Treatment plans",
         ],
         color: "text-purple-600",
         bgColor: "bg-purple-50",
         price: "From $200",
      },
      {
         icon: Baby,
         title: "Pediatrics",
         description:
            "Comprehensive healthcare for children from birth through adolescence.",
         features: [
            "Well-child visits",
            "Vaccinations",
            "Growth monitoring",
            "Behavioral health",
         ],
         color: "text-pink-600",
         bgColor: "bg-pink-50",
         price: "From $75",
      },
      {
         icon: Eye,
         title: "Ophthalmology",
         description:
            "Complete eye care services including vision correction and surgery.",
         features: [
            "Eye exams",
            "Glasses & contacts",
            "Cataract surgery",
            "Retinal care",
         ],
         color: "text-blue-600",
         bgColor: "bg-blue-50",
         price: "From $100",
      },
      {
         icon: Bone,
         title: "Orthopedics",
         description:
            "Specialized care for bones, joints, muscles, and connective tissues.",
         features: [
            "Joint replacement",
            "Sports medicine",
            "Physical therapy",
            "Fracture care",
         ],
         color: "text-orange-600",
         bgColor: "bg-orange-50",
         price: "From $180",
      },
      {
         icon: TestTube,
         title: "Laboratory Services",
         description:
            "Comprehensive diagnostic testing with quick and accurate results.",
         features: [
            "Blood tests",
            "Urine analysis",
            "Microbiology",
            "Pathology",
         ],
         color: "text-green-600",
         bgColor: "bg-green-50",
         price: "From $30",
      },
      {
         icon: Pill,
         title: "Pharmacy Services",
         description:
            "Full-service pharmacy with prescription and over-the-counter medications.",
         features: [
            "Prescription filling",
            "Medication counseling",
            "Health screenings",
            "Immunizations",
         ],
         color: "text-teal-600",
         bgColor: "bg-teal-50",
         price: "Varies",
      },
   ];

   const features = [
      {
         icon: Calendar,
         title: "Easy Appointment Booking",
         description:
            "Book appointments online 24/7 with your preferred doctor",
      },
      {
         icon: Video,
         title: "Telemedicine Services",
         description: "Connect with doctors remotely via video consultations",
      },
      {
         icon: Shield,
         title: "Secure Health Records",
         description:
            "Your medical information is protected with industry-leading security",
      },
      {
         icon: Clock,
         title: "24/7 Emergency Care",
         description:
            "Round-the-clock emergency services for urgent medical needs",
      },
   ];

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <PublicHeader />

         <section className="bg-gradient-to-br from-primary-50 to-indigo-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center">
                  <Link
                     href="/"
                     className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
                  >
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Back to Home
                  </Link>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                     Our Services
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                     Comprehensive healthcare services designed to meet all your
                     medical needs. From routine check-ups to specialized
                     treatments, we're here to provide the best care possible.
                  </p>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                     const Icon = feature.icon;
                     return (
                        <div
                           key={index}
                           className="text-center"
                        >
                           <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                              <Icon className="h-8 w-8" />
                           </div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {feature.title}
                           </h3>
                           <p className="text-gray-600">
                              {feature.description}
                           </p>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Services Grid */}
         <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                     Medical Services
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Explore our comprehensive range of medical services and
                     specialties
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => {
                     const Icon = service.icon;
                     return (
                        <div
                           key={index}
                           className="card hover:shadow-lg transition-shadow duration-300"
                        >
                           <div className="card-body">
                              <div
                                 className={`inline-flex items-center justify-center w-12 h-12 ${service.bgColor} ${service.color} rounded-lg mb-4`}
                              >
                                 <Icon className="h-6 w-6" />
                              </div>

                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                 {service.title}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                 {service.description}
                              </p>

                              <div className="mb-4">
                                 <ul className="space-y-2">
                                    {service.features.map(
                                       (feature, featureIndex) => (
                                          <li
                                             key={featureIndex}
                                             className="flex items-center text-sm text-gray-600"
                                          >
                                             <Star className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                                             {feature}
                                          </li>
                                       )
                                    )}
                                 </ul>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                 <span className="text-lg font-semibold text-primary-600">
                                    {service.price}
                                 </span>
                                 <Link href="/appointments">
                                    <Button className="px-4 py-4">
                                       Book Now
                                       <ArrowRight className="ml-1 h-5 w-5" />
                                    </Button>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20">
            <div className="text-center">
               <h2 className="text-2xl lg:text-3xl xl:text-4xl font-display font-bold mb-6">
                  Ready to Get Started?
               </h2>
               <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of patients and healthcare professionals who
                  trust our platform for their medical needs. Experience
                  seamless healthcare management today.
               </p>

               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link href="/register">
                     <Button className="border-2 border-primary px-6 py-6 text-base font-semibold">
                        Create Account
                        <ArrowRight className="ml-1 h-5 w-5" />
                     </Button>
                  </Link>
                  <Link href="/login">
                     <Button
                        variant={"outline"}
                        className="border-2 border-primary px-6 py-6 text-base font-semibold text-primary"
                     >
                        Login <LogIn className="ml-1 h-5 w-5" />
                     </Button>
                  </Link>
               </div>

               {/* Contact Info */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-3">
                     <Phone className="h-5 w-5" />
                     <span className="text-lg">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                     <Mail className="h-5 w-5" />
                     <span className="text-lg">support@medica.com</span>
                  </div>
               </div>

               {/* Trust Indicators */}
               <div className="mt-12 pt-8 border-t">
                  <p className="text-sm mb-4">
                     Trusted by healthcare professionals worldwide
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                     <div className="text-xs font-medium">HIPAA Compliant</div>
                     <div className="text-xs font-medium">
                        ISO 27001 Certified
                     </div>
                     <div className="text-xs font-medium">24/7 Support</div>
                     <div className="text-xs font-medium">99.9% Uptime</div>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <PublicFooter />
      </div>
   );
};

export default ServicesPage;

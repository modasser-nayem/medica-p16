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
} from "lucide-react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

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

         <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="text-center">
                  <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                     Our Services
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                     Comprehensive healthcare services designed to meet all your
                     medical needs. From routine check-ups to specialized
                     treatments, we're here to provide the best care possible.
                  </p>
               </div>
            </div>
         </div>

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
                                    <button className="btn btn-primary text-sm">
                                       Book Now
                                       <ArrowRight className="ml-1 h-4 w-4" />
                                    </button>
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
         <section className="py-16 bg-primary-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                  Ready to Get Started?
               </h2>
               <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Book your appointment today and experience world-class
                  healthcare services.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/appointments">
                     <button className="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-3">
                        Book Appointment
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </button>
                  </Link>
                  <Link href="/contact">
                     <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                        Contact Us
                     </button>
                  </Link>
               </div>
            </div>
         </section>

         {/* Footer */}
         <PublicFooter />
      </div>
   );
};

export default ServicesPage;

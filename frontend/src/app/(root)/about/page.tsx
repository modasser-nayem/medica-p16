"use client";

import React from "react";
import Link from "next/link";
import { Heart, Shield, Users, Award, Clock, ArrowLeft } from "lucide-react";
import PublicHeader from "@/components/shared/Header";
import PublicFooter from "@/components/shared/Footer";

const AboutPage: React.FC = () => {
   const values = [
      {
         icon: Heart,
         title: "Patient-Centered Care",
         description:
            "We put our patients first, ensuring their comfort and well-being in everything we do.",
      },
      {
         icon: Shield,
         title: "Quality & Safety",
         description:
            "Maintaining the highest standards of medical care and patient safety.",
      },
      {
         icon: Users,
         title: "Expert Team",
         description:
            "Our team of healthcare professionals is dedicated to providing exceptional care.",
      },
      {
         icon: Clock,
         title: "24/7 Availability",
         description:
            "Round-the-clock medical services for emergencies and urgent care needs.",
      },
   ];

   const achievements = [
      { number: "25+", label: "Years of Excellence" },
      { number: "50+", label: "Expert Doctors" },
      { number: "1000+", label: "Happy Patients" },
      { number: "15+", label: "Medical Specialties" },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Header */}
         <PublicHeader />

         {/* Hero Section */}
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
                     About Medica
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                     Leading the way in comprehensive healthcare management with
                     cutting-edge technology and compassionate care.
                  </p>
               </div>
            </div>
         </section>

         {/* Mission & Vision */}
         <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Our Mission
                     </h2>
                     <p className="text-lg text-gray-600 mb-6">
                        To provide exceptional healthcare services through
                        innovative technology, ensuring every patient receives
                        personalized, high-quality care in a comfortable and
                        safe environment.
                     </p>
                     <p className="text-gray-600">
                        We are committed to improving the health and well-being
                        of our community by delivering comprehensive medical
                        services with compassion and excellence.
                     </p>
                  </div>
                  <div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Our Vision
                     </h2>
                     <p className="text-lg text-gray-600 mb-6">
                        To be the leading healthcare institution that sets the
                        standard for patient care, medical innovation, and
                        community health improvement.
                     </p>
                     <p className="text-gray-600">
                        We envision a future where advanced technology and human
                        compassion work together to provide the best possible
                        healthcare experience for all.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Values */}
         <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                     Our Core Values
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     The principles that guide everything we do
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => {
                     const Icon = value.icon;
                     return (
                        <div
                           key={index}
                           className="bg-white rounded-lg shadow-md p-6 text-center"
                        >
                           <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                              <Icon className="h-8 w-8 text-primary-600" />
                           </div>
                           <h3 className="text-xl font-semibold text-gray-900 mb-3">
                              {value.title}
                           </h3>
                           <p className="text-gray-600">{value.description}</p>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Achievements */}
         <section className="py-20 bg-primary-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                     Our Achievements
                  </h2>
                  <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                     Milestones that reflect our commitment to excellence
                  </p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {achievements.map((achievement, index) => (
                     <div
                        key={index}
                        className="text-center"
                     >
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                           {achievement.number}
                        </div>
                        <div className="text-primary-100">
                           {achievement.label}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* History */}
         <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                     Our History
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     A journey of growth and innovation in healthcare
                  </p>
               </div>
               <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                     <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary-600" />
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                           1999 - Foundation
                        </h3>
                        <p className="text-gray-600">
                           Medica HMS was established with a vision to
                           revolutionize healthcare management through
                           technology and patient-centered care.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-6">
                     <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                           2010 - Expansion
                        </h3>
                        <p className="text-gray-600">
                           Expanded our services to include specialized
                           departments and introduced advanced medical
                           technologies.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-6">
                     <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-purple-600" />
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                           2020 - Digital Transformation
                        </h3>
                        <p className="text-gray-600">
                           Launched our comprehensive digital platform, making
                           healthcare more accessible and efficient for patients
                           and staff.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-6">
                     <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-orange-600" />
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                           2024 - Future Forward
                        </h3>
                        <p className="text-gray-600">
                           Continuing to innovate with AI-powered diagnostics,
                           telemedicine services, and personalized healthcare
                           solutions.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Join Our Healthcare Family
               </h2>
               <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Experience the difference that quality healthcare makes in
                  your life
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/register">
                     <button className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Get Started Today
                     </button>
                  </Link>
                  <Link href="/auth/login">
                     <button className="inline-flex items-center px-8 py-3 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Sign In
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

export default AboutPage;

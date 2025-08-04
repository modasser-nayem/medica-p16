"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
   Search,
   Star,
   MapPin,
   Clock,
   Calendar,
   Phone,
   Mail,
   ArrowRight,
   Heart,
   Brain,
   Baby,
   Eye,
   Bone,
   Stethoscope,
} from "lucide-react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { useApi } from "@/hooks/useApi";
import { GetDoctorFilters, userService } from "@/services";
import { IDoctor } from "@/types/doctor";

const DoctorsPage = () => {
   const [doctors, setDoctors] = useState<IDoctor[] | null>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedDepartment, setSelectedDepartment] = useState("");
   const [selectedRating, setSelectedRating] = useState("");

   const { execute: fetchDoctor, loading } = useApi(userService.getDoctors);

   const loadDoctorData = async () => {
      const filters: GetDoctorFilters = {
         search: searchTerm,
         specialty: selectedDepartment,
      };
      const response = await fetchDoctor(filters);
      setDoctors(response);
   };

   useEffect(() => {
      loadDoctorData();
   }, []);

   const departments = [
      { id: "", name: "All Departments", icon: Stethoscope },
      { id: "cardiology", name: "Cardiology", icon: Heart },
      { id: "neurology", name: "Neurology", icon: Brain },
      { id: "pediatrics", name: "Pediatrics", icon: Baby },
      { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
      { id: "orthopedics", name: "Orthopedics", icon: Bone },
   ];

   const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
         <Star
            key={i}
            className={`h-4 w-4 ${
               i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
            }`}
         />
      ));
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <PublicHeader />

         <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="text-center">
                  <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                     Our Doctors
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Meet our team of experienced and qualified healthcare
                     professionals dedicated to providing the best care.
                  </p>
               </div>
            </div>
         </div>

         {/* Search and Filters */}
         <section className="py-8 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search doctors by name or specialization..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="input pl-10 w-full"
                        />
                     </div>
                  </div>

                  {/* Department Filter */}
                  <div>
                     <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="input"
                     >
                        <option value="">All Departments</option>
                        {departments.slice(1).map((dept) => (
                           <option
                              key={dept.id}
                              value={dept.id}
                           >
                              {dept.name}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                     <select
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        className="input"
                     >
                        <option value="">All Ratings</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.0">4.0+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                     </select>
                  </div>
               </div>
            </div>
         </section>

         {/* Doctors Grid */}
         {doctors && (
            <section className="py-12">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                     <p className="text-gray-600">
                        Showing 57 of {doctors.length} doctors
                     </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {doctors.map((doctor) => (
                        <div
                           key={doctor.id}
                           className="card hover:shadow-lg transition-shadow duration-300"
                        >
                           <div className="card-body">
                              <div className="flex items-start space-x-6">
                                 {/* Doctor Image */}
                                 <div className="flex-shrink-0">
                                    <img
                                       src={
                                          doctor.user.profileImage ||
                                          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fdoctor&psig=AOvVaw0WAuQUQyPa_Z1ukL6NZ7Od&ust=1754400671527000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDj2vuh8Y4DFQAAAAAdAAAAABAE"
                                       }
                                       alt={doctor.user.name}
                                       className="w-24 h-24 rounded-full object-cover"
                                    />
                                 </div>

                                 {/* Doctor Info */}
                                 <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                       <div>
                                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                             {doctor.user.name}
                                          </h3>
                                          <p className="text-primary-600 font-medium">
                                             {doctor.specialization}
                                          </p>
                                       </div>
                                       <div className="text-right">
                                          <div className="flex items-center mb-1">
                                             {renderStars(5)}
                                             <span className="ml-1 text-sm text-gray-600">
                                                ({doctor.totalReviews})
                                             </span>
                                          </div>
                                          <p className="text-lg font-semibold text-primary-600">
                                             {340}
                                          </p>
                                       </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4">
                                       {doctor.qualifications}
                                    </p>

                                    {/* Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                       <div className="flex items-center text-gray-600">
                                          <MapPin className="h-4 w-4 mr-2" />
                                          {doctor.isAvailable}
                                       </div>
                                       <div className="flex items-center text-gray-600">
                                          <Clock className="h-4 w-4 mr-2" />
                                          {doctor.isAvailable}
                                       </div>
                                       <div className="flex items-center text-gray-600">
                                          <Phone className="h-4 w-4 mr-2" />
                                          {doctor.user.dateOfBirth}
                                       </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-6">
                                       <Link
                                          href={`/appointments?doctor=${doctor.id}`}
                                       >
                                          <button className="btn btn-primary">
                                             Book Appointment
                                             <Calendar className="ml-2 h-4 w-4" />
                                          </button>
                                       </Link>
                                       <Link href={`/doctors/${doctor.id}`}>
                                          <button className="btn btn-outline">
                                             View Profile
                                             <ArrowRight className="ml-2 h-4 w-4" />
                                          </button>
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {doctors.length === 0 && (
                     <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                           No doctors found matching your criteria.
                        </p>
                        <button
                           onClick={() => {
                              setSearchTerm("");
                              setSelectedDepartment("");
                              setSelectedRating("");
                           }}
                           className="btn btn-primary mt-4"
                        >
                           Clear Filters
                        </button>
                     </div>
                  )}
               </div>
            </section>
         )}

         {/* Footer */}
         <PublicFooter />
      </div>
   );
};

export default DoctorsPage;

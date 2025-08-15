"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
   Search,
   Star,
   Heart,
   Brain,
   Baby,
   Eye,
   Bone,
   Stethoscope,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { GetDoctorFilters, userService } from "@/services";
import { IDoctor } from "@/types/doctor";
import Image from "next/image";
import { DEFAULT_DOCTOR_IMAGE } from "@/constant";
import Button from "@/components/ui/Button";
import PaginationBar from "@/components/shared/Pagination";

const DoctorsPage = () => {
   const [doctors, setDoctors] = useState<IDoctor[] | null>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedDepartment, setSelectedDepartment] = useState("");
   const [selectedRating, setSelectedRating] = useState<number | undefined>(
      undefined
   );
   const [page, setPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);
   const [limit, setLimit] = useState<number>(10);

   const {
      execute: fetchDoctor,
      loading,
      pagination,
   } = useApi(userService.getDoctors);

   const loadDoctorData = async (filters: GetDoctorFilters) => {
      const response = await fetchDoctor(filters);
      setDoctors(response);
      if (pagination) {
         setPage(pagination.page);
         setTotalPages(pagination.totalPages);
      }
   };

   useEffect(() => {
      loadDoctorData({ page, limit });
   }, [page, limit]);

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

   const handleFilter = () => {
      loadDoctorData({
         search: searchTerm,
         specialty: selectedDepartment,
         rating: selectedRating,
      });
   };

   const clearFilter = () => {
      loadDoctorData({});
   };

   return (
      <div className="">
         <div className="py-12">
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

         {/* Search and Filters */}
         <section className="py-8 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                        onChange={(e) =>
                           setSelectedRating(
                              e.target.value === ""
                                 ? undefined
                                 : Number(e.target.value)
                           )
                        }
                        className="input"
                     >
                        <option value="">All Ratings</option>
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                     </select>
                  </div>

                  <Button onClick={handleFilter}>Filter</Button>
               </div>
            </div>
         </section>

         {/* Doctors Grid */}
         {doctors && (
            <section className="py-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {doctors.map((doctor, i) => (
                     <div
                        key={doctor.id}
                        className="text-center shadow-md"
                     >
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                           <Image
                              src={
                                 doctor.user.profileImage || i % 2 === 0
                                    ? DEFAULT_DOCTOR_IMAGE
                                    : "https://res.cloudinary.com/ddogx3fld/image/upload/v1714470265/mt3eq1rmbkxhqs6hadka.png"
                              }
                              alt={doctor.user.name}
                              fill
                              className="object-cover"
                           />
                        </div>

                        <div className="text-center space-y-2 my-3">
                           <h2 className="text-lg">{doctor.user.name}</h2>
                           <p className="text-sm">
                              Consultant - {doctor.specialization}
                           </p>
                           <Link
                              className="text-base font-semibold text-primary-600 underline"
                              href={`/doctors/${doctor.id}`}
                           >
                              See Details
                           </Link>
                           <div className="flex justify-center items-center mb-1">
                              {renderStars(5)}
                              <span className="ml-1 text-sm text-gray-600">
                                 ({doctor.totalReviews} Reviews)
                              </span>
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
                        onClick={clearFilter}
                        className="btn btn-primary mt-4"
                     >
                        Clear Filters
                     </button>
                  </div>
               )}

               {pagination && (
                  <div className="max-w-3xl mx-auto py-4">
                     <PaginationBar
                        currentPage={page}
                        limit={limit}
                        setLimit={setLimit}
                        onPageChange={setPage}
                        totalPages={totalPages}
                     />
                  </div>
               )}
            </section>
         )}
      </div>
   );
};

export default DoctorsPage;

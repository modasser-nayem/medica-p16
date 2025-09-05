"use client";

import React, { useState } from "react";
import {
   Search,
   Heart,
   Brain,
   Baby,
   Eye,
   Bone,
   Stethoscope,
} from "lucide-react";
import { doctorApi } from "@/redux/api/doctor";
import Loading from "@/components/ui/loading";
import ErrorState from "@/components/shared/ErrorState";
import NoDataAvailable from "@/components/shared/NoDataAvailable";
import PageHeader from "@/components/shared/PageHeader";
import DoctorsList from "@/components/doctor/DoctorList";
import { IGetDoctorsFilter } from "@/types";
import CustomPagination from "@/components/shared/CustomPagination";

const DoctorsPage = () => {
   const [filters, setFilters] = useState<IGetDoctorsFilter>({});

   const { data, isLoading, isError, refetch } =
      doctorApi.useGetDoctorsQuery(filters);

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            title="Unable to load doctors"
            description="There was a problem fetching doctors"
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const departments = [
      { id: "", name: "All Departments", icon: Stethoscope },
      { id: "cardiology", name: "Cardiology", icon: Heart },
      { id: "neurology", name: "Neurology", icon: Brain },
      { id: "pediatrics", name: "Pediatrics", icon: Baby },
      { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
      { id: "orthopedics", name: "Orthopedics", icon: Bone },
   ];

   return (
      <div>
         {/* Header */}

         <PageHeader
            title="Our Doctors"
            description="Meet our team of experienced and qualified healthcare
                     professionals dedicated to providing the best care."
         />

         <div className="container">
            {/* Search and Filters */}
            <section className="py-10 border-b border-gray-400">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search doctors by name or specialization..."
                           value={filters.search}
                           onChange={(e) =>
                              setFilters({ ...filters, search: e.target.value })
                           }
                           className="input pl-10 w-full"
                        />
                     </div>
                  </div>

                  {/* Department Filter */}
                  <div>
                     <select
                        value={filters.department}
                        onChange={(e) =>
                           setFilters({
                              ...filters,
                              department: e.target.value,
                           })
                        }
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
                        value={filters.rating}
                        onChange={(e) =>
                           setFilters({
                              ...filters,
                              rating: e.target.value
                                 ? Number(e.target.value)
                                 : undefined,
                           })
                        }
                        className="input"
                     >
                        <option value="">All Ratings</option>
                        <option value={5}>4.5+ Stars</option>
                        <option value={4}>4.0+ Stars</option>
                        <option value={3}>3.5+ Stars</option>
                     </select>
                  </div>
               </div>
            </section>

            {/* Doctors Grid */}
            {data.data.length > 0 ? (
               <section className="py-12">
                  <div className="">
                     <DoctorsList doctors={data.data} />
                  </div>

                  {/* Pagination */}

                  {data.pagination && (
                     <div className="mt-10">
                        <CustomPagination
                           currentPage={data.pagination.page}
                           totalPages={data.pagination.totalPage}
                           onPageChange={(newPage) =>
                              setFilters({ ...filters, page: newPage })
                           }
                        />
                     </div>
                  )}
               </section>
            ) : (
               <NoDataAvailable
                  actionLabel="Clear Filter"
                  onAction={() => setFilters({})}
               />
            )}
         </div>
      </div>
   );
};

export default DoctorsPage;

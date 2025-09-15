"use client";

import AppointmentCard from "@/components/dashboard/AppointmentCard";
import CustomPagination from "@/components/shared/CustomPagination";
import ErrorState from "@/components/shared/ErrorState";
import NoDataAvailable from "@/components/shared/NoDataAvailable";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { appointmentApi } from "@/redux/api/appointment";
import { AppointmentStatus, IGetAppointmentsFilters } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
   const [filters, setFilters] = useState<IGetAppointmentsFilters>({});
   const { data, isLoading, isError, refetch } =
      appointmentApi.useGetAppointmentsQuery({});

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const appointments = data.data;
   const pagination = data.pagination;

   const apptStatus: AppointmentStatus[] = [
      "PENDING",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
   ];

   return (
      <div>
         {/* Header with action button */}
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Appointments</h2>

            <Link href={"/doctors"}>
               <Button
                  size="sm"
                  className="rounded-full"
               >
                  <Calendar /> Book Appointments
               </Button>
            </Link>
         </div>

         <section className="py-12">
            {appointments.length > 0 ? (
               <>
                  {/* Filters */}
                  <div className="py-10 flex flex-wrap gap-5">
                     {apptStatus.map((item, i) => (
                        <Button
                           key={i}
                           className="capitalize"
                           variant={
                              item === filters.status ? "default" : "outline"
                           }
                           onClick={() =>
                              setFilters({ ...filters, status: "COMPLETED" })
                           }
                        >
                           {item === "CONFIRMED"
                              ? "Upcoming"
                              : item.toLowerCase()}
                        </Button>
                     ))}
                     <Button onClick={() => setFilters({})}>
                        Clear Filter
                     </Button>
                  </div>

                  {/* Appointments Grid */}
                  <div className="grid gap-4 xl:grid-cols-2">
                     {appointments.map((a: any) => (
                        <AppointmentCard
                           key={a.id}
                           appt={a}
                        />
                     ))}
                  </div>

                  {/* Pagination */}
                  {pagination && (
                     <div className="my-20">
                        <CustomPagination
                           currentPage={pagination.page}
                           totalPages={pagination.totalPages}
                           onPageChange={(newPage) =>
                              setFilters({ ...filters, page: newPage })
                           }
                           limit={pagination.limit}
                           onLimitChange={(newLimit) =>
                              setFilters({ ...filters, limit: newLimit })
                           }
                        />
                     </div>
                  )}
               </>
            ) : (
               <NoDataAvailable
                  actionLabel="Clear Filter"
                  onAction={() => setFilters({})}
               />
            )}
         </section>
      </div>
   );
};

export default page;

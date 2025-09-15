"use client";

import PaymentTable from "@/components/admin/PaymentTable";
import CustomPagination from "@/components/shared/CustomPagination";
import ErrorState from "@/components/shared/ErrorState";
import NoDataAvailable from "@/components/shared/NoDataAvailable";
import Loading from "@/components/ui/loading";
import { paymentApi } from "@/redux/api/payment";
import { IGetPaymentFilters } from "@/types";
import React, { useState } from "react";

const Payments = () => {
   const [filters, setFilters] = useState<IGetPaymentFilters>({});

   const { data, isLoading, isError, refetch } =
      paymentApi.useGetAllPaymentsQuery(filters);

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const pagination = data.pagination;
   const payments = data.data;

   return (
      <div>
         {/* Header with action button */}
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Payments</h2>
         </div>

         <section className="py-12">
            {payments.length > 0 ? (
               <>
                  {/* Filters */}

                  {/* Payments Table */}
                  <div className="w-[380px] md:w-full">
                     <PaymentTable payments={payments} />
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

export default Payments;

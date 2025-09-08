"use client";

import { departmentApi } from "@/redux/api/department";
import Loading from "@/components/ui/loading";
import ErrorState from "@/components/shared/ErrorState";
import NoDataAvailable from "@/components/shared/NoDataAvailable";
import Image from "next/image";

export const DepartmentsSection = () => {
   const { data, isLoading, isError, refetch } =
      departmentApi.useGetDepartmentsQuery();

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            title="Unable to load fees"
            description="There was a problem fetching consultation fees."
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const departments = data.data.slice(0, 9);

   return (
      <section
         id="departments"
         className="py-20 bg-white"
      >
         <div className="container">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                  Our Medical Departments
               </h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Access specialized care across multiple medical departments
                  with our team of expert healthcare professionals.
               </p>
            </div>

            {departments.length === 0 ? (
               <NoDataAvailable />
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {departments.map((dept, index) => {
                     return (
                        <div
                           key={index}
                           className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 hover:shadow-soft transition-all duration-200 cursor-pointer"
                        >
                           <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4 transition-colors duration-200">
                              <Image
                                 src={dept.icon}
                                 alt={dept.name}
                                 width={100}
                                 height={100}
                              />
                           </div>
                           <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                              {dept.name}
                           </h3>
                           <p className="text-sm text-gray-600">
                              {dept.description}
                           </p>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </section>
   );
};

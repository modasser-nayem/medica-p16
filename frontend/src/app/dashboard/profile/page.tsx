"use client";

import DoctorPersonalInformation from "@/components/profile/DoctorPersonalInformation";
import GeneralInformation from "@/components/profile/GeneralInformation";
import PatientPersonalInformation from "@/components/profile/PatientPersonalInformation";
import ErrorState from "@/components/shared/ErrorState";
import Loading from "@/components/ui/loading";
import { userApi } from "@/redux/api/user";
import React from "react";

const ProfilePage = () => {
   const { data, isLoading, isError, refetch } = userApi.useGetProfileQuery();

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

   return (
      <div className="space-y-6">
         <div className="border border-gray-300 bg-primary-foreground p-10">
            <h2 className="text-xl mb-3">General Information</h2>
            <div>
               <GeneralInformation user={data?.data} />
            </div>
         </div>
         <div className="border border-gray-300 bg-primary-foreground p-10">
            <h2 className="text-xl mb-3">Personal Information</h2>
            <div>
               {data.data?.patientProfile && (
                  <PatientPersonalInformation
                     profile={data.data.patientProfile}
                  />
               )}
               {data.data?.doctorProfile && (
                  <DoctorPersonalInformation
                     profile={data.data.doctorProfile}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;

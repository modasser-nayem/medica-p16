"use client";

import ErrorState from "@/components/shared/ErrorState";
import Loading from "@/components/ui/loading";
import { appointmentApi } from "@/redux/api/appointment";
import React from "react";

const page = () => {
   const { data, isLoading, isError, refetch } =
      appointmentApi.useGetAppointmentsQuery({});

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

   console.log(data.data);

   return <div>Appointment page</div>;
};

export default page;

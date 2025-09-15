"use client";

import { appointmentApi } from "@/redux/api/appointment";
import React from "react";
import ErrorState from "../shared/ErrorState";
import Loading from "../ui/loading";

const AppointmentDetails = ({ id }: { id: string }) => {
   const { data, isLoading, isError, refetch } =
      appointmentApi.useGetAppointmentDetailsQuery(id);

   if (isLoading) return <Loading />;
   if (isError || !data?.data) {
      return (
         <ErrorState
            onRetry={() => refetch()}
            isLoading={isLoading}
         />
      );
   }

   const appoint = data.data;
   console.log(appoint);

   return <div>AppointmentDetails</div>;
};

export default AppointmentDetails;

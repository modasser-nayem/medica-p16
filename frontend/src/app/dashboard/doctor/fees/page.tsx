"use client";

import AddConsultationFee from "@/components/doctor/AddConsultationFee";
import ErrorState from "@/components/shared/ErrorState";
import NoDataAvailable from "@/components/shared/NoDataAvailable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { useAppSelector } from "@/hooks/redux";
import { doctorApi } from "@/redux/api/doctor";
import { selectedUser } from "@/redux/slice/authSlice";
import { ConsultationType } from "@/types/doctor";
import {
   CircleCheckBig,
   Edit,
   MessageSquareMore,
   Minus,
   PhoneCall,
   Plus,
   Video,
   X,
} from "lucide-react";
import React from "react";

const Page = () => {
   const user = useAppSelector(selectedUser);

   if (!user) return <Loading />;

   const { data, isLoading, isError, refetch } = doctorApi.useGetFeesQuery(
      user.profileId!
   );

   const [updateActivation, { isLoading: isActiveLoading }] =
      doctorApi.useUpdateFeeActivationMutation();

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

   const typeWiseIcon = (type: ConsultationType) =>
      type === "CHAT" ? (
         <MessageSquareMore size={24} />
      ) : type === "VOICE" ? (
         <PhoneCall size={24} />
      ) : (
         <Video size={24} />
      );

   return (
      <div className="p-6">
         {/* Header with action button */}
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Consultation Fees</h2>
            <AddConsultationFee
               dialogTitle="Add New Fee"
               submitLevel="Create"
            >
               <Button
                  size="sm"
                  className="rounded-full"
                  disabled={data.data.length >= 3 ? true : false}
               >
                  <Plus /> Add New Fee
               </Button>
            </AddConsultationFee>
         </div>

         {/* Fees Grid */}
         {data.data.length === 0 ? (
            <NoDataAvailable>
               <AddConsultationFee
                  dialogTitle="Add New Fee"
                  submitLevel="Create"
               >
                  <Button>
                     {" "}
                     <Plus /> Add New Fee
                  </Button>
               </AddConsultationFee>
            </NoDataAvailable>
         ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
               {data.data.map((fee) => (
                  <Card
                     key={fee.id}
                     className="shadow-md bg-gray-800 text-gray-300 border border-gray-300 rounded-2xl"
                  >
                     <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-3">
                           <p className="flex items-center gap-1.5">
                              <span>{typeWiseIcon(fee.type)}</span>
                              <span>{fee.type}</span>
                           </p>
                           <Minus />
                           <span> Consultation</span>
                           <span className="right-0 text-sm">
                              {fee.isActive ? (
                                 <CircleCheckBig
                                    size={16}
                                    className="text-success"
                                 />
                              ) : (
                                 <X
                                    size={16}
                                    className="text-error"
                                 />
                              )}
                           </span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-baseline gap-1 text-xl font-bold">
                           <span>{fee.fee}</span>
                           <sup className="text-sm text-gray-500">
                              {fee.currency}
                           </sup>
                        </div>

                        <div className="flex justify-between mt-4 gap-2">
                           <AddConsultationFee
                              dialogTitle="Update Fee"
                              submitLevel="Update"
                              defaultValue={fee}
                           >
                              <Button size="sm">
                                 <Edit /> Edit
                              </Button>
                           </AddConsultationFee>
                           <Button
                              size="sm"
                              onClick={() => updateActivation(fee.id)}
                              disabled={isActiveLoading}
                              title="Click to Active"
                           >
                              {fee.isActive ? "Deactivate" : "Activate"}
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
      </div>
   );
};

export default Page;

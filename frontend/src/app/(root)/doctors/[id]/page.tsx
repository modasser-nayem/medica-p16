"use client";

import ErrorState from "@/components/shared/ErrorState";
import Loading from "@/components/ui/loading";
import { DOCTOR_PROFILE_IMG, ROUTES } from "@/constant";
import { doctorApi } from "@/redux/api/doctor";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ConsultationFees from "../ConsultationFee";
import { Button } from "@/components/ui/button";
import DoctorScheduleSlots from "@/components/doctor/DoctorScheduleSlots";
import React, { useState } from "react";
import { IConsultationFee } from "@/types";
import { useAppSelector } from "@/hooks/redux";
import { selectedUser } from "@/redux/slice/authSlice";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import Link from "next/link";
import {
   ArrowLeft,
   ArrowRight,
   Calendar,
   MessageSquareMore,
   PhoneCall,
   Video,
} from "lucide-react";
import { appointmentApi } from "@/redux/api/appointment";
import AuthDialog from "@/components/shared/AuthDialog";

const DoctorDetailsPage = () => {
   const router = useRouter();

   const user = useAppSelector(selectedUser);
   const { id } = useParams();
   const [appointmentData, setAppointmentData] = useState<
      Partial<{
         patientId: string;
         doctorId: string;
         startsAt: string;
         consultType?: IConsultationFee;
      }>
   >({ doctorId: id as string });
   const [openAuthDialog, setOpenAuthDialog] = useState(false);
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

   const [feeError, setFeeError] = useState("");
   const [slotError, setSlotError] = useState("");

   // get doctor details
   const { data, isLoading, isError, refetch } =
      doctorApi.useGetDoctorDetailsQuery(id as string);

   // appointment booking
   const [
      bookAppoint,
      { data: appointData, error, isLoading: appointIsLoading },
   ] = appointmentApi.useCreateAppointmentMutation();

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

   const doctor = data.data;

   const handleAppointment = () => {
      if (!appointmentData.consultType) {
         setFeeError("Please Select Above Fee");
         toast.error("Please Select Appointment Fee");
         return;
      }

      if (!appointmentData.startsAt) {
         setSlotError("Please Select Below Time Slot");
         toast.error("Please Select Appointment Time Slot");
         return;
      }

      if (!user) {
         setOpenAuthDialog(true);
         return;
      }

      setAppointmentData({ ...appointmentData, patientId: user.profileId });

      setOpenConfirmDialog(true);
   };

   const handleConfirmBooking = () => {
      console.log(appointmentData);
      if (
         appointmentData.doctorId &&
         appointmentData.patientId &&
         appointmentData.consultType &&
         appointmentData.startsAt
      ) {
         bookAppoint({
            doctorId: appointmentData.doctorId,
            patientId: appointmentData.patientId,
            consultType: appointmentData.consultType.type,
            startsAt: appointmentData.startsAt,
         });
         console.log(error);
      }
   };

   if (appointData?.data.checkoutUrl) {
      router.push(appointData.data.checkoutUrl);
   }

   return (
      <div className="min-h-screen">
         <div className="container mt-10 mb-24">
            <div className="mb-10">
               <Link
                  className="flex items-center gap-2 text-primary"
                  href={ROUTES.DOCTORS}
               >
                  <ArrowLeft size={20} /> <span>Back</span>
               </Link>
            </div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
               {/* Doctor Image */}
               <div className="order-1 lg:order-2 flex-shrink-0">
                  <Image
                     priority={true}
                     src={doctor.profileImage || DOCTOR_PROFILE_IMG}
                     alt={doctor.name}
                     width={400}
                     height={400}
                     className="rounded-lg shadow-lg object-cover w-[400px] max-h-[400px]"
                  />
               </div>

               {/* Doctor Info */}
               <div className="order-2 lg:order-1 flex-1 space-y-4">
                  <h2 className="text-3xl font-bold text-gray-700">
                     {doctor.name}
                  </h2>
                  <h4 className="text-lg sm:text-xl text-slate-600 font-semibold uppercase">
                     Consultant -{"  "}
                     {doctor.specialties ||
                        "Anesthesiology & Hyperbaric Physician"}
                  </h4>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                     <div>
                        <p className="text-gray-500 text-sm">Specialties</p>
                        <p className="text-base font-semibold">
                           {doctor.department?.name || "Anesthesiology"}
                        </p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-sm">Qualification</p>
                        <p className="text-base font-semibold leading-snug">
                           {doctor.qualification || "MBBS (CMC), DA"}
                        </p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-sm">Experience</p>
                        <p className="text-base font-semibold">
                           {doctor.experience || 5} Years
                        </p>
                     </div>
                  </div>

                  {/* About Section */}
                  <div className="mt-6">
                     <h3 className="text-xl font-bold mb-3">About</h3>
                     <p className="text-gray-700 leading-relaxed">
                        Dr. Ahmed Farukh completed his MBBS from RMC and is a
                        bio-energetic medicine specialist. He has over 14 years
                        of experience including working at Health Complex,
                        Mitford Hospital, and as a Resident Medical Officer in
                        hospitals under the Ministry of Health, Saudi Arabia...
                     </p>
                  </div>
               </div>
            </div>

            <Button
               className="mt-5 px-6 py-5 rounded-md shadow-lg"
               onClick={handleAppointment}
            >
               <Calendar /> Book Appointment <ArrowRight />
            </Button>

            {/* Consultation Fees */}
            <div>
               <ConsultationFees
                  fees={doctor.fees.filter((item) => item.isActive === true)}
                  onFeeSelect={(value) => {
                     setFeeError("");
                     setAppointmentData({
                        ...appointmentData,
                        consultType: value,
                     });
                  }}
               />
               {feeError && (
                  <h3 className="text-center py-2 text-error">{feeError}!</h3>
               )}
            </div>

            {/* Appointment Slots */}
            <div className="mt-12">
               <h3 className="text-xl font-bold mb-5">
                  Available Appointment Slots{" "}
                  {slotError && (
                     <span className="text-error text-base">{slotError}!</span>
                  )}
               </h3>
               <DoctorScheduleSlots
                  doctorId={doctor.id}
                  onSlotSelect={(value) => {
                     setSlotError("");
                     setAppointmentData({
                        ...appointmentData,
                        startsAt: new Date(
                           `${value.date}T${value.slot}:00Z`
                        ).toISOString(),
                     });
                  }}
               />
            </div>

            {/* Book Button */}
            <Button
               className="mt-10 px-6 py-7 text-lg shadow-lg"
               onClick={handleAppointment}
            >
               <Calendar /> Book Appointment <ArrowRight />
            </Button>
         </div>

         {/* Auth Dialog */}
         <AuthDialog
            openAuthDialog={openAuthDialog}
            setOpenAuthDialog={setOpenAuthDialog}
         />

         {/* Confirm Dialog */}
         <ConfirmationDialog
            dialogTitle="Confirm Appointment"
            openConfirmDialog={openConfirmDialog}
            setOpenConfirmDialog={setOpenConfirmDialog}
            onConfirmed={handleConfirmBooking}
            isLoading={appointIsLoading}
         >
            {/* Doctor Info */}
            <div className="flex gap-4 items-center border rounded-lg p-4 bg-muted/50">
               <Image
                  priority
                  src={doctor.profileImage || DOCTOR_PROFILE_IMG}
                  alt={doctor.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover h-20 w-20"
               />
               <div>
                  <p className="font-semibold text-lg">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">
                     {doctor.specialties || "Anesthesiology"}
                  </p>
               </div>
            </div>

            {/* Appointment Details */}
            <div className="my-4 space-y-3 text-sm text-gray-700">
               {/* Type */}
               <div className="flex justify-between items-center border-b pb-1">
                  <span className="font-semibold">Type:</span>
                  <span className="flex items-center gap-1">
                     {" "}
                     {appointmentData.consultType?.type === "CHAT" ? (
                        <MessageSquareMore size={18} />
                     ) : appointmentData.consultType?.type === "VOICE" ? (
                        <PhoneCall size={16} />
                     ) : (
                        <Video size={18} />
                     )}
                     {appointmentData.consultType?.type}
                  </span>
               </div>

               {/* Price */}
               <div className="flex justify-between items-center border-b pb-1">
                  <span className="font-semibold">Price:</span>
                  <span>
                     {appointmentData.consultType?.fee}{" "}
                     <sup className="text-xs">
                        {appointmentData.consultType?.currency}
                     </sup>
                  </span>
               </div>

               {/* Date & Time */}
               {appointmentData.startsAt && (
                  <div className="flex justify-between items-center">
                     <span className="font-semibold">Date &amp; Time:</span>
                     <span className="text-right">
                        {new Date(appointmentData.startsAt).toLocaleDateString(
                           "en-US",
                           {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                           }
                        )}{" "}
                        at{" "}
                        {new Date(appointmentData.startsAt).toLocaleTimeString(
                           "en-US",
                           {
                              hour: "2-digit",
                              minute: "2-digit",
                           }
                        )}
                     </span>
                  </div>
               )}
            </div>
         </ConfirmationDialog>
      </div>
   );
};

export default DoctorDetailsPage;

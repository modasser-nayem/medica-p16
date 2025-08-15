"use client";

import Button from "@/components/ui/Button";
import { DEFAULT_DOCTOR_IMAGE, TIME_SLOTS } from "@/constant";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import ConsultationFees from "./ConsultationFees";
import { useApi } from "@/hooks/useApi";
import { userService } from "@/services";
import Loading from "@/components/shared/Loading";

const DoctorDetailsPage = () => {
   const { id } = useParams();

   const {
      execute,
      data: doctor,
      loading,
   } = useApi(userService.getDoctorDetails);

   useEffect(() => {
      execute(id);
   }, []);

   if (loading) return <Loading />;

   console.log(doctor);

   //    {
   //     "id": "e8239542-5017-4c32-9f8f-a3931e808ea8",
   //     "name": "Doctor Two",
   //     "email": "doctor2@gmail.com",
   //     "phone": "",
   //     "dateOfBirth": "2000-02-05T00:00:00.000Z",
   //     "gender": "MALE",
   //     "address": null,
   //     "profileImage": null,
   //     "specialization": "Cardiology",
   //     "qualifications": "MBBS",
   //     "experience": 5,
   //     "licenseNumber": "doctortwo",
   //     "isAvailable": true,
   //     "isActive": true,
   //     "userId": "e1abe04e-bb66-4704-a083-e68405d67318",
   //     "department": {
   //         "id": "af52df0f-4044-46be-af31-4fae996ef3ed",
   //         "name": "Cardiology"
   //     },
   //     "fees": [],
   //     "schedules": [],
   //     "reviews": [],
   //     "totalReviews": 0,
   //     "averageRating": 0,
   //     "completedAppointments": 0
   // }

   return (
      <div className="min-h-screen">
         {doctor && !loading && (
            <div className="py-18 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
               {/* Header Section */}
               <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Doctor Image */}
                  <div className="order-1 lg:order-2 flex-shrink-0">
                     <Image
                        src={doctor.profileImage || DEFAULT_DOCTOR_IMAGE}
                        alt={doctor.name}
                        width={300}
                        height={380}
                        className="rounded-lg shadow-lg object-cover"
                     />
                  </div>

                  {/* Doctor Info */}
                  <div className="order-2 lg:order-1 flex-1 space-y-4">
                     <h2 className="text-3xl font-bold text-gray-900">
                        {doctor.name}
                     </h2>
                     <h4 className="text-lg sm:text-xl text-slate-600 font-medium uppercase">
                        Consultant - {doctor.specialization}
                     </h4>

                     {/* Details Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                        <div>
                           <p className="text-gray-500 text-sm">Specialties</p>
                           <p className="text-base font-semibold">
                              {doctor.specialization}
                           </p>
                        </div>
                        <div>
                           <p className="text-gray-500 text-sm">
                              Qualification
                           </p>
                           <p className="text-base font-semibold leading-snug">
                              {doctor.qualifications}
                           </p>
                        </div>
                        <div>
                           <p className="text-gray-500 text-sm">Experience</p>
                           <p className="text-base font-semibold">
                              {doctor.experience} Years
                           </p>
                        </div>
                     </div>

                     {/* About Section */}
                     <div className="mt-6">
                        <h3 className="text-xl font-bold mb-3">About</h3>
                        <p className="text-gray-700 leading-relaxed">
                           Dr. Ahmed Farukh completed his MBBS from RMC and is a
                           bio-energetic medicine specialist. He has over 14
                           years of experience including working at Health
                           Complex, Mitford Hospital, and as a Resident Medical
                           Officer in hospitals under the Ministry of Health,
                           Saudi Arabia...
                        </p>
                     </div>
                  </div>
               </div>

               {/* Consultation Fees */}
               <ConsultationFees />

               {/* Appointment Slots */}
               <div className="mt-12">
                  <h3 className="text-xl font-bold mb-5">
                     Available Appointment Slots
                  </h3>
                  <div className="flex flex-col gap-6">
                     {TIME_SLOTS.map((item) => (
                        <div
                           key={item.date}
                           className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200"
                        >
                           {/* Date */}
                           <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                              <div className="text-center w-48 bg-gray-100 shadow rounded-md px-3 py-2">
                                 <p className="font-bold text-gray-800">
                                    {new Date(item.date).toLocaleDateString(
                                       "en-US",
                                       {
                                          weekday: "long",
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                       }
                                    )}
                                 </p>
                              </div>

                              {/* Slots */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-1">
                                 {item.slots.map((slot, i) => (
                                    <button
                                       key={i}
                                       className="cursor-pointer bg-white hover:bg-primary-500 hover:text-white transition rounded-md px-2 py-1 text-sm text-gray-700 shadow-sm border border-gray-200"
                                    >
                                       {slot}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Book Button */}
               <div className="mt-8 flex justify-center">
                  <Button className="px-6 py-3 text-lg rounded-md shadow-lg">
                     Book Appointment
                  </Button>
               </div>
            </div>
         )}
      </div>
   );
};

export default DoctorDetailsPage;

"use client";

import {
   Card,
   CardHeader,
   CardContent,
   CardFooter,
   CardTitle,
} from "@/components/ui/card";
import { AppointmentStatus, ConsultationType } from "@/types";
import {
   Calendar,
   Clock,
   Video,
   MessageSquareMore,
   PhoneCall,
   MoveRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Appointment {
   id: string;
   consultType: ConsultationType;
   startsAt: string;
   endsAt: string;
   status: AppointmentStatus;
   doctor: {
      id: string;
      name: string;
      profileImage: string;
   };
}

export default function AppointmentCard({ appt }: { appt: Appointment }) {
   const start = new Date(appt.startsAt);
   const end = new Date(appt.endsAt);

   const apptStatus = appt.status;
   const consultType = appt.consultType;

   const ConsultIcon =
      appt.consultType === "CHAT"
         ? MessageSquareMore
         : appt.consultType === "VOICE"
         ? PhoneCall
         : Video;

   const statusButtonStyle =
      apptStatus === "COMPLETED"
         ? "text-success bg-success-100 border-success"
         : apptStatus === "CONFIRMED"
         ? "text-primary bg-primary-100 border-primary"
         : apptStatus === "PENDING"
         ? "text-warning bg-warning-100 border-warning"
         : "text-error bg-error-100 border-error";

   return (
      <Card className="p-3 border-input max-w-md">
         <div className="flex items-center gap-5">
            {/* Doctor Image */}
            <Image
               src={appt.doctor.profileImage}
               alt={appt.doctor.name}
               className="w-28 h-28 object-cover rounded-xl border"
               height={112}
               width={112}
            />
            <div>
               <CardHeader className="p-0">
                  <CardTitle className="text-lg text-gray-700">
                     {appt.doctor.name}
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0 text-sm space-y-1">
                  <div className="flex items-center gap-3 my-2">
                     <div className="text-gray-600 flex items-center gap-1">
                        <ConsultIcon
                           className=""
                           size={20}
                        />
                        <h4 className="">
                           {consultType === "CHAT"
                              ? "Messaging"
                              : consultType === "VOICE"
                              ? "Audio Call"
                              : "Video Call"}
                        </h4>
                     </div>
                     <MoveRight size={16} />
                     <p
                        className={`px-3 py-1 rounded-2xl text-xs capitalize border ${statusButtonStyle}`}
                     >
                        {apptStatus === "CONFIRMED"
                           ? "Upcoming"
                           : apptStatus.toLowerCase()}
                     </p>
                     <p className="bg-primary-200 hover:bg-primary-300 px-3 py-1.5 rounded-full cursor-pointer">
                        <ConsultIcon
                           className="text-primary"
                           size={20}
                        />
                     </p>
                  </div>

                  <div className="flex flex-col gap-2">
                     <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={16} />{" "}
                        {start.toLocaleDateString("en-US", {
                           weekday: "short",
                           month: "short",
                           day: "numeric",
                           year: "numeric",
                        })}
                     </p>
                     <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {start.toLocaleTimeString("en-US", {
                           hour: "2-digit",
                           minute: "2-digit",
                        })}{" "}
                        –{" "}
                        {end.toLocaleTimeString("en-US", {
                           hour: "2-digit",
                           minute: "2-digit",
                        })}
                     </div>
                  </div>
               </CardContent>
            </div>
         </div>
         <CardFooter className="p-0 mt-4 items-center justify-between">
            {apptStatus === "COMPLETED" ? (
               <>
                  <Button size={"sm"}>Back Again</Button>
                  <Button
                     size={"sm"}
                     variant={"outline"}
                     className="bg-gray-50"
                  >
                     Leave Review
                  </Button>
               </>
            ) : apptStatus === "CANCELLED" ? (
               <>
                  <Button size={"sm"}>Re Appointment</Button>
               </>
            ) : (
               <>
                  <Button
                     size={"sm"}
                     variant={"outline"}
                     className="bg-gray-50"
                  >
                     Cancel Appointment
                  </Button>
                  <Button size={"sm"}>Reschedule</Button>
               </>
            )}
            <Button
               size={"sm"}
               variant={"outline"}
               className="text-primary hover:text-primary-foreground"
            >
               <ConsultIcon size={24} />
               {/* {consultType === "CHAT" ? "Mess..." : "Call"} */}
            </Button>
            <Link href={`/dashboard/`}>
               <Button size={"sm"}>Details</Button>
            </Link>
         </CardFooter>
      </Card>
   );
}

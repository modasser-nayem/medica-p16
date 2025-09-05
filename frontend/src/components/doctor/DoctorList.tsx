import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { DOCTOR_PROFILE_IMG, ROUTES } from "@/constant";
import { IDoctor } from "@/types";
import Image from "next/image";

interface DoctorsListProps {
   doctors: IDoctor[];
}

export default function DoctorsList({ doctors }: DoctorsListProps) {
   return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {doctors.map((doctor, index) => (
            <Card
               key={doctor.id}
               className="overflow-hidden shadow-md rounded-2xl"
            >
               {/* Big Image */}
               <Image
                  priority={true}
                  src={doctor.user.profileImage || DOCTOR_PROFILE_IMG}
                  alt={doctor.user.name}
                  className="w-full h-52"
                  width={250}
                  height={250}
               />

               <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold">
                     {doctor.user.name}
                  </CardTitle>
                  <p className="text-sm text-foreground/70">
                     Consultant -{" "}
                     {doctor.specialties ||
                        "Anesthesiology & Hyperbaric Physician"}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                     {doctor.qualification || "MBBS (CMC), DA"}
                  </p>
               </CardHeader>

               <CardContent className="space-y-2 text-center">
                  <p className="text-sm">
                     Experience: {doctor.experience || 5}+ years
                  </p>

                  <div className="flex justify-center items-center gap-1 text-sm">
                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                     <span>
                        {doctor.averageRating} ({doctor.totalReviews} reviews)
                     </span>
                  </div>
               </CardContent>

               <CardFooter>
                  <Link
                     className="w-full"
                     href={`${ROUTES.DOCTORS}/${doctor.id}`}
                  >
                     <Button
                        variant="outline"
                        className="w-full"
                     >
                        View Details
                     </Button>
                  </Link>
               </CardFooter>
            </Card>
         ))}
      </div>
   );
}

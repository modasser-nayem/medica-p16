import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constant";
import Link from "next/link";
import React from "react";

const page = () => {
   return (
      <div className="text-center py-20">
         <Link href={ROUTES.DOCTORS}>
            <Button>Select Doctors</Button>
         </Link>
      </div>
   );
};

export default page;

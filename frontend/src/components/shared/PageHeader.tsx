import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const PageHeader = ({
   title,
   description,
}: {
   title: string;
   description: string;
}) => {
   return (
      <section className="bg-gradient-to-br from-primary-50 to-indigo-100 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
               <Link
                  href="/"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
               >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
               </Link>
               <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                  {title}
               </h1>
               <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  {description}
               </p>
            </div>
         </div>
      </section>
   );
};

export default PageHeader;

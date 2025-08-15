import PublicFooter from "@/components/layout/PublicFooter";
import PublicHeader from "@/components/layout/PublicHeader";
import React from "react";

const doctorLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="min-h-screen">
         {/* Header */}
         <PublicHeader />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
         </div>
         {/* Footer */}
         <PublicFooter />
      </div>
   );
};

export default doctorLayout;

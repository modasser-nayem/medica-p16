import PublicFooter from "@/components/shared/Footer";
import PublicHeader from "@/components/shared/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <PublicHeader />
         {children}
         <PublicFooter />
      </div>
   );
};

export default layout;

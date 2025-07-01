"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/provider/AuthProvider";
import { Toaster } from "react-hot-toast";

interface MainLayoutProps {
   children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
   return (
      <AuthProvider>
         {children}
         <Toaster
            position="top-right"
            toastOptions={{
               duration: 4000,
               style: {
                  background: "#363636",
                  color: "#fff",
               },
               success: {
                  duration: 3000,
                  iconTheme: {
                     primary: "#10B981",
                     secondary: "#fff",
                  },
               },
               error: {
                  duration: 5000,
                  iconTheme: {
                     primary: "#EF4444",
                     secondary: "#fff",
                  },
               },
            }}
         />
      </AuthProvider>
   );
};

export default MainLayout;

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { Bell, PanelLeft } from "lucide-react";
import PublicFooter from "@/components/shared/Footer";
import ProfileSetting from "@/components/profile/ProfileSetting";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <SidebarProvider className="bg-primary">
         <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
               {/* Header */}
               <header className="sticky top-0 z-20 flex items-center justify-between bg-primary text-primary-foreground/85 px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-4">
                     <SidebarTrigger>
                        <PanelLeft size={20} />
                     </SidebarTrigger>
                     <h1 className="text-xl font-semibold">Dashboard</h1>
                  </div>

                  {/* Right corner actions (notifications, profile, etc.) */}
                  <div className="flex items-center gap-4">
                     <Bell size={20} />

                     {/* Example placeholders for future */}
                     <ProfileSetting />
                  </div>
               </header>

               {/* Page content */}
               <div className="flex-1 overflow-y-auto">
                  <div className="max-w-7xl mx-auto px-6 py-6 min-h-svh">
                     {children}
                  </div>
                  <div className="pt-16">
                     <PublicFooter />
                  </div>
               </div>

               {/* Footer */}
            </main>
         </div>
      </SidebarProvider>
   );
};

export default DashboardLayout;

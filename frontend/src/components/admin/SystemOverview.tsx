"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3 } from "lucide-react";

const SystemOverview: React.FC = () => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                           New user registration
                        </span>
                     </div>
                     <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                           Appointment completed
                        </span>
                     </div>
                     <span className="text-xs text-gray-500">5 min ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                           Payment received
                        </span>
                     </div>
                     <span className="text-xs text-gray-500">10 min ago</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  System Stats
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-600">
                        Database Size
                     </span>
                     <span className="text-sm font-medium text-gray-900">
                        2.4 GB
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-600">
                        Active Sessions
                     </span>
                     <span className="text-sm font-medium text-gray-900">
                        24
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-600">System Load</span>
                     <span className="text-sm font-medium text-gray-900">
                        45%
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-600">Uptime</span>
                     <span className="text-sm font-medium text-gray-900">
                        99.9%
                     </span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default SystemOverview;

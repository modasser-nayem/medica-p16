import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import React from "react";

export interface IStatCardProps {
   title: string;
   value: number;
   component?: React.ReactNode;
   icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
   >;
   color: string;
   bgColor: string;
}

const StatsCard: React.FC<{ stat: IStatCardProps }> = ({ stat }) => {
   const IconComponent = stat.icon;
   return (
      <Card className="border-2 border-gray-300 hover:shadow-md transition-shadow">
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
               {stat.title}
            </CardTitle>
            <div
               className={`h-8 w-8 ${stat.bgColor} rounded-full flex items-center justify-center`}
            >
               <IconComponent className={`h-4 w-4 ${stat.color}`} />
            </div>
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold text-gray-900">
               {stat.component ? stat.component : stat.value}
            </div>
         </CardContent>
      </Card>
   );
};

export default StatsCard;

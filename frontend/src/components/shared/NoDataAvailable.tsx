"use client";

import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";

interface NoDataAvailableProps {
   title?: string;
   description?: string;
   actionLabel?: string;
   onAction?: () => void;
   children?: React.ReactNode;
}

const NoDataAvailable: React.FC<NoDataAvailableProps> = ({
   title = "No Data Available",
   description = "We couldn't find any data to show here.",
   actionLabel,
   onAction,
   children,
}) => {
   return (
      <Card className="flex flex-col items-center justify-center p-10 text-center border border-dashed rounded-2xl shadow-sm">
         <FileSearch className="w-12 h-12 text-gray-400 mb-4" />
         <h3 className="text-lg font-semibold">{title}</h3>
         <p className="text-sm text-gray-500 mt-1">{description}</p>

         {actionLabel && onAction && (
            <Button
               onClick={onAction}
               className="mt-4"
            >
               {actionLabel}
            </Button>
         )}
         {children && <div className="mt-4">{children}</div>}
      </Card>
   );
};

export default NoDataAvailable;

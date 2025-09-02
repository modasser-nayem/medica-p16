"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ErrorStateProps {
   title?: string;
   description?: string;
   onRetry?: () => void;
   isLoading: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
   title = "Something went wrong",
   description = "We couldn’t fetch the data. Please try again.",
   onRetry,
   isLoading = false,
}) => {
   return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
         <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
         <h3 className="text-lg font-semibold">{title}</h3>
         <p className="text-sm text-gray-500 mt-1">{description}</p>

         {onRetry && (
            <Button
               variant="default"
               onClick={onRetry}
               className="mt-4"
               disabled={isLoading}
            >
               {isLoading && <LoadingSpinner />}
               Retry
            </Button>
         )}
      </div>
   );
};

export default ErrorState;

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface DepartmentFiltersProps {
   searchTerm: string;
   statusFilter: "yes" | "no" | "";
   onSearchChange: (value: string) => void;
   onStatusFilterChange: (value: "yes" | "no" | "") => void;
   onClearFilters: () => void;
}

const DepartmentFilters: React.FC<DepartmentFiltersProps> = ({
   searchTerm,
   statusFilter,
   onSearchChange,
   onStatusFilterChange,
   onClearFilters,
}) => {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center">
               <Filter className="h-5 w-5 mr-2" />
               Filters
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                     placeholder="Search departments..."
                     value={searchTerm}
                     onChange={(e) => onSearchChange(e.target.value)}
                     className="pl-10"
                  />
               </div>

               <select
                  value={statusFilter}
                  onChange={(e) =>
                     onStatusFilterChange(e.target.value as "yes" | "no" | "")
                  }
                  className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
               >
                  <option value="">All Status</option>
                  <option value="yes">Active</option>
                  <option value="no">Inactive</option>
               </select>

               <Button
                  variant="outline"
                  onClick={onClearFilters}
               >
                  Clear Filters
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default DepartmentFilters;

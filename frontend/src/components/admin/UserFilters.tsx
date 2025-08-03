"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Filter, Search } from "lucide-react";

interface UserFiltersProps {
   searchTerm: string;
   roleFilter: string;
   isActiveFilter: string;
   onSearchChange: (value: string) => void;
   onRoleFilterChange: (value: string) => void;
   isActiveFilterChange: (value: string) => void;
   onClearFilters: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
   searchTerm,
   roleFilter,
   isActiveFilter,
   onSearchChange,
   onRoleFilterChange,
   isActiveFilterChange,
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                     placeholder="Search users..."
                     value={searchTerm}
                     onChange={(e) => onSearchChange(e.target.value)}
                     className="pl-10"
                  />
               </div>

               <select
                  value={roleFilter}
                  onChange={(e) => onRoleFilterChange(e.target.value)}
                  className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
               >
                  <option value="">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="PATIENT">Patient</option>
               </select>

               <select
                  value={isActiveFilter}
                  onChange={(e) => isActiveFilterChange(e.target.value)}
                  className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
               >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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

export default UserFilters;

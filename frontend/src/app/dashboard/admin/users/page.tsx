"use client";

import UserFilters from "@/components/admin/UserFilters";
import UsersTable from "@/components/admin/UsersTable";
import { useApi } from "@/hooks/useApi";
import { userService } from "@/services";
import { IFilterUsers, User } from "@/types";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [roleFilter, setRoleFilter] = useState("");
   const [isActive, setIsActive] = useState("");

   const { execute, data, loading, pagination } = useApi(
      userService.getAllUSers,
      { showErrorToast: true, errorMessage: "Failed to load users" }
   );

   const request = async (filters: IFilterUsers) => {
      const response = await execute(filters);

      if (response !== null) {
         setUsers(response);
      }
   };

   useEffect(() => {
      const filters: IFilterUsers = {
         search: searchTerm,
         role: roleFilter,
      };

      if (isActive) {
         filters.isActive = isActive === "active" ? true : false;
      }

      request(filters);
   }, [roleFilter, searchTerm, isActive]);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading users data...</p>
            </div>
         </div>
      );
   }

   const handleClearFilters = () => {
      setSearchTerm("");
      setRoleFilter("");
      setIsActive("");
   };

   return (
      <div>
         <UserFilters
            searchTerm={searchTerm}
            roleFilter={roleFilter}
            isActiveFilter={isActive}
            onSearchChange={setSearchTerm}
            onRoleFilterChange={setRoleFilter}
            isActiveFilterChange={setIsActive}
            onClearFilters={handleClearFilters}
         />

         <UsersTable users={users || []} />
      </div>
   );
};

export default UsersPage;

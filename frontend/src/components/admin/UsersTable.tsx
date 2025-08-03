"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import { User } from "../../types";
import { Users, Settings, Shield } from "lucide-react";

interface UsersTableProps {
   users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
   const getRoleColor = (role: string) => {
      switch (role) {
         case "ADMIN":
            return "bg-red-100 text-red-800";
         case "DOCTOR":
            return "bg-blue-100 text-blue-800";
         case "PATIENT":
            return "bg-gray-100 text-gray-800";
      }
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case "active":
            return "bg-green-100 text-green-800";
         case "inactive":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                           User
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                           Role
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                           Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                           CreatedAt
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user) => (
                        <tr
                           key={user.id}
                           className="border-b border-gray-100 hover:bg-gray-50"
                        >
                           <td className="py-3 px-4">
                              <div className="flex items-center">
                                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Users className="h-5 w-5 text-gray-600" />
                                 </div>
                                 <div className="ml-3">
                                    <div className="font-medium text-gray-900">
                                       {user.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       {user.email}
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="py-3 px-4">
                              <span
                                 className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                                    user.role
                                 )}`}
                              >
                                 {user.role}
                              </span>
                           </td>
                           <td className="py-3 px-4">
                              <span
                                 className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    user.isActive ? "Active" : "Inactive"
                                 )}`}
                              >
                                 {user.isActive ? "Active" : "Inactive"}
                              </span>
                           </td>
                           <td className="py-3 px-4">
                              <div className="text-sm text-gray-900">
                                 {user.createdAt}
                              </div>
                           </td>
                           <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                 <Button
                                    size="sm"
                                    variant="outline"
                                 >
                                    <Settings className="h-4 w-4 mr-1" />
                                    Edit
                                 </Button>
                                 <Button
                                    size="sm"
                                    variant="outline"
                                 >
                                    <Shield className="h-4 w-4 mr-1" />
                                    Permissions
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {users.length === 0 && (
               <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                     No users found
                  </h3>
                  <p className="text-gray-600">No users have been added yet.</p>
               </div>
            )}
         </CardContent>
      </Card>
   );
};

export default UsersTable;

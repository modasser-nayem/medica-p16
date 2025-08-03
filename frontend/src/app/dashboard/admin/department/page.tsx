"use client";

import React, { useEffect, useState } from "react";
import DepartmentFilters from "@/components/admin/DepartmentFilters";
import DepartmentsTable from "@/components/admin/DepartmentsTable";
import DepartmentModal from "@/components/admin/DepartmentModal";
import { useApi } from "@/hooks/useApi";
import { departmentService } from "@/services";
import { IDepartment, ICreateDepartment, IUpdateDepartment, IGetDepartmentsFilter } from "@/types";

const DepartmentsPage = () => {
   const [departments, setDepartments] = useState<IDepartment[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<"yes" | "no" | "">("");
   const [showModal, setShowModal] = useState(false);
   const [editingDepartment, setEditingDepartment] = useState<IDepartment | null>(null);

   // API hooks for different operations
   const { execute: fetchDepartments, loading: fetchLoading } = useApi(
      departmentService.getDepartments,
      { showErrorToast: true, errorMessage: "Failed to load departments" }
   );

   const { execute: createDepartment, loading: createLoading } = useApi(
      departmentService.createDepartment,
      { 
         showSuccessToast: true, 
         successMessage: "Department created successfully",
         showErrorToast: true, 
         errorMessage: "Failed to create department" 
      }
   );

   const { execute: updateDepartment, loading: updateLoading } = useApi(
      departmentService.updateDepartment,
      { 
         showSuccessToast: true, 
         successMessage: "Department updated successfully",
         showErrorToast: true, 
         errorMessage: "Failed to update department" 
      }
   );

   const { execute: deleteDepartment, loading: deleteLoading } = useApi(
      departmentService.deleteDepartment,
      { 
         showSuccessToast: true, 
         successMessage: "Department deleted successfully",
         showErrorToast: true, 
         errorMessage: "Failed to delete department" 
      }
   );

   const loadDepartments = async () => {
      const filters: IGetDepartmentsFilter = {
         search: searchTerm || undefined,
         active: statusFilter || undefined,
         sortBy: "name",
         sortOrder: "asc",
      };

      const response = await fetchDepartments(filters);
      if (response !== null) {
         setDepartments(response);
      }
   };

   useEffect(() => {
      loadDepartments();
   }, [searchTerm, statusFilter]);

   const handleCreateDepartment = async (data: ICreateDepartment) => {
      const response = await createDepartment(data);
      if (response !== null) {
         setShowModal(false);
         loadDepartments();
      }
   };

   const handleUpdateDepartment = async (data: IUpdateDepartment) => {
      if (!editingDepartment) return;
      
      const response = await updateDepartment(editingDepartment.id, data);
      if (response !== null) {
         setShowModal(false);
         setEditingDepartment(null);
         loadDepartments();
      }
   };

   const handleDeleteDepartment = async (departmentId: string) => {
      const confirmed = window.confirm(
         "Are you sure you want to delete this department? This action cannot be undone."
      );
      
      if (!confirmed) return;

      const response = await deleteDepartment(departmentId);
      if (response !== null) {
         loadDepartments();
      }
   };

   const handleEditDepartment = (department: IDepartment) => {
      setEditingDepartment(department);
      setShowModal(true);
   };

   const handleAddDepartment = () => {
      setEditingDepartment(null);
      setShowModal(true);
   };

   const handleCloseModal = () => {
      setShowModal(false);
      setEditingDepartment(null);
   };

   const handleClearFilters = () => {
      setSearchTerm("");
      setStatusFilter("" as "yes" | "no" | "");
   };

   const handleModalSubmit = (data: ICreateDepartment | IUpdateDepartment) => {
      if (editingDepartment) {
         handleUpdateDepartment(data as IUpdateDepartment);
      } else {
         handleCreateDepartment(data as ICreateDepartment);
      }
   };

   if (fetchLoading && departments.length === 0) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading departments...</p>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
               <p className="text-gray-600 mt-1">
                  Manage hospital departments and their configurations
               </p>
            </div>
         </div>

         <DepartmentFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            onClearFilters={handleClearFilters}
         />

         <DepartmentsTable
            departments={departments}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            onAdd={handleAddDepartment}
         />

         <DepartmentModal
            isOpen={showModal}
            onClose={handleCloseModal}
            onSubmit={handleModalSubmit}
            department={editingDepartment}
            loading={createLoading || updateLoading}
         />
      </div>
   );
};

export default DepartmentsPage;

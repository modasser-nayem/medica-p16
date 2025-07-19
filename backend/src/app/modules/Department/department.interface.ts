export type TCreateDepartment = {
  name: string;
  description?: string;
};

export type TUpdateDepartment = {
  id: string;
  data: Partial<TCreateDepartment> & { isActive?: boolean };
};

export type TGetDepartmentsFilter = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: string;
};

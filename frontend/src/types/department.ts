export interface IDepartment {
   id: string;
   name: string;
   description: string | null;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
}

export interface ICreateDepartment {
   name: string;
   description?: string;
}

export interface IUpdateDepartment {
   name?: string;
   description?: string | null;
   isActive?: boolean;
}

export interface IGetDepartmentsFilter {
   page?: number;
   limit?: number;
   search?: string;
   active?: "yes" | "no";
   sortBy?: string;
   sortOrder?: "asc" | "desc";
}

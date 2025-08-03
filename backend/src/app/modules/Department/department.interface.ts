import { PaginationQuery } from "../../types/pagination";

export type TCreateDepartment = {
  name: string;
  description?: string;
};

export type TUpdateDepartment = {
  id: string;
  data: Partial<TCreateDepartment> & { isActive?: boolean };
};

export interface TGetDepartmentsFilter extends PaginationQuery {
  search?: string;
  active?: "yes" | "no";
}

import { departmentValidation } from "@/validation/department";
import z from "zod";

export interface IDepartment {
   id: string;
   name: string;
   icon: string;
   description: string | null;
   isDeleted: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export type ICreateDepartment = z.infer<
   typeof departmentValidation.createDepartment
>;

export type IUpdateDepartment = z.infer<
   typeof departmentValidation.updateDepartment
>;

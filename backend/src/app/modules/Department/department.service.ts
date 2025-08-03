import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import {
  TCreateDepartment,
  TGetDepartmentsFilter,
  TUpdateDepartment,
} from "./department.interface";
import { paginate } from "../../utils/pagination";

const createDepartment = async (data: TCreateDepartment) => {
  // if department name already exists
  const existingDepartment = await prisma.department.findFirst({
    where: { name: { equals: data.name, mode: "insensitive" } },
  });

  if (existingDepartment) {
    throw new AppError(400, "Department name already exists");
  }

  const result = await prisma.department.create({
    data,
  });

  return result;
};

const getAllDepartments = async (filters: TGetDepartmentsFilter) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    active,
    search,
  } = filters;

  const where: Prisma.DepartmentWhereInput = {};

  if (active) {
    if (active === "yes" || active === "no") {
      where.isActive = active === "yes" ? true : false;
    }
  }

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const result = await paginate({
    model: prisma.department,
    page,
    limit,
    where,
    sortBy,
    sortOrder,
  });

  return result;
};

const getDepartmentById = async (id: string) => {
  const result = await prisma.department.findUnique({ where: { id } });

  if (!result) {
    throw new AppError(404, "Department not found");
  }

  return result;
};

const updateDepartment = async (payload: TUpdateDepartment) => {
  const exist = await prisma.department.findUnique({
    where: { id: payload.id },
  });

  if (!exist) {
    throw new AppError(404, "Department not found");
  }

  const result = await prisma.department.update({
    where: { id: payload.id },
    data: payload.data,
  });

  return result;
};

const deleteDepartment = async (id: string) => {
  const exist = await prisma.department.findUnique({
    where: { id },
  });

  if (!exist) {
    throw new AppError(404, "Department not found");
  }

  const result = await prisma.department.update({
    where: { id },
    data: { isActive: false },
  });

  return result;
};

export const departmentService = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};

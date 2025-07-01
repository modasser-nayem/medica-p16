import prisma from "../connector";
import { paginate } from "../../utils/pagination";
import { Prisma, User } from "@prisma/client";

const getAllUsers = async () => {
  const select: Prisma.UserSelect = {
    id: true,
    email: true,
    name: true,
  };

  const result = await paginate<User[]>({
    model: prisma.user,
    select,
    sortBy: "name",
  });

  return result;
};

export const userRepository = {
  getAllUsers,
};

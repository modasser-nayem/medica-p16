import { userRepository } from "../../db/repositories/user.repository";

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const userService = {
  getAllUsers,
};

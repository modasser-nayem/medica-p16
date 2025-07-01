import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUsers = async (_req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all users",
    data: result.data,
    meta: result.meta,
  });
};

export const userController = {
  getAllUsers,
};

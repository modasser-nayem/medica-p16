import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

// Get user profile
const getUserProfile = async (req: Request, res: Response) => {
  const result = await userService.getUserProfile(req.user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
};

// Update user general profile

// Update Patient Profile
const updatePatientProfile = async (req: Request, res: Response) => {
  const result = await userService.updatePatientProfile({
    userId: req.user.userId,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient profile successfully updated",
    data: result,
  });
};

// Update Doctor Profile
const updateDoctorProfile = async (req: Request, res: Response) => {
  const result = await userService.updateDoctorProfile({
    userId: req.user.userId,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor profile successfully updated",
    data: result,
  });
};

// Update Admin Profile
const updateAdminProfile = async (req: Request, res: Response) => {
  const result = await userService.updateAdminProfile({
    userId: req.user.userId,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin profile successfully updated",
    data: result,
  });
};

// Get Users
const getUsers = async (req: Request, res: Response) => {
  const result = await userService.getUsers(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved users",
    data: result.data,
    pagination: result.pagination,
  });
};

// Get Users
const getDoctors = async (req: Request, res: Response) => {
  const result = await userService.getDoctors(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved doctors",
    data: result.data,
    pagination: result.pagination,
  });
};

// Get Doctor By ID
const getDoctorById = async (req: Request, res: Response) => {
  const result = await userService.getDoctorById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved doctor",
    data: result,
  });
};

// Update User Status
const updateUserStatus = async (req: Request, res: Response) => {
  const result = await userService.updateUserStatus(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Status Successfully Updated",
    data: result,
  });
};

// Delete User
const deleteUser = async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Account Successfully Deleted",
    data: result,
  });
};

// Get User Stats
const getUserStats = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await userService.getUserStats(req.query as any);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved user stats",
    data: result,
  });
};

// Get User Activity
const getUserActivity = async (req: Request, res: Response) => {
  const result = await userService.getUserActivity(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved user activity",
    data: result.data,
    pagination: result.pagination,
  });
};

// Get User Dashboard,
const getUserDashboard = async (req: Request, res: Response) => {
  const result = await userService.getUserDashboard(req.user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved user dashboard",
    data: result,
  });
};

export const userController = {
  getUserProfile,
  updatePatientProfile,
  updateDoctorProfile,
  updateAdminProfile,
  getUsers,
  getDoctors,
  getDoctorById,
  updateUserStatus,
  deleteUser,
  getUserStats,
  getUserActivity,
  getUserDashboard,
};

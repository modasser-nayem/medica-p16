import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { analyticsService } from "./analytics.service";

// Get Admin Stats
const getAdminStats = async (req: Request, res: Response) => {
  const result = await analyticsService.getAdminStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Admin Stats",
    data: result,
  });
};

// Get Doctor Stats
const getDoctorStats = async (req: Request, res: Response) => {
  const result = await analyticsService.getDoctorStats(req.user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Doctor Stats",
    data: result,
  });
};

// Get Patient Stats
const getPatientStats = async (req: Request, res: Response) => {
  const result = await analyticsService.getPatientStats(req.user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Patient Stats",
    data: result,
  });
};

// Get Public Stats
const getPublicStats = async (req: Request, res: Response) => {
  const result = await analyticsService.getPublicStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved Public Stats",
    data: result,
  });
};

// Get User Activity
const getUserActivity = async (req: Request, res: Response) => {
  const result = await analyticsService.getUserActivity(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Retrieved User Activity",
    data: result,
  });
};

export const analyticsController = {
  getAdminStats,
  getDoctorStats,
  getPatientStats,
  getPublicStats,
  getUserActivity,
};

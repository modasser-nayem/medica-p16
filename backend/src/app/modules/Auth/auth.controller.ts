import config from "../../config";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerPatient = asyncHandler(async (req, res, next) => {
  const result = await authService.registerPatient(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

const registerDoctor = asyncHandler(async (req, res, next) => {
  const result = await authService.registerDoctor(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor registered successfully",
    data: result,
  });
});

const registerAdmin = asyncHandler(async (req, res, next) => {
  const result = await authService.registerAdmin(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin registered successfully",
    data: result,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const userAgent = req.get("User-Agent") || "";
  const ipAddress = req.ip || req.socket.remoteAddress || "";

  const result = await authService.loginUser({
    data: req.body,
    userAgent,
    ipAddress,
  });

  res.cookie("refreshToken", result.refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 15,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: { user: result.user, accessToken: result.accessToken },
  });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const result = await authService.refreshToken({ token: refreshToken });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const result = await authService.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset link has been sent in you email address.",
    data: result,
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const result = await authService.resetPassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

const changePassword = asyncHandler(async (req, res, next) => {
  const result = await authService.changePassword({
    userId: req.user.userId,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const authController = {
  registerPatient,
  registerDoctor,
  registerAdmin,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};

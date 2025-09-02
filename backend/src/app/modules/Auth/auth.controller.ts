import { asyncHandler } from "../../utils/asyncHandler";
import { clearCookie, COOKIE_NAME, setCookie } from "../../utils/cookie";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerUser = asyncHandler(async (req, res, next) => {
  const result = await authService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account Successfully Created",
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

  setCookie({
    res,
    cookieName: COOKIE_NAME.ACCESS_TOKEN,
    token: result.accessToken,
    maxAge: 3,
  });

  setCookie({
    res,
    cookieName: COOKIE_NAME.REFRESH_TOKEN,
    token: result.refreshToken,
    maxAge: 7,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: result.user,
  });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  clearCookie({ res, cookieName: COOKIE_NAME.ACCESS_TOKEN });
  clearCookie({ res, cookieName: COOKIE_NAME.REFRESH_TOKEN });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Logout",
    data: null,
  });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const result = await authService.refreshToken({ token: refreshToken });

  setCookie({
    res,
    cookieName: COOKIE_NAME.ACCESS_TOKEN,
    token: result.accessToken,
    maxAge: 3,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token successfully refreshed",
    data: result.user,
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

const getAuthUser = asyncHandler(async (req, res, next) => {
  const result = await authService.getAuthUser({
    userId: req.user.userId,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Get Information",
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getAuthUser,
};

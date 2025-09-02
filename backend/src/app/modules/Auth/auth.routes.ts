import express from "express";
import requestValidate from "../../middlewares/requestValidation";
import { authSchemaValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import { authorize } from "../../middlewares/authorize";

const router = express.Router();

// Register User
router.post(
  "/register",
  requestValidate(authSchemaValidation.userRegistration),
  authController.registerUser,
);

// Logged In User
router.post(
  "/login",
  requestValidate(authSchemaValidation.loginUser),
  authController.loginUser,
);

// Logged Out User
router.post("/logout", authorize(), authController.logoutUser);

// Refresh token
router.post("/refresh", authorize(), authController.refreshToken);

// Forgot Password
router.post(
  "/forgot-password",
  requestValidate(authSchemaValidation.forgotPassword),
  authController.forgotPassword,
);

// Reset Password
router.put(
  "/reset-password",
  requestValidate(authSchemaValidation.resetPassword),
  authController.resetPassword,
);

// Change Password
router.put(
  "/change-password",
  authorize(),
  requestValidate(authSchemaValidation.changePassword),
  authController.changePassword,
);

// Auth user
router.get("/me", authorize(), authController.getAuthUser);

export const authRoutes = router;

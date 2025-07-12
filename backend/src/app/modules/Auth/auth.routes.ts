import express from "express";
import requestValidate from "../../middlewares/requestValidation";
import { authSchemaValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import { authorize } from "../../middlewares/authorize";

const router = express.Router();

// Register Users
router.post(
  "/register/patient",
  requestValidate(authSchemaValidation.patientRegister),
  authController.registerPatient,
);

router.post(
  "/register/doctor",
  requestValidate(authSchemaValidation.doctorRegister),
  authController.registerDoctor,
);

router.post(
  "/register/admin",
  requestValidate(authSchemaValidation.adminRegister),
  authController.registerAdmin,
);

// Logged In User
router.post(
  "/login",
  requestValidate(authSchemaValidation.loginUser),
  authController.loginUser,
);

// Refresh token
router.post("/refresh-token", authorize(), authController.refreshToken);

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

export const authRoutes = router;

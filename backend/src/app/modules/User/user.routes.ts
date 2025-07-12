import { Router } from "express";
import { userController } from "./user.controller";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { userSchemaValidation } from "./user.validation";

const router = Router();

// Get user profile
router.get("/profile", authorize(), userController.getUserProfile);

// Update Patient Profile
router.patch(
  "/profile/patient",
  authorize("PATIENT"),
  requestValidate(userSchemaValidation.updatePatientProfile),
  userController.updatePatientProfile,
);

// Update Doctor Profile
router.patch(
  "/profile/doctor",
  authorize("DOCTOR"),
  requestValidate(userSchemaValidation.updateDoctorProfile),
  userController.updateDoctorProfile,
);

// Update Admin Profile
router.patch(
  "/profile/admin",
  authorize("ADMIN"),
  requestValidate(userSchemaValidation.updateAdminProfile),
  userController.updateAdminProfile,
);

// Get Users
router.get(
  "/",
  authorize("ADMIN"),
  requestValidate(userSchemaValidation.getUsersQuerySchema),
  userController.getUsers,
);

// Get Doctors
router.get(
  "/doctors",
  requestValidate(userSchemaValidation.getDoctorsQuery),
  userController.getDoctors,
);

// Get Doctor Details
router.get(
  "/doctors/:id",
  requestValidate(userSchemaValidation.getDoctorParams),
  userController.getDoctorById,
);

// Update User Status
router.patch(
  "/status/:id",
  authorize("ADMIN"),
  userController.updateUserStatus,
);

// Delete User
router.delete("/:id", authorize("ADMIN"), userController.deleteUser);

// Get User Stats
router.get("/stats", authorize(), userController.getUserStats);

// Get User Activity
router.get("/activity", authorize(), userController.getUserActivity);

// Get User Dashboard,
router.get("/dashboard", authorize(), userController.getUserDashboard);

export const userRoutes = router;

import { Router } from "express";
import { userController } from "./user.controller";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { userSchemaValidation } from "./user.validation";

const router = Router();

// ========================================
//                User Routes
// ========================================

// Get user profile
router.get("/users/profile", authorize(), userController.getUserProfile);

// Update Patient Profile
router.patch(
  "/users/profile/patient",
  authorize("PATIENT"),
  requestValidate(userSchemaValidation.updatePatientProfile),
  userController.updatePatientProfile,
);

// Update Doctor Profile
router.patch(
  "/users/profile/doctor",
  authorize("DOCTOR"),
  requestValidate(userSchemaValidation.updateDoctorProfile),
  userController.updateDoctorProfile,
);

// Update Admin Profile
router.patch(
  "/users/profile/admin",
  authorize("ADMIN"),
  requestValidate(userSchemaValidation.updateAdminProfile),
  userController.updateAdminProfile,
);

// Get Doctors
router.get("/users/doctors", userController.getDoctors);

// Get Doctor Details
router.get("/users/doctors/:id", userController.getDoctorDetails);

// Get Users For admin
router.get("/users", authorize("ADMIN"), userController.getUsers);

// Update User Status
router.patch(
  "/users/status/:id",
  authorize("ADMIN"),
  userController.updateUserStatus,
);

// Delete User
router.delete("/users/:id", authorize("ADMIN"), userController.deleteUser);

export const userRoutes = router;

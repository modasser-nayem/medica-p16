import { Router } from "express";
import { userController } from "./user.controller";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { userSchemaValidation } from "./user.validation";

const router = Router();

// Get user profile
router.get("/profile", authorize(), userController.getUserProfile);

// Update User Information
router.put(
  "/user-profile",
  authorize(),
  requestValidate(userSchemaValidation.updateUserProfile),
  userController.updateUserInformation,
);

// Update Patient Profile
router.put(
  "/patient-profile",
  authorize("PATIENT"),
  requestValidate(userSchemaValidation.updatePatientProfile),
  userController.updatePatientProfile,
);

// Update Doctor Profile
router.put(
  "/doctor-profile",
  authorize("DOCTOR"),
  requestValidate(userSchemaValidation.updateDoctorProfile),
  userController.updateDoctorProfile,
);

// Get Users
router.get("/", authorize("ADMIN"), userController.getUsers);

// Update User Status
router.patch(
  "/status/:id",
  authorize("ADMIN"),
  userController.updateUserStatus,
);

// Delete User
router.delete("/:id", authorize("ADMIN"), userController.deleteUser);

export const userRoutes = router;

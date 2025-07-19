import express from "express";
import requestValidate from "../../middlewares/requestValidation";
import { doctorSchemaValidation } from "./doctor.validation";
import { doctorController } from "./doctor.controller";
import { authorize } from "../../middlewares/authorize";

const router = express.Router();

// Create schedule for a doctor
router.post(
  "/:doctorId/schedules",
  authorize("DOCTOR"),
  requestValidate(doctorSchemaValidation.createSchedule),
  doctorController.createSchedule,
);

// Get schedules
router.get("/:doctorId/schedules", doctorController.getSchedules);

// Update schedule
router.put(
  "/:doctorId/schedules/:id",
  authorize("DOCTOR"),
  requestValidate(doctorSchemaValidation.updateSchedule),
  doctorController.updateSchedule,
);

// Delete schedule
router.delete(
  "/:doctorId/schedules/:id",
  authorize("DOCTOR"),
  doctorController.deleteSchedule,
);

export const doctorRoutes = router;

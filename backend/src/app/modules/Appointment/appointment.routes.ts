import express from "express";
import requestValidate from "../../middlewares/requestValidation";
import { appointmentSchemaValidation } from "./appointment.validation";
import { appointmentController } from "./appointment.controller";
import { authorize } from "../../middlewares/authorize";

const router = express.Router();

// Create appointment
router.post(
  "/",
  authorize(),
  requestValidate(appointmentSchemaValidation.createAppointment),
  appointmentController.createAppointment,
);

// Get appointments
router.get("/", appointmentController.getAppointments);

// Get appointment by id
router.get("/:id", appointmentController.testController);

// Reschedule appointment
router.put(
  "/:id",
  authorize(),
  requestValidate(appointmentSchemaValidation.rescheduleAppointment),
  appointmentController.rescheduleAppointment,
);

// Cancel appointment
router.patch("/:id", authorize(), appointmentController.cancelAppointment);

// Delete appointment
router.delete("/:id", authorize(), appointmentController.deleteAppointment);

// Availability and scheduling
router.get("/available-slots", appointmentController.testController);

// Statistics
router.get("/stats/overview", appointmentController.testController);

export const appointmentRoutes = router;

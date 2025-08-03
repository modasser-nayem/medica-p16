import express from "express";
import requestValidate from "../../middlewares/requestValidation";
import { appointmentSchemaValidation } from "./appointment.validation";
import { appointmentController } from "./appointment.controller";
import { authorize } from "../../middlewares/authorize";

const router = express.Router();

// Create appointment
router.post(
  "/appointments",
  authorize(),
  requestValidate(appointmentSchemaValidation.createAppointment),
  appointmentController.createAppointment,
);

// Get appointments
router.get("/appointments", authorize(), appointmentController.getAppointments);

// Get appointment details
router.get(
  "/appointments/:id",
  authorize("PATIENT", "DOCTOR"),
  appointmentController.getAppointmentDetails,
);

// Reschedule appointment
router.put(
  "/appointments/:id",
  authorize(),
  requestValidate(appointmentSchemaValidation.rescheduleAppointment),
  appointmentController.rescheduleAppointment,
);

// Cancel appointment
router.patch(
  "/appointments/:id",
  authorize(),
  appointmentController.cancelAppointment,
);

// Delete appointment
router.delete(
  "/appointments/:id",
  authorize(),
  appointmentController.deleteAppointment,
);

// Doctor Available slots
router.get(
  "/doctor/available-slots",
  requestValidate(appointmentSchemaValidation.doctorAvailableSlots),
  appointmentController.getDoctorAvailableSlots,
);

export const appointmentRoutes = router;

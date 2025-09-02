import express from "express";
import { doctorController } from "./doctor.controller";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { doctorSchemaValidation } from "./doctor.validation";

const router = express.Router();

// Get Doctors
router.get("/", doctorController.getDoctors);

// Get Doctor Details
router.get("/:id", doctorController.getDoctorDetails);

// Get Doctor slots
router.get("/:id/slots", doctorController.getDoctorSlots);

// Create consultation fees
router.post(
  "/fees",
  authorize("DOCTOR"),
  requestValidate(doctorSchemaValidation.createOrUpdateConsultationFees),
  doctorController.createOrUpdateConsultationFees,
);

// Get consultation fees
router.get("/:doctorId/fees", doctorController.getConsultationFees);

// Active or inactive consultation fees
router.patch(
  "/fees/:id",
  authorize("DOCTOR"),
  doctorController.updateFeesActivation,
);

export const doctorRoutes = router;

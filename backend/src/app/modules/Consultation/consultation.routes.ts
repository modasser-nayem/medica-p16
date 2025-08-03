import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { consultationSchemaValidation } from "./consultation.validation";
import { consultationController } from "./consultation.controller";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// Create consultation fees
router.post(
  "/fees",
  authorize("DOCTOR"),
  requestValidate(consultationSchemaValidation.createOrUpdateConsultationFees),
  consultationController.createOrUpdateConsultationFees,
);

// Get consultation fees
router.get("/fees/:doctorId", consultationController.getConsultationFees);

// Delete consultation fees
router.delete(
  "/fees/:id",
  authorize("DOCTOR"),
  consultationController.deleteConsultationFees,
);

export const consultationRoutes = router;

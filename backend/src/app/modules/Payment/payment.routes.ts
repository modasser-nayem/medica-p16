import express from "express";
import { authorize } from "../../middlewares/authorize";
import { paymentController } from "./payment.controller";
import requestValidate from "../../middlewares/requestValidation";
import { paymentSchemaValidation } from "./payment.validataion";

const router = express.Router();

// payment success handler
router.post("/success/:sessionId", paymentController.successPaymentHandler);

// Get all payments
router.get("/", authorize("ADMIN"), paymentController.getPayments);

// Retry Payment Process
router.post(
  "/retry",
  authorize(),
  requestValidate(paymentSchemaValidation.retryPaymentProcess),
  paymentController.retryPaymentProcess,
);

// Repayment
router.post(
  "/repayment",
  authorize(),
  requestValidate(paymentSchemaValidation.repayment),
  paymentController.rePayment,
);

export const paymentRoutes = router;

// stripe webhook
export const stripeWebhookHandler = paymentController.handleStripeWebhook;

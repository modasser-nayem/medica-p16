import express from "express";
import { authorize } from "../../middlewares/authorize";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleStripeWebhook,
);

router.get("/", authorize("ADMIN"), paymentController.getPayments);

export const paymentRoutes = router;

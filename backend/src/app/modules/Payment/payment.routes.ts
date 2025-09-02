import express from "express";

const router = express.Router();

router.post("/stripe-webhook", express.raw({ type: "application/json" }));

export const paymentRoutes = router;

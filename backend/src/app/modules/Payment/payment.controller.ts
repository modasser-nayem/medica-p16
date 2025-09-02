import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const handleStripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"]!;
  const body = req.body;

  const result = await paymentService;

  res.json({ received: true });
});

export const paymentController = { handleStripeWebhook };

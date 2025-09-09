import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const handleStripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"]!;
  const body = req.body;

  const result = await paymentService.handleStripeWebhook({ sig, body });

  res.json({ received: true });
});

const getPayments = asyncHandler(async (req, res) => {
  const result = await paymentService.getPayments({ filters: req.query });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved payments",
    data: result.data,
    pagination: result.pagination,
  });
});

export const paymentController = { handleStripeWebhook, getPayments };

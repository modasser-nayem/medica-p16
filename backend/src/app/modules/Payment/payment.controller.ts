import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const handleStripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"]!;
  const body = req.body;

  const result = await paymentService.handleStripeWebhook({ sig, body });

  res.json({ received: true });
});

const successPaymentHandler = asyncHandler(async (req, res) => {
  const result = await paymentService.successPaymentHandler(
    req.params.sessionId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Payment",
    data: result,
  });
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

const retryPaymentProcess = asyncHandler(async (req, res) => {
  const result = await paymentService.retryPaymentProcess({
    sessionId: req.body.sessionId,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retry payment process",
    data: result,
  });
});

const rePayment = asyncHandler(async (req, res) => {
  const result = await paymentService.repayment({
    appointmentId: req.body.appointmentId,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Repayment",
    data: result,
  });
});

export const paymentController = {
  handleStripeWebhook,
  successPaymentHandler,
  getPayments,
  retryPaymentProcess,
  rePayment,
};

import prisma from "../../db/connector";
import Stripe from "stripe";
import { ICreatePaymentIntent, IPaymentFilters } from "./payment.interface";
import config from "../../config";
import AppError from "../../errors/AppError";
import { paginate } from "../../utils/pagination";

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
  appInfo: { name: "Medica Health Care" },
});

const createPaymentCheckoutSession = async (data: ICreatePaymentIntent) => {
  // Amount in cents
  const amount = data.amount * 100;

  // Create a Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: data.currency.toLowerCase(),
          product_data: {
            name: "Doctor Appointment Fee",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      appointmentId: data.metadata.appointmentId,
      patientId: data.metadata.patientId,
      doctorId: data.metadata.doctorId,
    },
    success_url: `${config.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.FRONTEND_URL}/payment/cancel`,
  });

  // Save a pending payment record using the Checkout Session ID
  await prisma.payment.create({
    data: {
      appointmentId: data.metadata.appointmentId,
      amount: data.amount,
      currency: data.currency,
      externalId: session.id, // store Checkout Session ID
      status: "PENDING",
      method: "card",
    },
  });

  return { checkoutUrl: session.url };
};

const handleStripeWebhook = async (payload: {
  sig: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}) => {
  const { sig, body } = payload;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      config.STRIPE_WEBHOOK_SECRET!,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(400, `Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const appointmentId = session.metadata?.appointmentId;

      if (!appointmentId) break;

      const payment_intent = session.payment_intent as string | null;

      await afterPaymentSuccess({
        sessionId: session.id,
        appointmentId,
        paymentIntentId: payment_intent,
      });
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.payment.update({
        where: { externalId: session.id },
        data: { status: "FAILED" },
      });
      break;
    }
  }
};

const successPaymentHandler = async (sessionId: string) => {
  const result = await retryPaymentProcess({ sessionId });

  return result;
};

const retryPaymentProcess = async (payload: { sessionId: string }) => {
  const session = await stripe.checkout.sessions.retrieve(payload.sessionId);

  const payment_intent = session.payment_intent;

  if (!payment_intent || typeof payment_intent !== "string") {
    throw new AppError(400, "No payment_intent on session");
  }

  const paymentRecord = await prisma.payment.findUnique({
    where: { externalId: payload.sessionId },
  });

  if (!paymentRecord) {
    throw new AppError(404, "Payment Record not exists");
  }

  const intent = await stripe.paymentIntents.retrieve(payment_intent);

  if (intent.status === "succeeded") {
    await afterPaymentSuccess({
      sessionId: paymentRecord.externalId,
      appointmentId: paymentRecord.appointmentId,
      paymentIntentId: payment_intent,
    });
  } else if (intent.status === "canceled") {
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: { status: "FAILED" },
    });

    await prisma.appointment.update({
      where: { id: paymentRecord.appointmentId },
      data: { status: "CANCELLED", cancelReason: "Payment failed!" },
    });
  }

  return {
    amount: paymentRecord.amount,
    currency: paymentRecord.currency,
  };
};

const repayment = async (payload: { appointmentId: string }) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: payload.appointmentId },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid Appointment ID");
  }

  const existSuccessPayment = await prisma.payment.findFirst({
    where: { appointmentId: appointment.id, status: "COMPLETED" },
  });

  if (existSuccessPayment) {
    throw new AppError(400, "Payment already Paid!");
  }

  const data: ICreatePaymentIntent = {
    amount: Number(appointment.price),
    currency: appointment.currency,
    metadata: {
      appointmentId: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
    },
  };

  const sessionResult = await createPaymentCheckoutSession(data);

  return sessionResult;
};

const refundPayment = async (payload: {
  paymentId: string;
  paymentIntentId: string;
}) => {
  const refund = await stripe.refunds.create({
    payment_intent: payload.paymentIntentId,
  });

  await prisma.payment.update({
    where: { id: payload.paymentId },
    data: { status: "REFUNDED" },
  });

  return { refundId: refund.id };
};

const getPayments = async (payload: { filters: IPaymentFilters }) => {
  const { page, limit, sortBy, sortOrder } = payload.filters;

  // TODO: apply filters

  const result = await paginate({
    model: prisma.payment,
    page,
    limit,
    sortBy,
    sortOrder,
  });

  return result;
};

const afterPaymentSuccess = async ({
  sessionId,
  appointmentId,
  paymentIntentId,
}: {
  sessionId: string;
  appointmentId: string;
  paymentIntentId: string | null;
}) => {
  await prisma.payment.update({
    where: { externalId: sessionId },
    data: { status: "COMPLETED", paymentIntentId },
  });

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CONFIRMED" },
  });

  await prisma.consultation.upsert({
    where: { appointmentId },
    update: { status: "SCHEDULED" },
    create: {
      appointmentId,
      status: "SCHEDULED",
    },
  });
};

export const paymentService = {
  createPaymentCheckoutSession,
  handleStripeWebhook,
  successPaymentHandler,
  refundPayment,
  retryPaymentProcess,
  getPayments,
  repayment,
};

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

const createPaymentIntent = async (data: ICreatePaymentIntent) => {
  // Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount * 100,
    currency: data.currency.toLowerCase(),
    metadata: { ...data.metadata, application: "Medica" },
    automatic_payment_methods: { enabled: true },
  });

  // Save payment record in model
  await prisma.payment.create({
    data: {
      appointmentId: data.metadata.appointmentId,
      amount: data.amount,
      currency: data.currency,
      externalId: paymentIntent.id,
      status: "PENDING",
      method: "card",
    },
  });

  return { clientSecret: paymentIntent.client_secret };
};

const handleStripeWebhook = async (payload: {
  sig: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}) => {
  const { sig, body } = payload;

  let event;

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
    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      const appointmentId = intent.metadata.appointmentId;

      const appoint = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appoint) {
        break;
      }

      await prisma.payment.update({
        where: { externalId: intent.id },
        data: { status: "COMPLETED" },
      });

      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "CONFIRMED" },
      });

      await prisma.consultation.create({
        data: {
          appointmentId,
          status: "SCHEDULED",
        },
      });
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;

      await prisma.payment.update({
        where: { externalId: intent.id },
        data: { status: "FAILED" },
      });
      break;
    }
  }
};

const refundPayment = async (payload: {
  paymentId: string;
  stripeExternalId: string;
}) => {
  const refund = await stripe.refunds.create({
    payment_intent: payload.stripeExternalId,
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

export const paymentService = {
  createPaymentIntent,
  handleStripeWebhook,
  refundPayment,
  getPayments,
};

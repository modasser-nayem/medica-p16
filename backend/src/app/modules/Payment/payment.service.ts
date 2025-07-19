import prisma from "../../db/connector";
import { ICreatePaymentIntent } from "./payment.interface";

const createPaymentIntent = async (data: ICreatePaymentIntent) => {
  const payment = await prisma.payment.create({
    data: {
      amount: data.amount,
      patientId: data.patientId,
    },
  });

  return payment;
};

export const paymentService = { createPaymentIntent };

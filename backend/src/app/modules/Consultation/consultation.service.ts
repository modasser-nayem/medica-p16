import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { TCreateOrUpdateConsultationFees } from "./consultation.interface";

const createOrUpdateConsultationFees = async (
  data: TCreateOrUpdateConsultationFees,
) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: data.doctorId },
  });

  if (!doctor) {
    throw new AppError(400, "Invalid Doctor ID");
  }

  const result = await prisma.consultationFee.upsert({
    where: {
      doctorId_type: { doctorId: data.doctorId, type: data.type },
    },
    create: { doctorId: data.doctorId, type: data.type, fee: data.fee },
    update: {
      fee: data.fee,
    },
  });

  return result;
};

const getConsultationFees = async (doctorId: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) {
    throw new AppError(400, "Invalid Doctor ID");
  }

  const result = await prisma.consultationFee.findMany({ where: { doctorId } });

  return result;
};

const deleteConsultationFees = async (consultationFeeId: string) => {
  const consultationFee = await prisma.consultationFee.findUnique({
    where: { id: consultationFeeId },
  });

  if (!consultationFee) {
    throw new AppError(400, "Invalid consultation ID");
  }

  await prisma.consultationFee.delete({
    where: { id: consultationFeeId },
  });

  return null;
};

export const consultationService = {
  createOrUpdateConsultationFees,
  getConsultationFees,
  deleteConsultationFees,
};

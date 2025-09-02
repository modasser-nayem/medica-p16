import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { paginate } from "../../utils/pagination";
import {
  TCreateAppointment,
  IGetAppointmentsFilters,
  TRescheduleAppointment,
} from "./appointment.interface";
import { paymentService } from "../Payment/payment.service";
import { doctorService } from "../Doctor/doctor.service";
import { addMinutes, format } from "date-fns";

const createAppointment = async (data: TCreateAppointment) => {
  const startsAt = new Date(data.startsAt);

  // Get available slots for that day
  const slots = await doctorService.getDoctorAvailableSlots(
    data.doctorId,
    startsAt,
    1,
  );

  if (!slots.length) {
    throw new AppError(400, "Slot not available");
  }

  const daySlots: string[] = slots[0]?.slots ?? [];

  const hhmm = format(startsAt, "HH:mm");
  if (!daySlots.includes(hhmm)) {
    throw new AppError(400, "Slot not available");
  }

  // Calculate end time
  const endsAt = addMinutes(startsAt, slots[0]?.duration!);

  // Check for Conflicting Appointments for the Patient
  const patientConflict = await prisma.appointment.findFirst({
    where: {
      patientId: data.patientId,
      status: { in: ["PENDING", "CONFIRMED"] },
      startsAt: { gte: startsAt, lte: endsAt },
    },
  });

  if (patientConflict) {
    throw new Error("You already have an appointment at this time.");
  }

  // Get consultation fee
  const fee = await prisma.consultationFee.findUnique({
    where: {
      doctorId_type: { doctorId: data.doctorId, type: data.consultType },
      isActive: true,
    },
  });

  if (!fee) throw new AppError(400, "Consultation Type not Available");

  // 4. Create appointment (status = PENDING until payment completes)
  const newApt = await prisma.appointment.create({
    data: {
      patientId: data.patientId,
      doctorId: data.doctorId,
      consultType: data.consultType,
      startsAt,
      endsAt,
      price: fee.fee,
      currency: fee.currency,
      status: "PENDING",
    },
  });

  // const intent = await paymentService.createPaymentIntent({
  //   amount: Number(fee.fee),
  //   currency: fee.currency,
  //   metadata: {
  //     appointmentId: newApt.id,
  //     patientId: data.patientId,
  //     doctorId: data.doctorId,
  //   },
  // });

  return {
    appointmentId: newApt.id,
    clientSecret: "client_secret", // intent.clientSecret ,
  };
};

const getAppointments = async ({
  userId,
  filters,
}: {
  userId: string;
  filters: IGetAppointmentsFilters;
}) => {
  const {
    page,
    limit,
    endsAt,
    startsAt,
    status,
    sortBy = "startsAt",
    sortOrder = "desc",
  } = filters;

  // TODO: startsAt & EndsAt filter set

  const where: Prisma.AppointmentWhereInput = {
    OR: [
      { doctor: { user: { id: userId } } },
      { patient: { user: { id: userId } } },
    ],
  };

  if (status) where.status = status;

  const result = await paginate({
    model: prisma.appointment,
    page,
    limit,
    where,
    sortBy,
    sortOrder,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = result.data.map((appointment: any) => {
    const { doctor, ...rest } = appointment;

    return {
      ...rest,
      doctor: {
        id: doctor.id,
        name: doctor.user.name,
        profileImage: doctor.user.profileImage,
      },
    };
  });

  return { pagination: result.pagination, data: transformData };
};

const getAppointmentDetails = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      doctor: true,
      patient: true,
      consultation: true,
    },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid appointment ID");
  }

  return appointment;
};

const rescheduleAppointment = async (data: TRescheduleAppointment) => {
  const appointmentId = data.appointmentId;
  const startsAt = new Date(data.startsAt);

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid Appointment ID");
  }

  if (appointment.status !== "CONFIRMED") {
    throw new AppError(
      400,
      `${appointment.status.toLowerCase()} Appointment can't be reschedule`,
    );
  }

  // Get available slots for that day
  const slots = await doctorService.getDoctorAvailableSlots(
    appointment.doctorId,
    startsAt,
    1,
  );

  if (!slots.length) {
    throw new AppError(400, "Slot not available");
  }

  const daySlots: string[] = slots[0]?.slots ?? [];

  const hhmm = format(startsAt, "HH:mm");
  if (!daySlots.includes(hhmm)) {
    throw new AppError(400, "Slot not available");
  }

  // Calculate end time
  const endsAt = addMinutes(startsAt, slots[0]?.duration!);

  // Check for Conflicting Appointments for the Patient
  const patientConflict = await prisma.appointment.findFirst({
    where: {
      patientId: appointment.patientId,
      status: { in: ["PENDING", "CONFIRMED"] },
      startsAt: { gte: startsAt, lte: endsAt },
    },
  });

  if (patientConflict) {
    throw new Error("You already have an appointment at this time.");
  }

  const result = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      startsAt,
      endsAt,
    },
  });

  return result;
};

const cancelAppointment = async ({
  appointmentId,
  cancelReason,
}: {
  appointmentId: string;
  cancelReason: string;
}) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { payment: true, consultation: true },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid Appointment ID");
  }

  if (appointment.status === "COMPLETED") {
    throw new AppError(400, "Completed appointment can't be cancel");
  }

  if (appointment.startsAt < new Date())
    throw new Error("Cannot cancel past appointments");

  let refundId: string | null = null;

  if (appointment.status === "CONFIRMED") {
    if (appointment.payment) {
      const refund = await paymentService.refundPayment({
        paymentId: appointment.payment.id,
        stripeExternalId: appointment.payment.externalId,
      });
      refundId = refund.refundId;
    }
  }

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CANCELLED", cancelReason },
  });

  if (appointment.consultation) {
    await prisma.consultation.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });
  }

  return { refundId };
};

const deleteAppointment = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid Appointment ID");
  }

  if (appointment.status === "COMPLETED") {
    throw new AppError(400, "Completed appointment can't be delete");
  }

  if (appointment.status === "CONFIRMED") {
    throw new AppError(
      400,
      "Please Cancel the appointment, then delete appointment",
    );
  }

  await prisma.appointment.delete({
    where: { id: appointmentId },
  });

  return null;
};

export const appointmentService = {
  createAppointment,
  getAppointments,
  getAppointmentDetails,
  rescheduleAppointment,
  cancelAppointment,
  deleteAppointment,
};

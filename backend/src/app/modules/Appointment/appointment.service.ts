import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { paginate } from "../../utils/pagination";
import {
  ICreateAppointment,
  IGetAppointmentsQuery,
  IRescheduleAppointment,
} from "./appointment.interface";

const createAppointment = async (data: ICreateAppointment) => {
  const {
    patientId,
    doctorId,
    date,
    time,
    type: consultationType,
    notes,
  } = data;

  const dateOnly = new Date(`${date}T00:00:00`);
  const [hours, minutes] = time.split(":").map(Number);
  const timeOnly = new Date(Date.UTC(1970, 0, 1, hours, minutes));

  // Validate patient
  const patient = await prisma.patient.findUnique({ where: { id: patientId } });
  if (!patient) throw new AppError(400, "Invalid patient.");

  // validate doctor
  const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
  if (!doctor) throw new AppError(400, "Invalid doctor.");
  if (!doctor.isAvailable)
    throw new AppError(400, "Doctor is currently unavailable.");

  // Check if Appointment Date & Time is in the Future
  const now = new Date();
  const appointmentDateTime = new Date(`${date}T${time}`);
  if (appointmentDateTime <= now) {
    throw new AppError(400, "Appointment must be scheduled for a future time.");
  }

  // Check if Doctor is Scheduled on That Day
  const schedule = await prisma.schedule.findFirst({
    where: {
      doctorId,
      dayOfWeek: dateOnly.getDay(),
      startTime: { lte: timeOnly },
      endTime: { gte: timeOnly },
      isAvailable: true,
    },
  });

  if (!schedule) {
    throw new AppError(400, "Doctor is not available at the selected time.");
  }

  // Check for Conflicting Appointments for the Doctor
  const doctorConflict = await prisma.appointment.findFirst({
    where: {
      doctorId,
      date: dateOnly,
      time: timeOnly,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (doctorConflict) {
    throw new AppError(400, "Doctor already has an appointment at this time.");
  }

  // Check for Conflicting Appointments for the Patient
  const patientConflict = await prisma.appointment.findFirst({
    where: {
      patientId,
      date: dateOnly,
      time: timeOnly,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (patientConflict) {
    throw new Error("You already have an appointment at this time.");
  }

  // Check Doctor's Fee for Selected Consultation Type
  const fee = await prisma.consultationFee.findUnique({
    where: {
      doctorId_type: {
        doctorId,
        type: consultationType,
      },
    },
  });

  if (!fee) {
    throw new Error("Consultation type not supported by doctor.");
  }

  const result = prisma.$transaction(async (transact) => {
    // Create Appointment
    const newAppointment = await transact.appointment.create({
      data: {
        patientId,
        doctorId,
        date: dateOnly,
        time: timeOnly,
        type: consultationType,
        price: fee.fee,
        notes,
      },
      include: {
        patient: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            department: {
              select: {
                id: true,
                name: true,
              },
            },
            specialization: true,
          },
        },
      },
    });

    // Create consultation
    await transact.consultation.create({
      data: {
        appointmentId: newAppointment.id,
        status: "SCHEDULED",
      },
    });

    // Create Payment
    await transact.payment.create({
      data: {
        patientId: patient.id,
        amount: fee.fee,
      },
    });

    return newAppointment;
  });

  return result;
};

const getAppointments = async (filters: IGetAppointmentsQuery) => {
  const { page, limit, date, startDate, endDate, status } = filters;

  const where: Prisma.AppointmentWhereInput = {};

  if (status) where.status = status;

  if (date) {
    where.date = new Date(date);
  } else if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  const result = await paginate({
    model: prisma.appointment,
    page,
    limit,
    where,
  });

  return result;
};

const rescheduleAppointment = async (data: IRescheduleAppointment) => {
  const { appointmentId, date, time, notes } = data;

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid Appointment ID");
  }

  const dateOnly = new Date(`${date}T00:00:00`);
  const [hours, minutes] = time.split(":").map(Number);
  const timeOnly = new Date(Date.UTC(1970, 0, 1, hours, minutes));

  // Check if Appointment Date & Time is in the Future
  const now = new Date();
  const appointmentDateTime = new Date(`${date}T${time}`);
  if (appointmentDateTime <= now) {
    throw new AppError(400, "Appointment must be scheduled for a future time.");
  }

  // Check if Doctor is Scheduled on That Day
  const schedule = await prisma.schedule.findFirst({
    where: {
      doctorId: appointment.doctorId,
      dayOfWeek: dateOnly.getDay(),
      startTime: { lte: timeOnly },
      endTime: { gte: timeOnly },
      isAvailable: true,
    },
  });

  if (!schedule) {
    throw new AppError(400, "Doctor is not available at the selected time.");
  }

  // Check for Conflicting Appointments for the Doctor
  const doctorConflict = await prisma.appointment.findFirst({
    where: {
      doctorId: appointment.doctorId,
      date: dateOnly,
      time: timeOnly,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (doctorConflict) {
    throw new AppError(400, "Doctor already has an appointment at this time.");
  }

  // Check for Conflicting Appointments for the Patient
  const patientConflict = await prisma.appointment.findFirst({
    where: {
      patientId: appointment.patientId,
      date: dateOnly,
      time: timeOnly,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (patientConflict) {
    throw new Error("You already have an appointment at this time.");
  }

  const result = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      date: dateOnly,
      time: timeOnly,
      notes,
    },
    include: {
      patient: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      doctor: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          specialization: true,
        },
      },
    },
  });

  return result;
};

const cancelAppointment = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid Appointment ID");
  }

  if (appointment.status === "COMPLETED") {
    throw new AppError(400, "Completed appointment can't be cancel");
  }

  if (appointment.isPaid) {
    throw new AppError(
      400,
      "Please take Refund your payment, then you can cancel appointment",
    );
  }

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CANCELLED" },
  });

  // TODO: if paid Refund payment for cancellation
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

  const payment = await prisma.payment.findFirst({
    where: { appointment: { id: appointment.id } },
  });

  if (payment && payment.status === "COMPLETED") {
    throw new AppError(400, "Please Refund payment, then delete appointment");
  }

  await prisma.appointment.delete({
    where: { id: appointmentId },
  });

  return null;
};

export const appointmentService = {
  createAppointment,
  getAppointments,
  rescheduleAppointment,
  cancelAppointment,
  deleteAppointment,
};

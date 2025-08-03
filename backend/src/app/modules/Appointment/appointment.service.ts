import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { paginate } from "../../utils/pagination";
import {
  ICreateAppointment,
  IGetAppointmentsFilters,
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
    date,
    startDate,
    endDate,
    status,
    sortBy = "date",
    sortOrder = "desc",
  } = filters;

  const where: Prisma.AppointmentWhereInput = {
    OR: [
      { doctor: { user: { id: userId } } },
      { patient: { user: { id: userId } } },
    ],
  };

  if (status) where.status = status;

  if (date) {
    where.date = new Date(date);
  } else if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  const select: Prisma.AppointmentSelect = {
    id: true,
    date: true,
    time: true,
    type: true,
    createdAt: true,
    status: true,
    price: true,
    doctor: {
      select: {
        id: true,
        user: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    },
  };

  const result = await paginate({
    model: prisma.appointment,
    page,
    limit,
    where,
    select,
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
    select: {
      id: true,
      date: true,
      time: true,
      type: true,
      notes: true,
      isPaid: true,
      price: true,
      status: true,
      doctor: {
        select: {
          id: true,
          specialization: true,
          user: {
            select: {
              name: true,
              profileImage: true,
              address: true,
              email: true,
            },
          },
        },
      },
      patient: {
        select: {
          id: true,
          allergies: true,
          bloodGroup: true,
          medicalHistory: true,
          emergencyContact: true,
          user: {
            select: {
              name: true,
              profileImage: true,
              email: true,
              dateOfBirth: true,
              gender: true,
            },
          },
        },
      },
    },
  });

  if (!appointment) {
    throw new AppError(400, "Invalid appointment ID");
  }

  const { patient, doctor, ...rest } = appointment;

  const transformData = {
    ...rest,
    doctor: {
      id: doctor.id,
      specialization: doctor.specialization,
      name: doctor.user.name,
      email: doctor.user.email,
      address: doctor.user.address,
      profileImage: doctor.user.profileImage,
    },
    patient: {
      id: patient.id,
      bloodGroup: patient.bloodGroup,
      emergencyContact: patient.emergencyContact,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      name: patient.user.name,
      email: patient.user.email,
      dateOfBirth: patient.user.dateOfBirth,
      gender: patient.user.gender,
      profileImage: patient.user.profileImage,
    },
  };

  return transformData;
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

const getDoctorAvailableSlots = async (doctorId: string) => {
  const result = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
  ];

  return result;
};

export const appointmentService = {
  createAppointment,
  getAppointments,
  getAppointmentDetails,
  rescheduleAppointment,
  cancelAppointment,
  deleteAppointment,
  getDoctorAvailableSlots,
};

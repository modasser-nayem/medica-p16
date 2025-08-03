import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import { endOfToday, startOfToday } from "../../utils/datetime";
import {
  IAdminStats,
  IDoctorStats,
  IGetUserActivityFilters,
  IPatientStats,
  IPublicStats,
} from "./analytics.interface";
import { paginate } from "../../utils/pagination";

const getAdminStats = async (): Promise<IAdminStats> => {
  const users = await prisma.user.findMany({
    select: { id: true, role: true, isActive: true },
  });

  const activeUsers = users.filter((user) => user.isActive === true).length;

  const totalDoctor = users.filter((user) => user.role === "DOCTOR").length;

  const totalPatient = users.filter((user) => user.role === "PATIENT").length;

  const payments = await prisma.payment.findMany({
    where: { status: "COMPLETED" },
  });

  const totalRevenue = payments.reduce(
    (acc, payment) => acc + Number(payment.amount),
    0,
  );

  const completedAppointments = await prisma.appointment.count({
    where: { status: "COMPLETED" },
  });

  const todaysAppointments = await prisma.appointment.count({
    where: {
      date: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  const result = {
    totalUsers: users.length,
    activeUsers,
    totalDoctor,
    totalPatient,
    totalRevenue,
    completedAppointments,
    todaysAppointments,
  };

  return result;
};

const getDoctorStats = async (userId: string): Promise<IDoctorStats> => {
  const user = await prisma.doctor.findUnique({
    where: { userId },
    select: { id: true },
  });

  const doctorId = user?.id;

  const completedAppointments = await prisma.appointment.count({
    where: {
      doctorId: doctorId,
      status: "COMPLETED",
    },
  });

  const pendingAppointments = await prisma.appointment.count({
    where: {
      doctorId: doctorId,
      status: "CONFIRMED",
    },
  });

  const todaysAppointments = await prisma.appointment.count({
    where: {
      doctorId,
      date: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  // Upcoming appointment
  const now = new Date();

  // Convert current time into your dummy time format (1970-01-01)
  const currentTime = new Date(
    Date.UTC(1970, 0, 1, now.getHours(), now.getMinutes(), now.getSeconds()),
  );

  const upcomingAppointment = await prisma.appointment.findFirst({
    where: {
      doctorId: doctorId,
      date: {
        gte: startOfToday,
        lte: endOfToday,
      },
      time: {
        gt: currentTime,
      },
    },
    orderBy: {
      time: "asc", // earliest upcoming
    },
    select: {
      id: true,
      date: true,
      time: true,
    },
  });

  const result = {
    completedAppointments,
    pendingAppointments,
    todaysAppointments,
    upcomingAppointment,
  };

  return result;
};

const getPatientStats = async (userId: string): Promise<IPatientStats> => {
  const user = await prisma.patient.findUnique({
    where: { userId },
    select: { id: true },
  });

  const patientId = user?.id;

  const completedAppointments = await prisma.appointment.count({
    where: {
      patientId,
      status: "COMPLETED",
    },
  });

  const pendingAppointments = await prisma.appointment.count({
    where: {
      patientId,
      status: "PENDING",
    },
  });

  const scheduledAppointments = await prisma.appointment.count({
    where: {
      patientId,
      status: "CONFIRMED",
    },
  });

  // Upcoming appointment
  const now = new Date();

  // Convert current time into your dummy time format (1970-01-01)
  const currentTime = new Date(
    Date.UTC(1970, 0, 1, now.getHours(), now.getMinutes(), now.getSeconds()),
  );

  const upcomingAppointment = await prisma.appointment.findFirst({
    where: {
      patientId,
      date: {
        gte: startOfToday,
        lte: endOfToday,
      },
      time: {
        gt: currentTime,
      },
    },
    orderBy: {
      time: "asc", // earliest upcoming
    },
    select: {
      id: true,
      date: true,
      time: true,
    },
  });

  const result = {
    completedAppointments,
    pendingAppointments,
    scheduledAppointments,
    upcomingAppointment,
  };

  return result;
};

const getPublicStats = async (): Promise<IPublicStats> => {
  const totalUsers = await prisma.user.count();

  const totalDoctors = await prisma.doctor.count();

  const completedAppointments = await prisma.appointment.count({
    where: { status: "COMPLETED" },
  });

  return { totalUsers, totalDoctors, completedAppointments };
};

// Get User Activity
const getUserActivity = async (filters: IGetUserActivityFilters) => {
  const { page = 1, limit = 10, sortBy, sortOrder = "desc" } = filters;

  const where: Prisma.AuditLogWhereInput = {};
  const select: Prisma.AuditLogSelect = {
    id: true,
    userId: true,
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    action: true,
    entity: true,
    entityId: true,
    details: true,
    ipAddress: true,
    userAgent: true,
    createdAt: true,
  };

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.action) {
    where.action = filters.action;
  }

  if (filters.entity) {
    where.entity = filters.entity;
  }

  if (filters.startDate && filters.endDate) {
    where.createdAt = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate),
    };
  }

  const result = await paginate({
    model: prisma.auditLog,
    where,
    select,
    page,
    limit,
    sortBy,
    sortOrder,
  });

  return result;
};

export const analyticsService = {
  getAdminStats,
  getDoctorStats,
  getPatientStats,
  getPublicStats,
  getUserActivity,
};

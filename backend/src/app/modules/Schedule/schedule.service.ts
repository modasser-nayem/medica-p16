import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import {
  TCreateSchedule,
  TCreateScheduleException,
  TUpdateSchedule,
} from "./schedule.interface";

const createSchedule = async (payload: {
  doctorId: string;
  data: TCreateSchedule;
}) => {
  const existSchedule = await prisma.schedule.findFirst({
    where: {
      doctorId: payload.doctorId,
      dayOfWeek: payload.data.dayOfWeek,
    },
  });

  if (existSchedule) {
    throw new AppError(400, "Schedule for this day already exists");
  }

  const schedules = await prisma.schedule.findMany({
    where: { doctorId: payload.doctorId },
  });

  if (schedules.length >= 6) {
    throw new AppError(400, "You can create only 5 days Schedule");
  }

  const schedule = await prisma.schedule.create({
    data: {
      doctorId: payload.doctorId,
      ...payload.data,
    },
  });

  return schedule;
};

const getSchedules = async (doctorId: string) => {
  const schedules = await prisma.schedule.findMany({
    where: { doctorId },
    orderBy: { dayOfWeek: "asc" },
  });

  return schedules;
};

const updateSchedule = async (doctorId: string, data: TUpdateSchedule) => {
  const schedule = await prisma.schedule.findUnique({
    where: { doctorId_dayOfWeek: { doctorId, dayOfWeek: data.dayOfWeek } },
  });

  if (!schedule) {
    throw new AppError(404, "Schedule not found");
  }

  const updatedSchedule = await prisma.schedule.update({
    where: {
      id: schedule.id,
    },
    data: data,
  });

  return updatedSchedule;
};

const deleteSchedule = async (doctorId: string, scheduleId: string) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });

  if (!schedule) {
    throw new AppError(404, "Schedule not found!");
  }

  await prisma.schedule.delete({
    where: {
      id: scheduleId,
      doctorId,
    },
  });

  return null;
};

const createScheduleException = async (payload: {
  doctorId: string;
  data: TCreateScheduleException;
}) => {
  return payload;
};

const getScheduleExceptions = async (payload: { doctorId: string }) => {
  const result = await prisma.scheduleException.findMany({
    where: {
      doctorId: payload.doctorId,
    },
  });

  return result;
};

const deleteScheduleException = async (exceptionId: string) => {
  await prisma.scheduleException.delete({
    where: { id: exceptionId },
  });

  return null;
};

export const scheduleService = {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
  createScheduleException,
  getScheduleExceptions,
  deleteScheduleException,
};

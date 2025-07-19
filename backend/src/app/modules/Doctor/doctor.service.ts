import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { TCreateSchedule, TUpdateSchedule } from "./doctor.interface";

const createSchedule = async (payload: {
  doctorId: string;
  data: TCreateSchedule;
}) => {
  const { dayOfWeek, startTime, endTime } = payload.data;

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
    throw new AppError(400, "You can only create schedules for 6 days");
  }

  const schedule = await prisma.schedule.create({
    data: {
      doctorId: payload.doctorId,
      dayOfWeek,
      startTime: new Date(`1970-01-01T${startTime}:00Z`),
      endTime: new Date(`1970-01-01T${endTime}:00Z`),
    },
  });

  return schedule;
};

const getSchedules = async (doctorId: string) => {
  const schedules = await prisma.schedule.findMany({
    where: { doctorId },
    orderBy: { dayOfWeek: "asc" },
  });

  const formattedSchedules = schedules.map((schedule) => {
    return {
      ...schedule,
      startTime: schedule.startTime.toISOString().substring(11, 16),
      endTime: schedule.endTime.toISOString().substring(11, 16),
    };
  });

  return formattedSchedules;
};

const updateSchedule = async (
  doctorId: string,
  scheduleId: string,
  data: TUpdateSchedule,
) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });

  if (!schedule) {
    throw new AppError(404, "Schedule not found");
  }

  const updatedData: {
    startTime?: Date;
    endTime?: Date;
    isAvailable?: boolean;
  } = {};

  if (data.startTime) {
    updatedData.startTime = new Date(`1970-01-01T${data.startTime}:00z`);
  }

  if (data.endTime) {
    updatedData.endTime = new Date(`1970-01-01T${data.endTime}:00z`);
  }

  if (data.isAvailable !== undefined) {
    updatedData.isAvailable = data.isAvailable;
  }

  if (updatedData.startTime && updatedData.endTime) {
    if (updatedData.endTime <= updatedData.startTime) {
      throw new AppError(400, "End time must be after start time");
    }
  } else if (updatedData.startTime && !updatedData.endTime) {
    if (updatedData.startTime >= schedule.endTime) {
      throw new AppError(400, "Start time must be before end time");
    }
  } else if (!updatedData.startTime && updatedData.endTime) {
    if (updatedData.endTime <= schedule.startTime) {
      throw new AppError(400, "End time must be after start time");
    }
  }

  const updatedSchedule = await prisma.schedule.update({
    where: {
      id: scheduleId,
      doctorId,
    },
    data: updatedData,
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

export const doctorService = {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
};

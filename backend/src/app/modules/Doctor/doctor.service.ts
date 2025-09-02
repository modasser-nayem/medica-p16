import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import {
  TCreateOrUpdateConsultationFees,
  TGetDoctorsFilter,
} from "./doctor.interface";
import { addDays, format, isSameDay, eachDayOfInterval } from "date-fns";
import { generateSlots } from "../../utils/datetime";

// Get Doctors
const getDoctors = async (filters: TGetDoctorsFilter) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const rating = Number(filters.rating);
  const skip = (page - 1) * limit;
  const { search, specialty, department, sortBy, sortOrder } = filters;

  const where: Prisma.DoctorWhereInput = {
    user: { isActive: true, isDeleted: false },
  };

  if (specialty) {
    where.specialties = { contains: specialty, mode: "insensitive" };
  }

  if (search) {
    where.user = { name: { contains: search, mode: "insensitive" } };
  }

  if (rating) {
    where.reviews = { some: { rating: { gte: rating } } };
  }

  if (department) {
    where.department = { id: department };
  }

  // Fetch doctors
  const doctors = await prisma.doctor.findMany({
    where,
    select: {
      id: true,
      specialties: true,
      qualification: true,
      experience: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
    skip,
    take: limit,
  });

  // Calculate Average Rating for each doctor
  const enrichedDoctors = doctors.map((doctor) => {
    const totalReviews = doctor._count.reviews || 0;

    const totalRating = doctor.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    const { reviews, _count, ...rest } = doctor;

    return {
      ...rest,
      totalReviews,
      averageRating: Number(averageRating.toFixed(2)),
    };
  });

  // Sorting based on user provided sort
  const sortedDoctors = enrichedDoctors.sort((a, b) => {
    if (filters.sortBy === "rating") {
      return filters.sortOrder === "asc"
        ? a.averageRating - b.averageRating
        : b.averageRating - a.averageRating;
    }

    if (filters.sortBy === "createdAt") {
      return filters.sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return 0;
  });

  const total = await prisma.doctor.count();
  const paginatedDoctors = sortedDoctors.slice(0, limit); // already skipped during query

  return {
    data: paginatedDoctors,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get Doctor Details
const getDoctorDetails = async (doctorId: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      id: true,
      specialties: true,
      qualification: true,
      experience: true,
      bio: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          dateOfBirth: true,
          gender: true,
          address: true,
          profileImage: true,
        },
      },
      fees: {
        select: {
          id: true,
          type: true,
          fee: true,
          currency: true,
          isActive: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new AppError(400, "Invalid Doctor ID");
  }

  const { id, specialties, qualification, experience, user, fees, _count } =
    doctor;

  const totalReviews = _count?.reviews || 0;

  const result = {
    id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    address: user.address,
    profileImage: user.profileImage,
    specialties,
    qualification,
    experience,
    userId: user.id,
    fees,
    totalReviews,
  };

  return result;
};

const getDoctorAvailableSlots = async (
  doctorId: string,
  startDate = new Date(),
  days = 7,
) => {
  const endDate = addDays(startDate, days - 1);

  // get recurring schedules
  const schedules = await prisma.schedule.findMany({
    where: { doctorId },
  });

  // get exceptions in range
  const exceptions = await prisma.scheduleException.findMany({
    where: { doctorId, date: { gte: startDate, lte: endDate } },
  });

  // get already booked appointments
  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      status: { in: ["PENDING", "CONFIRMED"] },
      startsAt: { gte: startDate, lte: endDate },
    },
  });

  const daysList = eachDayOfInterval({ start: startDate, end: endDate });

  const results = [];

  for (const day of daysList) {
    const weekday = day.getDay(); // 0=Sun
    const baseSchedule = schedules.find((s) => s.dayOfWeek === weekday);
    if (!baseSchedule || !baseSchedule.isActive) {
      // results.push({ date: format(day, "yyyy-MM-dd"), slots: [] });
      continue;
    }

    // Check exception
    const exception = exceptions.find((e) => isSameDay(e.date, day));
    if (exception?.closed) {
      // results.push({ date: format(day, "yyyy-MM-dd"), slots: [] });
      continue;
    }

    const startTime = exception?.startTime ?? baseSchedule.startTime;
    const endTime = exception?.endTime ?? baseSchedule.endTime;
    const duration = baseSchedule.slotDurationMinutes;

    let slots = generateSlots(day, startTime, endTime, duration);

    // Filter out booked
    const bookedTimes = appointments.map((a) => a.startsAt.getTime());
    slots = slots.filter((slot) => !bookedTimes.includes(slot.getTime()));

    // Filter out exception.blockedSlots
    if (exception?.blockedSlots?.length) {
      slots = slots.filter((slot) => {
        const hhmm = format(slot, "HH:mm");
        return !exception.blockedSlots.includes(hhmm);
      });
    }

    results.push({
      date: format(day, "yyyy-MM-dd"),
      slots: slots.map((s) => format(s, "HH:mm")),
      duration,
    });
  }
  return results;
};

const createOrUpdateConsultationFees = async (
  doctorId: string,
  data: TCreateOrUpdateConsultationFees,
) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) {
    throw new AppError(400, "Invalid Doctor ID");
  }

  const result = await prisma.consultationFee.upsert({
    where: {
      doctorId_type: { doctorId: doctorId, type: data.type },
    },
    create: {
      ...data,
      doctorId,
    },
    update: {
      fee: data.fee,
      currency: data.currency,
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

const updateFeesActivation = async (consultationFeeId: string) => {
  const consultationFee = await prisma.consultationFee.findUnique({
    where: { id: consultationFeeId },
  });

  if (!consultationFee) {
    throw new AppError(400, "Invalid consultation ID");
  }

  const result = await prisma.consultationFee.update({
    where: { id: consultationFeeId },
    data: { isActive: consultationFee.isActive ? false : true },
  });

  return result;
};

export const doctorService = {
  getDoctors,
  getDoctorDetails,
  getDoctorAvailableSlots,
  createOrUpdateConsultationFees,
  getConsultationFees,
  updateFeesActivation,
};

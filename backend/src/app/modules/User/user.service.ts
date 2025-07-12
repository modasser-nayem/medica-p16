import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import {
  IGetUserActivityFilters,
  IUserProfileWithDetails,
  TGetDoctorsFilter,
  TGetUsersFilter,
  TUpdateAdminProfile,
  TUpdateDoctorProfile,
  TUpdatePatientProfile,
} from "./user.interface";
import { paginate } from "../../utils/pagination";

// Get user profile
const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      adminProfile: true,
      doctorProfile: true,
      patientProfile: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = user;

  return result;
};

// Update Patient Profile
const updatePatientProfile = async (payload: {
  userId: string;
  data: TUpdatePatientProfile;
}): Promise<IUserProfileWithDetails> => {
  const { data } = payload;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      profileImage: data.profileImage,
      patientProfile: {
        update: {
          data: {
            bloodGroup: data.bloodGroup,
            emergencyContact: data.emergencyContact,
            medicalHistory: data.medicalHistory,
            allergies: data.allergies,
          },
        },
      },
    },
    include: {
      patientProfile: {
        select: {
          id: true,
          bloodGroup: true,
          emergencyContact: true,
          medicalHistory: true,
          allergies: true,
        },
      },
    },
  });

  return result;
};

// Update Doctor Profile
const updateDoctorProfile = async (payload: {
  userId: string;
  data: TUpdateDoctorProfile;
}): Promise<IUserProfileWithDetails> => {
  const { data } = payload;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      profileImage: data.profileImage,
      doctorProfile: {
        update: {
          data: {
            departmentId: data.departmentId,
            specialization: data.specialization,
            qualifications: data.qualifications,
            experience: data.experience,
            licenseNumber: data.licenseNumber,
            isAvailable: data.isAvailable,
          },
        },
      },
    },
    include: {
      doctorProfile: {
        select: {
          id: true,
          department: {
            select: { id: true, name: true },
          },
          specialization: true,
          qualifications: true,
          experience: true,
          licenseNumber: true,
          isAvailable: true,
        },
      },
    },
  });

  return result;
};

// Update Admin Profile
const updateAdminProfile = async (payload: {
  userId: string;
  data: TUpdateAdminProfile;
}): Promise<IUserProfileWithDetails> => {
  const { data } = payload;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      profileImage: data.profileImage,
    },
    include: {
      adminProfile: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  return result;
};

// Get Users
const getUsers = async (filters: TGetUsersFilter) => {
  const { page, limit, sortBy, sortOrder } = filters;

  const where: Prisma.UserWhereInput = {};

  if (filters.role) {
    where.role = filters.role;
  }

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  // Add department and specialization filters for doctors
  if (filters.departmentId || filters.specialization) {
    where.doctorProfile = {};
    if (filters.departmentId) {
      where.doctorProfile.departmentId = filters.departmentId;
    }
    if (filters.specialization) {
      where.doctorProfile.specialization = {
        contains: filters.specialization,
        mode: "insensitive",
      };
    }
  }

  const select: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    dateOfBirth: true,
    gender: true,
    address: true,
    profileImage: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    patientProfile: true,
    doctorProfile: {
      select: {
        id: true,
        specialization: true,
        qualifications: true,
        licenseNumber: true,
        experience: true,
        isAvailable: true,
        department: {
          select: { id: true, name: true },
        },
      },
    },
    adminProfile: true,
  };

  const result = await paginate({
    model: prisma.user,
    where: where,
    select,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  return result;
};

// Get Doctors
const getDoctors = async (filters: TGetDoctorsFilter) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const rating = Number(filters.rating);
  const { sortBy, sortOrder } = filters;

  const where: Prisma.DoctorWhereInput = {
    user: { isActive: true },
  };

  if (filters.isAvailable !== undefined) {
    where.isAvailable = filters.isAvailable;
  }

  if (filters.specialization) {
    where.specialization = filters.specialization;
  }

  if (filters.search) {
    where.user = { name: { contains: filters.search, mode: "insensitive" } };
  }

  if (filters.departmentId) {
    where.departmentId = filters.departmentId;
  }

  // Fetch doctors + reviews
  const doctors = await prisma.doctor.findMany({
    where,
    select: {
      id: true,
      specialization: true,
      qualifications: true,
      licenseNumber: true,
      experience: true,
      isAvailable: true,
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
      department: { select: { id: true, name: true } },
      reviews: true,
    },
  });

  // Calculate average rating per doctor and filter by rating (if given)
  const doctorsWithAvgRating = doctors
    .map((doctor) => {
      const avgRating =
        doctor.reviews.reduce((acc, r) => acc + r.rating, 0) /
        (doctor.reviews.length || 1);

      const { reviews, ...doctorData } = doctor;

      return {
        ...doctorData,
        totalReviews: doctor.reviews.length,
        averageRating: parseFloat(avgRating.toFixed(2)),
      };
    })
    .filter((doc) =>
      rating ? Math.floor(doc.averageRating) === rating : true,
    );

  // Sort by average rating if requested
  const sortedDoctors = [...doctorsWithAvgRating].sort((a, b) => {
    if (sortBy === "averageRating") {
      if (sortOrder === "asc") return a.averageRating - b.averageRating;
      return b.averageRating - a.averageRating;
    }
    return 0;
  });

  // Paginate manually
  const start = (page - 1) * limit;
  const paginatedDoctors = sortedDoctors.slice(start, start + limit);
  const totalItem = sortedDoctors.length;

  return {
    data: paginatedDoctors,
    pagination: {
      total: totalItem,
      page,
      limit,
      totalPages: Math.ceil(totalItem / limit),
    },
  };
};

// Get Doctor By ID
const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: true,
      department: true,
      appointments: { include: { _count: true } },
      fees: true,
      reviews: true,
      schedules: true,
    },
  });

  if (!doctor) {
    throw new AppError(400, "Invalid Doctor ID");
  }

  return doctor;
};

// Update User Status
const updateUserStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { isActive: user.isActive ? false : true },
  });

  return null;
};

// Delete User
const deleteUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  // Soft Delete
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });

  return user;
};

// Get User Stats
const getUserStats = async (filters: {
  startDate: string;
  endDate: string;
}) => {
  const { startDate, endDate } = filters;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (startDate && endDate) {
    where.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  const [total, byRole, active, newThisMonth, newThisWeek] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.groupBy({
      by: ["role"],
      where,
      _count: { role: true },
    }),
    prisma.user.count({ where: { ...where, isActive: true } }),
    prisma.user.count({
      where: {
        ...where,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    prisma.user.count({
      where: {
        ...where,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  const roleCounts: Record<string, number> = {};
  byRole.forEach((item) => {
    roleCounts[item.role] = item._count.role;
  });

  return {
    total,
    byRole: roleCounts,
    active,
    online: 0,
    newThisMonth,
    newThisWeek,
  };
};

// Get User Activity
const getUserActivity = async (filters: IGetUserActivityFilters) => {
  const { page = 1, limit = 10, sortBy, sortOrder } = filters;

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

// Get User Dashboard,
const getUserDashboard = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(400, "Invalid User Id");
  }

  const appointmentWhere: Prisma.AppointmentWhereInput = {};
  const consultationWhere: Prisma.ConsultationWhereInput = {};
  const prescriptionWhere: Prisma.PrescriptionWhereInput = {};
  const paymentWhere: Prisma.PaymentWhereInput = {
    status: "COMPLETED",
  };
  const auditLogWhere: Prisma.AuditLogWhereInput = {};

  if (user.role === "PATIENT") {
    appointmentWhere.patientId = user.id;
    consultationWhere.appointment = { patientId: user.id };
    prescriptionWhere.patientId = user.id;
    auditLogWhere.userId = user.id;
    paymentWhere.patientId = user.id;
  }

  if (user.role === "DOCTOR") {
    appointmentWhere.doctorId = user.id;
    consultationWhere.appointment = { doctorId: user.id };
    prescriptionWhere.doctorId = user.id;
    auditLogWhere.userId = user.id;
    paymentWhere.appointment = { doctorId: user.id };
  }

  const [totalAppointments, totalConsultations, totalPrescriptions] =
    await Promise.all([
      prisma.appointment.count({ where: appointmentWhere }),
      prisma.consultation.count({ where: consultationWhere }),
      prisma.prescription.count({ where: prescriptionWhere }),
    ]);

  const recentActivity = await prisma.auditLog.findMany({
    where: auditLogWhere,
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const totalPayments = (
    await prisma.payment.findMany({ where: paymentWhere })
  ).reduce((acc, pay) => acc + Number(pay.amount), 0);

  return {
    user,
    stats: {
      totalAppointments,
      totalConsultations,
      totalPrescriptions,
      totalPayments,
    },
    recentActivity: recentActivity,
  };
};

export const userService = {
  getUserProfile,
  updatePatientProfile,
  updateDoctorProfile,
  updateAdminProfile,
  getUsers,
  getDoctors,
  getDoctorById,
  updateUserStatus,
  deleteUser,
  getUserStats,
  getUserActivity,
  getUserDashboard,
};
